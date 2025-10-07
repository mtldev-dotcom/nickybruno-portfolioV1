export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}
