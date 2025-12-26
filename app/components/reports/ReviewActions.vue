<script setup lang="ts">
import { useReportWorkflow } from "../../composables/useReportWorkflow";

interface Report {
  id: string;
  authorRole: string;
  state: string;
}

const props = defineProps<{
  report: Report;
}>();

const emit = defineEmits<{
  validate: [reportId: string];
  flag: [reportId: string, reason: string];
}>();

const { canValidateReport, canFlagReport } = useReportWorkflow();

// Modal state for flagging
const flagModalOpen = ref(false);
const flagReason = ref("");
const flagReasonError = ref<string | null>(null);

// Loading states
const isValidating = ref(false);
const isFlagging = ref(false);

// Check if current user can perform actions
const canValidate = computed(() =>
  canValidateReport(props.report.authorRole, props.report.state)
);

const canFlag = computed(() =>
  canFlagReport(props.report.authorRole, props.report.state)
);

const hasActions = computed(() => canValidate.value || canFlag.value);

// Handle validate action
async function handleValidate() {
  isValidating.value = true;
  try {
    emit("validate", props.report.id);
  } finally {
    isValidating.value = false;
  }
}

// Handle flag action
function openFlagModal() {
  flagReason.value = "";
  flagReasonError.value = null;
  flagModalOpen.value = true;
}

function validateFlagReason(): boolean {
  if (!flagReason.value.trim()) {
    flagReasonError.value = "La raison est obligatoire";
    return false;
  }
  if (flagReason.value.trim().length < 10) {
    flagReasonError.value = "La raison doit contenir au moins 10 caractères";
    return false;
  }
  if (flagReason.value.length > 1000) {
    flagReasonError.value = "La raison ne doit pas dépasser 1000 caractères";
    return false;
  }
  flagReasonError.value = null;
  return true;
}

async function handleFlag() {
  if (!validateFlagReason()) return;

  isFlagging.value = true;
  try {
    emit("flag", props.report.id, flagReason.value.trim());
    flagModalOpen.value = false;
  } finally {
    isFlagging.value = false;
  }
}
</script>

<template>
  <div v-if="hasActions" class="flex items-center gap-2">
    <!-- Validate button -->
    <UButton
      v-if="canValidate"
      color="success"
      variant="soft"
      icon="i-lucide-check"
      label="Valider"
      :loading="isValidating"
      @click="handleValidate"
    />

    <!-- Flag button -->
    <UButton
      v-if="canFlag"
      color="warning"
      variant="soft"
      icon="i-lucide-flag"
      label="Retourner"
      :loading="isFlagging"
      @click="openFlagModal"
    />

    <!-- Flag Modal -->
    <UModal v-model:open="flagModalOpen" title="Retourner le rapport">
      <template #body>
        <div class="space-y-4">
          <p class="text-sm text-muted">
            Veuillez indiquer la raison pour laquelle ce rapport doit être corrigé.
            L'auteur recevra ce message.
          </p>

          <UFormField
            label="Raison de la correction"
            :error="flagReasonError ?? undefined"
            required
          >
            <UTextarea
              v-model="flagReason"
              placeholder="Décrivez ce qui doit être corrigé..."
              :rows="4"
              class="w-full"
            />
          </UFormField>

          <p class="text-xs text-muted">
            Minimum 10 caractères, maximum 1000 caractères.
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="neutral"
            variant="ghost"
            label="Annuler"
            @click="flagModalOpen = false"
          />
          <UButton
            color="warning"
            icon="i-lucide-flag"
            label="Retourner"
            :loading="isFlagging"
            @click="handleFlag"
          />
        </div>
      </template>
    </UModal>
  </div>

  <!-- No actions available message -->
  <div v-else class="text-sm text-muted italic">
    Aucune action disponible
  </div>
</template>

