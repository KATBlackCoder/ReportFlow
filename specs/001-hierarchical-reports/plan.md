# Implementation Plan: Système de Rapports Hiérarchique

**Branch**: `001-hierarchical-reports` | **Date**: 2026-01-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hierarchical-reports/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Système de rapports hiérarchique remplaçant un processus papier/Excel par une application Nuxt 4 avec Supabase. Le système implémente une chaîne de validation hiérarchique stricte (employee → supervisor → head_supervisor → manager) avec gestion centralisée des accès, création de questionnaires tabulaires, workflow de validation, et export Excel. Utilise exclusivement @nuxt/ui pour l'interface, @nuxtjs/supabase pour le backend, et Pinia pour la gestion d'état.

## Technical Context

**Language/Version**: TypeScript (Nuxt 4)  
**Primary Dependencies**: Nuxt 4, @nuxt/ui, @nuxtjs/supabase, @pinia/nuxt, Vue 3, xlsx (client-side Excel export)  
**Storage**: Supabase (PostgreSQL)  
**Testing**: @nuxt/test-utils, Vitest (conforme stack Nuxt 4)  
**Target Platform**: Web (Nuxt 4 application en mode universel SSR)  
**Project Type**: Web application (Nuxt 4 frontend + Supabase backend)  
**Performance Goals**: <5s authentification, <2s chargement questionnaires, <10min remplissage (50 champs), <30s export Excel (1000 rapports), 500 utilisateurs simultanés  
**Constraints**: Stack immuable (Nuxt 4, @nuxt/ui, Supabase, Pinia) - voir Constitution Principle I  
**Scale/Scope**: 500 utilisateurs simultanés, 4 rôles hiérarchiques, workflow de validation multi-niveaux, export Excel pour analyses hors ligne

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Stack Technique**: Verify compliance with ReportFlow Constitution:
- ✅ Frontend uses Nuxt 4 with `<script setup lang="ts">` and Composition API
- ✅ UI components use exclusively `@nuxt/ui` (no other component libraries)
- ✅ Backend/Database uses Supabase via `@nuxtjs/supabase` module only
- ✅ State management uses Pinia with `@pinia/nuxt` module only

**Règles Métier**: Verify compliance with business rules:
- ✅ Authentication follows `phone_number@role.or` format (8 digits)
- ✅ Role hierarchy respected: employee → supervisor → head_supervisor → manager
- ✅ User management permissions follow role hierarchy rules
- ✅ Questionnaire workflow follows validation rules (submitted → approved/rejected)
- ✅ Report editing rules respected (draft/submitted/rejected only, read-only when approved)
- ✅ Export functionality available for head_supervisor and manager roles
- ✅ Profile management rules respected (phone_number immutable except by head_supervisor/manager)

**Security**: All business rules MUST be enforced server-side via Supabase RLS policies.

## Project Structure

### Documentation (this feature)

```text
specs/001-hierarchical-reports/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

**Structure Decision**: Application Nuxt 4 standard avec structure de dossiers recommandée pour composants, pages, composables, stores, et utilitaires.

```text
app/
├── components/          # Composants Vue réutilisables (Nuxt UI)
├── pages/              # Routes de l'application
│   ├── login.vue       # Page d'authentification
│   ├── dashboard.vue   # Tableau de bord (vue conditionnelle par rôle)
│   ├── admin/
│   │   └── users.vue   # Gestion des utilisateurs (head_supervisor/manager)
│   ├── questionnaire/
│   │   └── [id]/
│   │       └── fill.vue # Remplissage de questionnaire
│   ├── validation.vue  # Dashboard validation (supervisor)
│   └── reports.vue     # Vue rapports avec filtres et export (head_supervisor/manager)
├── composables/        # Composables Nuxt réutilisables
│   ├── useAuth.ts      # Logique d'authentification
│   ├── usePermissions.ts # Utilitaires de permissions
│   └── useExcelExport.ts # Export Excel
├── stores/             # Stores Pinia
│   ├── auth.ts         # Store authentification (utilisateur, rôle, permissions)
│   ├── admin.ts        # Store administration (CRUD utilisateurs)
│   └── questionnaire.ts # Store questionnaires (cycle de vie des rapports)
├── utils/              # Utilitaires TypeScript
│   └── permissions.ts  # Fonctions de vérification des permissions
└── assets/
    └── css/
        └── main.css    # Styles globaux

server/
└── api/                # API routes Nuxt (si nécessaire, sinon utilisation directe Supabase)

tests/                  # Tests (structure à définir selon @nuxt/test-utils)
├── unit/
├── integration/
└── e2e/
```

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all choices align with Constitution principles.
