import { eq } from "drizzle-orm";
import { db, schema } from "hub:db";
import {
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
  createBadRequestError,
} from "../../../utils/errors";
import { ReportState, isValidStateTransition } from "../../../types/report";
import { Role } from "../../../types/roles";
import { ReviewActionType } from "../../../types/review";
import {
  logAudit,
  AuditAction,
  AuditResourceType,
} from "../../../utils/audit";

/**
 * Request body for flagging a report
 */
interface FlagReportBody {
  reason: string;
}

/**
 * POST /api/reports/[id]/flag
 * Flag a report for correction - returns it to the author
 *
 * Requires a reason explaining what needs to be corrected
 * Report state changes to 'returned'
 */
export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  if (!session.user) {
    throw createUnauthorizedError();
  }

  const userRole = session.user.role as Role;
  const userId = session.user.phone;

  // Get report ID from route params
  const reportId = getRouterParam(event, "id");
  if (!reportId) {
    throw createBadRequestError("Report ID is required");
  }

  // Parse request body
  const body = await readBody<FlagReportBody>(event);

  // Validate reason is provided
  if (!body?.reason || typeof body.reason !== "string" || body.reason.trim().length === 0) {
    throw createBadRequestError("A reason is required when flagging a report");
  }

  const reason = body.reason.trim();

  // Validate reason length
  if (reason.length < 10) {
    throw createBadRequestError("Reason must be at least 10 characters");
  }

  if (reason.length > 1000) {
    throw createBadRequestError("Reason must not exceed 1000 characters");
  }

  // Fetch the report
  const report = await db.query.reports.findFirst({
    where: eq(schema.reports.id, reportId),
  });

  if (!report) {
    throw createNotFoundError("Report not found");
  }

  const reportAuthorRole = report.authorRole as Role;
  const currentState = report.state as ReportState;

  // Check if user can flag this report
  const canFlag = checkCanFlagReport(userRole, reportAuthorRole, currentState);

  if (!canFlag) {
    throw createForbiddenError("You cannot flag this report");
  }

  const nextState = ReportState.RETURNED;

  // Verify the transition is valid
  if (!isValidStateTransition(currentState, nextState)) {
    throw createBadRequestError(
      `Invalid state transition from ${currentState} to ${nextState}`
    );
  }

  const now = new Date();

  // Update the report state
  const [updatedReport] = await db
    .update(schema.reports)
    .set({
      state: nextState,
      correctionReason: reason,
      flaggedBy: userId,
      stateChangedAt: now,
      updatedAt: now,
    })
    .where(eq(schema.reports.id, reportId))
    .returning();

  // Create review action record
  await db.insert(schema.reviewActions).values({
    reportId,
    reviewerId: userId,
    actionType: ReviewActionType.FLAG,
    fromState: currentState,
    toState: nextState,
    reason,
    createdAt: now,
  });

  // Log audit entry
  await logAudit(event, userId, AuditAction.REPORT_FLAGGED, AuditResourceType.REPORT, reportId, {
    oldValues: { state: currentState },
    newValues: { state: nextState, correctionReason: reason, flaggedBy: userId },
  });

  return {
    id: updatedReport.id,
    questionnaireId: updatedReport.questionnaireId,
    authorId: updatedReport.authorId,
    authorRole: updatedReport.authorRole,
    state: updatedReport.state,
    modified: updatedReport.modified,
    correctionReason: updatedReport.correctionReason,
    flaggedBy: updatedReport.flaggedBy,
    stateChangedAt: updatedReport.stateChangedAt,
    updatedAt: updatedReport.updatedAt,
  };
});

/**
 * Check if the user can flag the report based on role and state
 * Same rules as validation - if you can validate, you can flag
 */
function checkCanFlagReport(
  userRole: Role,
  reportAuthorRole: Role,
  reportState: ReportState
): boolean {
  // Only submitted or in_progress reports can be flagged
  if (
    reportState !== ReportState.SUBMITTED &&
    reportState !== ReportState.IN_PROGRESS
  ) {
    return false;
  }

  // R3 can flag submitted R4 reports
  if (
    userRole === Role.R3 &&
    reportAuthorRole === Role.R4 &&
    reportState === ReportState.SUBMITTED
  ) {
    return true;
  }

  // R2/R1 can flag:
  // - in_progress reports
  // - submitted R3 reports
  if (userRole === Role.R1 || userRole === Role.R2) {
    if (reportState === ReportState.IN_PROGRESS) {
      return true;
    }
    if (
      reportState === ReportState.SUBMITTED &&
      reportAuthorRole === Role.R3
    ) {
      return true;
    }
  }

  return false;
}

