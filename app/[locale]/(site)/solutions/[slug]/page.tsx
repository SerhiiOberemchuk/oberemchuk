import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Search } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { appLocales, type AppLocale } from "@/i18n/locales";
import { getBlogPosts } from "@/lib/blog-posts";
import { getPageAlternates } from "@/lib/seo";
import {
  getSeoLanding,
  getSeoLandings,
  seoLandingSlugs,
} from "@/lib/seo-landings";
import { getServicePages } from "@/lib/service-pages";
import { getSiteUrl } from "@/lib/site-config";

type SolutionDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return appLocales.flatMap((locale) =>
    seoLandingSlugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: SolutionDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getSeoLanding(locale as AppLocale, slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.searchIntent.split(",").map((item) => item.trim()),
    alternates: getPageAlternates(locale as AppLocale, `/solutions/${page.slug}`),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url:
        locale === "uk"
          ? `/solutions/${page.slug}`
          : `/${locale}/solutions/${page.slug}`,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: page.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "SolutionDetailPage" });
  const page = getSeoLanding(locale as AppLocale, slug);

  if (!page) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const pagePath =
    locale === "uk"
      ? `/solutions/${page.slug}`
      : `/${locale}/solutions/${page.slug}`;
  const services = getServicePages(locale as AppLocale).filter((service) =>
    page.relatedServiceSlugs.includes(service.slug),
  );
  const posts = getBlogPosts(locale as AppLocale).filter((post) =>
    page.relatedPostSlugs.includes(post.slug),
  );
  const relatedPages = getSeoLandings(locale as AppLocale)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    provider: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: siteUrl,
    },
    url: `${siteUrl}${pagePath}`,
    areaServed: "Europe",
    mainEntityOfPage: `${siteUrl}${pagePath}`,
    hasFAQPage: {
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
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
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,31,43,0.08)] bg-white/88 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] shadow-[0_14px_40px_rgba(24,31,43,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(24,31,43,0.16)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
            <Button asChild size="lg" className="hidden sm:inline-flex">
              <Link href="/#contact">
                {t("estimate")}
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
                  {t("seoLanding")}
                </p>
                <div className="max-w-xl min-h-[16rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {t("intent")}
                  </p>
                  <h1 className="mt-4 max-w-[13ch] text-5xl leading-[0.92] text-white md:text-7xl">
                    {page.heroTitle}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                    {page.heroDescription}
                  </p>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-left">
              <div className="grid gap-6">
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                    {t("intentCovered")}
                  </p>
                  <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                    {page.searchIntent}
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white/44">
                    <Search className="h-4 w-4" />
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                      {t("offerSummary")}
                    </p>
                  </div>
                  <p className="mt-4 text-base leading-8 text-white/74">
                    {page.offerSummary}
                  </p>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("fit")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {t("fitTitle")}
              </h2>
              <ul className="mt-8 grid gap-4">
                {page.idealFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-7 text-[hsl(var(--foreground))]"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={100}>
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7fafc)] p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("outcome")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {t("outcomeTitle")}
              </h2>
              <ul className="mt-8 grid gap-4">
                {page.benefits.map((item) => (
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
                {t("scope")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {t("scopeTitle")}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {page.deliverables.map((item) => (
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

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("faqEyebrow")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {t("faqTitle")}
              </h2>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up">
            <div className="grid gap-4">
              {page.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[1.35rem] border border-[rgba(24,31,43,0.08)] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(24,31,43,0.04)]"
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
          </AnimationWrapper>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("relatedServices")}
              </p>
              <div className="grid gap-4">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group rounded-[1.4rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)]"
                  >
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                      {service.priceFrom}
                    </p>
                    <h3 className="mt-3 text-2xl leading-tight text-[hsl(var(--foreground))]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                      {service.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={100}>
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("relatedArticles")}
              </p>
              <div className="grid gap-4">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-[1.4rem] border border-[rgba(24,31,43,0.08)] bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)]"
                  >
                    <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                      <span>{post.category}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="mt-3 text-2xl leading-tight text-[hsl(var(--foreground))]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                      {post.excerpt}
                    </p>
                  </Link>
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
                  {t("otherPoints")}
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {t("otherTitle")}
                </h2>
              </div>

              <div className="grid gap-4">
                {relatedPages.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/solutions/${item.slug}`}
                    className="group rounded-[1.5rem] border border-[rgba(24,31,43,0.08)] bg-white px-6 py-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <Badge variant="secondary">{t("seoPage")}</Badge>
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
      </div>
    </div>
  );
}
