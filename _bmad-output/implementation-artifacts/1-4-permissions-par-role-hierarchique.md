# Story 1.4: Permissions par rôle hiérarchique

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a utilisateur authentifié,
I want accéder uniquement aux fonctionnalités autorisées pour mon rôle,
So that je ne vois que les données et actions pertinentes à mes responsabilités.

## Acceptance Criteria

**Given** je suis un employé authentifié
**When** j'accède à l'application
**Then** je vois uniquement mes questionnaires et rapports personnels
**And** je n'ai pas accès aux fonctionnalités de gestion

**Given** je suis un superviseur authentifié
**When** j'accède à l'application
**Then** je vois les questionnaires et rapports de mon équipe
**And** j'ai accès aux fonctionnalités de validation

**Given** je suis un Chef superviseur ou Manager authentifié
**When** j'accède à l'application
**Then** je vois tous les questionnaires et rapports du système
**And** j'ai accès aux fonctionnalités de création et gestion complète

## Tasks / Subtasks

- [ ] Système de permissions basé sur rôles
  - [ ] Définition matrice permissions par rôle (JSON/Enum)
  - [ ] Middleware autorisation pour toutes les routes
  - [ ] Service vérification permissions temps réel
- [ ] Filtrage données par rôle
  - [ ] Employé: questionnaires personnels uniquement
  - [ ] Superviseur: équipe + personnels
  - [ ] Chef/Manager: tous les questionnaires/rapports
- [ ] Interface adaptative selon rôle
  - [ ] Masquage boutons/fonctionnalités non autorisées
  - [ ] Navigation différente par rôle
  - [ ] Messages d'erreur "Accès refusé" en français
- [ ] Gestion équipes hiérarchiques
  - [ ] Relations employé → superviseur → chef/manager
  - [ ] Requêtes optimisées avec jointures
  - [ ] Cache permissions pour performance
- [ ] Tests sécurité autorisation

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**AUTORISATION CRITIQUE:**
- **Principe moindre privilège:** Chaque rôle accès minimum nécessaire [Source: architecture.md#Security & Compliance]
- **Filtrage données:** Requêtes filtrées selon rôle, pas masquage frontend uniquement [Source: architecture.md#Security Constraints]
- **Performance:** Cache permissions pour éviter requêtes répétées [Source: architecture.md#Performance & Scalability]

**RÔLES DÉFINIS:**
- **Employé:** Lecture questionnaires personnels, soumission rapports [Source: epics.md#Story 1.4]
- **Superviseur:** Lecture équipe + validation rapports [Source: epics.md#Story 1.4]
- **Chef superviseur/Manager:** CRUD complet tous questionnaires/rapports [Source: epics.md#Story 1.4]

**DÉPENDANCES AVEC STORIES PRÉCÉDENTES:**
- **Story 1.3:** Utilise système rôles créé
- **Story 1.1:** Étend middleware authentification
- **Patterns:** Role-based middleware, permission checking

### Project Structure Notes

**MIDDLEWARE À CRÉER:**
- **AuthorizationMiddleware:** Vérification permissions par route
- **DataScopeMiddleware:** Filtrage automatique données selon rôle
- **RoleGuard:** Décorateur/composant pour composants frontend

**STRUCTURE BASE DE DONNÉES:**
- **Permission table:** role, resource, action (CRUD)
- **UserRole table:** user_id, role_id, scope (equipe/région)
- **Resource table:** questionnaires, rapports, utilisateurs, etc.

**COMPOSANTS À TOUCHER:**
- AuthMiddleware: extension avec permissions
- PermissionService: checkPermission(), getUserPermissions()
- Database queries: ajout filtres WHERE selon rôle
- Frontend: guards routes, composants conditionnels

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4] - Matrice permissions complète
- [Source: _bmad-output/planning-artifacts/architecture.md#Security & Compliance] - Principe moindre privilège
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3] - Système rôles sous-jacent
- [Source: _bmad-output/planning-artifacts/architecture.md#Performance & Scalability] - Cache permissions

### LIBRAIRIES ET FRAMEWORKS À CONSIDÉRER

**AUTORISATION:**
- **casl** - Library permissions flexible (v6.0.0)
- **accesscontrol** - RBAC/ACM complet
- **express-jwt-permissions** - Middleware JWT permissions

**CACHE:**
- **redis** - Cache permissions utilisateur
- **node-cache** - Cache en mémoire simple

**TESTING:**
- **supertest** - Tests API avec différents rôles
- **jest-each** - Tests paramétrés par rôle

### TESTING REQUIREMENTS

**UNIT TESTS:**
- Validation permissions par rôle
- Filtrage données automatique
- Cache permissions fonctionnel

**INTEGRATION TESTS:**
- Workflows complets par rôle (employé/superviseur/manager)
- Tentatives accès non autorisé → 403 Forbidden
- Filtrage données selon scope équipe/région

**SECURITY TESTS:**
- Privilege escalation prévention
- Horizontal privilege breach tests
- Vertical privilege escalation tests

## Dev Agent Record

### Agent Model Used

BMad Scrum Master - Story Context Engine v2.0

### Completion Notes List

- Story créée avec matrice permissions complète
- Système autorisation sécurisé et performant
- Prévention violations sécurité par rôle
- Cache optimisé pour scalabilité

### File List

- Story principale: `1-4-permissions-par-role-hierarchique.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)
- Epic 1 reste: `in-progress`