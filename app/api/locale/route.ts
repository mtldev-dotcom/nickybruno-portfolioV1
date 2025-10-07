import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export async function POST(request: Request) {
  const { locale } = (await request.json().catch(() => ({}))) as { locale?: string };

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const cookieStore = cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ success: true });
}
