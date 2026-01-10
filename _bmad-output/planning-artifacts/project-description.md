# Project Description - ReportFlow

## Overview
Application web pour faciliter la gestion de rapports dans une entreprise avec hiérarchie organisationnelle.

## Hierarchical Structure
- Employé → Superviseur → Chef superviseur → Manager

## Core Requirements

### 1. User Management
- Manager/Chef superviseur peuvent créer des employés et superviseurs
- Relations obligatoires :
  - Employé → Superviseur (obligatoire)
  - Superviseur → Chef superviseur (obligatoire)
  - Chef superviseur → Manager

### 2. Questionnaire Creation
- Manager/Chef superviseur peuvent créer des questionnaires
- Format : Tableau ligne/colonne (rapport à remplir)
- Destinés aux employés et superviseurs

### 3. User Profile Management
- Gestion des profils utilisateurs

### 4. Report Management & Visualization
- Chaque utilisateur peut visualiser :
  - Employé : rapports personnels
  - Superviseur : rapports d'équipe et personnels
  - Chef superviseur/Manager : visualisation étendue

## Current Pain Points (Google Forms)
- Répétition d'actions pour employés/superviseurs
- Changement de page, soumettre, recommencer
- Fatigant pour 100+ données
- Pas de correction d'erreurs sans tout recommencer

## Solution Requirements
- Correction d'erreurs sans tout recommencer
- Pas de répétition d'actions
- Visualisation des rapports personnels et d'équipe
- Interface optimisée pour saisie de données multiples

## Project Type
Greenfield - New web application
