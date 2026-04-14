import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import PortfolioItem from "@/components/portfolio-item"
import AnimationWrapper from "@/components/animation-wrapper"
import type { Project } from "@/types/projects"
import { getProjects } from "@/lib/projects-server"
import EditorialOrbit from "@/components/editorial-orbit"

export default async function PortfolioSection() {
  const t = await getTranslations("PortfolioSection")
  const projects: Project[] = (await getProjects()).slice(0, 3)
  const featuredProject = projects[0]
  const secondaryProjects = projects.slice(1, 3)
  const isEnglish = t("title") === "Recent work"
  const featuredLabel = isEnglish ? "Lead case" : "Ключовий кейс"
  const openCaseLabel = isEnglish ? "Open case" : "Відкрити кейс"
  const portfolioLabel = isEnglish ? "Selected work" : "Вибрані роботи"
  const portfolioPitch = isEnglish ? "A small archive with deliberate weight." : "Невеликий архів із навмисною вагою."
  const portfolioBody = isEnglish
    ? "The point is not quantity. The point is proof of taste, structure and execution under real business constraints."
    : "Суть не в кількості. Суть у доказі смаку, структури і якості реалізації в реальних бізнес-умовах."
  const archiveLabel = isEnglish ? "Case selection logic" : "Логіка відбору кейсів"

  return (
    <section id="portfolio" className="px-4 py-24 md:px-6" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="slide-up">
          <header className="mb-16 grid gap-6 lg:grid-cols-[0.66fr_1.34fr] lg:items-end">
            <div>
              <p className="mb-4 editorial-kicker">{t("badge")}</p>
              <h2 id="portfolio-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{t("description")}</p>
          </header>
        </AnimationWrapper>

        {projects.length > 0 ? (
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            {featuredProject ? (
              <AnimationWrapper animation="fade-in">
                <div className="grid gap-6 editorial-divider pt-8">
                  <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <p className="editorial-kicker">{featuredLabel}</p>
                      <p className="mt-3 max-w-3xl text-[2.8rem] leading-[0.94] text-[hsl(var(--foreground))] md:text-[4.3rem]">
                        {featuredProject.title}
                      </p>
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
              <div className="grid gap-6 editorial-divider pt-8">
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
                <div className="premium-panel p-6 text-white md:p-7">
                  <div className="premium-grid" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/56">{portfolioLabel}</p>
                        <p className="text-3xl leading-[1.03]">{portfolioPitch}</p>
                      </div>
                      <EditorialOrbit className="hidden w-28 shrink-0 opacity-80 md:block" accentClassName="text-[rgba(217,111,58,0.92)]" />
                    </div>
                    <p className="mt-4 text-base leading-8 text-white/74">{portfolioBody}</p>
                    <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/46">{archiveLabel}</p>
                  </div>
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
