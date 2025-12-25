/**
 * Vitest setup file for unit tests
 * This file runs before all tests
 */

import { vi } from "vitest";

// Mock Nuxt composables that aren't available in test environment
vi.mock("#imports", () => ({
  defineEventHandler: vi.fn((handler) => handler),
  createError: vi.fn((options) => {
    const error = new Error(options.message);
    Object.assign(error, options);
    return error;
  }),
  getUserSession: vi.fn(),
  setUserSession: vi.fn(),
  clearUserSession: vi.fn(),
}));

// Mock Vue composables
vi.mock("vue", async () => {
  const actual = await vi.importActual("vue");
  return {
    ...actual,
  };
});

// Global test utilities - Type augmentation handled by Vitest globals

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Cleanup after each test
afterEach(() => {
  vi.restoreAllMocks();
});

/**
 * Helper to create mock user session
 */
export function createMockUserSession(overrides = {}) {
  return {
    phone: "+33612345678",
    role: "R4",
    firstName: "Test",
    lastName: "User",
    ...overrides,
  };
}

/**
 * Helper to create mock H3 event
 */
export function createMockEvent(overrides = {}) {
  return {
    path: "/api/test",
    method: "GET",
    context: {},
    ...overrides,
  };
}

/**
 * Helper to create mock report
 */
export function createMockReport(overrides = {}) {
  return {
    id: "test-report-id",
    questionnaireId: "test-questionnaire-id",
    authorId: "+33612345678",
    authorRole: "R4",
    state: "submitted",
    data: {},
    modified: false,
    correctionReason: null,
    flaggedBy: null,
    validatedBy: null,
    submittedAt: new Date(),
    stateChangedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Helper to create mock user
 */
export function createMockUser(overrides = {}) {
  return {
    phone: "+33612345678",
    email: "test@example.com",
    passwordHash: "hashed_password",
    role: "R4",
    firstName: "Test",
    lastName: "User",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

