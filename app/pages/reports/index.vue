<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { useAuthStore } from "~~/stores/auth.store";
import { useReportsStore } from "~~/stores/reports.store";

definePageMeta({
  layout: "default",
});

const authStore = useAuthStore();
const reportsStore = useReportsStore();
const _toast = useToast();
const router = useRouter();

// Get UI components for table cells
const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

// Report type from store
type ReportListItem = {
  id: string;
  questionnaireId: string;
  questionnaireTitle: string | null;
  authorId: string;
  authorRole: string;
  state: string;
  modified: boolean;
  correctionReason: string | null;
  submittedAt: Date | string;
  createdAt: Date | string;
};

// Fetch reports on mount
onMounted(async () => {
  await reportsStore.fetchReports();
});

// State color mapping
const stateColors: Record<string, "success" | "warning" | "info" | "error" | "neutral"> = {
  submitted: "info",
  returned: "error",
  in_progress: "warning",
  validated: "success",
};

// State labels (French)
const stateLabels: Record<string, string> = {
  submitted: "Soumis",
  returned: "Retourné",
  in_progress: "En cours",
  validated: "Validé",
};

// Table columns
const columns: TableColumn<ReportListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => `#${(row.getValue("id") as string).slice(0, 8)}...`,
  },
  {
    accessorKey: "questionnaireTitle",
    header: "Questionnaire",
    cell: ({ row }) => row.getValue("questionnaireTitle") ?? "N/A",
  },
  {
    accessorKey: "state",
    header: "État",
    cell: ({ row }) => {
      const state = row.getValue("state") as string;
      const color = stateColors[state] ?? "neutral";
      const label = stateLabels[state] ?? state;
      return h(
        UBadge,
        { class: "capitalize", variant: "subtle", color },
        () => label
      );
    },
  },
  {
    accessorKey: "modified",
    header: "Modifié",
    cell: ({ row }) => {
      const modified = row.getValue("modified") as boolean;
      return modified
        ? h(UBadge, { variant: "soft", color: "warning" }, () => "Oui")
        : h("span", { class: "text-muted" }, "Non");
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Date de soumission",
    cell: ({ row }) => {
      const date = new Date(row.getValue("submittedAt"));
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return h(
        UButton,
        {
          icon: "i-lucide-eye",
          variant: "ghost",
          color: "neutral",
          size: "sm",
          onClick: () => router.push(`/reports/${row.original.id}`),
        },
        () => "Voir"
      );
    },
  },
];

// Check if user can submit reports (R3 or R4)
const canSubmit = computed(() => {
  const role = authStore.currentRole;
  return role === "R3" || role === "R4";
});
</script>

<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Header -->
    <header class="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-white">
              Mes Rapports
            </h1>
            <p class="text-slate-400 text-sm mt-1">
              Bienvenue, {{ authStore.displayName }}
            </p>
          </div>

          <div class="flex items-center gap-4">
            <UButton
              v-if="canSubmit"
              icon="i-lucide-plus"
              to="/reports/new"
            >
              Nouveau rapport
            </UButton>

            <UButton
              icon="i-lucide-log-out"
              variant="ghost"
              color="neutral"
              @click="async () => { await authStore.logout(); await navigateTo('/auth/login'); }"
            >
              Déconnexion
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8">
      <UCard class="bg-slate-800/50 border border-slate-700/50">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">
              Liste des rapports
            </h2>
            <UButton
              icon="i-lucide-refresh-cw"
              variant="ghost"
              color="neutral"
              size="sm"
              :loading="reportsStore.isLoading"
              @click="reportsStore.fetchReports()"
            >
              Actualiser
            </UButton>
          </div>
        </template>

        <!-- Loading state -->
        <div v-if="reportsStore.isLoading && reportsStore.reports.length === 0" class="py-12 text-center">
          <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary-400" />
          <p class="mt-2 text-slate-400">
            Chargement des rapports...
          </p>
        </div>

        <!-- Empty state -->
        <div v-else-if="reportsStore.reports.length === 0" class="py-12 text-center">
          <UIcon name="i-lucide-file-text" class="size-12 text-slate-500 mx-auto" />
          <h3 class="mt-4 text-lg font-medium text-white">
            Aucun rapport
          </h3>
          <p class="mt-2 text-slate-400">
            {{ canSubmit ? "Commencez par créer votre premier rapport." : "Aucun rapport à afficher." }}
          </p>
          <UButton
            v-if="canSubmit"
            icon="i-lucide-plus"
            to="/reports/new"
            class="mt-6"
          >
            Créer un rapport
          </UButton>
        </div>

        <!-- Reports table -->
        <UTable
          v-else
          :data="reportsStore.reports"
          :columns="columns"
          :loading="reportsStore.isLoading"
          class="min-h-[300px]"
        />

        <template v-if="reportsStore.reports.length > 0" #footer>
          <div class="flex items-center justify-between text-sm text-slate-400">
            <span>{{ reportsStore.total }} rapport(s) au total</span>
            <span v-if="reportsStore.hasMore">
              Affichage des {{ reportsStore.reports.length }} premiers
            </span>
          </div>
        </template>
      </UCard>

      <!-- Error display -->
      <UAlert
        v-if="reportsStore.error"
        color="error"
        icon="i-lucide-alert-circle"
        :title="reportsStore.error"
        class="mt-4"
        variant="soft"
      />
    </main>
  </div>
</template>

