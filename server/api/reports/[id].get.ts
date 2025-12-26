import { eq } from "drizzle-orm";
import { db, schema } from "hub:db";
import { createNotFoundError, createForbiddenError, createUnauthorizedError } from "../../utils/errors";

/**
 * GET /api/reports/:id
 * Get a single report by ID with role-based access control
 */
export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  if (!session.user) {
    throw createUnauthorizedError();
  }

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createNotFoundError("Report");
  }

  const report = await db.query.reports.findFirst({
    where: eq(schema.reports.id, id),
    with: {
      questionnaire: true,
    },
  });

  if (!report) {
    throw createNotFoundError("Report", id);
  }

  const userRole = session.user.role;
  const userId = session.user.phone;

  // Check visibility based on role
  let canView = false;

  switch (userRole) {
    case "R4":
      // R4 can only see their own reports
      canView = report.authorId === userId;
      break;
    case "R3":
      // R3 can see their own reports + R4 reports
      canView = report.authorId === userId || report.authorRole === "R4";
      break;
    case "R2":
    case "R1":
      // R2/R1 can see all reports
      canView = true;
      break;
  }

  if (!canView) {
    throw createForbiddenError("You don't have permission to view this report");
  }

  // Cast questionnaire relation for proper typing with hub:db
  const questionnaire = report.questionnaire as {
    id: string;
    title: string;
    fields: unknown[];
  } | null;

  return {
    id: report.id,
    questionnaireId: report.questionnaireId,
    questionnaire: questionnaire
      ? {
          id: questionnaire.id,
          title: questionnaire.title,
          fields: questionnaire.fields,
        }
      : null,
    authorId: report.authorId,
    authorRole: report.authorRole,
    state: report.state,
    data: report.data,
    modified: report.modified,
    correctionReason: report.correctionReason,
    flaggedBy: report.flaggedBy,
    validatedBy: report.validatedBy,
    submittedAt: report.submittedAt,
    stateChangedAt: report.stateChangedAt,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
});

