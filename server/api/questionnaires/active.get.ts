import { eq, and, desc } from "drizzle-orm";
import { db, schema } from "hub:db";
import { createNotFoundError, createUnauthorizedError, createForbiddenError } from "../../utils/errors";
/**
 * GET /api/questionnaires/active
 * Get the active questionnaire for the current user's role
 * Only R3 and R4 can submit reports, so only they need questionnaires
 */
export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  if (!session.user) {
    throw createUnauthorizedError();
  }

  const userRole = session.user.role;

  // Only R3 and R4 have questionnaires for report submission
  if (userRole !== "R3" && userRole !== "R4") {
    throw createForbiddenError("No questionnaire available for your role");
  }

  // Fetch the latest active questionnaire for the user's role
  const questionnaire = await db.query.questionnaires.findFirst({
    where: and(
      eq(schema.questionnaires.targetRole, userRole),
      eq(schema.questionnaires.isActive, true)
    ),
    orderBy: [desc(schema.questionnaires.version)],
  });

  if (!questionnaire) {
    throw createNotFoundError("Questionnaire", `for role ${userRole}`);
  }

  return {
    id: questionnaire.id,
    title: questionnaire.title,
    description: questionnaire.description,
    targetRole: questionnaire.targetRole,
    version: questionnaire.version,
    isActive: questionnaire.isActive,
    fields: questionnaire.fields,
    createdAt: questionnaire.createdAt,
    updatedAt: questionnaire.updatedAt,
  };
});

