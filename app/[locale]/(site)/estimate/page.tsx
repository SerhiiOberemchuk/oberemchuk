import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {BarChart3, Clock3, Euro, FileText} from "lucide-react";
import JsonLd from "@/components/json-ld";
import ProjectEstimateForm from "@/components/project-estimate-form";
import {isAppLocale, resolveAppLocale} from "@/i18n/locales";
import {getLocalizedPath, getPageAlternates} from "@/lib/seo";
import {getSiteUrl} from "@/lib/site-config";

type EstimatePageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params,
}: EstimatePageProps): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = resolveAppLocale(locale);
  const t = await getTranslations({
    locale: currentLocale,
    namespace: "EstimatePage.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: getPageAlternates(currentLocale, "/estimate"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: getLocalizedPath(currentLocale, "/estimate"),
      images: [
        {
          url: "/og-estimate.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-estimate.png"],
    },
  };
}

export default async function EstimatePage({params}: EstimatePageProps) {
  const {locale} = await params;
  const currentLocale = resolveAppLocale(locale);

  if (isAppLocale(locale)) {
    setRequestLocale(locale);
  }

  const t = await getTranslations({locale: currentLocale, namespace: "EstimatePage"});
  const baseUrl = getSiteUrl();
  const pagePath = getLocalizedPath(currentLocale, "/estimate");
  const useCases = t.raw("seo.useCases.items") as Array<{
    title: string;
    description: string;
  }>;
  const methodItems = t.raw("seo.method.items") as Array<{
    title: string;
    description: string;
  }>;
  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;
  const stats = [
    {
      icon: Euro,
      label: t("stats.cost.label"),
      value: t("stats.cost.value"),
    },
    {
      icon: Clock3,
      label: t("stats.timeline.label"),
      value: t("stats.timeline.value"),
    },
    {
      icon: FileText,
      label: t("stats.scope.label"),
      value: t("stats.scope.value"),
    },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: t("schema.name"),
      description: t("schema.description"),
      url: `${baseUrl}${pagePath}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      provider: {
        "@type": "Person",
        name: "Serhii Oberemchuk",
        url: baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t("schema.home"),
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t("schema.name"),
          item: `${baseUrl}${pagePath}`,
        },
      ],
    },
  ];

  return (
    <div className="px-4 pb-24 pt-16 md:px-6">
      <JsonLd data={{"@graph": jsonLd}} />
      <section className="relative -mx-4 overflow-hidden px-4 pb-14 pt-16 md:-mx-6 md:px-6 md:pt-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_12%_10%,rgba(214,101,45,0.16),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(77,98,136,0.16),transparent_20%),linear-gradient(180deg,rgba(252,254,255,0.995),rgba(238,243,248,0))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="caption">{t("hero.eyebrow")}</p>
            <h1 className="mt-5 max-w-4xl text-[3.5rem] leading-[0.92] text-[hsl(var(--foreground))] md:text-[5.4rem]">
              {t("hero.title")}
            </h1>
          </div>
          <div className="grid gap-6">
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              {t("hero.description")}
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-[rgba(24,31,43,0.1)] bg-white/78 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                  >
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))]" aria-hidden="true" />
                    <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[hsl(var(--foreground))]">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="overflow-hidden rounded-[28px] border border-[rgba(24,31,43,0.08)] bg-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <Image
                src="/estimate-calculator-preview.png"
                alt={t("hero.previewAlt")}
                width={1440}
                height={980}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl" aria-labelledby="estimate-form-title">
        <div className="mb-10 grid gap-6 border-t border-[rgba(24,31,43,0.12)] pt-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(24,31,43,0.1)] bg-white text-[hsl(var(--foreground))] shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2
              id="estimate-form-title"
              className="mt-5 text-4xl text-[hsl(var(--foreground))] md:text-5xl"
            >
              {t("formTitle")}
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
            {t("formDescription")}
          </p>
        </div>

        <ProjectEstimateForm />
      </section>

      <section className="mx-auto mt-24 max-w-7xl" aria-labelledby="estimate-seo-title">
        <div className="grid gap-10 border-t border-[rgba(24,31,43,0.12)] pt-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="caption">{t("seo.eyebrow")}</p>
            <h2
              id="estimate-seo-title"
              className="mt-5 max-w-[11ch] text-4xl leading-[0.98] text-[hsl(var(--foreground))] md:text-5xl"
            >
              {t("seo.title")}
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-[hsl(var(--muted-foreground))]">
            <p>{t("seo.descriptionA")}</p>
            <p>{t("seo.descriptionB")}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-[rgba(24,31,43,0.08)] bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)]"
            >
              <h3 className="font-sans text-xl font-semibold leading-tight tracking-normal text-[hsl(var(--foreground))]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-8 rounded-[28px] border border-[rgba(24,31,43,0.08)] bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-8 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <p className="caption">{t("seo.method.eyebrow")}</p>
          <h2 className="mt-5 text-4xl leading-[0.98] text-[hsl(var(--foreground))] md:text-5xl">
            {t("seo.method.title")}
          </h2>
        </div>
        <div className="grid gap-4">
          {methodItems.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-4 border-b border-[rgba(24,31,43,0.08)] pb-4 last:border-b-0 last:pb-0 md:grid-cols-[4rem_1fr]"
            >
              <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-normal text-[hsl(var(--foreground))]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl" aria-labelledby="estimate-faq-title">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="caption">{t("faq.eyebrow")}</p>
            <h2
              id="estimate-faq-title"
              className="mt-5 text-4xl leading-[0.98] text-[hsl(var(--foreground))] md:text-5xl"
            >
              {t("faq.title")}
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
            {t("faq.description")}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-[24px] border border-[rgba(24,31,43,0.08)] bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)]"
            >
              <h3 className="font-sans text-lg font-semibold leading-tight tracking-normal text-[hsl(var(--foreground))]">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
