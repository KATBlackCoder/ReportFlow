---
description: "Task list template for Nuxt 4 Unified Stack feature implementation - Constitution Section 2.1 (SDD) compliant"
---

# Tasks: Hierarchical Reporting Application

**Input**: Design documents from `/specs/001-hierarchical-reporting/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included for critical business logic validation as per constitution compliance requirements.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Nuxt 4 Project**: `app/`, `server/`, `composables/`, `stores/` at repository root
- **Testing**: `tests/unit/`, `tests/integration/`, `tests/e2e/` (Vitest + Playwright only)
- **Components**: `app/components/` following Nuxt UI patterns
- **Pages**: `app/pages/` with SSR-first architecture
- **Constitution Compliance**: Pinia stores in `stores/`, business logic in `composables/`, auth via `nuxt-auth-utils`

### Nuxt-Specific Task Types (Constitution Section 3)

- **Store Tasks**: Pinia store creation with domain focus and `storeToRefs()` usage
- **Composable Tasks**: Business logic extraction with Composition API patterns
- **UI Tasks**: Nuxt UI component integration (no custom styling outside Tailwind)
- **Auth Tasks**: `nuxt-auth-utils` integration for authentication/authorization
- **SSR Tasks**: Server-side rendering optimization and lazy loading
- **Icon Tasks**: Local Nuxt Icons installation (max 2 collections)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure following constitution requirements

- [x] T001 Create Nuxt 4 project with TypeScript strict mode in project root
- [x] T002 Install and configure Nuxt UI v4 with Tailwind CSS integration
- [x] T003 Install and configure Pinia with setup syntax store structure
- [x] T004 Install and configure nuxt-auth-utils for authentication
- [x] T005 Install and configure Nuxt Hub for database integration
- [x] T006 Create base directory structure per implementation plan
- [x] T007 Configure TypeScript strict mode and project settings
- [x] T008 Set up development environment with proper linting and formatting

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 [P] Create role enum and types in server/types/roles.ts
- [x] T010 [P] Implement authentication middleware in server/middleware/auth.ts
- [x] T011 [P] Create base permission composable in composables/usePermissions.ts
- [x] T012 [P] Set up Nuxt Hub database schema and migrations
- [x] T013 [P] Create base audit logging system in server/utils/audit.ts
- [x] T014 [P] Configure session management with nuxt-auth-utils
- [x] T015 [P] Create base error handling utilities in server/utils/errors.ts
- [x] T016 [P] Set up base testing configuration with Vitest
- [x] T017 [P] Implement password reset functionality in server/api/auth/reset.post.ts
- [x] T018 [P] Add input validation and sanitization middleware in server/middleware/validation.ts
- [x] T019 [P] Configure audit data retention policies in server/utils/audit.ts
- [x] T020 [P] Implement storage scaling and partitioning strategy in server/utils/storage.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Submit Report as Employee (Priority: P1) 🎯 MVP

**Goal**: Enable employees to submit role-based questionnaire reports

**Independent Test**: Employee can login, fill questionnaire, submit report, and see it in supervisor's view

### Implementation for User Story 1

- [x] T017 [P] [US1] Create Questionnaire entity schema in server/types/questionnaire.ts
- [x] T018 [P] [US1] Create Report entity schema in server/types/report.ts
- [x] T019 [P] [US1] Create User entity schema in server/types/user.ts
- [x] T020 [P] [US1] Implement database schema for questionnaires table
- [x] T021 [P] [US1] Implement database schema for reports table
- [x] T022 [P] [US1] Implement database schema for users table
- [x] T023 [P] [US1] Create auth store in stores/auth.store.ts with nuxt-auth-utils
- [x] T024 [P] [US1] Create reports store in stores/reports.store.ts with Pinia setup
- [x] T025 [US1] Implement login API endpoint in server/api/auth/login.post.ts
- [x] T026 [US1] Implement questionnaire retrieval API in server/api/questionnaires/[id].get.ts
- [x] T027 [US1] Implement report submission API in server/api/reports.post.ts
- [x] T028 [US1] Create login page in app/pages/auth/login.vue with Nuxt UI
- [x] T029 [US1] Create reports dashboard page in app/pages/reports/index.vue
- [x] T030 [US1] Create report submission form component in app/components/forms/ReportForm.vue
- [x] T031 [US1] Implement questionnaire display logic in composables/useQuestionnaire.ts
- [x] T032 [US1] Implement report submission logic in composables/useReports.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Review and Validate Reports (Priority: P1)

**Goal**: Enable supervisors to review, validate, or flag reports for correction

**Independent Test**: Supervisor can view submitted reports, validate them, or flag with reasons

### Implementation for User Story 2

- [x] T033 [P] [US2] Create ReviewAction entity schema in server/types/review.ts
- [x] T034 [P] [US2] Implement database schema for review_actions table
- [x] T035 [P] [US2] Extend reports store with review actions in stores/reports.store.ts
- [x] T036 [US2] Implement report listing API with role-based filtering in server/api/reports.get.ts
- [x] T037 [US2] Implement report validation API in server/api/reports/[id]/validate.post.ts
- [x] T038 [US2] Implement report flagging API in server/api/reports/[id]/flag.post.ts
- [x] T039 [US2] Create reports review page in app/pages/reports/review.vue
- [x] T040 [US2] Create report details component in app/components/reports/ReportDetails.vue
- [x] T041 [US2] Create review actions component in app/components/reports/ReviewActions.vue
- [x] T042 [US2] Implement state transition logic in composables/useReportWorkflow.ts
- [x] T043 [US2] Implement visibility filtering logic in composables/useReportVisibility.ts
- [x] T044 [US2] Add audit logging for review actions in server/utils/audit.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Hierarchical Approval Workflow (Priority: P1)

**Goal**: Enable higher-level roles (R2, R1) to provide final validation

**Independent Test**: Complete workflow from submission through hierarchical approval

### Implementation for User Story 3

- [ ] T045 [P] [US3] Extend workflow logic for R2/R1 roles in composables/useReportWorkflow.ts
- [ ] T046 [P] [US3] Add final validation permissions to usePermissions.ts
- [ ] T047 [P] [US3] Update report visibility logic for R2/R1 access in composables/useReportVisibility.ts
- [ ] T048 [US3] Implement final validation API for R2/R1 in server/api/reports/[id]/approve.post.ts
- [ ] T049 [US3] Implement final rejection API for R2/R1 in server/api/reports/[id]/reject.post.ts
- [ ] T050 [US3] Create admin reports page in app/pages/admin/reports.vue
- [ ] T051 [US3] Add final approval UI components in app/components/admin/FinalApproval.vue
- [ ] T052 [US3] Implement editability locking logic in composables/useReportEditing.ts
- [ ] T053 [US3] Add modification tracking to report updates in server/api/reports/[id].put.ts
- [ ] T054 [US3] Enhance audit logging for final approvals in server/utils/audit.ts

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Role-Based User Management (Priority: P2)

**Goal**: Enable administrative users to manage other users according to hierarchy

**Independent Test**: Administrators can create, edit, delete users within their permission scope

### Implementation for User Story 4

- [ ] T055 [P] [US4] Extend user management permissions in composables/usePermissions.ts
- [ ] T056 [P] [US4] Create user management store in stores/users.store.ts
- [ ] T057 [US4] Implement user creation API in server/api/users.post.ts
- [ ] T058 [US4] Implement user listing API in server/api/users.get.ts
- [ ] T059 [US4] Implement user update API in server/api/users/[phone].put.ts
- [ ] T060 [US4] Implement user deletion API in server/api/users/[phone].delete.ts
- [ ] T061 [US4] Create user management page in app/pages/admin/users.vue
- [ ] T062 [US4] Create user creation form component in app/components/admin/UserForm.vue
- [ ] T063 [US4] Create user list component in app/components/admin/UserList.vue
- [ ] T064 [US4] Implement role validation logic in composables/useUserManagement.ts
- [ ] T065 [US4] Add user management audit logging in server/utils/audit.ts

**Checkpoint**: User management functionality complete

---

## Phase 7: User Story 5 - Export Reports by Role (Priority: P3)

**Goal**: Enable role-based Excel export of reports

**Independent Test**: Users can export reports according to their role permissions

### Implementation for User Story 5

- [ ] T066 [P] [US5] Add export permissions to usePermissions.ts
- [ ] T067 [P] [US5] Create export utilities in server/utils/export.ts
- [ ] T068 [US5] Implement export API endpoint in server/api/reports/export.get.ts
- [ ] T069 [US5] Add Excel generation with xlsx library in server/utils/excel.ts
- [ ] T070 [US5] Create export page/component in app/pages/reports/export.vue
- [ ] T071 [US5] Implement role-based data filtering for exports in composables/useReportExport.ts
- [ ] T072 [US5] Add export audit logging in server/utils/audit.ts

**Checkpoint**: Export functionality complete

---

## Phase 8: Tests & Validation (Constitution Compliance)

**Purpose**: Implement critical business logic tests for constitution compliance

- [ ] T073 [P] Create Vitest configuration for unit tests in tests/unit/setup.ts
- [ ] T074 [P] Create Playwright configuration for E2E tests in tests/e2e/playwright.config.ts
- [ ] T075 [P] Implement permission logic unit tests in tests/unit/composables/usePermissions.test.ts
- [ ] T076 [P] Implement workflow state transition tests in tests/unit/composables/useReportWorkflow.test.ts
- [ ] T077 [P] Implement visibility logic unit tests in tests/unit/composables/useReportVisibility.test.ts
- [ ] T078 [P] Create authentication E2E tests in tests/e2e/auth.spec.ts
- [ ] T079 [P] Create report submission E2E tests in tests/e2e/report-submission.spec.ts
- [ ] T080 [P] Create workflow validation E2E tests in tests/e2e/report-workflow.spec.ts
- [ ] T081 [P] Create user management E2E tests in tests/e2e/user-management.spec.ts
- [ ] T082 [P] Implement security integration tests for authentication attacks in tests/integration/security.spec.ts
- [ ] T083 [P] Implement data tampering protection tests in tests/integration/tampering.spec.ts
- [ ] T084 [P] Implement audit retention policy tests in tests/integration/audit-retention.spec.ts

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories

- [ ] T082 [P] Implement lazy loading for report lists in app/pages/reports/index.vue
- [ ] T083 [P] Add comprehensive error handling and user feedback throughout UI
- [ ] T084 [P] Implement loading states and skeletons with Nuxt UI
- [ ] T085 [P] Add keyboard navigation and accessibility improvements
- [ ] T086 [P] Optimize database queries and add proper indexing
- [ ] T087 [P] Implement caching strategies for questionnaires and user data
- [ ] T088 [P] Add comprehensive input validation and sanitization
- [ ] T089 [P] Implement rate limiting for API endpoints
- [ ] T090 [P] Add comprehensive logging and monitoring setup
- [ ] T091 [P] Create production deployment configuration
- [ ] T092 [P] Implement backup and recovery procedures for database
- [ ] T093 [P] Add final security hardening and penetration testing preparation
- [ ] T094 [P] Create system administration documentation
- [ ] T095 [P] Implement final constitution compliance verification

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Tests & Validation (Phase 8)**: Depends on all user stories being implemented
- **Polish (Phase 9)**: Depends on Tests & Validation completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Depends on US1 for basic report structure
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Depends on US2 for review workflow
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 for report data structure

### Within Each User Story

- API endpoints before UI components
- Database schemas before API implementation
- Composables before components that use them
- Stores before components that consume them
- Basic functionality before advanced features

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Model/API tasks within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (report submission)
   - Developer B: User Story 2 (review workflow)
   - Developer C: User Story 3 (final approval)
   - Developer D: User Story 4 (user management)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- API endpoints should be implemented before UI components
- Database schemas are foundational for each user story
- Tests validate critical business logic per constitution requirements
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
