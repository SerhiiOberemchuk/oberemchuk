import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PortfolioItem from "@/components/portfolio-item";
import AnimationWrapper from "@/components/animation-wrapper";
import { getProjects } from "@/lib/projects-server";
import type { Project } from "@/types/projects";

export default async function PortfolioSection() {
  const projects: Project[] = (await getProjects()).slice(0, 3);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-preview-title"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <header className="text-center mb-16">
            <p className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">
              Портфоліо
            </p>
            <h2
              id="portfolio-preview-title"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Мої останні роботи
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ознайомтеся з моїми останніми проєктами та переконайтеся в якості
              моєї роботи. Кожен проєкт створений з урахуванням унікальних потреб
              клієнта та в співпраці з талановитими дизайнерами.
            </p>
          </header>
        </AnimationWrapper>

        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          aria-label="Останні проєкти"
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <li key={project.slug}>
                <AnimationWrapper
                  animation="fade-in"
                  delay={(index * 100) as 0 | 100 | 200 | 300 | 400 | 500}
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
            <li className="col-span-full text-center py-8 text-gray-500">
              Проєкти не знайдено
            </li>
          )}
        </ul>

        <AnimationWrapper animation="slide-up" delay={400}>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/portfolio">
                Переглянути всі проєкти
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
