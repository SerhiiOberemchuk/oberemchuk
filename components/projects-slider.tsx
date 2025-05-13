"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"
// Імпортуємо Swiper та його компоненти
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
// Імпортуємо стилі Swiper
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ProjectsSliderProps {
  projects: Project[]
}

export default function ProjectsSlider({ projects }: ProjectsSliderProps) {
  const [domLoaded, setDomLoaded] = useState(false)

  // Переконуємося, що Swiper ініціалізується тільки на клієнті
  useEffect(() => {
    setDomLoaded(true)
  }, [])

  // Додаємо логування
  useEffect(() => {
    console.log(`Кількість проектів у слайдері: ${projects.length}`)
  }, [projects])

  if (!projects.length) return null

  // Налаштовуємо унікальні ідентифікатори для кнопок навігації
  const navigationPrevId = "swiper-prev"
  const navigationNextId = "swiper-next"

  return (
    <div className="relative">
      {domLoaded && (
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={24} // Відступ між слайдами
          slidesPerView={1} // Базова кількість слайдів
          loop={true} // Зациклювання слайдера
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: `#${navigationPrevId}`,
            nextEl: `#${navigationNextId}`,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }}
          breakpoints={{
            // Налаштування для різних розмірів екрану
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.slug}>
              <Link href={`/portfolio/${project.slug}`} className="group block overflow-hidden rounded-lg h-full">
                <div className="aspect-video relative overflow-hidden h-full">
                  <Image
                    src={project.imageSrc || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-white/80">{project.category}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          {/* Додаємо контейнер для пагінації */}
          <div className="swiper-pagination mt-4"></div>
        </Swiper>
      )}

      <div className="flex justify-end gap-2 mt-6">
        <Button
          id={navigationPrevId}
          variant="outline"
          size="icon"
          className="rounded-full z-10"
          aria-label="Попередній проект"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          id={navigationNextId}
          variant="outline"
          size="icon"
          className="rounded-full z-10"
          aria-label="Наступний проект"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
