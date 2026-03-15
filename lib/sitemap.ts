import { getProjects } from "@/lib/projects-server";
import { getLocalizedPath } from "@/lib/seo";
import { servicePageSlugs } from "@/lib/service-pages";
import { getSiteUrl } from "@/lib/site-config";

export type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "yearly" | "monthly" | "weekly" | "daily";
  priority: string;
};

export function toLastMod(value?: string): string {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const baseUrl = getSiteUrl();
  const staticPagesLastMod = toLastMod(process.env.SITE_LASTMOD || "2026-03-14");
  const locales = ["uk", "en"] as const;
  const staticPaths = [
    { path: "", changefreq: "weekly" as const, priority: "1.0" },
    { path: "/portfolio", changefreq: "weekly" as const, priority: "0.9" },
    { path: "/services", changefreq: "weekly" as const, priority: "0.9" },
    ...servicePageSlugs.map((slug) => ({
      path: `/services/${slug}`,
      changefreq: "monthly" as const,
      priority: "0.8",
    })),
    { path: "/privacy-policy", changefreq: "yearly" as const, priority: "0.3" },
    { path: "/cookies", changefreq: "yearly" as const, priority: "0.3" },
    { path: "/terms-of-service", changefreq: "yearly" as const, priority: "0.3" },
  ];

  const staticPages: SitemapEntry[] = locales.flatMap((locale) =>
    staticPaths.map((entry) => ({
      loc: `${baseUrl}${getLocalizedPath(locale, entry.path)}`,
      lastmod: staticPagesLastMod,
      changefreq: entry.changefreq,
      priority: entry.priority,
    })),
  );

  const projects = await getProjects();
  const projectPages: SitemapEntry[] = locales.flatMap((locale) =>
    projects.map((project) => ({
      loc: `${baseUrl}${getLocalizedPath(locale, `/portfolio/${project.slug}`)}`,
      lastmod: toLastMod(project.updated_at),
      changefreq: "monthly",
      priority: "0.7",
    })),
  );

  return [...staticPages, ...projectPages];
}
