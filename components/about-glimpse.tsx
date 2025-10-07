import Link from "next/link";

type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

type AboutGlimpseProps = {
  locale: string;
  title: string;
  tagline: string;
  timeline: TimelineEntry[];
  ctaLabel: string;
  ctaHref: string;
};

export function AboutGlimpse({ locale, title, tagline, timeline, ctaLabel, ctaHref }: AboutGlimpseProps) {
  const introLabel = locale === "fr" ? "Parcours" : "Journey";

  return (
    <section className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-[0_30px_90px_-60px_rgba(102,255,0,0.6)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{introLabel}</span>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
          <p className="text-base text-muted-foreground md:text-lg">{tagline}</p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {ctaLabel}
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {timeline.slice(0, 4).map((item) => (
          <article
            key={`${item.year}-${item.title}`}
            className="rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{item.year}</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
