# Story 1.2: Modification du mot de passe initial

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a utilisateur venant de se connecter pour la première fois,
I want changer mon mot de passe par défaut,
So that mon compte soit sécurisé avec un mot de passe personnel.

## Acceptance Criteria

**Given** je me suis connecté avec succès avec un mot de passe par défaut
**When** le système me demande de changer mon mot de passe
**Then** je suis redirigé vers une page de changement de mot de passe obligatoire
**And** je ne peux pas accéder aux autres fonctionnalités avant le changement

**Given** je suis sur la page de changement de mot de passe
**When** je saisis un nouveau mot de passe respectant les règles de sécurité
**Then** mon mot de passe est mis à jour
**And** je suis redirigé vers mon tableau de bord

**Given** je saisis un mot de passe trop faible
**When** j'essaie de valider
**Then** j'obtiens un message d'erreur détaillant les exigences de sécurité
**And** le changement est refusé

## Tasks / Subtasks

- [ ] Implémenter détection première connexion après authentification
  - [ ] Middleware pour vérifier si mot de passe est celui par défaut
  - [ ] Redirection forcée vers page changement mot de passe
  - [ ] Blocage accès autres fonctionnalités
- [ ] Interface changement mot de passe obligatoire
  - [ ] Formulaire avec ancien mot de passe, nouveau, confirmation
  - [ ] Validation temps réel des règles de sécurité
  - [ ] Messages d'erreur en français pour mots de passe faibles
- [ ] Règles de sécurité mot de passe (architecture.md)
  - [ ] Longueur minimale 8 caractères
  - [ ] Au moins une majuscule, minuscule, chiffre, caractère spécial
  - [ ] Pas de mots de passe courants ou séquentiels
- [ ] Mise à jour sécurisée du mot de passe
  - [ ] Hashage avec bcryptjs
  - [ ] Suppression session après changement forcé
  - [ ] Redirection vers tableau de bord approprié au rôle
- [ ] Tests sécurité et validation

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**CONTRAINTES SÉCURITÉ CRITIQUES:**
- **Politique mots de passe:** Règles de sécurité définies [Source: architecture.md#Security Constraints]
- **Première connexion obligatoire:** Blocage complet accès système [Source: epics.md#Story 1.2]
- **Session management:** Invalidation après changement [Source: architecture.md#Security & Compliance]
- **Protection contre brute force:** Rate limiting < 5 tentatives/minute [Source: architecture.md#Non-Functional Requirements]

**DÉPENDANCES AVEC STORY PRÉCÉDENTE:**
- **Story 1.1 (Authentification):** Utilise le même système JWT et validation téléphone
- **Réutilisation composants:** User model, AuthService, validation téléphone
- **Patterns établis:** Gestion erreurs français, format téléphone 76XXXXXX@ml.org

**PERFORMANCE REQUIREMENTS:**
- **Validation temps réel:** < 500ms pour feedback utilisateur [Source: architecture.md#Non-Functional Requirements]
- **Changement mot de passe:** < 2s pour éviter frustration utilisateur
- **Rate limiting:** Protection contre attaques sans impacter UX normale

### Project Structure Notes

**ALIGNEMENT AVEC STORY 1.1:**
- **AuthService extension:** Ajouter méthode changeDefaultPassword()
- **User model:** Ajouter champ isDefaultPassword (boolean)
- **Middleware:** ForcePasswordChangeMiddleware
- **Routes:** /auth/change-password (POST obligatoire)

**COMPOSANTS À TOUCHER:**
- AuthService: validatePasswordStrength(), changePassword()
- UserMiddleware: checkFirstLogin()
- AuthController: changePassword endpoint
- PasswordPolicy: règles validation statiques
- Tests: PasswordChange.spec.js, Security.spec.js

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2] - Spécifications complètes changement mot de passe
- [Source: _bmad-output/planning-artifacts/architecture.md#Security Constraints] - Règles sécurité mots de passe
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1] - Patterns authentification réutilisables
- [Source: _bmad-output/planning-artifacts/architecture.md#Non-Functional Requirements] - Performance < 500ms validation
- [Source: _bmad-output/planning-artifacts/architecture.md#Cross-Cutting Concerns] - Session management sécurisé

### LIBRAIRIES ET FRAMEWORKS À CONSIDÉRER

**VALIDATION MOTS DE PASSE:**
- **zxcvbn** (estimation force mot de passe) - v4.4.2
- **password-validator** - règles configurables
- **joi** - validation schéma avec messages personnalisés

**SÉCURITÉ:**
- **bcryptjs** - hashage sécurisé (déjà utilisé story 1.1)
- **express-rate-limit** - protection brute force
- **helmet** - headers sécurité HTTP

**UX:**
- **real-time validation** - feedback instantané sans soumission
- **password strength indicator** - barre visuelle force mot de passe

### TESTING REQUIREMENTS

**UNIT TESTS:**
- Validation règles mot de passe (longueur, complexité, caractères spéciaux)
- Hashage bcrypt sécurisé
- Détection première connexion

**INTEGRATION TESTS:**
- Workflow complet première connexion → changement → redirection
- Blocage accès autres pages pendant changement obligatoire
- Gestion erreurs mot de passe faible avec messages français

**SECURITY TESTS:**
- Tests pénétration changement mot de passe
- Rate limiting contre brute force
- Validation côté serveur (pas que côté client)
- Protection contre session fixation

## Dev Agent Record

### Agent Model Used

BMad Scrum Master - Story Context Engine v2.0

### Debug Log References

### Completion Notes List

- Story créée avec analyse complète des contraintes sécurité
- Intégration avec patterns story 1.1 (authentification)
- Guide sécurité ultime pour prévention failles mots de passe
- Validation temps réel et UX optimale

### File List

- Story principale: `1-2-modification-du-mot-de-passe-initial.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)
- Epic 1 reste: `in-progress`