/**
 * Database schema for Hierarchical Reporting Application
 * Using Drizzle ORM with PostgreSQL (NuxtHub v0.10+)
 *
 * @see https://hub.nuxt.com/docs/database
 */

import { pgTable, text, boolean, integer, timestamp, jsonb, uuid, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================================
// ENUMS (using text with check constraints via Drizzle)
// ============================================================================

/**
 * Role hierarchy: R1 > R2 > R3 > R4
 * - R1: Chef de Service (full admin)
 * - R2: Chef des Superviseurs (manage R3/R4)
 * - R3: Superviseur (validate R4 reports, submit own)
 * - R4: Employé (submit reports only)
 */
export const roleEnum = ["R1", "R2", "R3", "R4"] as const;
export type RoleType = (typeof roleEnum)[number];

/**
 * Report workflow states
 */
export const reportStateEnum = ["submitted", "returned", "in_progress", "validated"] as const;
export type ReportStateType = (typeof reportStateEnum)[number];

/**
 * Review action types
 */
export const reviewActionTypeEnum = ["validate", "flag"] as const;
export type ReviewActionTypeType = (typeof reviewActionTypeEnum)[number];

// ============================================================================
// TABLES
// ============================================================================

/**
 * Users table - Primary entity for system users
 */
export const users = pgTable(
  "users",
  {
    phone: text().primaryKey(), // Phone number as unique identifier
    email: text().unique(),
    passwordHash: text().notNull(),
    role: text({ enum: roleEnum }).notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    isActive: boolean().notNull().default(true),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("idx_users_role").on(table.role),
    index("idx_users_is_active").on(table.isActive),
  ]
);

/**
 * Questionnaires table - Role-specific form templates
 */
export const questionnaires = pgTable(
  "questionnaires",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text(),
    targetRole: text({ enum: ["R3", "R4"] as const }).notNull(),
    version: integer().notNull().default(1),
    isActive: boolean().notNull().default(true),
    fields: jsonb().notNull(), // Form field definitions
    createdBy: text()
      .notNull()
      .references(() => users.phone),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("idx_questionnaires_target_role").on(table.targetRole, table.isActive),
  ]
);

/**
 * Reports table - Submitted reports with workflow states
 */
export const reports = pgTable(
  "reports",
  {
    id: uuid().primaryKey().defaultRandom(),
    questionnaireId: uuid()
      .notNull()
      .references(() => questionnaires.id),
    authorId: text()
      .notNull()
      .references(() => users.phone),
    authorRole: text({ enum: ["R3", "R4"] as const }).notNull(),
    state: text({ enum: reportStateEnum }).notNull().default("submitted"),
    data: jsonb().notNull(), // Form responses
    modified: boolean().notNull().default(false),
    correctionReason: text(),
    flaggedBy: text().references(() => users.phone),
    validatedBy: text().references(() => users.phone),
    submittedAt: timestamp().notNull().defaultNow(),
    stateChangedAt: timestamp().notNull().defaultNow(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("idx_reports_author_state").on(table.authorId, table.state, table.createdAt),
    index("idx_reports_state_role").on(table.state, table.authorRole, table.createdAt),
    index("idx_reports_questionnaire").on(table.questionnaireId, table.state),
  ]
);

/**
 * Review actions table - Audit trail for review actions
 */
export const reviewActions = pgTable(
  "review_actions",
  {
    id: uuid().primaryKey().defaultRandom(),
    reportId: uuid()
      .notNull()
      .references(() => reports.id),
    reviewerId: text()
      .notNull()
      .references(() => users.phone),
    actionType: text({ enum: reviewActionTypeEnum }).notNull(),
    fromState: text({ enum: reportStateEnum }).notNull(),
    toState: text({ enum: reportStateEnum }).notNull(),
    reason: text(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("idx_review_actions_report").on(table.reportId, table.createdAt),
  ]
);

/**
 * Audit entries table - Comprehensive audit log (7-year retention)
 */
export const auditEntries = pgTable(
  "audit_entries",
  {
    id: uuid().primaryKey().defaultRandom(),
    actorId: text().notNull(),
    action: text().notNull(),
    resourceType: text().notNull(),
    resourceId: text().notNull(),
    oldValues: jsonb(),
    newValues: jsonb(),
    ipAddress: text(),
    userAgent: text(),
    createdAt: timestamp().notNull().defaultNow(),
    partitionKey: text().notNull(), // For yearly partitioning (e.g., "2025")
  },
  (table) => [
    index("idx_audit_actor").on(table.actorId, table.createdAt),
    index("idx_audit_resource").on(table.resourceType, table.resourceId, table.createdAt),
    index("idx_audit_partition").on(table.partitionKey, table.createdAt),
  ]
);

/**
 * Password reset tokens table
 */
export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    token: text().primaryKey(),
    userPhone: text()
      .notNull()
      .references(() => users.phone),
    expiresAt: timestamp().notNull(),
    used: boolean().notNull().default(false),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("idx_reset_tokens_user").on(table.userPhone),
    index("idx_reset_tokens_expires").on(table.expiresAt),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  questionnaires: many(questionnaires),
  reports: many(reports),
  reviewActions: many(reviewActions),
  passwordResetTokens: many(passwordResetTokens),
}));

export const questionnairesRelations = relations(questionnaires, ({ one, many }) => ({
  creator: one(users, {
    fields: [questionnaires.createdBy],
    references: [users.phone],
  }),
  reports: many(reports),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  questionnaire: one(questionnaires, {
    fields: [reports.questionnaireId],
    references: [questionnaires.id],
  }),
  author: one(users, {
    fields: [reports.authorId],
    references: [users.phone],
    relationName: "author",
  }),
  flagger: one(users, {
    fields: [reports.flaggedBy],
    references: [users.phone],
    relationName: "flagger",
  }),
  validator: one(users, {
    fields: [reports.validatedBy],
    references: [users.phone],
    relationName: "validator",
  }),
  reviewActions: many(reviewActions),
}));

export const reviewActionsRelations = relations(reviewActions, ({ one }) => ({
  report: one(reports, {
    fields: [reviewActions.reportId],
    references: [reports.id],
  }),
  reviewer: one(users, {
    fields: [reviewActions.reviewerId],
    references: [users.phone],
  }),
}));

export const passwordResetTokensRelations = relations(passwordResetTokens, ({ one }) => ({
  user: one(users, {
    fields: [passwordResetTokens.userPhone],
    references: [users.phone],
  }),
}));

// ============================================================================
// TYPE EXPORTS (inferred from schema)
// ============================================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Questionnaire = typeof questionnaires.$inferSelect;
export type NewQuestionnaire = typeof questionnaires.$inferInsert;

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;

export type ReviewAction = typeof reviewActions.$inferSelect;
export type NewReviewAction = typeof reviewActions.$inferInsert;

export type AuditEntry = typeof auditEntries.$inferSelect;
export type NewAuditEntry = typeof auditEntries.$inferInsert;

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;

