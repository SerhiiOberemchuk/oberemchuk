import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPageAlternates } from "@/lib/seo";
import {
  getServicePage,
  getServicePages,
  servicePageSlugs,
} from "@/lib/service-pages";

const SITE_URL = process.env.SITE_URL || "https://www.oberemchuk.online";

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return ["uk", "en"].flatMap((locale) =>
    servicePageSlugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServicePage(locale as "uk" | "en", slug);

  if (!service) {
    return {};
  }

  const pagePath =
    locale === "en"
      ? `/en/services/${service.slug}`
      : `/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: getPageAlternates(
      locale as "uk" | "en",
      `/services/${service.slug}`,
    ),
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}${pagePath}`,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: service.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const pageT = await getTranslations({
    locale,
    namespace: "ServiceDetailPage",
  });
  const service = getServicePage(locale as "uk" | "en", slug);

  if (!service) {
    notFound();
  }

  const isEnglish = locale === "en";
  const pagePath = isEnglish
    ? `/en/services/${service.slug}`
    : `/services/${service.slug}`;
  const relatedServices = getServicePages(locale as "uk" | "en")
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const pageLabel = isEnglish ? "Service detail" : "Деталі послуги";
  const valueLabel = isEnglish ? "Business value" : "Цінність для бізнесу";
  const offerLabel = isEnglish ? "Starting point" : "Стартова вартість";
  const keywordsLabel = isEnglish ? "Search layer" : "Пошуковий шар";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.shortTitle,
    provider: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: service.priceFrom,
      },
    },
    url: `${SITE_URL}${pagePath}`,
    mainEntityOfPage: `${SITE_URL}${pagePath}`,
    hasFAQPage: {
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  };

  return (
    <div className="px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,31,43,0.08)] bg-white/88 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] shadow-[0_14px_40px_rgba(24,31,43,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(24,31,43,0.16)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {pageT("backToServices")}
            </Link>
            <Button asChild size="lg" className="hidden sm:inline-flex">
              <Link href="/#contact">
                {pageT("discussProject")}
                <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationWrapper>

        <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.22)]">
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(10,14,24,0.98)_8%,rgba(10,14,24,0.88)_52%,rgba(16,23,36,0.76)_100%)]" />
          <div className="absolute -left-12 top-12 h-72 w-72 rounded-full bg-[rgba(230,90,48,0.18)] blur-3xl" />
          <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-[rgba(108,132,173,0.15)] blur-3xl" />

          <div className="relative z-10 grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:px-14 lg:py-14">
            <AnimationWrapper animation="slide-right">
              <div className="flex h-full flex-col">
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                  {pageLabel}
                </p>
                <div className="max-w-xl min-h-[16rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {service.shortTitle}
                  </p>
                  <h1 className="mt-4 max-w-[13ch] text-5xl leading-[0.92] text-white md:text-7xl">
                    {service.heroTitle}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                    {service.heroDescription}
                  </p>
                </div>

                <div className="mt-10 max-w-[13.5rem]">
                  <div className="rounded-[1.15rem] border border-white/10 bg-white/6 px-4 py-3.5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <BriefcaseBusiness className="h-4 w-4" />
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em]">
                        {offerLabel}
                      </p>
                    </div>
                    <p className="mt-2.5 text-[1.05rem] text-white">
                      {service.priceFrom}
                    </p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-left">
              <div className="grid gap-6">
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                    {valueLabel}
                  </p>
                  <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                    {pageT("valueDescription")}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                      {pageT("fitForTitle")}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {service.fitFor.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-7 text-white/74"
                        >
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                      {pageT("outcomesTitle")}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {service.outcomes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-7 text-white/74"
                        >
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {pageT("deliveryLabel")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {pageT("deliverablesTitle")}
              </h2>
              <ul className="mt-8 grid gap-4">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.25rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] px-5 py-5 text-base leading-7 text-[hsl(var(--foreground))] shadow-[0_10px_30px_rgba(24,31,43,0.04)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={100}>
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7fafc)] p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {pageT("resultLabel")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {pageT("outcomesTitle")}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
                {pageT("outcomesDescription")}
              </p>
              <ul className="mt-8 grid gap-4">
                {service.outcomes.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.25rem] border border-[rgba(24,31,43,0.08)] bg-white px-5 py-5 text-base leading-7 text-[hsl(var(--foreground))] shadow-[0_10px_30px_rgba(24,31,43,0.04)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimationWrapper>
        </section>

        <section className="mt-8">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7fafc)] p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {keywordsLabel}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {pageT("searchIntentTitle")}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
                {pageT("searchIntentDescription")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {service.keywords.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="rounded-full border-[rgba(24,31,43,0.08)] px-4 py-2 text-sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </section>

        <section className="mt-20">
          <AnimationWrapper animation="slide-up">
            <div className="grid gap-6 rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)] lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                  FAQ
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {pageT("faqTitle")}
                </h2>
              </div>
              <div className="grid gap-4">
                {service.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-[1.35rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] px-5 py-5 shadow-[0_10px_30px_rgba(24,31,43,0.04)]"
                  >
                    <h3 className="text-xl leading-tight text-[hsl(var(--foreground))]">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-[hsl(var(--muted-foreground))]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </section>

        <section className="mt-20">
          <AnimationWrapper animation="slide-up">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                  {pageLabel}
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {pageT("relatedTitle")}
                </h2>
              </div>

              <div className="grid gap-4">
                {relatedServices.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className="group rounded-[1.5rem] border border-[rgba(24,31,43,0.08)] bg-white px-6 py-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                          {item.priceFrom}
                        </p>
                        <h3 className="mt-3 text-[1.8rem] leading-tight text-[hsl(var(--foreground))]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                          {item.metaDescription}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(24,31,43,0.08)] bg-[rgba(24,31,43,0.03)] text-[hsl(var(--foreground))] transition-all duration-300 group-hover:border-[rgba(24,31,43,0.14)] group-hover:bg-[hsl(var(--foreground))] group-hover:text-white">
                        <ArrowRight className="button-arrow-right h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </section>

        <section className="mt-20 rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] px-8 py-10 text-white shadow-[0_34px_100px_rgba(24,31,43,0.2)] md:px-10">
          <AnimationWrapper animation="fade-in">
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
              <div>
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/44">
                  {offerLabel}
                </p>
                <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                  {pageT("estimate.title")}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-white/70">
                  {pageT("estimate.description")}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 bg-white text-[hsl(var(--foreground))] hover:bg-white/92"
                >
                  <Link href="/#contact">
                    {pageT("estimate.cta")}
                    <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimationWrapper>
        </section>
      </div>
    </div>
  );
}
