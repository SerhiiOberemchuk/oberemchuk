import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/locales";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLocalizedPath, getPageAlternates } from "@/lib/seo";
import { getServicePages } from "@/lib/service-pages";
import { getSiteUrl } from "@/lib/site-config";
import { buildBreadcrumbList } from "@/lib/structured-data";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ServicesPage.metadata",
  });
  const currentLocale = locale as AppLocale;
  const pagePath = getLocalizedPath(currentLocale, "/services");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: getPageAlternates(currentLocale, "/services"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: pagePath,
      type: "website",
      images: [
        {
          url: "/og-services.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-services.png"],
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const currentLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const breadcrumbT = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const services = getServicePages(currentLocale);
  const primarySlugs = ["landing-pages", "corporate-websites", "ecommerce-development"];
  const primary = primarySlugs.flatMap(slug => services.filter(s => s.slug === slug));
  const additional = services.filter(s => !primarySlugs.includes(s.slug));
  const baseUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: t("schema.name"), description: t("schema.description"),
    url: baseUrl + getLocalizedPath(currentLocale, "/services"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...primary, ...additional].map((service, index) => ({
        "@type": "ListItem", position: index + 1, name: service.title,
        url: baseUrl + getLocalizedPath(currentLocale, "/services/" + service.slug),
      })),
    },
  };
  const breadcrumb = buildBreadcrumbList(currentLocale, [
    {name: breadcrumbT("home"), path: ""},
    {name: breadcrumbT("services"), path: "/services"},
  ]);
  return (
    <>
      <JsonLd data={[jsonLd, breadcrumb]} />
      <div className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[hsl(var(--foreground))] px-6 py-10 text-white shadow-[0_34px_100px_rgba(24,31,43,0.2)] md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,101,45,0.2),transparent_65%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{t("hero.pageLabel")}</p>
                <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] md:text-7xl">{t("catalog.title")}</h1>
              </div>
              <div>
                <p className="text-lg leading-8 text-white/75">{t("catalog.description")}</p>
                <Button asChild size="lg" className="mt-8 bg-white text-[hsl(var(--foreground))] hover:bg-white/90">
                  <Link href="/estimate">{t("catalog.estimateCta")}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </Button>
              </div>
            </div>
          </section>
          <section className="mt-16" aria-labelledby="website-services">
            <h2 id="website-services" className="mb-8 text-4xl md:text-5xl">{t("catalog.primary")}</h2>
            <ul className="grid gap-6 lg:grid-cols-3" aria-label={t("listAriaLabel")}>
              {primary.map(service => (
                <li key={service.slug} className="flex">
                  <article className="flex w-full flex-col rounded-[1.75rem] border border-[rgba(24,31,43,0.1)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)]">
                    <Badge variant="secondary" className="w-fit">{service.priceFrom}</Badge>
                    <h3 className="mt-5 text-3xl leading-tight">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.metaDescription}</p>
                    <ul className="my-6 space-y-3 border-t pt-6">
                      {service.deliverables.slice(0,4).map(item => (
                        <li key={item} className="flex gap-3 text-sm leading-7"><CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-auto w-full">
                      <Link href={"/services/" + service.slug} aria-label={t("detailsCta") + ": " + service.title}>
                        {service.shortTitle}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </article>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-16" aria-labelledby="additional-services">
            <h2 id="additional-services" className="text-4xl md:text-5xl">{t("catalog.additional")}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{t("catalog.additionalDescription")}</p>
            <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
              {additional.map(service => (
                <li key={service.slug} className="border-t py-5">
                  <Link href={"/services/" + service.slug} className="group flex items-start justify-between gap-4 hover:text-primary">
                    <span><span className="block text-xl font-semibold">{service.title}</span><span className="mt-2 block text-sm text-muted-foreground">{service.priceFrom}</span></span>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-16 rounded-[2rem] bg-[hsl(var(--foreground))] px-6 py-10 text-white md:p-12">
            <h2 className="text-4xl md:text-5xl">{t("catalog.estimate")}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{t("catalog.estimateDescription")}</p>
            <Button asChild size="lg" className="mt-8 bg-white text-[hsl(var(--foreground))] hover:bg-white/90">
              <Link href="/estimate">{t("catalog.estimateCta")}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
