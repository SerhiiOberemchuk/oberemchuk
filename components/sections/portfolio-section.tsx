"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PortfolioItem from "@/components/portfolio-item"
import AnimationWrapper from "@/components/animation-wrapper"

interface Project {
  id: number
  slug: string
  title: string
  category: string
  image_src: string
  description: string
  technologies: string[]
  features: string[]
  year: string
  client: string
  website_url: string
  created_at: string
  updated_at: string
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)

        // Спочатку спробуємо внутрішнє API
        const response = await fetch("/api/projects")

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setProjects(data.data.slice(0, 3)) // Показуємо лише 3 проекти
            return
          }
        }

        // Fallback: спробуємо зовнішнє API
        const fallbackResponse = await fetch("https://v0-adminca-bk.vercel.app/api/projects")
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          if (fallbackData.success) {
            setProjects(fallbackData.data.slice(0, 3))
            return
          }
        }

        throw new Error("Не вдалося завантажити проекти")
      } catch (err) {
        console.error("Помилка завантаження проектів:", err)
        setError("Не вдалося завантажити проекти")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">Портфоліо</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наші роботи</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ознайомтеся з деякими з наших останніх проектів</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наші роботи</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Спробувати знову</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">Портфоліо</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наші роботи</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ознайомтеся з деякими з наших останніх проектів та переконайтеся в якості нашої роботи
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
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

        <AnimationWrapper animation="slide-up" delay={400}>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/portfolio">
                Переглянути всі проекти
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
