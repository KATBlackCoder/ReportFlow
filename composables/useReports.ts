import type { Report, ReportState } from "~/server/types/report";
import { EDITABLE_STATES, LOCKED_STATES } from "~/server/types/report";

/**
 * Composable for report submission and management logic
 */
export function useReports() {
  const reportsStore = useReportsStore();
  const authStore = useAuthStore();

  /**
   * All reports from store
   */
  const reports = computed(() => reportsStore.reports);

  /**
   * Current selected report
   */
  const currentReport = computed(() => reportsStore.currentReport);

  /**
   * Loading state
   */
  const isLoading = computed(() => reportsStore.isLoading);

  /**
   * Error state
   */
  const error = computed(() => reportsStore.error);

  /**
   * Total count
   */
  const total = computed(() => reportsStore.total);

  /**
   * Check if user can edit the current report
   */
  const canEditCurrent = computed(() => {
    if (!currentReport.value) return false;
    if (!authStore.currentUser) return false;

    // Only author can edit
    if (currentReport.value.authorId !== authStore.currentUser.phone) {
      return false;
    }

    // Only in editable states
    return isReportEditable(currentReport.value.state);
  });

  /**
   * Check if a report is in an editable state
   */
  function isReportEditable(state: ReportState | string): boolean {
    return EDITABLE_STATES.includes(state as typeof EDITABLE_STATES[number]);
  }

  /**
   * Check if a report is locked
   */
  function isReportLocked(state: ReportState | string): boolean {
    return LOCKED_STATES.includes(state as typeof LOCKED_STATES[number]);
  }

  /**
   * Fetch all reports with optional filters
   */
  async function fetchAll(options?: {
    state?: ReportState;
    authorRole?: "R3" | "R4";
    offset?: number;
    limit?: number;
  }): Promise<void> {
    await reportsStore.fetchReports(options);
  }

  /**
   * Fetch a single report by ID
   */
  async function fetchById(id: string): Promise<Report | null> {
    return reportsStore.fetchReport(id);
  }

  /**
   * Submit a new report
   */
  async function submit(payload: {
    questionnaireId: string;
    data: Record<string, unknown>;
  }): Promise<Report | null> {
    return reportsStore.submitReport(payload);
  }

  /**
   * Update an existing report
   */
  async function update(
    id: string,
    data: Record<string, unknown>
  ): Promise<Report | null> {
    return reportsStore.updateReport(id, { data });
  }

  /**
   * Get reports by state
   */
  function getByState(state: ReportState): Report[] {
    return reportsStore.reportsByState(state);
  }

  /**
   * Clear current report selection
   */
  function clearCurrent(): void {
    reportsStore.clearCurrentReport();
  }

  /**
   * Clear error
   */
  function clearError(): void {
    reportsStore.clearError();
  }

  /**
   * State color mapping for UI
   */
  const stateColors: Record<string, "success" | "warning" | "info" | "error" | "neutral"> = {
    submitted: "info",
    returned: "error",
    in_progress: "warning",
    validated: "success",
  };

  /**
   * State labels (French)
   */
  const stateLabels: Record<string, string> = {
    submitted: "Soumis",
    returned: "Retourné",
    in_progress: "En cours",
    validated: "Validé",
  };

  /**
   * Get color for a state
   */
  function getStateColor(state: string): "success" | "warning" | "info" | "error" | "neutral" {
    return stateColors[state] ?? "neutral";
  }

  /**
   * Get label for a state
   */
  function getStateLabel(state: string): string {
    return stateLabels[state] ?? state;
  }

  return {
    // State
    reports,
    currentReport,
    isLoading,
    error,
    total,
    canEditCurrent,

    // Actions
    fetchAll,
    fetchById,
    submit,
    update,
    getByState,
    clearCurrent,
    clearError,

    // Helpers
    isReportEditable,
    isReportLocked,
    getStateColor,
    getStateLabel,
    stateColors,
    stateLabels,
  };
}

