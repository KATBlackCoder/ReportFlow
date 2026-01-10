---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
epicsCount: 6
storiesCount: 33
frsCovered: 60
completionDate: '2026-01-09'
status: 'ready-for-development'
---

# ReportFlow - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for ReportFlow, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Chefs superviseurs et Managers peuvent créer des questionnaires avec structure tableau définissant les colonnes et types de données requis
FR2: Chefs superviseurs et Managers peuvent modifier les questionnaires existants en ajoutant, supprimant ou modifiant des colonnes
FR3: Chefs superviseurs et Managers peuvent désactiver des questionnaires sans les supprimer
FR4: Chefs superviseurs et Managers peuvent assigner des questionnaires à des employés spécifiques (distribution ciblée)
FR5: Chefs superviseurs et Managers peuvent assigner des questionnaires à tous les employés d'un rôle (distribution collective)
FR6: Chefs superviseurs et Managers peuvent créer des équipes temporaires pour des événements et leur assigner des questionnaires dédiés
FR7: Employés peuvent voir la liste des questionnaires qui leur sont assignés
FR8: Superviseurs peuvent voir les questionnaires assignés à leur équipe et à eux-mêmes
FR9: Chefs superviseurs et Managers peuvent voir tous les questionnaires du système avec leur statut d'assignation
FR10: Employés peuvent saisir des données via copier-coller CSV en utilisant le format standardisé (virgule+espace pour colonnes, point-virgule pour lignes)
FR11: Le système valide automatiquement le format CSV et affiche des messages d'erreur explicites pour les erreurs de format
FR12: Employés peuvent ajouter manuellement des lignes individuelles dans le tableau après un copier-coller CSV
FR13: Employés peuvent modifier des cellules individuelles dans le tableau via édition inline
FR14: Employés peuvent supprimer des lignes individuelles du tableau
FR15: Le système valide les données en temps réel et empêche la soumission si des erreurs sont détectées
FR16: Employés peuvent voir leurs rapports soumis avec leur statut (en attente, validé, rejeté)
FR17: Superviseurs peuvent voir tous les rapports de leur équipe et leurs propres rapports
FR18: Chefs superviseurs et Managers peuvent voir tous les rapports selon leur niveau d'accès hiérarchique
FR19: Le système envoie automatiquement les rapports soumis par les employés à leur superviseur pour validation
FR20: Superviseurs peuvent valider ou rejeter des rapports complets avec des commentaires
FR21: Superviseurs peuvent rejeter des colonnes ou lignes spécifiques dans un rapport plutôt que le rapport entier
FR22: Le système envoie automatiquement les rapports validés par les superviseurs aux chefs superviseurs/managers
FR23: Chefs superviseurs et Managers peuvent voir tous les rapports validés par les superviseurs
FR24: Chefs superviseurs et Managers peuvent rejeter des rapports validés si nécessaire avec commentaires
FR25: Le système notifie automatiquement les superviseurs quand un rapport d'employé est rejeté par un chef/manager
FR26: Le système notifie automatiquement les employés quand leur rapport est rejeté avec les corrections requises
FR27: Employés peuvent corriger uniquement les parties rejetées de leur rapport sans refaire tout le rapport
FR28: Le système authentifie les utilisateurs selon leur rôle (Employé, Superviseur, Chef superviseur, Manager)
FR29: Employés ne peuvent accéder qu'à leurs propres questionnaires et rapports
FR30: Superviseurs peuvent accéder aux questionnaires et rapports de leur équipe et à leurs propres données
FR31: Chefs superviseurs et Managers peuvent accéder à tous les questionnaires et rapports selon leur niveau hiérarchique
FR32: Le système maintient la confidentialité des données selon les règles de rôle
FR33: Le système enregistre automatiquement l'auteur et la date de chaque action (soumission, validation, rejet)
FR34: Superviseurs peuvent consulter des statistiques basiques sur leur équipe (nombre de rapports par employé)
FR35: Chefs superviseurs et Managers peuvent trier les rapports par colonnes (date, employé, statut, etc.)
FR36: Chefs superviseurs et Managers peuvent filtrer les rapports par critères multiples (date, équipe, statut, etc.)
FR37: Chefs superviseurs et Managers peuvent rechercher dans les données des rapports
FR38: Chefs superviseurs et Managers peuvent exporter les données filtrées/triées en format Excel/CSV
FR39: Le système préserve le format et la structure des données lors de l'export
FR40: Chefs superviseurs et Managers peuvent créer et gérer des comptes utilisateurs
FR41: Le système valide l'intégrité des relations hiérarchiques (chaque employé a un superviseur, chaque superviseur a un chef superviseur)
FR42: Le système empêche la suppression de données actives (rapports en cours de validation)
FR43: Le système maintient un historique des modifications pour audit et traçabilité
FR44: Le système gère les équipes temporaires pour événements avec assignation automatique des permissions appropriées
FR45: Le système permet la réutilisation de structures de questionnaires similaires pour créer de nouveaux questionnaires
FR46: Le système envoie des notifications dans l'application pour les rapports nécessitant action
FR47: Employés reçoivent des notifications pour leurs rapports rejetés avec indication des corrections requises
FR48: Superviseurs reçoivent des notifications pour les nouveaux rapports à valider et les rejets de chefs/managers
FR49: Le système indique visuellement le statut des rapports (✓ vert pour validé, ✗ rouge pour rejeté)
FR50: Le système affiche en priorité les rapports nécessitant action (rejetés, en attente) avant les rapports chronologiques
FR51: Le système chiffre les données sensibles en transit et au repos
FR52: Le système implémente une authentification sécurisée avec gestion des sessions
FR53: Le système protège contre les attaques courantes (XSS, CSRF, injection SQL)
FR54: Le système respecte les standards de confidentialité des données utilisateurs
FR55: Le système permet la récupération de mot de passe de manière sécurisée
FR56: L'interface fonctionne sur les navigateurs modernes (Chrome, Firefox, Safari, Edge)
FR57: L'application est responsive et fonctionne correctement sur mobile et desktop
FR58: Le système traite les copier-coller CSV en temps réel avec validation immédiate
FR59: L'interface respecte les standards d'accessibilité WCAG 2.1 AA
FR60: Le système fournit des messages d'erreur clairs et contextualisés en français pour les utilisateurs maliens

