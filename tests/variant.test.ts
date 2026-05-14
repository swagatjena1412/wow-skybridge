import { describe, it, expect, beforeEach } from "vitest";
import { getVariant, logVariantEvent, getVariantEvents } from "@/lib/variant";

const VARIANT_KEY = "skybridge-variant";

describe("getVariant()", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns 'a' or 'b' on first call", () => {
    const v = getVariant();
    expect(["a", "b"]).toContain(v);
  });

  it("persists assignment to localStorage", () => {
    const v = getVariant();
    expect(localStorage.getItem(VARIANT_KEY)).toBe(v);
  });

  it("returns the same variant on subsequent calls", () => {
    const first = getVariant();
    const second = getVariant();
    expect(second).toBe(first);
  });

  it("reads existing assignment without overwriting", () => {
    localStorage.setItem(VARIANT_KEY, "b");
    expect(getVariant()).toBe("b");
  });

  it("ignores invalid stored values and re-assigns", () => {
    localStorage.setItem(VARIANT_KEY, "x");
    const v = getVariant();
    expect(["a", "b"]).toContain(v);
  });
});

describe("logVariantEvent()", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("appends an event to the events log", () => {
    logVariantEvent("a", "saved");
    const events = getVariantEvents() as Array<{ variant: string; action: string }>;
    expect(events).toHaveLength(1);
    expect(events[0].variant).toBe("a");
    expect(events[0].action).toBe("saved");
  });

  it("accumulates multiple events", () => {
    logVariantEvent("a", "saved");
    logVariantEvent("b", "saved");
    expect(getVariantEvents()).toHaveLength(2);
  });

  it("includes meta fields when provided", () => {
    logVariantEvent("a", "saved", { addedCount: 2, removedCount: 0 });
    const events = getVariantEvents() as Array<Record<string, unknown>>;
    expect(events[0].addedCount).toBe(2);
  });

  it("includes a timestamp on each event", () => {
    logVariantEvent("a", "test");
    const events = getVariantEvents() as Array<{ timestamp: string }>;
    expect(events[0].timestamp).toBeTruthy();
  });
});
