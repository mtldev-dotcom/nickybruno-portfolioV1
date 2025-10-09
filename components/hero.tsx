"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type HeroHighlight = {
  label: string;
  value: string;
};

type HeroCta = {
  label: string;
  href: string;
};

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  highlights?: HeroHighlight[];
  locale: string;
  pillLabel?: string;
};

export function Hero({ title, subtitle, primaryCta, secondaryCta, highlights = [], locale, pillLabel }: HeroProps) {
  const studioLabel = pillLabel ?? (locale === "fr" ? "Studio num\u00E9rique" : "Digital Studio");

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 shadow-[0_10px_80px_-40px_rgba(var(--brand-green),0.5),0_12px_90px_-50px_rgba(var(--brand-blue),0.35)] sm:px-10 md:px-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl space-y-6 text-pretty"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-primary">
          {studioLabel}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{title}</h1>
        <p className="text-lg text-muted-foreground md:text-xl">{subtitle}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </motion.div>
      {highlights.length > 0 ? (
        <div className="mt-12 grid gap-6 rounded-3xl border border-border/60 bg-background/60 p-6 backdrop-blur sm:grid-cols-3">
          {highlights.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="space-y-1"
            >
              <p className="text-3xl font-semibold text-primary">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(var(--brand-green),0.15),_transparent_55%),radial-gradient(circle_at_80%_10%,_rgba(var(--brand-blue),0.12),_transparent_55%)]"
      />
    </section>
  );
}
