---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-ReportFlow-2026-01-06.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-06.md'
  - '_bmad-output/planning-artifacts/project-description.md'
briefCount: 1
researchCount: 0
brainstormingCount: 1
projectDocsCount: 1
workflowType: 'prd'
lastStep: 11
completionDate: '2026-01-08'
status: 'completed'
---

# Product Requirements Document - ReportFlow

**Author:** Blackat
**Date:** 2026-01-08

## Executive Summary

ReportFlow est une application web qui élimine la répétition fatigante de la saisie de rapports pour les équipes terrain. Alors que les employés doivent actuellement remplir le même formulaire Google Forms 50+ fois pour chaque journée de travail, ReportFlow permet la saisie en masse via copier-coller CSV et la correction granulaire des erreurs sans refaire tout le rapport. L'application transforme un processus fastidieux et sujet aux erreurs en un workflow fluide et efficace, tout en maintenant un système de validation hiérarchique pour assurer la qualité des données.

### What Makes This Special

ReportFlow se distingue par sept innovations clés qui résolvent les limitations fondamentales des solutions existantes :

1. **Copier-Coller CSV Intelligent** : Format standardisé (`", "` pour colonnes, `";"` pour lignes) permettant une transition fluide des notes terrain vers la saisie dans l'application, éliminant la répétition pour 50+ entrées.

2. **Correction Granulaire sans Refaire Tout** : Innovation clé permettant de corriger uniquement la partie erronée (lignes/colonnes spécifiques) plutôt que de refaire entièrement le rapport, économisant un temps considérable.

3. **Workflow Hiérarchique Optimisé** : Simplification intelligente à 2 niveaux de validation (Employé → Superviseur → Chef/Manager) au lieu de 3, avec confiance dans la hiérarchie plutôt que validation explicite à chaque niveau.

4. **Interface Hybride Mobile + PC** : Mêmes fonctionnalités sur mobile (terrain) et PC (bureau), optimisée pour le workflow terrain → bureau.

5. **Analytics Différenciées par Rôle** : Superviseurs bénéficient de statistiques d'équipe pour le management proactif, tandis que Chefs/Managers ont accès à une vue globale avec graphiques interactifs et export Excel.

6. **Priorité Inversée (Action-First)** : Affichage par défaut des rapports nécessitant action avant chronologique, réduisant le temps pour trouver ce qui nécessite attention.

7. **Gestion Flexible des Questionnaires** : Les Chefs superviseurs/Managers peuvent créer et distribuer des questionnaires avec plusieurs modalités : ciblés (individuels), collectifs (tous les employés/superviseurs), par groupe/équipe, et pour événements avec équipes composées, offrant une adaptabilité organisationnelle maximale.

## Project Classification

**Technical Type:** web_app
**Domain:** general
**Complexity:** low-medium
**Project Context:** Brownfield - extending existing system

ReportFlow est une application web moderne (SPA/PWA) avec interface responsive optimisée pour mobile et desktop. Le projet s'intègre dans une architecture système existante, nécessitant une compréhension des patterns et de l'architecture actuels pour assurer une intégration harmonieuse des nouvelles fonctionnalités. La complexité est modérée, avec un workflow hiérarchique clair mais nécessitant une gestion fine des permissions et des rôles utilisateurs.

## User Journeys

### Journey Employé : Fatoumata Traoré - De la répétition frustrante à la saisie fluide

Fatoumata est une agente de terrain de 28 ans qui approche 60 clients par jour dans les quartiers populaires de Bamako. Chaque soir, elle rentre épuisée au bureau pour passer 2h30 à remplir le même formulaire Google Forms 60 fois. "C'est toujours la même case numéro de téléphone, la même case âge, les mêmes questions sur les besoins en microfinance... Je pourrais le faire les yeux fermés, mais je dois tout répéter", confie-t-elle à ses collègues.

Un lundi matin, son superviseur lui présente ReportFlow. Sceptique au début ("Encore une nouvelle application à apprendre"), Fatoumata découvre l'interface avec étonnement. Elle prend ses notes de la journée - "76000000, 25-35 ans, besoin micro-crédit; 76111111, 35-45 ans, formation agricole..." - et les copie-colle dans le champ prévu. En une seconde, un tableau Excel-like apparaît avec toutes ses données parfaitement organisées.

Le lendemain, au lieu de ses 2h30 habituelles, elle finit en 12 minutes. Pour la première fois depuis des mois, elle rentre chez elle à une heure décente. Quelques jours plus tard, quand son superviseur rejette deux lignes de son rapport pour données manquantes, elle reçoit une notification et corrige uniquement ces deux cellules en 30 secondes, sans refaire tout le rapport.

Trois mois plus tard, Fatoumata approche plus de clients, sourit plus aux collègues, et dit à qui veut l'entendre : "C'est comme si on m'avait rendu 2h de vie par jour. Je peux enfin me concentrer sur les vraies conversations avec les clients plutôt que sur la saisie administrative."

### Journey Superviseur : Amadou Diallo - Du management réactif au management proactif

Amadou gère une équipe de 15 agents de terrain depuis 3 ans. Chaque matin, il passe 30 minutes à faire des appels téléphoniques pour savoir qui a envoyé ses rapports, qui a eu des problèmes, qui a besoin d'aide. "Je découvre souvent les problèmes après coup, quand les objectifs sont déjà impactés", explique-t-il. Ses journées sont rythmées par des appels réactifs plutôt que du management proactif.

