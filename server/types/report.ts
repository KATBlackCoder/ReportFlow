import type { Role } from "./roles";

/**
 * Report workflow states
 */
export enum ReportState {
  SUBMITTED = "submitted",
  RETURNED = "returned",
  IN_PROGRESS = "in_progress",
  VALIDATED = "validated",
}

/**
 * Valid state transitions for the report workflow
 */
export const VALID_STATE_TRANSITIONS: Record<ReportState, ReportState[]> = {
  [ReportState.SUBMITTED]: [ReportState.RETURNED, ReportState.IN_PROGRESS],
  [ReportState.RETURNED]: [ReportState.SUBMITTED], // Author resubmits
  [ReportState.IN_PROGRESS]: [ReportState.VALIDATED, ReportState.RETURNED],
  [ReportState.VALIDATED]: [], // Terminal state
} as const;

/**
 * States where the report can be edited by the author
 */
export const EDITABLE_STATES = [
  ReportState.SUBMITTED,
  ReportState.RETURNED,
] as const;

/**
 * States where the report is locked (read-only)
 */
export const LOCKED_STATES = [
  ReportState.IN_PROGRESS,
  ReportState.VALIDATED,
] as const;

/**
 * Review action types
 */
export enum ReviewActionType {
  VALIDATE = "validate",
  FLAG = "flag",
}

/**
 * Report entity interface
 */
export interface Report {
  id: string;
  questionnaireId: string;
  authorId: string;
  authorRole: Role;
  state: ReportState;
  data: Record<string, unknown>;
  modified: boolean;
  correctionReason: string | null;
  flaggedBy: string | null;
  validatedBy: string | null;
  submittedAt: Date;
  stateChangedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Review action entity interface
 */
export interface ReviewAction {
  id: string;
  reportId: string;
  reviewerId: string;
  actionType: ReviewActionType;
  fromState: ReportState;
  toState: ReportState;
  reason: string | null;
  createdAt: Date;
}

/**
 * Check if a state transition is valid
 */
export function isValidStateTransition(
  fromState: ReportState,
  toState: ReportState
): boolean {
  return VALID_STATE_TRANSITIONS[fromState].includes(toState);
}

/**
 * Check if a report is editable
 */
export function isReportEditable(state: ReportState): boolean {
  return EDITABLE_STATES.includes(state as (typeof EDITABLE_STATES)[number]);
}

/**
 * Check if a report is locked
 */
export function isReportLocked(state: ReportState): boolean {
  return LOCKED_STATES.includes(state as (typeof LOCKED_STATES)[number]);
}

/**
 * Get the next state after validation based on current state
 */
export function getValidationNextState(currentState: ReportState): ReportState {
  if (currentState === ReportState.SUBMITTED) {
    return ReportState.IN_PROGRESS;
  }
  if (currentState === ReportState.IN_PROGRESS) {
    return ReportState.VALIDATED;
  }
  throw new Error(`Cannot validate report in state: ${currentState}`);
}

/**
 * State display labels (French)
 */
export const STATE_LABELS: Record<ReportState, string> = {
  [ReportState.SUBMITTED]: "Soumis",
  [ReportState.RETURNED]: "Retourné",
  [ReportState.IN_PROGRESS]: "En cours",
  [ReportState.VALIDATED]: "Validé",
} as const;

