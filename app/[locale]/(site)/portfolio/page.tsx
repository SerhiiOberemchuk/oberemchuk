import type {Metadata} from "next";
import {Suspense} from "react";
import {getTranslations} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import PortfolioItem from "@/components/portfolio-item";
import SeoText from "@/components/seo-text";
import {Skeleton} from "@/components/ui/skeleton";
import {getPageAlternates} from "@/lib/seo";
import {localizeProjects} from "@/lib/projects-i18n";
import {getProjects} from "@/lib/projects-server";

type PortfolioPageProps = {
  params: Promise<{locale: string}>;
};

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata({params}: PortfolioPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "PortfolioPage.metadata"});
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

export default async function PortfolioPage({params}: PortfolioPageProps) {
  const {locale} = await params;
  const pageT = await getTranslations({locale, namespace: "PortfolioPage"});
  const projects = localizeProjects(await getProjects(), locale as "uk" | "en");
  const pagePath = locale === "en" ? "/en/portfolio" : "/portfolio";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageT("schema.name"),
    description: pageT("schema.description"),
    url: `https://www.oberemchuk.site${pagePath}`,
    author: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: "https://www.oberemchuk.site"
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
          url: `https://www.oberemchuk.site${locale === "en" ? `/en/portfolio/${project.slug}` : `/portfolio/${project.slug}`}`,
          image: project.image_src,
          dateCreated: project.created_at,
          dateModified: project.updated_at,
          creator: {
            "@type": "Person",
            name: "Serhii Oberemchuk"
          }
        }
      }))
    }
  };

  const seoParagraphs = pageT.raw("seoText.paragraphs") as string[];

  return (
    <div className="container mx-auto py-12 md:py-24">
      <JsonLd data={jsonLd} />

      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{pageT("hero.title")}</h1>
        <p className="text-gray-500 md:text-xl/relaxed">{pageT("hero.description")}</p>
      </header>

      <Suspense
        fallback={
          <section
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            aria-label={pageT("loadingLabel")}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </section>
        }
      >
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" aria-label={pageT("listLabel")}>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <li key={project.slug}>
                <AnimationWrapper
                  animation="fade-in"
                  delay={((index % 3) * 100) as 0 | 100 | 200 | 300 | 400 | 500}
                >
                  <PortfolioItem
                    slug={project.slug}
                    imageSrc={project.image_src}
                    title={project.title}
                    category={project.category}
                  />
                </AnimationWrapper>
              </li>
            ))
          ) : (
            <li className="col-span-full py-12 text-center">
              <p className="text-gray-500">{pageT("empty")}</p>
            </li>
          )}
        </ul>
      </Suspense>

      <SeoText title={pageT("seoText.title")}>
        {seoParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SeoText>
    </div>
  );
}
