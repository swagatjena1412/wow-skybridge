import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/email-html/route";

describe("GET /api/email-html", () => {
  const buildRequest = (origin?: string) =>
    new Request("https://test.example.com/api/email-html", {
      method: "GET",
      headers: origin ? { Origin: origin } : {},
    });

  it("returns 200 with text/html content type", async () => {
    const res = await GET(buildRequest("https://test.example.com") as unknown as never);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
  });

  it("renders the brand, accommodations section, and CTA in the body", async () => {
    const res = await GET(buildRequest("https://test.example.com") as unknown as never);
    const body = await res.text();
    expect(body).toContain("Skybridge");
    expect(body).toContain("Accessibility Options on this booking");
    expect(body).toContain("View &amp; Manage Accessibility");
    expect(body).toContain("/booking");
  });

  it("uses Origin header in the booking link", async () => {
    const res = await GET(buildRequest("https://my-host.com") as unknown as never);
    const body = await res.text();
    expect(body).toContain("https://my-host.com/booking");
  });

  it("falls back to default URL if no Origin header", async () => {
    const res = await GET(buildRequest() as unknown as never);
    const body = await res.text();
    expect(body).toContain("/booking");
  });
});
