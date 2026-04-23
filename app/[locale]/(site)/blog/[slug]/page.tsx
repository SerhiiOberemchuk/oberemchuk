import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays} from "lucide-react";
import {setRequestLocale} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {blogPostSlugs, getBlogPost, getBlogPosts} from "@/lib/blog-posts";
import {getPageAlternates} from "@/lib/seo";
import {getSeoLanding} from "@/lib/seo-landings";
import {getSiteUrl} from "@/lib/site-config";

type BlogPostPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return ["uk", "en"].flatMap((locale) =>
    blogPostSlugs.map((slug) => ({
      locale,
      slug
    }))
  );
}

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = getBlogPost(locale as "uk" | "en", slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: getPageAlternates(locale as "uk" | "en", `/blog/${post.slug}`),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: locale === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.metaTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: ["/og-image.png"]
    }
  };
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const isEnglish = locale === "en";
  const post = getBlogPost(locale as "uk" | "en", slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const pagePath = isEnglish ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;
  const relatedLanding = getSeoLanding(locale as "uk" | "en", post.relatedLandingSlug);
  const relatedPosts = getBlogPosts(locale as "uk" | "en")
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: siteUrl
    },
    publisher: {
      "@type": "Person",
      name: "Serhii Oberemchuk"
    },
    mainEntityOfPage: `${siteUrl}${pagePath}`,
    url: `${siteUrl}${pagePath}`,
    keywords: post.keywords.join(", ")
  };

  return (
    <div className="px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-5xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,31,43,0.08)] bg-white/88 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] shadow-[0_14px_40px_rgba(24,31,43,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(24,31,43,0.16)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back to blog" : "Назад до блогу"}
            </Link>
            <Button asChild size="lg" className="hidden sm:inline-flex">
              <Link href="/#contact">
                {isEnglish ? "Get an estimate" : "Отримати оцінку"}
                <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationWrapper>

        <section className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)] md:px-10 md:py-12">
          <AnimationWrapper animation="fade-in">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                <CalendarDays className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
            <h1 className="mt-6 text-5xl leading-[0.94] text-[hsl(var(--foreground))] md:text-7xl">
              {post.heroTitle}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-[hsl(var(--muted-foreground))] md:text-xl">
              {post.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {post.keywords.map((item) => (
                <Badge key={item} variant="outline" className="rounded-full border-[rgba(24,31,43,0.08)] px-4 py-2 text-sm">
                  {item}
                </Badge>
              ))}
            </div>
          </AnimationWrapper>
        </section>

        <section className="mt-8 space-y-8">
          {post.sections.map((section, index) => (
            <AnimationWrapper
              key={section.title}
              animation="slide-up"
              delay={((index % 4) * 100) as 0 | 100 | 200 | 300 | 400 | 500}
            >
              <article className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">{section.title}</h2>
                <div className="mt-6 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-[hsl(var(--foreground))]/78">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="rounded-[1.25rem] border border-[rgba(24,31,43,0.08)] bg-white px-5 py-5 text-base leading-7 text-[hsl(var(--foreground))] shadow-[0_10px_30px_rgba(24,31,43,0.04)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </AnimationWrapper>
          ))}
        </section>

        {relatedLanding ? (
          <section className="mt-20">
            <AnimationWrapper animation="slide-up">
              <div className="rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] px-8 py-10 text-white shadow-[0_34px_100px_rgba(24,31,43,0.2)] md:px-10">
                <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/44">
                      {isEnglish ? "Related landing page" : "Пов'язана SEO-сторінка"}
                    </p>
                    <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                      {relatedLanding.title}
                    </h2>
                  </div>
                  <div>
                    <p className="text-base leading-8 text-white/70">{relatedLanding.metaDescription}</p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                      <Button asChild size="lg" className="bg-white text-[hsl(var(--foreground))] hover:bg-white/92">
                        <Link href={`/solutions/${relatedLanding.slug}`}>
                          {isEnglish ? "Open SEO page" : "Відкрити SEO-сторінку"}
                          <ArrowRight className="button-arrow-right h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="border-white/16 bg-transparent text-white hover:bg-white/8">
                        <Link href="/#contact">
                          {isEnglish ? "Get an estimate" : "Отримати оцінку"}
                          <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </section>
        ) : null}

        <section className="mt-20">
          <AnimationWrapper animation="slide-up">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                  {isEnglish ? "More reading" : "Ще матеріали"}
                </p>
                <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                  {isEnglish ? "Continue through related articles" : "Продовжити через пов'язані статті"}
                </h2>
              </div>

              <div className="grid gap-4">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group rounded-[1.5rem] border border-[rgba(24,31,43,0.08)] bg-white px-6 py-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,31,43,0.14)] hover:shadow-[0_24px_70px_rgba(24,31,43,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                          {item.category}
                        </p>
                        <h3 className="mt-3 text-[1.8rem] leading-tight text-[hsl(var(--foreground))]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                          {item.excerpt}
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
