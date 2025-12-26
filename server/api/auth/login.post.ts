import { eq, or } from "drizzle-orm";
import { db, schema } from "hub:db";
import { createInvalidCredentialsError, createValidationError, createUnauthorizedError } from "../../utils/errors";
import { logAudit, AuditAction, AuditResourceType } from "../../utils/audit";
import type { Role } from "../../types/roles";

/**
 * Login request body schema
 */
interface LoginBody {
  identifier: string; // Phone or email
  password: string;
}

/**
 * POST /api/auth/login
 * Authenticate user with phone/email and password
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);

  // Validate required fields
  if (!body.identifier?.trim() || !body.password) {
    throw createValidationError("Identifier and password are required");
  }

  const identifier = body.identifier.trim().toLowerCase();

  // Find user by phone or email
  const user = await db.query.users.findFirst({
    where: or(
      eq(schema.users.phone, identifier),
      eq(schema.users.email, identifier)
    ),
  });

  // User not found - use generic message for security
  if (!user) {
    throw createInvalidCredentialsError();
  }

  // Check if user is active
  if (!user.isActive) {
    throw createUnauthorizedError("Account is disabled");
  }

  // Verify password
  const isValidPassword = await verifyPassword(user.passwordHash, body.password);

  if (!isValidPassword) {
    // Log failed login attempt
    await logAudit(
      event,
      user.phone,
      AuditAction.USER_LOGIN_FAILED,
      AuditResourceType.USER,
      user.phone,
      { newValues: { reason: "invalid_password" } }
    );

    throw createInvalidCredentialsError();
  }

  // Set user session
  await setUserSession(event, {
    user: {
      phone: user.phone,
      email: user.email,
      role: user.role as Role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
    loggedInAt: Date.now(),
  });

  // Log successful login
  await logAudit(
    event,
    user.phone,
    AuditAction.USER_LOGIN,
    AuditResourceType.USER,
    user.phone
  );

  return {
    success: true,
    user: {
      phone: user.phone,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
  };
});

