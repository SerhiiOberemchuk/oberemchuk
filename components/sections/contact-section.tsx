"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import ContactForm from "@/components/contact-form"
import { contactEmail, contactEmailHref, contactTelegram, contactTelegramHref } from "@/lib/contact-info"
import { useTranslations } from "next-intl"

type ContactItem = {
  label: string
  value: string
}

export default function ContactSection() {
  const t = useTranslations("HomeContact")
  const advantages = t.raw("advantages") as string[]

  const contactItems = t.raw("contactItems") as {
    email: ContactItem
    telegram: ContactItem
    workMode: ContactItem
    workRhythm: ContactItem
  }

  const specializations = ["React", "Next.js", "TypeScript", "Node.js", "SEO", "E-commerce"]

  const infoItems = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: contactItems.email.label,
      value: contactEmail || contactItems.email.value,
      href: contactEmailHref,
      external: false,
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: contactItems.telegram.label,
      value: contactTelegram || contactItems.telegram.value,
      href: contactTelegramHref,
      external: true,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: contactItems.workMode.label,
      value: contactItems.workMode.value,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: contactItems.workRhythm.label,
      value: contactItems.workRhythm.value,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50" aria-labelledby="contact-title">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("badge")}
            </Badge>
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimationWrapper animation="slide-left">
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">{t("infoTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {infoItems.map((info) => (
                      <li key={`${info.label}-${info.value}`} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">{info.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">{info.label}</div>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              target={info.external ? "_blank" : undefined}
                              rel={info.external ? "noopener noreferrer" : undefined}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-gray-600">{info.value}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">{t("startTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-4">
                    {advantages.map((advantage) => (
                      <li key={advantage} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("stackTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <li key={spec}>
                        <Badge variant="secondary">
                          {spec}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <a href={contactEmailHref}>{t("emailCta")}</a>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <a href={contactTelegramHref} target="_blank" rel="noopener noreferrer">
                    {t("telegramCta")}
                  </a>
                </Button>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t("briefTitle")}</CardTitle>
                <p className="text-gray-600">
                  {t("briefDescription")}
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
