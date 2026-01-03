# Tasks: Système de Rapports Hiérarchique

**Input**: Design documents from `/specs/001-hierarchical-reports/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: Application Nuxt 4 avec structure `app/`, `server/`, `tests/` à la racine

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan (app/components/, app/pages/, app/composables/, app/stores/, app/utils/, server/api/, tests/)
- [ ] T002 Configure Nuxt 4 project with @nuxt/ui, @nuxtjs/supabase, @pinia/nuxt modules in nuxt.config.ts
- [ ] T003 [P] Install dependencies: @nuxtjs/supabase, @pinia/nuxt, pinia, xlsx, @types/xlsx via pnpm
- [ ] T004 [P] Configure environment variables (.env) with SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_ROLE_KEY
- [ ] T005 [P] Setup TypeScript configuration in tsconfig.json for Nuxt 4

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create Supabase database schema: profiles table with all fields and constraints in Supabase SQL Editor
- [ ] T007 Create Supabase database schema: questionnaire_templates table with all fields and constraints in Supabase SQL Editor
- [ ] T008 Create Supabase database schema: assignments table with all fields and constraints in Supabase SQL Editor
- [ ] T009 Create Supabase database schema: submissions table with all fields and constraints in Supabase SQL Editor
- [ ] T010 Create Supabase database schema: validations table with all fields and constraints in Supabase SQL Editor
- [ ] T011 Create database indexes for profiles, assignments, submissions, validations tables (see data-model.md)
- [ ] T012 Configure RLS policies for profiles table (SELECT: own profile + subordinates, INSERT/UPDATE/DELETE: head_supervisor/manager only)
- [ ] T013 Configure RLS policies for questionnaire_templates table (SELECT: all authorized users, INSERT: head_supervisor/manager only)
- [ ] T014 Configure RLS policies for assignments table (SELECT: own assignments + team assignments for supervisors, INSERT/UPDATE: head_supervisor/manager only)
- [ ] T015 Configure RLS policies for submissions table (SELECT: own submissions + team submissions based on status/role, INSERT/UPDATE: author only)
- [ ] T016 Configure RLS policies for validations table (SELECT: validations for accessible submissions, INSERT: supervisor/head_supervisor/manager only)
- [ ] T017 [P] Create base TypeScript types for Profile, QuestionnaireTemplate, Assignment, Submission, Validation in app/types/index.ts
- [ ] T018 [P] Create useAuthStore Pinia store with user state, role, permissions in app/stores/auth.ts
- [ ] T019 [P] Create useAdminStore Pinia store structure in app/stores/admin.ts
- [ ] T020 [P] Create useQuestionnaireStore Pinia store structure in app/stores/questionnaire.ts
- [ ] T021 [P] Create usePermissions composable with canEditSubmission function in app/composables/usePermissions.ts
- [ ] T022 [P] Create base composable useAuth for authentication logic in app/composables/useAuth.ts
- [ ] T023 Configure @nuxtjs/supabase module in nuxt.config.ts with proper settings

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Authentification et Accès (Priority: P1) 🎯 MVP

**Goal**: Tout utilisateur peut se connecter à l'application en utilisant son identifiant au format `phone_number@role.or` et son mot de passe. Après authentification réussie, l'utilisateur accède à son tableau de bord personnel adapté à son rôle.

**Independent Test**: Un utilisateur peut se connecter avec un identifiant valide et un mot de passe correct, puis accéder à son tableau de bord. Un utilisateur avec un identifiant invalide ou un mot de passe incorrect ne peut pas accéder au système. Un utilisateur suspendu ne peut pas se connecter même avec des identifiants valides.

### Implementation for User Story 1

- [ ] T024 [US1] Implement signIn function in app/composables/useAuth.ts using useSupabaseClient().auth.signInWithPassword()
- [ ] T025 [US1] Implement signOut function in app/composables/useAuth.ts using useSupabaseClient().auth.signOut()
- [ ] T026 [US1] Add isActive check after authentication in app/composables/useAuth.ts (verify profiles.is_active = true)
- [ ] T027 [US1] Update useAuthStore to handle authentication state, user, session in app/stores/auth.ts
- [ ] T028 [US1] Create login page with UCard, UForm, UInput components in app/pages/login.vue using @nuxt/ui
- [ ] T029 [US1] Implement login form validation (phone_number format: 8 digits, @role.or suffix) in app/pages/login.vue
- [ ] T030 [US1] Create dashboard page structure with role-based conditional rendering in app/pages/dashboard.vue
- [ ] T031 [US1] Implement navigation middleware to redirect authenticated users from login page in app/middleware/auth.ts
- [ ] T032 [US1] Implement route protection middleware to redirect unauthenticated users to login in app/middleware/auth.ts
- [ ] T033 [US1] Add error handling and user feedback for authentication errors in app/pages/login.vue

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Gestion des Utilisateurs (Priority: P1) 🎯 MVP

**Goal**: Les rôles `head_supervisor` et `manager` peuvent créer, modifier, suspendre et supprimer des comptes utilisateurs pour les rôles inférieurs via une interface d'administration. Ils peuvent spécifier le numéro de téléphone (8 chiffres), le rôle, le supérieur hiérarchique, et modifier toutes les informations y compris le numéro de téléphone.

**Independent Test**: Un `head_supervisor` ou `manager` peut créer un nouvel utilisateur avec un numéro de téléphone, un rôle et un supérieur hiérarchique. Il peut modifier les informations d'un utilisateur existant, y compris le numéro de téléphone. Il peut suspendre un compte, ce qui empêche la connexion. Il peut supprimer un compte, ce qui supprime définitivement l'utilisateur. Un utilisateur de rôle inférieur ne peut pas gérer les comptes.

### Implementation for User Story 2

- [ ] T034 [US2] Implement createUser function in app/composables/useAuth.ts using auth.admin.createUser() and profiles table insert
- [ ] T035 [US2] Implement updateUser function in app/composables/useAuth.ts with phone_number update support (update auth.users email if phone_number changes)
- [ ] T036 [US2] Implement suspendUser function in app/composables/useAuth.ts (set is_active = false in profiles)
- [ ] T037 [US2] Implement listUsers function in app/composables/useAuth.ts to fetch profiles (respecting RLS)
- [ ] T038 [US2] Update useAdminStore with createUser, updateUser, suspendUser, deleteUser, listUsers actions in app/stores/admin.ts
- [ ] T039 [US2] Create admin/users page with UCard, UTable, UButton, UModal components in app/pages/admin/users.vue
- [ ] T040 [US2] Implement user creation form with phone_number, role, supervised_by/managed_by fields in app/pages/admin/users.vue
- [ ] T041 [US2] Implement user edit modal/form with all fields including phone_number modification in app/pages/admin/users.vue
- [ ] T042 [US2] Implement user suspension action (toggle is_active) in app/pages/admin/users.vue
- [ ] T043 [US2] Add role-based access control: restrict /admin/users route to head_supervisor/manager roles in app/middleware/admin.ts
- [ ] T044 [US2] Add validation for phone_number format (8 digits) and role hierarchy in app/pages/admin/users.vue
- [ ] T045 [US2] Implement password generation logic for new users (if not provided) in app/composables/useAuth.ts
- [ ] T046 [US2] Implement deleteUser function in app/composables/useAuth.ts using auth.admin.deleteUser() and profiles table deletion
- [ ] T047 [US2] Implement user deletion action (delete button with confirmation) in app/pages/admin/users.vue

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Création de Modèles de Questionnaire (Priority: P2)

**Goal**: Les rôles `head_supervisor` et `manager` peuvent créer des modèles de questionnaire en définissant une structure tabulaire (lignes et colonnes) avec différents types de champs. Ils peuvent assigner ces questionnaires à des `employee` ou `supervisor` avec une date d'échéance.

**Independent Test**: Un `head_supervisor` ou `manager` peut créer un modèle de questionnaire avec une structure tabulaire (lignes/colonnes), définir les types de champs, et l'assigner à un ou plusieurs utilisateurs avec une échéance. Le modèle créé apparaît dans la liste des questionnaires assignés aux utilisateurs ciblés.

### Implementation for User Story 3

- [ ] T048 [US3] Implement createTemplate function in app/composables/useQuestionnaire.ts (insert into questionnaire_templates)
- [ ] T049 [US3] Implement createAssignment function in app/composables/useQuestionnaire.ts (insert into assignments)
- [ ] T050 [US3] Implement listTemplates function in app/composables/useQuestionnaire.ts
- [ ] T051 [US3] Update useQuestionnaireStore with createTemplate, createAssignment, listTemplates actions in app/stores/questionnaire.ts
- [ ] T052 [US3] Create template creation page/form with table definition builder in app/pages/admin/templates/create.vue
- [ ] T053 [US3] Implement table structure builder UI (add/remove rows, add/remove columns) using @nuxt/ui components in app/pages/admin/templates/create.vue
- [ ] T054 [US3] Implement field type selection for columns (text, number, date) in app/pages/admin/templates/create.vue
- [ ] T055 [US3] Implement assignment form (select users, set due_date) in app/pages/admin/templates/create.vue
- [ ] T056 [US3] Add role-based access control: restrict template creation to head_supervisor/manager in app/middleware/admin.ts
- [ ] T057 [US3] Implement template list view with edit/delete actions (if needed) in app/pages/admin/templates/index.vue

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Remplissage et Soumission de Questionnaires (Priority: P1) 🎯 MVP

**Goal**: Les `employee` et `supervisor` voient la liste des questionnaires qui leur sont assignés. En cliquant sur un questionnaire, ils peuvent remplir les réponses dans un tableau interactif et soumettre le rapport, ce qui le place dans l'état `submitted`. Un questionnaire soumis par un `supervisor` pour son propre travail est directement visible par `head_supervisor` et `manager` sans validation intermédiaire.

**Independent Test**: Un `employee` ou `supervisor` peut voir la liste de ses questionnaires assignés, ouvrir un questionnaire, remplir les champs du tableau, et soumettre le rapport. Après soumission, le rapport passe à l'état `submitted`. Un rapport soumis par un `supervisor` est visible par `head_supervisor` et `manager`, tandis qu'un rapport soumis par un `employee` nécessite validation par son `supervisor`.

### Implementation for User Story 4

- [ ] T058 [US4] Implement listAssignments function in app/composables/useQuestionnaire.ts to fetch user's assignments
- [ ] T059 [US4] Implement createSubmission function in app/composables/useQuestionnaire.ts (insert into submissions table)
- [ ] T060 [US4] Implement updateSubmission function in app/composables/useQuestionnaire.ts (update answers_data)
- [ ] T061 [US4] Implement submitSubmission function in app/composables/useQuestionnaire.ts (set current_status = 'submitted')
- [ ] T062 [US4] Update useQuestionnaireStore with listAssignments, createSubmission, updateSubmission, submitSubmission actions in app/stores/questionnaire.ts
- [ ] T063 [US4] Create questionnaire list view in dashboard showing assigned questionnaires with UCard, UBadge components in app/pages/dashboard.vue
- [ ] T064 [US4] Create questionnaire fill page with dynamic table rendering based on table_definition in app/pages/questionnaire/[id]/fill.vue
- [ ] T065 [US4] Implement interactive table for answers using UTable with editable cells in app/pages/questionnaire/[id]/fill.vue
- [ ] T066 [US4] Implement field type handling (text, number, date) in table rendering in app/pages/questionnaire/[id]/fill.vue
- [ ] T067 [US4] Implement save draft functionality (createSubmission with status='draft') in app/pages/questionnaire/[id]/fill.vue
- [ ] T068 [US4] Implement submit button and workflow (set status='submitted') in app/pages/questionnaire/[id]/fill.vue
- [ ] T069 [US4] Add validation for required fields before submission in app/pages/questionnaire/[id]/fill.vue
- [ ] T070 [US4] Implement assignment status update (set assignments.status = 'submitted') when submission is submitted in app/composables/useQuestionnaire.ts

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently

---

## Phase 7: User Story 5 - Validation des Rapports par Supervisor (Priority: P2)

**Goal**: Un `supervisor` voit dans son tableau de bord "Validation" la liste des rapports à l'état `submitted` soumis par les `employee` de son équipe directe. Pour chaque rapport, il peut l'examiner, puis le marquer comme `approved` (il remonte vers `head_supervisor`/`manager`) ou `rejected` avec un commentaire obligatoire (il retourne à l'`employee` pour modification).

**Independent Test**: Un `supervisor` peut voir les rapports `submitted` de son équipe directe, examiner un rapport, l'approuver (passage à `approved`) ou le rejeter avec un commentaire obligatoire (passage à `rejected`). Un rapport rejeté retourne à l'`employee` pour modification.

### Implementation for User Story 5

- [ ] T071 [US5] Implement listSubmissionsForValidation function in app/composables/useQuestionnaire.ts (filter by status='submitted', team members)
- [ ] T072 [US5] Implement approveSubmission function in app/composables/useQuestionnaire.ts (update current_status='approved', create validation record)
- [ ] T073 [US5] Implement rejectSubmission function in app/composables/useQuestionnaire.ts (update current_status='rejected', create validation record with feedback)
- [ ] T074 [US5] Update useQuestionnaireStore with listSubmissionsForValidation, approveSubmission, rejectSubmission actions in app/stores/questionnaire.ts
- [ ] T075 [US5] Create validation dashboard page with list of submitted reports in app/pages/validation.vue
- [ ] T076 [US5] Implement submission detail view with answers table in app/pages/validation.vue
- [ ] T077 [US5] Implement approve button/action in validation dashboard in app/pages/validation.vue
- [ ] T078 [US5] Implement reject modal with UTextarea for mandatory feedback comment in app/pages/validation.vue
- [ ] T079 [US5] Add validation: reject requires non-empty feedback comment in app/pages/validation.vue
- [ ] T080 [US5] Add role-based access control: restrict /validation route to supervisor role in app/middleware/auth.ts
- [ ] T081 [US5] Update assignment status to 'approved' when submission is approved in app/composables/useQuestionnaire.ts

**Checkpoint**: At this point, User Stories 1-5 should all work independently

---

## Phase 8: User Story 6 - Édition Conditionnelle des Rapports (Priority: P2)

**Goal**: Un `employee` peut éditer un rapport qu'il a soumis seulement si son statut est `submitted` (en attente) ou `rejected` (renvoyé). Si le statut est `approved`, le rapport est en lecture seule. Un `supervisor` peut éditer un rapport soumis par un membre de son équipe seulement si le rapport est `rejected` par son propre supérieur ou s'il est encore `submitted`.

**Independent Test**: Un `employee` peut éditer un rapport `submitted` ou `rejected`, mais ne peut que visualiser un rapport `approved`. Un `supervisor` peut éditer un rapport de son équipe si `submitted` ou `rejected` par son supérieur, mais ne peut pas éditer un rapport `approved`.

### Implementation for User Story 6

- [ ] T082 [US6] Enhance canEditSubmission function in app/composables/usePermissions.ts with full logic (author, status checks, supervisor team editing)
- [ ] T083 [US6] Implement getSubmission function in app/composables/useQuestionnaire.ts to fetch submission with details
- [ ] T084 [US6] Update questionnaire fill page to check canEditSubmission before allowing edits in app/pages/questionnaire/[id]/fill.vue
- [ ] T085 [US6] Implement read-only mode for approved submissions in app/pages/questionnaire/[id]/fill.vue
- [ ] T086 [US6] Implement edit mode for submitted/rejected submissions in app/pages/questionnaire/[id]/fill.vue
- [ ] T087 [US6] Add UI indicator (badge/message) showing submission status and edit permissions in app/pages/questionnaire/[id]/fill.vue
- [ ] T088 [US6] Update useQuestionnaireStore to handle submission state (draft/submitted/rejected) for edit permissions in app/stores/questionnaire.ts
- [ ] T089 [US6] Implement resubmit workflow: rejected submission can be edited and resubmitted (status back to 'submitted') in app/pages/questionnaire/[id]/fill.vue

**Checkpoint**: At this point, User Stories 1-6 should all work independently

---

## Phase 9: User Story 7 - Révision et Rejet par Head_Supervisor/Manager (Priority: P2)

**Goal**: Les `head_supervisor` et `manager` voient dans leur tableau de bord "Rapports" uniquement les rapports à l'état `approved`. Pour chaque rapport, ils ne peuvent pas le modifier, mais peuvent le rejeter (`rejected`) avec un commentaire, ce qui le renvoie en arrière dans la chaîne hiérarchique.

**Independent Test**: Un `head_supervisor` ou `manager` peut voir les rapports `approved`, examiner un rapport, et le rejeter avec un commentaire. Le rejet renvoie le rapport en arrière dans la chaîne hiérarchique. Les rapports `approved` ne peuvent pas être modifiés par ces rôles.

### Implementation for User Story 7

- [ ] T090 [US7] Implement listApprovedReports function in app/composables/useQuestionnaire.ts (filter by status='approved')
- [ ] T091 [US7] Implement rejectApprovedReport function in app/composables/useQuestionnaire.ts (update current_status='rejected', create validation record with feedback)
- [ ] T092 [US7] Update useQuestionnaireStore with listApprovedReports, rejectApprovedReport actions in app/stores/questionnaire.ts
- [ ] T093 [US7] Create reports dashboard page showing approved reports in app/pages/reports.vue
- [ ] T094 [US7] Implement report detail view in read-only mode for approved reports in app/pages/reports.vue
- [ ] T095 [US7] Implement reject modal with UTextarea for mandatory feedback comment in app/pages/reports.vue
- [ ] T096 [US7] Add validation: reject requires non-empty feedback comment in app/pages/reports.vue
- [ ] T097 [US7] Add role-based access control: restrict /reports route to head_supervisor/manager roles in app/middleware/auth.ts
- [ ] T098 [US7] Ensure reports are read-only (no edit capability) for head_supervisor/manager in app/pages/reports.vue

**Checkpoint**: At this point, User Stories 1-7 should all work independently

---

## Phase 10: User Story 8 - Filtrage et Export Excel (Priority: P3)

**Goal**: Les `head_supervisor` et `manager` peuvent filtrer la liste des rapports dans la vue "Rapports" par date de soumission, par employé/superviseur auteur, et par statut final. Ils peuvent exporter soit l'ensemble des résultats filtrés, soit tous les rapports sans filtre, dans un fichier Excel (.xlsx) bien formaté pour des analyses hors ligne.

**Independent Test**: Un `head_supervisor` ou `manager` peut filtrer les rapports par date, auteur, et statut, puis exporter les résultats filtrés dans un fichier Excel structuré. Il peut également exporter tous les rapports sans appliquer de filtre. Le fichier Excel contient toutes les colonnes pertinentes et est bien formaté.

### Implementation for User Story 8

- [ ] T099 [US8] Implement filterReports function in app/composables/useQuestionnaire.ts (filter by date range, author, status)
- [ ] T100 [US8] Create useExcelExport composable with exportReports function using xlsx library in app/composables/useExcelExport.ts
- [ ] T101 [US8] Implement data transformation: flatten answers_data to Excel structure (one row per table row) in app/composables/useExcelExport.ts
- [ ] T102 [US8] Implement Excel file generation with columns: phone_number, date_soumission, ligne_tableau, colonne_1, colonne_2, ... in app/composables/useExcelExport.ts
- [ ] T103 [US8] Implement file download using XLSX.writeFile() in app/composables/useExcelExport.ts
- [ ] T104 [US8] Add filter UI components (UInput for dates, USelect for authors/status) in app/pages/reports.vue
- [ ] T105 [US8] Implement filter state management in reports page in app/pages/reports.vue
- [ ] T106 [US8] Implement "Export Filtered" button to export filtered results in app/pages/reports.vue
- [ ] T107 [US8] Implement "Export All" button to export all reports (ignore filters) in app/pages/reports.vue
- [ ] T108 [US8] Update useQuestionnaireStore with filterReports action in app/stores/questionnaire.ts
- [ ] T109 [US8] Add loading state and error handling for export operations in app/pages/reports.vue

**Checkpoint**: At this point, all user stories should be independently functional

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T110 [P] Add error handling and user feedback across all pages and components
- [ ] T111 [P] Implement loading states for all async operations (stores, composables)
- [ ] T112 [P] Add form validation messages and error display using @nuxt/ui components
- [ ] T113 [P] Implement consistent navigation and routing (middleware, redirects)
- [ ] T114 [P] Add responsive design considerations for mobile/tablet views using @nuxt/ui responsive utilities
- [ ] T115 [P] Optimize Supabase queries with proper select statements and indexes usage
- [ ] T116 [P] Add proper TypeScript types throughout (remove any types, add strict typing)
- [ ] T117 [P] Review and test all RLS policies for security compliance
- [ ] T118 [P] Add comprehensive error logging and monitoring
- [ ] T119 [P] Run quickstart.md validation checklist
- [ ] T120 [P] Performance optimization: lazy loading, code splitting for large components
- [ ] T121 [P] Documentation: Update README with setup instructions, add code comments for complex logic

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Creates templates/assignments needed by US4
- **User Story 4 (P1)**: Depends on US3 (needs templates/assignments to exist before filling questionnaires)
- **User Story 5 (P2)**: Depends on US4 (needs submitted reports to validate)
- **User Story 6 (P2)**: Depends on US4 and US5 (needs reports in different states)
- **User Story 7 (P2)**: Depends on US4 and US5 (needs approved reports)
- **User Story 8 (P3)**: Depends on US4, US5, US7 (needs reports to filter/export)

### Within Each User Story

- Composables before stores
- Stores before pages/components
- Core implementation before UI integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1, 2, 3 can start in parallel (if team capacity allows)
- User Story 4 must wait for User Story 3 completion (needs templates/assignments)
- User Stories 3-8 have dependencies but can be worked on sequentially by priority
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# User Story 1 tasks can be parallelized in groups:
# Group 1: Composables (useAuth)
Task: T024 - Implement signIn function in app/composables/useAuth.ts
Task: T025 - Implement signOut function in app/composables/useAuth.ts
Task: T026 - Add isActive check after authentication in app/composables/useAuth.ts

# Group 2: Store updates (after composables)
Task: T027 - Update useAuthStore in app/stores/auth.ts

# Group 3: Pages (after store)
Task: T028 - Create login page in app/pages/login.vue
Task: T030 - Create dashboard page in app/pages/dashboard.vue
```

