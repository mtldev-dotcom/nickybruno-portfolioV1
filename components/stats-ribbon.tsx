type StatItem = {
  label: string;
  value: string;
};

type StatsRibbonProps = {
  stats: StatItem[];
};

export function StatsRibbon({ stats }: StatsRibbonProps) {
  if (!stats.length) {
    return null;
  }

  return (
    <div className="grid gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-[0_10px_60px_-40px_rgba(102,255,0,0.45)] sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-2 text-center sm:text-left">
          <p className="text-3xl font-semibold text-primary">{stat.value}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
