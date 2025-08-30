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

// Статичні дані як fallback
const fallbackProjects: Project[] = [
  {
    id: 1,
    slug: "ecommerce-platform",
    title: "E-commerce платформа",
    category: "Інтернет-магазин",
    image_src: "/placeholder.svg?height=400&width=600&text=E-commerce+Platform",
    description: "Сучасний інтернет-магазин з повним функціоналом",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    features: ["Онлайн оплата", "Адмін панель", "Мобільна версія"],
    year: "2024",
    client: "TechStore",
    website_url: "https://example.com",
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 2,
    slug: "corporate-website",
    title: "Корпоративний сайт",
    category: "Бізнес",
    image_src: "/placeholder.svg?height=400&width=600&text=Corporate+Website",
    description: "Професійний корпоративний сайт з CMS",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    features: ["CMS система", "SEO оптимізація", "Багатомовність"],
    year: "2024",
    client: "BusinessCorp",
    website_url: "https://example.com",
    created_at: "2024-02-10",
    updated_at: "2024-02-10",
  },
  {
    id: 3,
    slug: "portfolio-website",
    title: "Портфоліо дизайнера",
    category: "Портфоліо",
    image_src: "/placeholder.svg?height=400&width=600&text=Portfolio+Website",
    description: "Елегантне портфоліо для креативного дизайнера",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    features: ["Анімації", "Галерея робіт", "Контактна форма"],
    year: "2023",
    client: "Creative Designer",
    website_url: "https://example.com",
    created_at: "2023-12-05",
    updated_at: "2023-12-05",
  },
]

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects.slice(0, 3))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Намагаємося завантажити дані з API в фоновому режимі
    async function tryFetchProjects() {
      try {
        const response = await fetch("https://v0-adminca-bk.vercel.app/api/projects")
        if (response.ok) {
          const data = await response.json()
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setProjects(data.data.slice(0, 3))
          }
        }
      } catch (error) {
        // Тихо ігноруємо помилки API, використовуємо fallback дані
        console.log("API недоступний, використовуємо статичні дані")
      }
    }

    tryFetchProjects()
  }, [])

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">Портфоліо</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Мої останні роботи</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ознайомтеся з моїми останніми проектами та переконайтеся в якості моєї роботи. Кожен проект створений з
              урахуванням унікальних потреб клієнта та в співпраці з талановитими дизайнерами.
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
