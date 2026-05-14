/**
 * Generates the pre-trip reminder email to out/email.html and out/email.txt.
 *
 * Usage:
 *   node scripts/generate-email.mjs
 *   APP_URL=https://your-url.com node scripts/generate-email.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_URL   = process.env.APP_URL ?? "https://skybridge-ae.vercel.app";
const CTA_URL   = `${APP_URL}/booking`;
const OUT_DIR   = resolve(__dirname, "..", "out");
const SUBJECT   = "Your trip is in 3 days — Skybridge";

mkdirSync(OUT_DIR, { recursive: true });

// ── Booking + accommodation data (mirrors lib/data.ts mock) ──────────────────
const BOOKING = {
  flightNumber: "SK 2847",
  date:         "Mon, June 15 2026",
  departTime:   "08:45",
  arriveTime:   "11:20",
  fromCode:     "YYZ",
  fromCity:     "Toronto",
  toCode:       "YVR",
  toCity:       "Vancouver",
  passenger:    "Margaret Thompson",
  seat:         "14A",
  ref:          "SKYB-4821",
};

const SELECTED_ACCOMMODATIONS = [
  {
    label:       "Wheelchair to gate",
    description: "Assistance from check-in to departure gate",
  },
  {
    label:       "Special meal: diabetic",
    description: "Low-sugar meal option",
  },
];

// ── HTML rows for accommodations ─────────────────────────────────────────────
const accommodationRows = SELECTED_ACCOMMODATIONS.map((o) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #F0F0F0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="26" style="vertical-align:top;padding-top:1px;">
                      <span style="display:inline-block;width:20px;height:20px;background:#1B3252;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#E8D5B8;font-weight:700;">✓</span>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0;font-size:14px;font-weight:700;color:#141414;">${o.label}</p>
                      <p style="margin:3px 0 0;font-size:12px;color:#777;">${o.description}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`).join("");

// ── Full HTML email ───────────────────────────────────────────────────────────
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${SUBJECT}</title>
  </head>
  <body style="margin:0;padding:0;background:#F2F3F5;font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;color:#141414;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2F3F5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#1B3252;padding:24px;text-align:center;border-bottom:3px solid #3AA8B5;">
                <p style="margin:0;color:#E8D5B8;font-weight:700;font-size:20px;letter-spacing:.5px;">Skybridge</p>
                <p style="margin:6px 0 0;color:#C8B898;font-size:13px;">Travel with confidence</p>
              </td>
            </tr>

            <!-- Hero -->
            <tr>
              <td style="padding:32px 24px 8px;">
                <p style="margin:0;color:#1F5E6B;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Your trip is in 3 days</p>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;color:#141414;font-weight:700;">
                  Get ready, ${BOOKING.passenger.split(" ")[0]}
                </h1>
                <p style="margin:8px 0 0;color:#555;font-size:15px;line-height:1.5;">
                  Your flight to ${BOOKING.toCity} is coming up. Here's a summary of your booking and the accessibility accommodations we have on file for you.
                </p>
              </td>
            </tr>

            <!-- Booking card -->
            <tr>
              <td style="padding:16px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E5E5;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="background:#1B3252;padding:12px 16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="color:#E8D5B8;font-weight:700;font-size:15px;">${BOOKING.flightNumber}</td>
                          <td align="right">
                            <span style="color:#5EE9B5;font-weight:700;font-size:11px;background:rgba(0,78,59,.7);padding:3px 10px;border-radius:10px;display:inline-block;">Confirmed</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="vertical-align:top;">
                            <p style="margin:0;font-size:24px;font-weight:700;color:#141414;line-height:1;">${BOOKING.departTime}</p>
                            <p style="margin:4px 0 0;font-size:13px;color:#777;">${BOOKING.fromCode} ${BOOKING.fromCity}</p>
                          </td>
                          <td align="center" style="color:#999;font-size:18px;">&rarr;</td>
                          <td align="right" style="vertical-align:top;">
                            <p style="margin:0;font-size:24px;font-weight:700;color:#141414;line-height:1;">${BOOKING.arriveTime}</p>
                            <p style="margin:4px 0 0;font-size:13px;color:#777;">${BOOKING.toCode} ${BOOKING.toCity}</p>
                          </td>
                        </tr>
                      </table>
                      <hr style="margin:14px 0 12px;border:0;border-top:1px solid #EEE;">
                      <p style="margin:0;font-size:13px;color:#666;">${BOOKING.date}</p>
                      <p style="margin:4px 0 0;font-size:13px;color:#666;">${BOOKING.passenger} &middot; Seat ${BOOKING.seat} &middot; Ref: ${BOOKING.ref}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Accessibility accommodations -->
            <tr>
              <td style="padding:0 24px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid #3AA8B5;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="background:#1B3252;padding:12px 16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="color:#E8D5B8;font-weight:700;font-size:14px;">Accessibility Options on this booking</td>
                          <td align="right">
                            <span style="background:#EAF5F7;color:#1B3252;font-size:11px;font-weight:700;padding:3px 10px;border-radius:10px;display:inline-block;">${SELECTED_ACCOMMODATIONS.length} confirmed</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 16px 4px;background:#FFFFFF;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        ${accommodationRows}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background:#F8FAFB;border-top:1px solid #E5E5E5;">
                      <p style="margin:0;font-size:13px;color:#555;">Need to add or change an accommodation? You can now do it directly from your phone.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:20px 24px 28px;text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:#1B3252;border-radius:12px;">
                      <a href="${CTA_URL}" target="_blank" style="display:inline-block;padding:16px 32px;color:#E8D5B8;font-weight:700;font-size:16px;text-decoration:none;letter-spacing:.3px;">
                        View &amp; Manage Accessibility
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0;font-size:12px;color:#999;line-height:1.5;">
                  Tap to open your booking and update your accessibility needs
                </p>
              </td>
            </tr>

            <!-- What to expect -->
            <tr>
              <td style="padding:0 24px 24px;">
                <p style="margin:0 0 10px;color:#1F5E6B;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">What to expect at the airport</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr><td style="padding:6px 0;color:#444;font-size:14px;">&rarr;&nbsp; Arrive at least 30 minutes earlier than usual</td></tr>
                  <tr><td style="padding:6px 0;color:#444;font-size:14px;">&rarr;&nbsp; Check in at the accessible services desk</td></tr>
                  <tr><td style="padding:6px 0;color:#444;font-size:14px;">&rarr;&nbsp; A Skybridge agent will meet you at the gate</td></tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#F2F3F5;padding:20px 24px;text-align:center;border-top:1px solid #E5E5E5;">
                <p style="margin:0;color:#999;font-size:12px;line-height:1.5;">
                  Skybridge &middot; From doorstep to destination<br>
                  <a href="${APP_URL}" style="color:#1F5E6B;text-decoration:none;">${APP_URL.replace(/^https?:\/\//, "")}</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

// ── Plain text ────────────────────────────────────────────────────────────────
const plainText = `SKYBRIDGE — Travel with confidence

YOUR TRIP IS IN 3 DAYS

Get ready, ${BOOKING.passenger.split(" ")[0]}

Your flight to ${BOOKING.toCity} is coming up. Here's a summary of your booking
and the accessibility accommodations we have on file for you.

────────────────────────────────────────
${BOOKING.flightNumber}                                 CONFIRMED

  ${BOOKING.departTime}  →  ${BOOKING.arriveTime}
  ${BOOKING.fromCode} ${BOOKING.fromCity}           ${BOOKING.toCode} ${BOOKING.toCity}

  ${BOOKING.date}
  ${BOOKING.passenger} · Seat ${BOOKING.seat} · Ref: ${BOOKING.ref}
────────────────────────────────────────

ACCESSIBILITY OPTIONS ON THIS BOOKING (${SELECTED_ACCOMMODATIONS.length} confirmed)

${SELECTED_ACCOMMODATIONS.map((o) => `  ✓  ${o.label}\n     ${o.description}`).join("\n\n")}

Need to add or change an accommodation? You can now do it from your phone.

VIEW & MANAGE ACCESSIBILITY:
${CTA_URL}


WHAT TO EXPECT AT THE AIRPORT
→ Arrive at least 30 minutes earlier than usual
→ Check in at the accessible services desk
→ A Skybridge agent will meet you at the gate


Skybridge · From doorstep to destination
${APP_URL}
`;

// ── Write files ───────────────────────────────────────────────────────────────
writeFileSync(resolve(OUT_DIR, "email.html"),        html);
writeFileSync(resolve(OUT_DIR, "email.txt"),         plainText);
writeFileSync(resolve(OUT_DIR, "email-subject.txt"), SUBJECT);

console.log("\nGenerated:");
console.log("  " + resolve(OUT_DIR, "email.html"));
console.log("  " + resolve(OUT_DIR, "email.txt"));
console.log("\nSubject: " + SUBJECT);
console.log("CTA:     " + CTA_URL);
console.log("\nTo send:");
console.log("  1. Open out/email.html in your browser (double-click or drag to Chrome)");
console.log("  2. Select all (⌘A) → Copy (⌘C)");
console.log("  3. Paste into Gmail / Outlook / Apple Mail compose window");
console.log("     Formatting carries over automatically.");
