"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

type LanguageToggleProps = {
  locale: string;
  availableLocales: string[];
};

export function LanguageToggle({ locale, availableLocales }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const otherLocales = availableLocales.filter((current) => current !== locale);

  if (otherLocales.length === 0) {
    return null;
  }

  const handleSwitch = (targetLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      startTransition(() => {
        router.replace(`/${targetLocale}`);
      });
      return;
    }

    segments[0] = targetLocale;
    const targetPath = `/${segments.join("/")}`;

    startTransition(async () => {
      try {
        await fetch("/api/locale", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locale: targetLocale }),
        });
      } catch (error) {
        console.error("Failed to persist locale preference", error);
      }

      router.replace(targetPath);
    });
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-1 py-1 text-xs font-medium">
      {[locale, ...otherLocales].map((value) => {
        const isActive = value === locale;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleSwitch(value)}
            disabled={pending || isActive}
            className={`rounded-full px-2.5 py-1 transition ${
              isActive
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(var(--brand-blue),0.28),0_0_0_1px_rgba(var(--brand-green),0.45)]"
                : "text-muted-foreground hover:text-foreground"
            } ${pending ? "opacity-60" : ""}`}
            aria-pressed={isActive}
          >
            {value.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
