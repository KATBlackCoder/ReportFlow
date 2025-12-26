import { logAudit, AuditAction, AuditResourceType } from "../../utils/audit";

/**
 * POST /api/auth/logout
 * Clear user session and logout
 */
export default defineEventHandler(async (event) => {
  // Get current session before clearing
  const session = await getUserSession(event);

  if (session?.user?.phone) {
    // Log logout event
    await logAudit(
      event,
      session.user.phone,
      AuditAction.USER_LOGOUT,
      AuditResourceType.USER,
      session.user.phone
    );
  }

  // Clear the session
  await clearUserSession(event);

  return {
    success: true,
    message: "Logged out successfully",
  };
});