### NonFunctional Requirements

NFR-PERF-01: Temps de chargement initial de l'application : maximum 3 secondes sur connexion 3G standard malienne
NFR-PERF-02: Traitement du copier-coller CSV : validation et création du tableau en moins de 1 seconde pour jusqu'à 50 lignes
NFR-PERF-03: Temps de réponse pour les actions utilisateur critiques (sauvegarde, validation) : maximum 2 secondes
NFR-PERF-04: Navigation entre vues dans l'application : maximum 500 millisecondes
NFR-PERF-05: Tri et filtrage des rapports : réponse en moins de 1 seconde pour jusqu'à 1000 rapports
NFR-PERF-06: Export Excel : génération du fichier en moins de 5 secondes pour jusqu'à 5000 lignes
NFR-SEC-01: Authentification sécurisée avec chiffrement des mots de passe (bcrypt ou équivalent)
NFR-SEC-02: Gestion de session sécurisée avec expiration automatique après 30 minutes d'inactivité
NFR-SEC-03: Autorisation basée sur les rôles avec principe du moindre privilège
NFR-SEC-04: Chiffrement des données sensibles en transit (HTTPS/TLS 1.3) et au repos
NFR-SEC-05: Protection contre les attaques courantes : XSS, CSRF, injection SQL, clickjacking
NFR-SEC-06: Journalisation des accès et modifications pour audit de sécurité
NFR-SEC-07: Conformité aux standards de confidentialité des données personnelles
NFR-SCA-01: Support simultané de 100 utilisateurs actifs sans dégradation de performance
NFR-SCA-02: Gestion de 1000 rapports par jour avec archivage automatique des anciens rapports
NFR-SCA-03: Architecture permettant la croissance à 10000 utilisateurs sans refonte majeure
NFR-SCA-04: Base de données optimisée pour les requêtes fréquentes (rapports actifs, statistiques équipe)
NFR-SCA-05: Cache stratégique pour les questionnaires fréquemment utilisés et données de référence
NFR-ACC-01: Conformité WCAG 2.1 niveau AA pour l'accessibilité
NFR-ACC-02: Navigation complète au clavier pour tous les éléments interactifs
NFR-ACC-03: Support des lecteurs d'écran (NVDA, JAWS, VoiceOver, TalkBack)
NFR-ACC-04: Contraste de couleurs minimum 4.5:1 pour la lisibilité
NFR-ACC-05: Labels et descriptions appropriés pour tous les éléments d'interface
NFR-ACC-06: Interface responsive fonctionnelle sur mobile et desktop
NFR-ACC-07: Messages d'erreur et d'aide disponibles en français avec formulations claires
NFR-REL-01: Disponibilité du service : 99% uptime pendant les heures de travail (8h-20h heure malienne)
NFR-REL-02: Gestion gracieuse des erreurs avec messages utilisateur informatifs
NFR-REL-03: Sauvegarde automatique des données toutes les 4 heures avec récupération possible
NFR-REL-04: Validation côté serveur pour l'intégrité des données soumises
NFR-REL-05: Protection contre la perte de données en cas d'interruption de session
NFR-MAIN-01: Code modulaire et documenté pour faciliter les évolutions futures
NFR-MAIN-02: Architecture permettant l'ajout de nouvelles fonctionnalités sans impact sur les existantes
NFR-MAIN-03: Tests automatisés pour les fonctionnalités critiques (couverture > 80%)
NFR-MAIN-04: Documentation technique pour les développeurs et administrateurs système
NFR-I18N-01: Interface utilisateur en français avec termes adaptés au contexte malien
NFR-I18N-02: Support des formats de date, nombre et devise maliens
NFR-I18N-03: Messages d'erreur et d'aide contextualisés pour les workflows maliens
NFR-I18N-04: Architecture permettant l'ajout futur d'autres langues si nécessaire

### Additional Requirements

- **Starter Template**: Utilisation obligatoire de Nuxt 4 + NuxtHub + Nuxt UI v4 + nuxt-auth-utils comme stack technologique de base
- **Initialisation du projet**: Première story d'implémentation doit utiliser la commande d'initialisation du starter template
- **Architecture de données hybride**: Modèle avec JSON pour flexibilité des corrections granulaires et composants par type
- **Authentification hiérarchique**: Configuration des rôles Employé/Superviseur/Chef superviseur/Manager
- **Gestion d'état**: Utilisation de Pinia avec composition stores pour l'état complexe
- **API RESTful**: Patterns RESTful avec validation côté serveur
- **Interface responsive**: Breakpoints stratégiques (mobile <768px, tablet 768-1024px, desktop >1024px)
- **Accessibilité WCAG 2.1 AA**: Conformité complète avec navigation clavier et lecteurs d'écran
- **Interaction patterns**: Copier-coller CSV "magique", corrections granulaires, priorité d'affichage inversée
- **Protection des données**: Avertissement contextuel avant perte de données non sauvegardées
- **Workflow hiérarchique 2 niveaux**: Simplification Employé → Superviseur → Chef/Manager
- **Analytics différenciées**: Dashboard spécialisés par rôle (équipe pour superviseurs, global pour managers)
- **Notifications intelligentes**: Badges avec compteurs pour actions requises
- **Interface hybride mobile/desktop**: Même fonctionnalités sur toutes les plateformes

### FR Coverage Map

