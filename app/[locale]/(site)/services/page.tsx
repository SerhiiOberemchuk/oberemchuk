import type {Metadata} from "next";
import {connection} from "next/server";
import {Suspense} from "react";
import {ArrowRight, ArrowUpRight, BriefcaseBusiness, CheckCircle, Sparkles} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
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
  const isEnglish = locale === "en";
  const pageLabel = isEnglish ? "Services" : "Послуги";
  const manifestoLabel = isEnglish ? "Offer structure" : "Структура пропозиції";
  const manifesto = isEnglish
    ? "I build websites, commerce experiences and web products that are commercially grounded, technically clear and ready to grow."
    : "Розробляю сайти, e-commerce-рішення і веб-продукти, які зібрані комерційно, технічно чітко і готові до росту.";
  const archiveLabel = isEnglish ? "Service catalogue" : "Каталог послуг";

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
      <div className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.22)]">
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(10,14,24,0.98)_8%,rgba(10,14,24,0.88)_52%,rgba(16,23,36,0.76)_100%)]" />
            <div className="absolute -left-12 top-10 h-72 w-72 rounded-full bg-[rgba(230,90,48,0.18)] blur-3xl" />
            <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-[rgba(108,132,173,0.15)] blur-3xl" />

            <div className="relative z-10 grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-14 lg:py-14">
              <AnimationWrapper animation="slide-right">
                <div className="flex h-full flex-col">
                  <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                    {pageLabel}
                  </p>
                  <div className="max-w-xl min-h-[15rem]">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                      {archiveLabel}
                    </p>
                    <h1 className="mt-4 max-w-[12ch] text-5xl leading-[0.92] text-white md:text-7xl">
                      {pageT("hero.title")}
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                      {pageT("hero.description")}
                    </p>
                  </div>
                </div>
              </AnimationWrapper>

              <AnimationWrapper animation="slide-left">
                <div className="grid gap-6">
                  <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                      {manifestoLabel}
                    </p>
                    <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                      {manifesto}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/44">
                        <BriefcaseBusiness className="h-4 w-4" />
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                          {pageT("includesTitle")}
                        </p>
                      </div>
                      <p className="mt-3 text-lg text-white">{servicePages.length}</p>
                    </div>
                    <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/44">
                        <Sparkles className="h-4 w-4" />
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                          React / Next.js / SEO
                        </p>
                      </div>
                      <p className="mt-3 text-lg text-white">{isEnglish ? "Clear delivery logic" : "Чітка логіка реалізації"}</p>
                    </div>
                  </div>
                </div>
              </AnimationWrapper>
            </div>
          </section>

          <section className="mt-20">
            <AnimationWrapper animation="fade-in">
              <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    {archiveLabel}
                  </p>
                  <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                    {pageT("hero.title")}
                  </h2>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                  {pageT("consultation.description")}
                </p>
              </div>
            </AnimationWrapper>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-label={pageT("listAriaLabel")}>
              {servicePages.map((service) => (
                <li key={service.slug}>
                  <AnimationWrapper animation="slide-up">
                    <article
                      className="group flex h-full flex-col rounded-[1.75rem] border border-[rgba(24,31,43,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]"
                      aria-labelledby={`service-title-${service.slug}`}
                    >
                      <div className="flex min-h-[11.5rem] flex-col">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <Badge variant="secondary">{service.priceFrom}</Badge>
                          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                            {service.shortTitle}
                          </span>
                        </div>
                        <h3 id={`service-title-${service.slug}`} className="mt-5 max-w-[18ch] text-[2rem] leading-[1.02] text-[hsl(var(--foreground))]">
                          {service.title}
                        </h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                          {service.metaDescription}
                        </p>
                      </div>

                      <div className="mt-8 flex flex-1 flex-col gap-6 border-t border-[rgba(24,31,43,0.08)] pt-6">
                        <div className="min-h-[12rem]">
                          <h4 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                            {pageT("includesTitle")}
                          </h4>
                          <ul className="space-y-3">
                            {service.deliverables.slice(0, 4).map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
                                <p className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">{item}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button asChild variant="outline" className="mt-auto w-full bg-transparent">
                          <Link href={`/services/${service.slug}`}>
                            {pageT("detailsCta")}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  </AnimationWrapper>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] px-8 py-10 text-white shadow-[0_34px_100px_rgba(24,31,43,0.2)] md:px-10">
            <AnimationWrapper animation="fade-in">
              <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
                <div>
                  <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/44">
                    {pageLabel}
                  </p>
                  <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                    {pageT("consultation.title")}
                  </h2>
                </div>
                <div>
                  <p className="text-base leading-8 text-white/70">{pageT("consultation.description")}</p>
                  <Button asChild size="lg" className="mt-8 bg-white text-[hsl(var(--foreground))] hover:bg-white/92">
                    <Link href="/#contact">
                      {pageT("consultation.cta")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimationWrapper>
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
