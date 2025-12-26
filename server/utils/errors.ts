import type { H3Error } from "h3";
import { createError } from "h3";

/**
 * Standard error codes for the application
 */
export enum ErrorCode {
  // Authentication errors
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  SESSION_EXPIRED = "SESSION_EXPIRED",

  // Authorization errors
  FORBIDDEN = "FORBIDDEN",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

  // Validation errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",

  // Resource errors
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  CONFLICT = "CONFLICT",

  // Business logic errors
  INVALID_STATE_TRANSITION = "INVALID_STATE_TRANSITION",
  REPORT_LOCKED = "REPORT_LOCKED",
  REASON_REQUIRED = "REASON_REQUIRED",

  // Server errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
}

/**
 * Create an unauthorized error (401)
 */
export function createUnauthorizedError(
  message = "Authentication required"
): H3Error {
  return createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
    message,
    data: { code: ErrorCode.UNAUTHORIZED },
  });
}

/**
 * Create an invalid credentials error (401)
 */
export function createInvalidCredentialsError(
  message = "Invalid credentials"
): H3Error {
  return createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
    message,
    data: { code: ErrorCode.INVALID_CREDENTIALS },
  });
}

/**
 * Create a forbidden error (403)
 */
export function createForbiddenError(
  message = "You do not have permission to perform this action"
): H3Error {
  return createError({
    statusCode: 403,
    statusMessage: "Forbidden",
    message,
    data: { code: ErrorCode.FORBIDDEN },
  });
}

/**
 * Create an insufficient permissions error (403)
 */
export function createInsufficientPermissionsError(
  message = "Insufficient permissions for this operation"
): H3Error {
  return createError({
    statusCode: 403,
    statusMessage: "Forbidden",
    message,
    data: { code: ErrorCode.INSUFFICIENT_PERMISSIONS },
  });
}

/**
 * Create a not found error (404)
 */
export function createNotFoundError(
  resource: string,
  identifier?: string
): H3Error {
  const message = identifier
    ? `${resource} with identifier '${identifier}' not found`
    : `${resource} not found`;

  return createError({
    statusCode: 404,
    statusMessage: "Not Found",
    message,
    data: { code: ErrorCode.NOT_FOUND, resource, identifier },
  });
}

/**
 * Create an already exists error (409)
 */
export function createAlreadyExistsError(
  resource: string,
  identifier?: string
): H3Error {
  const message = identifier
    ? `${resource} with identifier '${identifier}' already exists`
    : `${resource} already exists`;

  return createError({
    statusCode: 409,
    statusMessage: "Conflict",
    message,
    data: { code: ErrorCode.ALREADY_EXISTS, resource, identifier },
  });
}

/**
 * Create a conflict error (409)
 */
export function createConflictError(message: string): H3Error {
  return createError({
    statusCode: 409,
    statusMessage: "Conflict",
    message,
    data: { code: ErrorCode.CONFLICT },
  });
}

/**
 * Create a validation error (400)
 */
export function createValidationError(
  message: string,
  errors?: Record<string, string[]>
): H3Error {
  return createError({
    statusCode: 400,
    statusMessage: "Bad Request",
    message,
    data: { code: ErrorCode.VALIDATION_ERROR, errors },
  });
}

/**
 * Create a bad request error (400)
 */
export function createBadRequestError(message: string): H3Error {
  return createError({
    statusCode: 400,
    statusMessage: "Bad Request",
    message,
    data: { code: ErrorCode.VALIDATION_ERROR },
  });
}

/**
 * Create an invalid input error (400)
 */
export function createInvalidInputError(
  field: string,
  message: string
): H3Error {
  return createError({
    statusCode: 400,
    statusMessage: "Bad Request",
    message: `Invalid ${field}: ${message}`,
    data: { code: ErrorCode.INVALID_INPUT, field },
  });
}

/**
 * Create an invalid state transition error (400)
 */
export function createInvalidStateTransitionError(
  fromState: string,
  toState: string
): H3Error {
  return createError({
    statusCode: 400,
    statusMessage: "Bad Request",
    message: `Cannot transition from '${fromState}' to '${toState}'`,
    data: { code: ErrorCode.INVALID_STATE_TRANSITION, fromState, toState },
  });
}

/**
 * Create a report locked error (403)
 */
export function createReportLockedError(): H3Error {
  return createError({
    statusCode: 403,
    statusMessage: "Forbidden",
    message: "Report is locked and cannot be modified",
    data: { code: ErrorCode.REPORT_LOCKED },
  });
}

/**
 * Create a reason required error (400)
 */
export function createReasonRequiredError(): H3Error {
  return createError({
    statusCode: 400,
    statusMessage: "Bad Request",
    message: "A reason is required when flagging a report",
    data: { code: ErrorCode.REASON_REQUIRED },
  });
}

/**
 * Create an internal server error (500)
 */
export function createInternalError(
  message = "An internal error occurred"
): H3Error {
  return createError({
    statusCode: 500,
    statusMessage: "Internal Server Error",
    message,
    data: { code: ErrorCode.INTERNAL_ERROR },
  });
}

/**
 * Create a database error (500)
 */
export function createDatabaseError(
  message = "Database operation failed"
): H3Error {
  return createError({
    statusCode: 500,
    statusMessage: "Internal Server Error",
    message,
    data: { code: ErrorCode.DATABASE_ERROR },
  });
}

