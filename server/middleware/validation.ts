import { defineEventHandler, readBody, getQuery } from "h3";
import { createValidationError, createInvalidInputError } from "../utils/errors";

/**
 * Input sanitization patterns
 */
const SANITIZATION_PATTERNS = {
  // Remove null bytes and control characters (eslint-disable-next-line no-control-regex)
  // eslint-disable-next-line no-control-regex
  nullBytes: /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,
  // Limit consecutive whitespace
  excessiveWhitespace: /\s{10,}/g,
  // Remove potential script injection
  scriptTags: /<script[^>]*>[\s\S]*?<\/script>/gi,
} as const;

/**
 * Phone number validation pattern (flexible international format)
 */
const PHONE_PATTERN = /^\+?[\d\s\-()]{8,20}$/;

/**
 * Email validation pattern
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * UUID validation pattern
 */
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Sanitize a string value
 */
export function sanitizeString(value: string): string {
  let sanitized = value;

  // Remove null bytes and control characters
  sanitized = sanitized.replace(SANITIZATION_PATTERNS.nullBytes, "");

  // Limit excessive whitespace
  sanitized = sanitized.replace(SANITIZATION_PATTERNS.excessiveWhitespace, " ");

  // Remove script tags
  sanitized = sanitized.replace(SANITIZATION_PATTERNS.scriptTags, "");

  // Trim and limit length
  sanitized = sanitized.trim().substring(0, 10000);

  return sanitized;
}

/**
 * Recursively sanitize an object
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string"
          ? sanitizeString(item)
          : typeof item === "object" && item !== null
            ? sanitizeObject(item as Record<string, unknown>)
            : item
      );
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  return UUID_PATTERN.test(uuid);
}

/**
 * Normalize phone number (remove spaces, dashes, parentheses)
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-()]/g, "");
}

/**
 * Validation middleware
 * Sanitizes all incoming request body and query parameters
 */
export default defineEventHandler(async (event) => {
  const path = event.path;

  // Only process API routes
  if (!path.startsWith("/api/")) {
    return;
  }

  // Only process POST, PUT, PATCH requests for body sanitization
  const method = event.method;
  if (["POST", "PUT", "PATCH"].includes(method)) {
    try {
      const body = await readBody(event);
      if (body && typeof body === "object") {
        // Store sanitized body for handler access
        event.context.sanitizedBody = sanitizeObject(body);
      }
    } catch {
      // No body or invalid JSON - let the handler deal with it
    }
  }

  // Sanitize query parameters
  const query = getQuery(event);
  if (query && Object.keys(query).length > 0) {
    const sanitizedQuery: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(query)) {
      if (typeof value === "string") {
        sanitizedQuery[key] = sanitizeString(value);
      } else {
        sanitizedQuery[key] = value;
      }
    }
    event.context.sanitizedQuery = sanitizedQuery;
  }
});

/**
 * Validation helper for required fields
 */
export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): void {
  const missing = requiredFields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length > 0) {
    throw createValidationError(`Missing required fields: ${missing.join(", ")}`);
  }
}

/**
 * Validation helper for phone number
 */
export function validatePhone(phone: unknown, fieldName = "phone"): string {
  if (typeof phone !== "string") {
    throw createInvalidInputError(fieldName, "must be a string");
  }

  if (!isValidPhone(phone)) {
    throw createInvalidInputError(fieldName, "invalid phone number format");
  }

  return normalizePhone(phone);
}

/**
 * Validation helper for optional email
 */
export function validateEmail(email: unknown, fieldName = "email"): string | null {
  if (email === undefined || email === null || email === "") {
    return null;
  }

  if (typeof email !== "string") {
    throw createInvalidInputError(fieldName, "must be a string");
  }

  if (!isValidEmail(email)) {
    throw createInvalidInputError(fieldName, "invalid email format");
  }

  return email.toLowerCase().trim();
}

/**
 * Validation helper for UUID
 */
export function validateUUID(uuid: unknown, fieldName = "id"): string {
  if (typeof uuid !== "string") {
    throw createInvalidInputError(fieldName, "must be a string");
  }

  if (!isValidUUID(uuid)) {
    throw createInvalidInputError(fieldName, "invalid UUID format");
  }

  return uuid.toLowerCase();
}

/**
 * Validation helper for string with length constraints
 */
export function validateString(
  value: unknown,
  fieldName: string,
  options?: { minLength?: number; maxLength?: number }
): string {
  if (typeof value !== "string") {
    throw createInvalidInputError(fieldName, "must be a string");
  }

  const trimmed = value.trim();

  if (options?.minLength && trimmed.length < options.minLength) {
    throw createInvalidInputError(
      fieldName,
      `must be at least ${options.minLength} characters`
    );
  }

  if (options?.maxLength && trimmed.length > options.maxLength) {
    throw createInvalidInputError(
      fieldName,
      `must be at most ${options.maxLength} characters`
    );
  }

  return trimmed;
}

