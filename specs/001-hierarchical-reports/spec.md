# Feature Specification: Système de Rapports Hiérarchique

**Feature Branch**: `001-hierarchical-reports`  
**Created**: 2026-01-03  
**Status**: Draft  
**Input**: User description: "Spécifications Détaillées : Système de Rapports Hiérarchique

Problème Principal : Remplacer un processus de reporting papier/Excel par un système numérique sécurisé qui reflète fidèlement une chaîne de validation hiérarchique stricte, avec une gestion centralisée des accès et des données.

Histoires Utilisateurs Principales :

EPIC 1 : Authentification et Gestion de Compte

H1 (Tout utilisateur) : Je me connecte à l'application en entrant mon identifiant (ex: 12345678@supervisor.or) et mon mot de passe sur une page de login unique, afin d'accéder à mon tableau de bord personnel.

H2 (Head_Supervisor/Manager) : Je peux, depuis une interface d'administration, ajouter un nouvel utilisateur en spécifiant son numéro de téléphone, son rôle et son supérieur hiérarchique ; modifier ses informations (y compris le numéro de téléphone) ; ou suspendre son compte (ce qui l'empêche de se connecter), afin de gérer les accès de mon équipe.

EPIC 2 : Cycle de vie d'un Rapport (Questionnaire)

H3 (Head_Supervisor/Manager) : Je peux créer un modèle de questionnaire en définissant un tableau (lignes et colonnes, types de champs) et l'assigner à un employee ou un supervisor avec une échéance.

H4 (Employee/Supervisor - Remplissage) : Je vois la liste des questionnaires qui me sont assignés. En cliquant sur l'un, je peux remplir les réponses dans un tableau interactif et soumettre mon rapport, ce qui le place dans l'état submitted.

H5 (Employee - Édition Conditionnelle) : Je peux revoir et éditer un rapport que j'ai soumis seulement si son statut actuel est submitted (en attente chez mon supérieur) ou rejected (renvoyé par un supérieur). Si son statut est approved, je ne peux que le visualiser.

H6 (Supervisor - Validation Équipe) : Dans mon tableau de bord "Validation", je vois la liste des rapports soumis (submitted) par les employee de mon équipe directe. Pour chacun, je peux l'examiner, puis le marquer comme approved (il remonte) ou rejected avec un commentaire obligatoire (il retourne à l'employé).

H7 (Supervisor - Édition Équipe) : Je peux éditer un rapport soumis par un membre de mon équipe seulement si ce rapport a été rejected par mon propre supérieur (head_supervisor) ou s'il est encore dans l'état submitted.

H8 (Head_Supervisor/Manager - Révision & Rejet) : Dans mon tableau de bord "Rapports", je vois uniquement les rapports ayant le statut approved. Pour chacun, je ne peux pas les modifier, mais je peux les rejeter (rejected) avec un commentaire, ce qui les renvoie en arrière dans la chaîne hiérarchique.

EPIC 3 : Consolidation et Export

H9 (Head_Supervisor/Manager - Filtrage & Export) : Dans la vue "Rapports", je peux filtrer la liste par date de soumission, par employé/superviseur auteur, et par statut final. Je peux ensuite exporter l'ensemble des résultats filtrés dans un fichier Excel (.xlsx) bien formaté, afin de réaliser des analyses hors ligne.

Fonctionnalités Hors Périmètre : Double validation (ex: collègue + supérieur), notifications par email/SMS, historique des modifications détaillé (audit log), interface mobile native."

## Clarifications

### Session 2026-01-03

- Q: Les supervisors et head_supervisors peuvent-ils modifier les rapports ou seulement les approuver/rejeter ? → A: Les supervisors, head_supervisors et managers ne peuvent pas modifier les rapports, seulement les approuver ou les rejeter avec un commentaire. Seul l'auteur original (employee ou supervisor pour son propre travail) peut modifier un rapport.
- Q: Quelles colonnes doivent être incluses dans l'export Excel ? → A: L'export Excel contient uniquement : numéro de téléphone de l'auteur, réponses au questionnaire (contenu du tableau), et date d'envoi du questionnaire (date de soumission).
- Q: Comment représenter un tableau (lignes/colonnes) dans l'export Excel ? → A: Structure préservée : chaque rapport = plusieurs lignes Excel (une ligne Excel par ligne du tableau), avec colonnes : phone_number, date_soumission, ligne_tableau, colonne_1, colonne_2, ... (une colonne Excel par colonne du tableau).
- Q: Les head_supervisor et manager peuvent-ils exporter tous les rapports sans filtre, ou seulement les résultats filtrés ? → A: Export des résultats filtrés OU export complet (tous les rapports sans filtre). Les utilisateurs peuvent choisir d'exporter tous les rapports ou d'appliquer des filtres avant l'export.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authentification et Accès (Priority: P1)

