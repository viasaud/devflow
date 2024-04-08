import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import React from "react";

import "./globals.css";
import "../styles/prism.css";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community of developers helping each other",
  icons: { icon: "/svg/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} ${GeistSans.variable} bg-primary`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary:
                "no-focus text-sm bg-orange-500 text-zinc-50 shadow-none hover:bg-orange-500/90",
              footerActionLink: "text-orange-500 hover:text-orange-600",
            },
          }}
        >
          <ThemeProvider>
            {children}
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
