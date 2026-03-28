import type {Metadata} from "next";
import {connection} from "next/server";
import {Suspense} from "react";
import {ArrowRight, CheckCircle} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getPageAlternates} from "@/lib/seo";
import {getServicePages} from "@/lib/service-pages";

type ServicesPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: ServicesPageProps): Promise<Metadata> {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "ServicesPage.metadata"});
  const pagePath = locale === "en" ? "/en/services" : "/services";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: getPageAlternates(locale as "uk" | "en", "/services"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: pagePath,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt")
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.png"]
    }
  };
}

async function ServicesPageContent({params}: ServicesPageProps) {
  await connection();
  const {locale} = await params;
  setRequestLocale(locale);
  const pageT = await getTranslations({locale, namespace: "ServicesPage"});
  const servicePages = getServicePages(locale as "uk" | "en");
  const pagePath = locale === "en" ? "/en/services" : "/services";
  const baseUrl = "https://www.oberemchuk.site";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageT("schema.name"),
    description: pageT("schema.description"),
    url: `${baseUrl}${pagePath}`,
    mainEntity: {
      "@type": "ItemList",
      name: pageT("schema.itemListName"),
      itemListElement: servicePages.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}${locale === "en" ? `/en/services/${service.slug}` : `/services/${service.slug}`}`,
        name: service.title
      }))
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <header className="mx-auto mb-16 max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{pageT("hero.title")}</h1>
            <p className="text-xl text-gray-600">{pageT("hero.description")}</p>
          </header>

          <ul className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2" aria-label={pageT("listAriaLabel")}>
            {servicePages.map((service) => (
              <li key={service.slug}>
                <Card className="flex h-full flex-col border-slate-200 transition-shadow hover:shadow-lg">
                  <article className="flex h-full flex-col" aria-labelledby={`service-title-${service.slug}`}>
                    <CardHeader>
                      <CardTitle id={`service-title-${service.slug}`} className="text-2xl">{service.title}</CardTitle>
                      <p className="text-sm font-medium text-blue-600">{service.priceFrom}</p>
                      <p className="text-gray-600">{service.metaDescription}</p>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-6">
                      <div>
                        <h3 className="mb-3 font-semibold text-gray-900">{pageT("includesTitle")}</h3>
                        <ul className="space-y-2">
                          {service.deliverables.slice(0, 4).map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                              <p className="text-sm text-gray-600">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="mt-auto w-full">
                        <Link href={`/services/${service.slug}`}>
                          {pageT("detailsCta")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </article>
                </Card>
              </li>
            ))}
          </ul>

          <section className="rounded-3xl bg-slate-50 p-8 text-center md:p-10">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">{pageT("consultation.title")}</h2>
            <p className="mx-auto mb-8 max-w-3xl text-gray-600">{pageT("consultation.description")}</p>
            <Button asChild size="lg">
              <Link href="/#contact">{pageT("consultation.cta")}</Link>
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}

export default function ServicesPage(props: ServicesPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white py-16" />}>
      <ServicesPageContent {...props} />
    </Suspense>
  );
}
