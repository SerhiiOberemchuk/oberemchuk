import type {Metadata} from "next";
import {connection} from "next/server";
import Image from "next/image";
import {notFound} from "next/navigation";
import {ArrowLeft, Calendar, ExternalLink, User} from "lucide-react";
import {getTranslations} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {getPageAlternates} from "@/lib/seo";
import {localizeProject} from "@/lib/projects-i18n";
import {getProjectBySlug, getProjects} from "@/lib/projects-server";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import type {Project} from "@/types/projects";

const SITE_URL = process.env.SITE_URL || "https://www.oberemchuk.site";

type PortfolioProjectPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return ["uk", "en"].flatMap((locale) =>
    projects.map((project: Project) => ({
      locale,
      slug: project.slug
    }))
  );
}

export async function generateMetadata({params}: PortfolioProjectPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const pageT = await getTranslations({locale, namespace: "PortfolioProjectPage"});
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: pageT("notFound.title"),
      description: pageT("notFound.description")
    };
  }

  const localizedProject = localizeProject(project, locale as "uk" | "en");
  const pagePath = locale === "en" ? `/en/portfolio/${slug}` : `/portfolio/${slug}`;

  return {
    title: localizedProject.title,
    description: localizedProject.description,
    keywords: `${localizedProject.title}, ${localizedProject.category}, ${pageT("metadata.keywordsPrefix")}, ${localizedProject.technologies.join(", ")}`,
    alternates: getPageAlternates(locale as "uk" | "en", `/portfolio/${slug}`),
    openGraph: {
      title: `${localizedProject.title} | ${pageT("metadata.siteSuffix")}`,
      description: localizedProject.description,
      url: `${SITE_URL}${pagePath}`,
      images: [
        {
          url: localizedProject.image_src,
          width: 1200,
          height: 630,
          alt: localizedProject.title
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: localizedProject.title,
      description: localizedProject.description,
      images: [localizedProject.image_src]
    }
  };
}

export default async function ProjectPage({params}: PortfolioProjectPageProps) {
  const {locale, slug} = await params;
  const pageT = await getTranslations({locale, namespace: "PortfolioProjectPage"});
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const localizedProject = localizeProject(project, locale as "uk" | "en");
  const pagePath = locale === "en" ? `/en/portfolio/${slug}` : `/portfolio/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: localizedProject.title,
    description: localizedProject.description,
    image: localizedProject.image_src,
    url: `${SITE_URL}${pagePath}`,
    creator: {
      "@type": "Person",
      name: pageT("schema.creatorName")
    },
    dateCreated: localizedProject.created_at,
    dateModified: localizedProject.updated_at,
    genre: localizedProject.category,
    keywords: localizedProject.technologies.join(", ")
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />

      <div className="container mx-auto px-4 py-8">
        <AnimationWrapper animation="slide-up">
          <div className="mb-8">
            <Link href="/portfolio" className="inline-flex items-center text-green-600 transition-colors hover:text-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {pageT("backToPortfolio")}
            </Link>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimationWrapper animation="slide-left">
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {localizedProject.category}
                </Badge>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{localizedProject.title}</h1>
                <p className="text-xl leading-relaxed text-gray-600">{localizedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">{pageT("year")}</p>
                    <p className="font-semibold">{localizedProject.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">{pageT("client")}</p>
                    <p className="font-semibold">{localizedProject.client}</p>
                  </div>
                </div>
              </div>

              {localizedProject.website_url && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={localizedProject.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {pageT("viewSite")}
                  </a>
                </Button>
              )}
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="relative">
              <Image
                src={localizedProject.image_src || "/placeholder.svg"}
                alt={localizedProject.title}
                width={600}
                height={400}
                className="h-auto w-full rounded-lg shadow-lg"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZWFlZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+"
              />
            </div>
          </AnimationWrapper>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <AnimationWrapper animation="fade-in" delay={200}>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">{pageT("technologies")}</h3>
                <div className="flex flex-wrap gap-2">
                  {localizedProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimationWrapper>

          <AnimationWrapper animation="fade-in" delay={300}>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">{pageT("features")}</h3>
                <ul className="space-y-2">
                  {localizedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-2 h-2 w-2 shrink-0 rounded-full bg-green-600"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
}
