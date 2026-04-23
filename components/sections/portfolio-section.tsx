import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import PortfolioItem from "@/components/portfolio-item"
import AnimationWrapper from "@/components/animation-wrapper"
import type { Project } from "@/types/projects"
import { getProjects } from "@/lib/projects-server"
import { localizeProjects, type AppLocale } from "@/lib/projects-i18n"

type PortfolioSectionProps = {
  locale: AppLocale
}

type CaseEvidence = {
  eyebrow: string
  title: string
  points: string[]
}

function getCaseEvidence(
  project: { slug: string; category: string; features: string[] },
  locale: AppLocale
): CaseEvidence {
  const isEnglish = locale === "en"
  const featurePoints = project.features.slice(0, 3)

  if (project.slug === "raisa-regress") {
    return isEnglish
      ? {
          eyebrow: "Evidence",
          title: "Built to look sharper, load faster and explain the offer with more confidence.",
          points: featurePoints.length
            ? featurePoints
            : ["Sharper service positioning", "Cleaner mobile experience", "Stronger SEO-ready structure"],
        }
      : {
          eyebrow: "Доказ",
          title: "Сайт зібраний так, щоб виглядати сильніше, працювати швидше і чіткіше пояснювати цінність послуги.",
          points: featurePoints.length
            ? featurePoints
            : ["Сильніше позиціонування послуг", "Чистіший mobile experience", "Структура, готова до SEO"],
        }
  }

  if (/shop|store|commerce|магазин/i.test(project.category)) {
    return isEnglish
      ? {
          eyebrow: "Outcome logic",
          title: "Focused on product visibility, easier buying flow and a base for catalogue growth.",
          points: featurePoints.length
            ? featurePoints
            : ["Product-first storefront", "Cleaner purchase flow", "SEO-ready category structure"],
        }
      : {
          eyebrow: "Логіка результату",
          title: "Акцент на видимості товарів, простішому сценарії покупки і базі для росту каталогу.",
          points: featurePoints.length
            ? featurePoints
            : ["Storefront під продукт", "Простіший сценарій покупки", "Структура категорій під SEO"],
        }
  }

  if (/app|saas|platform|додат/i.test(project.category)) {
    return isEnglish
      ? {
          eyebrow: "Product angle",
          title: "Structured as a working interface with clear flows, not as a static showcase.",
          points: featurePoints.length
            ? featurePoints
            : ["Clear user flows", "Scalable interface logic", "Architecture ready for growth"],
        }
      : {
          eyebrow: "Продуктовий акцент",
          title: "Побудовано як робочий інтерфейс із чіткими сценаріями, а не як статичну вітрину.",
          points: featurePoints.length
            ? featurePoints
            : ["Чіткі user flows", "Масштабована логіка інтерфейсу", "Архітектура під ріст"],
        }
  }

  return isEnglish
    ? {
        eyebrow: "Commercial angle",
        title: "Designed to communicate faster, build trust earlier and support the next conversion step.",
        points: featurePoints.length ? featurePoints : ["Clearer structure", "Earlier trust signals", "Better inquiry path"],
      }
    : {
        eyebrow: "Комерційний акцент",
        title: "Спроєктовано так, щоб швидше доносити цінність, раніше створювати довіру і вести до заявки.",
        points: featurePoints.length ? featurePoints : ["Чіткіша структура", "Раніші сигнали довіри", "Кращий сценарій заявки"],
      }
}

export default async function PortfolioSection({ locale }: PortfolioSectionProps) {
  const t = await getTranslations("PortfolioSection")
  const projects: Project[] = localizeProjects(await getProjects(), locale).slice(0, 3)
  const featuredProject = projects[0]
  const secondaryProjects = projects.slice(1, 3)
  const isEnglish = t("title") === "Recent work"
  const featuredLabel = isEnglish ? "Selected case" : "Ключовий кейс"
  const openCaseLabel = isEnglish ? "Open case" : "Відкрити кейс"
  const portfolioLabel = isEnglish ? "Proof" : "Доказ"
  const portfolioPitch = isEnglish ? "Cases should build trust before the user reaches the form." : "Кейси мають створювати довіру ще до того, як людина дійде до форми."
  const portfolioBody = isEnglish
    ? "This block exists to show outcome thinking, production quality and the level of partner you work with."
    : "Цей блок тут, щоб показати мислення на результат, якість реалізації і рівень партнера, з яким ви працюєте."
  const featuredEvidence = featuredProject ? getCaseEvidence(featuredProject, locale) : null

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
                        <ArrowRight className="button-arrow-right h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <PortfolioItem
                    slug={featuredProject.slug}
                    imageSrc={featuredProject.image_src}
                    title={featuredProject.title}
                    category={featuredProject.category}
                    description={featuredProject.description}
                    highlights={featuredEvidence?.points ?? []}
                    variant="featured"
                  />

                  {featuredEvidence ? (
                    <div className="grid gap-5 rounded-[1.6rem] border border-[rgba(24,31,43,0.08)] bg-[rgba(255,255,255,0.72)] p-6 md:grid-cols-[0.88fr_1.12fr]">
                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                          {featuredEvidence.eyebrow}
                        </p>
                        <p className="mt-3 text-2xl leading-[1.04] text-[hsl(var(--foreground))]">
                          {featuredEvidence.title}
                        </p>
                      </div>
                      <ul className="grid gap-3">
                        {featuredEvidence.points.map((point) => (
                          <li
                            key={point}
                            className="border-b border-[rgba(24,31,43,0.08)] pb-3 text-sm leading-7 text-[hsl(var(--foreground))]/72 last:border-b-0 last:pb-0"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
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
                      description={project.description}
                      highlights={getCaseEvidence(project, locale).points}
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
                      <ArrowRight className="button-arrow-right h-4 w-4" />
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