Tout utilisateur peut se connecter à l'application en utilisant son identifiant au format `phone_number@role.or` et son mot de passe sur une page de login unique. Après authentification réussie, l'utilisateur accède à son tableau de bord personnel adapté à son rôle.

**Why this priority**: L'authentification est le prérequis fondamental pour accéder au système. Sans cette fonctionnalité, aucune autre fonctionnalité n'est utilisable. C'est la base de la sécurité et du contrôle d'accès.

**Independent Test**: Un utilisateur peut se connecter avec un identifiant valide et un mot de passe correct, puis accéder à son tableau de bord. Un utilisateur avec un identifiant invalide ou un mot de passe incorrect ne peut pas accéder au système. Un utilisateur suspendu ne peut pas se connecter même avec des identifiants valides.

**Acceptance Scenarios**:

1. **Given** un utilisateur avec un compte actif et des identifiants valides, **When** il entre son identifiant `12345678@supervisor.or` et son mot de passe correct, **Then** il est authentifié et redirigé vers son tableau de bord
2. **Given** un utilisateur avec un identifiant invalide (format incorrect), **When** il tente de se connecter, **Then** un message d'erreur indique que l'identifiant est invalide
3. **Given** un utilisateur avec un identifiant valide mais un mot de passe incorrect, **When** il tente de se connecter, **Then** un message d'erreur indique que les identifiants sont incorrects
4. **Given** un utilisateur avec un compte suspendu (`is_active = false`), **When** il tente de se connecter avec des identifiants valides, **Then** l'accès est refusé avec un message approprié

---

### User Story 2 - Gestion des Utilisateurs (Priority: P1)

Les rôles `head_supervisor` et `manager` peuvent créer, modifier, suspendre et supprimer des comptes utilisateurs pour les rôles inférieurs via une interface d'administration. Ils peuvent spécifier le numéro de téléphone (8 chiffres), le rôle, le supérieur hiérarchique, et modifier toutes les informations y compris le numéro de téléphone.

**Why this priority**: La gestion des utilisateurs est essentielle pour configurer l'organisation hiérarchique et permettre l'accès au système. Sans cette fonctionnalité, aucun utilisateur ne peut être créé ou géré, bloquant l'utilisation du système.

**Independent Test**: Un `head_supervisor` ou `manager` peut créer un nouvel utilisateur avec un numéro de téléphone, un rôle et un supérieur hiérarchique. Il peut modifier les informations d'un utilisateur existant, y compris le numéro de téléphone. Il peut suspendre un compte, ce qui empêche la connexion. Un utilisateur de rôle inférieur ne peut pas gérer les comptes.

**Acceptance Scenarios**:

1. **Given** un `head_supervisor` ou `manager` connecté, **When** il crée un nouvel utilisateur avec un numéro de téléphone (8 chiffres), un rôle (employee, supervisor, head_supervisor) et un supérieur hiérarchique valide, **Then** le compte est créé et l'utilisateur peut se connecter
2. **Given** un `head_supervisor` ou `manager` connecté, **When** il modifie le numéro de téléphone d'un utilisateur existant, **Then** le changement est enregistré et l'identifiant de connexion est mis à jour
3. **Given** un `head_supervisor` ou `manager` connecté, **When** il suspend un compte utilisateur (`is_active = false`), **Then** l'utilisateur ne peut plus se connecter même avec des identifiants valides
4. **Given** un `employee` ou `supervisor` connecté, **When** il tente d'accéder à l'interface de gestion des utilisateurs, **Then** l'accès est refusé

---

### User Story 3 - Création de Modèles de Questionnaire (Priority: P2)

Les rôles `head_supervisor` et `manager` peuvent créer des modèles de questionnaire en définissant une structure tabulaire (lignes et colonnes) avec différents types de champs. Ils peuvent assigner ces questionnaires à des `employee` ou `supervisor` avec une date d'échéance.

