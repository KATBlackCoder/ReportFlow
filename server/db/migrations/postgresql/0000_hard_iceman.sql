CREATE TABLE "audit_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" text NOT NULL,
	"action" text NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" text NOT NULL,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"partition_key" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"token" text PRIMARY KEY NOT NULL,
	"user_phone" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questionnaires" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"target_role" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"fields" jsonb NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionnaire_id" uuid NOT NULL,
	"author_id" text NOT NULL,
	"author_role" text NOT NULL,
	"state" text DEFAULT 'submitted' NOT NULL,
	"data" jsonb NOT NULL,
	"modified" boolean DEFAULT false NOT NULL,
	"correction_reason" text,
	"flagged_by" text,
	"validated_by" text,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"state_changed_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"reviewer_id" text NOT NULL,
	"action_type" text NOT NULL,
	"from_state" text NOT NULL,
	"to_state" text NOT NULL,
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"phone" text PRIMARY KEY NOT NULL,
	"email" text,
	"password_hash" text NOT NULL,
	"role" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_phone_users_phone_fk" FOREIGN KEY ("user_phone") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questionnaires" ADD CONSTRAINT "questionnaires_created_by_users_phone_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_questionnaire_id_questionnaires_id_fk" FOREIGN KEY ("questionnaire_id") REFERENCES "public"."questionnaires"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_author_id_users_phone_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_flagged_by_users_phone_fk" FOREIGN KEY ("flagged_by") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_validated_by_users_phone_fk" FOREIGN KEY ("validated_by") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_actions" ADD CONSTRAINT "review_actions_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_actions" ADD CONSTRAINT "review_actions_reviewer_id_users_phone_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_audit_actor" ON "audit_entries" USING btree ("actor_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_audit_resource" ON "audit_entries" USING btree ("resource_type","resource_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_audit_partition" ON "audit_entries" USING btree ("partition_key","created_at");--> statement-breakpoint
CREATE INDEX "idx_reset_tokens_user" ON "password_reset_tokens" USING btree ("user_phone");--> statement-breakpoint
CREATE INDEX "idx_reset_tokens_expires" ON "password_reset_tokens" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_questionnaires_target_role" ON "questionnaires" USING btree ("target_role","is_active");--> statement-breakpoint
CREATE INDEX "idx_reports_author_state" ON "reports" USING btree ("author_id","state","created_at");--> statement-breakpoint
CREATE INDEX "idx_reports_state_role" ON "reports" USING btree ("state","author_role","created_at");--> statement-breakpoint
CREATE INDEX "idx_reports_questionnaire" ON "reports" USING btree ("questionnaire_id","state");--> statement-breakpoint
CREATE INDEX "idx_review_actions_report" ON "review_actions" USING btree ("report_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_users_is_active" ON "users" USING btree ("is_active");