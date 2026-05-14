"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";

const NEXT: Record<string, string> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const LABEL: Record<string, string> = {
  light: "Light theme — switch to dark",
  dark: "Dark theme — switch to system",
  system: "System theme — switch to light",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch by rendering an inert placeholder until mounted.
  const current = mounted ? (theme ?? "system") : "system";
  const Icon = current === "dark" ? Moon : current === "light" ? Sun : Monitor;

  return (
    <button
      type="button"
      onClick={() => setTheme(NEXT[current] ?? "light")}
      aria-label={LABEL[current] ?? "Change theme"}
      title={LABEL[current] ?? "Change theme"}
      className="flex items-center justify-center w-10 h-10 rounded-full text-[#E8D5B8] hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
