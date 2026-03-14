"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"
import { Globe, Monitor, ShoppingCart, Sparkles, Workflow } from "lucide-react"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

type ServiceItem = {
  title: string
  description: string
  price: string
  features: string[]
}

type AdvantageItem = {
  title: string
  description: string
}

export default function ServicesSection() {
  const t = useTranslations("HomeServices")

  const servicesContent = t.raw("services") as ServiceItem[]
  const advantages = t.raw("advantages") as AdvantageItem[]

  const services = [
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      href: "/services/landing-pages",
      popular: false,
      ...servicesContent[0],
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      href: "/services/corporate-websites",
      popular: true,
      ...servicesContent[1],
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      href: "/services/ecommerce-development",
      popular: false,
      ...servicesContent[2],
    },
    {
      icon: <Workflow className="w-8 h-8 text-orange-600" />,
      href: "/services/web-app-development",
      popular: false,
      ...servicesContent[3],
    },
  ]

  const advantageIcons = [
    <Globe key="globe" className="w-6 h-6 text-cyan-600" />,
    <Sparkles key="sparkles" className="w-6 h-6 text-yellow-600" />,
    <Workflow key="workflow" className="w-6 h-6 text-green-600" />,
  ]

  return (
    <section id="services" className="py-20 bg-white" aria-labelledby="services-title">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <div className="text-center mb-16">
            <h2 id="services-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </AnimationWrapper>

        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
          {services.map((service, index) => (
            <li key={service.href}>
              <AnimationWrapper animation="slide-up" delay={index * 100} className="h-full">
                <Card
                  className={`relative flex h-full flex-col hover:shadow-xl transition-all duration-300 ${service.popular ? "ring-2 ring-blue-500" : ""}`}
                >
                  <article className="flex h-full flex-col" aria-labelledby={`home-service-title-${index}`}>
                    {service.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">{t("popularBadge")}</Badge>}
                    <CardHeader className="text-center pb-4">
                      <div className="mb-4 flex justify-center">{service.icon}</div>
                      <CardTitle id={`home-service-title-${index}`} className="text-xl mb-2">{service.title}</CardTitle>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-1 flex-col">
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="mt-auto w-full bg-transparent">
                        <Link href={service.href}>{t("detailsCta")}</Link>
                      </Button>
                    </CardContent>
                  </article>
                </Card>
              </AnimationWrapper>
            </li>
          ))}
        </ul>

        <AnimationWrapper animation="fade-in">
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t("approachTitle")}</h3>
            <ul className="grid md:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <li key={advantage.title} className="text-center">
                  <div className="mb-4 flex justify-center">{advantageIcons[index]}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{advantage.title}</h4>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("estimateTitle")}</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("estimateDescription")}
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <SmoothScrollLink href="#contact">{t("estimateCta")}</SmoothScrollLink>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
