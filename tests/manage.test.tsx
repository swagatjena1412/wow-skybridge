import { describe, it, expect, beforeEach } from "vitest";
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

  it("starts with no options pre-selected (demo mode)", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    const checkboxes = screen.getAllByRole("checkbox");
    const checked = checkboxes.filter(
      (cb) => cb.getAttribute("aria-checked") === "true"
    );
    expect(checked.length).toBe(0);
  });

  it("disables the save button when there are no changes", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    const button = screen.getByRole("button", { name: /no changes/i });
    expect(button).toBeDisabled();
  });

  it("enables the save button after selecting a new option", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);

    const newOption = ACCESSIBILITY_OPTIONS.find(
      (o) => !MOCK_BOOKING.selectedAccessibility.includes(o.id)
    )!;
    const row = screen.getByText(newOption.label).closest("button")!;
    await user.click(row);

    expect(
      screen.getByRole("button", { name: /^save changes$/i })
    ).toBeEnabled();
  });

  it("toggles an option off after selecting it", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);

    const opt = ACCESSIBILITY_OPTIONS[0];
    const row = screen.getByText(opt.label).closest("button")!;
    // Select it first
    await user.click(row);
    expect(
      screen.getByRole("button", { name: /^save changes$/i })
    ).toBeEnabled();
    // Deselect it again
    await user.click(row);
    expect(screen.getByRole("button", { name: /no changes/i })).toBeDisabled();
  });

  it("navigates straight to /confirmation when changes are saved", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);

    const newOption = ACCESSIBILITY_OPTIONS.find(
      (o) => !MOCK_BOOKING.selectedAccessibility.includes(o.id)
    )!;
    const row = screen.getByText(newOption.label).closest("button")!;
    await user.click(row);

    const saveBtn = screen.getByRole("button", { name: /^save changes$/i });
    await user.click(saveBtn);

    expect(mockPush).toHaveBeenCalledWith("/confirmation");
  });

  it("cancel button navigates back to /booking", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ManageAccessibilityPage />);
    await user.click(screen.getByRole("button", { name: /^cancel$/i }));
    expect(mockPush).toHaveBeenCalledWith("/booking");
  });

  it("renders both demo options without advance-notice badges", () => {
    renderWithProviders(<ManageAccessibilityPage />);
    expect(screen.queryAllByText(/advance notice/i).length).toBe(0);
  });
});
