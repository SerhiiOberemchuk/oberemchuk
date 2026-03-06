import { getProjects } from "@/lib/projects-server";

export const revalidate = 86400;

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "yearly" | "monthly" | "weekly" | "daily";
  priority: string;
};

function toLastMod(value?: string): string {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderUrl(entry: SitemapEntry): string {
  return [
    "  <url>",
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export async function GET() {
  const baseUrl = (
    process.env.SITE_URL || "https://www.oberemchuk.site"
  ).replace(/\/+$/, "");

  const staticPages: SitemapEntry[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: toLastMod(),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/portfolio`,
      lastmod: toLastMod(),
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: toLastMod(),
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: toLastMod(),
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${baseUrl}/cookies`,
      lastmod: toLastMod(),
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${baseUrl}/terms-of-service`,
      lastmod: toLastMod(),
      changefreq: "yearly",
      priority: "0.3",
    },
  ];

  const projects = await getProjects();
  const projectPages: SitemapEntry[] = projects.map((project) => ({
    loc: `${baseUrl}/portfolio/${project.slug}`,
    lastmod: toLastMod(project.updated_at),
    changefreq: "monthly",
    priority: "0.7",
  }));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...staticPages, ...projectPages].map(renderUrl),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
