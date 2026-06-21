import { getLocalizedPath, type Locale } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-config";

export type BreadcrumbCrumb = {
  name: string;
  /** Unlocalized path, e.g. "" for home, "/blog", "/blog/my-post". */
  path: string;
};

/**
 * Builds a schema.org BreadcrumbList node with absolute, locale-aware URLs.
 * Drop the result into a page's JSON-LD array alongside the primary entity.
 */
export function buildBreadcrumbList(locale: Locale, crumbs: BreadcrumbCrumb[]) {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${getLocalizedPath(locale, crumb.path)}`,
    })),
  };
}
