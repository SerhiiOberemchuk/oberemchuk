import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Search, Sparkles } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/locales";
import { getPageAlternates } from "@/lib/seo";
import { getSeoLandings } from "@/lib/seo-landings";
import { getSiteUrl } from "@/lib/site-config";

type SolutionsPageProps = {
  params: Promise<{ locale: string }>;
};

function getSolutionsPageCopy(locale: string) {
  if (locale === "en") {
    return {
      metadataTitle: "SEO landing pages for business growth",
      metadataDescription:
        "Dedicated SEO landing pages for commercial search intent: stronger search visibility, clearer service positioning and conversion-focused structure.",
      metadataKeywords: [
        "SEO landing pages",
        "commercial search intent",
        "website development Europe",
        "Next.js development",
      ],
      ogDescription:
        "Commercial landing pages built for search visibility, stronger messaging and better lead generation.",
      twitterDescription:
        "Dedicated landing pages for commercial search intent.",
      seoLayer: "SEO layer",
      intent: "Commercial search intent",
      heroTitle: "SEO pages built to sell, not just rank",
      heroText:
        "This is the search-intent layer above the core services: pages built to capture commercial demand, clarify the offer and route the right visitors into an estimate.",
      layerDoes: "What this layer does",
      layerDoesText:
        "Turns broad service positioning into dedicated entry points for high-intent traffic.",
      coverage: "Search coverage",
      builtFor: "Built for",
      builtForText: "Visibility + conversion",
      landings: "Landing pages",
      landingTitle: "Dedicated pages for concrete search scenarios",
      landingText:
        "Each page is focused on one commercial intent: website development, Next.js execution or redesign with SEO control. This lets the site rank with more precision and speak in a more relevant tone.",
      seoLanding: "SEO landing",
      outcome: "Business outcome",
      openPage: "Open page",
      nextStep: "Next step",
      nextTitle: "Need a page for a specific search intent?",
      nextText:
        "If you already know the service direction or market, I can package a dedicated landing page around it instead of forcing everything into one generic services page.",
      estimate: "Get an estimate",
      jsonLdName: "SEO landing pages",
      jsonLdDescription:
        "Dedicated landing pages for commercial search intent and business growth.",
      imageAlt: "SEO landing pages",
    };
  }

  if (locale === "it") {
    return {
      metadataTitle: "Landing SEO per la crescita del business",
      metadataDescription:
        "Landing SEO dedicate all'intento commerciale: visibilita piu forte, posizionamento piu chiaro dei servizi e struttura orientata alla conversione.",
      metadataKeywords: [
        "landing SEO",
        "intento di ricerca commerciale",
        "sviluppo siti Europa",
        "sviluppo Next.js",
      ],
      ogDescription:
        "Landing commerciali costruite per visibilita organica, messaggio piu forte e lead generation migliore.",
      twitterDescription:
        "Landing dedicate all'intento di ricerca commerciale.",
      seoLayer: "Layer SEO",
      intent: "Intento di ricerca commerciale",
      heroTitle: "Pagine SEO costruite per vendere, non solo per posizionarsi",
      heroText:
        "Questo e il layer di search intent sopra i servizi principali: pagine costruite per intercettare domanda commerciale, chiarire l'offerta e portare i visitatori giusti verso una stima.",
      layerDoes: "Cosa fa questo layer",
      layerDoesText:
        "Trasforma il posizionamento generale dei servizi in punti di ingresso dedicati per traffico ad alto intento.",
      coverage: "Copertura di ricerca",
      builtFor: "Pensato per",
      builtForText: "Visibilita + conversione",
      landings: "Landing page",
      landingTitle: "Pagine dedicate per scenari di ricerca concreti",
      landingText:
        "Ogni pagina e focalizzata su un solo intento commerciale: sviluppo sito, implementazione Next.js o redesign con controllo SEO. Questo rende la visibilita piu precisa e il messaggio piu pertinente.",
      seoLanding: "Landing SEO",
      outcome: "Risultato business",
      openPage: "Apri la pagina",
      nextStep: "Prossimo passo",
      nextTitle: "Ti serve una pagina per un intento di ricerca specifico?",
      nextText:
        "Se conosci gia la direzione del servizio o il mercato, posso costruire una landing dedicata attorno a quell'intento invece di comprimere tutto in un'unica pagina servizi generica.",
      estimate: "Richiedi una stima",
      jsonLdName: "Landing SEO",
      jsonLdDescription:
        "Landing dedicate all'intento commerciale e alla crescita del business.",
      imageAlt: "Landing SEO",
    };
  }

  return {
    metadataTitle: "SEO-сторінки під комерційні запити",
    metadataDescription:
      "Окремі SEO-сторінки під комерційні пошукові наміри: сильніша видимість, чіткіше позиціонування послуг і структура під конверсію.",
    metadataKeywords: [
      "SEO-сторінки",
      "комерційні запити",
      "розробка сайту",
      "розробка на Next.js",
    ],
    ogDescription:
      "Комерційні SEO-сторінки під видимість у пошуку, сильнішу подачу і кращу генерацію заявок.",
    twitterDescription:
      "Окремі посадкові сторінки під комерційний пошуковий намір.",
    seoLayer: "SEO-шар",
    intent: "Комерційний пошуковий намір",
    heroTitle: "SEO-сторінки, які мають продавати, а не просто ранжуватися",
    heroText:
      "Це пошуковий шар поверх основних послуг: сторінки, які збирають комерційний попит, пояснюють оффер і ведуть правильного відвідувача до оцінки.",
    layerDoes: "Що робить цей шар",
    layerDoesText:
      "Перетворює загальне позиціонування послуг на окремі точки входу для трафіку з високим наміром.",
    coverage: "Пошукове покриття",
    builtFor: "Фокус",
    builtForText: "Видимість + конверсія",
    landings: "Посадкові сторінки",
    landingTitle: "Окремі сторінки під конкретні пошукові сценарії",
    landingText:
      "Кожна сторінка зібрана під один комерційний намір: розробка сайту, реалізація на Next.js або редизайн із контролем SEO. Це дає точнішу видимість і релевантнішу подачу.",
    seoLanding: "SEO-сторінка",
    outcome: "Бізнес-результат",
    openPage: "Відкрити сторінку",
    nextStep: "Наступний крок",
    nextTitle: "Потрібна сторінка під конкретний пошуковий намір?",
    nextText:
      "Якщо ви вже розумієте напрям послуги або ринок, я можу зібрати окрему сторінку під цей намір замість того, щоб запихати все в одну загальну сторінку послуг.",
    estimate: "Отримати оцінку",
    jsonLdName: "SEO-сторінки",
    jsonLdDescription:
      "Окремі посадкові сторінки під комерційні запити і ріст бізнесу.",
    imageAlt: "SEO-сторінки",
  };
}

