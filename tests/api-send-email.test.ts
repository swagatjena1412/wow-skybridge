import { describe, it, expect, beforeEach, vi } from "vitest";

const sendMailMock = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({ sendMail: sendMailMock }),
  },
}));

const buildRequest = (body: unknown, origin = "https://test.example.com") =>
  new Request("https://test.example.com/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
    },
    body: JSON.stringify(body),
  });

describe("POST /api/send-email", () => {
  beforeEach(() => {
    sendMailMock.mockReset();
    sendMailMock.mockResolvedValue({ messageId: "test-id" });
    process.env.GMAIL_USER = "test@gmail.com";
    process.env.GMAIL_APP_PASSWORD = "app-password";
  });

  it("rejects missing recipient", async () => {
    const { POST } = await import("@/app/api/send-email/route");
    const res = await POST(buildRequest({}) as unknown as never);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/valid email/i);
  });

  it("rejects malformed email address", async () => {
    const { POST } = await import("@/app/api/send-email/route");
    const res = await POST(buildRequest({ to: "not-an-email" }) as unknown as never);
    expect(res.status).toBe(400);
  });

  it("rejects email longer than RFC 5321 max (254 chars)", async () => {
    const { POST } = await import("@/app/api/send-email/route");
    const longEmail = "a".repeat(250) + "@x.co"; // 256 chars total
    const res = await POST(buildRequest({ to: longEmail }) as unknown as never);
    expect(res.status).toBe(400);
  });

  it("returns 500 when env vars are missing", async () => {
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
    const { POST } = await import("@/app/api/send-email/route");
    const res = await POST(
      buildRequest({ to: "real@example.com" }) as unknown as never
    );
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/not configured/i);
  });

  it("sends mail successfully and returns 200", async () => {
    const { POST } = await import("@/app/api/send-email/route");
    const res = await POST(
      buildRequest({ to: "real@example.com" }) as unknown as never
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const args = sendMailMock.mock.calls[0][0];
    expect(args.to).toBe("real@example.com");
    expect(args.subject).toMatch(/3 days/);
    expect(args.html).toContain("Skybridge");
  });

  it("uses Origin header to build CTA URL", async () => {
    const { POST } = await import("@/app/api/send-email/route");
    await POST(
      buildRequest(
        { to: "real@example.com" },
        "https://my-custom-host.com"
      ) as unknown as never
    );
    const args = sendMailMock.mock.calls[0][0];
    expect(args.html).toContain("https://my-custom-host.com/install");
  });

  it("returns 500 when SMTP send throws", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("SMTP connect refused"));
    const { POST } = await import("@/app/api/send-email/route");
    const res = await POST(
      buildRequest({ to: "real@example.com" }) as unknown as never
    );
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/smtp connect/i);
  });
});
