import Link from "next/link";

type SiteLogoProps = {
  locale: string;
};

export function SiteLogo({ locale }: SiteLogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/60 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent font-mono text-xs text-primary group-hover:shadow-[0_0_24px_rgba(102,255,0,0.35)]">
        NB
      </span>
      <span className="sr-only sm:not-sr-only">Nicky Bruno</span>
    </Link>
  );
}