L'adoption de ReportFlow change tout. Dès la première semaine, Amadou voit apparaître un dashboard avec les statistiques de son équipe : Fatoumata a envoyé 12 rapports cette semaine, Moussa seulement 3, Aïssata a 40% de rejets. Il identifie immédiatement Moussa qui semble avoir des difficultés et l'appelle pour du coaching ciblé avant que cela n'impacte les objectifs.

Le workflow de validation devient fluide : il reçoit les rapports, les valide rapidement avec des commentaires précis sur les quelques erreurs détectées. Plus d'appels pour demander "As-tu envoyé ton rapport ?" - tout est visible en temps réel. Quand un employé a beaucoup de rejets, il le voit immédiatement et peut intervenir.

Six mois plus tard, Amadou passe moins de temps au téléphone et plus de temps sur le terrain avec son équipe. "Avant, je gérais les crises. Maintenant, je développe mes talents. ReportFlow m'a transformé d'un pompier en un vrai manager."

### Journey Chef superviseur : Kadiatou Konaté - De la gestion opérationnelle à l'optimisation des processus

Kadiatou est chef superviseur depuis 5 ans, responsable de 120 employés répartis en 8 équipes. Elle crée les questionnaires selon les besoins des programmes de développement, les distribue, puis passe des heures à trier manuellement les réponses dans Excel. "Je perds un temps fou à organiser les données avant de pouvoir les analyser", dit-elle. Ses décisions stratégiques sont retardées par le traitement manuel des données.

Avec ReportFlow, Kadiatou découvre une nouvelle façon de travailler. Elle crée ses questionnaires directement dans l'interface avec une structure tableau intuitive. Au lieu de distribuer via email, elle assigne les questionnaires par équipe ou individuellement selon les besoins. Pour un programme spécial dans le district de Koulikoro, elle crée une équipe temporaire et leur assigne un questionnaire dédié.

Les rapports arrivent automatiquement validés par les superviseurs. Kadiatou peut maintenant trier, filtrer et analyser directement dans l'application. Quand elle voit qu'un district a un taux de rejet élevé, elle identifie immédiatement le problème et optimise le questionnaire. Les graphiques interactifs lui permettent de visualiser les tendances par équipe, par période, par district.

"Avant, j'étais engluée dans le traitement des données. Maintenant, je peux me concentrer sur l'optimisation des processus et la stratégie. ReportFlow a transformé mon rôle de data-entry à data-driven decision maker."

### Journey Manager : Ibrahim Maïga - De la prise de décision manuelle à l'analyse stratégique

Ibrahim est manager depuis 8 ans, responsable de toute l'organisation terrain avec 500+ employés. Il prend ses décisions basées sur des exports Excel laborieux et des tableaux croisés manuels. "Je passe plus de temps à préparer les données qu'à les analyser", confie-t-il. Ses décisions stratégiques arrivent souvent trop tard car les données mettent du temps à être consolidées.

ReportFlow révolutionne sa façon de travailler. Dès le premier mois, il a accès à tous les rapports validés avec une vue d'ensemble complète. Il peut trier par région, par équipe, par période en quelques clics. Les graphiques camembert lui montrent immédiatement la répartition des réponses par district, par équipe, par statut de validation.

Quand il détecte un problème dans une région, il peut rejeter des rapports spécifiques avec des commentaires qui alertent automatiquement les superviseurs concernés. Plus besoin d'appels téléphoniques ou d'emails - tout se fait dans l'application avec traçabilité.

Douze mois plus tard, Ibrahim prend des décisions stratégiques en temps réel. "ReportFlow m'a donné la visibilité que j'attendais depuis des années. Je peux maintenant optimiser les déploiements, ajuster les stratégies par région, et prendre des décisions data-driven plutôt que basées sur des intuitions. C'est comme avoir un tableau de bord stratégique en temps réel."

## Journey Requirements Summary

Ces journeys révèlent les capacités essentielles de ReportFlow :

### Pour les Employés :
- Interface de saisie en masse avec copier-coller CSV
- Correction granulaire sans refaire tout le rapport
- Notifications pour actions requises
- Vue "mes rapports nécessitant action"

### Pour les Superviseurs :
- Dashboard statistiques équipe en temps réel
- Interface de validation avec commentaires ciblés
- Identification automatique des besoins d'aide
- Gestion des rapports équipe + personnels

### Pour les Chefs superviseurs :
- Création intuitive de questionnaires avec structure tableau
- Distribution flexible (ciblée, collective, par groupe, événements)
- Gestion des questionnaires existants
- Tri/filtres/recherche avancés

### Pour les Managers :
- Vue globale sur tous les rapports
- Graphiques interactifs pour analyses stratégiques
- Export Excel/CSV avec données filtrées
- Rejet granulaire avec notifications automatiques
- Gestion des équipes temporaires pour événements

## Web App Specific Requirements

### Project-Type Overview

ReportFlow est une application web moderne (SPA/PWA) conçue pour optimiser le workflow de collecte et validation de données terrain au Mali. L'architecture privilégie la performance, la réactivité et l'accessibilité pour supporter efficacement la saisie de données en masse et l'interface tableau interactive.

### Technical Architecture Considerations

**Architecture SPA (Single Page Application)** : ReportFlow utilise une architecture SPA moderne pour offrir une expérience fluide et réactive. Les transitions entre les vues se font sans rechargement de page, optimisant l'expérience utilisateur lors de la navigation entre questionnaires, rapports et tableaux de bord.

