import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
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
        className={`${GeistMono.variable} ${GeistSans.variable} dark:dark-scrollbar light-scrollbar bg-primary min-h-screen scroll-smooth selection:bg-teal-300 selection:text-teal-900 dark:bg-gradient-to-br dark:from-zinc-950 dark:from-20% dark:to-zinc-900`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider>
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
