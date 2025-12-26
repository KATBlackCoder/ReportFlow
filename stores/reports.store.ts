import { defineStore } from "pinia";
import type { Report, ReportState } from "~/server/types/report";
import type { Questionnaire } from "~/server/types/questionnaire";

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

    // Actions
    fetchReports,
    fetchReport,
    fetchQuestionnaire,
    fetchActiveQuestionnaire,
    submitReport,
    updateReport,
    clearCurrentReport,
    clearCurrentQuestionnaire,
    clearError,
  };
});

