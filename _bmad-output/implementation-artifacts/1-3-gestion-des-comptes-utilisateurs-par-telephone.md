# Story 1.3: Gestion des comptes utilisateurs par téléphone

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Chef superviseur ou Manager,
I want créer des comptes utilisateurs avec numéro de téléphone et informations personnelles,
So that les nouveaux employés soient correctement identifiés et puissent accéder immédiatement au système.

## Acceptance Criteria

**Given** je suis un Chef superviseur ou Manager authentifié
**When** je crée un nouveau compte utilisateur
**Then** je peux saisir le numéro de téléphone, nom, prénom et quartier
**And** le système crée automatiquement l'identifiant numéro@ml.org

**Given** je saisis les informations : numéro 76123456, nom "Diallo", prénom "Fatoumata", quartier "Baco-Djicoroni"
**When** je valide la création
**Then** le compte est créé avec identifiant 76123456@ml.org
**And** les informations personnelles sont stockées pour identification

**Given** je crée un compte pour un employé
**When** je sélectionne le rôle "Employé"
**Then** le mot de passe par défaut "Employe2024!" est assigné
**And** les permissions appropriées sont configurées

**Given** j'essaie de créer un compte avec un numéro déjà existant
**When** je valide la création
**Then** j'obtiens une erreur "Ce numéro de téléphone est déjà utilisé"
**And** la création est annulée

**Given** je veux modifier les informations d'un utilisateur existant
**When** je mets à jour nom, prénom ou quartier
**Then** les modifications sont sauvegardées
**And** l'historique des changements est conservé

## Tasks / Subtasks

- [ ] Interface gestion utilisateurs (Chefs superviseurs/Managers uniquement)
  - [ ] Page liste utilisateurs avec filtres par rôle/équipe
  - [ ] Bouton "Créer utilisateur" avec autorisation par rôle
  - [ ] Formulaire création avec validation temps réel
- [ ] Validation numéro téléphone malien
  - [ ] Format 76XXXXXX obligatoire
  - [ ] Unicité dans la base (contrainte unique)
  - [ ] Messages d'erreur en français
- [ ] Génération automatique identifiant
  - [ ] Format: numéro@ml.org (ex: 76123456@ml.org)
  - [ ] Vérification unicité identifiant généré
- [ ] Gestion rôles et mots de passe par défaut
  - [ ] Rôles: Employé, Superviseur, Chef superviseur, Manager
  - [ ] Mots de passe par défaut par rôle
  - [ ] Permissions automatiquement assignées selon rôle
- [ ] Modification comptes existants
  - [ ] Interface édition pour informations personnelles
  - [ ] Historique changements (audit trail)
  - [ ] Validation modifications (pas de conflits)
- [ ] Tests sécurité et validation

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**CONTRAINTES BASE DE DONNÉES CRITIQUES:**
- **PostgreSQL obligatoire:** Relations complexes utilisateurs/rôles/équipes [Source: architecture.md#Platform Requirements]
- **Unicité numéro téléphone:** Contrainte unique niveau base de données [Source: epics.md#Story 1.3]
- **Audit trail:** Historique changements obligatoire pour conformité [Source: architecture.md#Security & Compliance]

**SÉCURITÉ PAR RÔLE:**
- **Autorisation stricte:** Chefs superviseurs/Managers uniquement pour création [Source: epics.md#Story 1.3]
- **Principe moindre privilège:** Permissions automatiquement déduites du rôle [Source: architecture.md#Security & Compliance]
- **Rôles définis:** Employé, Superviseur, Chef superviseur, Manager [Source: architecture.md#Security Constraints]

**DÉPENDANCES AVEC STORIES PRÉCÉDENTES:**
- **Story 1.1:** Réutilisation validation format téléphone
- **Story 1.2:** Utilisation système mots de passe par défaut
- **Patterns établis:** AuthService, User model, messages français

**PERFORMANCE ET SCALABILITÉ:**
- **Recherche utilisateurs:** Interface filtrage pour 100+ utilisateurs [Source: architecture.md#Scale & Complexity Assessment]
- **Création en masse:** Support création comptes équipe entière
- **Indexation:** Numéro téléphone et identifiant pour recherches rapides

### Project Structure Notes

**SCHÉMA BASE DE DONNÉES À ÉTENDRE:**
- **User table:** Ajouter colonnes nom, prénom, quartier, role_id, created_by, updated_at
- **Role table:** id, name, default_password, permissions (JSON)
- **AuditLog table:** user_id, action, old_values, new_values, changed_by, timestamp

**COMPOSANTS À TOUCHER:**
- UserService: createUser(), updateUser(), validatePhoneUniqueness()
- RoleService: getRolePermissions(), getDefaultPassword()
- UserController: createUser, updateUser, listUsers (avec filtres)
- UserRepository: queries optimisées avec index
- Tests: UserManagement.spec.js, RoleSecurity.spec.js

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3] - Spécifications complètes gestion comptes
- [Source: _bmad-output/planning-artifacts/architecture.md#Platform Requirements] - PostgreSQL obligatoire
- [Source: _bmad-output/planning-artifacts/architecture.md#Security Constraints] - Rôles et permissions
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1] - Format téléphone 76XXXXXX@ml.org
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2] - Mots de passe par défaut
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Management] - Audit trail obligatoire

### LIBRAIRIES ET FRAMEWORKS À CONSIDÉRER

**BASE DE DONNÉES:**
- **prisma** - ORM avec migrations et validation types (v5.7.0)
- **sequelize** - Alternative avec transactions complexes
- **pg** - Client PostgreSQL natif pour optimisations

**VALIDATION ET SÉCURITÉ:**
- **joi** - Validation schémas complexes avec messages français
- **bcryptjs** - Hashage mots de passe par défaut
- **uuid** - Génération identifiants sécurisés si nécessaire

**PERFORMANCE:**
- **DataLoader** - Cache requêtes N+1 problème
- **redis** - Cache rôles/permissions fréquemment utilisés

### TESTING REQUIREMENTS

**UNIT TESTS:**
- Validation numéro téléphone (format, unicité)
- Génération identifiant automatique
- Assignation rôles et permissions
- Hashage mots de passe par défaut

**INTEGRATION TESTS:**
- Workflow création utilisateur complet
- Gestion conflits numéro existant
- Modification avec audit trail
- Autorisation par rôle (accès refusé employés)

**SECURITY TESTS:**
- Injection SQL prévention
- Autorisation rôles respectée
- Audit trail complet et intègre
- Validation côté serveur uniquement

## Dev Agent Record

### Agent Model Used

BMad Scrum Master - Story Context Engine v2.0

### Debug Log References

### Completion Notes List

- Story créée avec analyse complète gestion utilisateurs
- Intégration rôles/permissions selon architecture
- Audit trail et sécurité niveau entreprise
- Base PostgreSQL relationnelle optimisée

### File List

- Story principale: `1-3-gestion-des-comptes-utilisateurs-par-telephone.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)
- Epic 1 reste: `in-progress`