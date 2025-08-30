"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, MapPin, Clock, Users, Zap, Award, Shield } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import AnimationWrapper from "@/components/animation-wrapper"

export default function ContactSection() {
  const contactInfo = [
    {
      icon: "mail",
      label: "Email",
      value: "hello@oberemchuk.com",
      href: "mailto:hello@oberemchuk.com",
    },
    {
      icon: "message",
      label: "Telegram",
      value: "@SerhiiOberemchuk",
      href: "https://t.me/SerhiiOberemchuk",
    },
    {
      icon: "map",
      label: "Локація",
      value: "Україна",
      href: null,
    },
    {
      icon: "clock",
      label: "Робочі години",
      value: "Пн-Пт 9:00-18:00",
      href: null,
    },
  ]

  const advantages = [
    {
      icon: Users,
      title: "Співпраця з дизайнерами",
      description: "Працюю в команді з талановитими дизайнерами",
    },
    {
      icon: Zap,
      title: "Швидкий відгук",
      description: "Відповідаю на повідомлення протягом 2 годин",
    },
    {
      icon: Award,
      title: "Якість гарантована",
      description: "Гарантую високу якість та дотримання термінів",
    },
    {
      icon: Shield,
      title: "Конфіденційність",
      description: "Підписую NDA та гарантую захист ваших даних",
    },
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="w-6 h-6 text-blue-600" />
      case "message":
        return <MessageCircle className="w-6 h-6 text-green-600" />
      case "map":
        return <MapPin className="w-6 h-6 text-purple-600" />
      case "clock":
        return <Clock className="w-6 h-6 text-orange-600" />
      default:
        return null
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Контакти
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Готовий почати ваш проект?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Зв'яжіться зі мною, щоб обговорити ваш проект. Разом з командою дизайнерів створимо для вас ідеальне
              рішення під ключ.
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimationWrapper delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактна інформація</h3>
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getIcon(info.icon)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{info.label}</div>
                      {info.href ? (
                        <Link
                          href={info.href}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.value}
                        </Link>
                      ) : (
                        <div className="text-gray-600">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="space-y-3 mb-8">
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="mailto:hello@oberemchuk.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Написати email
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="https://t.me/SerhiiOberemchuk" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Написати в Telegram
                  </Link>
                </Button>
              </div>

              {/* Advantages */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Чому обирають мене:</h4>
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <advantage.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{advantage.title}</div>
                      <div className="text-gray-600 text-sm">{advantage.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimationWrapper>

          {/* Contact Form */}
          <AnimationWrapper delay={0.4}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Розкажіть про ваш проект</h3>
                <ContactForm />
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
