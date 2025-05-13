"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <AnimationWrapper animation="slide-right">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Про нас</div>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-right" delay={100}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Хто ми такі</h2>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-right" delay={200}>
              <p className="text-gray-500 md:text-xl/relaxed">
                Ми — команда професійних веб-розробників та дизайнерів, які пристрасно ставляться до створення вражаючих
                вебсайтів. Наша місія — допомогти бізнесам та приватним особам досягти успіху в цифровому світі.
              </p>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-right" delay={300}>
              <p className="text-gray-500 md:text-xl/relaxed">
                Ми віримо в чистий код, семантичну верстку та оптимізовану швидкість роботи сайту. Наш підхід поєднує
                технічну досконалість з креативним дизайном, щоб створювати вебсайти, які не лише виглядають чудово, але
                й працюють бездоганно.
              </p>
            </AnimationWrapper>

            <AnimationWrapper animation="slide-right" delay={400}>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild variant="outline" size="lg">
                  <SmoothScrollLink href="#contact">Зв'язатися з нами</SmoothScrollLink>
                </Button>
              </div>
            </AnimationWrapper>
          </div>

          <AnimationWrapper animation="slide-left" delay={200}>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="/modern-workspace-setup.png"
                  alt="Сучасне робоче місце веб-розробника"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
