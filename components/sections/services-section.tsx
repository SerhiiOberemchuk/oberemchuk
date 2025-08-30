"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Search, ShoppingCart, Building, Palette } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"

export default function ServicesSection() {
  const services = [
    {
      icon: Monitor,
      title: "Лендінг пейдж",
      description: "Одностороінкові сайти для презентації продукту або послуги з високою конверсією",
      price: "від $800",
      features: ["Адаптивний дизайн", "SEO-оптимізація", "Форма зворотного зв'язку", "Швидке завантаження"],
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Building,
      title: "Корпоративний сайт",
      description: "Професійні багатосторінкові сайти для представлення компанії та її послуг",
      price: "від $1200",
      features: ["Багато сторінок", "CMS система", "Блог", "Інтеграція з соцмережами"],
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: ShoppingCart,
      title: "Інтернет-магазин",
      description: "Повнофункціональні e-commerce рішення з системою оплати та управління товарами",
      price: "від $1500",
      features: ["Каталог товарів", "Кошик покупок", "Система оплати", "Панель адміністратора"],
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Smartphone,
      title: "Мобільна оптимізація",
      description: "Адаптація існуючих сайтів для мобільних пристроїв та покращення UX",
      price: "від $400",
      features: ["Responsive дизайн", "Швидкість завантаження", "Touch-friendly", "PWA можливості"],
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Search,
      title: "SEO-оптимізація",
      description: "Комплексна оптимізація сайту для пошукових систем та збільшення трафіку",
      price: "від $300",
      features: ["Технічний аудит", "Оптимізація контенту", "Мета-теги", "Структуровані дані"],
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Palette,
      title: "Редизайн сайту",
      description: "Оновлення дизайну та функціональності існуючих сайтів для покращення UX",
      price: "від $600",
      features: ["Сучасний дизайн", "Покращена навігація", "Оптимізація швидкості", "Нові функції"],
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Мої послуги</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Пропоную повний спектр послуг з веб-розробки - від простих лендінгів до складних інтернет-магазинів
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <AnimationWrapper key={index} animation="slide-up" delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {service.price}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            )
          })}
        </div>

        <AnimationWrapper animation="fade-in">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Готові почати свій проект? Зв'яжіться зі мною для детальної консультації та розрахунку вартості.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <SmoothScrollLink href="#contact">Замовити консультацію</SmoothScrollLink>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
