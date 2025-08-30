"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <AnimationWrapper animation="slide-up">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-6">
              Веб-розробник з України
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Привіт! Я{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Serhii Oberemchuk
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Створюю сучасні, швидкі та функціональні вебсайти, які допомагають бізнесу рости. Співпрацюю з
              талановитими дизайнерами для створення комплексних рішень під ключ.
            </p>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <SmoothScrollLink href="#contact">
                  Почати проект
                  <ArrowRight className="ml-2 h-5 w-5" />
                </SmoothScrollLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">Переглянути портфоліо</Link>
              </Button>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="fade-in" delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Чистий код</h3>
                <p className="text-gray-600 text-sm text-center">Семантична верстка та оптимізована продуктивність</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Сучасний дизайн</h3>
                <p className="text-gray-600 text-sm text-center">Співпраця з професійними дизайнерами</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Швидка робота</h3>
                <p className="text-gray-600 text-sm text-center">Дотримання термінів та якісний результат</p>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
