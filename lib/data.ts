export type AccessibilityOption = {
  id: string;
  category: Category;
  label: string;
  description: string;
  advanceNotice: boolean;
  unavailable?: boolean;
};

export type Category =
  | "Mobility"
  | "Hearing & Vision"
  | "Medical"
  | "Dietary"
  | "Other";

export const CATEGORIES: Category[] = [
  "Mobility",
  "Hearing & Vision",
  "Medical",
  "Dietary",
  "Other",
];

export const ACCESSIBILITY_OPTIONS: AccessibilityOption[] = [
  {
    id: "wheelchair-gate",
    category: "Mobility",
    label: "Wheelchair to gate",
    description: "Assistance from check-in to your departure gate",
    advanceNotice: false,
  },
  {
    id: "wheelchair-aircraft",
    category: "Mobility",
    label: "Wheelchair on aircraft",
    description: "Aisle wheelchair to help you reach your seat",
    advanceNotice: false,
  },
  {
    id: "priority-boarding",
    category: "Mobility",
    label: "Priority boarding",
    description: "Board before general boarding begins",
    advanceNotice: false,
  },
  {
    id: "visual-assist",
    category: "Hearing & Vision",
    label: "Visual impairment assistance",
    description: "Escort and audio guidance through the airport",
    advanceNotice: false,
  },
  {
    id: "sign-language",
    category: "Hearing & Vision",
    label: "Sign language assistance",
    description: "Agent available at check-in and gate",
    advanceNotice: true,
  },
  {
    id: "oxygen",
    category: "Medical",
    label: "Medical oxygen",
    description: "Supplemental oxygen during flight — documentation required",
    advanceNotice: true,
  },
  {
    id: "cpap",
    category: "Medical",
    label: "CPAP machine",
    description: "Power outlet reserved for your device",
    advanceNotice: true,
  },
  {
    id: "meal-diabetic",
    category: "Dietary",
    label: "Special meal: diabetic",
    description: "Low-sugar meal option",
    advanceNotice: false,
  },
  {
    id: "meal-sodium",
    category: "Dietary",
    label: "Special meal: low sodium",
    description: "Reduced sodium meal option",
    advanceNotice: false,
  },
  {
    id: "extra-time",
    category: "Other",
    label: "Extra time for boarding",
    description: "Additional time at the gate before boarding",
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
  selectedAccessibility: ["wheelchair-gate", "meal-diabetic"],
};
