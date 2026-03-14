import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ArrowLeft, ArrowRight, CheckCircle} from "lucide-react";
import {getTranslations} from "next-intl/server";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {getPageAlternates} from "@/lib/seo";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getServicePage, getServicePages, servicePageSlugs} from "@/lib/service-pages";

type ServicePageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return ["uk", "en"].flatMap((locale) =>
    servicePageSlugs.map((slug) => ({
      locale,
      slug
    }))
  );
}

export async function generateMetadata({params}: ServicePageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const service = getServicePage(locale as "uk" | "en", slug);

  if (!service) {
    return {};
  }

  const pagePath = locale === "en" ? `/en/services/${service.slug}` : `/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: getPageAlternates(locale as "uk" | "en", `/services/${service.slug}`),
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: pagePath,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: service.metaTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["/og-image.png"]
    }
  };
}

export default async function ServiceDetailPage({params}: ServicePageProps) {
  const {locale, slug} = await params;
  const pageT = await getTranslations({locale, namespace: "ServiceDetailPage"});
  const service = getServicePage(locale as "uk" | "en", slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getServicePages(locale as "uk" | "en")
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const servicePath = locale === "en" ? `/en/services/${service.slug}` : `/services/${service.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.shortTitle,
    areaServed: [{"@type": "Place", name: "Europe"}],
    provider: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: "https://www.oberemchuk.site"
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: service.priceFrom
      }
    },
    url: `https://www.oberemchuk.site${servicePath}`,
    mainEntityOfPage: `https://www.oberemchuk.site${servicePath}`,
    hasFAQPage: {
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <JsonLd data={jsonLd} />

      <div className="container mx-auto px-4">
        <div className="mb-10">
          <Button asChild variant="ghost" className="pl-0 text-gray-600 hover:text-gray-900">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {pageT("backToServices")}
            </Link>
          </Button>
        </div>

        <header className="mb-16 max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{service.shortTitle}</p>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">{service.heroTitle}</h1>
          <p className="mb-8 text-xl text-gray-600">{service.heroDescription}</p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="rounded-full bg-blue-50 px-5 py-3 font-medium text-blue-700">{service.priceFrom}</div>
            <Button asChild size="lg">
              <Link href="/#contact">{pageT("discussProject")}</Link>
            </Button>
          </div>
        </header>

        <section className="mb-16 grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{pageT("fitForTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {service.fitFor.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{pageT("outcomesTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {service.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{pageT("deliverablesTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {service.deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <div className="max-w-4xl">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">{pageT("searchIntentTitle")}</h2>
            <p className="mb-6 text-gray-600">{pageT("searchIntentDescription")}</p>
            <div className="flex flex-wrap gap-3">
              {service.keywords.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{pageT("faqTitle")}</h2>
          <div className="grid max-w-4xl gap-6">
            {service.faq.map((item) => (
              <Card key={item.question}>
                <CardHeader>
                  <CardTitle className="text-xl">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{pageT("relatedTitle")}</h2>
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {relatedServices.map((item) => (
              <Card key={item.slug} className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-sm text-blue-600">{item.priceFrom}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="mb-6 text-gray-600">{item.metaDescription}</p>
                  <Button asChild variant="outline" className="mt-auto w-full bg-transparent">
                    <Link href={`/services/${item.slug}`}>
                      {pageT("relatedCta")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-8 text-center text-white md:p-10">
          <h2 className="mb-4 text-3xl font-bold">{pageT("estimate.title")}</h2>
          <p className="mx-auto mb-8 max-w-3xl text-slate-300">{pageT("estimate.description")}</p>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            <Link href="/#contact">{pageT("estimate.cta")}</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
