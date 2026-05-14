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

  it("renders 'What to expect' section", () => {
    renderWithProviders(<ConfirmationPage />);
    expect(
      screen.getByRole("heading", { name: /what to expect at the airport/i })
    ).toBeInTheDocument();
  });

  it("includes airport instructions", () => {
    renderWithProviders(<ConfirmationPage />);
    expect(screen.getByText(/30 minutes earlier/i)).toBeInTheDocument();
    expect(screen.getByText(/accessible services desk/i)).toBeInTheDocument();
    expect(screen.getByText(/agent will meet you at the gate/i)).toBeInTheDocument();
  });

  it("provides a Done link back to /", () => {
    renderWithProviders(<ConfirmationPage />);
    const done = screen.getByRole("link", { name: /^done$/i });
    expect(done).toHaveAttribute("href", "/");
  });

  it("offers a 'Done' link back to home", () => {
    renderWithProviders(<ConfirmationPage />);
    expect(screen.getByRole("link", { name: /^done$/i })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
