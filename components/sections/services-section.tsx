"use client"

import { Code, Cpu, Globe, Layers, Zap } from "lucide-react"
import ServiceCard from "@/components/service-card"
import AnimationWrapper from "@/components/animation-wrapper"

export default function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        <AnimationWrapper animation="slide-up">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Наші послуги</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Що ми пропонуємо</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Повний спектр послуг з розробки вебсайтів, від дизайну до запуску та підтримки
            </p>
          </div>
        </AnimationWrapper>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 auto-rows-fr">
          <AnimationWrapper animation="scale" delay={100}>
            <ServiceCard
              icon={<Layers className="h-10 w-10 text-green-600" />}
              title="Веб-дизайн"
              description="Створюємо унікальний, сучасний дизайн, який відображає вашу індивідуальність та цінності бренду."
              className="h-full"
            />
          </AnimationWrapper>

          <AnimationWrapper animation="scale" delay={200}>
            <ServiceCard
              icon={<Code className="h-10 w-10 text-green-600" />}
              title="Розробка"
              description="Розробляємо функціональні вебсайти з чистим кодом, семантичною версткою та оптимальною швидкістю."
              className="h-full"
            />
          </AnimationWrapper>

          <AnimationWrapper animation="scale" delay={300}>
            <ServiceCard
              icon={<Globe className="h-10 w-10 text-green-600" />}
              title="SEO-оптимізація"
              description="Оптимізуємо ваш сайт для пошукових систем, щоб збільшити органічний трафік та видимість."
              className="h-full"
            />
          </AnimationWrapper>

          <AnimationWrapper animation="scale" delay={100}>
            <ServiceCard
              icon={<Zap className="h-10 w-10 text-green-600" />}
              title="Швидкість роботи"
              description="Забезпечуємо блискавичну швидкість завантаження сайту для кращого користувацького досвіду."
              className="h-full"
            />
          </AnimationWrapper>

          <AnimationWrapper animation="scale" delay={200}>
            <ServiceCard
              icon={<Cpu className="h-10 w-10 text-green-600" />}
              title="Інтеграції"
              description="Інтегруємо необхідні сервіси та API для розширення функціональності вашого сайту."
              className="h-full"
            />
          </AnimationWrapper>

          <AnimationWrapper animation="scale" delay={300}>
            <ServiceCard
              icon={
                <svg
                  className="h-10 w-10 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Підтримка"
              description="Надаємо технічну підтримку та оновлення для забезпечення безперебійної роботи вашого сайту."
              className="h-full"
            />
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
