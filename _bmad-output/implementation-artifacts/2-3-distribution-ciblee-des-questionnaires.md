# Story 2.3: Distribution ciblée des questionnaires

Status: ready-for-dev

## Story

As a Chef superviseur ou Manager,
I want assigner un questionnaire à des employés spécifiques,
So that seules les personnes concernées y aient accès.

## Acceptance Criteria

**Given** j'ai un questionnaire prêt pour distribution
**When** je sélectionne "Distribution ciblée"
**Then** je vois la liste de tous les employés
**And** je peux cocher individuellement ceux à qui l'assigner

**Given** j'ai sélectionné des employés spécifiques
**When** je confirme la distribution
**Then** ces employés voient le questionnaire dans leur liste
**And** reçoivent une notification dans l'application

## Tasks / Subtasks

- [ ] Interface sélection employés individuels
- [ ] Assignation questionnaire à utilisateurs spécifiques
- [ ] Notifications utilisateurs ciblés
- [ ] Mise à jour visibilité par utilisateur

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**ASSIGNATION INDIVIDUELLE:** Sélection manuelle employés [Source: epics.md#Story 2.3]
**NOTIFICATIONS:** Alertes utilisateurs assignés [Source: epics.md#Story 2.3]
**VISIBILITÉ:** Questionnaire prioritaire dans liste [Source: epics.md#Story 2.3]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.3] - Distribution ciblée

### File List

- Story principale: `2-3-distribution-ciblee-des-questionnaires.md`