import Link from "next/link";

import type { Locale } from "@/lib/locales";

type Social = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  locale: Locale;
  copyright: string;
  socials: Social[];
};

export function SiteFooter({ locale, copyright, socials }: SiteFooterProps) {
  const localizedLabel = locale === "fr" ? "Contact direct" : "Connect";
  const renderedCopyright = copyright.replace(
    "{{year}}",
    new Date().getFullYear().toString(),
  );

  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">{renderedCopyright}</p>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:items-end md:text-right">
          <span className="font-semibold uppercase tracking-[0.3em] text-xs text-primary">
            {localizedLabel}
          </span>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                className="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