FR1: Epic 2 - Chefs superviseurs et Managers peuvent créer des questionnaires avec structure tableau définissant les colonnes et types de données requis
FR2: Epic 2 - Chefs superviseurs et Managers peuvent modifier les questionnaires existants en ajoutant, supprimant ou modifiant des colonnes
FR3: Epic 2 - Chefs superviseurs et Managers peuvent désactiver des questionnaires sans les supprimer
FR4: Epic 2 - Chefs superviseurs et Managers peuvent assigner des questionnaires à des employés spécifiques (distribution ciblée)
FR5: Epic 2 - Chefs superviseurs et Managers peuvent assigner des questionnaires à tous les employés d'un rôle (distribution collective)
FR6: Epic 2 - Chefs superviseurs et Managers peuvent créer des équipes temporaires pour des événements et leur assigner des questionnaires dédiés
FR7: Epic 2 - Employés peuvent voir la liste des questionnaires qui leur sont assignés
FR8: Epic 2 - Superviseurs peuvent voir les questionnaires assignés à leur équipe et à eux-mêmes
FR9: Epic 2 - Chefs superviseurs et Managers peuvent voir tous les questionnaires du système avec leur statut d'assignation
FR10: Epic 3 - Employés peuvent saisir des données via copier-coller CSV en utilisant le format standardisé (virgule+espace pour colonnes, point-virgule pour lignes)
FR11: Epic 3 - Le système valide automatiquement le format CSV et affiche des messages d'erreur explicites pour les erreurs de format
FR12: Epic 3 - Employés peuvent ajouter manuellement des lignes individuelles dans le tableau après un copier-coller CSV
FR13: Epic 3 - Employés peuvent modifier des cellules individuelles dans le tableau via édition inline
FR14: Epic 3 - Employés peuvent supprimer des lignes individuelles du tableau
FR15: Epic 3 - Le système valide les données en temps réel et empêche la soumission si des erreurs sont détectées
FR16: Epic 4 - Employés peuvent voir leurs rapports soumis avec leur statut (en attente, validé, rejeté)
FR17: Epic 4 - Superviseurs peuvent voir tous les rapports de leur équipe et leurs propres rapports
FR18: Epic 4 - Chefs superviseurs et Managers peuvent voir tous les rapports selon leur niveau d'accès hiérarchique
FR19: Epic 5 - Le système envoie automatiquement les rapports soumis par les employés à leur superviseur pour validation
FR20: Epic 5 - Superviseurs peuvent valider ou rejeter des rapports complets avec des commentaires
FR21: Epic 5 - Superviseurs peuvent rejeter des colonnes ou lignes spécifiques dans un rapport plutôt que le rapport entier
FR22: Epic 5 - Le système envoie automatiquement les rapports validés par les superviseurs aux chefs superviseurs/managers
FR23: Epic 5 - Chefs superviseurs et Managers peuvent voir tous les rapports validés par les superviseurs
FR24: Epic 5 - Chefs superviseurs et Managers peuvent rejeter des rapports validés si nécessaire avec commentaires
FR25: Epic 5 - Le système notifie automatiquement les superviseurs quand un rapport d'employé est rejeté par un chef/manager
FR26: Epic 5 - Le système notifie automatiquement les employés quand leur rapport est rejeté avec les corrections requises
FR27: Epic 5 - Employés peuvent corriger uniquement les parties rejetées de leur rapport sans refaire tout le rapport
FR28: Epic 1 - Le système authentifie les utilisateurs selon leur rôle (Employé, Superviseur, Chef superviseur, Manager)
FR29: Epic 1 - Employés ne peuvent accéder qu'à leurs propres questionnaires et rapports
FR30: Epic 1 - Superviseurs peuvent accéder aux questionnaires et rapports de leur équipe et à leurs propres données
FR31: Epic 1 - Chefs superviseurs et Managers peuvent accéder à tous les questionnaires et rapports selon leur niveau hiérarchique
FR32: Epic 1 - Le système maintient la confidentialité des données selon les règles de rôle
FR33: Epic 1 - Le système enregistre automatiquement l'auteur et la date de chaque action (soumission, validation, rejet)
FR34: Epic 6 - Superviseurs peuvent consulter des statistiques basiques sur leur équipe (nombre de rapports par employé)
FR35: Epic 6 - Chefs superviseurs et Managers peuvent trier les rapports par colonnes (date, employé, statut, etc.)
FR36: Epic 6 - Chefs superviseurs et Managers peuvent filtrer les rapports par critères multiples (date, équipe, statut, etc.)
FR37: Epic 6 - Chefs superviseurs et Managers peuvent rechercher dans les données des rapports
FR38: Epic 6 - Chefs superviseurs et Managers peuvent exporter les données filtrées/triées en format Excel/CSV
FR39: Epic 6 - Le système préserve le format et la structure des données lors de l'export
FR40: Epic 1 - Chefs superviseurs et Managers peuvent créer et gérer des comptes utilisateurs
FR41: Epic 1 - Le système valide l'intégrité des relations hiérarchiques (chaque employé a un superviseur, chaque superviseur a un chef superviseur)
FR42: Epic 1 - Le système empêche la suppression de données actives (rapports en cours de validation)
FR43: Epic 1 - Le système maintient un historique des modifications pour audit et traçabilité
FR44: Epic 1 - Le système gère les équipes temporaires pour événements avec assignation automatique des permissions appropriées
FR45: Epic 1 - Le système permet la réutilisation de structures de questionnaires similaires pour créer de nouveaux questionnaires
FR46: Epic 5 - Le système envoie des notifications dans l'application pour les rapports nécessitant action
FR47: Epic 5 - Employés reçoivent des notifications pour leurs rapports rejetés avec indication des corrections requises
FR48: Epic 5 - Superviseurs reçoivent des notifications pour les nouveaux rapports à valider et les rejets de chefs/managers
FR49: Epic 5 - Le système indique visuellement le statut des rapports (✓ vert pour validé, ✗ rouge pour rejeté)
FR50: Epic 5 - Le système affiche en priorité les rapports nécessitant action (rejetés, en attente) avant les rapports chronologiques
FR51: Epic 1 - Le système chiffre les données sensibles en transit et au repos
FR52: Epic 1 - Le système implémente une authentification sécurisée avec gestion des sessions
FR53: Epic 1 - Le système protège contre les attaques courantes (XSS, CSRF, injection SQL)
FR54: Epic 1 - Le système respecte les standards de confidentialité des données utilisateurs
FR55: Epic 1 - Le système permet la récupération de mot de passe de manière sécurisée
FR56: Epic 3 - L'interface fonctionne sur les navigateurs modernes (Chrome, Firefox, Safari, Edge)
FR57: Epic 3 - L'application est responsive et fonctionne correctement sur mobile et desktop
FR58: Epic 3 - Le système traite les copier-coller CSV en temps réel avec validation immédiate
FR59: Epic 3 - L'interface respecte les standards d'accessibilité WCAG 2.1 AA
FR60: Epic 3 - Le système fournit des messages d'erreur clairs et contextualisés en français pour les utilisateurs maliens

