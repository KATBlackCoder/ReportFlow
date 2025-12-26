<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { useReportsStore } from "../../../stores/reports.store";
import { useReportVisibility } from "../../composables/useReportVisibility";

// State labels (French)
const STATE_LABELS: Record<string, string> = {
  submitted: "Soumis",
  returned: "Retourné",
  in_progress: "En cours",
  validated: "Validé",
};

// Role labels (French)
const ROLE_LABELS: Record<string, string> = {
  R1: "Chef de Service",
  R2: "Chef des Superviseurs",
  R3: "Superviseur",
  R4: "Employé",
};

definePageMeta({
  middleware: ["auth"],
});

const UBadge = resolveComponent("UBadge");

// Stores
const reportsStore = useReportsStore();
const { reports, isLoading, error } = storeToRefs(reportsStore);

// Composables
const { canReviewReports, filterReportsForReview } = useReportVisibility();
const router = useRouter();

// Vérifier si l'utilisateur peut réviser les rapports (redirection si non autorisé)
onMounted(() => {
  if (!canReviewReports()) {
    router.push('/reports');
  }
});
const toast = useToast();

// Check if user can review reports
if (!canReviewReports()) {
  navigateTo("/reports");
}

// Report type for the table
interface ReportRow {
  id: string;
  questionnaireTitle?: string;
  authorId: string;
  authorRole: string;
  state: string;
  modified: boolean;
  correctionReason: string | null;
  submittedAt: string;
  stateChangedAt: string;
}

// Modal state for report details
const selectedReport = ref<ReportRow | null>(null);
const detailsModalOpen = ref(false);

// State badge color mapping
type BadgeColor = "success" | "warning" | "info" | "error" | "neutral";
const stateColorMap: Record<string, BadgeColor> = {
  submitted: "info",
  returned: "warning",
  in_progress: "info",
  validated: "success",
};

// Filtered reports for review
const reportsForReview = computed<ReportRow[]>(() => {
  return filterReportsForReview(reports.value).map((report) => ({
    id: report.id,
    questionnaireTitle: report.questionnaireTitle,
    authorId: report.authorId,
    authorRole: report.authorRole,
    state: report.state,
    modified: report.modified,
    correctionReason: report.correctionReason,
    submittedAt: report.submittedAt.toISOString(),
    stateChangedAt: report.stateChangedAt.toISOString(),
  })) as ReportRow[];
});

// Table columns definition
const columns: TableColumn<ReportRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => `#${(row.getValue("id") as string).slice(0, 8)}`,
  },
  {
    accessorKey: "authorId",
    header: "Auteur",
    cell: ({ row }) => row.getValue("authorId") as string,
  },
  {
    accessorKey: "authorRole",
    header: "Rôle",
    cell: ({ row }) => {
      const role = row.getValue("authorRole") as string;
      return ROLE_LABELS[role] ?? role;
    },
  },
  {
    accessorKey: "state",
    header: "État",
    cell: ({ row }) => {
      const state = row.getValue("state") as string;
      const color = stateColorMap[state] ?? "neutral";
      const label = STATE_LABELS[state] ?? state;
      return h(UBadge, { color, variant: "subtle" }, () => label);
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Soumis le",
    cell: ({ row }) => {
      const date = new Date(row.getValue("submittedAt") as string);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    id: "modified",
    accessorKey: "modified",
    header: "Modifié",
    cell: ({ row }) => {
      const modified = row.getValue("modified") as boolean;
      if (modified) {
        return h(UBadge, { color: "warning", variant: "soft", size: "xs" }, () => "Oui");
      }
      return "-";
    },
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => {
      return h("div", { class: "flex justify-end gap-2" }, [
        h(
          resolveComponent("UButton"),
          {
            icon: "i-lucide-eye",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            "aria-label": "Voir les détails",
            onClick: () => openDetails(row.original),
          }
        ),
        h(resolveComponent("ReportsReviewActions"), {
          report: row.original,
          onValidate: handleValidate,
          onFlag: handleFlag,
        }),
      ]);
    },
  },
];

// Fetch reports on mount
onMounted(async () => {
  await reportsStore.fetchReports();
});

// Handle viewing report details
function openDetails(report: ReportRow) {
  selectedReport.value = report;
  detailsModalOpen.value = true;
}

// Handle validate action
async function handleValidate(reportId: string) {
  const result = await reportsStore.validateReport(reportId);
  if (result) {
    toast.add({
      title: "Rapport validé",
      description: "Le rapport a été validé avec succès.",
      color: "success",
      icon: "i-lucide-check-circle",
    });
  } else if (error.value) {
    toast.add({
      title: "Erreur",
      description: error.value,
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
}

// Handle flag action
async function handleFlag(reportId: string, reason: string) {
  const result = await reportsStore.flagReport(reportId, reason);
  if (result) {
    toast.add({
      title: "Rapport retourné",
      description: "Le rapport a été retourné pour correction.",
      color: "warning",
      icon: "i-lucide-flag",
    });
  } else if (error.value) {
    toast.add({
      title: "Erreur",
      description: error.value,
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">
          Rapports à examiner
        </h1>
        <p class="text-muted mt-1">
          Examinez et validez les rapports soumis par votre équipe
        </p>
      </div>

      <UButton
        icon="i-lucide-refresh-cw"
        color="neutral"
        variant="ghost"
        label="Actualiser"
        :loading="isLoading"
        @click="reportsStore.fetchReports()"
      />
    </div>

    <!-- Error message -->
    <UAlert
      v-if="error"
      color="error"
      icon="i-lucide-alert-circle"
      :title="error"
      :close-button="{ onClick: () => reportsStore.clearError() }"
    />

    <!-- Reports table -->
    <UCard>
      <UTable
        :data="reportsForReview"
        :columns="columns"
        :loading="isLoading"
        class="w-full"
      >
        <template #empty>
          <div class="py-12 text-center">
            <UIcon name="i-lucide-inbox" class="size-12 text-muted mx-auto mb-4" />
            <p class="text-lg font-medium text-highlighted">Aucun rapport à examiner</p>
            <p class="text-muted mt-1">
              Les rapports soumis apparaîtront ici pour examen.
            </p>
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Report details modal -->
    <UModal v-model:open="detailsModalOpen" :title="`Rapport #${selectedReport?.id.slice(0, 8)}`">
      <template #body>
        <ReportsReportDetails
          v-if="selectedReport"
          :report="selectedReport"
          show-data
          @close="detailsModalOpen = false"
        />
      </template>
    </UModal>
  </div>
</template>

