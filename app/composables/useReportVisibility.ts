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
 * Composable for managing report visibility based on role hierarchy
 * Implements the visibility rules:
 * - R4 reports: visible only to R3
 * - R3 reports: visible to R2 and R1
 * - Users can only view their own reports + reports they need to review
 */
export function useReportVisibility() {
  const authStore = useAuthStore();

  const currentUserRole = computed<Role | null>(() => authStore.currentRole as Role | null);
  const currentUserId = computed<string | null>(() => authStore.currentUser?.phone ?? null);

  /**
   * Check if current user can view a specific report
   */
  function canViewReport(
    reportAuthorId: string,
    reportAuthorRole: string
  ): boolean {
    const role = currentUserRole.value;
    const userId = currentUserId.value;

    if (!role || !userId) return false;

    // R1 and R2 can view all reports
    if (role === "R1" || role === "R2") {
      return true;
    }

    // R3 can view their own reports and R4 reports they supervise
    if (role === "R3") {
      return reportAuthorId === userId || reportAuthorRole === "R4";
    }

    // R4 can only view their own reports
    if (role === "R4") {
      return reportAuthorId === userId;
    }

    return false;
  }

  /**
   * Filter reports based on visibility rules
   */
  function filterVisibleReports<T extends { authorId: string; authorRole: string }>(
    reports: T[]
  ): T[] {
    return reports.filter((report) =>
      canViewReport(report.authorId, report.authorRole)
    );
  }

  /**
   * Check if current user should see reports for review
   * R3 sees R4 reports, R2/R1 see all reports needing review
   */
  function canReviewReports(): boolean {
    const role = currentUserRole.value;
    if (!role) return false;

    return role === "R1" || role === "R2" || role === "R3";
  }

  /**
   * Get the author roles that current user can review
   */
  function getReviewableAuthorRoles(): Role[] {
    const role = currentUserRole.value;
    if (!role) return [];

    switch (role) {
      case "R1":
      case "R2":
        // R1/R2 can review R3 and R4 reports
        return ["R3", "R4"];
      case "R3":
        // R3 can only review R4 reports
        return ["R4"];
      default:
        return [];
    }
  }

  /**
   * Get report states that current user should see for review
   */
  function getReviewableStates(): ReportState[] {
    const role = currentUserRole.value;
    if (!role) return [];

    switch (role) {
      case "R1":
      case "R2":
        // R1/R2 sees in_progress reports and submitted R3 reports
        return ["submitted", "in_progress"];
      case "R3":
        // R3 sees submitted R4 reports
        return ["submitted"];
      default:
        return [];
    }
  }

  /**
   * Check if current user is the author of a report
   */
  function isReportAuthor(reportAuthorId: string): boolean {
    const userId = currentUserId.value;
    return userId !== null && reportAuthorId === userId;
  }

  /**
   * Get reports pending review for current user
   */
  function filterReportsForReview<
    T extends { authorId: string; authorRole: string; state: string }
  >(reports: T[]): T[] {
    const role = currentUserRole.value;
    const userId = currentUserId.value;

    if (!role || !userId) return [];

    return reports.filter((report) => {
      // Don't show user's own reports in review queue
      if (report.authorId === userId) return false;

      switch (role) {
        case "R1":
        case "R2":
          // Show in_progress reports or submitted R3 reports
          return (
            report.state === "in_progress" ||
            (report.state === "submitted" && report.authorRole === "R3")
          );
        case "R3":
          // Show submitted R4 reports
          return (
            report.state === "submitted" && report.authorRole === "R4"
          );
        default:
          return false;
      }
    });
  }

  /**
   * Get reports owned by current user
   */
  function filterOwnReports<T extends { authorId: string }>(reports: T[]): T[] {
    const userId = currentUserId.value;
    if (!userId) return [];

    return reports.filter((report) => report.authorId === userId);
  }

  return {
    // Permission checks
    canViewReport,
    canReviewReports,
    isReportAuthor,

    // Role-based queries
    getReviewableAuthorRoles,
    getReviewableStates,

    // Filtering
    filterVisibleReports,
    filterReportsForReview,
    filterOwnReports,
  };
}