## Epic List

### Epic 1: Accès et Identités
Utilisateurs peuvent s'authentifier et accéder à leurs données selon leur rôle (Employé, Superviseur, Chef superviseur, Manager)
**FRs covered:** FR28-33, 40-45, 51-55

### Epic 2: Création de Questionnaires
Chefs superviseurs et Managers peuvent créer, modifier et distribuer des questionnaires avec structure tableau
**FRs covered:** FR1-9

### Epic 3: Saisie de Données Intelligente
Employés peuvent saisir des données efficacement via copier-coller CSV et corrections granulaires, avec validation temps réel
**FRs covered:** FR10-15, 56-60

### Epic 4: Soumission et Suivi des Rapports
Employés, Superviseurs et Managers peuvent soumettre et suivre le statut de leurs rapports dans le système
**FRs covered:** FR16-18

### Epic 5: Validation Hiérarchique
Superviseurs et Managers peuvent valider/rejeter les rapports avec corrections ciblées et notifications intelligentes
**FRs covered:** FR19-27, 46-50

### Epic 6: Analytics et Insights
Superviseurs voient les statistiques d'équipe, Managers analysent globalement avec tri/filtrage/export
**FRs covered:** FR34-39

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Accès et Identités
Utilisateurs peuvent s'authentifier avec numéro de téléphone (@ml.org) et accéder à leurs données selon leur rôle

### Story 1.1: Authentification par numéro de téléphone

As a utilisateur du système,
I want me connecter avec mon numéro de téléphone au format 76XXXXXX@ml.org et un mot de passe par défaut,
So that j'accède rapidement à l'application sans configuration complexe.

**Acceptance Criteria:**

**Given** un compte utilisateur créé avec numéro 76123456@ml.org
**When** je saisis ce numéro comme identifiant et le mot de passe par défaut de mon rôle
**Then** je suis authentifié et redirigé vers mon tableau de bord selon mon rôle
**And** le système enregistre la connexion pour audit

**Given** un numéro de téléphone invalide (pas au format malien)
**When** j'essaie de me connecter
**Then** j'obtiens un message d'erreur "Numéro de téléphone invalide"
**And** je reste sur la page de connexion

### Story 1.2: Modification du mot de passe initial

As a utilisateur venant de se connecter pour la première fois,
I want changer mon mot de passe par défaut,
So that mon compte soit sécurisé avec un mot de passe personnel.

**Acceptance Criteria:**

**Given** je me suis connecté avec succès avec un mot de passe par défaut
**When** le système me demande de changer mon mot de passe
**Then** je suis redirigé vers une page de changement de mot de passe obligatoire
**And** je ne peux pas accéder aux autres fonctionnalités avant le changement

**Given** je suis sur la page de changement de mot de passe
**When** je saisis un nouveau mot de passe respectant les règles de sécurité
**Then** mon mot de passe est mis à jour
**And** je suis redirigé vers mon tableau de bord

**Given** je saisis un mot de passe trop faible
**When** j'essaie de valider
**Then** j'obtiens un message d'erreur détaillant les exigences de sécurité
**And** le changement est refusé

### Story 1.3: Gestion des comptes utilisateurs par téléphone

As a Chef superviseur ou Manager,
I want créer des comptes utilisateurs avec numéro de téléphone et informations personnelles,
So that les nouveaux employés soient correctement identifiés et puissent accéder immédiatement au système.

**Acceptance Criteria:**

**Given** je suis un Chef superviseur ou Manager authentifié
**When** je crée un nouveau compte utilisateur
**Then** je peux saisir le numéro de téléphone, nom, prénom et quartier
**And** le système crée automatiquement l'identifiant numéro@ml.org

**Given** je saisis les informations : numéro 76123456, nom "Diallo", prénom "Fatoumata", quartier "Baco-Djicoroni"
**When** je valide la création
**Then** le compte est créé avec identifiant 76123456@ml.org
**And** les informations personnelles sont stockées pour identification

**Given** je crée un compte pour un employé
**When** je sélectionne le rôle "Employé"
**Then** le mot de passe par défaut "Employe2024!" est assigné
**And** les permissions appropriées sont configurées

**Given** j'essaie de créer un compte avec un numéro déjà existant
**When** je valide la création
**Then** j'obtiens une erreur "Ce numéro de téléphone est déjà utilisé"
**And** la création est annulée

**Given** je veux modifier les informations d'un utilisateur existant
**When** je mets à jour nom, prénom ou quartier
**Then** les modifications sont sauvegardées
**And** l'historique des changements est conservé

### Story 1.4: Permissions par rôle hiérarchique

As a utilisateur authentifié,
I want accéder uniquement aux fonctionnalités autorisées pour mon rôle,
So that je ne vois que les données et actions pertinentes à mes responsabilités.

**Acceptance Criteria:**

**Given** je suis un employé authentifié
**When** j'accède à l'application
**Then** je vois uniquement mes questionnaires et rapports personnels
**And** je n'ai pas accès aux fonctionnalités de gestion

**Given** je suis un superviseur authentifié
**When** j'accède à l'application
**Then** je vois les questionnaires et rapports de mon équipe
**And** j'ai accès aux fonctionnalités de validation

**Given** je suis un Chef superviseur ou Manager authentifié
**When** j'accède à l'application
**Then** je vois tous les questionnaires et rapports du système
**And** j'ai accès aux fonctionnalités de création et gestion complète

### Story 1.5: Sécurité et sessions

As a utilisateur du système,
I want que mes données soient protégées et mes sessions gérées sécuritairement,
So that j'utilise l'application en toute confiance.

**Acceptance Criteria:**

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

