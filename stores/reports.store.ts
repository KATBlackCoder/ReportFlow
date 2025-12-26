import { defineStore } from "pinia";
import type { Report as ServerReport } from "../server/types/report";
import type { Questionnaire as ServerQuestionnaire } from "../server/types/questionnaire";

/**
 * Report state type
 */
type ReportState = "submitted" | "returned" | "in_progress" | "validated";

/**
 * Extended Report interface for client-side use (includes additional fields)
 */
interface Report extends ServerReport {
  questionnaireTitle?: string;
}

/**
 * Questionnaire interface (using server type)
 */
type Questionnaire = ServerQuestionnaire;

/**
 * Report submission payload
 */
interface SubmitReportPayload {
  questionnaireId: string;
  data: Record<string, unknown>;
}

/**
 * Report update payload
 */
interface UpdateReportPayload {
  data: Record<string, unknown>;
}

/**
 * Reports store for managing report state
 * Uses Pinia setup syntax per constitution
 */
export const useReportsStore = defineStore("reports", () => {
  // State
  const reports = ref<Report[]>([]);
  const currentReport = ref<Report | null>(null);
  const currentQuestionnaire = ref<Questionnaire | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Pagination state
  const total = ref(0);
  const page = ref(1);
  const limit = ref(50);

  /**
   * Fetch reports for current user
   */
  async function fetchReports(options?: {
    state?: ReportState;
    authorRole?: "R3" | "R4";
    offset?: number;
    limit?: number;
  }): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const queryParams = new URLSearchParams();
      if (options?.state) queryParams.set("state", options.state);
      if (options?.authorRole) queryParams.set("authorRole", options.authorRole);
      if (options?.offset !== undefined) queryParams.set("offset", options.offset.toString());
      if (options?.limit !== undefined) queryParams.set("limit", options.limit.toString());

      const result = await $fetch<{ reports: Report[]; total: number }>(
        `/api/reports?${queryParams.toString()}`
      );

      reports.value = result.reports;
      total.value = result.total;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch reports";
      error.value = message;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetch a single report by ID
   */
  async function fetchReport(id: string): Promise<Report | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const report = await $fetch<Report>(`/api/reports/${id}`);
      currentReport.value = report;
      return report;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch report";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetch questionnaire by ID
   */
  async function fetchQuestionnaire(id: string): Promise<Questionnaire | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const questionnaire = await $fetch<Questionnaire>(`/api/questionnaires/${id}`);
      currentQuestionnaire.value = questionnaire;
      return questionnaire;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch questionnaire";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetch active questionnaire for current user's role
   */
  async function fetchActiveQuestionnaire(): Promise<Questionnaire | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const questionnaire = await $fetch<Questionnaire>("/api/questionnaires/active");
      currentQuestionnaire.value = questionnaire;
      return questionnaire;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch questionnaire";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Submit a new report
   */
  async function submitReport(payload: SubmitReportPayload): Promise<Report | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const report = await $fetch<Report>("/api/reports", {
        method: "POST",
        body: payload,
      });

      // Add to local reports list
      reports.value.unshift(report);
      total.value++;

      return report;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit report";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Update an existing report (author only, editable states)
   */
  async function updateReport(id: string, payload: UpdateReportPayload): Promise<Report | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const report = await $fetch<Report>(`/api/reports/${id}`, {
        method: "PUT",
        body: payload,
      });

      // Update in local list
      const index = reports.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        reports.value[index] = report;
      }

      if (currentReport.value?.id === id) {
        currentReport.value = report;
      }

      return report;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update report";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Clear current report selection
   */
  function clearCurrentReport(): void {
    currentReport.value = null;
  }

  /**
   * Clear current questionnaire
   */
  function clearCurrentQuestionnaire(): void {
    currentQuestionnaire.value = null;
  }

  /**
   * Clear error state
   */
  function clearError(): void {
    error.value = null;
  }

  /**
   * Validate a report (for reviewers)
   */
  async function validateReport(id: string): Promise<Report | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const report = await $fetch<Report>(`/api/reports/${id}/validate`, {
        method: "POST",
      });

      // Update in local list
      const index = reports.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        reports.value[index] = report;
      }

      if (currentReport.value?.id === id) {
        currentReport.value = report;
      }

      return report;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to validate report";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Flag a report for correction (for reviewers)
   */
  async function flagReport(id: string, reason: string): Promise<Report | null> {
    isLoading.value = true;
    error.value = null;

    try {
      const report = await $fetch<Report>(`/api/reports/${id}/flag`, {
        method: "POST",
        body: { reason },
      });

      // Update in local list
      const index = reports.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        reports.value[index] = report;
      }

      if (currentReport.value?.id === id) {
        currentReport.value = report;
      }

      return report;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to flag report";
      error.value = message;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetch reports pending review for current user
   */
  async function fetchReportsForReview(): Promise<void> {
    // This uses the same endpoint but the server filters based on role
    await fetchReports();
  }

  /**
   * Get reports by state (computed filter)
   */
  const reportsByState = computed(() => {
    return (state: ReportState) => reports.value.filter((r) => r.state === state);
  });

  /**
   * Check if there are more reports to load
   */
  const hasMore = computed(() => {
    return reports.value.length < total.value;
  });

  /**
   * Get reports pending review (filtered client-side)
   */
  const pendingReviewReports = computed(() => {
    return reports.value.filter(
      (r) => r.state === "submitted" || r.state === "in_progress"
    );
  });

  return {
    // State
    reports,
    currentReport,
    currentQuestionnaire,
    isLoading,
    error,
    total,
    page,
    limit,

    // Getters
    reportsByState,
    hasMore,
    pendingReviewReports,

    // Actions
    fetchReports,
    fetchReport,
    fetchQuestionnaire,
    fetchActiveQuestionnaire,
    fetchReportsForReview,
    submitReport,
    updateReport,
    validateReport,
    flagReport,
    clearCurrentReport,
    clearCurrentQuestionnaire,
    clearError,
  };
});

