# Quick Start Guide: Hierarchical Reporting Application

**Version**: 1.0.0
**Date**: 2025-12-24

## Vue d'ensemble

L'application de reporting hiérarchique permet aux utilisateurs de soumettre des rapports via des questionnaires spécifiques à leur rôle, qui suivent ensuite un workflow d'approbation hiérarchique avec contrôle d'accès strict.

## Rôles et hiérarchie

| Rôle | Nom | Responsabilités principales |
|------|-----|----------------------------|
| R1 | Chef de Service | Administration complète, gestion des questionnaires |
| R2 | Chef des Superviseurs | Approbation finale, gestion des superviseurs |
| R3 | Superviseur | Validation des rapports employés, soumission de rapports |
| R4 | Employé | Soumission de rapports uniquement |

## Premiers pas

### 1. Connexion

1. Accédez à l'application
2. Utilisez votre numéro de téléphone comme identifiant
3. Entrez votre mot de passe
4. Cliquez sur "Se connecter"

**Note**: Si vous avez oublié votre mot de passe, utilisez "Mot de passe oublié" pour recevoir un email de réinitialisation.

### 2. Navigation principale

Après connexion, vous verrez le menu principal adapté à votre rôle :

- **Tableau de bord**: Vue d'ensemble de vos rapports
- **Rapports**: Liste de vos rapports selon votre rôle
- **Administration**: Gestion utilisateurs (R1, R2) ou questionnaires (R1)
- **Profil**: Gestion de votre profil personnel

## Utilisation par rôle

### Pour les employés (R4)

#### Soumettre un rapport
1. Allez dans "Rapports" → "Nouveau rapport"
2. Remplissez le questionnaire affiché
3. Vérifiez vos réponses
4. Cliquez sur "Soumettre"

**Note**: Une fois soumis, votre rapport est envoyé à votre superviseur et devient non modifiable jusqu'à validation ou retour pour correction.

#### Gérer les corrections
Si votre rapport est retourné :
1. Allez dans "Rapports" → trouvez le rapport marqué "Retourné"
2. Lisez la raison de correction
3. Modifiez les champs nécessaires
4. Soumettez à nouveau

**Note**: Les modifications sont tracées et visibles par vos supérieurs.

### Pour les superviseurs (R3)

#### Valider les rapports employés
1. Allez dans "Rapports" → "À réviser"
2. Ouvrez un rapport soumis par un employé
3. Examinez les réponses
4. Choisissez :
   - **Valider**: Le rapport passe en "En cours" et est envoyé aux niveaux supérieurs
   - **Retourner**: Indiquez obligatoirement une raison de correction

#### Soumettre vos rapports
1. Allez dans "Rapports" → "Nouveau rapport"
2. Remplissez votre questionnaire spécifique
3. Soumettez (votre rapport va directement à R2 et R1)

### Pour les chefs de superviseurs (R2)

#### Réviser tous les rapports
Vous pouvez voir :
- Rapports de superviseurs (R3)
- Rapports d'employés (R4) après validation par R3

Actions disponibles :
- **Valider**: Approuver définitivement le rapport
- **Retourner**: Demander des corrections avec raison obligatoire

#### Gérer les utilisateurs R3 et R4
- Créer de nouveaux comptes R3/R4
- Modifier les informations des utilisateurs R3/R4
- Désactiver des comptes

### Pour les chefs de service (R1)

#### Administration complète
- **Gestion utilisateurs** : Créer/modifier tous les rôles (R1-R4)
- **Gestion questionnaires** : Créer et modifier les formulaires pour R3/R4
- **Exports globaux** : Télécharger tous les rapports en Excel

#### Créer un questionnaire
1. Allez dans "Administration" → "Questionnaires"
2. Cliquez sur "Nouveau questionnaire"
3. Définissez le titre et la description
4. Choisissez le rôle cible (R3 ou R4)
5. Ajoutez les champs du formulaire
6. Sauvegardez

## États des rapports

| État | Signification | Actions possibles |
|------|---------------|------------------|
| **Soumis** | Rapport initialement soumis | Modifier (auteur uniquement) |
| **Retourné** | Corrections demandées | Modifier (auteur uniquement) |
| **En cours** | Validé par premier niveau | Lecture seule, en attente approbation finale |
| **Validé** | Approuvé définitivement | Lecture seule, terminé |

## Règles importantes

### Visibilité
- **R4** : Voit uniquement ses propres rapports
- **R3** : Voit les rapports de son équipe (R4) + les siens
- **R2** : Voit tous les rapports du système
- **R1** : Voit tous les rapports du système

### Modifications
- Les rapports peuvent être modifiés uniquement quand ils sont "Soumis" ou "Retourné"
- Une fois "En cours" ou "Validé", ils deviennent définitifs
- Toute modification après soumission est tracée avec un drapeau "Modifié"

### Exports
- **R1/R2** : Peuvent exporter tous les rapports
- **R3** : Peuvent exporter uniquement les rapports de leur équipe
- **R4** : Aucun droit d'export

## Dépannage

### Problèmes courants

**"Vous n'avez pas les permissions"**
- Vérifiez que vous tentez une action autorisée pour votre rôle
- Contactez votre supérieur si nécessaire

**"Rapport non modifiable"**
- Le rapport est dans un état avancé (En cours ou Validé)
- Attendez une décision de retour si applicable

**"Aucun questionnaire disponible"**
- Votre rôle n'a pas encore de questionnaire défini
- Contactez l'administrateur (R1)

**Connexion impossible**
- Vérifiez numéro de téléphone et mot de passe
- Utilisez "Mot de passe oublié" si nécessaire

### Support

Pour toute question ou problème technique :
1. Vérifiez ce guide d'abord
2. Contactez votre superviseur direct
3. En cas de problème système, contactez l'équipe technique

## Sécurité et confidentialité

- Toutes les actions sont tracées dans un journal d'audit
- Les données sont chiffrées en transit et au repos
- L'accès est strictement contrôlé selon la hiérarchie
- Les mots de passe doivent respecter les politiques de sécurité
