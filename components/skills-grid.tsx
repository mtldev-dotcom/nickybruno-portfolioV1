type SkillGroup = {
  label: string;
  items: string[];
};

type SkillsGridProps = {
  groups: SkillGroup[];
  locale: string;
};

export function SkillsGrid({ groups, locale }: SkillsGridProps) {
  if (!groups.length) {
    return null;
  }

  const heading = locale === "fr" ? "Compétences clés" : "Core Skills";

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-[0_15px_60px_-40px_rgba(102,255,0,0.45)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{group.label}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
