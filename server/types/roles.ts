/**
 * Role definitions for hierarchical reporting system
 * R1 (Chef de Service) > R2 (Chef des Superviseurs) > R3 (Superviseur) > R4 (Employé)
 */

export enum Role {
  R1 = "R1", // Chef de Service - Full admin
  R2 = "R2", // Chef des Superviseurs - User management R3/R4
  R3 = "R3", // Superviseur - Validate R4 reports, submit own
  R4 = "R4", // Employé - Submit reports only
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.R1]: 1,
  [Role.R2]: 2,
  [Role.R3]: 3,
  [Role.R4]: 4,
} as const;

/**
 * Check if a role is superior to another
 */
export function isRoleSuperior(role: Role, targetRole: Role): boolean {
  return ROLE_HIERARCHY[role] < ROLE_HIERARCHY[targetRole];
}

/**
 * Check if a role is equal or superior to another
 */
export function isRoleEqualOrSuperior(role: Role, targetRole: Role): boolean {
  return ROLE_HIERARCHY[role] <= ROLE_HIERARCHY[targetRole];
}

/**
 * Get all roles that a user can manage (create/edit/delete)
 */
export function getManageableRoles(role: Role): Role[] {
  switch (role) {
    case Role.R1:
      return [Role.R1, Role.R2, Role.R3, Role.R4];
    case Role.R2:
      return [Role.R3, Role.R4];
    default:
      return [];
  }
}

/**
 * Check if a role can manage another role
 */
export function canManageRole(actorRole: Role, targetRole: Role): boolean {
  return getManageableRoles(actorRole).includes(targetRole);
}

/**
 * Roles that can submit reports
 */
export const REPORT_SUBMITTER_ROLES = [Role.R3, Role.R4] as const;
export type ReportSubmitterRole = (typeof REPORT_SUBMITTER_ROLES)[number];

/**
 * Roles that can validate reports
 */
export const REPORT_VALIDATOR_ROLES = [Role.R1, Role.R2, Role.R3] as const;
export type ReportValidatorRole = (typeof REPORT_VALIDATOR_ROLES)[number];

/**
 * Roles that can export reports
 */
export const REPORT_EXPORT_ROLES = [Role.R1, Role.R2, Role.R3] as const;
export type ReportExportRole = (typeof REPORT_EXPORT_ROLES)[number];

/**
 * Roles that can manage questionnaires
 */
export const QUESTIONNAIRE_MANAGER_ROLES = [Role.R1] as const;

/**
 * Role display names (French)
 */
export const ROLE_LABELS: Record<Role, string> = {
  [Role.R1]: "Chef de Service",
  [Role.R2]: "Chef des Superviseurs",
  [Role.R3]: "Superviseur",
  [Role.R4]: "Employé",
} as const;

/**
 * Validate if a string is a valid Role
 */
export function isValidRole(role: string): role is Role {
  return Object.values(Role).includes(role as Role);
}

