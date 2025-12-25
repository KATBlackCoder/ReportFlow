import type { Role } from "./roles";

/**
 * User entity interface
 */
export interface User {
  phone: string;
  email: string | null;
  passwordHash: string;
  role: Role;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User without sensitive data (for API responses)
 */
export interface PublicUser {
  phone: string;
  email: string | null;
  role: Role;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
}

/**
 * User session data (stored in session)
 */
export interface UserSession {
  phone: string;
  role: Role;
  firstName: string;
  lastName: string;
}

/**
 * User creation payload
 */
export interface CreateUserPayload {
  phone: string;
  email?: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
}

/**
 * User update payload
 */
export interface UpdateUserPayload {
  email?: string | null;
  password?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}

/**
 * Convert User to PublicUser (removes sensitive data)
 */
export function toPublicUser(user: User): PublicUser {
  return {
    phone: user.phone,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

/**
 * Get user display name
 */
export function getUserDisplayName(user: {
  firstName: string;
  lastName: string;
}): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

