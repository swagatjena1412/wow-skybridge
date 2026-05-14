import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BookingProvider } from "@/components/BookingProvider";

export const metadata: Metadata = {
  title: "Skybridge",
  description: "Travel with confidence — manage your accessibility needs",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Skybridge",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1B3252",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        <BookingProvider>
          <div className="min-h-dvh max-w-[430px] mx-auto flex flex-col">
            {children}
          </div>
        </BookingProvider>
      </body>
    </html>
  );
}
