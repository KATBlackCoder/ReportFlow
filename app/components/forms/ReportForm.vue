<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Questionnaire, QuestionnaireField } from "../../../server/types/questionnaire";

const props = defineProps<{
  questionnaire: Questionnaire;
  loading?: boolean;
  initialData?: Record<string, unknown>;
}>();

const emit = defineEmits<{
  submit: [data: Record<string, unknown>];
  cancel: [];
}>();

// Build form state from questionnaire fields
const formState = reactive<Record<string, unknown>>({});

// Initialize form state with default values or initial data
onMounted(() => {
  for (const field of props.questionnaire.fields) {
    if (props.initialData?.[field.id] !== undefined) {
      formState[field.id] = props.initialData[field.id];
    } else if (field.defaultValue !== undefined) {
      formState[field.id] = field.defaultValue;
    } else {
      // Set appropriate default based on field type
      switch (field.type) {
        case "checkbox":
          formState[field.id] = false;
          break;
        case "multiselect":
          formState[field.id] = [];
          break;
        case "number":
          formState[field.id] = undefined;
          break;
        default:
          formState[field.id] = "";
      }
    }
  }
});

// Custom validation based on questionnaire field rules
function validate(state: Record<string, unknown>): Array<{ name: string; message: string }> {
  const errors: Array<{ name: string; message: string }> = [];

  for (const field of props.questionnaire.fields) {
    const value = state[field.id];
    const rules = field.validation;

    if (!rules) continue;

    // Required validation
    if (rules.required) {
      if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        errors.push({ name: field.id, message: `${field.label} est requis` });
        continue;
      }
    }

    // String validations
    if (typeof value === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push({ name: field.id, message: `${field.label} doit contenir au moins ${rules.minLength} caractères` });
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push({ name: field.id, message: `${field.label} ne doit pas dépasser ${rules.maxLength} caractères` });
      }
      if (rules.pattern) {
        const regex = new RegExp(rules.pattern);
        if (!regex.test(value)) {
          errors.push({ name: field.id, message: rules.patternMessage || `${field.label} format invalide` });
        }
      }
    }

    // Number validations
    if (typeof value === "number") {
      if (rules.min !== undefined && value < rules.min) {
        errors.push({ name: field.id, message: `${field.label} doit être au moins ${rules.min}` });
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push({ name: field.id, message: `${field.label} ne doit pas dépasser ${rules.max}` });
      }
    }
  }

  return errors;
}

// Handle form submission
function onSubmit(event: FormSubmitEvent<Record<string, unknown>>) {
  emit("submit", event.data);
}

// Get input type for field
function getInputType(field: QuestionnaireField): string {
  switch (field.type) {
    case "text":
      return "text";
    case "number":
      return "number";
    case "date":
      return "date";
    case "time":
      return "time";
    case "datetime":
      return "datetime-local";
    default:
      return "text";
  }
}

// Check if field should use select
function isSelectField(field: QuestionnaireField): boolean {
  return field.type === "select" || field.type === "multiselect";
}

// Check if field should use textarea
function isTextareaField(field: QuestionnaireField): boolean {
  return field.type === "textarea";
}

// Check if field should use checkbox
function isCheckboxField(field: QuestionnaireField): boolean {
  return field.type === "checkbox";
}

// Check if field should use radio
function isRadioField(field: QuestionnaireField): boolean {
  return field.type === "radio";
}

// Sort fields by order
const sortedFields = computed(() => {
  return [...props.questionnaire.fields].sort((a, b) => a.order - b.order);
});

// Helper functions to get typed values from formState
function getStringValue(fieldId: string): string {
  return String(formState[fieldId] ?? "");
}

function getBooleanValue(fieldId: string): boolean {
  return Boolean(formState[fieldId]);
}

function getInputValue(fieldId: string): string | number {
  const value = formState[fieldId];
  if (typeof value === "number") return value;
  return String(value ?? "");
}
</script>

<template>
  <UForm
    :state="formState"
    :validate="validate"
    class="space-y-6"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <template v-for="field in sortedFields" :key="field.id">
        <!-- Textarea -->
        <UFormField
          v-if="isTextareaField(field)"
          :label="field.label"
          :name="field.id"
          :description="field.description"
          :required="field.validation?.required"
        >
          <UTextarea
            :model-value="getStringValue(field.id)"
            :placeholder="field.placeholder"
            :rows="4"
            class="w-full"
            @update:model-value="formState[field.id] = $event"
          />
        </UFormField>

        <!-- Checkbox -->
        <UFormField
          v-else-if="isCheckboxField(field)"
          :name="field.id"
          :description="field.description"
        >
          <UCheckbox
            :model-value="getBooleanValue(field.id)"
            :label="field.label"
            @update:model-value="formState[field.id] = $event"
          />
        </UFormField>

        <!-- Radio group -->
        <UFormField
          v-else-if="isRadioField(field)"
          :label="field.label"
          :name="field.id"
          :description="field.description"
          :required="field.validation?.required"
        >
          <URadioGroup
            :model-value="getStringValue(field.id)"
            :items="field.options?.map(opt => ({ value: opt.value, label: opt.label })) ?? []"
            @update:model-value="formState[field.id] = $event"
          />
        </UFormField>

        <!-- Select -->
        <UFormField
          v-else-if="isSelectField(field)"
          :label="field.label"
          :name="field.id"
          :description="field.description"
          :required="field.validation?.required"
        >
          <USelect
            :model-value="getStringValue(field.id)"
            :items="field.options?.map(opt => ({ value: opt.value, label: opt.label })) ?? []"
            :placeholder="field.placeholder || 'Sélectionnez...'"
            value-key="value"
            class="w-full"
            @update:model-value="formState[field.id] = $event"
          />
        </UFormField>

        <!-- Default input -->
        <UFormField
          v-else
          :label="field.label"
          :name="field.id"
          :description="field.description"
          :required="field.validation?.required"
        >
          <UInput
            :model-value="getInputValue(field.id)"
            :type="getInputType(field)"
            :placeholder="field.placeholder"
            :min="field.validation?.min"
            :max="field.validation?.max"
            :minlength="field.validation?.minLength"
            :maxlength="field.validation?.maxLength"
            class="w-full"
            @update:model-value="formState[field.id] = $event"
          />
        </UFormField>
      </template>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-700/50">
      <UButton
        type="button"
        variant="ghost"
        color="neutral"
        :disabled="loading"
        @click="emit('cancel')"
      >
        Annuler
      </UButton>
      <UButton
        type="submit"
        :loading="loading"
        icon="i-lucide-send"
      >
        Soumettre
      </UButton>
    </div>
  </UForm>
</template>

