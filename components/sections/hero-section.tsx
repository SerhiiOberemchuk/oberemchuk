"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <AnimationWrapper animation="fade-in">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                Професійна розробка вебсайтів
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-up" delay={100}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Перетворюємо ваші ідеї на <span className="text-green-600">вражаючі</span> вебсайти
              </h1>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-up" delay={200}>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Створюємо швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати та залучати
                нових клієнтів.
              </p>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-up" delay={300}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild size="lg" className="gap-1">
                  <SmoothScrollLink href="#contact">
                    Замовити сайт <ArrowRight className="h-4 w-4" />
                  </SmoothScrollLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <SmoothScrollLink href="#portfolio">Переглянути роботи</SmoothScrollLink>
                </Button>
              </div>
            </AnimationWrapper>
          </div>

          <AnimationWrapper animation="slide-left" delay={200}>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[600px] aspect-[4/3]">
                <Image
                  src="/web-development-strategy.png"
                  alt="Професійна веб-розробка"
                  fill
                  className="object-contain"
                  priority
                  onError={(e) => {
                    // Запасне зображення, якщо основне не завантажиться
                    const target = e.target as HTMLImageElement
                    target.src = "/web-development-strategy.png"
                    console.log("Помилка завантаження зображення, використовуємо запасне")
                  }}
                />
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
