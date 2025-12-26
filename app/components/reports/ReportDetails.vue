<script setup lang="ts">
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

interface ReportData {
  id: string;
  questionnaireId?: string;
  questionnaireTitle?: string;
  authorId: string;
  authorRole: string;
  state: string;
  data?: Record<string, unknown>;
  modified: boolean;
  correctionReason: string | null;
  flaggedBy?: string | null;
  validatedBy?: string | null;
  submittedAt: string | Date;
  stateChangedAt: string | Date;
  createdAt?: string | Date;
}

defineProps<{
  report: ReportData;
  showData?: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

// State badge color mapping
type BadgeColor = "success" | "warning" | "info" | "error" | "neutral";
const stateColorMap: Record<string, BadgeColor> = {
  submitted: "info",
  returned: "warning",
  in_progress: "info",
  validated: "success",
};

// Format date for display
function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Get state label
function getStateLabel(state: string): string {
  return STATE_LABELS[state] ?? state;
}

// Get role label
function getRoleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

// Get state color
function getStateColor(state: string): BadgeColor {
  return stateColorMap[state] ?? "neutral";
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-highlighted">
          Rapport #{{ report.id.slice(0, 8) }}
        </h3>
        <UBadge
          :color="getStateColor(report.state)"
          variant="subtle"
          size="lg"
        >
          {{ getStateLabel(report.state) }}
        </UBadge>
      </div>
    </template>

    <div class="space-y-4">
      <!-- Report metadata -->
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-muted">Auteur</p>
          <p class="font-medium text-highlighted">{{ report.authorId }}</p>
        </div>
        <div>
          <p class="text-muted">Rôle de l'auteur</p>
          <p class="font-medium text-highlighted">
            {{ getRoleLabel(report.authorRole) }}
          </p>
        </div>
        <div>
          <p class="text-muted">Soumis le</p>
          <p class="font-medium text-highlighted">
            {{ formatDate(report.submittedAt) }}
          </p>
        </div>
        <div>
          <p class="text-muted">Dernière mise à jour</p>
          <p class="font-medium text-highlighted">
            {{ formatDate(report.stateChangedAt) }}
          </p>
        </div>
      </div>

      <!-- Modified indicator -->
      <div v-if="report.modified" class="flex items-center gap-2 p-3 rounded-lg bg-warning/10">
        <UIcon name="i-lucide-edit-3" class="size-5 text-warning" />
        <span class="text-sm text-warning">Ce rapport a été modifié après sa soumission initiale</span>
      </div>

      <!-- Correction reason if returned -->
      <div v-if="report.correctionReason" class="p-4 rounded-lg bg-warning/10 border border-warning/20">
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-alert-triangle" class="size-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-warning">Raison du retour</p>
            <p class="mt-1 text-sm text-muted">{{ report.correctionReason }}</p>
          </div>
        </div>
      </div>

      <!-- Questionnaire title -->
      <div v-if="report.questionnaireTitle">
        <p class="text-muted text-sm">Questionnaire</p>
        <p class="font-medium text-highlighted">{{ report.questionnaireTitle }}</p>
      </div>

      <!-- Report data if shown -->
      <div v-if="showData && report.data" class="space-y-3">
        <p class="text-muted text-sm font-medium">Données du rapport</p>
        <div class="p-4 rounded-lg bg-elevated/50 overflow-auto max-h-64">
          <dl class="space-y-2">
            <div v-for="(value, key) in report.data" :key="String(key)" class="flex gap-2">
              <dt class="text-muted shrink-0 min-w-32">{{ key }}:</dt>
              <dd class="text-highlighted">{{ value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Validated by info -->
      <div v-if="report.validatedBy" class="flex items-center gap-2 text-sm">
        <UIcon name="i-lucide-check-circle" class="size-4 text-success" />
        <span class="text-muted">Validé par:</span>
        <span class="font-medium text-highlighted">{{ report.validatedBy }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          color="neutral"
          variant="ghost"
          label="Fermer"
          @click="emit('close')"
        />
      </div>
    </template>
  </UCard>
</template>

