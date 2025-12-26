<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { useReportsStore } from "~~/stores/reports.store";

definePageMeta({
  layout: "default",
});

const _authStore = useAuthStore();
const reportsStore = useReportsStore();
const toast = useToast();
const router = useRouter();

// Fetch the active questionnaire for the user's role
const isLoadingQuestionnaire = ref(true);
const questionnaireError = ref<string | null>(null);

onMounted(async () => {
  isLoadingQuestionnaire.value = true;
  questionnaireError.value = null;

  const questionnaire = await reportsStore.fetchActiveQuestionnaire();

  if (!questionnaire) {
    questionnaireError.value = reportsStore.error || "Aucun questionnaire disponible pour votre rôle.";
  }

  isLoadingQuestionnaire.value = false;
});

// Handle form submission
async function handleSubmit(formData: Record<string, unknown>) {
  if (!reportsStore.currentQuestionnaire) {
    toast.add({
      title: "Erreur",
      description: "Aucun questionnaire chargé",
      color: "error",
    });
    return;
  }

  const report = await reportsStore.submitReport({
    questionnaireId: reportsStore.currentQuestionnaire.id,
    data: formData,
  });

  if (report) {
    toast.add({
      title: "Rapport soumis",
      description: "Votre rapport a été soumis avec succès.",
      color: "success",
    });
    await router.push("/reports");
  } else {
    toast.add({
      title: "Erreur",
      description: reportsStore.error || "Impossible de soumettre le rapport",
      color: "error",
    });
  }
}

// Handle cancel
function handleCancel() {
  router.push("/reports");
}
</script>

<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Header -->
    <header class="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            color="neutral"
            to="/reports"
          />
          <div>
            <h1 class="text-2xl font-bold text-white">
              Nouveau rapport
            </h1>
            <p class="text-slate-400 text-sm mt-1">
              Remplissez le questionnaire pour soumettre votre rapport
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Loading state -->
      <div v-if="isLoadingQuestionnaire" class="flex items-center justify-center py-24">
        <div class="text-center">
          <UIcon name="i-lucide-loader-circle" class="size-12 animate-spin text-primary-400" />
          <p class="mt-4 text-slate-400">
            Chargement du questionnaire...
          </p>
        </div>
      </div>

      <!-- Error state -->
      <UCard v-else-if="questionnaireError" class="max-w-lg mx-auto bg-slate-800/50 border border-slate-700/50">
        <div class="text-center py-8">
          <UIcon name="i-lucide-alert-triangle" class="size-12 text-red-400 mx-auto" />
          <h2 class="mt-4 text-lg font-semibold text-white">
            Questionnaire non disponible
          </h2>
          <p class="mt-2 text-slate-400">
            {{ questionnaireError }}
          </p>
          <UButton
            to="/reports"
            variant="outline"
            class="mt-6"
          >
            Retour aux rapports
          </UButton>
        </div>
      </UCard>

      <!-- Report form -->
      <UCard
        v-else-if="reportsStore.currentQuestionnaire"
        class="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700/50"
      >
        <template #header>
          <div>
            <h2 class="text-lg font-semibold text-white">
              {{ reportsStore.currentQuestionnaire.title }}
            </h2>
            <p v-if="reportsStore.currentQuestionnaire.description" class="mt-1 text-sm text-slate-400">
              {{ reportsStore.currentQuestionnaire.description }}
            </p>
          </div>
        </template>

        <ReportForm
          :questionnaire="reportsStore.currentQuestionnaire"
          :loading="reportsStore.isLoading"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </UCard>
    </main>
  </div>
</template>