---

## Parallel Example: User Story 3

```bash
# User Story 3 composables can be parallelized:
Task: T048 - Implement createTemplate function in app/composables/useQuestionnaire.ts
Task: T049 - Implement createAssignment function in app/composables/useQuestionnaire.ts
Task: T050 - Implement listTemplates function in app/composables/useQuestionnaire.ts

# Then store update (depends on composables)
Task: T051 - Update useQuestionnaireStore in app/stores/questionnaire.ts

# Then pages (depends on store)
Task: T052 - Create template creation page in app/pages/admin/templates/create.vue
Task: T057 - Implement template list view in app/pages/admin/templates/index.vue
```

## Parallel Example: User Story 4

```bash
# User Story 4 composables can be parallelized (after US3 completes):
Task: T058 - Implement listAssignments function in app/composables/useQuestionnaire.ts
Task: T059 - Implement createSubmission function in app/composables/useQuestionnaire.ts
Task: T060 - Implement updateSubmission function in app/composables/useQuestionnaire.ts
Task: T061 - Implement submitSubmission function in app/composables/useQuestionnaire.ts

# Then store update (depends on composables)
Task: T062 - Update useQuestionnaireStore in app/stores/questionnaire.ts

# Then pages (depends on store)
Task: T063 - Create questionnaire list view in app/pages/dashboard.vue
Task: T064 - Create questionnaire fill page in app/pages/questionnaire/[id]/fill.vue
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3, 4 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentification)
4. Complete Phase 4: User Story 2 (Gestion Utilisateurs)
5. Complete Phase 5: User Story 3 (Création Modèles - nécessaire pour US4)
6. Complete Phase 6: User Story 4 (Remplissage/Soumission)
7. **STOP and VALIDATE**: Test User Stories 1, 2, 3, 4 independently
8. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Basic Auth)
3. Add User Story 2 → Test independently → Deploy/Demo (User Management)
4. Add User Story 3 → Test independently → Deploy/Demo (Templates)
5. Add User Story 4 → Test independently → Deploy/Demo (Core Functionality - MVP!)
6. Add User Stories 5-7 → Test independently → Deploy/Demo (Workflow Complete)
7. Add User Story 8 → Test independently → Deploy/Demo (Full Feature Set)
8. Polish & Cross-cutting → Final Release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Auth)
   - Developer B: User Story 2 (User Management)
   - Developer C: User Story 3 (Templates - must complete before US4)
3. Once User Stories 1, 2, 3 complete:
   - Developer A: User Story 4 (Questionnaires - can now fill templates)
   - Developer B: User Story 5 (Validation)
   - Developer C: User Story 6 (Edit)
4. Continue with User Stories 7-8 sequentially or in parallel as dependencies allow

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All tasks use exact file paths for clarity
- Stack constraints: Use only @nuxt/ui components, @nuxtjs/supabase for backend, Pinia for state
- RLS policies are critical - test thoroughly in Phase 2 before proceeding
- Phone number format validation (8 digits) must be enforced everywhere