**Progressive Web App (PWA)** : L'application peut être installée sur mobile et desktop, offrant une expérience native-like avec accès hors-ligne limité aux fonctionnalités critiques de consultation des rapports.

**Architecture de données optimisée** : Utilisation d'une base de données relationnelle pour gérer les relations complexes entre questionnaires, utilisateurs, équipes et rapports. Mise en place d'index stratégiques pour optimiser les requêtes de tri/filtrage sur les rapports.

### Browser Matrix

**Navigateurs supportés :**
- Chrome/Chromium 90+ (recommandé pour les meilleures performances)
- Firefox 88+
- Safari 14+ (iOS/macOS)
- Edge 90+

**Navigateurs non supportés :**
- Internet Explorer 11 et versions antérieures
- Navigateurs mobiles obsolètes (Android < 8.0)

**Considérations de compatibilité :**
- Utilisation de Web APIs modernes (Clipboard API pour copier-coller, File API pour export)
- Fallbacks gracieux pour les navigateurs moins récents
- Tests automatisés de compatibilité browser

### Responsive Design

**Breakpoints stratégiques :**
- Mobile : < 768px (priorité pour la saisie terrain)
- Tablet : 768px - 1024px
- Desktop : > 1024px

**Design adaptatif :**
- Interface tableau responsive avec scroll horizontal optimisé sur mobile
- Boutons d'action prioritaires en haut sur mobile
- Optimisation de la zone de copier-coller pour claviers mobiles
- Menus déroulants adaptés à la taille d'écran

**Performance mobile :**
- Optimisation du poids des bundles JavaScript
- Lazy loading des composants non critiques
- Cache intelligent pour les questionnaires fréquemment utilisés

### Performance Targets

**Temps de chargement :**
- Première visite : < 3 secondes (chargement initial optimisé)
- Navigation interne : < 1 seconde (SPA benefits)
- Traitement copier-coller CSV : < 1 seconde pour 50+ lignes

**Performance critique :**
- Saisie en masse : traitement instantané du copier-coller
- Validation temps réel : feedback immédiat sans latence perceptible
- Tri/filtrage : réponse < 500ms même avec 1000+ rapports

**Métriques de performance :**
- Core Web Vitals : LCP < 2.5s, FID < 100ms, CLS < 0.1
- Lighthouse Performance Score : > 85
- Bundle size : < 500KB gzipped pour le JavaScript critique

### SEO Strategy

**SEO limité nécessaire :**
ReportFlow étant une application métier avec authentification, le SEO public n'est pas prioritaire. Focus sur l'optimisation interne et la découvrabilité organisationnelle.

**Stratégies appliquées :**
- Meta tags appropriés pour l'application
- Structured data pour les questionnaires (si nécessaire)
- Sitemap pour la navigation interne
- Optimisation des titres de page pour la navigation

### Accessibility Level

**Niveau d'accessibilité : WCAG 2.1 AA**
- Conformité aux standards gouvernementaux maliens et internationaux
- Focus sur l'accessibilité pour les utilisateurs en situation de handicap

**Fonctionnalités d'accessibilité critiques :**
- Navigation au clavier complète (tab order logique)
- Lecteurs d'écran supportés (NVDA, JAWS, VoiceOver)
- Contraste de couleurs suffisant (> 4.5:1)
- Labels et descriptions appropriés pour tous les éléments interactifs
- Support des technologies d'assistance

**Interface tableau accessible :**
- Navigation au clavier dans le tableau (flèches directionnelles)
- Headers de colonnes lisibles par les lecteurs d'écran
- Indicateurs visuels et textuels pour les états (validé, rejeté, en attente)

### Implementation Considerations

**Technologies recommandées :**
- Frontend : React/Next.js pour SPA avec SSR/SSG
- État : Zustand ou Redux Toolkit pour la gestion d'état complexe
- API : RESTful avec GraphQL pour les requêtes complexes
- Base de données : PostgreSQL pour les relations complexes
- Déploiement : Vercel/Netlify pour optimisation automatique

**Considérations de sécurité :**
- Authentification JWT avec refresh tokens
- Autorisation basée sur les rôles (Employé, Superviseur, Chef superviseur, Manager)
- Chiffrement des données sensibles
- Protection CSRF et XSS

**Scalabilité :**
- Architecture modulaire pour évolution future
- API design permettant l'ajout de nouvelles fonctionnalités
- Cache stratégique (Redis) pour les données fréquemment consultées
- Monitoring et logging complets pour les performances

## Success Criteria

### User Success

#### Employés (Agents de terrain)

**Gain de temps :**
- Réduction de 70-80% du temps de saisie (de 1-2 heures à 15-30 minutes pour 50+ clients)
- Objectif : Employés gagnent 1h+ par jour pour se concentrer sur l'approche clients

**Adoption et utilisation :**
- 80%+ des rapports envoyés utilisent le copier-coller CSV (vs saisie manuelle ligne par ligne)
- Taux d'adoption : 80%+ des employés utilisent ReportFlow régulièrement (envoi ≥ 1 rapport/semaine)

**Correction d'erreurs :**
- 90%+ des erreurs corrigées en moins de 5 minutes (vs refaire tout le rapport avec Google Forms)
- Temps moyen de correction : < 5 minutes par erreur

**Satisfaction :**
- 4/5+ sur la facilité d'utilisation vs Google Forms
- 4.5/5+ de satisfaction globale après 3 mois d'utilisation

