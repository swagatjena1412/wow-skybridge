"use client";

import { createContext, useContext } from "react";
import { MOCK_BOOKING } from "./data";

export type BookingStore = {
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
};

export const BookingContext = createContext<BookingStore>({
  selectedIds: MOCK_BOOKING.selectedAccessibility,
  setSelectedIds: () => {},
});

export function useBooking() {
  return useContext(BookingContext);
}
