import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MyTripsPage from "@/app/page";
import { MOCK_BOOKING } from "@/lib/data";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("My Trips page", () => {
  it("renders the page heading", () => {
    render(<MyTripsPage />);
    expect(screen.getByRole("heading", { name: /my trips/i })).toBeInTheDocument();
  });

  it("displays the upcoming flight", () => {
    render(<MyTripsPage />);
    expect(screen.getByText(MOCK_BOOKING.flightNumber)).toBeInTheDocument();
    expect(screen.getByText(MOCK_BOOKING.departTime)).toBeInTheDocument();
    expect(screen.getByText(MOCK_BOOKING.arriveTime)).toBeInTheDocument();
  });

  it("shows the accessibility options count", () => {
    render(<MyTripsPage />);
    const count = MOCK_BOOKING.selectedAccessibility.length;
    expect(
      screen.getByText(new RegExp(`${count} accessibility`, "i"))
    ).toBeInTheDocument();
  });

  it("renders a 'View Booking' CTA linking to /booking", () => {
    render(<MyTripsPage />);
    const cta = screen.getByRole("link", { name: /view booking/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/booking");
  });

  it("displays the brand tagline", () => {
    render(<MyTripsPage />);
    expect(screen.getByText(/travel with confidence/i)).toBeInTheDocument();
  });

  it("CTA meets minimum touch target size (≥48px)", () => {
    render(<MyTripsPage />);
    const cta = screen.getByRole("link", { name: /view booking/i });
    expect(cta.className).toMatch(/min-h-\[5\d+px\]/);
  });
});
