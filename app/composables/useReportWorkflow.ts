import { computed } from "vue";
import { useAuthStore } from "../stores/auth.store";
/**
 * Role type
 */
type Role = "R1" | "R2" | "R3" | "R4";

/**
 * Report state type
 */
type ReportState = "submitted" | "returned" | "in_progress" | "validated";

/**
 * Review action type
 */
type ReviewActionType = "validate" | "flag";

/**
 * States where the report can be edited by the author
 */
const EDITABLE_STATES: ReportState[] = ["submitted", "returned"];

/**
 * States where the report is locked (read-only)
 */
const LOCKED_STATES: ReportState[] = ["in_progress", "validated"];

/**
 * Valid state transitions for the report workflow
 */
const VALID_STATE_TRANSITIONS: Record<ReportState, ReportState[]> = {
  submitted: ["returned", "in_progress"],
  returned: ["submitted"],
  in_progress: ["validated", "returned"],
  validated: [],
};

function isValidStateTransition(fromState: ReportState, toState: ReportState): boolean {
  return VALID_STATE_TRANSITIONS[fromState]?.includes(toState) ?? false;
}

function getValidationNextState(currentState: ReportState): ReportState {
  if (currentState === "submitted") {
    return "in_progress";
  }
  if (currentState === "in_progress") {
    return "validated";
  }
  throw new Error(`Cannot validate report in state: ${currentState}`);
}

function isReportEditable(state: ReportState): boolean {
  return EDITABLE_STATES.includes(state);
}

function isReportLocked(state: ReportState): boolean {
  return LOCKED_STATES.includes(state);
}

/**
 * Composable for managing report workflow state transitions
 * Handles validation, flagging, and state machine logic
 */
export function useReportWorkflow() {
  const authStore = useAuthStore();

  const currentUserRole = computed<Role | null>(() => authStore.currentRole as Role | null);
  const currentUserId = computed<string | null>(() => authStore.currentUser?.phone ?? null);

  /**
   * Determine if the current user can validate a specific report
   * R3 can validate R4 reports that are submitted
   * R2/R1 can validate reports that are in_progress or submitted R3 reports
   */
  function canValidateReport(
    reportAuthorRole: string,
    reportState: string
  ): boolean {
    const role = currentUserRole.value;
    if (!role) return false;

    // Only submitted or in_progress reports can be validated
    if (reportState !== "submitted" && reportState !== "in_progress") {
      return false;
    }

    // R3 can validate submitted R4 reports
    if (
      role === "R3" &&
      reportAuthorRole === "R4" &&
      reportState === "submitted"
    ) {
      return true;
    }

    // R2/R1 can validate:
    // - in_progress reports (already validated by R3)
    // - submitted R3 reports (R3 reports go directly to R2/R1)
    if (role === "R1" || role === "R2") {
      if (reportState === "in_progress") {
        return true;
      }
      if (reportState === "submitted" && reportAuthorRole === "R3") {
        return true;
      }
    }

    return false;
  }

  /**
   * Determine if the current user can flag a specific report
   * Same rules as validation - if you can validate, you can flag
   */
  function canFlagReport(
    reportAuthorRole: string,
    reportState: string
  ): boolean {
    return canValidateReport(reportAuthorRole, reportState);
  }

  /**
   * Determine if the current user can edit a report
   * Only the author can edit, and only in editable states
   */
  function canEditReport(
    reportAuthorId: string,
    reportState: string
  ): boolean {
    const userId = currentUserId.value;
    if (!userId) return false;

    // Only author can edit
    if (reportAuthorId !== userId) return false;

    // Only in editable states
    return isReportEditable(reportState as ReportState);
  }

  /**
   * Determine the next state after validation
   */
  function getNextStateAfterValidation(currentState: string): ReportState {
    return getValidationNextState(currentState as ReportState);
  }

  /**
   * Determine the next state after flagging
   */
  function getNextStateAfterFlag(_currentState: string): ReportState {
    return "returned";
  }

  /**
   * Check if a state transition is valid
   */
  function isTransitionValid(
    fromState: string,
    toState: string
  ): boolean {
    return isValidStateTransition(fromState as ReportState, toState as ReportState);
  }

  /**
   * Get available actions for a report based on current user role and report state
   */
  function getAvailableActions(
    reportAuthorRole: string,
    reportState: string,
    _reportAuthorId: string
  ): ReviewActionType[] {
    const actions: ReviewActionType[] = [];

    if (canValidateReport(reportAuthorRole, reportState)) {
      actions.push("validate");
    }

    if (canFlagReport(reportAuthorRole, reportState)) {
      actions.push("flag");
    }

    return actions;
  }

  /**
   * Check if report is in a terminal state (no further actions possible)
   */
  function isTerminalState(state: string): boolean {
    return state === "validated";
  }

  /**
   * Check if report is awaiting action from current user
   */
  function isAwaitingCurrentUserAction(
    reportAuthorRole: string,
    reportState: string
  ): boolean {
    const role = currentUserRole.value;
    if (!role) return false;

    // R3 should act on submitted R4 reports
    if (
      role === "R3" &&
      reportAuthorRole === "R4" &&
      reportState === "submitted"
    ) {
      return true;
    }

    // R2/R1 should act on in_progress reports or submitted R3 reports
    if (role === "R1" || role === "R2") {
      if (reportState === "in_progress") {
        return true;
      }
      if (reportState === "submitted" && reportAuthorRole === "R3") {
        return true;
      }
    }

    return false;
  }

  return {
    // State checks
    isReportEditable: (state: string) => isReportEditable(state as ReportState),
    isReportLocked: (state: string) => isReportLocked(state as ReportState),
    isTerminalState,
    isTransitionValid,
    isAwaitingCurrentUserAction,

    // Permission checks
    canValidateReport,
    canFlagReport,
    canEditReport,

    // State transitions
    getNextStateAfterValidation,
    getNextStateAfterFlag,

    // Actions
    getAvailableActions,
  };
}
