// Questionnaire types for role-specific form templates

/**
 * Form field types supported in questionnaires
 */
export enum FieldType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  SELECT = "select",
  MULTISELECT = "multiselect",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  FILE = "file",
}

/**
 * Form field validation rules
 */
export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  patternMessage?: string;
}

/**
 * Select/Radio option definition
 */
export interface FieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Form field definition
 */
export interface QuestionnaireField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  validation?: FieldValidation;
  options?: FieldOption[]; // For select, multiselect, radio
  defaultValue?: unknown;
  order: number;
}

/**
 * Questionnaire entity interface
 */
export interface Questionnaire {
  id: string;
  title: string;
  description: string | null;
  targetRole: "R3" | "R4";
  version: number;
  isActive: boolean;
  fields: QuestionnaireField[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Questionnaire creation payload
 */
export interface CreateQuestionnairePayload {
  title: string;
  description?: string;
  targetRole: "R3" | "R4";
  fields: QuestionnaireField[];
}

/**
 * Questionnaire update payload
 */
export interface UpdateQuestionnairePayload {
  title?: string;
  description?: string | null;
  fields?: QuestionnaireField[];
  isActive?: boolean;
}

/**
 * Questionnaire summary (for listings)
 */
export interface QuestionnaireSummary {
  id: string;
  title: string;
  targetRole: "R3" | "R4";
  version: number;
  isActive: boolean;
  fieldCount: number;
  createdAt: Date;
}

/**
 * Convert questionnaire to summary
 */
export function toQuestionnaireSummary(
  questionnaire: Questionnaire
): QuestionnaireSummary {
  return {
    id: questionnaire.id,
    title: questionnaire.title,
    targetRole: questionnaire.targetRole,
    version: questionnaire.version,
    isActive: questionnaire.isActive,
    fieldCount: questionnaire.fields.length,
    createdAt: questionnaire.createdAt,
  };
}

/**
 * Validate questionnaire fields structure
 */
export function validateQuestionnaireFields(
  fields: QuestionnaireField[]
): string[] {
  const errors: string[] = [];
  const fieldIds = new Set<string>();

  for (const field of fields) {
    // Check for duplicate IDs
    if (fieldIds.has(field.id)) {
      errors.push(`Duplicate field ID: ${field.id}`);
    }
    fieldIds.add(field.id);

    // Validate field type
    if (!Object.values(FieldType).includes(field.type)) {
      errors.push(`Invalid field type for '${field.id}': ${field.type}`);
    }

    // Validate options for select/radio fields
    if (["select", "multiselect", "radio"].includes(field.type)) {
      if (!field.options || field.options.length === 0) {
        errors.push(`Field '${field.id}' requires options`);
      }
    }

    // Validate label
    if (!field.label?.trim()) {
      errors.push(`Field '${field.id}' requires a label`);
    }
  }

  return errors;
}

