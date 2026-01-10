# Story 2.4: Distribution collective par rôle

Status: ready-for-dev

## Story

As a Chef superviseur ou Manager,
I want assigner un questionnaire à tous les utilisateurs d'un rôle,
So that la distribution soit automatique selon la hiérarchie.

## Acceptance Criteria

**Given** je veux distribuer un questionnaire à tous les superviseurs
**When** je sélectionne "Tous les Superviseurs"
**Then** le questionnaire est automatiquement assigné à tous les comptes superviseur
**And** ils reçoivent une notification groupée

## Tasks / Subtasks

- [ ] Distribution automatique par rôle
- [ ] Notifications groupées
- [ ] Assignation automatique nouveaux utilisateurs

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**DISTRIBUTION PAR RÔLE:** Assignation automatique hiérarchie [Source: epics.md#Story 2.4]
**NOTIFICATIONS GROUPÉES:** Alertes collectives [Source: epics.md#Story 2.4]
**AUTO-ASSIGNATION:** Nouveaux utilisateurs voient automatiquement [Source: epics.md#Story 2.4]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.4] - Distribution collective

### File List

- Story principale: `2-4-distribution-collective-par-role.md`