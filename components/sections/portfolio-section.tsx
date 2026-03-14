import {ArrowRight} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import PortfolioItem from "@/components/portfolio-item";
import AnimationWrapper from "@/components/animation-wrapper";
import type {Project} from "@/types/projects";
import {getProjects} from "@/lib/projects-server";

export default async function PortfolioSection() {
  const t = await getTranslations("PortfolioSection");
  const projects: Project[] = (await getProjects()).slice(0, 3);

  return (
    <section id="portfolio" className="bg-gray-50 py-24" aria-labelledby="portfolio-title">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <header className="mb-16 text-center">
            <p className="mb-4 inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
              {t("badge")}
            </p>
            <h2 id="portfolio-title" className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">{t("description")}</p>
          </header>
        </AnimationWrapper>

        <ul
          className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          aria-label={t("listLabel")}
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
            <li className="col-span-full py-8 text-center text-gray-500">{t("empty")}</li>
          )}
        </ul>

        <AnimationWrapper animation="slide-up" delay={400}>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/portfolio">
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
