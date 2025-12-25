import { defineEventHandler } from "h3";
import { getUserSession } from "#imports";
import type { UserSession } from "../types/user";
import { createUnauthorizedError } from "../utils/errors";

// Extend H3Event context to include user session
declare module "h3" {
  interface H3EventContext {
    user?: UserSession;
  }
}

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/reset",
  "/api/health",
] as const;

/**
 * Check if a route is public
 */
function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
}

/**
 * Authentication middleware
 * Validates session and attaches user to context for all API routes
 */
export default defineEventHandler(async (event) => {
  const path = event.path;

  // Skip middleware for non-API routes
  if (!path.startsWith("/api/")) {
    return;
  }

  // Skip authentication for public routes
  if (isPublicRoute(path)) {
    return;
  }

  // Get session using nuxt-auth-utils
  const session = await getUserSession(event);

  // Check if user is authenticated
  if (!session?.user) {
    throw createUnauthorizedError("Authentication required");
  }

  // Validate session structure
  const user = session.user as UserSession;
  if (!user.phone || !user.role) {
    throw createUnauthorizedError("Invalid session data");
  }

  // Attach user to event context
  event.context.user = user;
});

/**
 * Helper to get authenticated user from event context
 * Throws if user is not authenticated
 */
export function getAuthenticatedUser(event: { context: { user?: UserSession } }): UserSession {
  const user = event.context.user;
  if (!user) {
    throw createUnauthorizedError("Authentication required");
  }
  return user;
}

/**
 * Helper to optionally get user from event context
 * Returns null if not authenticated
 */
export function getOptionalUser(event: { context: { user?: UserSession } }): UserSession | null {
  return event.context.user ?? null;
}

