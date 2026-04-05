"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LocalizedProject } from "@/lib/projects-i18n";

type PortfolioShowcaseProps = {
  projects: LocalizedProject[];
  locale: "uk" | "en";
};

export default function PortfolioShowcase({
  projects,
  locale,
}: PortfolioShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = projects.slice(0, 6);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const labels = useMemo(
    () =>
      locale === "en"
        ? {
            eyebrow: "Selected cases",
            title: "Curated work with visual weight.",
            description:
              "A focused edit of websites and digital products where execution quality, interface discipline and presence matter.",
            previous: "Previous project",
            next: "Next project",
            openCase: "Open case",
            liveSite: "Live site",
            year: "Year",
            client: "Client",
            stack: "Stack",
            rail: "Project navigation",
          }
        : {
            eyebrow: "Вибрані кейси",
            title: "Добірка робіт із сильною подачею.",
            description:
              "Сфокусована добірка сайтів і цифрових продуктів, де мають значення якість реалізації, дисципліна інтерфейсу та присутність.",
            previous: "Попередній проєкт",
            next: "Наступний проєкт",
            openCase: "Відкрити кейс",
            liveSite: "Живий сайт",
            year: "Рік",
            client: "Клієнт",
            stack: "Стек",
            rail: "Навігація проєктами",
          },
    [locale],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  if (slides.length === 0) {
    return null;
  }

  const activeProject = slides[displayIndex];
  const nextProject = slides[(displayIndex + 1) % slides.length];
  const afterNextProject = slides[(displayIndex + 2) % slides.length];

  const changeSlide = (nextIndex: number) => {
    if (nextIndex === displayIndex || isTransitioning) {
      return;
    }

    setActiveIndex(nextIndex);
    setIsTransitioning(true);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      setDisplayIndex(nextIndex);
      setIsTransitioning(false);
    }, 220);
  };

  const goToPrev = () => {
    changeSlide((displayIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    changeSlide((displayIndex + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.24)]">
      <div className="absolute inset-0">
        <Image
          src={activeProject.image_src || "/placeholder.svg"}
          alt={activeProject.title}
          fill
          className={cn(
            "object-cover transition-[opacity,transform,filter] duration-500 ease-out",
            isTransitioning ? "scale-[1.015] opacity-0 blur-[1.5px]" : "scale-100 opacity-22 blur-0",
          )}
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,14,24,0.96)_8%,rgba(10,14,24,0.76)_52%,rgba(10,14,24,0.5)_100%)]" />
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-[rgba(230,90,48,0.18)] blur-3xl" />
        <div className="absolute right-12 top-16 h-72 w-72 rounded-full bg-[rgba(108,132,173,0.18)] blur-3xl" />
      </div>

      <div className="relative z-10 grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-14 lg:py-14">
        <div className="flex min-h-full flex-col">
          <div className="max-w-xl min-h-[15rem] md:min-h-[18rem]">
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/58">
              {labels.eyebrow}
            </p>
            <h2 className="max-w-lg text-4xl leading-[0.95] text-white md:text-6xl">
              {labels.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
              {labels.description}
            </p>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-white/12 bg-white/6 p-6 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div className="min-h-[8.5rem] md:min-h-[10.5rem]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/48">
                  {activeProject.category}
                </p>
                <h3
                  className={cn(
                    "mt-3 max-w-[18ch] text-3xl leading-[0.98] text-white transition-[opacity,transform] duration-500 ease-out md:text-5xl",
                    isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
                  )}
                  title={activeProject.title}
                >
                  {activeProject.title}
                </h3>
              </div>
              <p className="text-sm text-white/44">
                {String(displayIndex + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
              </p>
            </div>

            <p
              className={cn(
                "mt-5 min-h-[8rem] max-h-[10rem] max-w-xl overflow-hidden text-base leading-8 text-white/72 transition-[opacity,transform] duration-500 ease-out md:min-h-[10rem] md:max-h-[10rem] line-clamp-4 md:line-clamp-5",
                isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
              )}
              title={activeProject.description}
            >
              {activeProject.description}
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.35rem] border border-white/10 bg-black/14 px-4 py-4">
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                  {labels.year}
                </dt>
                <dd className="mt-2 text-lg text-white">{activeProject.year}</dd>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-black/14 px-4 py-4">
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                  {labels.client}
                </dt>
                <dd className="mt-2 line-clamp-2 min-h-[3.5rem] text-lg text-white" title={activeProject.client}>
                  {activeProject.client}
                </dd>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-black/14 px-4 py-4">
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                  {labels.stack}
                </dt>
                <dd
                  className="mt-2 line-clamp-2 min-h-[3.5rem] text-lg text-white"
                  title={activeProject.technologies.join(" / ")}
                >
                  {activeProject.technologies.slice(0, 3).join(" / ")}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-w-[11rem]">
                <Link href={`/portfolio/${activeProject.slug}`}>
                  {labels.openCase}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              {activeProject.website_url ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-w-[11rem] border-white/16 bg-white/6 text-white hover:bg-white hover:text-[hsl(var(--foreground))]"
                >
                  <a
                    href={activeProject.website_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {labels.liveSite}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="h-12 w-12 border-white/14 bg-white/6 text-white hover:bg-white hover:text-[hsl(var(--foreground))]"
              aria-label={labels.previous}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="h-12 w-12 border-white/14 bg-white/6 text-white hover:bg-white hover:text-[hsl(var(--foreground))]"
              aria-label={labels.next}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="relative mx-auto w-full max-w-[42rem]">
            <div className="pointer-events-none absolute right-0 top-8 hidden h-[82%] w-[78%] rounded-[2rem] border border-white/10 bg-white/6 shadow-[0_28px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:block" />
            <div className="pointer-events-none absolute right-8 top-16 hidden h-[82%] w-[78%] rounded-[2rem] border border-white/12 bg-white/8 shadow-[0_32px_100px_rgba(0,0,0,0.22)] backdrop-blur-sm lg:block" />

            <Link
              href={`/portfolio/${activeProject.slug}`}
              className="group relative block overflow-hidden rounded-[2rem] border border-white/16 bg-black/18 shadow-[0_34px_120px_rgba(0,0,0,0.24)]"
            >
              <div className="relative aspect-[4/4.8]">
                <div
                  className={cn(
                    "absolute inset-0 transition-[opacity,filter] duration-500 ease-out",
                    isTransitioning ? "opacity-0 blur-[1.5px]" : "opacity-100 blur-0",
                  )}
                >
                  <Image
                    src={activeProject.image_src || "/placeholder.svg"}
                    alt={activeProject.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,16,24,0.02)_0%,rgba(12,16,24,0.18)_50%,rgba(12,16,24,0.78)_100%)]" />
              </div>
            </Link>

            <Link
              href={`/portfolio/${activeProject.slug}`}
              className="group/overlay absolute -bottom-6 left-6 right-6 hidden rounded-[1.4rem] border border-white/12 bg-[rgba(11,15,24,0.82)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/20 hover:bg-[rgba(11,15,24,0.9)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.3)] md:block"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                    {activeProject.category}
                  </p>
                  <p className="mt-2 truncate pr-4 text-xl text-white" title={activeProject.title}>
                    {activeProject.title}
                  </p>
                </div>
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/6 text-white/78 transition-[background-color,border-color,color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/overlay:border-white/24 group-hover/overlay:bg-white group-hover/overlay:text-[hsl(var(--foreground))] group-hover/overlay:shadow-[0_14px_30px_rgba(255,255,255,0.12)]">
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/overlay:translate-x-[115%] group-hover/overlay:-translate-y-[115%]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 flex translate-x-[-115%] translate-y-[115%] items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/overlay:translate-x-0 group-hover/overlay:translate-y-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-10 lg:mt-20">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                {labels.rail}
              </p>
              <div className="hidden items-center gap-2 md:flex">
                {slides.map((project, index) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => changeSlide(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === displayIndex
                        ? "w-14 bg-[hsl(var(--primary))]"
                        : "w-6 bg-white/18 hover:bg-white/32",
                    )}
                    aria-label={project.title}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[activeProject, nextProject, afterNextProject].map((project, index) => {
                const selected = project.slug === activeProject.slug;

                return (
                  <button
                    key={`${project.slug}-${index}`}
                    type="button"
                    onClick={() => changeSlide(slides.findIndex((entry) => entry.slug === project.slug))}
                    className={cn(
                      "group flex h-full flex-col text-left rounded-[1.5rem] border p-3 transition-all duration-300 ease-out",
                      selected
                        ? "border-white/18 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.16)]"
                        : "border-white/10 bg-white/4 hover:border-white/18 hover:bg-white/8",
                    )}
                  >
                    <div className="relative aspect-[1.3/1] overflow-hidden rounded-[1.1rem]">
                      <Image
                        src={project.image_src || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,16,24,0.72)] via-[rgba(12,16,24,0.12)] to-transparent" />
                      </div>
                    <div className="mt-3 flex min-h-[5.75rem] flex-col">
                      <p className="min-h-[2rem] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                        {project.category}
                      </p>
                      <p className="mt-2 line-clamp-2 min-h-[3.5rem] text-lg leading-tight text-white" title={project.title}>
                        {project.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
