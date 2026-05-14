"use client";

import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MOCK_BOOKING, ACCESSIBILITY_OPTIONS } from "@/lib/data";
import { useBooking } from "@/lib/store";
import { NavBar } from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";

export default function BookingDetailPage() {
  const { selectedIds } = useBooking();
  const booking = MOCK_BOOKING;
  const selectedOptions = ACCESSIBILITY_OPTIONS.filter((o) =>
    selectedIds.includes(o.id)
  );

  // Flavor A: show a brief "Saved" banner when redirected from review with ?saved=1
  const searchParams = useSearchParams();
  const showSavedBanner = searchParams.get("saved") === "1";
  const [bannerVisible, setBannerVisible] = useState(showSavedBanner);

  useEffect(() => {
    if (!showSavedBanner) return;
    const t = setTimeout(() => setBannerVisible(false), 2000);
    return () => clearTimeout(t);
  }, [showSavedBanner]);

  return (
    <>
      <NavBar title="Booking Details" backHref="/" />

      {/* Flavor A — Saved banner (aria-live so screen readers announce it) */}
      <div aria-live="polite" aria-atomic="true">
        {bannerVisible && (
          <div className="bg-[#1F5E6B] dark:bg-[#3AA8B5] text-white dark:text-[#1B3252] text-sm font-semibold text-center py-2 px-4 transition-opacity duration-300">
            Accessibility options saved
          </div>
        )}
      </div>

      <main className="flex-1 p-4 space-y-4 pb-8">
        {/* Flight card */}
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
                <p className="text-[28px] font-bold leading-none">{booking.departTime}</p>
                <p className="text-[13px] text-muted-foreground mt-1">
                  {booking.fromCode} {booking.fromCity}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1 mx-3">
                <div className="w-full flex items-center gap-1">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[#1F5E6B] dark:text-[#3AA8B5] text-sm">✈</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {booking.duration}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[28px] font-bold leading-none">{booking.arriveTime}</p>
                <p className="text-[13px] text-muted-foreground mt-1">
                  {booking.toCode} {booking.toCity}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-0.5 text-sm text-muted-foreground">
              <p>{booking.date}</p>
              <p>
                {booking.passenger} · Seat {booking.seat} · Ref: {booking.ref}
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility section — highlighted with teal border */}
        <div className="rounded-2xl border-2 border-[#2A7A8A] dark:border-[#3AA8B5] overflow-hidden shadow-sm bg-white dark:bg-card">
          <div className="flex items-center justify-between px-4 py-3 bg-[#1B3252]">
            <h2 className="text-[#E8D5B8] font-bold text-[15px]">
              Accessibility Options
            </h2>
            <span className="bg-[#EAF5F7] text-[#1F5E6B] dark:bg-[#1A3040] dark:text-[#3AA8B5] text-[11px] font-semibold px-3 py-0.5 rounded-full">
              {selectedOptions.length}/{ACCESSIBILITY_OPTIONS.length} selected
            </span>
          </div>

          <div className="px-4 py-4 space-y-3 bg-white dark:bg-card">
            {selectedOptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No accessibility options added yet.
              </p>
            ) : (
              <ul className="space-y-2.5" aria-label="Selected accessibility options">
                {selectedOptions.map((o) => (
                  <li key={o.id} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#1F5E6B] dark:text-[#3AA8B5] shrink-0" />
                    <span className="text-[15px] font-medium">{o.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <Separator />

            <Link
              href="/manage"
              className="flex items-center justify-center w-full gap-2 bg-[#1B3252] hover:bg-[#142540] text-[#E8D5B8] font-semibold text-[15px] py-3 px-4 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
            >
              Manage Accessibility
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Passenger details */}
        <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-[#F2F3F5] dark:bg-muted border-b border-border">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Passenger details
            </h2>
          </div>
          <div className="px-4 py-3 space-y-1">
            <p className="font-semibold text-[15px]">{booking.passenger}</p>
            <p className="text-[14px] text-muted-foreground">
              Economy · Seat {booking.seat}
            </p>
          </div>
        </div>

        {/* Baggage */}
        <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-[#F2F3F5] dark:bg-muted border-b border-border">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Baggage
            </h2>
          </div>
          <div className="px-4 py-3">
            <p className="text-[14px] text-muted-foreground">
              1 carry-on included · No checked bags
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
