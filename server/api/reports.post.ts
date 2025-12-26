import { eq, and } from "drizzle-orm";
import { db, schema } from "hub:db";
import { createValidationError, createForbiddenError, createUnauthorizedError, createNotFoundError } from "../utils/errors";
import { logAudit, AuditAction, AuditResourceType } from "../utils/audit";
import { ReportState } from "../types/report";

/**
 * Report submission payload
 */
interface SubmitReportBody {
  questionnaireId: string;
  data: Record<string, unknown>;
}

/**
 * POST /api/reports
 * Submit a new report
 * Only R3 and R4 can submit reports
 */
export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  if (!session.user) {
    throw createUnauthorizedError();
  }

  const userRole = session.user.role;

  // Only R3 and R4 can submit reports
  if (userRole !== "R3" && userRole !== "R4") {
    throw createForbiddenError("Your role cannot submit reports");
  }

  const body = await readBody<SubmitReportBody>(event);

  // Validate required fields
  if (!body.questionnaireId) {
    throw createValidationError("Questionnaire ID is required");
  }

  if (!body.data || typeof body.data !== "object") {
    throw createValidationError("Report data is required");
  }

  // Verify questionnaire exists and is for the user's role
  const questionnaire = await db.query.questionnaires.findFirst({
    where: and(
      eq(schema.questionnaires.id, body.questionnaireId),
      eq(schema.questionnaires.isActive, true)
    ),
  });

  if (!questionnaire) {
    throw createNotFoundError("Questionnaire", body.questionnaireId);
  }

  // Verify questionnaire is for the user's role
  if (questionnaire.targetRole !== userRole) {
    throw createForbiddenError("This questionnaire is not for your role");
  }

  // TODO: Validate form data against questionnaire fields
  // This would validate required fields, types, etc.

  // Create the report
  const now = new Date();
  const [newReport] = await db
    .insert(schema.reports)
    .values({
      questionnaireId: body.questionnaireId,
      authorId: session.user.phone,
      authorRole: userRole as "R3" | "R4",
      state: ReportState.SUBMITTED,
      data: body.data,
      modified: false,
      submittedAt: now,
      stateChangedAt: now,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  // Log audit event
  await logAudit(
    event,
    session.user.phone,
    AuditAction.REPORT_SUBMITTED,
    AuditResourceType.REPORT,
    newReport.id,
    { newValues: { questionnaireId: body.questionnaireId, state: ReportState.SUBMITTED } }
  );

  return {
    id: newReport.id,
    questionnaireId: newReport.questionnaireId,
    authorId: newReport.authorId,
    authorRole: newReport.authorRole,
    state: newReport.state,
    data: newReport.data,
    modified: newReport.modified,
    correctionReason: newReport.correctionReason,
    submittedAt: newReport.submittedAt,
    stateChangedAt: newReport.stateChangedAt,
    createdAt: newReport.createdAt,
    updatedAt: newReport.updatedAt,
  };
});

