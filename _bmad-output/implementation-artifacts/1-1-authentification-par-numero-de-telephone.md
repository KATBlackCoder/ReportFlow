# Story 1.1: Authentification par numéro de téléphone

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a utilisateur du système,
I want me connecter avec mon numéro de téléphone au format 76XXXXXX@ml.org et un mot de passe par défaut,
So that j'accède rapidement à l'application sans configuration complexe.

## Acceptance Criteria

**Given** un compte utilisateur créé avec numéro 76123456@ml.org
**When** je saisis ce numéro comme identifiant et le mot de passe par défaut de mon rôle
**Then** je suis authentifié et redirigé vers mon tableau de bord selon mon rôle
**And** le système enregistre la connexion pour audit

**Given** un numéro de téléphone invalide (pas au format malien)
**When** j'essaie de me connecter
**Then** j'obtiens un message d'erreur "Numéro de téléphone invalide"
**And** je reste sur la page de connexion

## Tasks / Subtasks

- [ ] Implémenter validation format numéro de téléphone malien (76XXXXXX@ml.org)
- [ ] Créer système d'authentification JWT avec rôles
  - [ ] Modèle utilisateur avec numéro téléphone et rôle
  - [ ] Middleware d'authentification
  - [ ] Génération tokens JWT
- [ ] Interface de connexion
  - [ ] Formulaire avec champ numéro téléphone
  - [ ] Validation temps réel
  - [ ] Messages d'erreur en français
- [ ] Système de redirection par rôle (Employé/Superviseur/Chef/Manager)
- [ ] Journalisation des connexions pour audit
- [ ] Tests de sécurité (XSS/CSRF protection)

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**TECHNICAL STACK CRITIQUE:**
- **Frontend:** Application web moderne (SPA/PWA) avec interface responsive [Source: architecture.md#Platform Requirements]
- **Backend:** API RESTful avec potentiel GraphQL [Source: architecture.md#Integration Points]
- **Base de données:** PostgreSQL recommandé pour relations complexes [Source: architecture.md#Platform Requirements]
- **Sécurité:** Authentification JWT obligatoire, chiffrement données, protection XSS/CSRF [Source: architecture.md#Security Constraints]

**CONTRAINTES ARCHITECTURALES À RESPECTER:**
- Format numéro téléphone: `76XXXXXX@ml.org` (standard malien) [Source: epics.md#Story 1.1]
- Rôles utilisateur: Employé, Superviseur, Chef superviseur, Manager [Source: architecture.md#Security Constraints]
- Redirection automatique vers tableau de bord selon rôle [Source: epics.md#Story 1.1]
- Journalisation obligatoire pour audit [Source: epics.md#Story 1.1]

**PERFORMANCE REQUIREMENTS:**
- Authentification < 3s (chargement global) [Source: architecture.md#Non-Functional Requirements]
- Support 100 utilisateurs simultanés [Source: architecture.md#Scale & Complexity Assessment]

**SÉCURITÉ REQUISE:**
- Chiffrement des données sensibles en transit et au repos [Source: architecture.md#Security & Compliance]
- Protection XSS/CSRF complète [Source: architecture.md#Security Constraints]
- Principe moindre privilège par rôle [Source: architecture.md#Security & Compliance]

### Project Structure Notes

**ALIGNEMENT STRUCTURE PROJET:**
- Suivre architecture modulaire définie [Source: architecture.md#Cross-Cutting Concerns]
- Interface responsive mobile/desktop optimisée [Source: architecture.md#Cross-Cutting Concerns]
- Base de données relationnelle pour relations complexes [Source: architecture.md#Platform Requirements]

**COMPOSANTS À TOUCHER:**
- Modèles: User, Role, AuditLog
- Controllers: AuthController, UserController
- Middleware: AuthMiddleware, RoleMiddleware
- Views: login.vue/page, dashboard routing
- Services: AuthService, AuditService
- Tests: Auth.spec.js, Security.spec.js

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1] - Spécifications fonctionnelles complètes
- [Source: _bmad-output/planning-artifacts/architecture.md#Security Constraints] - Contraintes sécurité JWT
- [Source: _bmad-output/planning-artifacts/architecture.md#Platform Requirements] - Stack technique imposé
- [Source: _bmad-output/planning-artifacts/architecture.md#Non-Functional Requirements] - Performance < 3s
- [Source: _bmad-output/planning-artifacts/architecture.md#Scale & Complexity Assessment] - Support 100 utilisateurs simultanés

### LIBRAIRIES ET FRAMEWORKS À CONSIDÉRER (RECHERCHE TECH ACTUELLE)

**AUTHENTIFICATION:**
- **jsonwebtoken** (JWT) - Standard pour tokens sécurisés
- **bcryptjs** - Hashage mots de passe (dernière version: 2.4.3)
- **passport** ou **passport-jwt** - Middleware auth flexible

**VALIDATION:**
- **joi** ou **yup** - Validation données robuste
- **express-validator** - Validation middleware Express

**SÉCURITÉ:**
- **helmet** - Headers sécurité HTTP automatiques
- **express-rate-limit** - Protection contre brute force
- **cors** - Gestion cross-origin sécurisée

**BASE DE DONNÉES:**
- **pg** (node-postgres) - Client PostgreSQL officiel
- **prisma** ou **sequelize** - ORM avec migrations et types

### TESTING REQUIREMENTS

**UNIT TESTS:**
- Validation format numéro téléphone malien
- Génération et vérification tokens JWT
- Hashage mots de passe sécurisé

**INTEGRATION TESTS:**
- Workflow complet authentification → redirection
- Gestion erreurs format invalide
- Journalisation connexions

**SECURITY TESTS:**
- Tests pénétration XSS/CSRF
- Validation tokens expirés
- Tentatives connexion invalides

**PERFORMANCE TESTS:**
- Authentification < 3s sous charge
- Support 100 connexions simultanées

## Dev Agent Record

### Agent Model Used

BMad Scrum Master - Story Context Engine v2.0

### Debug Log References

### Completion Notes List

- Story créée avec analyse exhaustive des artifacts
- Intégration complète épics + architecture + contraintes sécurité
- Guide développeur ultime avec guardrails techniques
- Prêt pour implémentation par agent dev

### File List

- Story principale: `1-1-authentification-par-numero-de-telephone.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)
- Epic marqué: `epic-1: in-progress`