export async function generateMetadata({
  params,
}: SolutionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = getSolutionsPageCopy(locale);

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    keywords: copy.metadataKeywords,
    alternates: getPageAlternates(locale as AppLocale, "/solutions"),
    openGraph: {
      title: copy.metadataTitle,
      description: copy.ogDescription,
      url: locale === "uk" ? "/solutions" : `/${locale}/solutions`,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: copy.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadataTitle,
      description: copy.twitterDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pages = getSeoLandings(locale as AppLocale);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${locale === "uk" ? "/solutions" : `/${locale}/solutions`}`;
  const copy = getSolutionsPageCopy(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.jsonLdName,
    description: copy.jsonLdDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${pageUrl}/${page.slug}`,
        name: page.title,
      })),
    },
  };

  return (
    <div className="px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.22)]">
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(10,14,24,0.98)_8%,rgba(10,14,24,0.88)_52%,rgba(16,23,36,0.76)_100%)]" />
          <div className="absolute -left-12 top-10 h-72 w-72 rounded-full bg-[rgba(230,90,48,0.18)] blur-3xl" />
          <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-[rgba(108,132,173,0.15)] blur-3xl" />

          <div className="relative z-10 grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-14 lg:py-14">
            <AnimationWrapper animation="slide-right">
              <div className="flex h-full flex-col">
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                  {copy.seoLayer}
                </p>
                <div className="max-w-xl min-h-[15rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {copy.intent}
                  </p>
                  <h1 className="mt-4 max-w-[13ch] text-5xl leading-[0.92] text-white md:text-7xl">
                    {copy.heroTitle}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                    {copy.heroText}
                  </p>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-left">
              <div className="grid gap-6">
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                    {copy.layerDoes}
                  </p>
                  <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                    {copy.layerDoesText}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <Search className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                        {copy.coverage}
                      </p>
                    </div>
                    <p className="mt-3 text-lg text-white">{pages.length}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <Sparkles className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                        {copy.builtFor}
                      </p>
                    </div>
                    <p className="mt-3 text-lg text-white">
                      {copy.builtForText}
                    </p>
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
                  {copy.landings}
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {copy.landingTitle}
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                {copy.landingText}
              </p>
            </div>
          </AnimationWrapper>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <li key={page.slug}>
                <AnimationWrapper animation="slide-up">
                  <article className="group flex h-full flex-col rounded-[1.75rem] border border-[rgba(24,31,43,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]">
                    <div className="flex min-h-[12rem] flex-col">
                      <Badge variant="secondary">{copy.seoLanding}</Badge>
                      <h3 className="mt-5 max-w-[18ch] text-[2rem] leading-[1.02] text-[hsl(var(--foreground))]">
                        {page.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                        {page.metaDescription}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-1 flex-col gap-6 border-t border-[rgba(24,31,43,0.08)] pt-6">
                      <div>
                        <h4 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                          {copy.outcome}
                        </h4>
                        <ul className="space-y-3">
                          {page.benefits.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="text-sm leading-7 text-[hsl(var(--muted-foreground))]"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        className="mt-auto w-full bg-transparent"
                      >
                        <Link href={`/solutions/${page.slug}`}>
                          {copy.openPage}
                          <ArrowRight className="button-arrow-right h-4 w-4" />
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
                  {copy.nextStep}
                </p>
                <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                  {copy.nextTitle}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-white/70">
                  {copy.nextText}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 bg-white text-[hsl(var(--foreground))] hover:bg-white/92"
                >
                  <Link href="/#contact">
                    {copy.estimate}
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
