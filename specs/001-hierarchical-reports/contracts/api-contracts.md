# API Contracts: Système de Rapports Hiérarchique

**Date**: 2026-01-03  
**Feature**: Système de Rapports Hiérarchique  
**Type**: Supabase Client API (via @nuxtjs/supabase)

## Overview

Cette application utilise Supabase comme backend. Les "contrats" décrits ici représentent les interactions fonctionnelles avec Supabase via les composables `@nuxtjs/supabase`. Toutes les opérations passent par les composables `useSupabaseClient()`, `useSupabaseUser()`, etc.

Les règles de sécurité sont appliquées via RLS (Row Level Security) policies au niveau de la base de données.

## Authentication Contracts

### signIn

**Description**: Authentification utilisateur avec format `phone_number@role.or`

**Composable**: `useSupabaseClient().auth.signInWithPassword()`

**Request**:
```typescript
{
  email: string; // Format: "{phone_number}@role.or" (ex: "12345678@supervisor.or")
  password: string;
}
```

**Response**:
```typescript
{
  data: {
    user: User | null;
    session: Session | null;
  };
  error: AuthError | null;
}
```

**Post-Authentication**: Vérifier `profiles.is_active = true` pour bloquer les comptes suspendus

**Errors**:
- Invalid credentials
- User not found
- Account suspended (is_active = false)

---

### signOut

**Description**: Déconnexion utilisateur

**Composable**: `useSupabaseClient().auth.signOut()`

**Request**: Aucun paramètre

**Response**:
```typescript
{
  error: AuthError | null;
}
```

---

## User Management Contracts (Admin Only)

### createUser

**Description**: Créer un nouvel utilisateur (head_supervisor/manager uniquement)

**Composable**: `useSupabaseClient().auth.admin.createUser()` + insertion dans `profiles`

**Request**:
```typescript
{
  phone_number: string; // 8 chiffres
  role: 'employee' | 'supervisor' | 'head_supervisor';
  email?: string;
  birth_date?: string; // ISO date
  country?: string;
  district?: string;
  supervised_by?: string; // phone_number du supérieur
  managed_by?: string; // phone_number du manager (pour head_supervisor)
  password?: string; // Optionnel, généré si absent
}
```

**Response**:
```typescript
{
  user: User;
  profile: Profile;
  error: Error | null;
}
```

**Validation**:
- `phone_number` doit être exactement 8 chiffres
- `role` doit être valide
- `supervised_by`/`managed_by` doivent pointer vers des profils existants
- Email généré: `{phone_number}@role.or`

---

### updateUser

**Description**: Modifier les informations d'un utilisateur (head_supervisor/manager uniquement)

**Composable**: `useSupabaseClient().from('profiles').update()`

**Request**:
```typescript
{
  phone_number: string; // Identifiant
  updates: {
    phone_number?: string; // Nouveau numéro (si modification)
    role?: 'employee' | 'supervisor' | 'head_supervisor' | 'manager';
    email?: string;
    birth_date?: string;
    country?: string;
    district?: string;
    supervised_by?: string;
    managed_by?: string;
  };
}
```

**Response**:
```typescript
{
  data: Profile | null;
  error: PostgrestError | null;
}
```

**Note**: Si `phone_number` est modifié, l'email dans `auth.users` doit également être mis à jour via `auth.admin.updateUserById()`

---

### suspendUser

**Description**: Suspendre un compte utilisateur (head_supervisor/manager uniquement)

**Composable**: `useSupabaseClient().from('profiles').update()`

**Request**:
```typescript
{
  phone_number: string;
  is_active: false;
}
```

**Response**:
```typescript
{
  data: Profile | null;
  error: PostgrestError | null;
}
```

**Effect**: L'utilisateur ne pourra plus se connecter (vérification après auth)

---

### listUsers

**Description**: Lister les utilisateurs (head_supervisor/manager voient tous, autres voient leurs subordonnés)

**Composable**: `useSupabaseClient().from('profiles').select()`

**Request**:
```typescript
{
  filters?: {
    role?: 'employee' | 'supervisor' | 'head_supervisor' | 'manager';
    is_active?: boolean;
  };
}
```

