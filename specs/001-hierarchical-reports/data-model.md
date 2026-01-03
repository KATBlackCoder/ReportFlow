# Data Model: Système de Rapports Hiérarchique

**Date**: 2026-01-03  
**Feature**: Système de Rapports Hiérarchique

## Overview

Modèle de données PostgreSQL hébergé sur Supabase. Toutes les règles métier sont appliquées via RLS (Row Level Security) policies. Le schéma respecte la hiérarchie des rôles et le workflow de validation multi-niveaux.

## Entities

### 1. profiles

**Description**: Étend `auth.users` de Supabase avec informations de profil et hiérarchie.

**Primary Key**: `phone_number` (TEXT, 8 chiffres)

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `phone_number` | TEXT | PRIMARY KEY, CHECK (phone_number ~ '^\d{8}$') | Numéro de téléphone (8 chiffres exactement) |
| `role` | TEXT | NOT NULL, CHECK (role IN ('employee', 'supervisor', 'head_supervisor', 'manager')) | Rôle hiérarchique |
| `email` | TEXT | | Email (optionnel) |
| `birth_date` | DATE | | Date de naissance (optionnel) |
| `country` | TEXT | | Pays (optionnel) |
| `district` | TEXT | | District (optionnel) |
| `supervised_by` | TEXT | REFERENCES profiles(phone_number) | Supérieur direct (pour employee et supervisor) |
| `managed_by` | TEXT | REFERENCES profiles(phone_number) | Manager (pour head_supervisor) |
| `is_active` | BOOLEAN | DEFAULT TRUE | Statut du compte (false = suspendu) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Date de création |

**Relationships**:
- Un profil peut avoir un supérieur direct (`supervised_by` ou `managed_by`)
- Un profil peut être référencé comme supérieur par plusieurs autres profils
- Hiérarchie: employee → supervisor (via `supervised_by`), supervisor → head_supervisor (via `supervised_by`), head_supervisor → manager (via `managed_by`)

**RLS Policies**:
- Un utilisateur peut lire son propre profil et ceux de ses subordonnés directs
- Seuls `head_supervisor` et `manager` peuvent écrire (créer/modifier/suspendre)

**Validation Rules**:
- `phone_number` doit être exactement 8 chiffres
- `role` doit être l'un des 4 rôles autorisés
- Références `supervised_by` et `managed_by` doivent pointer vers des profils existants

### 2. questionnaire_templates

**Description**: Modèles de questionnaires réutilisables avec structure tabulaire.

**Primary Key**: `id` (UUID)

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Identifiant unique |
| `created_by` | TEXT | NOT NULL, REFERENCES profiles(phone_number) | Créateur du template (head_supervisor ou manager) |
| `title` | TEXT | NOT NULL | Titre du questionnaire |
| `table_definition` | JSONB | NOT NULL | Structure: { "rows": [...], "columns": [...], "fieldTypes": [...] } |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Date de création |

**Relationships**:
- Créé par un `head_supervisor` ou `manager` (via `created_by`)
- Peut être référencé par plusieurs `assignments`

**Validation Rules**:
- `table_definition` doit être un JSONB valide avec structure: `{ "rows": [...], "columns": [...], "fieldTypes": [...] }`
- Seuls `head_supervisor` et `manager` peuvent créer des templates

### 3. assignments

**Description**: Assignations de questionnaires à des utilisateurs avec échéance.

**Primary Key**: `id` (UUID)

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Identifiant unique |
| `template_id` | UUID | NOT NULL, REFERENCES questionnaire_templates(id) | Template de questionnaire assigné |
| `assignee_phone` | TEXT | NOT NULL, REFERENCES profiles(phone_number) | Utilisateur assigné (employee ou supervisor) |
| `due_date` | DATE | | Date d'échéance (optionnel) |
| `status` | TEXT | DEFAULT 'assigned', CHECK (status IN ('assigned', 'submitted', 'approved', 'rejected')) | Statut de l'assignation |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Date de création |

**Relationships**:
- Référence un `questionnaire_templates` (via `template_id`)
- Référence un `profiles` (via `assignee_phone`)
- Peut avoir une `submissions` unique (relation 1:1)

**RLS Policies**:
- Un utilisateur ne peut voir que ses propres `assignments`
- Les supérieurs voient les `assignments` de leur équipe via vues ou fonctions

**Validation Rules**:
- `assignee_phone` doit être un `employee` ou `supervisor`
- `status` doit être l'un des 4 états autorisés

### 4. submissions

**Description**: Rapports soumis (réponses remplies aux questionnaires).

**Primary Key**: `id` (UUID)

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Identifiant unique |
| `assignment_id` | UUID | UNIQUE NOT NULL, REFERENCES assignments(id) | Assignment correspondant |
| `answers_data` | JSONB | NOT NULL | Réponses structurées alignées sur `table_definition` |
| `submitted_at` | TIMESTAMPTZ | DEFAULT NOW() | Date de soumission |
| `current_status` | TEXT | NOT NULL, CHECK (current_status IN ('draft', 'submitted', 'approved', 'rejected')) | Statut actuel du rapport |

