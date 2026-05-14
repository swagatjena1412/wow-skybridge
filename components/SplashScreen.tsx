"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "skybridge-splash-played";
const PLAY_MS = 1600;
const FADE_MS = 250;

type Phase = "playing" | "fading" | "done";

function alreadyPlayedThisSession(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markPlayed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // sessionStorage may be unavailable (private browsing quota, etc.)
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SplashScreen() {
  // Lazy init: skip the splash entirely on internal navigation in the same
  // session, or for users who have asked the OS to reduce motion.
  const [phase, setPhase] = useState<Phase>(() => {
    if (alreadyPlayedThisSession() || prefersReducedMotion()) return "done";
    return "playing";
  });

  useEffect(() => {
    if (phase === "done") return;

    markPlayed();

    const fadeTimer = setTimeout(() => setPhase("fading"), PLAY_MS);
    const doneTimer = setTimeout(() => setPhase("done"), PLAY_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1B3252] splash-root"
      data-phase={phase}
    >
      {/* Flight scene */}
      <div className="relative flex flex-col items-center gap-6">
        {/* SVG: curved teal trail + paper plane */}
        <svg
          width="240"
          height="180"
          viewBox="0 0 240 180"
          fill="none"
          className="overflow-visible"
        >
          {/* Curved flight trail */}
          <path
            d="M 20 150 Q 90 110 130 80 T 220 30"
            stroke="#3AA8B5"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="splash-trail"
          />

          {/* Paper plane — cream/yellow geometric shape that follows the trail */}
          <g className="splash-plane">
            <g transform="translate(-12,-12)">
              <path
                d="M2 12 L22 4 L14 14 L22 24 Z"
                fill="#F5C84A"
                stroke="#1B3252"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              <path
                d="M14 14 L22 24 L13 18 Z"
                fill="#D9A828"
                stroke="#1B3252"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>

        {/* Wordmark + tagline */}
        <div className="flex flex-col items-center gap-2 splash-wordmark">
          <p className="text-[#E8D5B8] font-bold text-[28px] tracking-wide leading-none">
            Skybridge
          </p>
          <p className="text-[#C8B898] text-[13px] splash-tagline">
            Travel with confidence
          </p>
        </div>
      </div>

      <style>{`
        .splash-root {
          opacity: 1;
          transition: opacity ${FADE_MS}ms ease-out;
        }
        .splash-root[data-phase="fading"] {
          opacity: 0;
          pointer-events: none;
        }

        .splash-trail {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: splashDrawTrail 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .splash-plane {
          transform-origin: center;
          /* Plane sits at the SVG end of the trail (220, 30 in viewBox space).
             Animate it from off-screen lower-left along the trail's general arc. */
          animation: splashFlyPlane 1100ms cubic-bezier(0.42, 0, 0.2, 1) forwards;
        }

        .splash-wordmark {
          opacity: 0;
          animation: splashWordmarkIn 600ms cubic-bezier(0.16, 1, 0.3, 1) 700ms forwards;
        }

        .splash-tagline {
          opacity: 0;
          animation: splashWordmarkIn 500ms cubic-bezier(0.16, 1, 0.3, 1) 1000ms forwards;
        }

        @keyframes splashDrawTrail {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }

        @keyframes splashFlyPlane {
          0%   { transform: translate(-40px, 180px) rotate(-30deg); opacity: 0; }
          15%  { opacity: 1; }
          60%  { transform: translate(110px, 70px)  rotate(-15deg); }
          100% { transform: translate(220px, 30px)  rotate(-25deg); opacity: 1; }
        }

        @keyframes splashWordmarkIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-root,
          .splash-trail,
          .splash-plane,
          .splash-wordmark,
          .splash-tagline {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
