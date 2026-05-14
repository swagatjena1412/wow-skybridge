import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import EmailPreviewPage from "@/app/email-preview/page";

const setupFetch = (responses: Record<string, unknown>) => {
  global.fetch = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    for (const path of Object.keys(responses)) {
      if (url.includes(path)) {
        const data = responses[path];
        return new Response(
          typeof data === "string" ? data : JSON.stringify(data),
          {
            status: typeof data === "object" && data && "status" in data ? (data as { status: number }).status : 200,
            headers: { "Content-Type": typeof data === "string" ? "text/html" : "application/json" },
          }
        );
      }
    }
    throw new Error(`Unexpected fetch: ${url}`);
  }) as typeof fetch;
};

describe("Email Preview page", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the page heading and context note", async () => {
    setupFetch({ "/api/email-html": "<html><body>preview</body></html>" });
    render(<EmailPreviewPage />);
    expect(
      screen.getByRole("heading", { name: /email preview/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/3 days before travel/i)).toBeInTheDocument();
  });

  it("loads the email HTML into the iframe", async () => {
    setupFetch({ "/api/email-html": "<html><body>preview body</body></html>" });
    render(<EmailPreviewPage />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/email-html");
    });
  });

  it("rejects an empty submit", async () => {
    setupFetch({ "/api/email-html": "<html></html>" });
    const user = userEvent.setup();
    render(<EmailPreviewPage />);
    const button = screen.getByRole("button", { name: /send sample email/i });
    expect(button).toBeDisabled();
    // Empty input means button stays disabled
    await user.click(button);
    expect(global.fetch).not.toHaveBeenCalledWith(
      "/api/send-email",
      expect.anything()
    );
  });

  it("sends sample email and shows success state", async () => {
    setupFetch({
      "/api/email-html": "<html></html>",
      "/api/send-email": { success: true },
    });
    const user = userEvent.setup();
    render(<EmailPreviewPage />);

    const input = screen.getByPlaceholderText(/your.email/i);
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: /send sample email/i }));

    await waitFor(() => {
      expect(screen.getByText(/email sent/i)).toBeInTheDocument();
    });
  });

  it("shows error state when API returns failure", async () => {
    setupFetch({
      "/api/email-html": "<html></html>",
    });
    global.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/api/email-html")) {
        return new Response("<html></html>", { status: 200 });
      }
      return new Response(JSON.stringify({ error: "SMTP unreachable" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const user = userEvent.setup();
    render(<EmailPreviewPage />);
    await user.type(screen.getByPlaceholderText(/your.email/i), "x@y.co");
    await user.click(screen.getByRole("button", { name: /send sample email/i }));

    await waitFor(() => {
      expect(screen.getByText(/could not send/i)).toBeInTheDocument();
      expect(screen.getByText(/smtp unreachable/i)).toBeInTheDocument();
    });
  });
});
