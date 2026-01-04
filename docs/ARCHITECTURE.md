# Architecture: ReportFlow

**Dernière mise à jour**: 2026-01-03  
**Version**: 0.1.0  
**Feature Branch**: `001-hierarchical-reports`

## Vue d'ensemble

ReportFlow est une application web full-stack construite avec **Nuxt 4** et **Supabase** pour gérer un système de rapports hiérarchique avec workflow de validation multi-niveaux.

## Stack technique

### Frontend
- **Framework**: Nuxt 4.2.2
- **UI Library**: @nuxt/ui 4.3.0 (basé sur Tailwind CSS 4.1.18)
- **State Management**: Pinia 3.0.4 via @pinia/nuxt
- **Icons**: @iconify-json/heroicons, @iconify-json/lucide
- **Export**: xlsx 0.18.5 pour l'export Excel

### Backend
- **BaaS**: Supabase (PostgreSQL + Auth + RLS)
- **Module**: @nuxtjs/supabase 2.0.3
- **Client**: @supabase/supabase-js 2.89.0

### Développement
- **Package Manager**: pnpm
- **Language**: TypeScript
- **Compatibility Date**: 2025-07-15

## Structure du projet

```
ReportFlow/
├── app/                    # Application Nuxt (srcDir)
│   ├── components/         # Composants Vue réutilisables
│   ├── pages/              # Routes automatiques (file-based routing)
│   ├── composables/        # Composables Vue (useAuth, useQuestionnaire, etc.)
│   ├── stores/             # Stores Pinia (auth, admin, questionnaire)
│   ├── middleware/         # Middleware de navigation
│   ├── types/              # Types TypeScript
│   ├── utils/              # Utilitaires
│   └── assets/             # Assets statiques (CSS, images)
├── server/                 # API routes et server utilities
│   └── api/                # Endpoints API (si nécessaire)
├── public/                 # Fichiers statiques publics
├── tests/                  # Tests unitaires et d'intégration
├── specs/                  # Spécifications et documentation technique
│   └── 001-hierarchical-reports/
└── docs/                   # Documentation du projet
└── nuxt.config.ts          # Configuration Nuxt
```

## Architecture des données

### Base de données Supabase

Le système utilise 5 tables principales avec Row Level Security (RLS) pour la sécurité:

1. **profiles** - Profils utilisateurs avec hiérarchie
   - Clé primaire: `phone_number` (8 chiffres)
   - Relations: `supervised_by`, `managed_by` (self-reference)
   - RLS: Lecture (profil + subordonnés), Écriture (head_supervisor/manager uniquement)

2. **questionnaire_templates** - Modèles de questionnaires réutilisables
   - Structure tabulaire définie en JSONB (`table_definition`)
   - Créés par head_supervisor/manager

3. **assignments** - Assignations de questionnaires à des utilisateurs
   - Relation 1:1 avec `submissions`
   - Statut: assigned → submitted → approved/rejected

4. **submissions** - Rapports soumis (réponses aux questionnaires)
   - Réponses stockées en JSONB (`answers_data`)
   - Workflow: draft → submitted → approved/rejected

5. **validations** - Historique des décisions d'approbation/rejet
   - Trace complète avec commentaires
   - Relation many-to-one avec `submissions`

Voir `specs/001-hierarchical-reports/data-model.md` pour les détails complets.

## Authentification

- **Format d'identifiant**: `phone_number@role.or` (ex: `12345678@supervisor.or`)
- **Provider**: Supabase Auth
- **Vérification**: `is_active` dans `profiles` après authentification
- **Redirection**: `/login` → `/dashboard` après connexion

## Rôles et permissions

Hiérarchie stricte des rôles:
- **employee** → soumet des rapports
- **supervisor** → valide les rapports de son équipe
- **head_supervisor** → révision finale, peut rejeter
- **manager** → gestion complète (utilisateurs, templates, export)

Les permissions sont appliquées via:
- RLS policies Supabase (côté base de données)
- Middleware de navigation (côté application)
- Composables `usePermissions` (logique métier)

## Workflow de validation

```
Employee/Supervisor
  ↓ (soumet)
submitted
  ↓ (supervisor approuve)
approved
  ↓ (head_supervisor/manager peut rejeter)
rejected → retour à l'auteur
```

## État de l'implémentation

### Phase 1: Setup ✅
- Structure du projet créée
- Configuration Nuxt 4 avec modules
- Dépendances installées
- Variables d'environnement configurées

### Phase 2: Foundational ⏳
- Schéma de base de données à créer
- RLS policies à configurer
- Stores et composables de base à implémenter

### Phase 3-10: User Stories ⏳
- US1: Authentification (P1 - MVP)
- US2: Gestion utilisateurs (P1 - MVP)
- US3: Création modèles (P2)
- US4: Remplissage/Soumission (P1 - MVP)
- US5-8: Validation, édition, export (P2-P3)

Voir `specs/001-hierarchical-reports/tasks.md` pour le détail des tâches.

## Sécurité

- **RLS Policies**: Toutes les règles métier appliquées au niveau base de données
- **Validation côté serveur**: Toutes les opérations critiques validées via Supabase
- **Format phone_number**: Validation stricte (8 chiffres exactement)
- **Hiérarchie**: Respectée à tous les niveaux (profiles, assignments, validations)

## Performance

- **Indexes**: Optimisés pour les requêtes fréquentes (assignments, submissions, validations)
- **Lazy Loading**: Composants chargés à la demande
- **Code Splitting**: Automatique avec Nuxt 4

## Déploiement

Configuration prête pour:
- Vercel / Netlify (SSR/SSG)
- Supabase Hosting
- Docker (si nécessaire)

## Références

- Spécifications: `specs/001-hierarchical-reports/spec.md`
- Modèle de données: `specs/001-hierarchical-reports/data-model.md`
- Tâches: `specs/001-hierarchical-reports/tasks.md`
- Plan: `specs/001-hierarchical-reports/plan.md`
