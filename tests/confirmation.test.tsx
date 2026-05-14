import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "./test-utils";
import ConfirmationPage from "@/app/confirmation/page";

describe("Confirmation page", () => {
  it("displays the success heading", () => {
    renderWithProviders(<ConfirmationPage />);
    expect(
      screen.getByRole("heading", { name: /your accessibility needs/i })
    ).toBeInTheDocument();
  });

  it("provides a Done link back to /", () => {
    renderWithProviders(<ConfirmationPage />);
    const done = screen.getByRole("link", { name: /^done$/i });
    expect(done).toHaveAttribute("href", "/");
  });

  it("shows 'No accessibility options' when nothing is selected", () => {
    renderWithProviders(<ConfirmationPage />);
    expect(
      screen.getByText(/no accessibility options on this booking/i)
    ).toBeInTheDocument();
  });
});
