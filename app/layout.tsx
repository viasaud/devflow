import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import React from "react";

import "./globals.css";
import "../styles/prism.css";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata: Metadata = {
  title: "Developer Flow",
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
        className={`${GeistMono.variable} ${GeistSans.variable} dark:dark-scrollbar light-scrollbar bg-primary min-h-screen scroll-smooth dark:bg-gradient-to-br dark:from-zinc-950 dark:from-20% dark:to-zinc-900`}
      >
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
