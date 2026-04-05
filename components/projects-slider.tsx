"use client";

import {useState} from "react";
import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import type {Project} from "@/types/projects";

type ProjectsSliderProps = {
  projects: Project[];
};

export default function ProjectsSlider({projects}: ProjectsSliderProps) {
  const t = useTranslations("ProjectsSlider");
  const sliderProjects = projects.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sliderProjects.length) % sliderProjects.length
    );
  };

  if (sliderProjects.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">{t("empty")}</p>
      </div>
    );
  }

  return (
    <section
      className="relative mx-auto w-full max-w-4xl"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
      aria-label={t("regionLabel")}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {sliderProjects.map((project) => (
            <article key={project.slug} className="w-full flex-shrink-0">
              <Card className="border-0 shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={project.image_src || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-black bg-opacity-40">
                    <CardContent className="p-6 text-white">
                      <Badge variant="secondary" className="mb-2">
                        {project.category}
                      </Badge>
                      <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
                      <p className="mb-4 line-clamp-2 text-gray-200">{project.description}</p>
                      <Link href={`/portfolio/${project.slug}`}>
                        <Button variant="secondary" size="sm">
                          {t("detailsCta")}
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </div>

      {sliderProjects.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white"
            onClick={prevSlide}
            aria-label={t("previousSlide")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white"
            onClick={nextSlide}
            aria-label={t("nextSlide")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <nav className="mt-4 flex justify-center space-x-2" aria-label={t("slidesNav")}>
            {sliderProjects.map((project, index) => (
              <button
                key={project.slug}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[hsl(var(--primary))]" : "bg-[rgba(24,31,43,0.18)]"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={t("slideLabel", {index: index + 1, title: project.title})}
                aria-pressed={index === currentIndex}
              />
            ))}
          </nav>
        </>
      )}
    </section>
  );
}
