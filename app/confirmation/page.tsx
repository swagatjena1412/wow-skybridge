"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { ACCESSIBILITY_OPTIONS } from "@/lib/data";
import { useBooking } from "@/lib/store";
import { Separator } from "@/components/ui/separator";

function readPrevFromSession(fallback: string[]): string[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.sessionStorage.getItem("skybridge-prev");
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export default function ConfirmationPage() {
  const { selectedIds } = useBooking();

  // Read the pre-save snapshot written by review/page.tsx (Flavor B only).
  // If not present (first save ever, or session cleared) every option is treated
  // as "previously saved" — safe fallback that avoids false "Added" labels.
  const [prevIds] = useState<string[]>(() =>
    readPrevFromSession(selectedIds)
  );

  const finalOptions = ACCESSIBILITY_OPTIONS.filter((o) =>
    selectedIds.includes(o.id)
  );

  const addedCount = finalOptions.filter((o) => !prevIds.includes(o.id)).length;

  return (
    <main className="flex-1 overflow-y-auto pb-8">
      {/* Hero */}
      <div className="bg-[#1B3252] border-b-[3px] border-[#3AA8B5] px-4 pt-10 pb-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-full border-2 border-[#3AA8B5] bg-[#1A3040] flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-[#3AA8B5]" />
        </div>
        <h1 className="text-[#E8D5B8] font-bold text-[20px] leading-tight">
          Your accessibility needs<br />are confirmed
        </h1>
        <p className="text-[#C8B898] text-sm">
          Your requests have been saved and our team has been notified.
        </p>
      </div>

      <div className="p-4 space-y-5">
        {/* Accommodations receipt — Flavor B redesign */}
        <section aria-labelledby="receipt-heading">
          <div className="flex items-baseline justify-between mb-3">
            <p
              id="receipt-heading"
              className="text-xs font-bold uppercase tracking-widest text-[#1F5E6B] dark:text-[#3AA8B5]"
            >
              Accommodations on your booking
            </p>
            {/* Delta summary — plain language, no "NEW" */}
            {addedCount > 0 && (
              <span className="text-xs text-[#1F5E6B] dark:text-[#3AA8B5] font-semibold">
                {addedCount} option{addedCount !== 1 ? "s" : ""} added
              </span>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm divide-y divide-border">
            {finalOptions.length === 0 && (
              <p className="px-4 py-3 text-sm text-muted-foreground">
                No accessibility options on this booking.
              </p>
            )}

            {finalOptions.map((o) => {
              const isAdded = !prevIds.includes(o.id);
              return (
                <div
                  key={o.id}
                  className={`flex items-start gap-3 px-4 py-3 ${
                    isAdded
                      ? "bg-[#EAF5F7] dark:bg-[#1A3040] border-l-4 border-l-[#1F5E6B] dark:border-l-[#3AA8B5]"
                      : ""
                  }`}
                >
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 shrink-0 text-[#1F5E6B] dark:text-[#3AA8B5]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[15px] font-semibold">{o.label}</p>
                      {isAdded && (
                        <span className="text-[10px] font-bold bg-[#1F5E6B] dark:bg-[#3AA8B5] text-white px-2 py-0.5 rounded-full">
                          Added
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {o.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* Action */}
        <Link
          href="/"
          className="flex items-center justify-center w-full bg-[#1B3252] hover:bg-[#142540] text-[#E8D5B8] font-bold text-[15px] py-3 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
        >
          Done
        </Link>

        <p className="text-center text-xs text-muted-foreground">
          Skybridge · From doorstep to destination
        </p>
      </div>
    </main>
  );
}
