<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import { useAuthStore } from "../../stores/auth.store";

definePageMeta({
  layout: "default",
});

const toast = useToast();
const authStore = useAuthStore();
const _router = useRouter();

// Redirect if already logged in
watchEffect(() => {
  if (authStore.loggedIn) {
    navigateTo("/reports");
  }
});

// Form schema using Zod
const schema = z.object({
  identifier: z.string().min(1, "Identifiant requis"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type Schema = z.output<typeof schema>;

// Form fields configuration
const fields: AuthFormField[] = [
  {
    name: "identifier",
    type: "text",
    label: "Téléphone ou email",
    placeholder: "Entrez votre téléphone ou email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Mot de passe",
    placeholder: "Entrez votre mot de passe",
    required: true,
  },
];

// Handle form submission
async function onSubmit(event: FormSubmitEvent<Schema>) {
  authStore.clearError();

  const success = await authStore.login(event.data.identifier, event.data.password);

  if (success) {
    toast.add({
      title: "Connexion réussie",
      description: `Bienvenue ${authStore.displayName}`,
      color: "success",
    });
    await navigateTo("/reports");
  } else {
    toast.add({
      title: "Échec de la connexion",
      description: authStore.error || "Identifiants invalides",
      color: "error",
    });
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 px-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white tracking-tight">
          ReportFlow
        </h1>
        <p class="text-slate-400 mt-2">
          Système de reporting hiérarchique
        </p>
      </div>

      <!-- Login Card -->
      <UCard class="backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
        <UAuthForm
          :schema="schema"
          :fields="fields"
          :loading="authStore.isLoading"
          title="Connexion"
          description="Entrez vos identifiants pour accéder à votre espace."
          icon="i-lucide-lock"
          :submit="{ label: 'Se connecter', color: 'primary', block: true }"
          @submit="onSubmit"
        >
          <template #password-hint>
            <ULink
              to="/auth/reset-password"
              class="text-primary-400 hover:text-primary-300 text-sm font-medium"
              tabindex="-1"
            >
              Mot de passe oublié ?
            </ULink>
          </template>

          <template v-if="authStore.error" #validation>
            <UAlert
              color="error"
              icon="i-lucide-alert-circle"
              :title="authStore.error"
              variant="soft"
              class="mt-4"
            />
          </template>
        </UAuthForm>
      </UCard>

      <!-- Footer -->
      <p class="text-center text-slate-500 text-sm mt-6">
        © {{ new Date().getFullYear() }} ReportFlow. Tous droits réservés.
      </p>
    </div>
  </div>
</template>

