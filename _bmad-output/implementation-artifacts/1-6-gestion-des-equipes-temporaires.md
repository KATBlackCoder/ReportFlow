# Story 1.6: Gestion des équipes temporaires

Status: ready-for-dev

## Story

As a Chef superviseur ou Manager,
I want créer des équipes temporaires pour des événements,
So that j'assigne des questionnaires spécifiques à des groupes temporaires.

## Acceptance Criteria

**Given** je suis un Chef superviseur ou Manager
**When** je crée une équipe temporaire "Événement Vaccination 2024"
**Then** je peux ajouter des employés existants à cette équipe
**And** leur assigner des permissions temporaires

**Given** j'ai créé une équipe temporaire
**When** je lui assigne un questionnaire
**Then** tous les membres de l'équipe voient ce questionnaire dans leur liste
**And** les permissions sont automatiquement gérées

**Given** l'événement est terminé
**When** je désactive l'équipe temporaire
**Then** les permissions temporaires sont retirées
**And** les membres retournent à leurs équipes normales

## Tasks / Subtasks

- [ ] Interface gestion équipes temporaires
- [ ] Création/édition équipes temporaires
- [ ] Assignation membres et permissions temporaires
- [ ] Désactivation et nettoyage automatique

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**GESTION ÉQUIPES TEMPORAIRES:** Support événements spéciaux [Source: epics.md#Story 1.6]
**PERMISSIONS TEMPORAIRES:** Assignation/désassignation automatique [Source: epics.md#Story 1.6]
**NETTOYAGE AUTOMATIQUE:** Désactivation propre sans impacts [Source: epics.md#Story 1.6]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.6] - Gestion équipes temporaires
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3] - Base système utilisateurs

### File List

- Story principale: `1-6-gestion-des-equipes-temporaires.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)