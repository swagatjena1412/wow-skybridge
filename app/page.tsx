import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { MOCK_BOOKING, ACCESSIBILITY_OPTIONS } from "@/lib/data";
import { NavBar } from "@/components/NavBar";

export default function MyTripsPage() {
  const booking = MOCK_BOOKING;
  const activeCount = booking.selectedAccessibility.length;

  return (
    <>
      <NavBar title="My Trips" />

      <main className="flex-1 p-4 space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Upcoming trips
        </p>

        {/* Trip card */}
        <div className="rounded-2xl border border-border bg-white dark:bg-card shadow-sm overflow-hidden">
          {/* Card header — navy */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1B3252]">
            <span className="text-[#E8D5B8] font-bold text-[15px]">
              {booking.flightNumber}
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/70 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Confirmed
            </span>
          </div>

          {/* Flight times */}
          <div className="px-4 pt-4 pb-3">
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
                  <span className="text-[#2A7A8A] dark:text-[#3AA8B5] text-sm">✈</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <span className="text-[10px] text-muted-foreground">{booking.duration}</span>
              </div>

              <div className="text-right">
                <p className="text-[28px] font-bold leading-none">{booking.arriveTime}</p>
                <p className="text-[13px] text-muted-foreground mt-1">
                  {booking.toCode} {booking.toCity}
                </p>
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground mt-3">{booking.date}</p>

            {/* Divider + accessibility badge */}
            <div className="border-t border-border mt-3 pt-3">
              <span className="inline-flex items-center bg-[#EAF5F7] dark:bg-[#1A3040] text-[#2A7A8A] dark:text-[#3AA8B5] text-[12px] font-semibold px-3 py-1.5 rounded-full">
                {activeCount} accessibility option{activeCount !== 1 ? "s" : ""} active
              </span>
            </div>
          </div>

          {/* CTA button */}
          <div className="px-4 pb-4">
            <Link
              href="/booking"
              className="flex items-center justify-center w-full bg-[#1B3252] hover:bg-[#142540] active:bg-[#0F1D30] text-[#E8D5B8] font-bold text-[16px] py-3.5 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[52px]"
            >
              View Booking
            </Link>
          </div>
        </div>

        {/* Brand tagline */}
        <p className="text-center text-[12px] text-muted-foreground pt-2">
          Travel with confidence · Skybridge
        </p>
      </main>
    </>
  );
}
