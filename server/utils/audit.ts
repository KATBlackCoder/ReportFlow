import type { H3Event } from "h3";
import { getRequestIP, getHeader } from "h3";

/**
 * Audit action types
 */
export enum AuditAction {
  // Authentication
  USER_LOGIN = "user.login",
  USER_LOGOUT = "user.logout",
  USER_LOGIN_FAILED = "user.login_failed",
  PASSWORD_RESET_REQUESTED = "user.password_reset_requested",
  PASSWORD_RESET_COMPLETED = "user.password_reset_completed",

  // User management
  USER_CREATED = "user.created",
  USER_UPDATED = "user.updated",
  USER_DELETED = "user.deleted",
  USER_DEACTIVATED = "user.deactivated",
  USER_ACTIVATED = "user.activated",

  // Report actions
  REPORT_CREATED = "report.created",
  REPORT_SUBMITTED = "report.submitted",
  REPORT_UPDATED = "report.updated",
  REPORT_VALIDATED = "report.validated",
  REPORT_FLAGGED = "report.flagged",
  REPORT_RESUBMITTED = "report.resubmitted",
  REPORT_APPROVED = "report.approved",
  REPORT_REJECTED = "report.rejected",

  // Questionnaire actions
  QUESTIONNAIRE_CREATED = "questionnaire.created",
  QUESTIONNAIRE_UPDATED = "questionnaire.updated",
  QUESTIONNAIRE_DELETED = "questionnaire.deleted",

  // Export actions
  REPORT_EXPORTED = "report.exported",
}

/**
 * Resource types for audit entries
 */
export enum AuditResourceType {
  USER = "user",
  REPORT = "report",
  QUESTIONNAIRE = "questionnaire",
  SESSION = "session",
}

/**
 * Audit entry interface
 */
export interface AuditEntry {
  id: string;
  actorId: string;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId: string;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

/**
 * Audit entry creation payload
 */
export interface CreateAuditEntryPayload {
  actorId: string;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId: string;
  oldValues?: Record<string, unknown> | null;
  newValues?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Audit retention configuration (in years)
 * - Legal retention: 7 years for compliance
 * - Operational retention: 2 years for quick access
 */
export const AUDIT_RETENTION_CONFIG = {
  legalRetentionYears: 7,
  operationalRetentionYears: 2,
} as const;

/**
 * Calculate expiry date based on retention policy
 */
export function calculateAuditExpiryDate(
  createdAt: Date,
  retentionYears: number = AUDIT_RETENTION_CONFIG.legalRetentionYears
): Date {
  const expiry = new Date(createdAt);
  expiry.setFullYear(expiry.getFullYear() + retentionYears);
  return expiry;
}

/**
 * Check if an audit entry is within operational retention period
 */
export function isWithinOperationalRetention(createdAt: Date): boolean {
  const now = new Date();
  const operationalLimit = new Date(createdAt);
  operationalLimit.setFullYear(
    operationalLimit.getFullYear() + AUDIT_RETENTION_CONFIG.operationalRetentionYears
  );
  return now <= operationalLimit;
}

/**
 * Extract client info from H3 event for audit logging
 */
export function extractClientInfo(event: H3Event): {
  ipAddress: string | null;
  userAgent: string | null;
} {
  return {
    ipAddress: getRequestIP(event, { xForwardedFor: true }) ?? null,
    userAgent: getHeader(event, "user-agent") ?? null,
  };
}

/**
 * Generate unique audit entry ID
 */
export function generateAuditId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `audit_${timestamp}_${randomPart}`;
}

/**
 * Sanitize values for audit logging (remove sensitive data)
 */
export function sanitizeAuditValues(
  values: Record<string, unknown> | null
): Record<string, unknown> | null {
  if (!values) return null;

  const sensitiveFields = ["password", "passwordHash", "token", "secret"];
  const sanitized = { ...values };

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = "[REDACTED]";
    }
  }

  return sanitized;
}

/**
 * Create audit entry (to be implemented with database)
 * This is a placeholder that will be connected to the database layer
 */
export async function createAuditEntry(
  payload: CreateAuditEntryPayload
): Promise<AuditEntry> {
  const now = new Date();
  const entry: AuditEntry = {
    id: generateAuditId(),
    actorId: payload.actorId,
    action: payload.action,
    resourceType: payload.resourceType,
    resourceId: payload.resourceId,
    oldValues: sanitizeAuditValues(payload.oldValues ?? null),
    newValues: sanitizeAuditValues(payload.newValues ?? null),
    ipAddress: payload.ipAddress ?? null,
    userAgent: payload.userAgent ?? null,
    createdAt: now,
  };

  // TODO: Persist to database when Nuxt Hub is configured
  console.info("[AUDIT]", JSON.stringify(entry));

  return entry;
}

/**
 * Log audit entry with event context
 */
export async function logAudit(
  event: H3Event,
  actorId: string,
  action: AuditAction,
  resourceType: AuditResourceType,
  resourceId: string,
  options?: {
    oldValues?: Record<string, unknown> | null;
    newValues?: Record<string, unknown> | null;
  }
): Promise<AuditEntry> {
  const clientInfo = extractClientInfo(event);

  return createAuditEntry({
    actorId,
    action,
    resourceType,
    resourceId,
    oldValues: options?.oldValues,
    newValues: options?.newValues,
    ...clientInfo,
  });
}

