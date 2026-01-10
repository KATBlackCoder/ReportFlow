# Story 5.2: Rejet granulaire avec commentaires ciblés

Status: ready-for-dev

## Story

As a superviseur,
I want rejeter uniquement les parties problématiques d'un rapport,
So that l'employé corrige seulement ce qui est nécessaire sans recommencer.

## Acceptance Criteria

**Given** je valide un rapport avec erreurs partielles
**When** je rejette des colonnes/lignes spécifiques
**Then** seules ces parties sont marquées pour correction
**And** l'employé reçoit des instructions précises

## Tasks / Subtasks

- [ ] Rejet granulaire colonnes/lignes
- [ ] Commentaires ciblés par section
- [ ] Marquage zones à corriger
- [ ] Instructions correction précises

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**REJET GRANULAIRE:** Corrections partielles seulement [Source: epics.md#Story 5.2]
**PRÉSERVATION TRAVAIL:** Pas de refaire tout le rapport [Source: architecture.md#User Experience]
**INSTRUCTIONS PRÉCISES:** Commentaires par zone rejetée [Source: epics.md#Story 5.2]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.2] - Rejet granulaire

### File List

- Story principale: `5-2-rejet-granulaire-avec-commentaires-cibles.md`