import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {ArrowLeft, ArrowUpRight, Calendar, ExternalLink, Layers3, User} from "lucide-react";
import {getTranslations} from "next-intl/server";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";
import {Link} from "@/i18n/navigation";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {getPageAlternates} from "@/lib/seo";
import {localizeProject} from "@/lib/projects-i18n";
import {getProjectBySlug, getProjects} from "@/lib/projects-server";
import type {Project} from "@/types/projects";

const SITE_URL = process.env.SITE_URL || "https://www.oberemchuk.online";

type PortfolioProjectPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

function getCaseNarrative(
  project: {
    slug: string;
    category: string;
    description: string;
    features: string[];
  },
  locale: "uk" | "en"
) {
  const isEnglish = locale === "en";
  const featureHighlights = project.features.slice(0, 3);

  const defaultNarrative = {
    challenge: isEnglish
      ? "The goal was to create a stronger digital presentation with clearer structure, more confident communication and a technical base that can support growth."
      : "Задача полягала в тому, щоб зібрати сильнішу цифрову подачу з чіткішою структурою, переконливішою комунікацією і технічною базою, готовою до росту.",
    solution: isEnglish
      ? "The implementation focused on page hierarchy, interaction clarity, controlled visual language and a dependable front-end structure."
      : "Реалізація будувалася через продуману ієрархію сторінки, зрозумілу взаємодію, контрольовану візуальну мову і стабільну front-end основу.",
    result: isEnglish
      ? "The end result is a cleaner user path, stronger trust signals and a product that is easier to use as part of sales, SEO or launch activity."
      : "На виході вийшов чистіший сценарій для користувача, сильніші сигнали довіри і продукт, який легше використовувати в продажах, SEO або запуску реклами.",
    outcomes: featureHighlights.length
      ? featureHighlights
      : isEnglish
        ? ["Clearer structure", "Stronger trust layer", "Better launch readiness"]
        : ["Чіткіша структура", "Сильніший шар довіри", "Краща готовність до запуску"]
  };

  if (project.slug === "raisa-regress") {
    return {
      challenge: isEnglish
        ? "The challenge was to present the service with more authority, reduce visual noise and make the website feel faster and more controlled."
        : "Задача полягала в тому, щоб подати послугу сильніше, прибрати зайвий шум і зробити сайт швидшим та більш контрольованим у сприйнятті.",
      solution: isEnglish
        ? "The project was rebuilt through cleaner structure, tighter visual hierarchy and a stronger technical base that supports speed and SEO readiness."
        : "Проєкт був зібраний через чистішу структуру, сильнішу візуальну ієрархію і технічну основу, яка підтримує швидкість та SEO-ready підхід.",
      result: isEnglish
        ? "The website now communicates with more confidence, feels sharper in interaction and gives the business a stronger base for acquisition."
        : "У результаті сайт став переконливішим у подачі, чіткішим у взаємодії і дав бізнесу сильнішу основу для залучення клієнтів.",
      outcomes: featureHighlights.length
        ? featureHighlights
        : isEnglish
          ? ["Sharper service positioning", "Faster perceived experience", "Stronger SEO structure"]
          : ["Сильніше позиціонування послуги", "Швидше відчуття роботи сайту", "Сильніша SEO-структура"]
    };
  }

  if (/shop|store|commerce|магазин/i.test(project.category)) {
    return {
      challenge: isEnglish
        ? "The store needed a stronger product presentation, a clearer buying path and a structure that would not block growth later."
        : "Магазину була потрібна сильніша подача товарів, зрозуміліший сценарій покупки і структура, яка не буде стримувати ріст далі.",
      solution: isEnglish
        ? "The solution focused on storefront clarity, purchase flow, integrations and architecture that can support catalogue and SEO expansion."
        : "Рішення будувалося навколо зрозумілого storefront, сценарію покупки, інтеграцій і архітектури, яка підтримує ріст каталогу та SEO.",
      result: isEnglish
        ? "The result is a cleaner commerce experience and a more scalable base for product visibility and online sales."
        : "У результаті вийшов чистіший e-commerce сценарій і більш масштабована база для видимості товарів та онлайн-продажів.",
      outcomes: featureHighlights.length
        ? featureHighlights
        : isEnglish
          ? ["Stronger storefront", "Cleaner checkout logic", "Category growth readiness"]
          : ["Сильніший storefront", "Чистіша логіка checkout", "Готовність до росту категорій"]
    };
  }

  if (/app|saas|platform|додат/i.test(project.category)) {
    return {
      challenge: isEnglish
        ? "The task was to turn product requirements into a clear working interface instead of a static showcase layer."
        : "Задача була в тому, щоб перетворити продуктові вимоги в зрозумілий робочий інтерфейс, а не в статичну вітрину.",
      solution: isEnglish
        ? "The product was assembled through user flows, scalable component logic, integration readiness and a predictable UI system."
        : "Продукт був зібраний через user flows, масштабовану логіку компонентів, готовність до інтеграцій і передбачувану UI-систему.",
      result: isEnglish
        ? "That created a stronger product surface: clearer interaction, better maintainability and more room for the next growth stage."
        : "Це дало сильнішу продуктову основу: зрозумілішу взаємодію, кращу підтримуваність і більше простору для наступного етапу росту.",
      outcomes: featureHighlights.length
        ? featureHighlights
        : isEnglish
          ? ["Clearer user flows", "Scalable UI logic", "Growth-ready architecture"]
          : ["Чіткіші user flows", "Масштабована UI-логіка", "Архітектура, готова до росту"]
    };
  }

  return defaultNarrative;
}

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
  const isEnglish = locale === "en";
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const localizedProject = localizeProject(project, locale as "uk" | "en");
  const pagePath = isEnglish ? `/en/portfolio/${slug}` : `/portfolio/${slug}`;
  const narrative = getCaseNarrative(localizedProject, locale as "uk" | "en");
  const overviewLabel = pageT("overviewLabel");
  const buildLabel = pageT("buildLabel");
  const projectLabel = pageT("projectLabel");

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
    <div className="px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,31,43,0.08)] bg-white/88 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] shadow-[0_14px_40px_rgba(24,31,43,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(24,31,43,0.16)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {pageT("backToPortfolio")}
            </Link>
            {localizedProject.website_url ? (
              <Button asChild size="lg" className="hidden sm:inline-flex">
                <a href={localizedProject.website_url} target="_blank" rel="noreferrer">
                  {pageT("viewSite")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </AnimationWrapper>

        <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.22)]">
          <div className="absolute inset-0">
            <Image
              src={localizedProject.image_src || "/placeholder.svg"}
              alt={localizedProject.title}
              fill
              className="object-cover opacity-24"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,14,24,0.96)_10%,rgba(10,14,24,0.8)_52%,rgba(10,14,24,0.46)_100%)]" />
            <div className="absolute -left-10 top-20 h-64 w-64 rounded-full bg-[rgba(230,90,48,0.16)] blur-3xl" />
            <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-[rgba(108,132,173,0.14)] blur-3xl" />
          </div>

          <div className="relative z-10 grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:px-14 lg:py-14">
            <AnimationWrapper animation="slide-right">
              <div className="flex h-full flex-col">
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                  {projectLabel}
                </p>
                <div className="max-w-xl min-h-[15rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {localizedProject.category}
                  </p>
                  <h1 className="mt-4 max-w-[14ch] text-5xl leading-[0.92] text-white md:text-7xl">
                    {localizedProject.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                    {localizedProject.description}
                  </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <Calendar className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">{pageT("year")}</p>
                    </div>
                    <p className="mt-3 text-lg text-white">{localizedProject.year}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <User className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">{pageT("client")}</p>
                    </div>
                    <p className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg text-white" title={localizedProject.client}>
                      {localizedProject.client}
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/44">
                      <Layers3 className="h-4 w-4" />
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">{pageT("technologies")}</p>
                    </div>
                    <p className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg text-white" title={localizedProject.technologies.join(" / ")}>
                      {localizedProject.technologies.slice(0, 3).join(" / ")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-left">
              <div className="relative mx-auto w-full max-w-[44rem]">
                <div className="pointer-events-none absolute right-0 top-8 hidden h-[84%] w-[80%] rounded-[2rem] border border-white/10 bg-white/6 shadow-[0_28px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:block" />
                <div className="pointer-events-none absolute right-8 top-16 hidden h-[84%] w-[80%] rounded-[2rem] border border-white/12 bg-white/8 shadow-[0_32px_100px_rgba(0,0,0,0.22)] backdrop-blur-sm lg:block" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/16 bg-black/18 shadow-[0_34px_120px_rgba(0,0,0,0.24)]">
                  <div className="relative aspect-[4/4.8]">
                    <Image
                      src={localizedProject.image_src || "/placeholder.svg"}
                      alt={localizedProject.title}
                      fill
                      className="object-cover"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZWFlZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,16,24,0.02)_0%,rgba(12,16,24,0.18)_52%,rgba(12,16,24,0.76)_100%)]" />
                  </div>
                </div>

                {localizedProject.website_url ? (
                  <a
                    href={localizedProject.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group absolute -bottom-6 left-6 right-6 hidden rounded-[1.4rem] border border-white/12 bg-[rgba(11,15,24,0.82)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/20 hover:bg-[rgba(11,15,24,0.9)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.3)] md:block"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                          {overviewLabel}
                        </p>
                        <p className="mt-2 truncate pr-4 text-xl text-white">{localizedProject.title}</p>
                      </div>
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/6 text-white/78 transition-[background-color,border-color,color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/24 group-hover:bg-white group-hover:text-[hsl(var(--foreground))] group-hover:shadow-[0_14px_30px_rgba(255,255,255,0.12)]">
                        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[115%] group-hover:-translate-y-[115%]">
                          <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                        </span>
                        <span className="absolute inset-0 flex translate-x-[-115%] translate-y-[115%] items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0">
                          <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </a>
                ) : null}
              </div>
            </AnimationWrapper>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {pageT("challenge")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {pageT("challengeTitle")}
              </h2>
              <p className="mt-6 text-base leading-8 text-[hsl(var(--foreground))]/72">
                {narrative.challenge}
              </p>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {buildLabel}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {pageT("technologies")}
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {localizedProject.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="rounded-full border-[rgba(24,31,43,0.08)] px-4 py-2 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimationWrapper animation="slide-up">
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7fafc)] p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {pageT("solution")}
              </p>
              <h2 className="text-4xl text-[hsl(var(--foreground))] md:text-5xl">
                {pageT("solutionTitle")}
              </h2>
              <p className="mt-6 text-base leading-8 text-[hsl(var(--foreground))]/72">
                {narrative.solution}
              </p>

              <p className="mt-8 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {pageT("featureIntro")}
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {localizedProject.features.map((feature, index) => (
                  <li
                    key={index}
                    className="rounded-[1.35rem] border border-[rgba(24,31,43,0.08)] bg-white px-5 py-5 text-base leading-7 text-[hsl(var(--foreground))] shadow-[0_10px_30px_rgba(24,31,43,0.04)]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={100}>
            <div className="rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-[hsl(var(--foreground))] p-8 text-white shadow-[0_24px_80px_rgba(24,31,43,0.14)]">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                {pageT("result")}
              </p>
              <h2 className="text-4xl text-white md:text-5xl">
                {pageT("resultTitle")}
              </h2>
              <p className="mt-6 text-base leading-8 text-white/74">
                {narrative.result}
              </p>

              <ul className="mt-8 grid gap-4">
                {narrative.outcomes.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-[1.35rem] border border-white/12 bg-white/6 px-5 py-5 text-base leading-7 text-white/88 backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimationWrapper>
        </section>
      </div>
    </div>
  );
}