**Response**:
```typescript
{
  data: Profile[];
  error: PostgrestError | null;
}
```

**RLS**: RLS applique automatiquement les filtres selon le rôle

---

## Questionnaire Template Contracts

### createTemplate

**Description**: Créer un modèle de questionnaire (head_supervisor/manager uniquement)

**Composable**: `useSupabaseClient().from('questionnaire_templates').insert()`

**Request**:
```typescript
{
  title: string;
  table_definition: {
    rows: Array<{ id: string; label: string }>;
    columns: Array<{ id: string; label: string; type: 'text' | 'number' | 'date' }>;
    fieldTypes?: Record<string, string>;
  };
}
```

**Response**:
```typescript
{
  data: QuestionnaireTemplate | null;
  error: PostgrestError | null;
}
```

---

### listTemplates

**Description**: Lister les modèles de questionnaires

**Composable**: `useSupabaseClient().from('questionnaire_templates').select()`

**Request**: Aucun paramètre (ou filtres optionnels)

**Response**:
```typescript
{
  data: QuestionnaireTemplate[];
  error: PostgrestError | null;
}
```

---

## Assignment Contracts

### createAssignment

**Description**: Assigner un questionnaire à un utilisateur (head_supervisor/manager uniquement)

**Composable**: `useSupabaseClient().from('assignments').insert()`

**Request**:
```typescript
{
  template_id: string; // UUID
  assignee_phone: string; // 8 chiffres
  due_date?: string; // ISO date
}
```

**Response**:
```typescript
{
  data: Assignment | null;
  error: PostgrestError | null;
}
```

---

### listAssignments

**Description**: Lister les questionnaires assignés (utilisateur voit ses propres assignments)

**Composable**: `useSupabaseClient().from('assignments').select()`

**Request**:
```typescript
{
  status?: 'assigned' | 'submitted' | 'approved' | 'rejected';
  includeTemplate?: boolean; // Joindre questionnaire_templates
}
```

**Response**:
```typescript
{
  data: Assignment[];
  error: PostgrestError | null;
}
```

**RLS**: RLS applique automatiquement les filtres selon le rôle

---

## Submission Contracts

### createSubmission

**Description**: Créer une soumission (draft) pour un assignment

**Composable**: `useSupabaseClient().from('submissions').insert()`

**Request**:
```typescript
{
  assignment_id: string; // UUID
  answers_data: Record<string, any>; // Aligné sur table_definition
  current_status: 'draft';
}
```

**Response**:
```typescript
{
  data: Submission | null;
  error: PostgrestError | null;
}
```

---

### updateSubmission

**Description**: Modifier une soumission (si permissions)

**Composable**: `useSupabaseClient().from('submissions').update()`

**Request**:
```typescript
{
  id: string; // UUID
  updates: {
    answers_data?: Record<string, any>;
    current_status?: 'draft' | 'submitted' | 'rejected';
  };
}
```

**Response**:
```typescript
{
  data: Submission | null;
  error: PostgrestError | null;
}
```

**Permissions**: Vérifier via `canEditSubmission(currentUser, submission)` avant modification

---

### submitSubmission

**Description**: Soumettre un rapport (passage à status='submitted')

**Composable**: `useSupabaseClient().from('submissions').update()`

**Request**:
```typescript
{
  id: string; // UUID
  current_status: 'submitted';
}
```

**Response**:
```typescript
{
  data: Submission | null;
  error: PostgrestError | null;
}
```

**Effect**: Le rapport devient visible par le supérieur hiérarchique

---

### getSubmission

**Description**: Récupérer une soumission avec détails

**Composable**: `useSupabaseClient().from('submissions').select()`

**Request**:
```typescript
{
  id: string; // UUID
  includeAssignment?: boolean;
  includeValidations?: boolean;
}
```

**Response**:
```typescript
{
  data: Submission | null;
  error: PostgrestError | null;
}
```

---

## Validation Contracts

### approveSubmission

**Description**: Approuver une soumission (supervisor/head_supervisor/manager)

**Composable**: `useSupabaseClient().from('submissions').update()` + `useSupabaseClient().from('validations').insert()`

