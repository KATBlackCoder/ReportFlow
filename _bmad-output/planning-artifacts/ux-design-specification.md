---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-ReportFlow-2026-01-08.md'
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/project-description.md'
date: '2026-01-09'
author: Blackat
project_name: ReportFlow
---

# UX Design Specification ReportFlow

**Author:** Blackat
**Date:** 2026-01-09

---

## Executive Summary

### Project Vision

ReportFlow est une application web qui élimine la répétition fastidieuse dans la saisie de rapports terrain. Les employés doivent actuellement remplir le même formulaire Google Forms 50+ fois par jour, et ReportFlow transforme ce processus en un workflow fluide avec saisie en masse CSV et corrections granulaires, tout en maintenant un système de validation hiérarchique pour assurer la qualité des données.

### Target Users

**Employés (Agents terrain)** : Agents qui approchent 50+ clients par jour, actuellement soumis à une saisie répétitive et chronophage avec Google Forms. Ils ont besoin d'une solution rapide et sans répétition, et doivent pouvoir voir leurs rapports soumis avec leur statut.

**Superviseurs** : Gèrent des équipes d'employés, doivent valider les rapports et avoir une visibilité sur les performances de leur équipe. Doivent pouvoir voir les rapports de leur équipe ainsi que leurs propres rapports personnels.

**Chefs superviseurs/Managers** : Créent les questionnaires selon les besoins organisationnels, distribuent aux employés/superviseurs, et analysent les données collectées. Ont besoin d'outils de création de questionnaires intuitifs, de gestion des questionnaires et d'analyses globales de tous les rapports.

### Key Design Challenges

**Création et gestion de questionnaires par les managers** : Interface intuitive pour créer des questionnaires avec structure tableau (lignes/colonnes), définir les champs et types de données, modifier/gérer/désactiver les questionnaires existants, et les distribuer de manière flexible (ciblés, collectifs, par groupe, événements).

**Visibilité des rapports par rôle avec analytics différenciées** : Système permettant à chaque utilisateur de voir ses rapports soumis avec leur statut (en attente, validé, rejeté). Superviseurs voient dashboard statistiques équipe (nombre rapports par employé, taux validation/rejet). Chefs/Managers voient vue globale avec graphiques camembert interactifs (quartiers, équipes, validation/rejet).

**Saisie en masse CSV avec format standardisé** : Interface qui transforme un copier-coller CSV (`", "` pour colonnes, `";"` pour lignes) en tableau structuré en temps réel, avec validation automatique et messages d'erreur explicites en français. Combinaison avec saisie manuelle hybride (ajout/suppression lignes, édition inline).

**Workflow hiérarchique simplifié (2 niveaux)** : Workflow optimisé Employé → Superviseur (valide/rejette) → Chef/Manager (voit/rejette/exporte). Élimination validation explicite côté Chef (confiance dans hiérarchie). Rejet granulaire (colonnes/lignes spécifiques). Section rapports rejetés séparée.

**Corrections granulaires avec indicateurs visuels** : Système permettant de corriger uniquement les parties erronées d'un rapport sans refaire l'ensemble. Indicateurs visuels ✓ vert (validé), ✗ rouge (rejeté). Historique des modifications avec parties rejetées en rouge.

**Priorité d'affichage inversée** : Vue par défaut "action requise" (rejetés → en attente → validés) plutôt que chronologique. Système de priorité rouge (rejetés) → orange (en attente) → vert (validés). Badges notifications avec compteurs.

**Interface hybride mobile/desktop** : Même application disponible sur mobile et desktop selon préférence utilisateur, avec optimisation responsive pour chaque plateforme. Avertissement "Vous allez perdre vos données" si quitté sans soumettre.

### Design Opportunities

**Innovation dans la création de questionnaires** : Interface intuitive de type "drag & drop" ou "clic pour ajouter" permettant aux managers non-techniques de créer des questionnaires complexes avec structure tableau sans compétences techniques avancées. Gestion flexible de la distribution (ciblés, collectifs, par groupe, événements).

