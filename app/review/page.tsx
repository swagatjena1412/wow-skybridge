"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Info, Plus, X } from "lucide-react";
import { MOCK_BOOKING, ACCESSIBILITY_OPTIONS } from "@/lib/data";
import { useBooking } from "@/lib/store";
import { useVariant, logVariantEvent } from "@/lib/variant";
import { NavBar } from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";

function readPendingFromSession(fallback: string[]): string[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.sessionStorage.getItem("skybridge-pending");
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export default function ReviewPage() {
  const router = useRouter();
  const { selectedIds, setSelectedIds } = useBooking();
  const variant = useVariant();
  const [pending] = useState<string[]>(() =>
    readPendingFromSession([...selectedIds])
  );
  const booking = MOCK_BOOKING;

  const added = pending.filter((id) => !selectedIds.includes(id));
  const removed = selectedIds.filter((id) => !pending.includes(id));
  const kept = pending.filter((id) => selectedIds.includes(id));

  const handleConfirm = () => {
    setSelectedIds(pending);
    sessionStorage.removeItem("skybridge-pending");
    logVariantEvent(variant, "saved", { addedCount: added.length, removedCount: removed.length });

    if (variant === "a") {
      // Flavor A: no confirmation page — go straight back to booking detail
      router.push("/booking?saved=1");
    } else {
      // Flavor B: redesigned confirmation — snapshot pre-save ids for diff view
      try {
        sessionStorage.setItem("skybridge-prev", JSON.stringify(selectedIds));
      } catch { /* quota */ }
      router.push("/confirmation");
    }
  };

  return (
    <>
      <NavBar title="Review & Confirm" backHref="/manage" />

      <main className="flex-1 overflow-y-auto p-4 space-y-5 pb-8">
        <p className="text-sm text-muted-foreground">
          Review your booking and accessibility selections before saving.
        </p>

        {/* Itinerary summary */}
        <section aria-labelledby="flight-heading">
          <p
            id="flight-heading"
            className="text-xs font-bold uppercase tracking-widest text-[#1F5E6B] dark:text-[#3AA8B5] mb-3"
          >
            Your Flight
          </p>

          <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1B3252]">
              <span className="text-[#E8D5B8] font-bold text-[15px]">
                {booking.flightNumber}
              </span>
              <span className="flex items-center gap-1 bg-emerald-900/60 text-emerald-300 text-[11px] font-semibold px-3 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                Confirmed
              </span>
            </div>
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{booking.departTime}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.fromCode} {booking.fromCity}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-1 mx-4">
                  <div className="w-full flex items-center gap-1">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-muted-foreground text-xs">✈</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {booking.duration}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{booking.arriveTime}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.toCode} {booking.toCity}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground space-y-0.5">
                <p>{booking.date}</p>
                <p>
                  {booking.passenger} · Seat {booking.seat} · Ref: {booking.ref}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility selections */}
        <section aria-labelledby="a11y-heading">
          <p
            id="a11y-heading"
            className="text-xs font-bold uppercase tracking-widest text-[#1F5E6B] dark:text-[#3AA8B5] mb-3"
          >
            Accessibility Selections
          </p>

          <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm divide-y divide-border">
            {pending.length === 0 && (
              <p className="px-4 py-3 text-sm text-muted-foreground">
                No accessibility options selected.
              </p>
            )}

            {/* Kept */}
            {kept.map((id) => {
              const o = ACCESSIBILITY_OPTIONS.find((x) => x.id === id)!;
              return (
                <div key={id} className="flex items-center gap-3 px-4 py-3.5">
                  <CheckCircle className="w-4 h-4 text-[#1F5E6B] dark:text-[#3AA8B5] shrink-0" />
                  <span className="text-[15px] font-medium">{o.label}</span>
                </div>
              );
            })}

            {/* Adding */}
            {added.map((id) => {
              const o = ACCESSIBILITY_OPTIONS.find((x) => x.id === id)!;
              return (
                <div
                  key={id}
                  className="flex items-center gap-3 px-4 py-3 bg-[#EAF5F7] dark:bg-[#1A3040] border-l-4 border-l-[#2A7A8A] dark:border-l-[#3AA8B5]"
                >
                  <Plus className="w-4 h-4 text-[#1F5E6B] dark:text-[#3AA8B5] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[15px] font-semibold">
                      {o.label}
                    </span>
                    <span className="ml-2 text-[10px] font-bold bg-[#2A7A8A] dark:bg-[#3AA8B5] text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Removing */}
            {removed.map((id) => {
              const o = ACCESSIBILITY_OPTIONS.find((x) => x.id === id)!;
              return (
                <div
                  key={id}
                  className="flex items-center gap-3 px-4 py-3 opacity-50"
                >
                  <X className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-[15px] line-through text-muted-foreground">
                    {o.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Info callout */}
        <div className="flex gap-2 items-start bg-[#EAF5F7] dark:bg-[#1A3040] border border-[#B0DCE3] dark:border-[#2A5A6A] text-[#1F5E6B] dark:text-[#3AA8B5] rounded-xl px-4 py-3 text-sm">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            You will receive an email confirmation once your changes are saved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#1B3252] hover:bg-[#142540] text-[#E8D5B8] font-bold text-[15px] py-3 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
          >
            Confirm &amp; Save
          </button>
          <button
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl border border-border text-muted-foreground text-[15px] font-medium hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-[#2A7A8A] focus-visible:outline-offset-2 min-h-[48px]"
          >
            Edit
          </button>
        </div>
      </main>
    </>
  );
}
