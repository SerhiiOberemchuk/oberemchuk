import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import JsonLd from "@/components/json-ld";
import AnimationWrapper from "@/components/animation-wrapper";
import type { Project } from "@/types/projects";
import { getProjectBySlug, getProjects } from "@/lib/projects-server";

const SITE_URL = process.env.SITE_URL || "https://www.oberemchuk.site";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: Project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Проект не знайдено | Oberemchuk Serhii",
      description: "Запитуваний проект не знайдено.",
    };
  }

  return {
    title: `${project.title} | Oberemchuk Serhii - Веб-розробка`,
    description: project.description,
    keywords: `${project.title}, ${
      project.category
    }, веб-розробка, ${project.technologies.join(", ")}`,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Oberemchuk Serhii - Веб-розробка`,
      description: project.description,
      url: `${SITE_URL}/portfolio/${slug}`,
      images: [
        {
          url: project.image_src,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image_src,
    url: `${SITE_URL}/portfolio/${slug}`,
    creator: {
      "@type": "Person",
      name: "Oberemchuk Serhii",
    },
    dateCreated: project.created_at,
    dateModified: project.updated_at,
    genre: project.category,
    keywords: project.technologies.join(", "),
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />

      <div className="container mx-auto px-4 py-8">
        <AnimationWrapper animation="slide-up">
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад до портфоліо
            </Link>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimationWrapper animation="slide-left">
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {project.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Рік</p>
                    <p className="font-semibold">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Клієнт</p>
                    <p className="font-semibold">{project.client}</p>
                  </div>
                </div>
              </div>

              {project.website_url && (
                <Button asChild className="w-full sm:w-auto">
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Переглянути сайт
                  </a>
                </Button>
              )}
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="relative">
              <Image
                src={project.image_src || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZWFlZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+"
              />
            </div>
          </AnimationWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <AnimationWrapper animation="fade-in" delay={200}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Технології</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
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
                <h3 className="text-xl font-semibold mb-4">Особливості</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