#### Superviseurs

**Engagement et visibilité :**
- Consultation du dashboard 3+ fois par semaine
- 70%+ des problèmes identifiés avant notification du chef/manager (management proactif)

**Efficacité de validation :**
- Validation/rejet des rapports dans les 24h suivant réception
- Taux de validation : 90%+ des rapports validés sans rejet

**Impact sur objectifs :**
- Réduction de 50%+ des répercussions sur les objectifs grâce à la visibilité en temps réel

#### Chefs superviseurs / Managers

**Efficacité d'analyse :**
- 50%+ de réduction des exports Excel (analyse directe dans l'app)
- Réduction de 40%+ du temps pour trier/analyser les rapports

**Communication d'erreurs :**
- 80%+ des erreurs communiquées via notification automatique (vs appels téléphoniques/tableaux Excel)
- Temps de communication d'erreur : < 1 minute (vs processus manuel)

**Qualité des données :**
- Réduction de 50%+ des erreurs non corrigées
- Taux de correction : 90%+ des erreurs corrigées dans les 24h

### Business Success

#### Objectifs 3 mois

**Adoption :**
- 80%+ des employés utilisent ReportFlow régulièrement
- 70%+ des superviseurs consultent le dashboard hebdomadairement
- 90%+ des chefs/managers utilisent les fonctionnalités d'analyse

**Productivité :**
- Gain de temps moyen de 1h+ par employé par jour
- Réduction de 70-80% du temps de saisie pour les employés
- Augmentation du temps disponible pour approche clients

**Qualité :**
- Réduction de 50%+ des erreurs non corrigées
- 90%+ des erreurs corrigées en moins de 5 minutes
- Amélioration de la qualité globale des données collectées

#### Objectifs 12 mois

**Adoption complète :**
- 95%+ des équipes utilisent ReportFlow comme solution principale
- Rétention : 90%+ des utilisateurs continuent après 1 an
- Satisfaction : 4.5/5+ de satisfaction globale utilisateurs

**ROI et productivité :**
- Économie de temps équivalente à X heures/jour × nombre d'employés
- ROI mesurable : Coût du temps économisé vs coût de la solution
- Augmentation de la productivité terrain (plus de temps pour approche clients)

**Impact organisationnel :**
- Réduction significative des coûts liés aux erreurs et corrections
- Amélioration de la qualité des données pour prise de décision
- Optimisation des processus organisationnels

### Technical Success

**Performance :**
- Temps de chargement de l'interface : < 2 secondes
- Réactivité de l'interface lors de la saisie en masse (50+ entrées) : pas de lag perceptible
- Traitement du copier-coller CSV : validation et création du tableau en < 1 seconde pour 50+ lignes

**Disponibilité :**
- Uptime cible : 99%+ pendant les heures de travail (8h-20h)
- Gestion gracieuse des erreurs avec messages clairs pour l'utilisateur

**Scalabilité :**
- Support de 100+ utilisateurs simultanés
- Gestion de 1000+ rapports par jour sans dégradation de performance
- Architecture extensible pour croissance future

**Sécurité :**
- Authentification sécurisée par rôle
- Protection des données utilisateur
- Validation et sanitization des entrées utilisateur

**Intégration :**
- Export Excel/CSV fonctionnel et fiable
- Format compatible avec outils existants (même facilité que Google Forms)

### Measurable Outcomes

#### KPI Engagement

**Taux d'adoption :**
- % d'employés actifs (envoi ≥ 1 rapport/semaine)
- Objectif 3 mois : 80%+
- Objectif 12 mois : 95%+

**Fréquence d'utilisation :**
- Nombre moyen de rapports envoyés par employé par semaine
- Objectif : Maintenir ou augmenter vs Google Forms

**Rétention :**
- % d'utilisateurs qui continuent après 1 mois
- Objectif : 90%+

**Engagement superviseurs :**
- Nombre moyen de consultations dashboard par semaine
- Objectif : 3+ consultations par semaine

#### KPI Efficacité

**Temps moyen de saisie :**
- De X minutes (Google Forms) à Y minutes (ReportFlow) pour 50 clients
- Objectif : Réduction de 70-80% (de 1-2h à 15-30 min)

**Taux d'utilisation copier-coller :**
- % de rapports utilisant copier-coller CSV vs saisie manuelle
- Objectif : 80%+ utilisent copier-coller

**Temps de correction :**
- Temps moyen pour corriger une erreur
- Objectif : < 5 minutes par erreur

**Temps de validation :**
- Temps moyen entre réception et validation/rejet par superviseur
- Objectif : < 24h

#### KPI Qualité

**Taux d'erreurs :**
- % de rapports avec erreurs détectées
- Objectif : Réduction de 50%+ vs Google Forms

**Taux de correction :**
- % d'erreurs corrigées dans les 24h
- Objectif : 90%+

**Taux de validation :**
- % de rapports validés sans rejet
- Objectif : 90%+

**Taux d'erreurs non corrigées :**
- % d'erreurs qui restent non corrigées
- Objectif : Réduction de 50%+ vs processus actuel

#### KPI Business

**Gain de temps total :**
- Heures économisées par jour × nombre d'employés
- Calculable : (Temps Google Forms - Temps ReportFlow) × Nombre employés × Jours

**Réduction coûts :**
- Coût du temps économisé (calculable avec coût horaire)
- ROI : (Économie temps × Coût horaire) - Coût solution

**Productivité terrain :**
- Augmentation du temps disponible pour approche clients
- Objectif : 1h+ par employé par jour

**Réduction exports Excel :**
- % de réduction des exports Excel (analyse directe dans l'app)
- Objectif : 50%+ de réduction

**Communication d'erreurs :**
- % d'erreurs communiquées via notification vs processus manuel
- Objectif : 80%+ via notification automatique

## Product Scope

### MVP - Minimum Viable Product

Le MVP de ReportFlow inclut les fonctionnalités essentielles pour résoudre le problème principal de répétition et permettre la correction granulaire :

**1. Gestion des Questionnaires (Chef superviseur/Manager)**
- Création de questionnaires avec structure tableau (lignes/colonnes)
- Définition des colonnes/champs avec validation
- Distribution/assignation aux employés et superviseurs (ciblés, collectifs, par groupe, événements)
- Gestion des questionnaires existants (modification, désactivation)

**2. Interface de Saisie (Employés)**
- Interface tableau style Excel avec lignes/colonnes
- Copier-coller CSV avec format standardisé (`", "` pour colonnes, `";"` pour lignes)
- Validation automatique du format avec messages d'erreur explicites
- Saisie manuelle hybride (ajout/suppression de lignes, édition inline)
- Validation stricte en temps réel

**3. Workflow de Validation Hiérarchique Simplifié**
- Flux : Employé → Superviseur (valide/rejette) → Chef/Manager (voit/rejette/exporte)
- Rejet granulaire (colonnes/lignes spécifiques)
- Indicateurs visuels (✓ vert validé, ✗ rouge rejeté)
- Notifications dans l'app pour rapports nécessitant action

**4. Permissions et Accès par Rôle**
- Employés : leurs questionnaires et rapports
- Superviseurs : équipe + personnels, validation/rejet, statistiques basiques
- Chefs/Managers : création questionnaires, tous rapports, export Excel

**5. Export Excel (Chef/Manager)**
- Export CSV/XLSX avec données filtrées/triées
- Format compatible Excel

**6. Tri/Filtres/Recherche Basiques**
- Tri par colonne (multi-colonnes)
- Filtres par statut, date, équipe
- Recherche globale dans les données

**Critères de succès MVP :**
- 70%+ d'adoption employés
- 80%+ utilisation copier-coller CSV
- Réduction de 70%+ du temps de saisie
- 90%+ erreurs corrigées en < 5 minutes
- 90%+ rapports validés dans les 24h
- Satisfaction 4/5+ vs Google Forms

### Growth Features (Post-MVP)

**Phase 2 - Améliorations :**

**Dashboard statistiques avancées pour superviseurs :**
- Statistiques équipe en temps réel (nombre rapports par employé, taux validation/rejet, évolution)
- Identification automatique des besoins d'aide (employés avec peu de rapports ou beaucoup de rejets)
- Comparaison entre membres de l'équipe

**Graphiques camembert interactifs :**
- Visualisations graphiques (répartition quartiers, équipes, validation/rejet)
- Interactivité : clic sur segment camembert → filtre le tableau correspondant
- Synchronisation bidirectionnelle : tableau ↔ graphiques ↔ filtres

**Priorité d'affichage inversée :**
- Système de priorité simple : Rejetés (rouge) → En attente (orange) → Validés (vert/gris)
- Vue par défaut : rapports nécessitant action avant chronologique
- Options de tri : "Par priorité" (défaut) ou "Par date"

**Section rapports rejetés séparée :**
- Vue dédiée pour rapports rejetés (chefs/managers)
- Séparation claire : Rapports validés vs Rapports rejetés
- Suivi des corrections et ré-soumissions

**Avertissement quitter sans soumettre :**
- Protection améliorée contre perte accidentelle de travail
- Sauvegarde automatique optionnelle (draft)

**Mobile-first optimizations :**
- Optimisations spécifiques mobile au-delà de l'interface responsive

### Vision (Future)

**Phase 3 - Extensions Avancées :**

**Détection automatique d'anomalies :**
- Détection de patterns suspects ou incohérences dans les données
- Alertes automatiques pour anomalies détectées
- Seuils temporels pour alertes personnalisables

**Templates de questionnaires réutilisables :**
- Bibliothèque de templates de questionnaires
- Réutilisation de questionnaires existants pour nouveaux contextes
- Questionnaires périodiques avec planification automatique

**Personnalisation préférences utilisateur :**
- Personnalisation de l'interface selon préférences
- Préférences de tri/filtres sauvegardées
- Personnalisation des seuils et alertes

**Notifications avancées :**
- Email/SMS notifications (au-delà des notifications dans l'app)
- Personnalisation des notifications par utilisateur
- Rappels et alertes programmées

**Export avancé :**
- Export de graphiques avec les données
- Formats d'export multiples (PDF, Excel, CSV)
- Export programmé automatique

**Intégrations :**
- Intégrations avec autres outils organisationnels
- API pour intégrations tierces
- Webhooks pour événements

**Analytics avancées :**
- Analytics prédictives
- Tendances et prévisions
- Rapports automatisés

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach : Problem-Solving MVP**
ReportFlow adopte une stratégie MVP centrée sur la résolution du problème principal : l'élimination de la répétition fatigante dans la saisie de rapports. Le focus est sur la valeur utilisateur immédiate plutôt que sur l'exhaustivité des fonctionnalités.

**Raisonnement stratégique :**
- Le problème de répétition est clairement identifié et douloureux
- La solution (copier-coller CSV + correction granulaire) est directement adressable
- Permet une validation rapide de la valeur auprès des utilisateurs terrain
- Réduction immédiate du temps de saisie (70-80%) comme preuve de concept

**Resource Requirements :**
- Équipe : 4-6 personnes (2 développeurs frontend, 1 développeur backend, 1 designer UX, 1 PM, 1 QA)
- Timeline MVP : 3-4 mois de développement actif
- Budget : Priorité sur les fonctionnalités core, architecture scalable mais simple

### MVP Feature Set (Phase 1)

**Core User Journeys Supported :**
- **Journey Employé** : De la répétition à la saisie fluide (priorité absolue)
- **Journey Superviseur** : Validation de base avec commentaires simples
- **Journey Chef superviseur** : Création basique de questionnaires

**Must-Have Capabilities (absolues pour le succès) :**

**1. Gestion des Questionnaires (Chef superviseur/Manager)**
- ✅ Création de questionnaires avec structure tableau (lignes/colonnes)
- ✅ Définition des colonnes/champs avec validation de base
- ✅ Distribution ciblée à des employés spécifiques
- ✅ Gestion basique (modification, désactivation)

**2. Interface de Saisie (Employés)**
- ✅ Interface tableau style Excel avec lignes/colonnes
- ✅ Copier-coller CSV avec format standardisé (`", "` pour colonnes, `";"` pour lignes)
- ✅ Validation automatique du format avec messages d'erreur explicites
- ✅ Saisie manuelle hybride (ajout/suppression de lignes, édition inline)
- ✅ Validation stricte en temps réel

**3. Workflow de Validation Hiérarchique Simplifié**
- ✅ Flux : Employé → Superviseur (valide/rejette) → Chef/Manager (voit/rejette)
- ✅ Rejet granulaire (lignes spécifiques)
- ✅ Indicateurs visuels simples (✓ vert validé, ✗ rouge rejeté)
- ✅ Notifications basiques dans l'app

**4. Permissions et Accès par Rôle**
- ✅ Authentification par rôle (Employé, Superviseur, Chef superviseur, Manager)
- ✅ Accès limité selon le rôle (employés voient leurs rapports, superviseurs voient leur équipe)
- ✅ Export Excel basique pour les chefs/managers

**5. Infrastructure Technique Essentielle**
- ✅ Application web responsive (mobile + desktop)
- ✅ Base de données pour stocker questionnaires et rapports
- ✅ Authentification sécurisée
- ✅ Performance acceptable (< 3s de chargement)

**Critères de lancement MVP :**
- ✅ 70%+ d'adoption employés (envoi ≥ 1 rapport/semaine)
- ✅ 80%+ utilisation copier-coller CSV
- ✅ Réduction de 70%+ du temps de saisie
- ✅ 90%+ erreurs corrigées en < 5 minutes
- ✅ 90%+ rapports validés dans les 24h
- ✅ Satisfaction utilisateur > 4/5 vs Google Forms

### Post-MVP Features

**Phase 2 (Growth - 3-6 mois après lancement) :**

**Dashboard et Analytics :**
- Dashboard statistiques pour superviseurs (nombre rapports par employé, taux validation/rejet)
- Graphiques camembert interactifs pour chefs/managers
- Tri/filtres/recherche avancés
- Notifications avancées (email/SMS optionnel)

**Fonctionnalités de Gestion :**
- Gestion d'équipes et groupes
- Templates de questionnaires réutilisables
- Historique et traçabilité des modifications
- Section rapports rejetés séparée

**Améliorations UX :**
- Priorité d'affichage inversée (action-first)
- Avertissement quitter sans soumettre
- Personnalisation interface utilisateur
- Mode hors-ligne basique

**Phase 3 (Expansion - 6-12 mois après lancement) :**

**Fonctionnalités Avancées :**
- Détection automatique d'anomalies
- Analytics prédictives et tendances
- Intégrations avec autres systèmes (API, webhooks)
- Support multi-organisations

**Scalabilité et Performance :**
- Support de milliers d'utilisateurs simultanés
- Optimisations de performance avancées
- Architecture multi-tenant
- Internationalisation (support d'autres pays)

**Nouvelles Fonctionnalités :**
- Application mobile native (iOS/Android)
- Intelligence artificielle pour suggestions
- Personnalisation avancée et workflows custom
- Marketplace de templates

### Risk Mitigation Strategy

**Technical Risks :**
- **Risque :** Performance dégradée avec gros volumes de données
- **Mitigation :** Architecture optimisée dès le départ, tests de performance continus, monitoring en production
- **Plan B :** Pagination et limitation des résultats si nécessaire

**Market Risks :**
- **Risque :** Adoption plus lente que prévu
- **Mitigation :** Focus sur les early adopters (équipes terrain), démonstration de ROI claire, support client proactif
- **Validation :** Tests pilotes avec équipes réelles avant lancement général

**Resource Risks :**
- **Risque :** Équipe plus petite que prévu
- **Mitigation :** Scope MVP strict, fonctionnalités différées clairement identifiées, architecture modulaire
- **Contingency :** Lancement avec fonctionnalités réduites mais complètes pour les core journeys

**Strategic Risk Mitigation :**
- **Mesure continue :** KPIs de succès définis avec seuils clairs
- **Points de décision :** Critères explicites pour passer en Phase 2
- **Flexibilité :** Architecture permettant l'ajout progressif de fonctionnalités
- **Feedback loops :** Collecte continue des retours utilisateurs pour priorisation

## Functional Requirements

### Gestion des Questionnaires

**FR1:** Chefs superviseurs et Managers peuvent créer des questionnaires avec structure tableau définissant les colonnes et types de données requis

**FR2:** Chefs superviseurs et Managers peuvent modifier les questionnaires existants en ajoutant, supprimant ou modifiant des colonnes

**FR3:** Chefs superviseurs et Managers peuvent désactiver des questionnaires sans les supprimer

**FR4:** Chefs superviseurs et Managers peuvent assigner des questionnaires à des employés spécifiques (distribution ciblée)

**FR5:** Chefs superviseurs et Managers peuvent assigner des questionnaires à tous les employés d'un rôle (distribution collective)

**FR6:** Chefs superviseurs et Managers peuvent créer des équipes temporaires pour des événements et leur assigner des questionnaires dédiés

**FR7:** Employés peuvent voir la liste des questionnaires qui leur sont assignés

**FR8:** Superviseurs peuvent voir les questionnaires assignés à leur équipe et à eux-mêmes

**FR9:** Chefs superviseurs et Managers peuvent voir tous les questionnaires du système avec leur statut d'assignation

### Saisie et Gestion des Rapports

**FR10:** Employés peuvent saisir des données via copier-coller CSV en utilisant le format standardisé (virgule+espace pour colonnes, point-virgule pour lignes)

**FR11:** Le système valide automatiquement le format CSV et affiche des messages d'erreur explicites pour les erreurs de format

**FR12:** Employés peuvent ajouter manuellement des lignes individuelles dans le tableau après un copier-coller CSV

**FR13:** Employés peuvent modifier des cellules individuelles dans le tableau via édition inline

**FR14:** Employés peuvent supprimer des lignes individuelles du tableau

**FR15:** Le système valide les données en temps réel et empêche la soumission si des erreurs sont détectées

**FR16:** Employés peuvent voir leurs rapports soumis avec leur statut (en attente, validé, rejeté)

**FR17:** Superviseurs peuvent voir tous les rapports de leur équipe et leurs propres rapports

**FR18:** Chefs superviseurs et Managers peuvent voir tous les rapports selon leur niveau d'accès hiérarchique

### Workflow de Validation Hiérarchique

**FR19:** Le système envoie automatiquement les rapports soumis par les employés à leur superviseur pour validation

**FR20:** Superviseurs peuvent valider ou rejeter des rapports complets avec des commentaires

**FR21:** Superviseurs peuvent rejeter des colonnes ou lignes spécifiques dans un rapport plutôt que le rapport entier

**FR22:** Le système envoie automatiquement les rapports validés par les superviseurs aux chefs superviseurs/managers

**FR23:** Chefs superviseurs et Managers peuvent voir tous les rapports validés par les superviseurs

**FR24:** Chefs superviseurs et Managers peuvent rejeter des rapports validés si nécessaire avec commentaires

**FR25:** Le système notifie automatiquement les superviseurs quand un rapport d'employé est rejeté par un chef/manager

**FR26:** Le système notifie automatiquement les employés quand leur rapport est rejeté avec les corrections requises

**FR27:** Employés peuvent corriger uniquement les parties rejetées de leur rapport sans refaire tout le rapport

### Gestion des Utilisateurs et Permissions

**FR28:** Le système authentifie les utilisateurs selon leur rôle (Employé, Superviseur, Chef superviseur, Manager)

**FR29:** Employés ne peuvent accéder qu'à leurs propres questionnaires et rapports

**FR30:** Superviseurs peuvent accéder aux questionnaires et rapports de leur équipe et à leurs propres données

**FR31:** Chefs superviseurs et Managers peuvent accéder à tous les questionnaires et rapports selon leur niveau hiérarchique

**FR32:** Le système maintient la confidentialité des données selon les règles de rôle

**FR33:** Le système enregistre automatiquement l'auteur et la date de chaque action (soumission, validation, rejet)

### Analytics et Reporting

**FR34:** Superviseurs peuvent consulter des statistiques basiques sur leur équipe (nombre de rapports par employé)

**FR35:** Chefs superviseurs et Managers peuvent trier les rapports par colonnes (date, employé, statut, etc.)

**FR36:** Chefs superviseurs et Managers peuvent filtrer les rapports par critères multiples (date, équipe, statut, etc.)

**FR37:** Chefs superviseurs et Managers peuvent rechercher dans les données des rapports

**FR38:** Chefs superviseurs et Managers peuvent exporter les données filtrées/triées en format Excel/CSV

**FR39:** Le système préserve le format et la structure des données lors de l'export

### Administration Système

**FR40:** Chefs superviseurs et Managers peuvent créer et gérer des comptes utilisateurs

**FR41:** Le système valide l'intégrité des relations hiérarchiques (chaque employé a un superviseur, chaque superviseur a un chef superviseur)

**FR42:** Le système empêche la suppression de données actives (rapports en cours de validation)

**FR43:** Le système maintient un historique des modifications pour audit et traçabilité

**FR44:** Le système gère les équipes temporaires pour événements avec assignation automatique des permissions appropriées

**FR45:** Le système permet la réutilisation de structures de questionnaires similaires pour créer de nouveaux questionnaires

### Notifications et Communication

**FR46:** Le système envoie des notifications dans l'application pour les rapports nécessitant action

**FR47:** Employés reçoivent des notifications pour leurs rapports rejetés avec indication des corrections requises

**FR48:** Superviseurs reçoivent des notifications pour les nouveaux rapports à valider et les rejets de chefs/managers

**FR49:** Le système indique visuellement le statut des rapports (✓ vert pour validé, ✗ rouge pour rejeté)

**FR50:** Le système affiche en priorité les rapports nécessitant action (rejetés, en attente) avant les rapports chronologiques

### Sécurité et Conformité

**FR51:** Le système chiffre les données sensibles en transit et au repos

**FR52:** Le système implémente une authentification sécurisée avec gestion des sessions

**FR53:** Le système protège contre les attaques courantes (XSS, CSRF, injection SQL)

**FR54:** Le système respecte les standards de confidentialité des données utilisateurs

**FR55:** Le système permet la récupération de mot de passe de manière sécurisée

### Performance et Accessibilité

**FR56:** L'interface fonctionne sur les navigateurs modernes (Chrome, Firefox, Safari, Edge)

**FR57:** L'application est responsive et fonctionne correctement sur mobile et desktop

**FR58:** Le système traite les copier-coller CSV en temps réel avec validation immédiate

**FR59:** L'interface respecte les standards d'accessibilité WCAG 2.1 AA

**FR60:** Le système fournit des messages d'erreur clairs et contextualisés en français pour les utilisateurs maliens

## Non-Functional Requirements

### Performance

**NFR-PERF-01:** Temps de chargement initial de l'application : maximum 3 secondes sur connexion 3G standard malienne

**NFR-PERF-02:** Traitement du copier-coller CSV : validation et création du tableau en moins de 1 seconde pour jusqu'à 50 lignes

**NFR-PERF-03:** Temps de réponse pour les actions utilisateur critiques (sauvegarde, validation) : maximum 2 secondes

**NFR-PERF-04:** Navigation entre vues dans l'application : maximum 500 millisecondes

**NFR-PERF-05:** Tri et filtrage des rapports : réponse en moins de 1 seconde pour jusqu'à 1000 rapports

**NFR-PERF-06:** Export Excel : génération du fichier en moins de 5 secondes pour jusqu'à 5000 lignes

### Sécurité

**NFR-SEC-01:** Authentification sécurisée avec chiffrement des mots de passe (bcrypt ou équivalent)

**NFR-SEC-02:** Gestion de session sécurisée avec expiration automatique après 30 minutes d'inactivité

**NFR-SEC-03:** Autorisation basée sur les rôles avec principe du moindre privilège

**NFR-SEC-04:** Chiffrement des données sensibles en transit (HTTPS/TLS 1.3) et au repos

**NFR-SEC-05:** Protection contre les attaques courantes : XSS, CSRF, injection SQL, clickjacking

**NFR-SEC-06:** Journalisation des accès et modifications pour audit de sécurité

**NFR-SEC-07:** Conformité aux standards de confidentialité des données personnelles

### Scalabilité

**NFR-SCA-01:** Support simultané de 100 utilisateurs actifs sans dégradation de performance

**NFR-SCA-02:** Gestion de 1000 rapports par jour avec archivage automatique des anciens rapports

**NFR-SCA-03:** Architecture permettant la croissance à 10000 utilisateurs sans refonte majeure

**NFR-SCA-04:** Base de données optimisée pour les requêtes fréquentes (rapports actifs, statistiques équipe)

**NFR-SCA-05:** Cache intelligent pour les questionnaires fréquemment utilisés et données de référence

### Accessibilité

**NFR-ACC-01:** Conformité WCAG 2.1 niveau AA pour l'accessibilité

**NFR-ACC-02:** Navigation complète au clavier pour tous les éléments interactifs

**NFR-ACC-03:** Support des lecteurs d'écran (NVDA, JAWS, VoiceOver, TalkBack)

**NFR-ACC-04:** Contraste de couleurs minimum 4.5:1 pour la lisibilité

**NFR-ACC-05:** Labels et descriptions appropriés pour tous les éléments d'interface

**NFR-ACC-06:** Interface responsive fonctionnelle sur mobile et desktop

**NFR-ACC-07:** Messages d'erreur et d'aide disponibles en français avec formulations claires

### Fiabilité

**NFR-REL-01:** Disponibilité du service : 99% uptime pendant les heures de travail (8h-20h heure malienne)

**NFR-REL-02:** Gestion gracieuse des erreurs avec messages utilisateur informatifs

**NFR-REL-03:** Sauvegarde automatique des données toutes les 4 heures avec récupération possible

**NFR-REL-04:** Validation côté serveur pour l'intégrité des données soumises

**NFR-REL-05:** Protection contre la perte de données en cas d'interruption de session

### Maintenabilité

**NFR-MAIN-01:** Code modulaire et documenté pour faciliter les évolutions futures

**NFR-MAIN-02:** Architecture permettant l'ajout de nouvelles fonctionnalités sans impact sur les existantes

**NFR-MAIN-03:** Tests automatisés pour les fonctionnalités critiques (couverture > 80%)

**NFR-MAIN-04:** Documentation technique pour les développeurs et administrateurs système

### Internationalisation

**NFR-I18N-01:** Interface utilisateur en français avec termes adaptés au contexte malien

**NFR-I18N-02:** Support des formats de date, nombre et devise maliens

**NFR-I18N-03:** Messages d'erreur et d'aide contextualisés pour les workflows maliens

**NFR-I18N-04:** Architecture permettant l'ajout futur d'autres langues si nécessaire
