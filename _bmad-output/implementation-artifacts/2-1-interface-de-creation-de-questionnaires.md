# Story 2.1: Interface de création de questionnaires

Status: ready-for-dev

## Story

As a Chef superviseur ou Manager,
I want créer un questionnaire avec une interface tableau intuitive,
So that je définisse facilement les colonnes et types de données requis.

## Acceptance Criteria

**Given** je suis un Chef superviseur ou Manager authentifié
**When** j'accède à la section "Créer un questionnaire"
**Then** je vois une interface tableau vide avec possibilité d'ajouter des colonnes
**And** je peux définir le nom du questionnaire et sa description

**Given** je crée une nouvelle colonne dans le questionnaire
**When** je spécifie le type de donnée (texte, nombre, date, choix multiple)
**Then** la colonne est ajoutée au tableau avec les bonnes validations
**And** je peux définir si elle est obligatoire ou optionnelle

**Given** j'ai défini toutes les colonnes de mon questionnaire
**When** je sauvegarde le questionnaire
**Then** il est créé avec statut "Brouillon"
**And** je peux le prévisualiser avant distribution

## Tasks / Subtasks

- [ ] Interface drag & drop création colonnes
- [ ] Types de données (texte, nombre, date, select, checkbox)
- [ ] Validation obligatoire/optionnel
- [ ] Prévisualisation questionnaire
- [ ] Sauvegarde brouillon

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**INTERFACE TABLEAU:** Création intuitive colonnes/types [Source: epics.md#Story 2.1]
**TYPES DE DONNÉES:** Texte, nombre, date, choix multiple [Source: epics.md#Story 2.1]
**VALIDATION:** Champs obligatoires/optionnels [Source: epics.md#Story 2.1]
**STATUT BROUILLON:** Préparation avant distribution [Source: epics.md#Story 2.1]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1] - Interface création questionnaires

### File List

- Story principale: `2-1-interface-de-creation-de-questionnaires.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)