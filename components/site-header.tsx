"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import type { Locale } from "@/lib/locales";
import { locales } from "@/lib/locales";

import { LanguageToggle } from "./language-toggle";
import { SiteLogo } from "./site-logo";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  locale: Locale;
  navigation: NavigationItem[];
};

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ctaLabel = locale === "fr" ? "Discutons" : "Let\u2019s talk";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-black backdrop-blur-md backdrop-saturate-[180%]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <SiteLogo locale={locale} />
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} availableLocales={[...locales]} />
          
          {/* Desktop CTA */}
          <Link
            href={findPrimaryCta(navigation, locale)}
            className="hidden rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-[0_0_0_1px_rgba(102,255,0,0.25)] transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:inline-flex"
          >
            {ctaLabel}
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-border/60 bg-black lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={findPrimaryCta(navigation, locale)}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-3 text-center text-sm font-semibold text-primary shadow-[0_0_0_1px_rgba(102,255,0,0.25)] transition hover:bg-primary hover:text-primary-foreground"
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function findPrimaryCta(navigation: NavigationItem[], locale: Locale) {
  const fallback = locale === "fr" ? "/fr/contact" : "/en/contact";
  const contactItem = navigation.find((item) => item.href.includes("/contact"));
  return contactItem?.href ?? fallback;
}
