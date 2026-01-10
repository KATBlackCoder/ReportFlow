---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: ["prd.md", "product-brief-ReportFlow-2026-01-08.md", "brainstorming-session-2026-01-06.md"]
workflowType: 'architecture'
project_name: 'ReportFlow'
user_name: 'Blackat'
date: '2026-01-08'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
ReportFlow nécessite une architecture supportant 60 exigences fonctionnelles organisées autour d'un workflow hiérarchique de collecte et validation de données terrain. Les exigences clés incluent :

- Interface tableau style Excel avec saisie en masse via copier-coller CSV
- Workflow de validation hiérarchique (Employé → Superviseur → Chef/Manager)
- Rejet granulaire (lignes/colonnes spécifiques) pour corrections ciblées
- Permissions différenciées par rôle avec analytics spécialisées
- Tri/filtres/recherche avancés pour analyse de données
- Export Excel/CSV pour intégration avec outils existants
- Notifications en temps réel pour workflow de validation

**Non-Functional Requirements:**
19 exigences non-fonctionnelles définissent des contraintes strictes de performance, sécurité et accessibilité :

- Performance : chargement < 3s, traitement CSV < 1s pour 50+ lignes
- Sécurité : authentification JWT, chiffrement des données, protection XSS/CSRF
- Accessibilité : conformité WCAG 2.1 AA, navigation clavier complète
- Scalabilité : support 100 utilisateurs simultanés, 1000 rapports/jour
- Fiabilité : 99% uptime, sauvegarde automatique toutes les 4h

### Technical Constraints & Dependencies