**Dashboard analytics différenciées par rôle** : Interfaces ultra-spécialisées - Superviseurs : statistiques équipe temps réel (rapports par employé, taux validation/rejet, évolution). Chefs/Managers : graphiques camembert interactifs (clic pour filtrer), tri/filtres multi-colonnes, recherche globale, export Excel avec données filtrées.

**Copier-coller CSV révolutionnaire** : Expérience "magique" transformant des notes brutes au format standardisé (`", "` pour colonnes, `";"` pour lignes) en tableau structuré instantanément. Validation temps réel avec messages d'erreur contextuels. Combinaison parfaite avec saisie manuelle pour flexibilité maximale.

**Workflow de validation 2.0** : Révolution dans la simplification hiérarchique - élimination validation explicite côté managers (confiance dans la chaîne). Focus sur rejet granulaire plutôt que validation systématique. Section rejetés dédiée. Indicateurs visuels intelligents (✓ vert, ✗ rouge avec zones spécifiques).

**Priorité d'affichage inversée** : Interface révolutionnaire plaçant l'action avant l'information - rejetés (rouge) → en attente (orange) → validés (vert). Badges notifications avec compteurs intelligents. Réduction drastique du temps pour identifier les actions requises.

**Protection intelligente des données** : Avertissement contextuel "Vous allez perdre vos données" si quitté sans soumission. Validation stricte bloquant la soumission avec erreurs. Équilibre parfait entre protection et fluidité d'usage.

## Core User Experience

### Defining Experience

ReportFlow révolutionne l'expérience de saisie de données répétitives en transformant un processus fastidieux (remplir 50+ formulaires Google Forms) en une interaction fluide et "magique". L'expérience core repose sur le copier-coller CSV intelligent qui élimine complètement la répétition, combiné à un workflow de validation hiérarchique simplifié qui inspire confiance.

### Platform Strategy

**Web responsive multi-plateforme** : Application web unique accessible sur mobile et desktop selon les préférences individuelles. L'interface s'adapte automatiquement aux contraintes de chaque plateforme (touch vs clavier/souris) tout en offrant exactement les mêmes fonctionnalités. Pas de séparation fonctionnelle terrain/bureau - chaque utilisateur choisit sa plateforme préférée pour effectuer toutes ses tâches.

### Effortless Interactions

**Copier-coller CSV "magique"** : L'interaction la plus critique - coller des données brutes au format standardisé (`", "` colonnes, `";"` lignes) et voir instantanément un tableau Excel-like se former. Cette transformation doit être si fluide qu'elle semble magique.

**Validation proactive** : Au lieu de bloquer avec des erreurs, le système suggère automatiquement des corrections contextuelles. Les messages d'erreur en français guident l'utilisateur vers la résolution plutôt que de frustrer.

**Soumission sans friction** : Bouton de soumission actif uniquement quand tout est valide, mais avec feedback clair sur ce qui reste à corriger. Élimination de toute étape inutile.

### Critical Success Moments

**Moment "Ça marche !"** : Quand l'utilisateur voit ses 50+ lignes de données brutes se transformer instantanément en tableau structuré après le copier-coller.

**Moment "Enfin libre !"** : Quand l'employé réalise qu'il a terminé sa saisie en 15 minutes au lieu de 2h30, sans répétition.

**Moment "Confiance acquise"** : Quand le superviseur valide rapidement avec commentaires ciblés, et que l'employé voit le ✓ vert apparaître.

**Moment "Correction facile"** : Quand un rejet ne nécessite que la correction d'une cellule spécifique plutôt que de refaire tout le rapport.

### Experience Principles

**1. Rapidité Sacrée** : Toute action répétitive doit être éliminée. Le copier-coller CSV n'est pas une fonctionnalité - c'est l'âme du produit.

**2. Confiance dans la Hiérarchie** : Simplifier le workflow à 2 niveaux avec confiance dans la chaîne de validation plutôt que contrôles excessifs.

**3. Action Before Information** : L'interface montre d'abord ce qui nécessite attention (rejetés, en attente) avant l'historique chronologique.