### Story 1.6: Gestion des équipes temporaires

As a Chef superviseur ou Manager,
I want créer des équipes temporaires pour des événements,
So that j'assigne des questionnaires spécifiques à des groupes temporaires.

**Acceptance Criteria:**

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

### Story 1.7: Historique et audit

As a Manager,
I want consulter l'historique des actions utilisateur,
So that j'assure la traçabilité et la conformité du système.

**Acceptance Criteria:**

**Given** un utilisateur effectue une action (soumission, validation, rejet)
**When** l'action est enregistrée
**Then** l'historique contient l'utilisateur, la date, l'heure et l'action
**And** les données sont conservées pour audit

**Given** je suis un Manager authentifié
**When** j'accède aux logs d'audit
**Then** je vois toutes les actions triées par date
**And** je peux filtrer par utilisateur ou type d'action

**Given** un employé supprime accidentellement des données
**When** le système détecte cette action
**Then** elle est enregistrée dans l'historique d'audit
**And** les données peuvent être récupérées si nécessaire

<!-- End story repeat -->

## Epic 2: Création de Questionnaires
Chefs superviseurs et Managers peuvent créer, modifier et distribuer des questionnaires avec structure tableau

### Story 2.1: Interface de création de questionnaires

As a Chef superviseur ou Manager,
I want créer un questionnaire avec une interface tableau intuitive,
So that je définisse facilement les colonnes et types de données requis.

**Acceptance Criteria:**

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

### Story 2.2: Modification et gestion des questionnaires

As a Chef superviseur ou Manager,
I want modifier et gérer mes questionnaires existants,
So that je maintienne leur pertinence et contrôle leur cycle de vie.

**Acceptance Criteria:**

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

### Story 2.3: Distribution ciblée des questionnaires

As a Chef superviseur ou Manager,
I want assigner un questionnaire à des employés spécifiques,
So that seules les personnes concernées y aient accès.

**Acceptance Criteria:**

**Given** j'ai un questionnaire prêt pour distribution
**When** je sélectionne "Distribution ciblée"
**Then** je vois la liste de tous les employés
**And** je peux cocher individuellement ceux à qui l'assigner

**Given** j'ai sélectionné des employés spécifiques
**When** je confirme la distribution
**Then** ces employés voient le questionnaire dans leur liste
**And** reçoivent une notification dans l'application

**Given** un employé ciblé ouvre son application
**When** il consulte ses questionnaires
**Then** le questionnaire assigné apparaît en haut de la liste
**And** il peut commencer à y répondre immédiatement

### Story 2.4: Distribution collective par rôle

As a Chef superviseur ou Manager,
I want assigner un questionnaire à tous les utilisateurs d'un rôle,
So that la distribution soit automatique selon la hiérarchie.

**Acceptance Criteria:**

**Given** je veux distribuer un questionnaire à tous les superviseurs
**When** je sélectionne "Tous les Superviseurs"
**Then** le questionnaire est automatiquement assigné à tous les comptes superviseur
**And** ils reçoivent une notification groupée

**Given** je distribue un questionnaire à tous les employés
**When** la distribution est confirmée
**Then** tous les employés voient le questionnaire dans leur liste
**And** le système enregistre la date et heure de distribution

**Given** un nouveau superviseur est créé après distribution
**When** il se connecte pour la première fois
**Then** il voit automatiquement les questionnaires assignés à son rôle
**And** n'a pas besoin d'assignation manuelle

### Story 2.5: Gestion des équipes temporaires pour questionnaires

As a Chef superviseur ou Manager,
I want créer des équipes temporaires pour des événements spécifiques,
So that j'assigne des questionnaires adaptés aux contextes particuliers.

**Acceptance Criteria:**

**Given** je organise un événement "Campagne Vaccination Nord"
**When** je crée une équipe temporaire
**Then** je peux nommer l'équipe et définir sa durée de vie
**And** ajouter des membres de différentes équipes normales

**Given** j'ai créé une équipe temporaire
**When** je lui assigne un questionnaire spécifique
**Then** seuls les membres de cette équipe voient le questionnaire
**And** les autres utilisateurs ne l'ont pas dans leur liste

**Given** l'événement est terminé
**When** je désactive l'équipe temporaire
**Then** les membres retournent à leurs équipes normales
**And** l'historique des réponses est préservé pour cette équipe

### Story 2.6: Visibilité des questionnaires par rôle

As a utilisateur authentifié,
I want voir uniquement les questionnaires qui me concernent,
So that je ne sois pas submergé par des questionnaires non pertinents.

**Acceptance Criteria:**

**Given** je suis un employé authentifié
**When** j'accède à la section questionnaires
**Then** je vois uniquement les questionnaires qui me sont assignés
**And** ils sont triés par date d'assignation (plus récent en premier)

**Given** je suis un superviseur authentifié
**When** je consulte les questionnaires
**Then** je vois les questionnaires assignés à mon équipe
**And** les questionnaires personnels qui me sont directement assignés

**Given** je suis un Chef superviseur ou Manager authentifié
**When** j'accède à la gestion des questionnaires
**Then** je vois tous les questionnaires du système
**And** leur statut de distribution et progression de réponse

<!-- End story repeat -->

## Epic 3: Saisie de Données Intelligente
Employés peuvent saisir des données efficacement via copier-coller CSV et corrections granulaires, avec validation temps réel

### Story 3.1: Copier-coller CSV intelligent

As a employé saisissant des données terrain,
I want coller mes données brutes au format CSV standardisé,
So that elles se transforment automatiquement en tableau structuré sans saisie répétitive.

**Acceptance Criteria:**

**Given** j'ai des données brutes : "76XXXXXXX, 25-35 ans, besoin micro-crédit; 76YYYYYYY, 35-45 ans, formation agricole"
**When** je colle ces données dans le champ prévu
**Then** elles se transforment instantanément en tableau avec colonnes et lignes
**And** chaque cellule est automatiquement validée selon le type de donnée

**Given** mes données CSV contiennent un format invalide
**When** je les colle
**Then** j'obtiens un message d'erreur explicite en français
**And** le système suggère automatiquement des corrections

