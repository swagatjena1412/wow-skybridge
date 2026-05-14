import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import InstallPage from "@/app/install/page";

const setUserAgent = (ua: string) => {
  Object.defineProperty(window.navigator, "userAgent", {
    configurable: true,
    get: () => ua,
  });
};

const setStandalone = (value: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockReturnValue({
      matches: value,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
};

describe("Install page", () => {
  beforeEach(() => {
    setStandalone(false);
    Object.defineProperty(window.navigator, "standalone", {
      configurable: true,
      value: undefined,
    });
  });

  it("shows iOS Add to Home Screen instructions on iPhone Safari", () => {
    setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari");
    render(<InstallPage />);
    expect(
      screen.getByText(/add skybridge to your home screen in 3 steps/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/tap the share button/i)).toBeInTheDocument();
    expect(screen.getByText(/add to home screen/i)).toBeInTheDocument();
  });

  it("shows desktop fallback message when not on mobile", () => {
    setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome");
    render(<InstallPage />);
    expect(
      screen.getByText(/open this page on your phone/i)
    ).toBeInTheDocument();
  });

  it("shows the 'almost ready' state on Android before prompt arrives", () => {
    setUserAgent("Mozilla/5.0 (Linux; Android 13) Chrome/120");
    render(<InstallPage />);
    expect(screen.getByText(/almost ready/i)).toBeInTheDocument();
  });

  it("renders the install button when beforeinstallprompt fires", async () => {
    setUserAgent("Mozilla/5.0 (Linux; Android 13) Chrome/120");
    render(<InstallPage />);
    act(() => {
      const ev = new Event("beforeinstallprompt");
      Object.assign(ev, {
        prompt: vi.fn().mockResolvedValue(undefined),
        userChoice: Promise.resolve({ outcome: "accepted" }),
      });
      window.dispatchEvent(ev);
    });
    expect(
      screen.getByRole("button", { name: /install skybridge/i })
    ).toBeInTheDocument();
  });

  it("calls prompt() when install button is clicked", async () => {
    setUserAgent("Mozilla/5.0 (Linux; Android 13) Chrome/120");
    const user = userEvent.setup();
    const prompt = vi.fn().mockResolvedValue(undefined);
    render(<InstallPage />);
    act(() => {
      const ev = new Event("beforeinstallprompt");
      Object.assign(ev, {
        prompt,
        userChoice: Promise.resolve({ outcome: "accepted" }),
      });
      window.dispatchEvent(ev);
    });
    const btn = screen.getByRole("button", { name: /install skybridge/i });
    await user.click(btn);
    expect(prompt).toHaveBeenCalled();
  });

  it("shows the already-installed state when running standalone", () => {
    setStandalone(true);
    render(<InstallPage />);
    expect(screen.getByText(/you.re all set/i)).toBeInTheDocument();
    const open = screen.getByRole("link", { name: /open my trips/i });
    expect(open).toHaveAttribute("href", "/");
  });

  it("renders the 'What you get' feature list", () => {
    setUserAgent("Mozilla/5.0 (Linux; Android 13) Chrome/120");
    render(<InstallPage />);
    expect(screen.getByText(/what you get/i)).toBeInTheDocument();
    expect(
      screen.getByText(/manage accessibility accommodations/i)
    ).toBeInTheDocument();
  });

  it("provides a 'Skip' link back to /", () => {
    setUserAgent("Mozilla/5.0 (Linux; Android 13) Chrome/120");
    render(<InstallPage />);
    const skip = screen.getByRole("link", { name: /skip.*continue in browser/i });
    expect(skip).toHaveAttribute("href", "/");
  });
});
