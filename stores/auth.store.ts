import { defineStore } from "pinia";
import type { PublicUser, UserSession } from "../server/types/user";
import type { Role } from "../server/types/roles";


/**
 * Auth store using nuxt-auth-utils session
 * Manages user authentication state with Pinia setup syntax
 */
export const useAuthStore = defineStore("auth", () => {
  // Use nuxt-auth-utils composable
  const { loggedIn, user, fetch, clear } = useUserSession();

  // Loading state for auth operations
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Current user data from session
   */
  const currentUser = computed<PublicUser | null>(() => {
    if (!loggedIn.value || !user.value) return null;
    return user.value as PublicUser;
  });

  /**
   * Current user role
   */
  const currentRole = computed<Role | null>(() => {
    return currentUser.value?.role ?? null;
  });

  /**
   * Current user session data
   */
  const currentSession = computed<UserSession | null>(() => {
    if (!loggedIn.value || !user.value) return null;
    return {
      phone: (user.value as UserSession).phone,
      role: (user.value as UserSession).role as Role,
      firstName: (user.value as UserSession).firstName,
      lastName: (user.value as UserSession).lastName,
    } as UserSession;
  });

  /**
   * Display name for current user
   */
  const displayName = computed<string>(() => {
    if (!currentUser.value) return "";
    return `${currentUser.value.firstName} ${currentUser.value.lastName}`.trim();
  });

  /**
   * Login with identifier (phone or email) and password
   */
  async function login(identifier: string, password: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;

    try {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: { identifier, password },
      });

      // Refresh session to get user data
      await fetch();

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      error.value = message;
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Logout and clear session
   */
  async function logout(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      // Try server-side logout first
      await $fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore server errors (session may already be expired)
    }

    try {
      // Clear local session (ignore 401 errors if session already gone)
      await clear();
    } catch {
      // Ignore clear errors - session is already invalid
    }

    isLoading.value = false;

    // Always redirect to login page
    await navigateTo("/auth/login");
  }

  /**
   * Refresh session data from server
   */
  async function refreshSession(): Promise<void> {
    try {
      await fetch();
    } catch {
      // Session invalid, clear it
      await clear();
    }
  }

  /**
   * Request password reset
   */
  async function requestPasswordReset(email: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;

    try {
      await $fetch("/api/auth/reset", {
        method: "POST",
        body: { email },
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Password reset request failed";
      error.value = message;
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Clear any error state
   */
  function clearError(): void {
    error.value = null;
  }

  return {
    // State
    isLoading,
    error,
    loggedIn,

    // Getters
    currentUser,
    currentRole,
    currentSession,
    displayName,

    // Actions
    login,
    logout,
    refreshSession,
    requestPasswordReset,
    clearError,
  };
});

