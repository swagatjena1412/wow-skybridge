"use client";

import { useState, useCallback } from "react";
import { BookingContext } from "@/lib/store";
import { MOCK_BOOKING } from "@/lib/data";

const STORAGE_KEY = "skybridge-accessibility";

function loadFromStorage(): string[] {
  if (typeof window === "undefined") return MOCK_BOOKING.selectedAccessibility;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return MOCK_BOOKING.selectedAccessibility;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : MOCK_BOOKING.selectedAccessibility;
  } catch {
    return MOCK_BOOKING.selectedAccessibility;
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIdsState] = useState<string[]>(loadFromStorage);

  const setSelectedIds = useCallback((ids: string[]) => {
    setSelectedIdsState(ids);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // localStorage may be unavailable (private browsing quota, etc.)
    }
  }, []);

  return (
    <BookingContext.Provider value={{ selectedIds, setSelectedIds }}>
      {children}
    </BookingContext.Provider>
  );
}
