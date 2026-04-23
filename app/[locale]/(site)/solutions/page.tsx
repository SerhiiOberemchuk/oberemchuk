import type {Metadata} from "next";
import {ArrowRight, ArrowUpRight, Search, Sparkles} from "lucide-react";
import {setRequestLocale} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {getPageAlternates} from "@/lib/seo";
import {getSeoLandings} from "@/lib/seo-landings";
import {getSiteUrl} from "@/lib/site-config";

type SolutionsPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: SolutionsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "SEO landing pages for business growth" : "SEO-сторінки під комерційні запити",
    description: isEnglish
      ? "Dedicated SEO landing pages for commercial search intent: stronger search visibility, clearer service positioning and conversion-focused structure."
      : "Окремі SEO-сторінки під комерційні пошукові наміри: сильніша видимість, чіткіше позиціонування послуг і структура під конверсію.",
    keywords: isEnglish
      ? ["SEO landing pages", "commercial search intent", "website development Europe", "Next.js development"]
      : ["SEO-сторінки", "комерційні запити", "розробка сайту", "розробка на Next.js"],
    alternates: getPageAlternates(locale as "uk" | "en", "/solutions"),
    openGraph: {
      title: isEnglish ? "SEO landing pages for business growth" : "SEO-сторінки під комерційні запити",
      description: isEnglish
        ? "Commercial landing pages built for search visibility, stronger messaging and better lead generation."
        : "Комерційні SEO-сторінки під видимість у пошуку, сильнішу подачу і кращу генерацію заявок.",
      url: isEnglish ? "/en/solutions" : "/solutions",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isEnglish ? "SEO landing pages" : "SEO-сторінки"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish ? "SEO landing pages for business growth" : "SEO-сторінки під комерційні запити",
      description: isEnglish
        ? "Dedicated landing pages for commercial search intent."
        : "Окремі посадкові сторінки під комерційний пошуковий намір.",
      images: ["/og-image.png"]
    }
  };
}

export default async function SolutionsPage({params}: SolutionsPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const isEnglish = locale === "en";
  const pages = getSeoLandings(locale as "uk" | "en");
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${isEnglish ? "/en/solutions" : "/solutions"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEnglish ? "SEO landing pages" : "SEO-сторінки",
    description: isEnglish
      ? "Dedicated landing pages for commercial search intent and business growth."
      : "Окремі посадкові сторінки під комерційні запити і ріст бізнесу.",
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${pageUrl}/${page.slug}`,
        name: page.title
      }))
    }
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
                  {isEnglish ? "SEO layer" : "SEO-шар"}
                </p>
                <div className="max-w-xl min-h-[15rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {isEnglish ? "Commercial search intent" : "Комерційний пошуковий намір"}
                  </p>
                  <h1 className="mt-4 max-w-[13ch] text-5xl leading-[0.92] text-white md:text-7xl">
                    {isEnglish ? "SEO pages built to sell, not just rank" : "SEO-сторінки, які мають продавати, а не просто ранжуватись"}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                    {isEnglish
                      ? "This is the search-intent layer above the core services: pages built to capture commercial demand, clarify the offer and route the right visitors into an estimate."
                      : "Це пошуковий шар поверх основних послуг: сторінки, які збирають комерційний попит, пояснюють оффер і ведуть правильного відвідувача до оцінки."}
                  </p>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-left">
              <div className="grid gap-6">
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                    {isEnglish ? "What this layer does" : "Що робить цей шар"}
                  </p>
                  <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                    {isEnglish
                      ? "Turns broad service positioning into dedicated entry points for high-intent traffic."
                      : "Перетворює загальне позиціонування послуг на окремі точки входу для трафіку з високим наміром."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <Search className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                        {isEnglish ? "Search coverage" : "Пошукове покриття"}
                      </p>
                    </div>
                    <p className="mt-3 text-lg text-white">{pages.length}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <Sparkles className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                        {isEnglish ? "Built for" : "Фокус"}
                      </p>
                    </div>
                    <p className="mt-3 text-lg text-white">
                      {isEnglish ? "Visibility + conversion" : "Видимість + конверсія"}
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
                  {isEnglish ? "Landing pages" : "Посадкові сторінки"}
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {isEnglish ? "Dedicated pages for concrete search scenarios" : "Окремі сторінки під конкретні пошукові сценарії"}
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                {isEnglish
                  ? "Each page is focused on one commercial intent: website development, Next.js execution or redesign with SEO control. This lets the site rank with more precision and speak in a more relevant tone."
                  : "Кожна сторінка зібрана під один комерційний намір: розробка сайту, реалізація на Next.js або редизайн із контролем SEO. Це дає точнішу видимість і релевантнішу подачу."}
              </p>
            </div>
          </AnimationWrapper>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <li key={page.slug}>
                <AnimationWrapper animation="slide-up">
                  <article className="group flex h-full flex-col rounded-[1.75rem] border border-[rgba(24,31,43,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]">
                    <div className="flex min-h-[12rem] flex-col">
                      <Badge variant="secondary">{isEnglish ? "SEO landing" : "SEO-сторінка"}</Badge>
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
                          {isEnglish ? "Business outcome" : "Бізнес-результат"}
                        </h4>
                        <ul className="space-y-3">
                          {page.benefits.slice(0, 3).map((item) => (
                            <li key={item} className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild variant="outline" className="mt-auto w-full bg-transparent">
                        <Link href={`/solutions/${page.slug}`}>
                          {isEnglish ? "Open page" : "Відкрити сторінку"}
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
                  {isEnglish ? "Next step" : "Наступний крок"}
                </p>
                <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                  {isEnglish ? "Need a page for a specific search intent?" : "Потрібна сторінка під конкретний пошуковий намір?"}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-white/70">
                  {isEnglish
                    ? "If you already know the service direction or market, I can package a dedicated landing page around it instead of forcing everything into one generic services page."
                    : "Якщо ви вже розумієте напрям послуги або ринок, я можу зібрати окрему сторінку під цей намір замість того, щоб запихати все в одну загальну сторінку послуг."}
                </p>
                <Button asChild size="lg" className="mt-8 bg-white text-[hsl(var(--foreground))] hover:bg-white/92">
                  <Link href="/#contact">
                    {isEnglish ? "Get an estimate" : "Отримати оцінку"}
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
