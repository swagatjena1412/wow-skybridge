"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { CATEGORIES, ACCESSIBILITY_OPTIONS } from "@/lib/data";
import { useBooking } from "@/lib/store";
import { NavBar } from "@/components/NavBar";

export default function ManageAccessibilityPage() {
  const router = useRouter();
  const { selectedIds } = useBooking();
  const [pending, setPending] = useState<string[]>([...selectedIds]);

  const toggle = (id: string) => {
    setPending((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const added = pending.filter((id) => !selectedIds.includes(id));
  const removed = selectedIds.filter((id) => !pending.includes(id));
  const hasChanges = added.length > 0 || removed.length > 0;
  const changeCount = added.length + removed.length;

  const handleReview = () => {
    // Persist pending to session storage so review page can read it
    sessionStorage.setItem("skybridge-pending", JSON.stringify(pending));
    router.push("/review");
  };

  return (
    <>
      <NavBar title="Manage Accessibility" backHref="/booking" />

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Info callout */}
        <div className="mx-4 mt-4 flex gap-2 items-start bg-[#EAF5F7] dark:bg-[#1A3040] border border-[#B0DCE3] dark:border-[#2A5A6A] text-[#2A7A8A] dark:text-[#3AA8B5] rounded-xl px-4 py-3 text-sm">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Select the accommodations that apply to your journey. Changes are
            saved when you confirm.
          </p>
        </div>

        <div className="p-4 space-y-6">
          {CATEGORIES.map((cat) => {
            const catOpts = ACCESSIBILITY_OPTIONS.filter(
              (o) => o.category === cat
            );
            return (
              <section key={cat} aria-labelledby={`cat-${cat}`}>
                <p
                  id={`cat-${cat}`}
                  className="text-xs font-bold uppercase tracking-widest text-[#2A7A8A] dark:text-[#3AA8B5] mb-3"
                >
                  {cat}
                </p>

                <div className="space-y-2">
                  {catOpts.map((opt) => {
                    const isChecked = pending.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggle(opt.id)}
                        className={`w-full flex items-start gap-3 text-left p-4 rounded-xl border-[1.5px] transition-all min-h-[60px] focus-visible:outline-2 focus-visible:outline-[#2A7A8A] focus-visible:outline-offset-2
                          ${
                            isChecked
                              ? "border-[#2A7A8A] dark:border-[#3AA8B5] bg-[#EAF5F7] dark:bg-[#1A3040]"
                              : "border-border bg-white dark:bg-card hover:border-[#2A7A8A]/40"
                          }`}
                      >
                        {/* Custom checkbox */}
                        <div
                          className={`mt-0.5 w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-colors
                            ${
                              isChecked
                                ? "bg-[#2A7A8A] dark:bg-[#3AA8B5] border-[#2A7A8A] dark:border-[#3AA8B5]"
                                : "border-muted-foreground bg-background"
                            }`}
                          aria-hidden="true"
                        >
                          {isChecked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 12 12"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[16px] leading-snug ${isChecked ? "font-semibold" : "font-normal"}`}
                            >
                              {opt.label}
                            </span>
                            {opt.advanceNotice && (
                              <span className="text-[10px] font-semibold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                                Advance notice req.
                              </span>
                            )}
                          </div>
                          <p className="text-[14px] text-muted-foreground mt-0.5">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {cat !== "Other" && (
                  <div className="border-b border-border mt-4" />
                )}
              </section>
            );
          })}
        </div>
      </main>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#1B3252] border-t-[3px] border-[#3AA8B5] px-4 py-3 flex gap-3">
        <button
          onClick={handleReview}
          disabled={!hasChanges}
          className={`flex-1 py-3 rounded-xl font-bold text-[15px] transition-all focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]
            ${
              hasChanges
                ? "bg-[#3AA8B5] text-[#1B3252] hover:bg-[#4BBDCA]"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
        >
          {hasChanges
            ? `Review ${changeCount} change${changeCount !== 1 ? "s" : ""}`
            : "No changes"}
        </button>
        <button
          onClick={() => router.push("/booking")}
          className="px-5 py-3 rounded-xl border border-[#E8D5B8]/40 text-[#E8D5B8] text-[15px] font-medium hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
