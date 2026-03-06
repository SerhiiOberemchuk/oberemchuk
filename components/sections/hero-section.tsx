"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AnimationWrapper from "@/components/animation-wrapper";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimationWrapper animation="fade-in">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                Веб-розробник з України
              </Badge>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={100}>
            <h1
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Створюю{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                сучасні
              </span>{" "}
              вебсайти
            </h1>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={200}>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Привіт! Я Сергій Оберемчук, веб-розробник з 5+ роками досвіду.
              Створюю швидкі, функціональні та красиві сайти. Для створення
              дизайнів співпрацюю з талановитими дизайнерами.
            </p>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="#contact">Обговорити проєкт</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
              >
                <Link href="/portfolio">Переглянути портфоліо</Link>
              </Button>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="fade-in" delay={400}>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <dd className="text-3xl font-bold text-blue-600 mb-2">50+</dd>
                <dt className="text-gray-600">Завершених проєктів</dt>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <dd className="text-3xl font-bold text-indigo-600 mb-2">5+</dd>
                <dt className="text-gray-600">Років досвіду</dt>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <dd className="text-3xl font-bold text-purple-600 mb-2">100%</dd>
                <dt className="text-gray-600">Задоволених клієнтів</dt>
              </div>
            </dl>
          </AnimationWrapper>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      ></div>
    </section>
  );
}

