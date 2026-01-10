# Story 3.1: Copier-coller CSV intelligent

Status: ready-for-dev

## Story

As a employé saisissant des données terrain,
I want coller mes données brutes au format CSV standardisé,
So that elles se transforment automatiquement en tableau structuré sans saisie répétitive.

## Acceptance Criteria

**Given** j'ai des données brutes : "76XXXXXXX, 25-35 ans, besoin micro-crédit; 76YYYYYYY, 35-45 ans, formation agricole"
**When** je colle ces données dans le champ prévu
**Then** elles se transforment instantanément en tableau avec colonnes et lignes
**And** chaque cellule est automatiquement validée selon le type de donnée

## Tasks / Subtasks

- [ ] Parser CSV format ", " pour colonnes, ";" pour lignes
- [ ] Transformation automatique données → tableau
- [ ] Validation temps réel par type de colonne
- [ ] Messages d'erreur explicites corrections suggérées

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**TRAITEMENT CSV:** Parser intelligent ", " et ";" [Source: epics.md#Story 3.1]
**VALIDATION TEMPS RÉEL:** Feedback instantané erreurs [Source: epics.md#Story 3.1]
**TRANSFORMATION AUTO:** Données brutes → tableau structuré [Source: epics.md#Story 3.1]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1] - Copier-coller CSV intelligent

### File List

- Story principale: `3-1-copier-coller-csv-intelligent.md`