**Given** j'ai collé des données valides
**When** je veux ajouter une ligne manuellement
**Then** une nouvelle ligne vide apparaît dans le tableau
**And** je peux la remplir avec les mêmes validations

**Given** j'ai un questionnaire avec radio "Travail effectué" (1=Oui, 2=Non)
**When** je sélectionne "1" dans le radio
**Then** une colonne "Détails du travail" apparaît automatiquement à côté
**And** elle devient obligatoire pour la soumission

**Given** je sélectionne "2" dans le radio "Travail effectué"
**When** le système traite la sélection
**Then** aucune colonne supplémentaire n'apparaît
**And** je continue directement avec les colonnes suivantes

**Given** une colonne conditionnelle est obligatoire suite à ma sélection
**When** j'essaie de soumettre sans la remplir
**Then** j'obtiens une erreur "Colonne 'Détails du travail' obligatoire car Travail effectué = Oui"
**And** le curseur se positionne sur la colonne manquante

**Given** j'ai un questionnaire complexe avec différents types de champs
**When** je demande à voir des exemples de remplissage
**Then** j'obtiens un template pré-rempli avec des exemples réalistes
**And** chaque type de champ montre comment le remplir (radio: "1", checkbox: "(2,3)", etc.)

**Given** le radio "Travail effectué" a 3 options (1=Oui, 2=Non, 3=Partiellement)
**When** je sélectionne "2" ou "3"
**Then** des colonnes conditionnelles spécifiques apparaissent pour chaque réponse
**And** chaque condition peut avoir ses propres colonnes obligatoires

**Given** je consulte le template d'exemple pour un questionnaire
**When** je clique sur "Utiliser ce template"
**Then** le questionnaire se pré-remplit avec les exemples
**And** je peux modifier les valeurs selon mes besoins réels

### Story 3.2: Validation temps réel avec corrections granulaires

As a employé corrigeant des erreurs,
I want modifier uniquement les cellules erronées,
So that je ne perde pas tout mon travail pour une petite correction.

**Acceptance Criteria:**

**Given** j'ai soumis un rapport avec des erreurs sur certaines cellules
**When** mon superviseur rejette seulement ces cellules spécifiques
**Then** je reçois une notification avec les cellules à corriger
**And** le système me redirige vers ces cellules exactes

**Given** je vois les cellules rejetées surlignées en rouge
**When** je clique sur une cellule rejetée
**Then** elle devient éditable
**And** un tooltip explique l'erreur à corriger

**Given** je corrige une cellule rejetée
**When** la correction est valide
**Then** la cellule devient verte
**And** je peux soumettre à nouveau le rapport complet

### Story 3.3: Gestion des soumissions multiples

As a employé avec questionnaires quotidiens ou événements,
I want soumettre plusieurs rapports pour le même questionnaire,
So that je puisse répondre aux exigences quotidiennes ou événementielles.

**Acceptance Criteria:**

**Given** j'ai un questionnaire quotidien assigné
**When** je le soumets le premier jour
**Then** il reste visible dans ma liste pour le lendemain
**And** l'historique de mes soumissions est accessible

**Given** je participe à un événement de 5 jours
**When** je soumets mon rapport quotidien
**Then** le questionnaire reste actif pour les jours suivants
**And** je vois mon progrès (jour 1/5, jour 2/5, etc.)

**Given** j'ai soumis un rapport pour un questionnaire quotidien
**When** je reviens le lendemain
**Then** le questionnaire apparaît à nouveau dans ma liste
**And** je peux soumettre un nouveau rapport

### Story 3.4: Interface responsive mobile/desktop

As a employé travaillant sur terrain ou bureau,
I want utiliser la même interface sur mobile et desktop,
So that mon workflow soit fluide quel que soit mon appareil.

**Acceptance Criteria:**

**Given** j'utilise un téléphone mobile (écran < 768px)
**When** j'accède à l'interface de saisie
**Then** les boutons d'action sont prioritaires en haut
**And** le tableau scroll horizontalement de manière optimisée

**Given** j'utilise un ordinateur desktop (> 1024px)
**When** je travaille sur le tableau
**Then** toutes les colonnes sont visibles simultanément
**And** l'interface maximise l'espace disponible

**Given** je change d'appareil en cours de saisie
**When** je me reconnecte
**Then** mes données non sauvegardées sont préservées
**And** je reprends exactement où j'en étais

### Story 3.5: Accessibilité WCAG 2.1 AA complète

As a employé avec besoins d'accessibilité,
I want naviguer l'interface avec un lecteur d'écran ou clavier,
So that je puisse utiliser pleinement toutes les fonctionnalités.

**Acceptance Criteria:**

**Given** j'utilise un lecteur d'écran (NVDA, JAWS, VoiceOver)
**When** je navigue dans le tableau
**Then** chaque cellule est annoncée avec son contenu et position
**And** les headers de colonnes sont clairement identifiés

**Given** je navigue au clavier uniquement
**When** je presse Tab dans le tableau
**Then** je me déplace logiquement cellule par cellule
**And** les raccourcis clavier sont annoncés

**Given** un message d'erreur apparaît
**When** je l'entends via lecteur d'écran
**Then** il est formulé en français clair
**And** contient des suggestions d'actions correctives

### Story 3.6: Messages d'erreur contextuels en français

As a employé rencontrant une erreur,
I want comprendre immédiatement le problème et comment le corriger,
So that je puisse continuer mon travail sans frustration.

**Acceptance Criteria:**

**Given** je colle des données CSV mal formatées
**When** l'erreur est détectée
**Then** le message dit "Format CSV invalide : utilisez 'colonne1, colonne2; ligne2, colonne2'"
**And** met en évidence l'exemple exact à suivre

**Given** une cellule contient une donnée invalide (âge négatif)
**When** je tente de soumettre
**Then** j'obtiens "Âge invalide : doit être un nombre positif entre 0 et 120"
**And** le curseur se positionne automatiquement sur la cellule erronée

