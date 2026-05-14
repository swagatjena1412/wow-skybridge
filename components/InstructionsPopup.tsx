"use client";

import { Info, Plane, Clock, MapPin, UserCheck, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type InstructionsPopupProps = {
  /** Visible label for the button that opens the popup. */
  triggerLabel?: string;
  /** Visual style of the trigger. */
  triggerVariant?: "link" | "button" | "icon";
};

export function InstructionsPopup({
  triggerLabel = "View day-of-travel instructions",
  triggerVariant = "link",
}: InstructionsPopupProps) {
  // base-ui's DialogTrigger renders its own <button>, so we apply the
  // styling and content directly via className/children instead of nesting
  // another <button> inside it (which would violate WCAG nested-interactive).
  const triggerClassName =
    triggerVariant === "button"
      ? "flex items-center justify-center gap-2 w-full bg-white dark:bg-card border border-[#1F5E6B] dark:border-[#3AA8B5] text-[#1F5E6B] dark:text-[#3AA8B5] font-semibold text-[15px] py-3 rounded-xl hover:bg-[#EAF5F7] dark:hover:bg-[#1A3040] transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 min-h-[48px]"
      : triggerVariant === "icon"
      ? "flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#1F5E6B]/10 dark:hover:bg-[#3AA8B5]/15 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
      : "inline-flex items-center gap-1.5 text-[13px] text-[#1F5E6B] dark:text-[#3AA8B5] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2 rounded";

  const triggerContent =
    triggerVariant === "icon" ? (
      <Info className="w-4 h-4 text-[#1F5E6B] dark:text-[#3AA8B5]" />
    ) : triggerVariant === "button" ? (
      <>
        <Info className="w-4 h-4" />
        {triggerLabel}
      </>
    ) : (
      <>
        <Info className="w-3.5 h-3.5" />
        {triggerLabel}
      </>
    );

  return (
    <Dialog>
      <DialogTrigger
        className={triggerClassName}
        aria-label={triggerVariant === "icon" ? triggerLabel : undefined}
      >
        {triggerContent}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[18px]">
            <Plane className="w-5 h-5 text-[#1F5E6B] dark:text-[#3AA8B5]" />
            Day-of-travel instructions
          </DialogTitle>
          <DialogDescription>
            What to do on the day of your trip to use your accessibility accommodations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2 text-[14px]">
          <InstructionRow
            icon={<Clock className="w-4 h-4" />}
            title="Arrive early"
            body="Get to the airport at least 30 minutes earlier than your usual arrival time."
          />
          <InstructionRow
            icon={<MapPin className="w-4 h-4" />}
            title="Check in"
            body="Visit any check-in counter, the dedicated accessible services desk, or approach any Skybridge agent wearing a teal Skybridge vest — they will help you skip the regular queue."
          />
          <InstructionRow
            icon={<UserCheck className="w-4 h-4" />}
            title="A Skybridge agent will accompany you"
            body="An agent will guide you through security and to your gate. Look for the teal Skybridge vest."
          />
          <InstructionRow
            icon={<Plane className="w-4 h-4" />}
            title="Boarding"
            body="If wheelchair assistance was requested, you'll be helped onto the aircraft before general boarding begins. Same support is available on arrival."
          />
          <InstructionRow
            icon={<Phone className="w-4 h-4" />}
            title="Need help on the day?"
            body="Call Skybridge accessibility support at 1-800-SKY-BRDG (open 24/7)."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InstructionRow({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-[#EAF5F7] dark:bg-[#1A3040] text-[#1F5E6B] dark:text-[#3AA8B5] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold leading-snug">{title}</p>
        <p className="text-muted-foreground leading-snug mt-0.5">{body}</p>
      </div>
    </div>
  );
}
