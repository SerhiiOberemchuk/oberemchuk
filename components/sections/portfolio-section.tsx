import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import PortfolioItem from "@/components/portfolio-item"
import AnimationWrapper from "@/components/animation-wrapper"
import type { Project } from "@/types/projects"
import { getProjects } from "@/lib/projects-server"

export default async function PortfolioSection() {
  const t = await getTranslations("PortfolioSection")
  const projects: Project[] = (await getProjects()).slice(0, 3)
  const featuredProject = projects[0]
  const secondaryProjects = projects.slice(1, 3)
  const isEnglish = t("title") === "Recent work"
  const featuredLabel = isEnglish ? "Selected case" : "Ключовий кейс"
  const openCaseLabel = isEnglish ? "Open case" : "Відкрити кейс"
  const portfolioLabel = isEnglish ? "Portfolio" : "Портфоліо"
  const portfolioPitch = isEnglish ? "A tight selection, not a volume play." : "Точкова добірка, а не гонитва за кількістю."
  const portfolioBody = isEnglish
    ? "Each case is here to show business thinking, interface discipline and production quality."
    : "Кожен кейс тут показує бізнес-логіку, дисципліну інтерфейсу і якість реалізації."

  return (
    <section id="portfolio" className="px-4 py-24 md:px-6" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="slide-up">
          <header className="mb-16 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("badge")}
              </p>
              <h2 id="portfolio-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{t("description")}</p>
          </header>
        </AnimationWrapper>

        {projects.length > 0 ? (
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            {featuredProject ? (
              <AnimationWrapper animation="fade-in">
                <div className="grid gap-6 border-t border-[rgba(24,31,43,0.14)] pt-8">
                  <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">{featuredLabel}</p>
                      <p className="mt-3 text-[2.8rem] leading-[0.96] text-[hsl(var(--foreground))] md:text-[4.1rem]">{featuredProject.title}</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/portfolio/${featuredProject.slug}`}>
                        {openCaseLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <PortfolioItem
                    slug={featuredProject.slug}
                    imageSrc={featuredProject.image_src}
                    title={featuredProject.title}
                    category={featuredProject.category}
                    variant="featured"
                  />
                </div>
              </AnimationWrapper>
            ) : null}

            <div className="grid gap-8">
              <div className="grid gap-6 border-t border-[rgba(24,31,43,0.14)] pt-8">
                {secondaryProjects.map((project, index) => (
                  <AnimationWrapper
                    key={project.slug}
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
                ))}
              </div>

              <AnimationWrapper animation="slide-up" delay={300}>
                <div className="border-l border-[rgba(24,31,43,0.08)] pl-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    {portfolioLabel}
                  </p>
                  <p className="text-3xl leading-[1.06] text-[hsl(var(--foreground))]">{portfolioPitch}</p>
                  <p className="mt-4 text-base leading-8 text-[hsl(var(--muted-foreground))]">{portfolioBody}</p>
                  <Button asChild size="lg" className="mt-6">
                    <Link href="/portfolio">
                      {t("cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </AnimationWrapper>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-[hsl(var(--muted-foreground))]">{t("empty")}</div>
        )}
      </div>
    </section>
  )
}
