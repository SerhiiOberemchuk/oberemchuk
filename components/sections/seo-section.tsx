"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Globe, Search, Target, Zap } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { useTranslations } from "next-intl"

type SeoItem = {
  title: string
  description: string
}

export default function SeoSection() {
  const t = useTranslations("HomeSeo")
  const pillars = t.raw("pillars") as SeoItem[]
  const keywords = t.raw("keywords") as string[]
  const reasons = t.raw("reasons") as string[]

  const pillarIcons = [
    <Target key="target" className="h-6 w-6 text-blue-600" />,
    <Search key="search" className="h-6 w-6 text-green-600" />,
    <Globe key="globe" className="h-6 w-6 text-cyan-600" />,
    <Zap key="zap" className="h-6 w-6 text-orange-600" />,
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-cyan-50" aria-labelledby="seo-content-title">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              {t("badge")}
            </Badge>
            <h2 id="seo-content-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <AnimationWrapper animation="slide-left">
            <ul className="space-y-6">
              {pillars.map((item, index) => (
                <li key={item.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">{pillarIcons[index]}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <Card className="h-full border-slate-200 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("keywordsTitle")}</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {keywords.map((item) => (
                    <Badge key={item} variant="secondary" className="px-4 py-2 text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-900 mb-4">{t("reasonsTitle")}</h4>
                <ul className="space-y-3">
                  {reasons.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <p className="text-gray-600">{item}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="slide-up">
          <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("ctaTitle")}</h3>
            <p className="text-slate-300 max-w-3xl mx-auto mb-8">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                <SmoothScrollLink href="#contact">
                  {t("primaryCta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </SmoothScrollLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800 bg-transparent">
                <SmoothScrollLink href="#services">{t("secondaryCta")}</SmoothScrollLink>
              </Button>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
