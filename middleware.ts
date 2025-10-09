import { NextRequest, NextResponse } from "next/server";

// Define supported locales
const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

/**
 * Check if a string is a valid locale
 */
function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the preferred locale from cookie or Accept-Language header
 */
function getPreferredLocale(request: NextRequest): Locale {
  // Check for saved locale preference in cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && isValidLocale(localeCookie)) {
    return localeCookie;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    // Parse the Accept-Language header (e.g., "en-US,en;q=0.9,fr;q=0.8")
    const languages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());
    
    // Try to match exact locale (e.g., "en" or "fr")
    for (const lang of languages) {
      if (isValidLocale(lang)) {
        return lang;
      }
      // Try to match language prefix (e.g., "en-US" -> "en")
      const langPrefix = lang.split("-")[0];
      if (isValidLocale(langPrefix)) {
        return langPrefix;
      }
    }
  }

  return defaultLocale;
}

/**
 * Extract locale from pathname
 * Returns the locale if found, otherwise null
 */
function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // - Next.js internals (_next)
  // - API routes
  // - Static files (files with extensions like .ico, .png, .jpg, etc.)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale
  const localeInPath = getLocaleFromPathname(pathname);
  
  if (localeInPath) {
    // Pathname already has a locale, allow the request to proceed
    // Set cookie to remember user's locale preference
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", localeInPath, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    return response;
  }

  // No locale in pathname - redirect to appropriate locale
  const preferredLocale = getPreferredLocale(request);
  
  // Construct the new URL with locale prefix
  const newUrl = new URL(
    `/${preferredLocale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
    request.url
  );

  // Redirect to the locale-prefixed URL
  const response = NextResponse.redirect(newUrl);
  
  // Set cookie to remember locale preference
  response.cookies.set("NEXT_LOCALE", preferredLocale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}

/**
 * Matcher configuration
 * This tells Next.js which paths should run through middleware
 * We exclude _next, api, and files with extensions
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - api routes
     * - files with extensions (e.g. .ico, .png, .jpg)
     */
    "/((?!_next/static|_next/image|api|.*\\..*).*)",
  ],
};
