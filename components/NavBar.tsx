import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type NavBarProps = {
  title: string;
  backHref?: string;
};

export function NavBar({ title, backHref }: NavBarProps) {
  return (
    <header className="bg-[#1B3252] border-b-[3px] border-[#3AA8B5] sticky top-0 z-50">
      {/* Screen title row */}
      <div className="flex items-center gap-2 px-4 py-4 min-h-[56px]">
        {backHref && (
          <Link
            href={backHref}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-[#E8D5B8]" />
          </Link>
        )}
        <h1 className="text-[#E8D5B8] font-bold text-[18px] leading-tight">
          {title}
        </h1>
      </div>
    </header>
  );
}
