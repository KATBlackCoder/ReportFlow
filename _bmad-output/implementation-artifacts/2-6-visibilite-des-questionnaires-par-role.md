# Story 2.6: Visibilité des questionnaires par rôle

Status: ready-for-dev

## Story

As a utilisateur authentifié,
I want voir uniquement les questionnaires qui me sont assignés selon mon rôle,
So that mon interface reste claire et pertinente.

## Acceptance Criteria

**Given** je suis un employé authentifié
**When** j'accède aux questionnaires
**Then** je vois uniquement mes questionnaires assignés
**And** je n'ai pas accès aux questionnaires d'autres employés

**Given** je suis un superviseur
**When** j'accède aux questionnaires
**Then** je vois mes questionnaires et ceux de mon équipe
**And** j'ai accès aux fonctionnalités de validation

## Tasks / Subtasks

- [ ] Filtrage questionnaires par rôle/permissions
- [ ] Interface adaptée par rôle
- [ ] Masquage données non autorisées
- [ ] Navigation contextuelle

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**VISIBILITÉ PAR RÔLE:** Interface adaptée hiérarchie [Source: epics.md#Story 2.6]
**FILTRAGE DONNÉES:** Sécurité au niveau affichage [Source: architecture.md#Security Constraints]
**INTERFACE ADAPTÉE:** Fonctionnalités selon rôle [Source: epics.md#Story 2.6]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.6] - Visibilité par rôle

### File List

- Story principale: `2-6-visibilite-des-questionnaires-par-role.md`