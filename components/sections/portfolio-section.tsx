import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import PortfolioItem from "@/components/portfolio-item";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { localizeProjects, type AppLocale } from "@/lib/projects-i18n";
import { getProjects } from "@/lib/projects-server";
import type { Project } from "@/types/projects";

type PortfolioSectionProps = {
  locale: AppLocale;
};

type CaseEvidence = {
  eyebrow: string;
  title: string;
  points: string[];
};

function getCaseEvidence(
  project: { slug: string; category: string; features: string[] },
  evidence: {
    default: CaseEvidence;
    raisa: CaseEvidence;
    commerce: CaseEvidence;
    app: CaseEvidence;
  },
): CaseEvidence {
  const featurePoints = project.features.slice(0, 3);

  const pickEvidence = (item: CaseEvidence): CaseEvidence => ({
    ...item,
    points: featurePoints.length > 0 ? featurePoints : item.points,
  });

  if (project.slug === "raisa-regress") {
    return pickEvidence(evidence.raisa);
  }

  if (/shop|store|commerce|магазин/i.test(project.category)) {
    return pickEvidence(evidence.commerce);
  }

  if (/app|saas|platform|додат/i.test(project.category)) {
    return pickEvidence(evidence.app);
  }

  return pickEvidence(evidence.default);
}

export default async function PortfolioSection({
  locale,
}: PortfolioSectionProps) {
  const t = await getTranslations("PortfolioSection");
  const projects: Project[] = localizeProjects(await getProjects(), locale).slice(0, 3);
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 3);
  const labels = t.raw("labels") as {
    featured: string;
    openCase: string;
    proof: string;
  };
  const pitch = t.raw("pitch") as {
    title: string;
    body: string;
  };
  const evidence = t.raw("evidence") as {
    default: CaseEvidence;
    raisa: CaseEvidence;
    commerce: CaseEvidence;
    app: CaseEvidence;
  };
  const featuredEvidence = featuredProject
    ? getCaseEvidence(featuredProject, evidence)
    : null;

  return (
    <section
      id="portfolio"
      className="px-4 py-24 md:px-6"
      aria-labelledby="portfolio-title"
    >
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="slide-up">
          <header className="mb-16 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {t("badge")}
              </p>
              <h2
                id="portfolio-title"
                className="text-4xl text-[hsl(var(--foreground))] md:text-6xl"
              >
                {t("title")}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              {t("description")}
            </p>
          </header>
        </AnimationWrapper>

        {projects.length > 0 ? (
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            {featuredProject ? (
              <AnimationWrapper animation="fade-in">
                <div className="grid gap-6 border-t border-[rgba(24,31,43,0.14)] pt-8">
                  <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                        {labels.featured}
                      </p>
                      <p className="mt-3 text-[2.8rem] leading-[0.96] text-[hsl(var(--foreground))] md:text-[4.1rem]">
                        {featuredProject.title}
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/portfolio/${featuredProject.slug}`}>
                        {labels.openCase}
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
                      highlights={getCaseEvidence(project, evidence).points}
                    />
                  </AnimationWrapper>
                ))}
              </div>

              <AnimationWrapper animation="slide-up" delay={300}>
                <div className="border-l border-[rgba(24,31,43,0.08)] pl-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    {labels.proof}
                  </p>
                  <p className="text-3xl leading-[1.06] text-[hsl(var(--foreground))]">
                    {pitch.title}
                  </p>
                  <p className="mt-4 text-base leading-8 text-[hsl(var(--muted-foreground))]">
                    {pitch.body}
                  </p>
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
          <div className="py-8 text-center text-[hsl(var(--muted-foreground))]">
            {t("empty")}
          </div>
        )}
      </div>
    </section>
  );
}
