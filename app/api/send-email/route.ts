import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmailHtml, EMAIL_SUBJECT } from "@/lib/email-template";

export async function POST(req: NextRequest) {
  try {
    const { to } = await req.json();

    if (!to || typeof to !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return NextResponse.json(
        { error: "Valid email address required" },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { error: "Email service not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD env vars." },
        { status: 500 }
      );
    }

    const appUrl =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://skybridge-ae.vercel.app";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"Skybridge Travel" <${gmailUser}>`,
      to,
      subject: EMAIL_SUBJECT,
      html: getEmailHtml(appUrl),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 }
    );
  }
}
