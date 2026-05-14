"use client";

import { useState } from "react";

export type Variant = "a" | "b";

const VARIANT_KEY = "skybridge-variant";
const EVENTS_KEY = "skybridge-events";

export function getVariant(): Variant {
  if (typeof window === "undefined") return "a";
  const stored = localStorage.getItem(VARIANT_KEY);
  if (stored === "a" || stored === "b") return stored;
  const assigned: Variant = Math.random() < 0.5 ? "a" : "b";
  try {
    localStorage.setItem(VARIANT_KEY, assigned);
  } catch {
    // localStorage unavailable
  }
  return assigned;
}

export function useVariant(): Variant {
  // Lazy init — stable across re-renders, safe for SSR (returns "a" on server)
  return useState<Variant>(getVariant)[0];
}

/**
 * Log a measurement event tagged with the active variant.
 * Stored to localStorage for export during bootcamp sessions.
 * Replace with Vercel Analytics or PostHog for production.
 */
export function logVariantEvent(
  variant: Variant,
  action: string,
  meta?: Record<string, unknown>
) {
  try {
    const events = JSON.parse(
      localStorage.getItem(EVENTS_KEY) ?? "[]"
    ) as unknown[];
    events.push({ variant, action, timestamp: new Date().toISOString(), ...meta });
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch {
    // localStorage unavailable or quota exceeded
  }
}

/**
 * Read all logged events. Useful for manual export during demo sessions:
 *   import { getVariantEvents } from "@/lib/variant";
 *   console.table(getVariantEvents());
 */
export function getVariantEvents() {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) ?? "[]") as unknown[];
  } catch {
    return [];
  }
}
