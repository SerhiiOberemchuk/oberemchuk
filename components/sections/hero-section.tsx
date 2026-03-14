"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

type HeroStat = {
  value: string
  label: string
}

export default function HeroSection() {
  const t = useTranslations("HomeHero")
  const stats = t.raw("stats") as HeroStat[]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <AnimationWrapper animation="fade-in">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                {t("badge")}
              </Badge>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={100}>
            <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t("titlePrefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">{t("titleHighlight")}</span> {t("titleSuffix")}
            </h1>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={200}>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <SmoothScrollLink href="#contact">{t("primaryCta")}</SmoothScrollLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Link href="/portfolio">{t("secondaryCta")}</Link>
              </Button>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="fade-in" delay={400}>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                  <dd className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</dd>
                  <dt className="text-gray-600">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </AnimationWrapper>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true" />
    </section>
  )
}
