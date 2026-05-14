import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "./test-utils";
import BookingDetailPage from "@/app/booking/page";
import { MOCK_BOOKING, ACCESSIBILITY_OPTIONS } from "@/lib/data";

describe("Booking Detail page", () => {
  it("shows the back link to /", () => {
    renderWithProviders(<BookingDetailPage />);
    const back = screen.getByRole("link", { name: /go back/i });
    expect(back).toHaveAttribute("href", "/");
  });

  it("displays flight info", () => {
    renderWithProviders(<BookingDetailPage />);
    expect(screen.getAllByText(MOCK_BOOKING.flightNumber).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(new RegExp(MOCK_BOOKING.passenger)).length
    ).toBeGreaterThan(0);
  });

  it("renders an Accessibility Options section", () => {
    renderWithProviders(<BookingDetailPage />);
    expect(
      screen.getByRole("heading", { name: /accessibility options/i })
    ).toBeInTheDocument();
  });

  it("lists the currently selected accessibility options", () => {
    renderWithProviders(<BookingDetailPage />);
    const list = screen.getByRole("list", {
      name: /selected accessibility options/i,
    });
    expect(list).toBeInTheDocument();
    for (const id of MOCK_BOOKING.selectedAccessibility) {
      const opt = ACCESSIBILITY_OPTIONS.find((o) => o.id === id)!;
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    }
  });

  it("renders a Manage Accessibility CTA pointing to /manage", () => {
    renderWithProviders(<BookingDetailPage />);
    const cta = screen.getByRole("link", { name: /manage accessibility/i });
    expect(cta).toHaveAttribute("href", "/manage");
  });

  it("shows passenger and baggage cards", () => {
    renderWithProviders(<BookingDetailPage />);
    expect(
      screen.getByRole("heading", { name: /passenger details/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /baggage/i })).toBeInTheDocument();
  });

  it("displays the seat number", () => {
    renderWithProviders(<BookingDetailPage />);
    expect(
      screen.getAllByText(new RegExp(`Seat ${MOCK_BOOKING.seat}`)).length
    ).toBeGreaterThan(0);
  });
});
