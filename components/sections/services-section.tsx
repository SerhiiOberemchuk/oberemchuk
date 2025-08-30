"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, Zap, Award } from "lucide-react"
import Link from "next/link"
import AnimationWrapper from "@/components/animation-wrapper"

export default function ServicesSection() {
  const services = [
    {
      title: "Дизайн + Розробка",
      price: "від $800",
      description: "Повний цикл створення сайту: від дизайну до розробки",
      features: [
        "Унікальний дизайн від партнерів-дизайнерів",
        "Адаптивна верстка",
        "SEO оптимізація",
        "Швидкість завантаження",
        "Тестування на всіх пристроях",
        "3 місяці підтримки",
      ],
      popular: true,
    },
    {
      title: "Лендінг пейдж",
      price: "від $400",
      description: "Одностороінковий сайт для конверсії відвідувачів",
      features: [
        "Дизайн який продає",
        "Форми зворотного зв'язку",
        "Інтеграція з аналітикою",
        "Мобільна оптимізація",
        "A/B тестування",
        "1 місяць підтримки",
      ],
    },
    {
      title: "Інтернет-магазин",
      price: "від $1200",
      description: "E-commerce рішення для онлайн продажів",
      features: [
        "Каталог товарів",
        "Кошик та оформлення замовлень",
        "Інтеграція з платіжними системами",
        "Панель адміністратора",
        "Інвентаризація",
        "6 місяців підтримки",
      ],
    },
    {
      title: "Веб-додаток",
      price: "від $1500",
      description: "Складні інтерактивні веб-додатки",
      features: [
        "Користувацькі панелі",
        "База даних",
        "API інтеграції",
        "Реальний час",
        "Безпека даних",
        "12 місяців підтримки",
      ],
    },
  ]

  const advantages = [
    {
      icon: Users,
      title: "Команда дизайнерів",
      description: "Співпрацюю з досвідченими UI/UX дизайнерами для створення унікальних рішень",
    },
    {
      icon: Zap,
      title: "Швидка розробка",
      description: "Використовую сучасні технології та готові рішення для прискорення розробки",
    },
    {
      icon: Award,
      title: "Якість гарантована",
      description: "Тестую кожен проект на всіх пристроях та надаю гарантію на виконану роботу",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Послуги
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Що я можу для вас зробити</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Пропоную повний спектр послуг з веб-розробки - від простих лендінгів до складних веб-додатків. Співпрацюю
              з дизайнерами для створення унікальних рішень під ключ.
            </p>
          </div>
        </AnimationWrapper>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <AnimationWrapper key={index} delay={index * 0.1}>
              <Card
                className={`relative h-full hover:shadow-lg transition-shadow ${service.popular ? "ring-2 ring-blue-500" : ""}`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Популярно
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">{service.title}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{service.price}</div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>

        {/* Advantages */}
        <AnimationWrapper delay={0.5}>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Чому обирають мене</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{advantage.title}</h4>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimationWrapper>

        {/* CTA */}
        <AnimationWrapper delay={0.6}>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              <Link href="#contact">Обговорити проект</Link>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
