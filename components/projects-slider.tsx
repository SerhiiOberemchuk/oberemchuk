"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/projects";

type ProjectsSliderProps = {
  projects: Project[];
};

export default function ProjectsSlider({ projects }: ProjectsSliderProps) {
  const sliderProjects = projects.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sliderProjects.length) % sliderProjects.length,
    );
  };

  if (sliderProjects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Проєкти не знайдено</p>
      </div>
    );
  }

  return (
    <section
      className="relative w-full max-w-4xl mx-auto"
      aria-label="Слайдер проєктів"
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderProjects.map((project) => (
            <div key={project.slug} className="w-full flex-shrink-0">
              <Card className="border-0 shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={project.image_src || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <CardContent className="p-6 text-white">
                      <Badge variant="secondary" className="mb-2">
                        {project.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-200 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <Link href={`/portfolio/${project.slug}`}>
                        <Button variant="secondary" size="sm">
                          Детальніше
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {sliderProjects.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
            aria-label="Попередній слайд"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
            aria-label="Наступний слайд"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-4 space-x-2" aria-label="Навігація слайдів">
            {sliderProjects.map((project, index) => (
              <button
                key={project.slug}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-green-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Слайд ${index + 1}: ${project.title}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
