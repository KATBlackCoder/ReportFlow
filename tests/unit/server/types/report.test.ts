import { describe, it, expect } from "vitest";
import {
  ReportState,
  isValidStateTransition,
  isReportEditable,
  isReportLocked,
  getValidationNextState,
} from "~/server/types/report";

describe("Report types and utilities", () => {
  describe("ReportState enum", () => {
    it("should have all states defined", () => {
      expect(ReportState.SUBMITTED).toBe("submitted");
      expect(ReportState.RETURNED).toBe("returned");
      expect(ReportState.IN_PROGRESS).toBe("in_progress");
      expect(ReportState.VALIDATED).toBe("validated");
    });
  });

  describe("isValidStateTransition", () => {
    describe("from SUBMITTED state", () => {
      it("can transition to RETURNED", () => {
        expect(isValidStateTransition(ReportState.SUBMITTED, ReportState.RETURNED)).toBe(true);
      });

      it("can transition to IN_PROGRESS", () => {
        expect(isValidStateTransition(ReportState.SUBMITTED, ReportState.IN_PROGRESS)).toBe(true);
      });

      it("cannot transition directly to VALIDATED", () => {
        expect(isValidStateTransition(ReportState.SUBMITTED, ReportState.VALIDATED)).toBe(false);
      });
    });

    describe("from RETURNED state", () => {
      it("can transition to SUBMITTED (resubmit)", () => {
        expect(isValidStateTransition(ReportState.RETURNED, ReportState.SUBMITTED)).toBe(true);
      });

      it("cannot transition to other states", () => {
        expect(isValidStateTransition(ReportState.RETURNED, ReportState.IN_PROGRESS)).toBe(false);
        expect(isValidStateTransition(ReportState.RETURNED, ReportState.VALIDATED)).toBe(false);
      });
    });

    describe("from IN_PROGRESS state", () => {
      it("can transition to VALIDATED", () => {
        expect(isValidStateTransition(ReportState.IN_PROGRESS, ReportState.VALIDATED)).toBe(true);
      });

      it("can transition to RETURNED", () => {
        expect(isValidStateTransition(ReportState.IN_PROGRESS, ReportState.RETURNED)).toBe(true);
      });

      it("cannot transition to SUBMITTED", () => {
        expect(isValidStateTransition(ReportState.IN_PROGRESS, ReportState.SUBMITTED)).toBe(false);
      });
    });

    describe("from VALIDATED state", () => {
      it("cannot transition to any state (terminal)", () => {
        expect(isValidStateTransition(ReportState.VALIDATED, ReportState.SUBMITTED)).toBe(false);
        expect(isValidStateTransition(ReportState.VALIDATED, ReportState.RETURNED)).toBe(false);
        expect(isValidStateTransition(ReportState.VALIDATED, ReportState.IN_PROGRESS)).toBe(false);
      });
    });
  });

  describe("isReportEditable", () => {
    it("returns true for SUBMITTED state", () => {
      expect(isReportEditable(ReportState.SUBMITTED)).toBe(true);
    });

    it("returns true for RETURNED state", () => {
      expect(isReportEditable(ReportState.RETURNED)).toBe(true);
    });

    it("returns false for IN_PROGRESS state", () => {
      expect(isReportEditable(ReportState.IN_PROGRESS)).toBe(false);
    });

    it("returns false for VALIDATED state", () => {
      expect(isReportEditable(ReportState.VALIDATED)).toBe(false);
    });
  });

  describe("isReportLocked", () => {
    it("returns false for SUBMITTED state", () => {
      expect(isReportLocked(ReportState.SUBMITTED)).toBe(false);
    });

    it("returns false for RETURNED state", () => {
      expect(isReportLocked(ReportState.RETURNED)).toBe(false);
    });

    it("returns true for IN_PROGRESS state", () => {
      expect(isReportLocked(ReportState.IN_PROGRESS)).toBe(true);
    });

    it("returns true for VALIDATED state", () => {
      expect(isReportLocked(ReportState.VALIDATED)).toBe(true);
    });
  });

  describe("getValidationNextState", () => {
    it("SUBMITTED goes to IN_PROGRESS on validation", () => {
      expect(getValidationNextState(ReportState.SUBMITTED)).toBe(ReportState.IN_PROGRESS);
    });

    it("IN_PROGRESS goes to VALIDATED on validation", () => {
      expect(getValidationNextState(ReportState.IN_PROGRESS)).toBe(ReportState.VALIDATED);
    });

    it("throws for invalid states", () => {
      expect(() => getValidationNextState(ReportState.RETURNED)).toThrow();
      expect(() => getValidationNextState(ReportState.VALIDATED)).toThrow();
    });
  });
});

