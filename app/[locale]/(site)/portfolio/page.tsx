import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import PortfolioItem from "@/components/portfolio-item";
import PortfolioShowcase from "@/components/portfolio-showcase";
import SeoText from "@/components/seo-text";
import { getPageAlternates } from "@/lib/seo";
import { localizeProjects } from "@/lib/projects-i18n";
import { getProjects } from "@/lib/projects-server";

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "PortfolioPage.metadata",
  });
  const pagePath = locale === "en" ? "/en/portfolio" : "/portfolio";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: getPageAlternates(locale as "uk" | "en", "/portfolio"),
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
          alt: t("openGraph.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.png"],
    },
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const pageT = await getTranslations({ locale, namespace: "PortfolioPage" });
  const isEnglish = locale === "en";
  const projects = localizeProjects(await getProjects(), locale as "uk" | "en");
  const pagePath = isEnglish ? "/en/portfolio" : "/portfolio";
  const archiveLabel = isEnglish ? "Case studies" : "Кейси";
  const archivePitch = isEnglish
    ? "A broader archive of websites, e-commerce work and web applications, presented as case studies."
    : "Ширший архів сайтів, e-commerce-проєктів і веб-додатків, поданих у форматі кейсів.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageT("schema.name"),
    description: pageT("schema.description"),
    url: `https://oberemchuk.online${pagePath}`,
    author: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: "https://oberemchuk.online",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `https://oberemchuk.online${isEnglish ? `/en/portfolio/${project.slug}` : `/portfolio/${project.slug}`}`,
          image: project.image_src,
          dateCreated: project.created_at,
          dateModified: project.updated_at,
          creator: {
            "@type": "Person",
            name: "Serhii Oberemchuk",
            url: "https://oberemchuk.online",
          },
        },
      })),
    },
  };

  const seoParagraphs = pageT.raw("seoText.paragraphs") as string[];

  return (
    <div className="px-4 py-10 md:px-6 md:py-16">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <header className="mb-12 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {archiveLabel}
              </p>
              <h1 className="max-w-3xl text-5xl leading-[0.92] text-[hsl(var(--foreground))] md:text-7xl">
                {pageT("hero.title")}
              </h1>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))] md:text-xl">
              {pageT("hero.description")}
            </p>
          </header>
        </AnimationWrapper>

        {projects.length > 0 ? (
          <>
            <AnimationWrapper animation="fade-in" delay={100}>
              <PortfolioShowcase
                projects={projects}
                locale={locale as "uk" | "en"}
              />
            </AnimationWrapper>

            <section
              className="mt-20"
              aria-labelledby="portfolio-archive-title"
            >
              <AnimationWrapper animation="slide-up">
                <div className="mb-10 grid gap-6 border-t border-[rgba(24,31,43,0.14)] pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                      {archiveLabel}
                    </p>
                    <h2
                      id="portfolio-archive-title"
                      className="text-4xl text-[hsl(var(--foreground))] md:text-6xl"
                    >
                      {pageT("listLabel")}
                    </h2>
                  </div>
                  <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                    {archivePitch}
                  </p>
                </div>
              </AnimationWrapper>

              <ul
                className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
                aria-label={pageT("listLabel")}
              >
                {projects.map((project, index) => (
                  <li
                    key={project.slug}
                    className={
                      index % 5 === 0 ? "md:col-span-2 xl:col-span-2" : ""
                    }
                  >
                    <AnimationWrapper
                      animation="fade-in"
                      delay={
                        ((index % 4) * 100) as 0 | 100 | 200 | 300 | 400 | 500
                      }
                    >
                      <PortfolioItem
                        slug={project.slug}
                        imageSrc={project.image_src}
                        title={project.title}
                        category={project.category}
                        variant={index % 5 === 0 ? "featured" : "default"}
                      />
                    </AnimationWrapper>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">
              {pageT("empty")}
            </p>
          </div>
        )}

        <SeoText title={pageT("seoText.title")}>
          {seoParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </SeoText>
      </div>
    </div>
  );
}