**Given** je quitte la page sans sauvegarder
**When** le système détecte des données non sauvegardées
**Then** j'obtiens "Attention : vos données non sauvegardées seront perdues. Sauvegardez maintenant ?"
**And** les boutons Oui/Non sont clairement visibles

<!-- End story repeat -->

## Epic 4: Soumission et Suivi des Rapports
Employés, Superviseurs et Managers peuvent soumettre et suivre le statut de leurs rapports dans le système

### Story 4.1: Suivi des rapports personnels (Employés)

As a employé ayant soumis des rapports,
I want voir tous mes rapports avec leur statut actuel,
So that je sache où en est ma soumission et ce qui nécessite mon action.

**Acceptance Criteria:**

**Given** j'ai soumis plusieurs rapports aujourd'hui
**When** j'accède à "Mes rapports"
**Then** je vois la liste de tous mes rapports triés par date (plus récent en premier)
**And** chaque rapport affiche son statut (En attente ⏳, Validé ✅, Rejeté ❌)

**Given** j'ai un rapport en statut "Rejeté"
**When** je clique dessus
**Then** je vois les commentaires du superviseur expliquant les corrections requises
**And** un bouton "Corriger" me redirige vers le questionnaire avec les cellules à modifier

**Given** j'ai corrigé un rapport rejeté et le renvoyé
**When** le superviseur le valide
**Then** je reçois une notification dans l'app
**And** le statut passe à "Validé ✅" avec la date de validation

### Story 4.2: Vue d'équipe pour superviseurs

As a superviseur gérant une équipe,
I want voir tous les rapports de mon équipe et les miens,
So that je puisse suivre les soumissions et identifier qui a besoin d'aide.

**Acceptance Criteria:**

**Given** je suis superviseur d'une équipe de 5 employés
**When** j'accède au dashboard équipe
**Then** je vois tous les rapports de mes 5 employés plus mes rapports personnels
**And** un résumé avec compteurs : "15 rapports soumis, 8 validés, 4 en attente, 3 rejetés"

**Given** je vois un employé avec beaucoup de rejets
**When** je clique sur son nom
**Then** je vois le détail de ses rapports avec les raisons de rejet
**And** je peux noter mentalement de le contacter par téléphone/email externe

**Given** un employé soumet un nouveau rapport
**When** je consulte le dashboard
**Then** je vois le nouveau rapport en "En attente" avec priorité haute
**And** une notification apparaît pour que je le valide rapidement

### Story 4.3: Vue globale pour managers

As a Chef superviseur ou Manager,
I want voir tous les rapports du système avec vue d'ensemble,
So that j'aie une visibilité complète sur les opérations terrain.

**Acceptance Criteria:**

**Given** je gère 120 employés répartis en 8 équipes
**When** j'accède à la vue globale des rapports
**Then** je vois tous les rapports du système (plus de 1000 rapports)
**And** des filtres par équipe, par période, par statut, par superviseur

**Given** je veux analyser les performances par équipe
**When** je filtre par "Équipe Nord"
**Then** je vois uniquement les rapports de cette équipe
**And** des statistiques : taux de validation, temps moyen de traitement, erreurs fréquentes

**Given** je détecte un problème dans une région
**When** je vois beaucoup de rejets similaires
**Then** je peux rejeter en masse ces rapports avec le même commentaire
**And** notifier automatiquement tous les superviseurs concernés

<!-- End story repeat -->

## Epic 5: Validation Hiérarchique
Superviseurs et Managers peuvent valider/rejeter les rapports avec corrections ciblées et notifications intelligentes

### Story 5.1: Validation de base par superviseurs

As a superviseur recevant des rapports de mon équipe,
I want valider ou rejeter les rapports soumis,
So that j'assure la qualité des données avant transmission à la hiérarchie.

**Acceptance Criteria:**

**Given** un employé de mon équipe soumet un rapport
**When** j'accède à mes validations en attente
**Then** je vois le nouveau rapport en haut de la liste avec priorité haute
**And** un résumé des données soumises

**Given** j'examine un rapport soumis
**When** toutes les données sont correctes et complètes
**Then** je peux cliquer "Valider" avec un commentaire optionnel
**And** le rapport passe en statut "Validé" et est transmis automatiquement au manager

**Given** j'examine un rapport avec des erreurs
**When** je clique "Rejeter"
**Then** je dois saisir un commentaire explicatif obligatoire
**And** l'employé reçoit une notification avec les raisons du rejet

### Story 5.2: Rejet granulaire avec commentaires ciblés

As a superviseur identifiant des erreurs spécifiques,
I want rejeter uniquement les parties erronées du rapport,
So that l'employé ne perde pas son travail valide et corrige uniquement ce qui est nécessaire.

**Acceptance Criteria:**

**Given** j'examine un rapport avec erreurs sur certaines cellules
**When** je veux faire un rejet granulaire
**Then** je peux cliquer sur les cellules spécifiques à corriger
**And** elles se surlignent en rouge pour indiquer le rejet

**Given** j'ai sélectionné des cellules à corriger
**When** je valide le rejet
**Then** je dois saisir un commentaire par cellule ou groupe de cellules
**And** chaque commentaire explique précisément ce qui doit être corrigé

**Given** j'ai rejeté des cellules spécifiques
**When** l'employé reçoit la notification
**Then** il voit exactement quelles cellules sont rejetées
**And** un bouton "Corriger" le redirige directement vers ces cellules

### Story 5.3: Validation finale par superviseur

As a superviseur validant un rapport,
I want que ma validation soit considérée comme finale,
So that le workflow se termine à mon niveau sans escalade systématique.

**Acceptance Criteria:**

**Given** j'ai validé un rapport de mon équipe
**When** la validation est confirmée
**Then** le rapport passe immédiatement au statut "Validé - Finalisé"
**And** l'employé reçoit une notification de validation complète

**Given** les managers veulent consulter les rapports validés
**When** ils accèdent à la vue globale
**Then** ils voient tous les rapports validés par les superviseurs
**And** peuvent effectuer des contrôles qualité ponctuels si nécessaire

