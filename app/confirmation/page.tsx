"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ACCESSIBILITY_OPTIONS } from "@/lib/data";
import { useBooking } from "@/lib/store";
import { Separator } from "@/components/ui/separator";

export default function ConfirmationPage() {
  const { selectedIds } = useBooking();
  const finalOptions = ACCESSIBILITY_OPTIONS.filter((o) =>
    selectedIds.includes(o.id)
  );

  return (
    <main className="flex-1 overflow-y-auto pb-8">
      {/* Hero — navy header */}
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
        {/* Accommodations receipt */}
        <section aria-labelledby="receipt-heading">
          <p
            id="receipt-heading"
            className="text-xs font-bold uppercase tracking-widest text-[#1F5E6B] dark:text-[#3AA8B5] mb-3"
          >
            Accommodations on your booking
          </p>

          <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm divide-y divide-border">
            {finalOptions.map((o) => (
              <div key={o.id} className="flex items-start gap-3 px-4 py-3">
                <CheckCircle className="w-4 h-4 text-[#1F5E6B] dark:text-[#3AA8B5] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[15px] font-semibold">{o.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {o.description}
                  </p>
                </div>
              </div>
            ))}
            {finalOptions.length === 0 && (
              <p className="px-4 py-3 text-sm text-muted-foreground">
                No accessibility options on this booking.
              </p>
            )}
          </div>
        </section>

        <Separator />

        {/* Actions */}
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
