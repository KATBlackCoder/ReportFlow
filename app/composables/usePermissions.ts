import { computed } from "vue";
import {
  Role,
  isRoleSuperior,
  canManageRole,
  REPORT_SUBMITTER_ROLES,
  REPORT_VALIDATOR_ROLES,
  REPORT_EXPORT_ROLES,
  QUESTIONNAIRE_MANAGER_ROLES,
} from "../../server/types/roles";
import { ReportState, isReportEditable } from "../../server/types/report";
import { useAuthStore } from "../../stores/auth.store";
/**
 * Permission composable for centralized authorization logic
 * All permission checks should go through this composable
 */
export function usePermissions() {
  // Use auth store for current user
  const authStore = useAuthStore();

  // Current user role from auth store
  const currentUserRole = computed<Role | null>(() => {
    return authStore.currentRole;
  });

  /**
   * Check if current user can create a user with the given role
   */
  const canCreateUser = computed(() => {
    return (targetRole: Role): boolean => {
      const role = currentUserRole.value;
      if (!role) return false;
      return canManageRole(role, targetRole);
    };
  });

  /**
   * Check if current user can edit a user with the given role
   */
  const canEditUser = computed(() => {
    return (targetRole: Role): boolean => {
      const role = currentUserRole.value;
      if (!role) return false;
      // Can only edit users of lower or equal manageable roles
      return canManageRole(role, targetRole);
    };
  });

  /**
   * Check if current user can delete a user with the given role
   */
  const canDeleteUser = computed(() => {
    return (targetRole: Role): boolean => {
      const role = currentUserRole.value;
      if (!role) return false;
      // Can only delete users of strictly lower roles
      return canManageRole(role, targetRole) && isRoleSuperior(role, targetRole);
    };
  });

  /**
   * Check if current user can submit reports
   */
  const canSubmitReports = computed(() => {
    const role = currentUserRole.value;
    if (!role) return false;
    return (REPORT_SUBMITTER_ROLES as readonly Role[]).includes(role);
  });

  /**
   * Check if current user can validate reports
   */
  const canValidateReports = computed(() => {
    const role = currentUserRole.value;
    if (!role) return false;
    return (REPORT_VALIDATOR_ROLES as readonly Role[]).includes(role);
  });

  /**
   * Check if current user can validate a specific report
   * R3 can validate R4 reports
   * R2/R1 can validate R3/R4 reports that are in_progress
   */
  const canValidateReport = computed(() => {
    return (reportAuthorRole: Role, reportState: ReportState): boolean => {
      const role = currentUserRole.value;
      if (!role) return false;

      // Only submitted or in_progress reports can be validated
      if (
        reportState !== ReportState.SUBMITTED &&
        reportState !== ReportState.IN_PROGRESS
      ) {
        return false;
      }

      // R3 can validate submitted R4 reports
      if (role === Role.R3 && reportAuthorRole === Role.R4 && reportState === ReportState.SUBMITTED) {
        return true;
      }

      // R2/R1 can validate in_progress reports (or submitted R3 reports)
      if (role === Role.R1 || role === Role.R2) {
        // R2/R1 can validate any report in the appropriate state
        return reportState === ReportState.IN_PROGRESS || reportAuthorRole === Role.R3;
      }

      return false;
    };
  });

  /**
   * Check if current user can flag (return) a report
   */
  const canFlagReport = computed(() => {
    return (reportAuthorRole: Role, reportState: ReportState): boolean => {
      // Same rules as validation - if you can validate, you can flag
      return canValidateReport.value(reportAuthorRole, reportState);
    };
  });

  /**
   * Check if current user can edit a report
   * Only the author can edit, and only in editable states
   */
  const canEditReport = computed(() => {
    return (
      reportAuthorId: string,
      reportState: ReportState,
      currentUserId: string
    ): boolean => {
      // Only author can edit
      if (reportAuthorId !== currentUserId) return false;

      // Only in editable states
      return isReportEditable(reportState);
    };
  });

  /**
   * Check if current user can view a report
   * R4 can only see their own reports
   * R3 can see their reports + R4 reports they supervise
   * R2/R1 can see all reports
   */
  const canViewReport = computed(() => {
    return (reportAuthorId: string, reportAuthorRole: Role, currentUserId: string): boolean => {
      const role = currentUserRole.value;
      if (!role) return false;

      // R1 and R2 can view all reports
      if (role === Role.R1 || role === Role.R2) return true;

      // R3 can view their own reports and R4 reports
      if (role === Role.R3) {
        return reportAuthorId === currentUserId || reportAuthorRole === Role.R4;
      }

      // R4 can only view their own reports
      if (role === Role.R4) {
        return reportAuthorId === currentUserId;
      }

      return false;
    };
  });

  /**
   * Check if current user can export reports
   */
  const canExport = computed(() => {
    const role = currentUserRole.value;
    if (!role) return false;
    return (REPORT_EXPORT_ROLES as readonly Role[]).includes(role);
  });

  /**
   * Check if current user can manage questionnaires
   */
  const canManageQuestionnaires = computed(() => {
    const role = currentUserRole.value;
    if (!role) return false;
    return (QUESTIONNAIRE_MANAGER_ROLES as readonly Role[]).includes(role);
  });

  /**
   * Check if current user can view user management section
   */
  const canViewUserManagement = computed(() => {
    const role = currentUserRole.value;
    if (!role) return false;
    return role === Role.R1 || role === Role.R2;
  });

  /**
   * Check if current user can view admin section
   */
  const canViewAdmin = computed(() => {
    const role = currentUserRole.value;
    if (!role) return false;
    return role === Role.R1 || role === Role.R2;
  });

  /**
   * Get roles that the current user can view
   */
  const viewableRoles = computed(() => {
    const role = currentUserRole.value;
    if (!role) return [];

    switch (role) {
      case Role.R1:
        return [Role.R1, Role.R2, Role.R3, Role.R4];
      case Role.R2:
        return [Role.R3, Role.R4];
      case Role.R3:
        return [Role.R4];
      default:
        return [];
    }
  });

  /**
   * Get roles that the current user can create
   */
  const creatableRoles = computed(() => {
    const role = currentUserRole.value;
    if (!role) return [];

    switch (role) {
      case Role.R1:
        return [Role.R1, Role.R2, Role.R3, Role.R4];
      case Role.R2:
        return [Role.R3, Role.R4];
      default:
        return [];
    }
  });

  return {
    currentUserRole,
    canCreateUser,
    canEditUser,
    canDeleteUser,
    canSubmitReports,
    canValidateReports,
    canValidateReport,
    canFlagReport,
    canEditReport,
    canViewReport,
    canExport,
    canManageQuestionnaires,
    canViewUserManagement,
    canViewAdmin,
    viewableRoles,
    creatableRoles,
  };
}

