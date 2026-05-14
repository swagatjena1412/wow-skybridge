"use client";

import { useState } from "react";
import { BookingContext } from "@/lib/store";
import { MOCK_BOOKING } from "@/lib/data";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    MOCK_BOOKING.selectedAccessibility
  );

  return (
    <BookingContext.Provider value={{ selectedIds, setSelectedIds }}>
      {children}
    </BookingContext.Provider>
  );
}
