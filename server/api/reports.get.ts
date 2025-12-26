import { eq, and, desc, sql } from "drizzle-orm";
import { db, schema } from "hub:db";
import { createUnauthorizedError } from "../utils/errors";
import type { ReportStateType } from "../db/schema";

/**
 * GET /api/reports
 * List reports with role-based visibility
 * - R4: Only own reports
 * - R3: Own reports + R4 reports (for review)
 * - R2/R1: All reports
 */
export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  if (!session.user) {
    throw createUnauthorizedError();
  }

  const userRole = session.user.role;
  const userId = session.user.phone;

  // Parse query parameters
  const query = getQuery(event);
  const state = query.state as ReportStateType | undefined;
  const authorRole = query.authorRole as "R3" | "R4" | undefined;
  const limit = Math.min(parseInt(query.limit as string) || 50, 100);
  const offset = parseInt(query.offset as string) || 0;

  // Build where conditions based on role visibility
  const conditions = [];

  // Role-based visibility
  switch (userRole) {
    case "R4":
      // R4 can only see their own reports
      conditions.push(eq(schema.reports.authorId, userId));
      break;
    case "R3":
      // R3 can see their own reports + R4 reports they supervise
      conditions.push(
        sql`(${schema.reports.authorId} = ${userId} OR ${schema.reports.authorRole} = 'R4')`
      );
      break;
    case "R2":
    case "R1":
      // R2/R1 can see all reports - no visibility restriction
      break;
    default:
      // Unknown role - restrict to own reports only
      conditions.push(eq(schema.reports.authorId, userId));
  }

  // Apply optional filters
  if (state) {
    conditions.push(eq(schema.reports.state, state));
  }

  if (authorRole) {
    conditions.push(eq(schema.reports.authorRole, authorRole));
  }

  // Execute query with pagination
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [reportsList, countResult] = await Promise.all([
    db.query.reports.findMany({
      where: whereClause,
      orderBy: [desc(schema.reports.createdAt)],
      limit,
      offset,
      with: {
        questionnaire: {
          columns: {
            id: true,
            title: true,
          },
        },
      },
    }),
    db
      .select({ count: sql<number>`count(*)` })
      .from(schema.reports)
      .where(whereClause),
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  return {
    reports: reportsList.map((report) => {
      const questionnaire = report.questionnaire as { id: string; title: string } | null;
      return {
        id: report.id,
        questionnaireId: report.questionnaireId,
        questionnaireTitle: questionnaire?.title ?? null,
        authorId: report.authorId,
        authorRole: report.authorRole,
        state: report.state,
        modified: report.modified,
        correctionReason: report.correctionReason,
        submittedAt: report.submittedAt,
        stateChangedAt: report.stateChangedAt,
        createdAt: report.createdAt,
      };
    }),
    total,
    limit,
    offset,
  };
});

