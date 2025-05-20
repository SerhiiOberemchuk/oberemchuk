import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import { Project } from "@/types/projects";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import ProjectsSlider from "@/components/projects-slider";
import JsonLd from "@/components/json-ld";
import AnimationWrapper from "@/components/animation-wrapper";
import axiosInstanceAdmin from "@/data/axios";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ProjectPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const response = await axiosInstanceAdmin.get(
    `/api/projects/by-slug/${slug}`
  );
  const project: Project = response.data.data;

  if (!project) {
    return {
      title: "Проект не знайдено | Oberemchuk Serhii",
      description: "Проект не знайдено в нашому портфоліо.",
    };
  }

  return {
    title: `${project.title} | Портфоліо | Oberemchuk Serhii`,
    description: project.description,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Портфоліо | Oberemchuk Serhii`,
      description: project.description,
      url: `/portfolio/${slug}`,
      images: [project.image_src],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const response = await axiosInstanceAdmin.get(
    `/api/projects/by-slug/${slug}`
  );
  const project: Project = response.data.data;

  if (!project) {
    notFound();
  }

  const responseAll = await axiosInstanceAdmin.get(`/api/projects`);
  const allProjects: Project[] = responseAll.data.data;
  const relatedProjects = allProjects.filter((item) => item.slug !== slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://www.oberemchuk.site/portfolio/${project.slug}`,
    image: project.image_src,
    datePublished: project.created_at || new Date().toISOString(),
    creator: {
      "@type": "Person",
      name: "Oberemchuk Serhii",
    },
    keywords: project.technologies.join(", "),
    workExample: {
      "@type": "WebSite",
      name: project.title,
      url: project.website_url,
      description: project.description,
      dateCreated: project.year,
    },
  };

  return (
    <div className="container mx-auto py-12 md:py-24">
      <JsonLd data={jsonLd} />

      <div className="mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-green-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад до портфоліо
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <AnimationWrapper animation="slide-right">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={project.image_src}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-left">
          <div className="space-y-6">
            <div>
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-2">
                {project.category}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {project.title}
              </h1>
            </div>

            <p className="text-gray-500">{project.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Рік</h3>
                <p>{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Клієнт</h3>
                <p>{project.client}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Технології
              </h3>
              <ul className="space-y-1 list-disc pl-5">
                {project.technologies.map((tech) => (
                  <li key={tech} className="text-gray-700">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {project.website_url && (
              <Button asChild className="mt-4">
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  Відвідати сайт
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </AnimationWrapper>
      </div>

      <div className="mb-16">
        <AnimationWrapper animation="slide-up">
          <h2 className="text-2xl font-bold mb-6">Особливості проекту</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-700 mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </AnimationWrapper>
      </div>

      {relatedProjects.length > 0 && (
        <div>
          <AnimationWrapper animation="slide-up">
            <h2 className="text-2xl font-bold mb-6">Інші проекти</h2>
            <ProjectsSlider projects={relatedProjects} />
          </AnimationWrapper>
        </div>
      )}
    </div>
  );
}
