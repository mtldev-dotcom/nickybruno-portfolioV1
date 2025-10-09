import { ImageResponse } from "next/og";

import { getHero, getProjects } from "@/lib/content";
import { isLocale } from "@/lib/locales";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

type OpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new ImageResponse(<div />, size);
  }

  const [hero, projects] = await Promise.all([getHero(locale), getProjects(locale)]);
  const headline = typeof hero.title === "string" ? hero.title : "Nicky Bruno";
  const subtitle =
    typeof hero.subtitle === "string"
      ? hero.subtitle
      : locale === "fr"
        ? "Designer \u2022 D\u00E9veloppeur \u2022 Expert en automatisation IA"
        : "Designer \u2022 Developer \u2022 AI Automation Expert";

  const featuredProject = projects.projects[0];
  const tags = Array.isArray(featuredProject?.tags) ? featuredProject?.tags.slice(0, 2) : [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          backgroundColor: "#050505",
          backgroundImage: "radial-gradient(circle at top, rgba(102,255,0,0.35), transparent 60%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 820 }}>
          <span
            style={{
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#66FF00",
            }}
          >
            Nicky Bruno
          </span>
          <h1 style={{ fontSize: 68, lineHeight: 1.05, margin: 0 }}>{headline}</h1>
          <p style={{ fontSize: 28, color: "rgba(255,255,255,0.72)", margin: 0 }}>{subtitle}</p>
        </div>
        {featuredProject ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              marginTop: 40,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#66FF00" }}>
                {locale === "fr" ? "Projet phare" : "Featured project"}
              </span>
              <strong style={{ fontSize: 32, color: "#fff" }}>{featuredProject.title}</strong>
              <span style={{ fontSize: 20 }}>{featuredProject.excerpt}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontSize: 18,
                gap: 6,
              }}
            >
              <span>{featuredProject.year}</span>
              <span>{tags.join(" \u2022 ")}</span>
            </div>
          </div>
        ) : null}
      </div>
    ),
    size,
  );
}