**Why this priority**: La création de modèles est nécessaire avant que les utilisateurs puissent remplir des questionnaires. Cependant, cette fonctionnalité peut être développée après l'authentification et la gestion des utilisateurs, car elle dépend de l'existence d'utilisateurs à qui assigner les questionnaires.

**Independent Test**: Un `head_supervisor` ou `manager` peut créer un modèle de questionnaire avec une structure tabulaire (lignes/colonnes), définir les types de champs, et l'assigner à un ou plusieurs utilisateurs avec une échéance. Le modèle créé apparaît dans la liste des questionnaires assignés aux utilisateurs ciblés.

**Acceptance Scenarios**:

1. **Given** un `head_supervisor` ou `manager` connecté, **When** il crée un modèle de questionnaire avec une structure tabulaire (par exemple, 5 lignes et 3 colonnes), définit les types de champs (texte, nombre, date), et l'assigne à un `employee` avec une échéance, **Then** le modèle est créé et apparaît dans la liste des questionnaires assignés de l'`employee`
2. **Given** un modèle de questionnaire assigné à un utilisateur, **When** l'échéance est atteinte, **Then** le questionnaire reste accessible mais peut être marqué comme en retard dans l'interface

---

### User Story 4 - Remplissage et Soumission de Questionnaires (Priority: P1)

Les `employee` et `supervisor` voient la liste des questionnaires qui leur sont assignés. En cliquant sur un questionnaire, ils peuvent remplir les réponses dans un tableau interactif et soumettre le rapport, ce qui le place dans l'état `submitted`. Un questionnaire soumis par un `supervisor` pour son propre travail est directement visible par `head_supervisor` et `manager` sans validation intermédiaire.

**Why this priority**: Le remplissage et la soumission de questionnaires est la fonctionnalité principale du système. Sans cette capacité, le système ne peut pas remplacer le processus papier/Excel. C'est la valeur métier centrale.

**Independent Test**: Un `employee` ou `supervisor` peut voir la liste de ses questionnaires assignés, ouvrir un questionnaire, remplir les champs du tableau, et soumettre le rapport. Après soumission, le rapport passe à l'état `submitted`. Un rapport soumis par un `supervisor` est visible par `head_supervisor` et `manager`, tandis qu'un rapport soumis par un `employee` nécessite validation par son `supervisor`.

**Acceptance Scenarios**:

1. **Given** un `employee` connecté avec des questionnaires assignés, **When** il ouvre un questionnaire, remplit les champs du tableau interactif, et soumet le rapport, **Then** le rapport passe à l'état `submitted` et apparaît dans la liste de validation de son `supervisor` direct
2. **Given** un `supervisor` connecté qui soumet un questionnaire pour son propre travail, **When** il soumet le rapport, **Then** le rapport passe à l'état `submitted` et est directement visible par les `head_supervisor` et `manager` sans validation intermédiaire
3. **Given** un utilisateur avec un questionnaire non soumis, **When** il tente de soumettre un questionnaire avec des champs obligatoires vides, **Then** la soumission est refusée avec un message indiquant les champs manquants

---

### User Story 5 - Validation des Rapports par Supervisor (Priority: P2)

