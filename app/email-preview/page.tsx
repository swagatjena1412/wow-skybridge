"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { NavBar } from "@/components/NavBar";

export default function EmailPreviewPage() {
  const [emailHtml, setEmailHtml] = useState<string>("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetch("/api/email-html")
      .then((r) => r.text())
      .then(setEmailHtml);
  }, []);

  useEffect(() => {
    if (!emailHtml || !iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(emailHtml);
    doc.close();
  }, [emailHtml]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: recipient }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  };

  return (
    <>
      <NavBar title="Email Preview" backHref="/" />

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Context */}
        <div className="rounded-2xl bg-[#EAF5F7] dark:bg-[#1A3040] border border-[#B0DCE3] dark:border-[#2A5A6A] p-4 space-y-2">
          <div className="flex gap-2 items-center">
            <Mail className="w-4 h-4 text-[#2A7A8A] dark:text-[#3AA8B5]" />
            <p className="text-[13px] font-bold text-[#2A7A8A] dark:text-[#3AA8B5] uppercase tracking-widest">
              3 days before travel
            </p>
          </div>
          <p className="text-sm text-[#1B3252] dark:text-[#3AA8B5]">
            This email is sent automatically 3 days before each flight to remind users about their booking and the new accessibility self-service feature.
          </p>
        </div>

        {/* Email preview iframe */}
        <div className="rounded-2xl border border-border overflow-hidden bg-white">
          <div className="bg-[#1B3252] px-4 py-2.5 flex items-center justify-between">
            <p className="text-[#E8D5B8] text-[12px] font-semibold">Live Preview</p>
            <p className="text-[#C8B898] text-[10px]">Subject: Your trip is in 3 days</p>
          </div>
          <iframe
            ref={iframeRef}
            title="Email preview"
            sandbox="allow-same-origin"
            className="w-full h-[700px] bg-white"
          />
        </div>

        {/* Send-to-self form */}
        <div className="rounded-2xl border border-border bg-white dark:bg-card overflow-hidden">
          <div className="px-4 py-3 bg-[#F2F3F5] dark:bg-muted border-b border-border">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Send a sample to your inbox
            </p>
          </div>
          <form onSubmit={handleSend} className="p-4 space-y-3">
            <input
              type="email"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="your.email@example.com"
              disabled={status === "sending"}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-[15px] focus:outline-2 focus:outline-[#2A7A8A] focus:outline-offset-2 min-h-[48px]"
            />

            <button
              type="submit"
              disabled={status === "sending" || !recipient}
              className="flex items-center justify-center gap-2 w-full bg-[#1B3252] hover:bg-[#142540] active:bg-[#0F1D30] text-[#E8D5B8] font-bold text-[15px] py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#3AA8B5] focus-visible:outline-offset-2"
            >
              <Send className="w-4 h-4" />
              {status === "sending" ? "Sending…" : "Send sample email"}
            </button>

            {status === "sent" && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-sm">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Email sent</p>
                  <p>Check your inbox at <strong>{recipient}</strong></p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Could not send</p>
                  <p>{errorMsg}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
