import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VariantPicker } from "@/components/VariantPicker";

const VARIANT_KEY = "skybridge-variant";

describe("VariantPicker", () => {
  beforeEach(() => {
    localStorage.clear();
    // Stub window.location.reload — VariantPicker calls it after a selection
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...window.location, reload: vi.fn() },
    });
  });

  it("renders when no variant is assigned in localStorage", () => {
    render(<VariantPicker />);
    expect(
      screen.getByRole("dialog", { name: /how would you like to experience/i })
    ).toBeInTheDocument();
  });

  it("does not render when a variant is already assigned", () => {
    localStorage.setItem(VARIANT_KEY, "a");
    const { container } = render(<VariantPicker />);
    expect(container.firstChild).toBeNull();
  });

  it("shows both flavor options and a random option", () => {
    render(<VariantPicker />);
    expect(screen.getByText(/flavor a/i)).toBeInTheDocument();
    expect(screen.getByText(/flavor b/i)).toBeInTheDocument();
    expect(screen.getByText(/surprise me/i)).toBeInTheDocument();
  });

  it("stores variant 'a' when Flavor A is selected", async () => {
    const user = userEvent.setup();
    render(<VariantPicker />);
    await user.click(screen.getByText(/flavor a/i).closest("button")!);
    expect(localStorage.getItem(VARIANT_KEY)).toBe("a");
  });

  it("stores variant 'b' when Flavor B is selected", async () => {
    const user = userEvent.setup();
    render(<VariantPicker />);
    await user.click(screen.getByText(/flavor b/i).closest("button")!);
    expect(localStorage.getItem(VARIANT_KEY)).toBe("b");
  });

  it("stores either 'a' or 'b' when Surprise me is selected", async () => {
    const user = userEvent.setup();
    render(<VariantPicker />);
    await user.click(screen.getByText(/surprise me/i).closest("button")!);
    expect(["a", "b"]).toContain(localStorage.getItem(VARIANT_KEY));
  });

  it("triggers a page reload after selection", async () => {
    const user = userEvent.setup();
    render(<VariantPicker />);
    await user.click(screen.getByText(/flavor a/i).closest("button")!);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
