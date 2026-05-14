"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Share, Plus, ArrowRight } from "lucide-react";

type Platform = "android" | "ios" | "desktop" | "unknown";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "unknown";
  const ua = window.navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua) && !/(crios|fxios|edgios)/.test(ua)) {
    return "ios";
  }
  if (/android/.test(ua)) return "android";
  return "desktop";
}

function detectStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // @ts-expect-error iOS Safari property
    window.navigator.standalone === true
  );
}

export default function InstallPage() {
  const [platform] = useState<Platform>(detectPlatform);
  const [installed, setInstalled] = useState<boolean>(detectStandalone);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const installedHandler = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  };

  // Already installed — redirect to booking
  if (installed) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#EAF5F7] dark:bg-[#1A3040] border-2 border-[#2A7A8A] dark:border-[#3AA8B5] flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-[#2A7A8A] dark:text-[#3AA8B5]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">You&apos;re all set</h1>
          <p className="text-muted-foreground">
            Skybridge is already installed on this device.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-[#1B3252] hover:bg-[#142540] text-[#E8D5B8] font-bold text-[16px] py-3.5 px-8 rounded-xl transition-colors min-h-[52px] focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
        >
          Open My Trips
          <ArrowRight className="w-4 h-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Hero */}
      <section className="bg-[#1B3252] border-b-[3px] border-[#3AA8B5] px-6 pt-12 pb-10 text-center space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#3AA8B5]">
          Install on your phone
        </p>
        <h1 className="text-[#E8D5B8] font-bold text-[26px] leading-tight">
          Travel with confidence,<br />right from your phone
        </h1>
        <p className="text-[#C8B898] text-sm leading-relaxed max-w-xs mx-auto">
          Manage your accessibility needs, view bookings, and check in — all in one place.
        </p>
      </section>

      <div className="p-6 space-y-6">
        {/* Android: one-tap install */}
        {platform === "android" && deferredPrompt && (
          <div className="text-center space-y-4">
            <button
              onClick={handleInstall}
              disabled={installing}
              className="flex items-center justify-center gap-2 w-full bg-[#1B3252] hover:bg-[#142540] active:bg-[#0F1D30] text-[#E8D5B8] font-bold text-[17px] py-4 rounded-2xl transition-colors min-h-[56px] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
            >
              <Download className="w-5 h-5" />
              {installing ? "Installing…" : "Install Skybridge"}
            </button>
            <p className="text-xs text-muted-foreground">
              Tap above to add Skybridge to your home screen
            </p>
          </div>
        )}

        {/* Android: prompt not yet ready */}
        {platform === "android" && !deferredPrompt && (
          <div className="rounded-2xl border border-border bg-white dark:bg-card p-5 space-y-3">
            <p className="text-sm font-semibold">Almost ready…</p>
            <p className="text-sm text-muted-foreground">
              Your browser is checking install eligibility. Refresh the page in a moment, or tap the menu (⋮) at the top right and choose <strong>Install app</strong>.
            </p>
          </div>
        )}

        {/* iOS: step-by-step */}
        {platform === "ios" && (
          <div className="space-y-4">
            <p className="text-center text-sm font-semibold">
              Add Skybridge to your home screen in 3 steps
            </p>

            <ol className="space-y-3">
              <li className="rounded-2xl border border-border bg-white dark:bg-card p-4 flex gap-3 items-start">
                <span className="flex-none w-7 h-7 rounded-full bg-[#1B3252] text-[#E8D5B8] font-bold text-sm flex items-center justify-center">
                  1
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px]">
                    Tap the Share button
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
                    <Share className="w-4 h-4 text-[#2A7A8A] dark:text-[#3AA8B5]" />
                    Find this icon at the bottom of Safari
                  </div>
                </div>
              </li>

              <li className="rounded-2xl border border-border bg-white dark:bg-card p-4 flex gap-3 items-start">
                <span className="flex-none w-7 h-7 rounded-full bg-[#1B3252] text-[#E8D5B8] font-bold text-sm flex items-center justify-center">
                  2
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px]">
                    Choose &quot;Add to Home Screen&quot;
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
                    <Plus className="w-4 h-4 text-[#2A7A8A] dark:text-[#3AA8B5]" />
                    Scroll down in the share menu if needed
                  </div>
                </div>
              </li>

              <li className="rounded-2xl border border-border bg-white dark:bg-card p-4 flex gap-3 items-start">
                <span className="flex-none w-7 h-7 rounded-full bg-[#1B3252] text-[#E8D5B8] font-bold text-sm flex items-center justify-center">
                  3
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px]">Tap &quot;Add&quot;</p>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Skybridge will appear on your home screen with its own icon.
                  </p>
                </div>
              </li>
            </ol>

            {/* Animated arrow pointing down to Safari Share button */}
            <div className="text-center text-[40px] text-[#3AA8B5] animate-bounce mt-2">
              ↓
            </div>
            <p className="text-center text-xs text-muted-foreground -mt-2">
              The Share button is at the bottom of Safari
            </p>
          </div>
        )}

        {/* Desktop fallback */}
        {platform === "desktop" && (
          <div className="rounded-2xl border border-border bg-white dark:bg-card p-5 space-y-3 text-center">
            <p className="text-sm font-semibold">
              Open this page on your phone
            </p>
            <p className="text-sm text-muted-foreground">
              Skybridge is designed for mobile. Visit{" "}
              <strong className="text-foreground">skybridge-ae.vercel.app</strong>{" "}
              on your phone&apos;s browser to install.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 mt-2 text-[#2A7A8A] dark:text-[#3AA8B5] font-semibold text-sm hover:underline"
            >
              Or continue in browser
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Why install */}
        <div className="pt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2A7A8A] dark:text-[#3AA8B5] mb-3">
            What you get
          </p>
          <div className="space-y-3">
            {[
              "Manage accessibility accommodations from your phone",
              "View and modify booking details",
              "Get reminders before your trip",
              "One-tap access from your home screen",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2A7A8A] dark:text-[#3AA8B5] mt-0.5 shrink-0" />
                <p className="text-[15px]">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skip option */}
        <div className="pt-2 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            Skip — continue in browser
          </Link>
        </div>
      </div>
    </main>
  );
}
