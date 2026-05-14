import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "./test-utils";
import MyTripsPage from "@/app/page";
import { MOCK_BOOKING } from "@/lib/data";

describe("My Trips page", () => {
  it("renders the page heading", () => {
    renderWithProviders(<MyTripsPage />);
    expect(screen.getByRole("heading", { name: /my trips/i })).toBeInTheDocument();
  });

  it("displays the upcoming flight number", () => {
    renderWithProviders(<MyTripsPage />);
    expect(screen.getByText(MOCK_BOOKING.flightNumber)).toBeInTheDocument();
  });

  it("shows departure and arrival times", () => {
    renderWithProviders(<MyTripsPage />);
    expect(screen.getByText(MOCK_BOOKING.departTime)).toBeInTheDocument();
    expect(screen.getByText(MOCK_BOOKING.arriveTime)).toBeInTheDocument();
  });

  it("shows the accessibility options count", () => {
    renderWithProviders(<MyTripsPage />);
    const count = MOCK_BOOKING.selectedAccessibility.length;
    expect(
      screen.getByText(new RegExp(`${count} accessibility`, "i"))
    ).toBeInTheDocument();
  });

  it("renders a 'View Booking' CTA linking to /booking", () => {
    renderWithProviders(<MyTripsPage />);
    const cta = screen.getByRole("link", { name: /view booking/i });
    expect(cta).toHaveAttribute("href", "/booking");
  });

  it("CTA meets minimum touch target size (>= 48px)", () => {
    renderWithProviders(<MyTripsPage />);
    const cta = screen.getByRole("link", { name: /view booking/i });
    expect(cta.className).toMatch(/min-h-\[5\d+px\]/);
  });

  it("displays the brand tagline", () => {
    renderWithProviders(<MyTripsPage />);
    expect(screen.getByText(/travel with confidence/i)).toBeInTheDocument();
  });

  it("shows the duration", () => {
    renderWithProviders(<MyTripsPage />);
    expect(screen.getByText(MOCK_BOOKING.duration)).toBeInTheDocument();
  });
});
