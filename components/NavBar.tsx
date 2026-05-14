import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type NavBarProps = {
  title: string;
  backHref?: string;
};

export function NavBar({ title, backHref }: NavBarProps) {
  return (
    <header className="bg-[#1B3252] border-b-[3px] border-[#3AA8B5] sticky top-0 z-50 shadow-md">
      {/* Screen title row */}
      <div className="flex items-center gap-2 px-3 py-3 min-h-[56px]">
        {backHref && (
          <Link
            href={backHref}
            className="flex items-center justify-center w-10 h-10 rounded-full text-[#E8D5B8] hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        )}
        <h1 className="flex-1 text-[#E8D5B8] font-bold text-[18px] leading-tight px-1">
          {title}
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
