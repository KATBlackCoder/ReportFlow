import { describe, it, expect } from "vitest";
import {
  Role,
  ROLE_HIERARCHY,
  isRoleSuperior,
  isRoleEqualOrSuperior,
  getManageableRoles,
  canManageRole,
  isValidRole,
} from "~/server/types/roles";

describe("Role types and utilities", () => {
  describe("Role enum", () => {
    it("should have all four roles defined", () => {
      expect(Role.R1).toBe("R1");
      expect(Role.R2).toBe("R2");
      expect(Role.R3).toBe("R3");
      expect(Role.R4).toBe("R4");
    });
  });

  describe("ROLE_HIERARCHY", () => {
    it("should have correct hierarchy order (lower number = higher rank)", () => {
      expect(ROLE_HIERARCHY[Role.R1]).toBeLessThan(ROLE_HIERARCHY[Role.R2]);
      expect(ROLE_HIERARCHY[Role.R2]).toBeLessThan(ROLE_HIERARCHY[Role.R3]);
      expect(ROLE_HIERARCHY[Role.R3]).toBeLessThan(ROLE_HIERARCHY[Role.R4]);
    });
  });

  describe("isRoleSuperior", () => {
    it("should return true when role is superior", () => {
      expect(isRoleSuperior(Role.R1, Role.R2)).toBe(true);
      expect(isRoleSuperior(Role.R1, Role.R3)).toBe(true);
      expect(isRoleSuperior(Role.R1, Role.R4)).toBe(true);
      expect(isRoleSuperior(Role.R2, Role.R3)).toBe(true);
      expect(isRoleSuperior(Role.R2, Role.R4)).toBe(true);
      expect(isRoleSuperior(Role.R3, Role.R4)).toBe(true);
    });

    it("should return false when role is not superior", () => {
      expect(isRoleSuperior(Role.R1, Role.R1)).toBe(false);
      expect(isRoleSuperior(Role.R2, Role.R1)).toBe(false);
      expect(isRoleSuperior(Role.R3, Role.R2)).toBe(false);
      expect(isRoleSuperior(Role.R4, Role.R3)).toBe(false);
    });
  });

  describe("isRoleEqualOrSuperior", () => {
    it("should return true when role is equal", () => {
      expect(isRoleEqualOrSuperior(Role.R1, Role.R1)).toBe(true);
      expect(isRoleEqualOrSuperior(Role.R2, Role.R2)).toBe(true);
      expect(isRoleEqualOrSuperior(Role.R3, Role.R3)).toBe(true);
      expect(isRoleEqualOrSuperior(Role.R4, Role.R4)).toBe(true);
    });

    it("should return true when role is superior", () => {
      expect(isRoleEqualOrSuperior(Role.R1, Role.R4)).toBe(true);
    });

    it("should return false when role is inferior", () => {
      expect(isRoleEqualOrSuperior(Role.R4, Role.R1)).toBe(false);
    });
  });

  describe("getManageableRoles", () => {
    it("R1 can manage all roles", () => {
      const roles = getManageableRoles(Role.R1);
      expect(roles).toContain(Role.R1);
      expect(roles).toContain(Role.R2);
      expect(roles).toContain(Role.R3);
      expect(roles).toContain(Role.R4);
    });

    it("R2 can only manage R3 and R4", () => {
      const roles = getManageableRoles(Role.R2);
      expect(roles).not.toContain(Role.R1);
      expect(roles).not.toContain(Role.R2);
      expect(roles).toContain(Role.R3);
      expect(roles).toContain(Role.R4);
    });

    it("R3 cannot manage any roles", () => {
      const roles = getManageableRoles(Role.R3);
      expect(roles).toHaveLength(0);
    });

    it("R4 cannot manage any roles", () => {
      const roles = getManageableRoles(Role.R4);
      expect(roles).toHaveLength(0);
    });
  });

  describe("canManageRole", () => {
    it("R1 can manage all roles", () => {
      expect(canManageRole(Role.R1, Role.R1)).toBe(true);
      expect(canManageRole(Role.R1, Role.R2)).toBe(true);
      expect(canManageRole(Role.R1, Role.R3)).toBe(true);
      expect(canManageRole(Role.R1, Role.R4)).toBe(true);
    });

    it("R2 can only manage R3 and R4", () => {
      expect(canManageRole(Role.R2, Role.R1)).toBe(false);
      expect(canManageRole(Role.R2, Role.R2)).toBe(false);
      expect(canManageRole(Role.R2, Role.R3)).toBe(true);
      expect(canManageRole(Role.R2, Role.R4)).toBe(true);
    });

    it("R3 and R4 cannot manage anyone", () => {
      expect(canManageRole(Role.R3, Role.R4)).toBe(false);
      expect(canManageRole(Role.R4, Role.R4)).toBe(false);
    });
  });

  describe("isValidRole", () => {
    it("should return true for valid roles", () => {
      expect(isValidRole("R1")).toBe(true);
      expect(isValidRole("R2")).toBe(true);
      expect(isValidRole("R3")).toBe(true);
      expect(isValidRole("R4")).toBe(true);
    });

    it("should return false for invalid roles", () => {
      expect(isValidRole("R5")).toBe(false);
      expect(isValidRole("admin")).toBe(false);
      expect(isValidRole("")).toBe(false);
    });
  });
});

