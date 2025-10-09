import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

import type { Locale } from "./locales";
import { locales } from "./locales";
import { mdxComponents } from "./mdx-components";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function readJsonFile<T extends JsonValue>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function readMdxFile(filePath: string) {
  return fs.readFile(filePath, "utf8");
}

export type HeroContent = Awaited<ReturnType<typeof getHero>>;
export type ServicesContent = Awaited<ReturnType<typeof getServices>>;
export type ProjectsContent = Awaited<ReturnType<typeof getProjects>>;

export const getHero = cache(async (locale: Locale) => {
  return readJsonFile<Record<string, JsonValue>>(path.join(CONTENT_ROOT, locale, "hero.json"));
});

export const getServices = cache(async (locale: Locale) => {
  return readJsonFile<Record<string, JsonValue>>(path.join(CONTENT_ROOT, locale, "services.json"));
});

export type ProjectSummary = {
  title: string;
  slug: string;
  year: number;
  tags: string[];
  excerpt: string;
  category: string;
  theme?: {
    background?: string;
    foreground?: string;
  };
};

export type ProjectsListing = {
  title: string;
  intro?: string;
  filters?: { key: string; label: string }[];
  projects: ProjectSummary[];
};

export const getProjects = cache(async (locale: Locale): Promise<ProjectsListing> => {
  return readJsonFile<ProjectsListing>(path.join(CONTENT_ROOT, locale, "projects.json"));
});

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    keywords?: string[];
    author?: string;
    siteName?: string;
  };
  navigation: { label: string; href: string }[];
  footer: {
    copyright: string;
    socials: { label: string; href: string }[];
  };
  labels?: {
    headerCta?: string;
    heroPill?: string;
    footerConnect?: string;
    projectsHeading?: string;
    home?: {
      highlights?: string;
      moreProjects?: string;
      servicesCta?: string;
      aboutCta?: string;
    };
    sections?: {
      about?: string;
      services?: string;
      contact?: string;
    };
  };
  contact: Record<string, JsonValue>;
};

export const getSiteContent = cache(async (locale: Locale): Promise<SiteContent> => {
  return readJsonFile<SiteContent>(path.join(CONTENT_ROOT, locale, "site.json"));
});

export type MdxFrontmatter = Record<string, JsonValue>;

export const getMdxContent = cache(async (locale: Locale, relativePath: string) => {
  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale "${locale}" requested for MDX content.`);
  }

  const filePath = path.join(CONTENT_ROOT, locale, relativePath);
  const raw = await readMdxFile(filePath);

  const { data, content } = matter(raw);

  const { content: body } = await compileMDX({
    source: content,
    options: {
      scope: data,
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["heading-anchor"],
                ariaHidden: "true",
              },
            },
          ],
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components: mdxComponents,
  });

  return {
    frontmatter: data as MdxFrontmatter,
    content: body,
  };
});

export const getProjectCaseStudy = cache(async (locale: Locale, slug: string) => {
  const file = `projects/${slug}.mdx`;
  return getMdxContent(locale, file);
});

export const getAboutContent = cache(async (locale: Locale) => {
  return getMdxContent(locale, "about.mdx");
});
