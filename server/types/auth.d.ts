import type { Role } from "./roles";

/**
 * Session user type for nuxt-auth-utils
 */
declare module "#auth-utils" {
  interface User {
    phone: string;
    email: string | null;
    role: Role;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: Date;
  }

  interface UserSession {
    user: User;
    loggedInAt: number;
  }

  interface SecureSessionData {
    // Additional secure session data (not exposed to client)
    passwordChangedAt?: number;
  }
}

export {};

