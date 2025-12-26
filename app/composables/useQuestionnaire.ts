import type { Questionnaire, QuestionnaireField } from "../../server/types/questionnaire";
import { useReportsStore } from "../stores/reports.store";
import { computed } from "vue";
/**
 * Composable for questionnaire display and interaction logic
 */
export function useQuestionnaire() {
  const reportsStore = useReportsStore();

  /**
   * Current questionnaire from store
   */
  const questionnaire = computed(() => reportsStore.currentQuestionnaire);

  /**
   * Loading state
   */
  const isLoading = computed(() => reportsStore.isLoading);

  /**
   * Error state
   */
  const error = computed(() => reportsStore.error);

  /**
   * Sorted fields by order
   */
  const sortedFields = computed<QuestionnaireField[]>(() => {
    if (!questionnaire.value?.fields) return [];
    return [...questionnaire.value.fields].sort((a, b) => a.order - b.order);
  });

  /**
   * Fetch active questionnaire for current user's role
   */
  async function fetchActive(): Promise<Questionnaire | null> {
    return reportsStore.fetchActiveQuestionnaire();
  }

  /**
   * Fetch questionnaire by ID
   */
  async function fetchById(id: string): Promise<Questionnaire | null> {
    return reportsStore.fetchQuestionnaire(id);
  }

  /**
   * Clear current questionnaire
   */
  function clear(): void {
    reportsStore.clearCurrentQuestionnaire();
  }

  /**
   * Validate form data against questionnaire fields
   */
  function validateFormData(
    data: Record<string, unknown>,
    fields: QuestionnaireField[]
  ): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    for (const field of fields) {
      const value = data[field.id];
      const rules = field.validation;

      if (!rules) continue;

      // Required validation
      if (rules.required) {
        const isEmpty = value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          errors[field.id] = `${field.label} est requis`;
          continue;
        }
      }

      // String validations
      if (typeof value === "string") {
        if (rules.minLength && value.length < rules.minLength) {
          errors[field.id] = `Minimum ${rules.minLength} caractères`;
        } else if (rules.maxLength && value.length > rules.maxLength) {
          errors[field.id] = `Maximum ${rules.maxLength} caractères`;
        } else if (rules.pattern) {
          const regex = new RegExp(rules.pattern);
          if (!regex.test(value)) {
            errors[field.id] = rules.patternMessage || "Format invalide";
          }
        }
      }

      // Number validations
      if (typeof value === "number") {
        if (rules.min !== undefined && value < rules.min) {
          errors[field.id] = `Minimum ${rules.min}`;
        } else if (rules.max !== undefined && value > rules.max) {
          errors[field.id] = `Maximum ${rules.max}`;
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Get field by ID
   */
  function getFieldById(fieldId: string): QuestionnaireField | undefined {
    return questionnaire.value?.fields.find((f: QuestionnaireField) => f.id === fieldId);
  }

  /**
   * Build initial form state from questionnaire fields
   */
  function buildInitialState(
    fields: QuestionnaireField[],
    existingData?: Record<string, unknown>
  ): Record<string, unknown> {
    const state: Record<string, unknown> = {};

    for (const field of fields) {
      if (existingData?.[field.id] !== undefined) {
        state[field.id] = existingData[field.id];
      } else if (field.defaultValue !== undefined) {
        state[field.id] = field.defaultValue;
      } else {
        // Set appropriate default based on field type
        switch (field.type) {
          case "checkbox":
            state[field.id] = false;
            break;
          case "multiselect":
            state[field.id] = [];
            break;
          case "number":
            state[field.id] = undefined;
            break;
          default:
            state[field.id] = "";
        }
      }
    }

    return state;
  }

  return {
    // State
    questionnaire,
    sortedFields,
    isLoading,
    error,

    // Actions
    fetchActive,
    fetchById,
    clear,
    validateFormData,
    getFieldById,
    buildInitialState,
  };
}

