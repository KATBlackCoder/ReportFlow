# Story 3.2: Validation temps réel avec corrections granulaires

Status: ready-for-dev

## Story

As a employé remplissant un questionnaire,
I want recevoir des validations immédiates et des corrections ciblées,
So that je corrige uniquement les erreurs sans recommencer tout le travail.

## Acceptance Criteria

**Given** je saisis une donnée invalide dans une cellule
**When** je quitte la cellule
**Then** elle se colore en rouge avec message d'erreur spécifique
**And** le curseur reste dans la cellule pour correction

## Tasks / Subtasks

- [ ] Validation temps réel cellule par cellule
- [ ] Messages d'erreur spécifiques par type d'erreur
- [ ] Correction granulaire sans perte de données
- [ ] Interface feedback visuel intuitif

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**VALIDATION GRANULAIRE:** Corrections cellule par cellule [Source: epics.md#Story 3.2]
**FEEDBACK TEMPS RÉEL:** Validation immédiate sans soumission [Source: architecture.md#Non-Functional Requirements]
**PRÉSERVATION DONNÉES:** Corrections sans perte de travail [Source: epics.md#Story 3.2]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.2] - Validation temps réel

### File List

- Story principale: `3-2-validation-temps-reel-avec-corrections-granulaires.md`