Un `supervisor` voit dans son tableau de bord "Validation" la liste des rapports à l'état `submitted` soumis par les `employee` de son équipe directe. Pour chaque rapport, il peut l'examiner, puis le marquer comme `approved` (il remonte vers `head_supervisor`/`manager`) ou `rejected` avec un commentaire obligatoire (il retourne à l'`employee` pour modification).

**Why this priority**: La validation hiérarchique est essentielle au workflow. Cependant, elle dépend de la soumission de questionnaires (User Story 4), donc peut être développée après. Elle est critique pour le processus métier mais pas bloquante pour un MVP initial.

**Independent Test**: Un `supervisor` peut voir les rapports `submitted` de son équipe directe, examiner un rapport, l'approuver (passage à `approved`) ou le rejeter avec un commentaire obligatoire (passage à `rejected`). Un rapport rejeté retourne à l'`employee` pour modification.

**Acceptance Scenarios**:

1. **Given** un `supervisor` connecté avec des rapports `submitted` de son équipe, **When** il examine un rapport et le marque comme `approved`, **Then** le rapport passe à l'état `approved` et devient visible par les `head_supervisor` et `manager`
2. **Given** un `supervisor` connecté examinant un rapport `submitted`, **When** il tente de rejeter le rapport sans commentaire, **Then** le rejet est refusé et un message indique qu'un commentaire est obligatoire
3. **Given** un `supervisor` connecté, **When** il rejette un rapport avec un commentaire, **Then** le rapport passe à l'état `rejected` et retourne à l'`employee` pour modification

---

### User Story 6 - Édition Conditionnelle des Rapports (Priority: P2)

Un `employee` peut éditer un rapport qu'il a soumis seulement si son statut est `submitted` (en attente) ou `rejected` (renvoyé). Si le statut est `approved`, le rapport est en lecture seule. Un `supervisor` peut éditer un rapport soumis par un membre de son équipe seulement si le rapport est `rejected` par son propre supérieur ou s'il est encore `submitted`.

**Why this priority**: L'édition conditionnelle est importante pour permettre les corrections, mais elle dépend de l'existence de rapports dans différents états. Elle peut être développée après les fonctionnalités de soumission et validation.

**Independent Test**: Un `employee` peut éditer un rapport `submitted` ou `rejected`, mais ne peut que visualiser un rapport `approved`. Un `supervisor` peut éditer un rapport de son équipe si `submitted` ou `rejected` par son supérieur, mais ne peut pas éditer un rapport `approved`.

**Acceptance Scenarios**:

1. **Given** un `employee` avec un rapport à l'état `submitted`, **When** il tente de modifier le rapport, **Then** l'édition est autorisée et les modifications peuvent être sauvegardées
2. **Given** un `employee` avec un rapport à l'état `rejected`, **When** il modifie le rapport et le resoumet, **Then** le rapport retourne à l'état `submitted` pour revalidation
3. **Given** un `employee` avec un rapport à l'état `approved`, **When** il tente de modifier le rapport, **Then** l'édition est refusée et le rapport est affiché en mode lecture seule
4. **Given** un `supervisor` avec un rapport de son équipe à l'état `rejected` par son `head_supervisor`, **When** il modifie le rapport, **Then** l'édition est autorisée

---

### User Story 7 - Révision et Rejet par Head_Supervisor/Manager (Priority: P2)

Les `head_supervisor` et `manager` voient dans leur tableau de bord "Rapports" uniquement les rapports à l'état `approved`. Pour chaque rapport, ils ne peuvent pas le modifier, mais peuvent le rejeter (`rejected`) avec un commentaire, ce qui le renvoie en arrière dans la chaîne hiérarchique.

**Why this priority**: La révision finale par les rôles supérieurs complète le workflow hiérarchique. Elle dépend de l'existence de rapports `approved`, donc peut être développée après la validation par les supervisors.

**Independent Test**: Un `head_supervisor` ou `manager` peut voir les rapports `approved`, examiner un rapport, et le rejeter avec un commentaire. Le rejet renvoie le rapport en arrière dans la chaîne hiérarchique. Les rapports `approved` ne peuvent pas être modifiés par ces rôles.

**Acceptance Scenarios**:

1. **Given** un `head_supervisor` ou `manager` connecté, **When** il consulte son tableau de bord "Rapports", **Then** il voit uniquement les rapports à l'état `approved`
2. **Given** un `head_supervisor` ou `manager` examinant un rapport `approved`, **When** il tente de modifier le rapport, **Then** l'édition est refusée et le rapport est en lecture seule
3. **Given** un `head_supervisor` ou `manager` examinant un rapport `approved`, **When** il rejette le rapport avec un commentaire, **Then** le rapport passe à l'état `rejected` et est renvoyé au `supervisor` ou à l'`employee` selon la chaîne hiérarchique

---

### User Story 8 - Filtrage et Export Excel (Priority: P3)

Les `head_supervisor` et `manager` peuvent filtrer la liste des rapports dans la vue "Rapports" par date de soumission, par employé/superviseur auteur, et par statut final. Ils peuvent exporter soit l'ensemble des résultats filtrés, soit tous les rapports sans filtre, dans un fichier Excel (.xlsx) bien formaté pour des analyses hors ligne.

**Why this priority**: L'export Excel est une fonctionnalité importante pour l'analyse et la consolidation, mais elle n'est pas critique pour le fonctionnement de base du système. Elle peut être développée après les fonctionnalités principales de workflow.

**Independent Test**: Un `head_supervisor` ou `manager` peut filtrer les rapports par date, auteur, et statut, puis exporter les résultats filtrés dans un fichier Excel structuré. Il peut également exporter tous les rapports sans appliquer de filtre. Le fichier Excel contient toutes les colonnes pertinentes et est bien formaté.

**Acceptance Scenarios**:

1. **Given** un `head_supervisor` ou `manager` dans la vue "Rapports", **When** il filtre par date de soumission (plage de dates), par auteur (sélection d'employés), et par statut (approved, rejected, submitted), **Then** la liste affiche uniquement les rapports correspondant aux critères
2. **Given** un `head_supervisor` ou `manager` avec des rapports filtrés, **When** il exporte les résultats filtrés, **Then** un fichier Excel (.xlsx) est généré avec structure préservée : chaque rapport = plusieurs lignes Excel (une ligne Excel par ligne du tableau), avec colonnes : phone_number, date_soumission, ligne_tableau, colonne_1, colonne_2, ... (une colonne Excel par colonne du tableau)
3. **Given** un `head_supervisor` ou `manager` dans la vue "Rapports" sans filtre appliqué, **When** il exporte tous les rapports, **Then** un fichier Excel (.xlsx) est généré contenant tous les rapports avec la même structure préservée
4. **Given** un `head_supervisor` ou `manager` exportant un grand nombre de rapports (filtrés ou complets), **When** le fichier Excel est généré, **Then** le fichier est téléchargeable et contient toutes les données sans erreur

---

### Edge Cases

- Que se passe-t-il si un `supervisor` est supprimé alors qu'il a des rapports en cours de validation ? Le système doit gérer la réassignation ou la suspension des rapports.
- Que se passe-t-il si un utilisateur tente de soumettre un questionnaire après l'échéance ? Le système doit permettre la soumission mais peut marquer le rapport comme en retard.
- Comment le système gère-t-il les rapports orphelins (auteur supprimé) ? Les rapports doivent rester accessibles pour les rôles supérieurs même si l'auteur est supprimé.
- Que se passe-t-il si un `head_supervisor` rejette un rapport qui était déjà `approved` par un `supervisor` ? Le rejet doit renvoyer le rapport en arrière dans la chaîne hiérarchique.
- Comment le système gère-t-il les modifications simultanées d'un rapport par plusieurs utilisateurs ? Seul l'auteur original (`employee` ou `supervisor` pour son propre travail) peut modifier un rapport. Les rôles supérieurs ne peuvent que visualiser, approuver ou rejeter, donc les conflits de modification sont limités aux cas où plusieurs auteurs tentent de modifier simultanément leur propre rapport (cas rare).
- Que se passe-t-il si un utilisateur tente d'accéder à un questionnaire assigné à un autre utilisateur ? L'accès doit être refusé avec un message approprié.

## Requirements *(mandatory)*

### Functional Requirements

**Note**: All requirements MUST comply with ReportFlow Constitution principles (see `.specify/memory/constitution.md`).

- **FR-001**: System MUST allow users to authenticate using identifier format `phone_number@role.or` (8 digits) and password
- **FR-002**: System MUST prevent suspended users (`is_active = false`) from authenticating
- **FR-003**: System MUST allow `head_supervisor` and `manager` roles to create user accounts with phone_number (8 digits), role, and hierarchical superior
- **FR-004**: System MUST allow `head_supervisor` and `manager` roles to modify all user information including phone_number
- **FR-005**: System MUST allow `head_supervisor` and `manager` roles to suspend user accounts (preventing login)
- **FR-006**: System MUST enforce role hierarchy: `employee` → `supervisor` → `head_supervisor` → `manager`
- **FR-007**: System MUST allow `head_supervisor` and `manager` to create questionnaire templates with tabular structure (rows and columns) and field types
- **FR-008**: System MUST allow `head_supervisor` and `manager` to assign questionnaires to `employee` or `supervisor` with a deadline
- **FR-009**: System MUST display to `employee` and `supervisor` the list of questionnaires assigned to them
- **FR-010**: System MUST allow `employee` and `supervisor` to fill questionnaire responses in an interactive table
- **FR-011**: System MUST allow `employee` and `supervisor` to submit questionnaires, changing status to `submitted`
- **FR-012**: System MUST route `employee` submitted reports to their direct `supervisor` for validation
- **FR-013**: System MUST make `supervisor` submitted reports (for own work) directly visible to `head_supervisor` and `manager` without intermediate validation
- **FR-014**: System MUST allow `employee` to edit their own reports only if status is `submitted` or `rejected`
- **FR-015**: System MUST make `employee` reports with status `approved` read-only for the employee
- **FR-016**: System MUST display to `supervisor` in "Validation" dashboard the list of `submitted` reports from their direct team members
- **FR-017**: System MUST allow `supervisor` to approve reports from their team, changing status to `approved`
- **FR-018**: System MUST require a mandatory comment when `supervisor` rejects a report
- **FR-019**: System MUST prevent `supervisor`, `head_supervisor`, and `manager` from editing reports (read-only access, can only approve or reject)
- **FR-020**: System MUST display to `head_supervisor` and `manager` in "Rapports" dashboard only reports with status `approved`
- **FR-021**: System MUST prevent `head_supervisor` and `manager` from modifying `approved` reports (read-only)
- **FR-022**: System MUST allow `head_supervisor` and `manager` to reject `approved` reports with a comment, changing status to `rejected` and sending back in hierarchical chain
- **FR-023**: System MUST allow `head_supervisor` and `manager` to filter reports by submission date, author (employee/supervisor), and final status
- **FR-024**: System MUST allow `head_supervisor` and `manager` to export filtered results OR all reports (without filters) to Excel (.xlsx) file containing: author phone_number, submission date, and questionnaire responses in preserved structure (one Excel row per table row, with columns: phone_number, date_soumission, ligne_tableau, colonne_1, colonne_2, ...)
- **FR-025**: System MUST enforce all business rules server-side via Supabase RLS policies
- **FR-026**: System MUST validate phone_number format (exactly 8 digits) for all user operations
- **FR-027**: System MUST prevent users from accessing questionnaires assigned to other users

**Constitution Compliance**:
- Authentication MUST use `phone_number@role.or` format (Constitution Principle II)
- Role hierarchy MUST be enforced (Constitution Principle III)
- User management MUST respect permission rules (Constitution Principle IV)
- Workflow validation MUST follow defined rules (Constitution Principle V)
- Report editing MUST respect state-based rules (Constitution Principle VI)
- Export functionality MUST be available for head_supervisor/manager (Constitution Principle VII)
- Profile management MUST respect phone_number immutability (Constitution Principle VIII)

### Key Entities *(include if feature involves data)*

- **User**: Represents a system user with phone_number (8 digits, primary key), role (employee, supervisor, head_supervisor, manager), hierarchical superior (supervised_by), and account status (is_active). Relationships: each user has one superior (except manager), and can have multiple subordinates.

- **Questionnaire Template**: Represents a reusable questionnaire structure with tabular definition (rows, columns, field types). Created by head_supervisor or manager. Relationships: can be assigned to multiple users.

- **Questionnaire Instance**: Represents a specific questionnaire assigned to a user with a deadline. Created from a template. Relationships: belongs to one user (assignee), created from one template.

- **Report**: Represents a filled questionnaire submitted by a user. Contains responses in tabular format. Has status (draft, submitted, approved, rejected). Relationships: created by one user (author), assigned to one questionnaire instance, can have rejection comments from validators.

- **Rejection Comment**: Represents a comment attached when a report is rejected. Contains text and author information. Relationships: belongs to one report, created by one validator (supervisor, head_supervisor, or manager).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete authentication and access their dashboard in under 5 seconds from login page
- **SC-002**: Head_supervisor/manager can create a new user account in under 2 minutes including all required information
- **SC-003**: Employee/supervisor can view their assigned questionnaires list and open a questionnaire in under 2 seconds
- **SC-004**: Employee/supervisor can fill and submit a questionnaire (up to 50 fields) in under 10 minutes
- **SC-005**: Supervisor can review and approve/reject a submitted report in under 3 minutes
- **SC-006**: Head_supervisor/manager can filter reports and export filtered results OR export all reports to Excel (up to 1000 reports) in under 30 seconds
- **SC-007**: 95% of users successfully complete their primary task (submit questionnaire or validate report) on first attempt without errors
- **SC-008**: System supports 500 concurrent users without performance degradation
- **SC-009**: All business rules (role hierarchy, workflow states, permissions) are enforced with 100% compliance (zero violations)
- **SC-010**: Export Excel files are generated correctly with preserved table structure (one Excel row per table row, columns: phone_number, date_soumission, ligne_tableau, colonne_1, colonne_2, ...) for 100% of export requests
