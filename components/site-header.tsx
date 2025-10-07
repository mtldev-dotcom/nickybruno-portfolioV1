import Link from "next/link";

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
  const ctaLabel = locale === "fr" ? "Discutons" : "Let\u2019s talk";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-md backdrop-saturate-[180%] supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <SiteLogo locale={locale} />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
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
          <Link
            href={findPrimaryCta(navigation, locale)}
            className="hidden rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-[0_0_0_1px_rgba(102,255,0,0.25)] transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:inline-flex"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

function findPrimaryCta(navigation: NavigationItem[], locale: Locale) {
  const fallback = locale === "fr" ? "/fr/contact" : "/en/contact";
  const contactItem = navigation.find((item) => item.href.includes("/contact"));
  return contactItem?.href ?? fallback;
}
