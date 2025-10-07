import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

const DEFAULT_LOCALE: Locale = "en";

function isLocale(value: string | undefined | null): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/og") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
    const redirectUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const [maybeLocale] = segments;

  if (isLocale(maybeLocale)) {
    return NextResponse.next();
  }

  const redirectUrl = new URL(`/${DEFAULT_LOCALE}/${segments.join("/")}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
