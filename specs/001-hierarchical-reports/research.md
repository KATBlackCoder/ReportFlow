# Research: Système de Rapports Hiérarchique

**Date**: 2026-01-03  
**Feature**: Système de Rapports Hiérarchique  
**Purpose**: Consolider les décisions techniques et patterns d'implémentation

## Stack Technique

### Decision: Nuxt 4 + @nuxt/ui + Supabase + Pinia

**Rationale**: Conforme à la Constitution ReportFlow (Principle I). Stack immuable qui garantit cohérence et maintenabilité.

**Alternatives considered**: Aucune - stack imposé par la constitution.

### Decision: Mode Universel (SSR)

**Rationale**: Meilleure performance initiale, SEO si nécessaire, et compatibilité avec @nuxtjs/supabase pour l'authentification côté serveur.

**Alternatives considered**: 
- SPA: Rejeté car perte de performance initiale et complications pour l'auth Supabase
- SSG: Rejeté car contenu dynamique et authentification requis

## Architecture Backend & Base de Données

### Decision: Supabase PostgreSQL avec RLS

**Rationale**: Conforme à la Constitution. Supabase fournit authentification, base de données et API dans une seule solution. Les RLS policies garantissent la sécurité côté serveur.

**Patterns d'implémentation**:
- Utilisation exclusive de `@nuxtjs/supabase` pour toutes les interactions
- RLS policies pour appliquer les règles métier au niveau base de données
- Fonctions Supabase (Edge Functions) uniquement si nécessaire pour logique complexe

### Decision: Schéma de base de données avec tables profiles, questionnaire_templates, assignments, submissions, validations

**Rationale**: Structure normalisée qui respecte la hiérarchie des rôles et le workflow de validation. Séparation claire entre templates, assignations, soumissions et validations.

**Alternatives considered**: 
- Tables dénormalisées: Rejeté car complexifie les mises à jour et la cohérence
- Structure monolithique: Rejeté car ne respecte pas le workflow multi-états

## Authentification

### Decision: Format `phone_number@role.or` avec création via API Admin Supabase

**Rationale**: Conforme à la Constitution (Principle II). Format structuré permettant identification immédiate du rôle. Création de comptes exclusivement par head_supervisor/manager via `auth.admin.createUser`.

**Pattern d'implémentation**:
- Email généré: `phone_number@role.or`
- Mot de passe généré aléatoirement (ou via fonction Supabase)
- Vérification `is_active` après authentification pour bloquer les comptes suspendus

## Gestion d'État

### Decision: Pinia avec stores useAuthStore, useAdminStore, useQuestionnaireStore

**Rationale**: Conforme à la Constitution. Pinia est la solution standard pour Vue 3/Nuxt 4. Séparation par domaine (auth, admin, questionnaire) pour maintenabilité.

**Pattern d'implémentation**:
- `useAuthStore`: Utilisateur actuel, rôle, permissions, session
- `useAdminStore`: CRUD utilisateurs, liste des utilisateurs
- `useQuestionnaireStore`: Templates, assignments, submissions, état du workflow

## Export Excel

### Decision: Bibliothèque `xlsx` côté client

**Rationale**: Évite la charge serveur, permet traitement direct dans le navigateur. Conforme aux besoins d'export de données filtrées ou complètes.

**Pattern d'implémentation**:
1. Récupérer données via Supabase (vue ou endpoint)
2. Transformer structure JSON `answers_data` en format Excel (une ligne Excel par ligne du tableau)
3. Générer fichier avec `XLSX.writeFile()`
4. Structure: colonnes `phone_number`, `date_soumission`, `ligne_tableau`, `colonne_1`, `colonne_2`, ...

**Alternatives considered**:
- Export côté serveur (Edge Function): Rejeté car charge serveur et latence inutile
- CSV: Rejeté car format moins structuré et moins adapté aux tableaux complexes

## RLS Policies (Patterns)

### Decision: Policies basées sur hiérarchie et rôles

**Patterns d'implémentation**:
- **Profiles**: Un utilisateur lit son profil + profils de ses subordonnés directs (via `supervised_by`/`managed_by`). Seuls head_supervisor/manager écrivent.
- **Assignments**: Un utilisateur voit ses propres assignments. Supérieurs voient assignments de leur équipe via vues/fonctions.
- **Submissions**: Employee/supervisor voient leurs propres soumissions. Supervisor voit soumissions de son équipe où `current_status = 'submitted'`. Head_supervisor/manager voient soumissions où `current_status = 'approved'`.

**Rationale**: Sécurité au niveau base de données, conforme à la Constitution (toutes règles métier appliquées côté serveur).

## Workflow de Validation

### Decision: États draft → submitted → approved/rejected avec règles d'édition conditionnelles

**Pattern d'implémentation**:
- Fonction utilitaire partagée `canEditSubmission(currentUser, submission)` pour vérifier permissions
- Workflow:
  - Employee soumission → `submitted` → Visible par supervisor
  - Supervisor soumission (travail propre) → `submitted` → Visible directement par head_supervisor/manager
  - Supervisor action: `approved` → `current_status = 'approved'` + entrée dans `validations`
  - Supervisor action: `rejected` → `current_status = 'rejected'` + entrée dans `validations` avec `feedback` obligatoire
  - Head_supervisor/manager action sur rapport `approved`: `rejected` uniquement → Met `current_status = 'rejected'` + entrée dans `validations` avec `feedback`

**Rationale**: Workflow hiérarchique strict conforme à la Constitution (Principle V et VI).

## UI Components

### Decision: @nuxt/ui exclusivement

**Rationale**: Conforme à la Constitution (Principle I). Bibliothèque unique pour tous les composants (formulaires, tableaux, badges, modales).

**Composants prévus**:
- `UCard`, `UTable`, `UButton`, `UModal` pour gestion utilisateurs
- `UDashboard`, `UBadge` pour tableaux de bord
- `UForm`, `UTable` éditables pour remplissage questionnaires
- `UInput`, `USelect` pour filtres et formulaires

**Alternatives considered**: Aucune - imposé par la constitution.

## Déploiement

### Decision: Frontend sur Vercel/Netlify, Supabase pour backend/DB

**Rationale**: Déploiement standard pour Nuxt 4. Supabase héberge base de données et authentification. Migrations SQL gérées via migrations Supabase.

**Alternatives considered**:
- Déploiement auto-hébergé: Rejeté car complexité opérationnelle inutile pour MVP
- Autres plateformes: Vercel/Netlify sont standards pour Nuxt, pas de besoin spécifique
