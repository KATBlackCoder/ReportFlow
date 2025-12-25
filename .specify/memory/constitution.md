/_
Sync Impact Report
==================
Version change: new project → 1.0.0
Modified principles: All principles replaced with Nuxt 4 Unified Stack principles
Added sections: Technical Architecture, Development Execution Policy, Modules & Dependencies, Quality Gates, Code Quality Standards, UX & Accessibility, Performance Requirements
Removed sections: None
Templates requiring updates: plan-template.md (constitution check needs Nuxt-specific gates), spec-template.md (align with SDD requirements), tasks-template.md (add Nuxt-specific task types)
Follow-up TODOs: None
==================
_/

# Nuxt 4 Unified Stack Constitution

## 1. Authority & Scope

This document is the supreme governing authority for all technical and architectural decisions in this project.

- All contributors MUST comply with this constitution.
- In case of conflict with any other document, discussion, or convention, this constitution prevails.
- Any deviation requires formal approval through the Exception & Amendment Process.

This constitution is inspired by Spec-Kit methodology and enforces Spec-Driven Development (SDD) as a non-negotiable practice.

---

## 2. Core Philosophy & Guiding Principles

### 2.1 Spec-Driven Development (SDD)

- Every non-trivial feature or change MUST begin with a written specification.
- Implementation exists solely to satisfy verified specification requirements.
- Tests MUST map explicitly to specification acceptance criteria.
- Any deviation from a specification MUST be reflected by an explicit update to that specification.

### 2.2 Decision Hierarchy (Conflict Resolution Order)

In case of ambiguity or conflict, decisions MUST follow this order:

1. **Native First**
   Prefer Nuxt-native or officially supported solutions over third-party alternatives.

2. **Simplicity & Clarity**
   Avoid unnecessary abstraction. Explicit, readable code is mandatory over clever or opaque patterns.

3. **Performance by Default**
   Architect for SSR-first execution with minimal client-side JavaScript.

4. **Consistency & Predictability**
   Established patterns MUST be followed strictly. New patterns require a constitution amendment.

---

## 3. Technical Architecture & Mandatory Stack

### 3.1 Core Framework

- Nuxt.js v4 is the exclusive application framework.
- Vue 3 Composition API is mandatory.
- The Options API is forbidden for new components.

### 3.2 State Management

- Pinia (setup syntax) is the exclusive state management solution.
- Stores MUST be:
  - Domain-focused
  - Free of UI logic
  - Small and composable
- Global state requires explicit written justification.

### 3.3 UI & Styling

- Nuxt UI v4 is the exclusive UI component library.
- Tailwind CSS MUST be used only as configured and provided by Nuxt UI.
- Standalone `tailwind.config.js` files or alternative CSS frameworks are forbidden.
- Complex tables MUST use TanStack Table via Nuxt UI integration.

### 3.4 Internationalization (i18n)

- `@nuxtjs/i18n` is mandatory for multilingual requirements.
- Configuration MUST follow the official Nuxt UI integration guide.
- Locale messages MUST be lazy-loaded.

### 3.5 Icons Policy (Strict)

- Nuxt Icons is the exclusive icon solution.
- Icons MUST be installed locally; CDN usage is forbidden.
- A maximum of two icon collections is allowed.
- Adding additional collections requires a constitution amendment.

### 3.6 Authentication & Authorization (Mandatory)

- `nuxt-auth-utils` is the exclusive authentication utility for this project.
- All authentication and session management MUST be implemented using `nuxt-auth-utils`.
- Custom authentication implementations are forbidden unless explicitly approved through the Exception & Amendment Process.
- Third-party authentication frameworks or ad-hoc auth logic are forbidden.

#### Scope

- This applies to:
  - Session handling
  - User authentication
  - Authorization primitives
- Business-specific authorization rules MUST remain outside the authentication layer.

---

## 4. Development Execution Policy (Strict)

To guarantee deterministic builds and controlled environments, execution of runtime commands is strictly regulated.

### 4.1 Forbidden Commands

Contributors MUST NOT run any of the following commands locally or in ad-hoc environments:

- `nuxi dev`
- `nuxi build`
- `nuxi generate`
- `npm run dev`
- `npm run build`
- `npm run generate`
- Any equivalent command that starts a development server, builds, or generates artifacts

Local runtime execution for preview, validation, or experimentation is explicitly forbidden.

### 4.2 Allowed Commands

The following actions are explicitly permitted:

- Dependency installation:
  - `npm install`
  - `npm add`
  - `pnpm install`
  - `pnpm add`
- Static analysis and linting commands that do NOT start servers or generate build output
- Test execution when it does not require a running dev server

### 4.3 Execution Authority

- Runtime execution, build, and generation are reserved exclusively for:
  - CI pipelines
  - Designated maintainers
- Unauthorized execution is considered a constitutional violation and MUST block PR approval.

---

## 5. Modules, Extensions & Dependencies

### 5.1 Approved Modules

- Nuxt Content is approved for file-based, version-controlled content.
- External CMS solutions are forbidden unless a documented business requirement cannot be met.
- External CMS adoption requires a full architecture review.

### 5.2 Dependency Management

- Dependencies MUST be minimal and justified.
- Dependencies MUST NOT duplicate native Nuxt or Nuxt UI functionality.
- Optional tools MUST NOT impose architectural lock-in.
- All dependencies MUST remain compatible with primary deployment targets.

---

## 6. Quality Gates & Testing Standards

### 6.1 Approved Testing Stack

- Unit & Integration Testing: Vitest only
- End-to-End Testing: Playwright only
- Alternative frameworks (Jest, Cypress, etc.) are forbidden.

### 6.2 Testing Strategy

- High priority:
  - Composables
  - Pinia stores
  - Server API routes
  - Utility functions
- Lower priority:
  - Purely presentational UI components
- Nuxt UI components MUST be treated as trusted black boxes.
- Tests MUST validate specification requirements, not implementation details.

---

## 7. Code Quality & Architectural Standards

### 7.1 Structure & Responsibility

- Nuxt 4 directory conventions MUST be followed strictly.
- Business logic belongs in composables or stores.
- UI components MUST remain primarily presentational.
- Each file or component MUST have a single responsibility.

### 7.2 Code Standards

- TypeScript with strict typing is mandatory.
- Usage of `any` is forbidden unless demonstrably unavoidable and documented.
- Code MUST prioritize clarity and explicitness over abstraction.
- Custom CSS requires written justification.

### 7.3 Pinia State Access & Reactivity (Mandatory)

To preserve Vue reactivity and prevent silent state desynchronization:

- Pinia store state MUST NOT be destructured directly from the store object.
- When destructuring reactive state from a Pinia store, `storeToRefs()` MUST be used.
- Actions MAY be destructured directly from the store.
- Accessing state via `store.property` is always permitted.

---

## 8. User Experience & Accessibility

- Interfaces MUST be simple, consistent, and predictable.
- Fully responsive behavior across mobile, tablet, and desktop is mandatory.
- Animations MUST serve a clear functional purpose.
- Accessibility compliance is non-negotiable:
  - Semantic HTML
  - Adequate color contrast
  - Full keyboard navigation

---

## 9. Performance Requirements

- Client-side JavaScript MUST be minimized and continuously audited.
- SSR and SSG are preferred by default.
- Client-side rendering requires documented performance justification.
- Lazy-loading of routes, heavy components, and images is mandatory.
- Avoid unnecessary watchers, deeply nested reactive objects, and heavy computed logic.

---

## 10. Exception & Amendment Process

Any deviation from this constitution is considered an exception and follows a strict process:

1. **Written Justification**
   The PR MUST identify the exact rule being violated and the technical or business necessity.

2. **Architecture Review**
   Changes affecting multiple components or introducing new patterns require formal review.

3. **Documentation Update**
   Relevant documentation and specifications MUST be updated.

4. **Constitution Amendment**
   Repeatable exceptions MUST result in a proposed amendment to this document.

---

This constitution is a living document.
All updates MUST preserve the Core Philosophy defined in Section 2.

## Governance

**Version**: 1.0.0 | **Ratified**: 2025-12-24 | **Last Amended**: 2025-12-24