**Request**:
```typescript
{
  submission_id: string; // UUID
  decision: 'approved';
}
```

**Response**:
```typescript
{
  submission: Submission;
  validation: Validation;
  error: Error | null;
}
```

**Effect**: Met `current_status = 'approved'` et crée entrée dans `validations`

---

### rejectSubmission

**Description**: Rejeter une soumission avec commentaire (supervisor/head_supervisor/manager)

**Composable**: `useSupabaseClient().from('submissions').update()` + `useSupabaseClient().from('validations').insert()`

**Request**:
```typescript
{
  submission_id: string; // UUID
  decision: 'rejected';
  feedback: string; // Obligatoire
}
```

**Response**:
```typescript
{
  submission: Submission;
  validation: Validation;
  error: Error | null;
}
```

**Validation**: `feedback` doit être non vide

**Effect**: Met `current_status = 'rejected'` et crée entrée dans `validations` avec `feedback`

---

## Reports Contracts (Head Supervisor/Manager)

### listReports

**Description**: Lister les rapports (head_supervisor/manager voient status='approved')

**Composable**: `useSupabaseClient().from('submissions').select()`

**Request**:
```typescript
{
  status?: 'approved' | 'rejected' | 'submitted';
  filters?: {
    author_phone?: string;
    submitted_from?: string; // ISO date
    submitted_to?: string; // ISO date
  };
}
```

**Response**:
```typescript
{
  data: Submission[];
  error: PostgrestError | null;
}
```

**RLS**: Head_supervisor/manager voient uniquement les rapports avec `current_status = 'approved'`

---

### exportReports

**Description**: Exporter les rapports en Excel (côté client)

**Implementation**: `xlsx` library + `useSupabaseClient().from('submissions').select()`

**Request**:
```typescript
{
  filters?: {
    author_phone?: string[];
    submitted_from?: string;
    submitted_to?: string;
    status?: 'approved' | 'rejected';
  };
  exportAll?: boolean; // Si true, ignore les filtres
}
```

**Response**: Fichier Excel (.xlsx) téléchargé

**Structure Excel**:
- Colonnes: `phone_number`, `date_soumission`, `ligne_tableau`, `colonne_1`, `colonne_2`, ...
- Une ligne Excel par ligne du tableau de réponse
- Format préservé de `answers_data`

---

## Type Definitions

```typescript
interface Profile {
  phone_number: string;
  role: 'employee' | 'supervisor' | 'head_supervisor' | 'manager';
  email?: string;
  birth_date?: string;
  country?: string;
  district?: string;
  supervised_by?: string;
  managed_by?: string;
  is_active: boolean;
  created_at: string;
}

interface QuestionnaireTemplate {
  id: string;
  created_by: string;
  title: string;
  table_definition: {
    rows: Array<{ id: string; label: string }>;
    columns: Array<{ id: string; label: string; type: string }>;
    fieldTypes?: Record<string, string>;
  };
  created_at: string;
}

interface Assignment {
  id: string;
  template_id: string;
  assignee_phone: string;
  due_date?: string;
  status: 'assigned' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
}

interface Submission {
  id: string;
  assignment_id: string;
  answers_data: Record<string, any>;
  submitted_at: string;
  current_status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

interface Validation {
  id: string;
  submission_id: string;
  validator_phone: string;
  decision: 'approved' | 'rejected';
  feedback?: string;
  validated_at: string;
}
```

## Error Handling

Toutes les opérations Supabase retournent une structure avec `data` et `error`:

```typescript
{
  data: T | null;
  error: PostgrestError | AuthError | null;
}
```

Les erreurs doivent être gérées côté application pour:
- Afficher des messages utilisateur appropriés
- Gérer les violations RLS (accès refusé)
- Valider les contraintes métier

## Security Notes

- Toutes les opérations sont protégées par RLS au niveau base de données
- Les permissions sont vérifiées côté serveur (RLS) avant toute opération
- La validation côté client est une optimisation UX mais ne remplace jamais RLS
- Les tokens d'authentification sont gérés automatiquement par `@nuxtjs/supabase`
