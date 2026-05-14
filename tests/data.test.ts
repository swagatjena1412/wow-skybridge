import { describe, it, expect } from "vitest";
import {
  ACCESSIBILITY_OPTIONS,
  CATEGORIES,
  MOCK_BOOKING,
} from "@/lib/data";

describe("ACCESSIBILITY_OPTIONS", () => {
  it("contains at least one option per category", () => {
    for (const category of CATEGORIES) {
      const optsInCategory = ACCESSIBILITY_OPTIONS.filter(
        (o) => o.category === category
      );
      expect(optsInCategory.length).toBeGreaterThan(0);
    }
  });

  it("has unique ids", () => {
    const ids = ACCESSIBILITY_OPTIONS.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses plain language labels (no codes)", () => {
    for (const opt of ACCESSIBILITY_OPTIONS) {
      // Labels should contain spaces (plain words, not internal codes like "WCHR")
      expect(opt.label).toMatch(/\s/);
      expect(opt.label.length).toBeGreaterThan(3);
    }
  });

  it("neither demo option requires advance notice", () => {
    for (const opt of ACCESSIBILITY_OPTIONS) {
      expect(opt.advanceNotice).toBe(false);
    }
  });
});

describe("MOCK_BOOKING", () => {
  it("has all required booking fields", () => {
    expect(MOCK_BOOKING.flightNumber).toBeTruthy();
    expect(MOCK_BOOKING.passenger).toBeTruthy();
    expect(MOCK_BOOKING.ref).toBeTruthy();
    expect(MOCK_BOOKING.fromCode).toMatch(/^[A-Z]{3}$/);
    expect(MOCK_BOOKING.toCode).toMatch(/^[A-Z]{3}$/);
  });

  it("references valid accessibility option ids", () => {
    const validIds = new Set(ACCESSIBILITY_OPTIONS.map((o) => o.id));
    for (const id of MOCK_BOOKING.selectedAccessibility) {
      expect(validIds.has(id)).toBe(true);
    }
  });
});
