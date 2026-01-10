# Story 2.2: Modification et gestion des questionnaires

Status: ready-for-dev

## Story

As a Chef superviseur ou Manager,
I want modifier et gérer mes questionnaires existants,
So that je maintienne leur pertinence et contrôle leur cycle de vie.

## Acceptance Criteria

**Given** j'ai créé un questionnaire en statut "Brouillon"
**When** je l'édite pour ajouter une colonne
**Then** la modification est sauvegardée
**And** l'historique des changements est conservé

**Given** un questionnaire est prêt pour distribution
**When** je le désactive temporairement
**Then** il n'est plus visible par les utilisateurs
**And** les données existantes sont préservées

**Given** je veux supprimer définitivement un questionnaire
**When** il n'y a pas de rapports en cours de validation
**Then** la suppression est autorisée
**And** toutes les données associées sont archivées

## Tasks / Subtasks

- [ ] Édition questionnaires brouillon
- [ ] Historique modifications
- [ ] Désactivation temporaire
- [ ] Suppression avec archivage

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**CYCLE DE VIE:** Brouillon → Actif → Désactivé → Archivé [Source: epics.md#Story 2.2]
**HISTORIQUE:** Modifications tracées pour audit [Source: epics.md#Story 2.2]
**ARCHIVAGE:** Données préservées après suppression [Source: epics.md#Story 2.2]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2] - Gestion questionnaires

### File List

- Story principale: `2-2-modification-et-gestion-des-questionnaires.md`