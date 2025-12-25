# Implementation Plan: Hierarchical Reporting Application

**Branch**: `001-hierarchical-reporting` | **Date**: 2025-12-24 | **Spec**: [spec.md](/specs/001-hierarchical-reporting/spec.md)
**Input**: Feature specification from `/specs/001-hierarchical-reporting/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Application de reporting hiérarchique avec workflow de validation basé sur les rôles (R1-R4). Les utilisateurs soumettent des questionnaires spécifiques à leur rôle qui suivent un processus d'approbation hiérarchique avec règles strictes de visibilité et d'édition. Architecture Nuxt 4 avec authentification `nuxt-auth-utils`, gestion d'état Pinia, et UI Nuxt UI v4.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Nuxt 4, Nuxt UI v4, Pinia (setup), nuxt-auth-utils, Nuxt Hub (DB)
**Storage**: Nuxt Hub Database (PostgreSQL-compatible)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**Target Platform**: Web browsers (SSR-first), Node.js server
**Project Type**: Web application (Nuxt 4 full-stack)
**Performance Goals**: 2-second average response time, support for 100-500 concurrent users
**Constraints**: SSR-first architecture, minimal client-side JavaScript, RBAC enforcement server + client
**Scale/Scope**: 100-500 users, 1000-5000 reports/month, hierarchical workflow with audit trails

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Nuxt 4 Unified Stack Compliance Gates

- [x] **Framework Compliance**: Project uses Nuxt.js v4 exclusively
- [x] **Composition API**: All new components use Vue 3 Composition API (Options API forbidden)
- [x] **State Management**: Pinia (setup syntax) is the exclusive state solution
- [x] **UI Framework**: Nuxt UI v4 is the exclusive UI component library
- [x] **Authentication**: `nuxt-auth-utils` is used for all authentication needs
- [x] **Icons**: Nuxt Icons will be used exclusively (local installation only, max 2 collections)
- [x] **Testing Stack**: Vitest for unit/integration, Playwright for E2E (no alternatives)
- [x] **TypeScript**: Strict typing mandatory, `any` usage requires justification
- [x] **SDD Compliance**: All features begin with written specifications
- [x] **Performance**: SSR-first architecture with minimal client-side JavaScript
- [x] **Command Restrictions**: No local dev server execution (CI/CD only)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── pages/
│   ├── auth/
│   ├── reports/
│   ├── admin/
│   └── profile/
├── components/
│   └── forms/
│       ├── InputForm.vue
│       ├── SelectForm.vue
│       └── TextareaForm.vue
├── composables/
│   ├── useAuth.ts
│   ├── usePermissions.ts
│   └── useReports.ts
└── stores/
    ├── auth.store.ts
    └── reports.store.ts

server/
├── api/
│   ├── auth/
│   ├── users/
│   └── reports/
└── types/
    ├── roles.ts
    └── report.ts

tests/
├── unit/
├── integration/
└── e2e/
```

**Structure Decision**: Application Nuxt 4 full-stack avec séparation claire entre logique client (`app/`) et serveur (`server/`). Composables pour la logique métier, stores Pinia pour l'état, API routes pour les endpoints. Structure conforme aux conventions Nuxt 4 et à la constitution.

## Implementation Phases

### Phase 0 — Foundations (Setup Once)

#### 0.1 Project Initialization
* Create Nuxt 4 project with TypeScript strict mode
* Install and configure required dependencies:
  * Nuxt UI v4
  * Pinia (setup syntax)
  * nuxt-auth-utils
  * Nuxt Hub (database)

**Expected Result**: Project starts successfully with no business logic or features implemented.

#### 0.2 Base Structure (Constitution Compliant)
Create the directory structure following Nuxt 4 conventions and constitution requirements.

**Expected Result**: Clear structure with separated responsibilities, no "magic" code.

### Phase 1 — Authentication & Roles (Foundation)

#### 1.1 Authentication with `nuxt-auth-utils`
* Login (email or phone + password)
* Logout functionality
* Password reset via email
* Persistent sessions

**Expected Result**: Users can authenticate reliably with persistent sessions.

#### 1.2 Role Model (Fundamental)
* Create role enum (R1 | R2 | R3 | R4)
* Implement page protection middleware
* Create `usePermissions()` composable with centralized logic

**Examples**:
* `canCreateUser(role, targetRole)`
* `canExport(role)`
* `canEditReport(role, report)`

**Expected Result**: Permissions are centralized with no scattered role checks.

### Phase 2 — User Management

#### 2.1 User CRUD API
* Create user (R1 → all roles, R2 → R3/R4 only)
* Update user with role restrictions
* Delete user respecting hierarchy
* View users according to role permissions

**Expected Result**: Hierarchy respected, impossible to break rules.

#### 2.2 User Management UI
* Admin users page
* Actions visible according to role
* No forbidden buttons displayed

**Expected Result**: Consistent UX with security and ergonomics.

### Phase 3 — Questionnaires & Forms

#### 3.1 Questionnaire Model
* Role-specific questionnaires
* Managed exclusively by R1
* Optional versioning

**Expected Result**: Forms are data-driven, not hardcoded.

#### 3.2 Reusable Field Components
* InputForm, SelectForm, TextareaForm, etc.

**Expected Result**: No hardcoded business field components, fully reusable.

#### 3.3 Dynamic Dispatcher
* Load correct form based on authenticated role
* Client + server validation

**Expected Result**: R3 and R4 have different experiences with clean code.

### Phase 4 — Reports & States (Core Business Logic)

#### 4.1 Report Database Model
Essential fields:
* authorId, authorRole
* state (`submitted | returned | in_progress | validated`)
* modified (boolean)
* correctionReason (optional)
* timestamps

**Expected Result**: Traceable data with explicit states.

#### 4.2 Report Submission Routing

**R4**: Submit → goes only to R3
**R3**: Submit → goes directly to R2 + R1

**Expected Result**: Automatic workflow with no bypass possible.

### Phase 5 — Review, Flag & Validation

#### 5.1 R3 Actions (on R4 reports)
* Validate → `in_progress` state
* Flag → `returned` state + mandatory reason

**Expected Result**: R3 acts as true hierarchical filter.

#### 5.2 R2/R1 Actions
* Validate → `validated` state
* Flag → `returned` state + reason

**Expected Result**: Clear final authority.

### Phase 6 — Editing & Locking

#### 6.1 Editing Rules
* Editable when `submitted` or `returned`
* Locked when `in_progress` or `validated`

#### 6.2 Modified Flag
* Any edit → `modified = true`
* Flag visible to superiors

**Expected Result**: Total traceability and accountability.

### Phase 7 — Views & Visibility

#### 7.1 Role-Based Views
* R4 → their own reports
* R3 → team reports
* R2/R1 → global view

**Expected Result**: No data leaks, appropriate views.

#### 7.2 User Profile
* All roles can view their own profile
* No access to superior profiles

**Expected Result**: Compliant with specification.

### Phase 8 — Excel Export

#### 8.1 Export Rules
* R1/R2 → full export
* R3 → team export
* R4 → no export

**Expected Result**: Exports consistent with responsibilities.

### Phase 9 — Testing & Validation

#### 9.1 Priority Tests
* Permissions logic
* State transitions
* Edit blocking
* Mandatory flags

**Expected Result**: Business logic is bulletproof with minimal but effective tests.

### Phase 10 — Cleanup & Compliance

* Verify constitution compliance
* Remove dead code
* Document decisions

**Final Result**: ✅ Clean project, not over-engineered, clear business logic, easy maintenance.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