**4. Feedback Contextuel Intelligent** : Messages d'erreur qui guident plutôt que bloquent, en français avec exemples concrets.

**5. Protection Sans Friction** : Avertissements contre la perte de données qui protègent sans interrompre le flow naturel.

## Desired Emotional Response

### Primary Emotional Goals

**Soulagement Profond** : Les utilisateurs doivent ressentir un soulagement intense en réalisant qu'ils n'ont plus à répéter 50+ fois la même saisie. Cette émotion doit être immédiate et durable.

**Liberté Retrouvée** : Chaque utilisation doit renforcer le sentiment de liberté - "J'ai gagné du temps pour ce qui compte vraiment : les clients sur le terrain".

**Confiance Absolue** : Le workflow hiérarchique doit inspirer une confiance totale - les utilisateurs savent que leur travail est validé efficacement et équitablement.

### Emotional Journey Mapping

**Moment de Découverte** : Curiosité teintée d'espoir ("Peut-être que ça va vraiment changer ma journée...")

**Première Utilisation** : Surprise enchantée ("C'est magique ! Mes données deviennent un tableau instantanément")

**Utilisation Quotidienne** : Efficacité satisfaite ("C'est devenu naturel, je termine en un quart du temps")

**Lors d'un Rejet** : Pas de frustration - plutôt compréhension aidante ("Je vois exactement quoi corriger, et c'est rapide")

**Après Validation** : Accomplissement tranquille ("Mon travail est reconnu, je peux passer à autre chose")

### Micro-Emotions

**Confiance vs Doute** : Chaque interaction renforce la confiance - indicateurs visuels clairs, workflow prévisible, corrections faciles

**Rapidité vs Attente** : Tout doit être instantané - transformation CSV immédiate, validation temps réel, feedback immédiat

**Contrôle vs Impuissance** : Les utilisateurs contrôlent leur destin - corrections granulaires, modifications ciblées, soumission quand prêt

**Accomplissement vs Routine** : Chaque validation apporte une petite victoire, chaque rejet résolu devient une réussite personnelle

### Design Implications

**Soulagement** → Éliminer toute répétition : Copier-coller unique, transformation instantanée, zéro étape redondante

**Confiance** → Signaux visuels forts : ✓ vert = validé, ✗ rouge = à corriger, workflow hiérarchique transparent

**Délice** → Moments "magiques" : Animation fluide de paste → tableau, transitions élégantes, surprises positives

**Liberté** → Rappels de valeur : Indicateurs de temps gagné, statistiques personnelles, focus sur l'essentiel

### Emotional Design Principles

**1. Soulagement Immédiat** : La première interaction doit immédiatement soulager la douleur de la répétition

**2. Confiance Progressive** : Chaque validation renforce la confiance dans le système et la hiérarchie

**3. Victoires Quotidiennes** : Transformer les tâches répétitives en moments d'accomplissement

**4. Échec = Aide** : Les erreurs deviennent des opportunités d'apprentissage assisté, pas des frustrations

**5. Liberté Visible** : Rappeler constamment la valeur gagnée (temps, efficacité, contrôle)

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**WhatsApp** : Modèle de communication simple et fiable
- **UX réussi** : Interface minimaliste, messages instantanés, statuts de lecture clairs, synchronisation transparente
- **Émotions créées** : Connexion facile, confiance dans la livraison, simplicité rassurante
- **Patterns clés** : Feedback immédiat (double check), conversations organisées, absence de complexité

**Excel** : Référence pour les interfaces tableau puissantes
- **UX réussi** : Manipulation directe des données, formules automatiques, visualisation claire, personnalisation avancée
- **Émotions créées** : Maîtrise des données, accomplissement de l'analyse, contrôle total
- **Patterns clés** : Édition inline, calculs automatiques, vues multiples, mise en forme conditionnelle

### Transferable UX Patterns

**Communication Patterns (de WhatsApp) :**
- **Feedback immédiat** → Indicateurs visuels clairs (✓ vert, ✗ rouge) comme les accusés WhatsApp
- **Interface minimaliste** → Supprimer toute complexité inutile, focus sur l'essentiel
- **Fiabilité perçue** → Synchronisation transparente, pas de perte de données

