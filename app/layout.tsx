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
        className={`${GeistMono.variable} ${GeistSans.variable} dark:dark-scrollbar light-scrollbar min-h-screen scroll-smooth dark:bg-gradient-to-br dark:from-zinc-950 dark:from-20% dark:to-zinc-900`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary:
                "no-focus text-sm bg-teal-500 text-zinc-50 shadow-none hover:bg-teal-500/90",
              footerActionLink: "text-teal-500 hover:text-teal-600",
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
