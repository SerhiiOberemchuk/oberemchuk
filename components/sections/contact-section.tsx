"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import ContactForm from "@/components/contact-form"

export default function ContactSection() {
  const contactInfo = [
    {
      icon: "mail",
      label: "Email",
      value: "serhiioberemchuk@gmail.com",
      link: "mailto:serhiioberemchuk@gmail.com",
    },
    {
      icon: "telegram",
      label: "Telegram",
      value: "@SerhiiOberemchuk",
      link: "https://t.me/SerhiiOberemchuk",
    },
    {
      icon: "location",
      label: "Локація",
      value: "Україна",
      link: null,
    },
    {
      icon: "clock",
      label: "Робочий час",
      value: "Пн-Пт: 9:00-18:00",
      link: null,
    },
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="h-5 w-5 text-gray-600" />
      case "telegram":
        return <MessageCircle className="h-5 w-5 text-gray-600" />
      case "location":
        return <MapPin className="h-5 w-5 text-gray-600" />
      case "clock":
        return <Clock className="h-5 w-5 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Зв'яжіться зі мною</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Готовий обговорити ваш проект та надати професійну консультацію
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimationWrapper animation="slide-left">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-6">Контактна інформація</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getIcon(info.icon)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{info.label}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              target={info.link.startsWith("http") ? "_blank" : undefined}
                              rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <a href="mailto:serhiioberemchuk@gmail.com">Написати email</a>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <a href="https://t.me/SerhiiOberemchuk" target="_blank" rel="noopener noreferrer">
                    Написати в Telegram
                  </a>
                </Button>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <ContactForm />
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
