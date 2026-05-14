import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SplashScreen } from "@/components/SplashScreen";

const STORAGE_KEY = "skybridge-splash-played";

describe("SplashScreen", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders the splash overlay on first mount when sessionStorage is empty", () => {
    render(<SplashScreen />);
    // Brand wordmark + tagline are present during the splash phase.
    expect(screen.getByText(/^Skybridge$/)).toBeInTheDocument();
    expect(screen.getByText(/travel with confidence/i)).toBeInTheDocument();
  });

  it("returns null when sessionStorage already has the played flag set", () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    const { container } = render(<SplashScreen />);
    expect(container.firstChild).toBeNull();
  });

  it("sets the sessionStorage flag after first mount", () => {
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
    render(<SplashScreen />);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe("1");
  });

  it("uses the brand navy background and is presentational only", () => {
    const { container } = render(<SplashScreen />);
    const root = container.querySelector(".splash-root");
    expect(root).not.toBeNull();
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.className).toMatch(/bg-\[#1B3252\]/);
  });
});