**Tableau Patterns (d'Excel) :**
- **Édition directe** → Clic sur cellule pour modifier immédiatement, comme Excel
- **Calculs automatiques** → Validation CSV et transformations automatiques
- **Mise en forme conditionnelle** → Couleurs pour indiquer l'état (validé/rejeté)
- **Tri/filtres naturels** → Comme Excel, mais simplifié pour usage mobile

### Anti-Patterns to Avoid

**Complexité excessive** : Éviter les interfaces surchargées comme Excel avancé - rester minimal
**Absence de feedback** : Contrairement à WhatsApp, toujours donner un retour immédiat à l'utilisateur
**Perte de données** : Contrairement aux craintes Excel, garantir la protection contre la perte accidentelle
**Navigation confuse** : Éviter les onglets/tabs multiples - workflow linéaire clair

### Design Inspiration Strategy

**Adopter de WhatsApp :**
- Feedback visuel immédiat (✓/✗ comme accusés lecture)
- Interface épurée, focus sur le contenu
- Fiabilité et simplicité perçues

**Adopter d'Excel :**
- Interface tableau familière avec édition directe
- Validation automatique (comme les formules Excel)
- Tri/filtres intuitifs mais simplifiés

**Adapter pour ReportFlow :**
- Combiner simplicité WhatsApp avec puissance Excel
- Priorité action-first (comme notifications WhatsApp)
- Manipulation directe des données (comme cellules Excel)

## Design System Foundation

### Design System Choice

**Nuxt UI v4** - Système themeable basé sur Tailwind CSS avec 100+ composants unifiés

### Rationale for Selection

Choisi pour son alignement parfait avec l'architecture technique définie et les besoins UX de ReportFlow :

- **Cohérence Architecture** : Déjà intégré dans la stack Nuxt 4 + NuxtHub
- **Composants Tableau** : Interface Excel-like native parfaite pour la saisie en masse
- **Performance Mobile** : Responsive et optimisé pour utilisateurs terrain
- **Personnalisation** : Thème entièrement customizable selon l'identité ReportFlow
- **Accessibilité** : Conformité WCAG 2.1 AA intégrée
- **Productivité** : Composants prêts à l'emploi accélérant le développement

### Implementation Approach

**Stratégie en Couches :**
1. **Base Nuxt UI** : 80% des composants utilisés directement (DataTable, Form, Modal, etc.)
2. **Thème Personnalisé** : Adaptation des couleurs et typographie à l'identité ReportFlow
3. **Composants Spécialisés** : 4-5 composants custom pour formulaires par type (TextForm, NumberForm, etc.)
4. **Extensions Fonctionnelles** : Ajout de logique métier (validation CSV, corrections granulaires)

**Patterns d'Utilisation :**
- Composants UTable pour interfaces tableau avec tri/filtres intégrés
- Composants UForm pour saisie avec validation temps réel
- Composants UBadge pour indicateurs de statut (✓ vert, ✗ rouge)
- Composants UModal pour confirmations et corrections

### Customization Strategy

**Personnalisation Visuelle :**
- Palette de couleurs : Adaptation au branding ReportFlow
- Typographie : Hiérarchie claire pour lisibilité mobile/desktop
- Espacement : Système cohérent basé sur échelle Tailwind
- Animations : Transitions fluides pour interactions "magiques"

**Personnalisation Fonctionnelle :**
- Composants spécialisés pour workflow hiérarchique
- Intégration patterns Excel (édition inline, tri automatique)
- Adaptation patterns WhatsApp (feedback immédiat, statuts visuels)
- Optimisations mobile pour saisie terrain

Cette approche garantit rapidité de développement tout en permettant l'expérience unique de ReportFlow.

## Core User Experience

### Defining Experience

**La Transformation Magique CSV** : L'interaction déterminante de ReportFlow est la transformation instantanée de données brutes collées au format CSV en un tableau Excel-like structuré et validé.

Cette interaction définit ReportFlow : *"Coller ses notes terrain et voir instantanément un tableau professionnel se former"*.

C'est l'expérience que les utilisateurs décriront : *"Tu colles tes données et BAM ! Tout est organisé automatiquement"*.

### User Mental Model

**Modèle Mental Actuel (Google Forms) :**
- "Je note mes informations"
- "J'ouvre Google Forms"
- "Je remplis le même formulaire 50+ fois"
- "Je recommence si j'ai fait une erreur"
- Frustration : Répétition mécanique, peur des erreurs

**Modèle Mental Souhaité (ReportFlow) :**
- "Je note mes informations comme d'habitude"
- "Je colle tout d'un coup dans ReportFlow"
- "Le système comprend et organise automatiquement"
- "Je corrige seulement si nécessaire"
- Émotion : Soulagement, accomplissement, confiance

**Transition Mentale :**
Les utilisateurs apportent l'attente Excel (organisation automatique) mais avec la simplicité WhatsApp (collage direct, feedback immédiat).

### Success Criteria

**Critères de Réussite Core :**
- **Transformation instantanée** : < 1 seconde entre paste et tableau formé
- **Intelligence de format** : Compréhension automatique de différents formats de notes
- **Validation proactive** : Suggestions de corrections plutôt que blocage
- **Feedback émotionnel** : Sentiment de "j'ai gagné 2h" clairement communiqué
- **Fiabilité perçue** : "Ça marche toujours, même avec mes notes brouillon"

**Indicateurs de Succès :**
- Utilisateur sourit en voyant le tableau se former
- "C'est magique !" comme première réaction
- Temps de saisie passé de 2h30 à 15 minutes
- Confiance totale dans le système

### Novel UX Patterns

**Patterns Hybrides (Pas 100% Nouveau, Pas 100% Établi) :**

**Établi :**
- Interface tableau (Excel) - Familiarité rassurante
- Copier-coller (WhatsApp/Excel) - Action connue
- Validation temps réel - Pattern standard moderne

**Innovant :**
- **Intelligence CSV contextuelle** : Compréhension automatique des formats de notes variés
- **Transformation émotionnelle** : De frustration répétitive à accomplissement instantané
- **Workflow hiérarchique intégré** : Validation sociale plutôt que technique pure

**Métaphore Familière :**
Comme Excel (organisation automatique) mais avec la magie de WhatsApp (transformation fluide). Les utilisateurs connaissent Excel, donc la base est familière, mais l'intelligence et la fluidité apportent la nouveauté.

### Experience Mechanics

**1. Initiation :**
- Zone "Coller vos données" prominente et accueillante
- Guide visuel : "Format attendu : numéro, info1, info2 ; numéro, info3, info4"
- État d'attente engageant : "Prêt à recevoir vos données"

**2. Interaction Core :**
- **Paste** : Utilisateur colle ses notes brutes
- **Animation fluide** : Transformation progressive (chargement → validation → tableau)
- **Intelligence** : Détection automatique du séparateur (virgule vs point-virgule)
- **Validation proactive** : Messages "On a détecté X lignes, Y colonnes - ça vous semble correct ?"

**3. Feedback et Corrections :**
- **Succès** : ✓ vert + "Parfait ! 45 clients détectés"
- **Suggestions** : "Ligne 3 semble avoir 4 colonnes au lieu de 5 - voulez-vous corriger ?"
- **Aide contextuelle** : Boutons "Ajouter une ligne" ou "Corriger le format"

**4. Completion et Prochaines Étapes :**
- **État final** : Tableau complet avec indicateurs de validation
- **Call-to-action** : "Prêt à envoyer à votre superviseur"
- **Feedback émotionnel** : Indicateur "Temps gagné estimé : 2h15"

Cette mécanique transforme une tâche répétitive en moment de satisfaction, établissant ReportFlow comme l'outil qui "comprend vraiment le travail terrain".

## Visual Design Foundation

### Color System

**Palette Recommandée pour ReportFlow :**
Thème professionnel avec feedbacks émotionnels forts, optimisé pour applications data-intensive.

**Couleurs Primaires :**
- **Primaire** : `blue-600` (#2563eb) - Confiance et stabilité, comme les meilleurs outils business
- **Primaire clair** : `blue-50` (#eff6ff) - Pour fonds subtils et indicateurs légers
- **Primaire foncé** : `blue-800` (#1e40af) - Pour textes importants et contrastes forts

**Couleurs Sémantiques (Feedback Émotionnel) :**
- **Succès** : `emerald-600` (#059669) - Soulagement, accomplissement (✓ vert)
- **Erreur** : `red-600` (#dc2626) - Attention claire mais pas agressive
- **Avertissement** : `amber-600` (#d97706) - Attention douce pour suggestions
- **Info** : `blue-600` (#2563eb) - Information neutre

**Neutres (Lisibilité Optimale) :**
- **Texte principal** : `gray-900` (#111827) - Maximum de contraste
- **Texte secondaire** : `gray-600` (#4b5563) - Bon contraste pour informations moins critiques
- **Texte tertiaire** : `gray-400` (#9ca3af) - Pour labels discrets
- **Fonds** : `gray-50` (#f9fafb) - Blanc cassé pour réduire la fatigue oculaire
- **Bordures** : `gray-200` (#e5e7eb) - Subtiles mais visibles

**Accessibilité :** Tous les contrastes ≥ 4.5:1, palette testée pour daltonisme.

### Typography System

**Police Principale : Inter**
- Gratuite, moderne, exceptionnelle lisibilité sur écrans
- Optimisée pour interfaces data-intensive
- Parfaite pour mobile et desktop

**Hiérarchie Typographique :**
- **Titre principal (h1)** : 24px / line-height 1.25 / font-weight 600
- **Titre secondaire (h2)** : 20px / line-height 1.25 / font-weight 600
- **Titre tertiaire (h3)** : 18px / line-height 1.4 / font-weight 500
- **Corps principal** : 16px / line-height 1.5 / font-weight 400
- **Corps secondaire** : 14px / line-height 1.4 / font-weight 400
- **Petit texte** : 12px / line-height 1.3 / font-weight 400

**Ton :** Professionnel mais accessible - comme les meilleurs outils SaaS (Stripe, Notion).

### Spacing & Layout Foundation

**Système d'Espacement :**
- **Base** : 4px (échelle Tailwind) pour cohérence mathématique
- **Échelle** : 4, 8, 12, 16, 24, 32, 48, 64px
- **Densité** : Dense mais respirable - efficace pour données sans claustrophobie

**Layout Principles :**
1. **Hiérarchie Visuelle Claire** : Informations critiques en haut, actions secondaires en bas
2. **Respirable sur Mobile** : Espacements généreux sur petits écrans malgré densité data
3. **Consistent avec Excel** : Utilisation familière des tableaux avec espacements adaptés web

**Grid System :**
- **Desktop** : 12 colonnes avec gutters 16px
- **Tablet** : 8 colonnes avec gutters 12px
- **Mobile** : Stack vertical avec espacements 16px minimum

### Accessibility Considerations

**Conformité WCAG 2.1 AA :**
- **Contraste** : Minimum 4.5:1 pour texte normal, 3:1 pour texte large
- **Tailles** : Texte minimum 16px, touch targets minimum 44px
- **Navigation** : Focus visible, ordre logique au clavier
- **Contenu** : Images décoratives masquées, labels explicites
- **Animations** : Réduites pour utilisateurs sensibles, possibilité de désactivation

**Considérations ReportFlow :**
- **Mobile-First** : Optimisé pour saisie terrain (gros doigts, soleil)
- **Daltonisme** : Palette testée, icônes + couleurs pour tous les statuts
- **Moteur de recherche** : Focus visible pour navigation clavier
- **Internationalisation** : Support préparé pour textes plus longs

Cette fondation visuelle crée une expérience cohérente, accessible et émotionnellement alignée avec les objectifs de ReportFlow.

<!-- UX design content will be appended sequentially through collaborative workflow steps -->