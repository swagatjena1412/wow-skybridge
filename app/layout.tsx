import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BookingProvider } from "@/components/BookingProvider";
import { RegisterSW } from "@/components/RegisterSW";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Skybridge",
  description: "Travel with confidence — manage your accessibility needs",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Skybridge",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allow zoom up to 5x — required by WCAG 1.4.4 (Resize text) and
  // critical for elderly users who rely on pinch-to-zoom.
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1B3252",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <BookingProvider>
            <div className="min-h-dvh max-w-[430px] mx-auto flex flex-col">
              {children}
            </div>
          </BookingProvider>
        </ThemeProvider>
        <RegisterSW />
      </body>
    </html>
  );
}
