import { describe, it, expect } from "vitest";
import { getEmailHtml, EMAIL_SUBJECT } from "@/lib/email-template";
import { MOCK_BOOKING } from "@/lib/data";

describe("email template", () => {
  const html = getEmailHtml("https://skybridge-ae.vercel.app");

  it("uses brand navy color in the header", () => {
    expect(html).toContain("#1B3252");
  });

  it("uses cream color for header text", () => {
    expect(html).toContain("#E8D5B8");
  });

  it("includes the booking flight number", () => {
    expect(html).toContain(MOCK_BOOKING.flightNumber);
  });

  it("includes passenger first name in the greeting", () => {
    const firstName = MOCK_BOOKING.passenger.split(" ")[0];
    expect(html).toContain(`Get ready, ${firstName}`);
  });

  it("links the CTA button to the install page", () => {
    expect(html).toContain("/install");
    expect(html).toContain("Install Skybridge App");
  });

  it("mentions the new accessibility feature", () => {
    expect(html.toLowerCase()).toContain("accessibility");
  });

  it("subject mentions days until travel", () => {
    expect(EMAIL_SUBJECT).toMatch(/3 days/i);
  });

  it("is valid HTML with closing tags", () => {
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain("</html>");
    expect(html).toContain("</body>");
  });
});
