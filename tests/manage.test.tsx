import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, screen } from "./test-utils";
import { mockPush } from "./setup";
import ManageAccessibilityPage from "@/app/manage/page";
import {
  ACCESSIBILITY_OPTIONS,
  MOCK_BOOKING,
  CATEGORIES,
} from "@/lib/data";

describe("Manage Accessibility page", () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockPush.mockReset();
  });

  it("renders the back link to /booking", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    expect(screen.getByRole("link", { name: /go back/i })).toHaveAttribute(
      "href",
      "/booking"
    );
  });

  it("renders all categories as section labels", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    for (const cat of CATEGORIES) {
      expect(screen.getByText(cat)).toBeInTheDocument();
    }
  });

  it("renders every accessibility option as a checkbox", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(ACCESSIBILITY_OPTIONS.length);
  });

  it("pre-selects the booking's currently saved options", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    const checkboxes = screen.getAllByRole("checkbox");
    const checked = checkboxes.filter(
      (cb) => cb.getAttribute("aria-checked") === "true"
    );
    expect(checked.length).toBe(MOCK_BOOKING.selectedAccessibility.length);
  });

  it("disables the review button when there are no changes", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    const button = screen.getByRole("button", { name: /no changes/i });
    expect(button).toBeDisabled();
  });

  it("enables the review button after selecting a new option", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);

    // Find an option that isn't selected by default
    const newOption = ACCESSIBILITY_OPTIONS.find(
      (o) => !MOCK_BOOKING.selectedAccessibility.includes(o.id)
    )!;
    const row = screen.getByText(newOption.label).closest("button")!;
    await user.click(row);

    expect(
      screen.getByRole("button", { name: /review 1 change/i })
    ).toBeEnabled();
  });

  it("toggles a selected option off when clicked again", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);

    const existingId = MOCK_BOOKING.selectedAccessibility[0];
    const opt = ACCESSIBILITY_OPTIONS.find((o) => o.id === existingId)!;
    const row = screen.getByText(opt.label).closest("button")!;
    await user.click(row);

    expect(
      screen.getByRole("button", { name: /review 1 change/i })
    ).toBeEnabled();
  });

  it("navigates to /review and persists pending changes when reviewed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);

    const newOption = ACCESSIBILITY_OPTIONS.find(
      (o) => !MOCK_BOOKING.selectedAccessibility.includes(o.id)
    )!;
    const row = screen.getByText(newOption.label).closest("button")!;
    await user.click(row);

    const reviewBtn = screen.getByRole("button", { name: /review 1 change/i });
    await user.click(reviewBtn);

    expect(mockPush).toHaveBeenCalledWith("/review");
    const stored = JSON.parse(
      sessionStorage.getItem("skybridge-pending") ?? "[]"
    );
    expect(stored).toContain(newOption.id);
  });

  it("cancel button navigates back to /booking", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);
    await user.click(screen.getByRole("button", { name: /^cancel$/i }));
    expect(mockPush).toHaveBeenCalledWith("/booking");
  });

  it("flags advance-notice options with a badge", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    expect(
      screen.getAllByText(/advance notice/i).length
    ).toBeGreaterThanOrEqual(1);
  });
});
