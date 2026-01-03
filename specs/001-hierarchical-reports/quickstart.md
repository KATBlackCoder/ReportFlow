# Quick Start Guide: Système de Rapports Hiérarchique

**Date**: 2026-01-03  
**Feature**: Système de Rapports Hiérarchique

## Prérequis

- Node.js 18+ et pnpm installés
- Compte Supabase (projet créé)
- Git configuré

## Installation

### 1. Cloner et installer les dépendances

```bash
# Installer les dépendances (si pas déjà fait)
pnpm install
```

### 2. Configurer Supabase

Créer un fichier `.env` à la racine du projet:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

**Note**: `SUPABASE_SERVICE_ROLE_KEY` est nécessaire pour les opérations admin (création de comptes utilisateurs).

### 3. Configuration Nuxt

Vérifier que `nuxt.config.ts` inclut les modules nécessaires:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  // ...
})
```

### 4. Créer le schéma de base de données

Exécuter les migrations SQL dans Supabase (Dashboard → SQL Editor):

Voir le schéma complet dans `data-model.md`. Les tables à créer:
- `profiles`
- `questionnaire_templates`
- `assignments`
- `submissions`
- `validations`

**Important**: Configurer les RLS policies pour chaque table (voir `data-model.md` pour les détails).

### 5. Installer les dépendances manquantes

```bash
# Ajouter les modules Nuxt nécessaires
pnpm add @nuxtjs/supabase @pinia/nuxt pinia

# Ajouter xlsx pour l'export Excel
pnpm add xlsx
pnpm add -D @types/xlsx
```

## Structure des Fichiers de Base

### Stores Pinia

Créer les stores dans `app/stores/`:

```typescript
// app/stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  // État et actions
  return {
    user,
    // ...
  }
})

// app/stores/admin.ts
export const useAdminStore = defineStore('admin', () => {
  // ...
})

// app/stores/questionnaire.ts
export const useQuestionnaireStore = defineStore('questionnaire', () => {
  // ...
})
```

### Composables

Créer les composables dans `app/composables/`:

```typescript
// app/composables/usePermissions.ts
export const usePermissions = () => {
  const canEditSubmission = (currentUser: Profile, submission: Submission): boolean => {
    // Logique de permissions
  }
  
  return { canEditSubmission }
}
```

### Pages

Structure des pages dans `app/pages/`:

```
app/pages/
├── login.vue           # Authentification
├── dashboard.vue       # Tableau de bord (vue conditionnelle par rôle)
├── admin/
│   └── users.vue      # Gestion utilisateurs
├── questionnaire/
│   └── [id]/
│       └── fill.vue   # Remplissage questionnaire
├── validation.vue      # Dashboard validation (supervisor)
└── reports.vue         # Vue rapports avec filtres/export
```

## Démarrage en Développement

```bash
# Démarrer le serveur de développement
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`

## Workflow de Développement

### 1. Créer un compte administrateur (première fois)

Utiliser le Supabase Dashboard → Authentication → Users → Add User, ou créer un script d'initialisation pour créer le premier `head_supervisor` ou `manager`.

**Note**: Pour le développement, on peut créer manuellement un utilisateur dans Supabase avec email `12345678@manager.or` et l'insérer dans la table `profiles`.

### 2. Tester l'authentification

1. Se connecter avec `phone_number@role.or` et le mot de passe
2. Vérifier la redirection vers le dashboard approprié selon le rôle

### 3. Créer des utilisateurs de test

Via l'interface admin (`/admin/users`) ou directement dans Supabase pour les tests.

### 4. Tester le workflow complet

1. Créer un template de questionnaire
2. Assigner à un employee
3. Remplir et soumettre le questionnaire
4. Valider/rejeter via supervisor
5. Voir dans la vue rapports (head_supervisor/manager)
6. Tester l'export Excel

## Commandes Utiles

```bash
# Développement
pnpm dev

# Build production
pnpm build

# Preview production
pnpm preview

# Type checking
pnpm typecheck  # Si configuré

# Linting
pnpm lint  # Si configuré
```

## Tests

### Configuration des tests

Installer `@nuxt/test-utils` et `vitest`:

```bash
pnpm add -D @nuxt/test-utils vitest
```

### Structure des tests

```
tests/
├── unit/
│   ├── stores/
│   ├── composables/
│   └── utils/
├── integration/
│   └── api/
└── e2e/
```

## Points d'Attention

### RLS Policies

Les RLS policies sont **critiques** pour la sécurité. Tester régulièrement que:
- Les utilisateurs ne voient que leurs données autorisées
- Les règles hiérarchiques sont respectées
- Les permissions d'écriture sont correctes

### Format d'Authentification

Le format `phone_number@role.or` est **obligatoire** (Constitution). Ne pas utiliser d'autres formats.

### Stack Technique

Respecter strictement le stack imposé:
- Nuxt 4 (pas Nuxt 3)
- @nuxt/ui uniquement (pas d'autres bibliothèques UI)
- Supabase via @nuxtjs/supabase uniquement
- Pinia uniquement (pas Vuex)

### Performance

- Tester avec 500 utilisateurs simultanés (objectif)
- Optimiser les requêtes Supabase (indexes, select précis)
- Export Excel côté client pour éviter la charge serveur

## Prochaines Étapes

1. Implémenter les stores Pinia (auth, admin, questionnaire)
2. Créer les composables (usePermissions, useExcelExport)
3. Développer les pages dans l'ordre de priorité (login → dashboard → admin → questionnaires)
4. Configurer les RLS policies dans Supabase
5. Implémenter les tests unitaires et d'intégration

## Références

- [Plan d'implémentation](./plan.md)
- [Modèle de données](./data-model.md)
- [Contrats API](./contracts/api-contracts.md)
- [Recherche technique](./research.md)
- [Spécification](./spec.md)