**Platform Requirements:**
- Application web moderne (SPA/PWA) avec interface responsive
- Support navigateurs modernes (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Interface hybride mobile + desktop optimisée pour workflow terrain → bureau
- Base de données relationnelle (PostgreSQL recommandé) pour relations complexes

**Integration Points:**
- Format CSV standardisé (`", "` pour colonnes, `";"` pour lignes)
- Export Excel/CSV compatible avec outils existants
- API RESTful avec potentiel GraphQL pour requêtes complexes

**Security Constraints:**
- Authentification par rôle (Employé, Superviseur, Chef superviseur, Manager)
- Chiffrement des données sensibles en transit et au repos
- Conformité aux standards de confidentialité des données personnelles

### Scale & Complexity Assessment

**Project Scale:**
- Complexité : moyenne-élevée (application métier avec workflow hiérarchique complexe)
- Portée : MVP avec 7 fonctionnalités core, vision Phase 2-3 pour extensions avancées
- Utilisation : 100+ utilisateurs simultanés attendus, 1000+ rapports/jour

- Domaine technique : web_app (SPA/PWA responsive)
- Complexité technique : modérée avec focus performance mobile et traitement données massives

**Technical Domain:** web_app
**Complexity Level:** medium-high
**Estimated Architectural Components:**
- Frontend : Interface tableau interactive, gestion état complexe
- Backend : API de validation hiérarchique, traitement données CSV
- Base de données : Modèle relationnel pour questionnaires/rapports/permissions
- Infrastructure : Cache, monitoring, sécurité

### Cross-Cutting Concerns Identified

**Performance & Scalability:**
- Traitement CSV en temps réel pour 50+ lignes (< 1s)
- Interface responsive optimisée pour mobile (terrain) et desktop (bureau)
- Cache stratégique pour questionnaires fréquemment utilisés
- Architecture modulaire pour évolution future

**Security & Compliance:**
- Autorisation basée sur rôles avec principe moindre privilège
- Chiffrement des données sensibles
- Journalisation pour audit et traçabilité
- Conformité WCAG 2.1 AA pour accessibilité

**Data Management:**
- Validation stricte des données en temps réel
- Gestion des relations hiérarchiques complexes
- Archivage automatique des anciens rapports
- Export flexible avec filtres appliqués

**User Experience:**
- Interface familière style Excel pour adoption facile
- Workflow de validation optimisé (2 niveaux vs 3 traditionnels)
- Notifications contextuelles pour actions requises
- Correction granulaire sans refaire travail valide

## Starter Template Evaluation

### Primary Technology Domain

**Web application** based on project requirements analysis - Vue.js/Nuxt ecosystem selected for superior developer experience and ecosystem maturity for data-intensive applications.

### Starter Options Considered

**Nuxt.js Stack Analysis:**

1. **Nuxt 4 + NuxtHub + Nuxt UI v4 + nuxt-auth-utils**
   - **Source:** Official Nuxt ecosystem (nuxt.com, hub.nuxt.com, ui.nuxt.com, github.com/atinux/nuxt-auth-utils)
   - **Technologies:** Nuxt 4, Vue 3, TypeScript, Nuxt UI v4 (100+ composants unifiés), NuxtHub (Database/Storage/Cache), nuxt-auth-utils
   - **Maintenance Status:** Actively maintained by Nuxt team and community
   - **Benchmark Score:** High (latest stable versions)

2. **Alternative: Custom Nuxt 4 Setup**
   - **Technologies:** Nuxt 4, Vue 3, TypeScript, Tailwind CSS, custom components, Drizzle ORM, nuxt-auth-utils
   - **Flexibility:** Maximum control over architecture decisions
   - **Setup Complexity:** Higher initial configuration required

### Selected Starter: Nuxt 4 + NuxtHub + Nuxt UI v4 + nuxt-auth-utils

**Rationale for Selection:**
Cette stack Nuxt 4 moderne a été sélectionnée pour sa parfaite adéquation avec les exigences de ReportFlow :

- **Nuxt 4** : Version stable la plus récente avec performances optimisées et nouveaux patterns
- **Nuxt UI v4** : 100+ composants unifiés (Nuxt UI + Nuxt UI Pro désormais gratuits), accessibles avec Tailwind CSS, parfaits pour les tableaux de données complexes
- **NuxtHub** : Base de données SQL avec Drizzle ORM, stockage Blob/KV/Cache intégré, déploiement multi-cloud sans vendor lock-in
- **nuxt-auth-utils** : Authentification sécurisée avec sessions cookies scellés, idéale pour le système de rôles hiérarchiques
- **Performance** : Nuxt 4 offre des performances exceptionnelles pour les applications data-intensive
- **Developer Experience** : Écosystème Vue.js moderne avec TypeScript complet et tooling avancé

**Initialization Command:**

```bash
pnpm dlx nuxi@latest init reportflow
cd reportflow
pnpm install
pnpm add @nuxt/ui @nuxthub/core @nuxtjs/color-mode nuxt-auth-utils drizzle-orm @tanstack/vue-table
pnpm add -D @nuxt/devtools
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript activé par défaut avec configuration stricte
- Vue 3 Composition API avec `<script setup>` syntax et Nuxt 4 patterns
- Auto-imports pour composants et fonctions Nuxt

**Styling Solution:**
- Nuxt UI v4 avec Tailwind CSS intégré
- Système de design sémantique (primary, secondary, success, etc.)
- Mode sombre/clair intégré
- Variables CSS pour personnalisation runtime

**Build Tooling:**
- Vite pour le développement (HMR ultra-rapide)
- Nitro engine pour le server-side rendering
- Configuration zero pour optimisation production

**Database & Storage:**
- NuxtHub Database : PostgreSQL avec Drizzle ORM type-safe
- NuxtHub Blob : Stockage de fichiers avec validation automatique
- NuxtHub KV : Cache et sessions distribué globalement
- Migrations automatisées et type-safety

**Authentication & Security:**
- nuxt-auth-utils : Sessions sécurisées avec cookies scellés
- Support multi-providers (credentials, OAuth, etc.)
- Protection CSRF et rate limiting intégré

**Code Organization:**
- Structure Nuxt 4 moderne avec dossier `app/` pour les routes et layouts
- Server API routes avec auto-imports
- Modules Nuxt pour fonctionnalités extensibles

**Development Experience:**
- Nuxt DevTools intégré pour debugging et monitoring
- Hot reload pour développement fluide
- TypeScript avec auto-complétion complète
- ESLint et Prettier pré-configurés

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- ✅ Data Architecture: Modèle hybride avec JSON pour flexibilité des corrections granulaires et composants par type
- 🔄 Authentication & Security: Configuration rôles hiérarchiques Employé/Superviseur/Chef/Manager
- 🔄 API & Communication: Patterns RESTful avec validation côté serveur
- 🔄 Frontend Architecture: Gestion d'état avec Pinia + composition stores
- 🔄 Infrastructure & Deployment: NuxtHub pour déploiement multi-cloud

**Important Decisions (Shape Architecture):**
- 🔄 Error Handling: Gestion d'erreurs contextuelles en français
- 🔄 Performance: Cache stratégique et lazy loading
- 🔄 Accessibility: Conformité WCAG 2.1 AA avec navigation clavier

**Deferred Decisions (Post-MVP):**
- Analytics avancées et tableaux de bord
- Export vers formats multiples (PDF, Excel)
- APIs tierces et intégrations

### Data Architecture

**Database Choice:** PostgreSQL via NuxtHub Database
**ORM:** Drizzle ORM avec type-safety complète
**Modeling Approach:** Hybride relationnel + JSON

**Data Model - Hybrid Approach Selected:**
```sql
-- Tables relationnelles pour l'intégrité
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL,
  title TEXT NOT NULL,
  structure_json JSONB NOT NULL, -- Structure des colonnes/champs avec types
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rapports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_id UUID REFERENCES questionnaires(id),
  employee_id UUID NOT NULL,
  status TEXT DEFAULT 'draft',
  current_version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rapport_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rapport_id UUID REFERENCES rapports(id),
  version INTEGER NOT NULL,
  data_json JSONB NOT NULL, -- Données actuelles
  corrections_json JSONB, -- Historique des corrections granulaires
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rapport_id UUID REFERENCES rapports(id),
  validator_id UUID NOT NULL,
  validator_role TEXT NOT NULL,
  status TEXT NOT NULL, -- 'approved', 'rejected', 'corrections_needed'
  comments TEXT,
  validated_at TIMESTAMP DEFAULT NOW()
);
```

**Rationale:** Le modèle hybride offre la flexibilité nécessaire pour les corrections granulaires et les composants par type (TextForm, NumberForm, etc.) tout en maintenant l'intégrité relationnelle pour l'audit et les analytics.

**Component Integration:**
- Structure JSON permet définition dynamique des champs par type
- Corrections JSON facilitent le tracking granulaire des modifications
- Composants spécialisés (TextForm, NumberForm) peuvent être rendus dynamiquement
- Validation côté composant alignée avec structure JSON du questionnaire

### Authentication & Security

**Authentication Method:** nuxt-auth-utils avec sessions sécurisées
**Authorization Patterns:** Role-Based Access Control (RBAC) avec middleware
**User Management:** CRUD utilisateurs réservé aux Chefs superviseurs/Managers uniquement

**Role Configuration:**
- **Employé**:
  - CRUD sur ses propres rapports uniquement
  - Lecture de ses questionnaires assignés
  - Pas d'accès aux autres utilisateurs

- **Superviseur**:
  - CRUD sur les rapports de son équipe + personnels
  - Validation/rejet des rapports employés
  - Lecture des statistiques équipe
  - Pas d'accès gestion utilisateurs

- **Chef superviseur/Manager**:
  - ✅ CRUD complet sur TOUS les utilisateurs (création comptes, modification rôles, désactivation)
  - ✅ Gestion des questionnaires (CRUD)
  - ✅ Validation finale et export global
  - ✅ Analytics et statistiques complètes
  - ✅ Gestion des équipes temporaires

**Security Implementation:**
```typescript
// middleware/admin-only.ts
export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth()

  if (!user.value || user.value.role !== 'manager') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Accès réservé aux Chefs superviseurs/Managers'
    })
  }
})

