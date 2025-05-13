"use client"

import { Button } from "@/components/ui/button"
import PortfolioItem from "@/components/portfolio-item"
import AnimationWrapper from "@/components/animation-wrapper"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Project } from "@/data/projects"

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          
          const sortedProjects = data
            .sort((a: Project, b: Project) => {
              return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            })
            .slice(0, 3)

          setProjects(sortedProjects)
        } else {
          console.error("Помилка отримання проектів")
        }
      } catch (error) {
        console.error("Помилка:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto">
        <AnimationWrapper animation="slide-up">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Портфоліо</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Наші останні роботи</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Перегляньте приклади наших проєктів, які демонструють наш підхід та якість роботи
            </p>
          </div>
        </AnimationWrapper>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {isLoading
            ? // Показуємо заглушки під час завантаження
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <AnimationWrapper key={index} animation="fade-in" delay={(index % 3) * 100}>
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                  </AnimationWrapper>
                ))
            : // Показуємо проекти
              projects.map((project, index) => (
                <AnimationWrapper key={project.slug} animation="fade-in" delay={(index % 3) * 100}>
                  <PortfolioItem
                    slug={project.slug}
                    imageSrc={project.imageSrc}
                    title={project.title}
                    category={project.category}
                  />
                </AnimationWrapper>
              ))}
        </div>

        <AnimationWrapper animation="slide-up" delay={400}>
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">Переглянути всі проєкти</Link>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
