import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "./test-utils";
import ConfirmationPage from "@/app/confirmation/page";
import { ACCESSIBILITY_OPTIONS, MOCK_BOOKING } from "@/lib/data";

describe("Confirmation page", () => {
  it("displays the success heading", () => {
    renderWithProviders(<ConfirmationPage />);
    expect(
      screen.getByRole("heading", { name: /your accessibility needs/i })
    ).toBeInTheDocument();
  });

  it("lists all confirmed accommodations", () => {
    renderWithProviders(<ConfirmationPage />);
    for (const id of MOCK_BOOKING.selectedAccessibility) {
      const opt = ACCESSIBILITY_OPTIONS.find((o) => o.id === id)!;
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    }
  });

  it("provides a Done link back to /", () => {
    renderWithProviders(<ConfirmationPage />);
    const done = screen.getByRole("link", { name: /^done$/i });
    expect(done).toHaveAttribute("href", "/");
  });
});
