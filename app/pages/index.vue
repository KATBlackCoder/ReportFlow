<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin mx-auto mb-4" />
      <p class="text-gray-600">Redirection en cours...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Page d'accueil - Redirection automatique selon l'état de connexion
 * - Non connecté → /auth/login
 * - Connecté → /reports
 */
const { loggedIn } = useUserSession();

// Redirection immédiate selon l'état de connexion
if (loggedIn.value) {
  await navigateTo('/reports');
} else {
  await navigateTo('/auth/login');
}
</script>