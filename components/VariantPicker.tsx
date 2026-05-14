"use client";

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Zap, ListChecks, Shuffle } from "lucide-react";

const VARIANT_KEY = "skybridge-variant";
const PICKER_DISMISSED_KEY = "skybridge-picker-dismissed";

type Variant = "a" | "b";

function hasVariantAssigned(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem(VARIANT_KEY);
    return v === "a" || v === "b";
  } catch {
    return true;
  }
}

function shouldForceShow(forceParam: string | null): boolean {
  return forceParam === "1";
}

export function VariantPicker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const forceParam = searchParams.get("picker");

  // Manual-dismiss state. The picker is open by default when forced via
  // ?picker=1 OR no variant is assigned. Selecting a variant or dismissing
  // sets `dismissed = true`, which closes it for the rest of the session.
  const [dismissed, setDismissed] = useState(false);
  const open = !dismissed && (shouldForceShow(forceParam) || !hasVariantAssigned());

  const choose = (variant: Variant | "random") => {
    try {
      const assigned: Variant =
        variant === "random" ? (Math.random() < 0.5 ? "a" : "b") : variant;
      localStorage.setItem(VARIANT_KEY, assigned);
      localStorage.setItem(PICKER_DISMISSED_KEY, "1");
    } catch { /* quota */ }
    setDismissed(true);
    // Navigate to the bare path (no ?picker=1) AND reload in one step.
    // Doing router.replace() then window.location.reload() is a race —
    // the reload fires before the URL is updated, re-triggering the picker.
    window.location.href = pathname || "/";
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="variant-picker-title"
      className="fixed inset-0 z-[200] bg-[#1B3252]/95 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto"
    >
      <div className="w-full max-w-md bg-white dark:bg-[#1A2028] rounded-2xl shadow-xl p-6 space-y-5">
        <div className="text-center space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#1F5E6B] dark:text-[#3AA8B5]">
            Demo · Choose a flavor
          </p>
          <h2
            id="variant-picker-title"
            className="text-[20px] font-bold leading-tight"
          >
            How would you like to experience Skybridge?
          </h2>
          <p className="text-sm text-muted-foreground">
            Two A/B test variants of the save experience. Pick one to try, or let chance decide.
          </p>
        </div>

        {/* Flavor A */}
        <button
          onClick={() => choose("a")}
          className="w-full text-left bg-white dark:bg-card border-2 border-border hover:border-[#1F5E6B] dark:hover:border-[#3AA8B5] rounded-xl p-4 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF5F7] dark:bg-[#1A3040] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#1F5E6B] dark:text-[#3AA8B5]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[16px]">Flavor A</span>
                <span className="text-[10px] font-bold bg-[#1F5E6B] dark:bg-[#3AA8B5] text-white px-2 py-0.5 rounded-full">
                  Quick save
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                No confirmation page. Save returns straight to your booking with a brief inline notice.
              </p>
            </div>
          </div>
        </button>

        {/* Flavor B */}
        <button
          onClick={() => choose("b")}
          className="w-full text-left bg-white dark:bg-card border-2 border-border hover:border-[#1F5E6B] dark:hover:border-[#3AA8B5] rounded-xl p-4 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF5F7] dark:bg-[#1A3040] flex items-center justify-center shrink-0">
              <ListChecks className="w-5 h-5 text-[#1F5E6B] dark:text-[#3AA8B5]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[16px]">Flavor B</span>
                <span className="text-[10px] font-bold bg-[#1F5E6B] dark:bg-[#3AA8B5] text-white px-2 py-0.5 rounded-full">
                  See changes
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Confirmation page shows exactly what was added vs already saved.
              </p>
            </div>
          </div>
        </button>

        {/* Random */}
        <button
          onClick={() => choose("random")}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2 focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 rounded-md"
        >
          <Shuffle className="w-4 h-4" />
          Surprise me (random)
        </button>
      </div>
    </div>
  );
}
