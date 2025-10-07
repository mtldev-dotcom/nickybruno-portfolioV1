type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

type TimelineProps = {
  entries: TimelineEntry[];
  locale: string;
};

export function Timeline({ entries, locale }: TimelineProps) {
  if (!entries.length) {
    return null;
  }

  const heading = locale === "fr" ? "Chronologie" : "Timeline";

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <ol className="space-y-6">
        {entries.map((entry) => (
          <li
            key={`${entry.year}-${entry.title}`}
            className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-[0_15px_60px_-40px_rgba(102,255,0,0.45)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{entry.year}</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{entry.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{entry.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
