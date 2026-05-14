export type AccessibilityOption = {
  id: string;
  category: Category;
  label: string;
  description: string;
  advanceNotice: boolean;
  unavailable?: boolean;
};

export type Category = "Mobility & Wheelchair" | "Personal Assistance";

// Order here drives the order categories appear on the Manage screen.
export const CATEGORIES: Category[] = [
  "Mobility & Wheelchair",
  "Personal Assistance",
];

export const ACCESSIBILITY_OPTIONS: AccessibilityOption[] = [
  {
    id: "wheelchair-gate",
    category: "Mobility & Wheelchair",
    label: "Wheelchair to gate",
    description: "Assistance from check-in to your departure gate",
    advanceNotice: false,
  },
  {
    id: "wheelchair-aircraft",
    category: "Mobility & Wheelchair",
    label: "Wheelchair on aircraft",
    description: "Aisle wheelchair to help you reach your seat",
    advanceNotice: false,
  },
  {
    id: "guided-assistance",
    category: "Personal Assistance",
    label: "Guided assistance",
    description:
      "An agent will accompany you through security, the airport, and to your gate",
    advanceNotice: false,
  },
];

export type Booking = {
  id: string;
  flightNumber: string;
  date: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  passenger: string;
  seat: string;
  ref: string;
  status: "confirmed" | "pending" | "cancelled";
  selectedAccessibility: string[];
};

export const MOCK_BOOKING: Booking = {
  id: "booking-001",
  flightNumber: "SK 2847",
  date: "Mon, June 15 2026",
  departTime: "08:45",
  arriveTime: "11:20",
  duration: "5h 35m",
  fromCode: "YYZ",
  fromCity: "Toronto",
  toCode: "YVR",
  toCity: "Vancouver",
  passenger: "Margaret Thompson",
  seat: "14A",
  ref: "SKYB-4821",
  status: "confirmed",
  selectedAccessibility: [],
};