// server/api/users/index.post.ts - Création utilisateur (Manager uniquement)
import { requireAuth } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event, ['manager'])

  // Logique création utilisateur
  const newUser = await createUser(event.context.body)
  return newUser
})
```

**Rationale:** Authentification centralisée permet contrôle total des rôles et permissions, essentiel pour workflow hiérarchique où seuls les managers gèrent les utilisateurs.

### API & Communication Patterns

**API Design:** Server Routes Nuxt traditionnelles
**Documentation:** Auto-générée via Nuxt DevTools
**Error Handling:** Gestion d'erreurs structurée avec codes HTTP appropriés

**API Structure:**
```
server/api/
├── questionnaires/
│   ├── index.get.ts      # Liste questionnaires (par rôle)
│   ├── [id].get.ts       # Détails questionnaire
│   └── index.post.ts     # Créer questionnaire (chefs/managers)
├── rapports/
│   ├── index.get.ts      # Liste rapports (filtrée par rôle)
│   ├── [id]/
│   │   ├── index.get.ts  # Détails rapport
│   │   ├── submit.post.ts # Soumettre rapport
│   │   └── validate.post.ts # Valider/rejeter
│   └── corrections/
│       └── [id].post.ts  # Appliquer corrections
├── users/
│   ├── index.get.ts      # Liste utilisateurs (managers uniquement)
│   ├── index.post.ts     # Créer utilisateur (managers uniquement)
│   └── [id]/
│       ├── index.get.ts  # Détails utilisateur
│       ├── index.put.ts  # Modifier utilisateur
│       └── index.delete.ts # Supprimer utilisateur
```

**Error Response Format:**
```typescript
interface ApiError {
  code: string
  message: string
  details?: any
  field?: string
}
```

**Rationale:** Server routes traditionnelles offrent type-safety native et intégration parfaite avec Nuxt, essentielles pour maintenir la cohérence entre les agents d'implémentation.

### Frontend Architecture

**State Management:** Pinia stores avec composition API
**Component Architecture:** Vue 3 Composition API avec `<script setup lang="ts">`
**Routing:** Nuxt 4 app/ directory avec middleware d'authentification

**Store Structure:**
```
stores/
├── auth.ts           # Gestion authentification et rôles
├── questionnaires.ts # CRUD questionnaires (managers)
├── rapports.ts       # Gestion rapports et validations
├── corrections.ts    # Historique corrections granulaires
├── ui.ts            # État UI global (modals, notifications)
├── users.ts         # Gestion utilisateurs (managers uniquement)
```

**Store Example - Rapports Management:**
```typescript
// stores/rapports.ts
export const useRapportsStore = defineStore('rapports', () => {
  const rapports = ref<Rapport[]>([])
  const currentRapport = ref<Rapport | null>(null)
  const corrections = ref<CorrectionGranulaire[]>([])

  const submitRapport = async (data: RapportData) => {
    const result = await $fetch('/api/rapports', {
      method: 'POST',
      body: data
    })
    rapports.value.push(result)
  }

  const applyCorrection = async (correction: CorrectionGranulaire) => {
    await $fetch(`/api/corrections/${currentRapport.value?.id}`, {
      method: 'POST',
      body: correction
    })
    corrections.value.push(correction)
  }

  return {
    rapports,
    currentRapport,
    corrections,
    submitRapport,
    applyCorrection
  }
})
```

**Component Patterns - Composants par type:**
```vue
<!-- components/forms/TextForm.vue -->
<script setup lang="ts">
interface Props {
  field: FieldConfig
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { updateField } = useRapportsStore()
</script>

<template>
  <UFormGroup :label="field.label" :required="field.required">
    <UInput
      v-model="localValue"
      :type="field.type"
      @blur="updateField(field.id, localValue)"
    />
  </UFormGroup>
</template>
```

**Rationale:** Pinia offre type-safety parfaite et état partagé essentiel pour le workflow hiérarchique complexe, avec composition API moderne alignée sur vos composants spécialisés par type.

### Infrastructure & Deployment

**Hosting Strategy:** NuxtHub Full-Stack avec multi-vendor deployment
**Database:** PostgreSQL intégré avec Drizzle ORM type-safe
**Storage:** NuxtHub Blob (fichiers/images), KV (sessions/cache), Cache (API responses)
**CI/CD Pipeline:** NuxtHub preview deployments automatiques
**Environment Configuration:** Runtime config Nuxt avec variables d'environnement

**NuxtHub Features Analysis ([hub.nuxt.com](https://hub.nuxt.com/)):**

**Database (SQL avec Drizzle ORM) :**
```typescript
import { eq, desc } from 'drizzle-orm'
import { db, schema } from 'hub:db'

// Requêtes type-safe automatiques
const rapports = await db.query.rapports.findMany({
  where: eq(schema.rapports.status, 'pending'),
  orderBy: [desc(schema.rapports.createdAt)]
})

// Insert avec inférence automatique
await db.insert(schema.rapports).values({
  questionnaireId: questionnaire.id,
  employeeId: user.id,
  data: rapportData
})
```

**Blob Storage (Fichiers) :**
```typescript
import { blob } from 'hub:blob'

// Validation et upload sécurisé
ensureBlob(fileData, { maxSize: '10MB', types: ['application/pdf'] })
await blob.put('exports/rapport-123.pdf', fileData, { access: 'private' })

// Streaming pour exports Excel
return blob.serve(event, 'exports/rapport-123.xlsx')
```

**KV Storage (Cache/Sessions) :**
```typescript
import { kv } from 'hub:kv'

// Sessions utilisateur avec TTL
await kv.set(`user:${userId}:session`, sessionData, { ttl: 3600 })

// Cache statistiques équipe
await kv.set('stats:superviseur-123', statsData, { ttl: 300 })
```

**Cache API :**
```typescript
// Cache automatique des réponses API
export default defineCachedEventHandler(async () => {
  const rapports = await db.query.rapports.findMany()
  return rapports
}, { maxAge: 60 * 5 }) // 5 minutes cache
```

**Deployment Configuration Multi-Vendor ([hub.nuxt.com/docs/database](https://hub.nuxt.com/docs/database)) :**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  hub: {
    db: 'postgresql',  // Dialect SQL pour Drizzle ORM
    blob: true,        // Stockage fichiers avec validation
    kv: true,          // Cache global haute performance
    cache: true        // Cache Edge pour APIs
  },

  // Déploiement sans vendor lock-in
  nitro: {
    preset: 'cloudflare-pages' // ou 'vercel-edge', 'netlify-edge', etc.
  },

  // Configuration runtime
  runtimeConfig: {
    logLevel: process.env.LOG_LEVEL || 'info'
  }
})
```

**Configuration Database Drizzle ([hub.nuxt.com/docs/database](https://hub.nuxt.com/docs/database)) :**
```typescript
// server/db/schema.ts - Schéma type-safe
import { pgTable, text, serial, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const questionnaires = pgTable('questionnaires', {
  id: serial().primaryKey(),
  title: text().notNull(),
  structureJson: jsonb().notNull(), // Structure champs avec types
  creatorId: text().notNull(),
  status: text().default('active'),
  createdAt: timestamp().notNull().defaultNow(),
})

export const rapports = pgTable('rapports', {
  id: serial().primaryKey(),
  questionnaireId: serial().references(() => questionnaires.id),
  employeeId: text().notNull(),
  status: text().default('draft'),
  currentVersion: serial().default(1),
  createdAt: timestamp().notNull().defaultNow(),
})

// Génération migrations automatique
// npx nuxt db generate
```

**Avantages NuxtHub pour ReportFlow :**
- ✅ **Zero vendor lock-in** : Déploiement flexible multi-cloud
- ✅ **Type-safety complète** : Drizzle ORM intégré
- ✅ **Performance optimisée** : Cache Edge et KV global
- ✅ **DevTools intégrés** : Debugging et monitoring complets
- ✅ **Scaling automatique** : Gestion charge sans configuration
- ✅ **Sécurité fichiers** : Validation automatique et contrôle accès

**Rationale:** NuxtHub fournit exactement ce dont ReportFlow a besoin - database relationnelle, stockage fichiers, cache haute performance, et déploiement flexible sans être lié à un seul fournisseur cloud.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
15+ areas où les agents IA pourraient faire des choix différents ont été identifiées et standardisées.

### Naming Patterns

**Database Naming Conventions (PostgreSQL + Drizzle) :**
- Tables : `snake_case` pluriel → `users`, `rapports`, `questionnaires`
- Colonnes : `snake_case` → `user_id`, `created_at`, `status`, `structure_json`
- Clés étrangères : `table_id` → `supervisor_id`, `questionnaire_id`
- Index : `idx_table_column` → `idx_rapports_status`

**API Naming Conventions (Server Routes Nuxt) :**
- Endpoints : Pluriel REST → `/api/rapports`, `/api/users`
- Paramètres : `:id` → `/api/rapports/:id/submit`
- Query params : `camelCase` → `?status=pending&page=1`

**Code Naming Conventions (TypeScript/Vue) :**
- Composants : `PascalCase` → `UserCard.vue`, `RapportForm.vue`
- Fichiers : `kebab-case` → `user-card.vue`, `rapport-form.vue`
- Variables/Fonctions : `camelCase` → `getUserData()`, `formatRapport`
- Stores : `camelCase` → `useRapportsStore()`, `useAuthStore()`

### Structure Patterns

**Project Organization (Nuxt 4 + Nuxt UI v4) :**
```
# Racine projet (Nuxt 4)
reportflow/
├── package.json              # Dépendances + scripts
├── nuxt.config.ts           # Config NuxtHub + Nuxt UI v4
├── tailwind.config.ts       # Config Tailwind CSS v4
├── app.config.ts            # Config Nuxt UI v4 (thème)
├── tsconfig.json            # Config TypeScript
├── .env.example             # Variables environnement
└── README.md                # Documentation

# Structure app/ (routage Nuxt 4)
app/
├── app.vue                  # Application principale (racine)
├── page.vue                 # Page d'accueil (route /)
├── globals.css              # Styles + Nuxt UI v4
├── layout.vue               # Layout principal
├── error.vue                # Page erreur (UError)
└── pages/                   # Routage file-based
    ├── auth/
    │   ├── login/
    │   │   └── page.vue     # Connexion (UAuthForm)
    │   └── logout/
    │       └── page.vue     # Déconnexion
    ├── dashboard/
    │   ├── page.vue         # Dashboard (rédirection par rôle)
    │   ├── employee/
    │   │   └── page.vue     # Dashboard employé (UDashboard*)
    │   ├── supervisor/
    │   │   └── page.vue     # Dashboard superviseur
    │   └── manager/
    │       └── page.vue     # Dashboard manager
    ├── questionnaires/
    │   ├── page.vue         # Liste (UDataTable filtrée)
    │   ├── create/
    │   │   └── page.vue     # Création (UForm)
    │   └── [id]/
    │       ├── page.vue     # Vue détail
    │       └── edit/
    │           └── page.vue  # Édition (managers)
    ├── rapports/
    │   ├── page.vue         # Liste rapports (filtrée par rôle)
    │   ├── create/
    │   │   └── page.vue     # Création (paste CSV)
    │   └── [id]/
    │       ├── page.vue     # Vue détail rapport
    │       ├── edit/
    │       │   └── page.vue # Corrections granulaires
    │       └── validate/
    │           └── page.vue  # Validation/rejet
    └── admin/
        └── users/
            ├── page.vue     # Gestion utilisateurs (managers)
            ├── create/
            │   └── page.vue # Créer utilisateur
            └── [id]/
                └── edit/
                    └── page.vue # Modifier utilisateur

# API Routes (server/)
server/
├── api/
│   ├── auth/
│   │   ├── login.post.ts    # Connexion
│   │   └── logout.post.ts   # Déconnexion
│   ├── users/
│   │   ├── index.get.ts     # Liste (RBAC)
│   │   ├── index.post.ts    # Créer (managers)
│   │   └── [id]/
│   │       ├── index.get.ts # Détails
│   │       ├── index.put.ts # Modifier (managers)
│   │       └── index.delete.ts # Supprimer (managers)
│   ├── questionnaires/
│   │   ├── index.get.ts     # Liste filtrée
│   │   ├── index.post.ts    # Créer (managers)
│   │   └── [id]/
│   │       ├── index.get.ts # Détails
│   │       ├── index.put.ts # Modifier (managers)
│   │       └── index.delete.ts # Supprimer (managers)
│   ├── rapports/
│   │   ├── index.get.ts     # Liste filtrée
│   │   ├── index.post.ts    # Créer (employés)
│   │   └── [id]/
│   │       ├── index.get.ts # Détails
│   │       ├── corrections/
│   │       │   └── index.post.ts # Corrections granulaires
│   │       ├── submit/
│   │       │   └── index.post.ts # Soumettre
│   │       └── validate/
│   │           └── index.post.ts # Valider/rejeter
│   └── exports/
│       └── [id]/
│           └── index.get.ts  # Export Excel (managers)
└── db/
    ├── schema.ts            # Schéma Drizzle (type-safe)
    └── migrations/          # Auto-générées

# Composants (auto-importés)
components/
├── forms/                  # Composants spécialisés
│   ├── TextForm.vue        # UInput avec validation
│   ├── NumberForm.vue      # UInput type="number"
│   ├── TextareaForm.vue    # UTextarea
│   ├── DateForm.vue        # UCalendar
│   └── SelectForm.vue      # USelect
├── ui/                     # Extensions Nuxt UI v4
│   ├── DataTable.vue       # UTable + tri/filtres
│   ├── StatusBadge.vue     # UBadge statuts
│   ├── RapportCard.vue     # UCard rapports
│   └── ValidationModal.vue # UModal validation
├── layouts/                # Layouts auto-importés
│   ├── DashboardLayout.vue # UDashboard* components
│   └── AuthLayout.vue      # Layout auth
└── features/               # Composants complexes
    ├── RapportsList.vue    # Liste avec filtres avancés
    ├── QuestionnaireForm.vue # Formulaire création
    └── UserManagement.vue  # Gestion utilisateurs

# Stores Pinia (auto-importés)
stores/
├── auth.ts                 # Auth + rôles
├── users.ts                # CRUD utilisateurs (RBAC)
├── questionnaires.ts       # Gestion questionnaires
├── rapports.ts             # CRUD rapports + corrections
├── corrections.ts          # Historique corrections
└── ui.ts                   # État UI global

# Composables (auto-importés)
composables/
├── useAuth.ts              # Wrapper nuxt-auth-utils
├── usePermissions.ts       # Logique rôles
├── useRapports.ts          # CRUD rapports
├── useCsvParser.ts         # Parsing CSV intelligent
└── useValidation.ts        # Validation formulaires

# Types TypeScript
types/
├── api.ts                  # Types API responses
├── db.ts                   # Types Drizzle générés
├── forms.ts                # Types composants
├── auth.ts                 # Types auth + rôles
└── index.ts                # Exports

# Utilitaires (auto-importés)
utils/
├── auth.ts                 # Utils authentification
├── validation.ts           # Règles validation
├── formats.ts              # Formats dates/données
├── permissions.ts          # Logique permissions
└── csv.ts                  # Utils CSV

# Tests (Nuxt 4 + Vitest)
tests/
├── unit/                   # Tests unitaires
│   ├── components/
│   ├── composables/
│   └── stores/
├── integration/            # Tests API
│   ├── auth.test.ts
│   └── rapports.test.ts
└── e2e/                    # Tests end-to-end
    ├── workflow.spec.ts    # Workflow complet
    └── export.spec.ts      # Export Excel
```

### Format Patterns

**API Response Formats:**
```typescript
// ✅ Standardisé - Succès
{
  data: rapportData,
  success: true
}

// ✅ Standardisé - Erreur
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Données invalides',
    details: { field: 'email', reason: 'Format invalide' }
  }
}
```

**Data Exchange Formats:**
- JSON fields : `camelCase` pour APIs, `snake_case` pour DB (mapping automatique Drizzle)
- Dates : ISO strings `"2024-01-08T10:30:00Z"` en JSON, timestamps en DB
- Arrays : Format consistant pour données répétitives

### Communication Patterns

**Event System Patterns:**
- Événements : `resource.action` → `rapport.submitted`, `user.created`
- Payloads : Structure typée avec TypeScript
- Gestion : Async avec error handling

**State Management Patterns (Pinia) :**
```typescript
// Actions naming
const fetchRapports = async () => { /* ... */ }
const submitRapport = async (data) => { /* ... */ }
const validateRapport = async (id, status) => { /* ... */ }

// Loading states
{
  loading: { fetchRapports: false, submitRapport: true },
  error: { submitRapport: null },
  data: rapportData
}
```

### Process Patterns

**Error Handling Patterns:**
```typescript
// Gestion centralisée dans stores
try {
  await submitRapport(data)
} catch (err) {
  // Erreur propagée au composant
  console.error('[RapportsStore]', 'Erreur soumission:', err)
}
```

**Loading State Patterns:**
- Pattern uniforme : `{ loading, error, data }`
- Propagation du state aux composants
- Reset automatique des erreurs

### Enforcement Guidelines

**All AI Agents MUST:**

1. **Suivre les conventions de nommage** définies ci-dessus
2. **Utiliser la structure de projet** standardisée
3. **Implémenter les formats API** consistants
4. **Gérer les erreurs** selon les patterns définis
5. **Maintenir la séparation des rôles** dans toute l'application
6. **Utiliser les stores Pinia** pour la gestion d'état
7. **Respecter les patterns de composants** par type
8. **Générer les migrations DB** avec `npx nuxt db generate`

**Pattern Enforcement:**
- Revue de code pour vérifier la conformité
- Documentation automatique des violations
- Processus de mise à jour des patterns si nécessaire

### Pattern Examples

**Good Examples:**
```typescript
// ✅ Bonne structure API
server/api/rapports/index.get.ts
server/api/rapports/[id]/submit.post.ts

// ✅ Bon naming composant
components/forms/TextForm.vue
components/ui/DataTable.vue

// ✅ Bonne structure store
stores/useRapportsStore.ts
```

**Anti-Patterns:**
```typescript
// ❌ Mauvaise structure
server/api/get-reports.ts
server/api/report-submit.ts

// ❌ Mauvais naming
components/text-form.vue
components/data_table.vue
```

Ces patterns garantissent que tous les agents d'IA produisent du code cohérent et que l'application ReportFlow peut être développée efficacement par équipe ou par IA sans conflits d'architecture.

### Requirements to Structure Mapping

**Workflow Employé (Saisie + Corrections) :**
- **Saisie initiale** : `app/rapports/create/page.vue` + `components/forms/*Form.vue` + `composables/useCsvParser.ts`
- **Soumission** : `server/api/rapports/[id]/submit/index.post.ts` + `stores/rapports.ts`
- **Corrections granulaires** : `app/rapports/[id]/edit/page.vue` + `stores/corrections.ts`
- **Notifications** : `composables/useAuth.ts` + WebSocket ou polling

**Workflow Superviseur (Validation + Statistiques) :**
- **Dashboard statistiques** : `app/dashboard/supervisor/page.vue` + `components/ui/DataTable.vue`
- **Validation/rejet** : `app/rapports/[id]/validate/page.vue` + `server/api/rapports/[id]/validate/index.post.ts`
- **Filtrage équipe** : `stores/rapports.ts` avec logique permissions

**Workflow Manager (Création + Global) :**
- **Gestion questionnaires** : `app/questionnaires/` + `server/api/questionnaires/`
- **Gestion utilisateurs** : `app/admin/users/` + `server/api/users/` (RBAC strict)
- **Exports globaux** : `server/api/exports/[id]/index.get.ts`
- **Vue d'ensemble** : `app/dashboard/manager/page.vue` + analytics avancées

**Sécurité et Authentification :**
- **Middleware rôles** : `middleware/auth.ts` + `composables/usePermissions.ts`
- **Sessions sécurisées** : `nuxt-auth-utils` avec cookies scellés
- **RBAC strict** : Managers uniquement pour CRUD utilisateurs

**Performance et UX :**
- **Interface responsive** : Nuxt UI v4 + Tailwind CSS v4
- **Cache intelligent** : NuxtHub KV + Cache API responses
- **Validation temps réel** : `composables/useValidation.ts` côté client
- **Feedback immédiat** : États loading dans tous les stores Pinia

### Architecture Benefits Summary

✅ **Type-Safety Complet** : TypeScript + Drizzle ORM + Nuxt 4
✅ **Performance Optimisée** : Nuxt 4 SSR + NuxtHub edge caching
✅ **Sécurité Renforcée** : RBAC strict + nuxt-auth-utils + validation côté serveur
✅ **UX Exceptionnelle** : Nuxt UI v4 (125+ composants) + composants spécialisés
✅ **Maintenabilité** : Structure claire + patterns consistants + auto-imports
✅ **Évolutivité** : Architecture modulaire + NuxtHub multi-cloud
✅ **Développement Accéléré** : Nuxt DevTools + patterns établis + auto-imports

Cette architecture positionne ReportFlow comme une application moderne, performante et maintenable qui résout efficacement le problème de répétition dans la saisie de rapports terrain.

### Decision Impact Analysis

**Implementation Sequence:**
1. **Story 1:** Initialisation projet Nuxt 4 + NuxtHub + Nuxt UI v4
2. **Story 2:** Configuration base de données Drizzle + modèles hybrides
3. **Story 3:** Authentification nuxt-auth-utils + middleware rôles
4. **Story 4:** Interface tableau Nuxt UI + composants par type (TextForm, NumberForm)
5. **Story 5:** Workflow soumission/validation employé→superviseur
6. **Story 6:** Corrections granulaires avec historique JSON
7. **Story 7:** Analytics et export Excel pour chefs/managers
8. **Story 8:** Gestion utilisateurs (CRUD réservé managers)
9. **Story 9:** Tests E2E et optimisation performance
10. **Story 10:** Déploiement production NuxtHub

**Cross-Component Dependencies:**
- Authentification → Tous les composants (middleware)
- Modèle de données hybride → Stores et APIs
- Composants spécialisés → Toutes les pages de saisie
- Validation côté serveur → Forms frontend
- Permissions rôles → Routes et actions UI

Cette architecture garantit que tous les agents d'implémentation travaillent de manière cohérente et que le workflow hiérarchique Employé → Superviseur → Chef/Manager fonctionne parfaitement avec vos composants spécialisés par type.