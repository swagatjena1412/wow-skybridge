import { NextRequest, NextResponse } from "next/server";
import { getEmailHtml } from "@/lib/email-template";

export async function GET(req: NextRequest) {
  const appUrl = req.headers.get("origin") || "https://skybridge-ae.vercel.app";
  return new NextResponse(getEmailHtml(appUrl), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
