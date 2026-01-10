# Story 3.6: Messages d'erreur contextuels en français

Status: ready-for-dev

## Story

As a utilisateur francophone,
I want comprendre immédiatement mes erreurs de saisie,
So that je les corrige rapidement sans frustration.

## Acceptance Criteria

**Given** je saisis un numéro de téléphone invalide
**When** je valide
**Then** j'obtiens "Le numéro doit être au format 76XXXXXX (Mali)"
**And** un exemple valide est fourni

## Tasks / Subtasks

- [ ] Messages d'erreur en français natif
- [ ] Exemples concrets dans erreurs
- [ ] Suggestions de correction automatiques
- [ ] Contextes adaptés par type d'erreur

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**MESSAGES FRANÇAIS:** Interface entièrement francophone [Source: epics.md#Story 3.6]
**CONTEXTE SPÉCIFIQUE:** Erreurs adaptées Mali [Source: epics.md#Story 3.6]
**EXEMPLES CONCRETS:** Aide correction immédiate [Source: epics.md#Story 3.6]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.6] - Messages d'erreur français

### File List

- Story principale: `3-6-messages-d-erreur-contextuels-en-francais.md`