import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-server";
import { blogPostSlugs } from "@/lib/blog-posts";
import { getLocalizedPath } from "@/lib/seo";
import { seoLandingSlugs } from "@/lib/seo-landings";
import { servicePageSlugs } from "@/lib/service-pages";
import { getSiteUrl } from "@/lib/site-config";
import { appLocales, defaultLocale } from "@/i18n/locales";

type SitemapPathEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export function toLastMod(value?: string): string {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const staticPagesLastMod = toLastMod(process.env.SITE_LASTMOD || "2026-03-14");
  const staticPaths: SitemapPathEntry[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "weekly", priority: 0.85 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
    ...servicePageSlugs.map((slug) => ({
      path: `/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...seoLandingSlugs.map((slug) => ({
      path: `/solutions/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...blogPostSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = appLocales.flatMap((locale) =>
    staticPaths.map((entry) => ({
      url: `${baseUrl}${getLocalizedPath(locale, entry.path)}`,
      lastModified: staticPagesLastMod,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: getSitemapLanguageAlternates(baseUrl, entry.path),
      },
    })),
  );

  const projects = await getProjects();
  const projectPages: MetadataRoute.Sitemap = appLocales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${baseUrl}${getLocalizedPath(locale, `/portfolio/${project.slug}`)}`,
      lastModified: toLastMod(project.updated_at),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: getSitemapLanguageAlternates(baseUrl, `/portfolio/${project.slug}`),
      },
    })),
  );

  return [...staticPages, ...projectPages];
}

function getSitemapLanguageAlternates(
  baseUrl: string,
  path: string,
): NonNullable<NonNullable<MetadataRoute.Sitemap[number]["alternates"]>["languages"]> {
  return [
    ...appLocales.map((locale) => [
      locale,
      `${baseUrl}${getLocalizedPath(locale, path)}`,
    ]),
    ["x-default", `${baseUrl}${getLocalizedPath(defaultLocale, path)}`],
  ].reduce<Record<string, string>>((alternates, [locale, href]) => {
    alternates[locale] = href;
    return alternates;
  }, {});
}
