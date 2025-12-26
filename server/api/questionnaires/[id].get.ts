import { eq } from "drizzle-orm";
import { db, schema } from "hub:db";
import { createNotFoundError, createForbiddenError, createUnauthorizedError } from "../../utils/errors";

/**
 * GET /api/questionnaires/:id
 * Retrieve a questionnaire by ID
 * Authorization: All authenticated users can view active questionnaires
 */
export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  if (!session.user) {
    throw createUnauthorizedError();
  }

  // Get questionnaire ID from route params
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createNotFoundError("Questionnaire");
  }

  // Fetch questionnaire
  const questionnaire = await db.query.questionnaires.findFirst({
    where: eq(schema.questionnaires.id, id),
  });

  if (!questionnaire) {
    throw createNotFoundError("Questionnaire", id);
  }

  // Only R1 can view inactive questionnaires
  if (!questionnaire.isActive && session.user.role !== "R1") {
    throw createForbiddenError("Cannot view inactive questionnaire");
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

