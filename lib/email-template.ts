import { MOCK_BOOKING } from "./data";

export function getEmailHtml(appUrl: string) {
  const b = MOCK_BOOKING;
  const ctaLink = `${appUrl}/install`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your trip is in 3 days — Skybridge</title>
  </head>
  <body style="margin:0;padding:0;background:#F2F3F5;font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;color:#141414;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2F3F5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);">
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
                <p style="margin:0;color:#2A7A8A;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Your trip is in 3 days</p>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;color:#141414;font-weight:700;">
                  Get ready, ${b.passenger.split(" ")[0]}
                </h1>
                <p style="margin:8px 0 0;color:#555;font-size:15px;line-height:1.5;">
                  Your flight to ${b.toCity} is coming up. We&rsquo;ve made it easier to manage your accessibility needs right from your phone.
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
                          <td style="color:#E8D5B8;font-weight:700;font-size:15px;">${b.flightNumber}</td>
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
                            <p style="margin:0;font-size:24px;font-weight:700;color:#141414;line-height:1;">${b.departTime}</p>
                            <p style="margin:4px 0 0;font-size:13px;color:#777;">${b.fromCode} ${b.fromCity}</p>
                          </td>
                          <td align="center" style="color:#999;font-size:14px;">&rarr;</td>
                          <td align="right" style="vertical-align:top;">
                            <p style="margin:0;font-size:24px;font-weight:700;color:#141414;line-height:1;">${b.arriveTime}</p>
                            <p style="margin:4px 0 0;font-size:13px;color:#777;">${b.toCode} ${b.toCity}</p>
                          </td>
                        </tr>
                      </table>
                      <hr style="margin:14px 0 12px;border:0;border-top:1px solid #EEE;">
                      <p style="margin:0;font-size:13px;color:#666;">${b.date}</p>
                      <p style="margin:4px 0 0;font-size:13px;color:#666;">${b.passenger} &middot; Seat ${b.seat} &middot; Ref: ${b.ref}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- New feature callout -->
            <tr>
              <td style="padding:8px 24px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EAF5F7;border:1px solid #B0DCE3;border-radius:12px;">
                  <tr>
                    <td style="padding:18px;">
                      <p style="margin:0;color:#2A7A8A;font-weight:700;font-size:14px;">NEW &middot; Manage accessibility from your phone</p>
                      <p style="margin:8px 0 0;color:#1B3252;font-size:14px;line-height:1.5;">
                        You can now view, add, and modify accessibility accommodations directly in the Skybridge app &mdash; no need to call support.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:8px 24px 32px;text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:#1B3252;border-radius:12px;">
                      <a href="${ctaLink}" target="_blank" style="display:inline-block;padding:16px 32px;color:#E8D5B8;font-weight:700;font-size:16px;text-decoration:none;letter-spacing:.3px;">
                        Install Skybridge App
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0;font-size:12px;color:#999;line-height:1.5;">
                  Tap the button to install on your phone &mdash; takes 5 seconds
                </p>
              </td>
            </tr>

            <!-- What to expect -->
            <tr>
              <td style="padding:0 24px 24px;">
                <p style="margin:0 0 10px;color:#2A7A8A;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">What to expect at the airport</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr><td style="padding:6px 0;color:#444;font-size:14px;">&rarr; Arrive at least 30 minutes earlier than usual</td></tr>
                  <tr><td style="padding:6px 0;color:#444;font-size:14px;">&rarr; Check in at the accessible services desk</td></tr>
                  <tr><td style="padding:6px 0;color:#444;font-size:14px;">&rarr; A Skybridge agent will meet you at the gate</td></tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#F2F3F5;padding:20px 24px;text-align:center;border-top:1px solid #E5E5E5;">
                <p style="margin:0;color:#999;font-size:12px;line-height:1.5;">
                  Skybridge &middot; From doorstep to destination<br>
                  <a href="${appUrl}" style="color:#2A7A8A;text-decoration:none;">${appUrl.replace("https://", "").replace("http://", "")}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export const EMAIL_SUBJECT = "Your trip is in 3 days — Skybridge";
