/**
 * Component-level WCAG 2.2 AA assertions using axe-core.
 *
 * These run in jsdom and catch ~30-40% of automatable a11y issues:
 * - missing alt text, label associations, ARIA misuse
 * - role/landmark structure, heading hierarchy
 * - color contrast (only when computed styles are visible to jsdom — limited)
 *
 * Full visual + keyboard / focus checks come from the Lighthouse CI workflow
 * which runs against the deployed app in real Chromium.
 */
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { renderWithProviders } from "./test-utils";

import MyTripsPage from "@/app/page";
import BookingDetailPage from "@/app/booking/page";
import ManageAccessibilityPage from "@/app/manage/page";
import ConfirmationPage from "@/app/confirmation/page";
import InstallPage from "@/app/install/page";

const RULES = {
  rules: {
    // Color contrast assumes computed CSS — jsdom doesn't load Tailwind, so
    // this would always fail. Lighthouse CI handles contrast on the real page.
    "color-contrast": { enabled: false },
  },
};

describe("WCAG: My Trips page", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = renderWithProviders(<MyTripsPage />);
    expect(await axe(container, RULES)).toHaveNoViolations();
  });
});

describe("WCAG: Booking Detail page", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = renderWithProviders(<BookingDetailPage />);
    expect(await axe(container, RULES)).toHaveNoViolations();
  });
});

describe("WCAG: Manage Accessibility page", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = renderWithProviders(<ManageAccessibilityPage />);
    expect(await axe(container, RULES)).toHaveNoViolations();
  });
});

describe("WCAG: Confirmation page", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = renderWithProviders(<ConfirmationPage />);
    expect(await axe(container, RULES)).toHaveNoViolations();
  });
});

describe("WCAG: Install page", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = renderWithProviders(<InstallPage />);
    expect(await axe(container, RULES)).toHaveNoViolations();
  });
});