**Given** un manager détecte un problème sur un rapport déjà validé
**When** il veut le rejeter pour corrections
**Then** il peut le faire de manière exceptionnelle
**And** l'employé reçoit une notification mentionnant son superviseur
**And** le superviseur concerné reçoit une notification d'alerte qualité

### Story 5.4: Notifications intelligentes pour actions requises

As a utilisateur du système de validation,
I want recevoir des notifications pertinentes au bon moment,
So that je ne manque jamais une action importante sans être submergé.

**Acceptance Criteria:**

**Given** je suis superviseur avec des rapports en attente
**When** j'ouvre l'application
**Then** je vois un badge rouge avec le nombre de rapports nécessitant action
**And** la section "À valider" est mise en évidence

**Given** j'ai rejeté un rapport d'employé
**When** l'employé se connecte
**Then** il reçoit une notification push "Rapport rejeté - Corrections requises"
**And** un accès direct aux cellules à corriger

**Given** un employé corrige et resoumet un rapport
**When** je me connecte
**Then** je vois le rapport resoumis en priorité
**And** une indication "Corrigé - Prêt pour revalidation"

### Story 5.5: Corrections et resoumission par employés

As a employé dont le rapport a été rejeté,
I want corriger uniquement les parties rejetées,
So that je ne refasse pas tout le travail déjà validé.

**Acceptance Criteria:**

**Given** mon superviseur a rejeté des cellules spécifiques
**When** je clique sur "Corriger" dans la notification
**Then** je suis redirigé vers le questionnaire avec les cellules rejetées surlignées
**And** les cellules déjà validées sont verrouillées en lecture seule

**Given** je corrige les cellules rejetées
**When** toutes les corrections sont faites
**Then** un bouton "Resoumettre" apparaît
**And** je peux ajouter un commentaire expliquant les corrections apportées

**Given** je resoumet le rapport corrigé
**When** le superviseur le revalide
**Then** le workflow complet recommence depuis la validation superviseur
**And** l'historique conserve toutes les itérations pour traçabilité

<!-- End story repeat -->

## Epic 6: Analytics et Insights
Superviseurs voient les statistiques d'équipe, Managers analysent globalement avec tri/filtrage/export

### Story 6.1: Dashboard statistiques équipe (Superviseurs)

As a superviseur gérant une équipe,
I want voir les statistiques de performance de mon équipe,
So that j'identifie rapidement qui a besoin d'aide et les tendances générales.

**Acceptance Criteria:**

**Given** je gère une équipe de 5 employés
**When** j'accède au dashboard équipe
**Then** je vois un résumé visuel avec :
- Nombre total de rapports soumis cette semaine
- Taux de validation moyen de l'équipe
- Top 3 des employés les plus performants
- Alertes pour employés avec taux de rejet > 20%

**Given** je veux analyser un employé spécifique
**When** je clique sur son nom dans les statistiques
**Then** je vois son évolution sur les 4 dernières semaines
**And** les types d'erreurs les plus fréquentes dans ses rapports

**Given** je détecte un employé en difficulté
**When** je vois ses statistiques
**Then** je peux prendre note de le contacter par canal externe
**And** suivre son évolution dans les semaines suivantes

### Story 6.2: Tri et filtrage avancé (Managers)

As a Chef superviseur ou Manager,
I want trier et filtrer les rapports selon mes besoins d'analyse,
So that j'extraie facilement les insights dont j'ai besoin.

**Acceptance Criteria:**

**Given** j'ai accès à plus de 1000 rapports
**When** j'utilise les filtres avancés
**Then** je peux filtrer par :
- Équipe ou superviseur
- Période (aujourd'hui, cette semaine, ce mois)
- Statut (validé, rejeté, en attente)
- Type de questionnaire

**Given** je veux analyser par équipe
**When** je trie par "Équipe" puis par "Taux de validation"
**Then** je vois un classement des équipes par performance
**And** je peux identifier les équipes qui ont besoin de formation

**Given** je détecte un problème récurrent
**When** je filtre par "Erreurs similaires"
**Then** je vois tous les rapports avec le même type d'erreur
**And** je peux analyser la cause racine du problème

### Story 6.3: Recherche globale dans les données

As a Chef superviseur ou Manager,
I want rechercher des informations spécifiques dans tous les rapports,
So that je trouve rapidement les données dont j'ai besoin sans naviguer manuellement.

**Acceptance Criteria:**

**Given** je cherche un rapport spécifique
**When** j'utilise la recherche globale
**Then** je peux rechercher par :
- Nom d'employé ou numéro de téléphone
- Contenu des cellules (ex: "Bamako", "micro-crédit")
- Numéro de rapport ou date

**Given** je cherche tous les rapports d'un quartier
**When** je tape "Bamako" dans la recherche
**Then** je vois tous les rapports contenant "Bamako" dans n'importe quelle colonne
**And** résultats triés par pertinence

**Given** je veux voir l'historique d'un employé
**When** je recherche son numéro de téléphone
**Then** tous ses rapports apparaissent chronologiquement
**And** je peux voir son évolution et ses erreurs récurrentes

### Story 6.4: Export Excel/CSV avec données filtrées

As a Chef superviseur ou Manager,
I want exporter les données filtrées au format Excel,
So that j'utilise les données dans mes outils d'analyse habituels.

**Acceptance Criteria:**

**Given** j'ai appliqué des filtres spécifiques (équipe + période + statut)
**When** je clique sur "Exporter Excel"
**Then** un fichier Excel est généré avec exactement les données filtrées
**And** la structure des colonnes est préservée

**Given** je veux analyser dans Excel
**When** j'ouvre le fichier exporté
**Then** les colonnes correspondent exactement à la structure du questionnaire
**And** les formules Excel peuvent être appliquées directement

**Given** j'exporte pour un usage spécifique
**When** je choisis "Exporter avec métadonnées"
**Then** le fichier inclut des colonnes supplémentaires :
- Date de soumission et validation
- Nom du superviseur et manager
- Commentaires de validation

**Given** l'export est volumineux (> 5000 lignes)
**When** je lance l'export
**Then** je reçois une notification quand il est prêt
**And** un lien de téléchargement sécurisé

<!-- End story repeat -->