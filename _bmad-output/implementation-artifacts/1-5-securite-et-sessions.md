# Story 1.5: Sécurité et sessions

Status: ready-for-dev

## Story

As a utilisateur du système,
I want que mes données soient protégées et mes sessions gérées sécuritairement,
So that j'utilise l'application en toute confiance.

## Acceptance Criteria

**Given** je suis connecté à l'application
**When** je reste inactif pendant 30 minutes
**Then** ma session expire automatiquement
**And** je dois me reconnecter pour continuer

**Given** j'envoie des données sensibles dans un formulaire
**When** les données sont transmises
**Then** elles sont chiffrées en transit (HTTPS/TLS 1.3)
**And** stockées chiffrées en base de données

**Given** un attaquant essaie une injection SQL
**When** il soumet des données malicieuses
**Then** les données sont sanitizées
**And** l'attaque est bloquée sans impact sur le système

## Tasks / Subtasks

- [ ] Configuration HTTPS/TLS 1.3 obligatoire
- [ ] Gestion sessions avec expiration 30 minutes
- [ ] Chiffrement données sensibles en base
- [ ] Protection injection SQL et XSS
- [ ] Rate limiting et protection brute force

## Dev Notes

### Architecture Context - ULTIMATE DEV GUARDRAILS

**SÉCURITÉ CRITIQUE:** JWT, chiffrement, protection XSS/CSRF [Source: architecture.md#Security Constraints]
**SESSION MANAGEMENT:** Expiration 30min inactive [Source: epics.md#Story 1.5]
**CHIFFREMENT:** Transit (HTTPS) + stockage (encrypted fields) [Source: architecture.md#Security & Compliance]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.5] - Spécifications sécurité complètes
- [Source: _bmad-output/planning-artifacts/architecture.md#Security Constraints] - Contraintes sécurité niveau entreprise

### File List

- Story principale: `1-5-securite-et-sessions.md`
- Status mis à jour: `sprint-status.yaml` (story: ready-for-dev)