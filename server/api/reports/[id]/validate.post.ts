import { eq } from "drizzle-orm";
import { db, schema } from "hub:db";
import {
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
  createBadRequestError,
} from "../../../utils/errors";
import {
  ReportState,
  isValidStateTransition,
  getValidationNextState,
} from "../../../types/report";
import { Role } from "../../../types/roles";
import { ReviewActionType } from "../../../types/review";
import {
  logAudit,
  AuditAction,
  AuditResourceType,
} from "../../../utils/audit";

/**
 * POST /api/reports/[id]/validate
 * Validate a report - moves it to the next state in the workflow
 *
 * R3 validating R4 report: submitted -> in_progress
 * R2/R1 validating report: in_progress -> validated
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

  // Fetch the report
  const report = await db.query.reports.findFirst({
    where: eq(schema.reports.id, reportId),
  });

  if (!report) {
    throw createNotFoundError("Report not found");
  }

  const reportAuthorRole = report.authorRole as Role;
  const currentState = report.state as ReportState;

  // Check if user can validate this report
  const canValidate = checkCanValidateReport(
    userRole,
    reportAuthorRole,
    currentState
  );

  if (!canValidate) {
    throw createForbiddenError("You cannot validate this report");
  }

  // Calculate the next state
  const nextState = getValidationNextState(currentState);

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
      validatedBy: userId,
      stateChangedAt: now,
      updatedAt: now,
    })
    .where(eq(schema.reports.id, reportId))
    .returning();

  // Create review action record
  await db.insert(schema.reviewActions).values({
    reportId,
    reviewerId: userId,
    actionType: ReviewActionType.VALIDATE,
    fromState: currentState,
    toState: nextState,
    reason: null,
    createdAt: now,
  });

  // Log audit entry
  await logAudit(event, userId, AuditAction.REPORT_VALIDATED, AuditResourceType.REPORT, reportId, {
    oldValues: { state: currentState },
    newValues: { state: nextState, validatedBy: userId },
  });

  return {
    id: updatedReport.id,
    questionnaireId: updatedReport.questionnaireId,
    authorId: updatedReport.authorId,
    authorRole: updatedReport.authorRole,
    state: updatedReport.state,
    modified: updatedReport.modified,
    correctionReason: updatedReport.correctionReason,
    validatedBy: updatedReport.validatedBy,
    stateChangedAt: updatedReport.stateChangedAt,
    updatedAt: updatedReport.updatedAt,
  };
});

/**
 * Check if the user can validate the report based on role and state
 */
function checkCanValidateReport(
  userRole: Role,
  reportAuthorRole: Role,
  reportState: ReportState
): boolean {
  // Only submitted or in_progress reports can be validated
  if (
    reportState !== ReportState.SUBMITTED &&
    reportState !== ReportState.IN_PROGRESS
  ) {
    return false;
  }

  // R3 can validate submitted R4 reports
  if (
    userRole === Role.R3 &&
    reportAuthorRole === Role.R4 &&
    reportState === ReportState.SUBMITTED
  ) {
    return true;
  }

  // R2/R1 can validate:
  // - in_progress reports (already validated by R3)
  // - submitted R3 reports (R3 reports go directly to R2/R1)
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

