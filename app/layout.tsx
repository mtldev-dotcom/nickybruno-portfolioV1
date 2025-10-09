import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">{`
          (() => {
            try {
              const storageTheme = localStorage.getItem('theme');
              const theme = storageTheme ?? 'dark';
              const root = document.documentElement;
              if (theme === 'dark') root.classList.add('dark');
              else root.classList.remove('dark');
            } catch (e) {}
          })();
        `}</Script>
        {children}
      </body>
    </html>
  );
}