**Relationships**:
- Relation 1:1 avec `assignments` (via `assignment_id`)
- Peut avoir plusieurs `validations` (historique des décisions)

**RLS Policies**:
- Un `employee`/`supervisor` ne voit que ses propres soumissions
- Un `supervisor` voit les soumissions de son équipe où `current_status = 'submitted'`
- Un `head_supervisor`/`manager` voit les soumissions où `current_status = 'approved'`

**Validation Rules**:
- `answers_data` doit être aligné sur la structure `table_definition` du template
- `current_status` doit suivre le workflow: draft → submitted → approved/rejected

**State Transitions**:
- `draft`: Rapport en cours d'édition
- `submitted`: Rapport soumis, en attente de validation
- `approved`: Rapport approuvé, visible par head_supervisor/manager
- `rejected`: Rapport rejeté, retourne à l'auteur pour modification

### 5. validations

**Description**: Trace des décisions d'approbation/rejet avec commentaires.

**Primary Key**: `id` (UUID)

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Identifiant unique |
| `submission_id` | UUID | NOT NULL, REFERENCES submissions(id) | Rapport validé/rejeté |
| `validator_phone` | TEXT | NOT NULL, REFERENCES profiles(phone_number) | Validateur (supervisor, head_supervisor, ou manager) |
| `decision` | TEXT | NOT NULL, CHECK (decision IN ('approved', 'rejected')) | Décision (approuvé ou rejeté) |
| `feedback` | TEXT | | Commentaire (obligatoire en cas de rejet, vérifié en application) |
| `validated_at` | TIMESTAMPTZ | DEFAULT NOW() | Date de validation |

**Relationships**:
- Référence une `submissions` (via `submission_id`)
- Référence un `profiles` validateur (via `validator_phone`)
- Plusieurs validations peuvent exister pour une même soumission (historique)

**Validation Rules**:
- `feedback` doit être fourni si `decision = 'rejected'` (vérifié côté application)
- `validator_phone` doit être un `supervisor`, `head_supervisor`, ou `manager`

## Relationships Summary

```
profiles
  ├──→ profiles (supervised_by, managed_by) [self-reference]
  ├──→ questionnaire_templates (created_by)
  ├──→ assignments (assignee_phone)
  └──→ validations (validator_phone)

questionnaire_templates
  └──→ assignments (template_id)

assignments
  ├──→ questionnaire_templates (template_id)
  ├──→ profiles (assignee_phone)
  └──→ submissions (assignment_id) [1:1]

submissions
  ├──→ assignments (assignment_id) [1:1]
  └──→ validations (submission_id) [1:many]

validations
  ├──→ submissions (submission_id)
  └──→ profiles (validator_phone)
```

## Indexes (Recommended)

```sql
-- Profiles
CREATE INDEX idx_profiles_supervised_by ON profiles(supervised_by);
CREATE INDEX idx_profiles_managed_by ON profiles(managed_by);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);

-- Assignments
CREATE INDEX idx_assignments_assignee ON assignments(assignee_phone);
CREATE INDEX idx_assignments_template ON assignments(template_id);
CREATE INDEX idx_assignments_status ON assignments(status);

-- Submissions
CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX idx_submissions_status ON submissions(current_status);
CREATE INDEX idx_submissions_submitted_at ON submissions(submitted_at);

-- Validations
CREATE INDEX idx_validations_submission ON validations(submission_id);
CREATE INDEX idx_validations_validator ON validations(validator_phone);
```

## RLS Policies Overview

**Profiles**:
- SELECT: Utilisateur voit son profil + profils de ses subordonnés directs
- INSERT/UPDATE/DELETE: Seuls head_supervisor/manager peuvent créer/modifier/supprimer

**Assignments**:
- SELECT: Utilisateur voit ses propres assignments + assignments de son équipe (supérieurs)
- INSERT/UPDATE/DELETE: Seuls head_supervisor/manager peuvent créer/modifier

**Submissions**:
- SELECT: Employee/supervisor voient leurs propres soumissions; supervisor voit soumissions équipe (status='submitted'); head_supervisor/manager voient soumissions (status='approved')
- INSERT/UPDATE: Auteur original peut créer/modifier (si status='draft'/'submitted'/'rejected')
- DELETE: Pas de suppression (audit trail)

**Validations**:
- SELECT: Utilisateur voit validations des soumissions auxquelles il a accès
- INSERT: Supervisor/head_supervisor/manager peuvent créer validations pour soumissions visibles
- UPDATE/DELETE: Pas de modification/suppression (audit trail)

## Data Integrity Constraints

1. **Hierarchical Integrity**: `supervised_by` et `managed_by` doivent respecter la hiérarchie (employee → supervisor → head_supervisor → manager)
2. **Workflow Integrity**: Transitions d'état doivent suivre le workflow défini (draft → submitted → approved/rejected)
3. **Referential Integrity**: Toutes les clés étrangères doivent pointer vers des enregistrements existants
4. **Phone Number Format**: `phone_number` doit être exactement 8 chiffres (CHECK constraint)
5. **Role Constraints**: `role` doit être l'un des 4 rôles autorisés (CHECK constraint)
