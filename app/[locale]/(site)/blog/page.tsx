import type {Metadata} from "next";
import {ArrowRight, ArrowUpRight, BookOpenText, CalendarDays} from "lucide-react";
import {setRequestLocale} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {getBlogPosts} from "@/lib/blog-posts";
import {getPageAlternates} from "@/lib/seo";
import {getSiteUrl} from "@/lib/site-config";

type BlogPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
  const {locale} = await params;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Blog and SEO content layer" : "Блог і контентний SEO-шар",
    description: isEnglish
      ? "Articles on website structure, Next.js, SEO-ready launches and website relaunch strategy for businesses."
      : "Матеріали про структуру сайту, Next.js, SEO-ready запуск і relaunch стратегію для бізнесу.",
    keywords: isEnglish
      ? ["business website blog", "website SEO", "Next.js articles", "lead generation website"]
      : ["блог про сайти", "SEO сайту", "Next.js статті", "сайт під заявки"],
    alternates: getPageAlternates(locale as "uk" | "en", "/blog"),
    openGraph: {
      title: isEnglish ? "Blog and SEO content layer" : "Блог і контентний SEO-шар",
      description: isEnglish
        ? "Articles for businesses planning stronger websites, better SEO structure and cleaner launches."
        : "Матеріали для бізнесу, який планує сильніший сайт, кращу SEO-структуру і чистіший запуск.",
      url: isEnglish ? "/en/blog" : "/blog",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isEnglish ? "Blog" : "Блог"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish ? "Blog and SEO content layer" : "Блог і контентний SEO-шар",
      description: isEnglish
        ? "Articles on structure, SEO and product-oriented websites."
        : "Матеріали про структуру, SEO і продуктову логіку сайтів.",
      images: ["/og-image.png"]
    }
  };
}

export default async function BlogPage({params}: BlogPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const isEnglish = locale === "en";
  const posts = getBlogPosts(locale as "uk" | "en");
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${isEnglish ? "/en/blog" : "/blog"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: isEnglish ? "Insights and SEO content" : "Матеріали і SEO-контент",
    description: isEnglish
      ? "Articles on websites, SEO-ready launches and technical product delivery."
      : "Матеріали про сайти, SEO-ready запуск і технічну реалізацію продуктів.",
    url: pageUrl,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `${pageUrl}/${post.slug}`
    }))
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
                  {isEnglish ? "Content layer" : "Контентний шар"}
                </p>
                <div className="max-w-xl min-h-[15rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {isEnglish ? "Blog" : "Блог"}
                  </p>
                  <h1 className="mt-4 max-w-[12ch] text-5xl leading-[0.92] text-white md:text-7xl">
                    {isEnglish ? "Articles that support search and clarify the offer" : "Матеріали, які підсилюють пошук і пояснюють оффер"}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                    {isEnglish
                      ? "This is the editorial layer around the service and SEO pages: articles that explain decisions, reduce doubt and create more indexed entry points around the core offer."
                      : "Це редакційний шар навколо послуг і SEO-сторінок: матеріали, які пояснюють рішення, знімають сумніви і створюють додаткові точки входу в індексі навколо основного оффера."}
                  </p>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-left">
              <div className="grid gap-6">
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                    {isEnglish ? "What this adds" : "Що це додає"}
                  </p>
                  <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                    {isEnglish
                      ? "A content layer that supports authority, search breadth and better conversion context."
                      : "Контентний шар, який підсилює експертність, ширину пошуку і контекст для кращої конверсії."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <BookOpenText className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                        {isEnglish ? "Articles" : "Матеріали"}
                      </p>
                    </div>
                    <p className="mt-3 text-lg text-white">{posts.length}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <CalendarDays className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                        {isEnglish ? "Focus" : "Фокус"}
                      </p>
                    </div>
                    <p className="mt-3 text-lg text-white">
                      {isEnglish ? "Structure + SEO + launch" : "Структура + SEO + запуск"}
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
                  {isEnglish ? "Article archive" : "Архів матеріалів"}
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {isEnglish ? "Content built around practical website decisions" : "Контент навколо практичних рішень по сайту"}
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                {isEnglish
                  ? "The goal is not generic blogging. Each article supports the commercial pages by clarifying structure, stack choice, launch logic or SEO migration."
                  : "Мета не в абстрактному блозі. Кожен матеріал підсилює комерційні сторінки, пояснюючи структуру, вибір стеку, логіку запуску або SEO-міграцію."}
              </p>
            </div>
          </AnimationWrapper>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <AnimationWrapper animation="slide-up">
                  <article className="group flex h-full flex-col rounded-[1.75rem] border border-[rgba(24,31,43,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="mt-5 max-w-[18ch] text-[2rem] leading-[1.02] text-[hsl(var(--foreground))]">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                      {post.excerpt}
                    </p>

                    <div className="mt-8 flex flex-1 flex-col gap-6 border-t border-[rgba(24,31,43,0.08)] pt-6">
                      <div className="flex flex-wrap gap-2">
                        {post.keywords.slice(0, 3).map((item) => (
                          <Badge key={item} variant="outline" className="rounded-full border-[rgba(24,31,43,0.08)] px-3 py-1 text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <Button asChild variant="outline" className="mt-auto w-full bg-transparent">
                        <Link href={`/blog/${post.slug}`}>
                          {isEnglish ? "Read article" : "Читати матеріал"}
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
                  {isEnglish ? "Editorial strategy" : "Редакційна стратегія"}
                </p>
                <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                  {isEnglish ? "Need content around your service pages too?" : "Потрібен контентний шар навколо сторінок послуг?"}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-white/70">
                  {isEnglish
                    ? "The strongest setup is when service pages capture intent and articles expand the topic, answer doubts and support internal linking."
                    : "Найсильніший сценарій, коли сторінки послуг ловлять намір, а матеріали розширюють тему, знімають сумніви і підсилюють внутрішню перелінковку."}
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
