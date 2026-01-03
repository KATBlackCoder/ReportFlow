# Contracts Documentation

Ce dossier contient les contrats API pour le système de rapports hiérarchique.

## Fichiers

- **api-contracts.md**: Contrats fonctionnels décrivant les interactions avec Supabase via les composables `@nuxtjs/supabase`

## Architecture

Cette application utilise Supabase comme backend. Les "contrats" décrivent les interactions fonctionnelles plutôt que des endpoints REST classiques, car toutes les opérations passent par les composables Supabase (`useSupabaseClient()`, `useSupabaseUser()`, etc.).

## Sécurité

Toutes les règles de sécurité sont appliquées via RLS (Row Level Security) policies au niveau de la base de données PostgreSQL. Les contrats décrivent les permissions attendues, mais la sécurité réelle est garantie par RLS.

## Utilisation

Ces contrats servent de référence pour:
- L'implémentation des composables et stores
- La définition des types TypeScript
- La création des tests d'intégration
- La documentation pour les développeurs
