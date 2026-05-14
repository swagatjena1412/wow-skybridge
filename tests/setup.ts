import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";

afterEach(() => {
  cleanup();
});

// Mock next/link globally — render as a plain anchor for tests.
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href: string }>) =>
    React.createElement("a", { href, ...props }, children),
}));

// Mock next/navigation globally with stub functions tests can override per case.
export const mockPush = vi.fn();
export const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
