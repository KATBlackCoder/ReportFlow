# Data Model: Hierarchical Reporting Application

**Date**: 2025-12-24
**Database**: Nuxt Hub (PostgreSQL-compatible)

## Core Entities

### User

Primary entity representing system users with hierarchical roles.

**Fields**:

- `phone` (string, primary key): Phone number as unique identifier (required)
- `email` (string, optional): Optional email address
- `password_hash` (string, required): Hashed password
- `role` (enum: R1|R2|R3|R4, required): Hierarchical role
- `first_name` (string, required): User's first name
- `last_name` (string, required): User's last name
- `is_active` (boolean, default: true): Account status
- `created_at` (timestamp, required): Account creation date
- `updated_at` (timestamp, required): Last modification date

**Validation Rules**:

- Phone number must be unique across all users
- Role hierarchy: R1 > R2 > R3 > R4
- Users cannot modify accounts of equal or higher roles

**Relationships**:

- One-to-many: User → Reports (as author)
- One-to-many: User → ReviewActions (as reviewer)
- One-to-many: User → AuditEntries (as actor)

### Questionnaire

Role-specific form templates managed exclusively by R1.

**Fields**:

- `id` (uuid, primary key): Unique questionnaire identifier
- `title` (string, required): Questionnaire display name
- `description` (string, optional): Questionnaire description
- `target_role` (enum: R3|R4, required): Role this questionnaire applies to
- `version` (integer, default: 1): Version number for changes
- `is_active` (boolean, default: true): Whether questionnaire is available
- `fields` (jsonb, required): Form field definitions and validation rules
- `created_by` (string, foreign key → User.phone, required): R1 user who created it
- `created_at` (timestamp, required): Creation timestamp
- `updated_at` (timestamp, required): Last modification timestamp

**Validation Rules**:

- Only R1 users can create/modify questionnaires
- Fields JSON must contain valid form schema
- Version increments on each modification

**Relationships**:

- One-to-many: Questionnaire → Reports (reports based on this questionnaire)

### Report

Core entity representing submitted reports with workflow states.

**Fields**:

- `id` (uuid, primary key): Unique report identifier
- `questionnaire_id` (uuid, foreign key → Questionnaire.id, required): Associated questionnaire
- `author_id` (string, foreign key → User.phone, required): Report author
- `author_role` (enum: R3|R4, required): Author's role at submission time
- `state` (enum: submitted|returned|in_progress|validated, required): Current workflow state
- `data` (jsonb, required): Submitted form responses
- `modified` (boolean, default: false): Whether report was edited after submission
- `correction_reason` (text, optional): Reason for flagging (set when state=returned)
- `flagged_by` (string, foreign key → User.phone, optional): User who flagged the report
- `validated_by` (string, foreign key → User.phone, optional): User who validated the report
- `submitted_at` (timestamp, required): Initial submission timestamp
- `state_changed_at` (timestamp, required): Last state change timestamp
- `created_at` (timestamp, required): Record creation timestamp
- `updated_at` (timestamp, required): Last modification timestamp

**Validation Rules**:

- State transitions follow strict workflow rules
- Only authors can edit when state is submitted or returned
- Reports become read-only when in_progress or validated
- Modified flag is permanent once set

**Relationships**:

- Many-to-one: Report → User (author)
- Many-to-one: Report → Questionnaire
- One-to-many: Report → ReviewActions
- One-to-many: Report → AuditEntries

### ReviewAction

Audit trail for individual review actions on reports.

**Fields**:

- `id` (uuid, primary key): Unique action identifier
- `report_id` (uuid, foreign key → Report.id, required): Associated report
- `reviewer_id` (string, foreign key → User.phone, required): User performing the action
- `action_type` (enum: validate|flag, required): Type of review action
- `from_state` (enum: submitted|returned|in_progress, required): State before action
- `to_state` (enum: returned|in_progress|validated, required): State after action
- `reason` (text, optional): Correction reason (required for flag actions)
- `created_at` (timestamp, required): Action timestamp

**Validation Rules**:

- Reason is mandatory for flag actions
- State transitions must be valid according to workflow rules
- Reviewer must have permission for the action

**Relationships**:

- Many-to-one: ReviewAction → Report
- Many-to-one: ReviewAction → User (reviewer)

### AuditEntry

Comprehensive audit log for all system actions (7-year retention).

**Fields**:

- `id` (uuid, primary key): Unique audit entry identifier
- `actor_id` (string, foreign key → User.phone, required): User performing the action
- `action` (string, required): Action performed (e.g., "report.submitted", "user.created")
- `resource_type` (string, required): Type of resource affected (user, report, questionnaire)
- `resource_id` (string, required): Identifier of affected resource
- `old_values` (jsonb, optional): Previous state (for updates/deletes)
- `new_values` (jsonb, optional): New state (for creates/updates)
- `ip_address` (string, optional): Client IP address
- `user_agent` (string, optional): Client user agent
- `created_at` (timestamp, required): Action timestamp

**Validation Rules**:

- All actions are logged automatically
- Data retention: 7 years for legal compliance + 2 years for operations
- Immutable: entries cannot be modified or deleted

**Relationships**:

- Many-to-one: AuditEntry → User (actor)

## Database Constraints & Indexes

### Unique Constraints

- Users: phone (primary identifier)
- Users: email (where not null)
- Questionnaires: (target_role, version) for active questionnaires

### Foreign Key Constraints

- Reports.questionnaire_id → Questionnaires.id
- Reports.author_id → Users.phone
- Reports.flagged_by → Users.phone
- Reports.validated_by → Users.phone
- ReviewActions.report_id → Reports.id
- ReviewActions.reviewer_id → Users.phone
- AuditEntries.actor_id → Users.phone

### Performance Indexes

- Reports: (author_id, state, created_at) for user report listings
- Reports: (state, created_at) for reviewer queues
- AuditEntries: (created_at, actor_id) for audit queries
- ReviewActions: (report_id, created_at) for report history

## Data Flow & Business Rules

### Report Workflow State Machine

```
submitted (initial)
├── flag by reviewer → returned
└── validate by reviewer → in_progress
    └── validate by superior → validated

returned (correction requested)
└── resubmit by author → submitted (with modified=true)
```

### Visibility Rules

- R4 reports: visible only to R3
- R3 reports: visible to R2 and R1
- Users can only view their own profile
- R1 can view all, R2 can view R3-R4, R3 can view R4 in their scope

### Data Integrity Rules

- Phone numbers are globally unique
- Report states enforce editability rules
- Audit entries are immutable
- Role hierarchy prevents privilege escalation
- Modification flags are permanent
