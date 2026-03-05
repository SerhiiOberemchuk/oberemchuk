"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimationWrapper from "@/components/animation-wrapper";
import {
  Monitor,
  ShoppingCart,
  Palette,
  Code,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      title: "Лендінг сторінки",
      description:
        "Ефективні одностроінкові сайти для презентації продукту або послуги",
      price: "від $800",
      features: [
        "Адаптивний дизайн",
        "SEO оптимізація",
        "Форма зворотного зв'язку",
        "Швидке завантаження",
      ],
      popular: false,
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "Дизайн + Розробка",
      description:
        "Повний цикл створення сайту від дизайну до реалізації в співпраці з дизайнерами",
      price: "від $1200",
      features: [
        "UI/UX дизайн",
        "Прототипування",
        "Розробка",
        "Тестування",
        "Підтримка",
      ],
      popular: true,
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      title: "Інтернет-магазини",
      description: "Повнофункціональні e-commerce рішення для онлайн торгівлі",
      price: "від $1500",
      features: [
        "Каталог товарів",
        "Кошик",
        "Оплата",
        "Адмін панель",
        "Інтеграції",
      ],
      popular: false,
    },
    {
      icon: <Code className="w-8 h-8 text-orange-600" />,
      title: "Веб-додатки",
      description: "Складні інтерактивні додатки з унікальним функціоналом",
      price: "від $2000",
      features: [
        "React/Next.js",
        "База даних",
        "API",
        "Автентифікація",
        "Масштабування",
      ],
      popular: false,
    },
  ];

  const advantages = [
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Команда дизайнерів",
      description:
        "Співпрацюю з професійними UI/UX дизайнерами для створення унікальних дизайнів",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Швидка розробка",
      description: "Ефективний процес розробки з дотриманням термінів",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Гарантія якості",
      description: "Тестування та оптимізація кожного проекту",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Мої послуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Повний спектр послуг веб-розробки для вашого бізнесу. Для
              створення дизайнів співпрацюю з професійними дизайнерами.
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <AnimationWrapper
              key={index}
              animation="slide-up"
              delay={index * 100}
            >
              <Card
                className={`relative h-full hover:shadow-xl transition-all duration-300 ${
                  service.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Популярно
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <CardTitle className="text-xl mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    {service.price}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>

        <AnimationWrapper animation="fade-in">
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Чому обирають мене
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    {advantage.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Готові почати свій проект?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Зв'яжіться зі мною для безкоштовної консультації та обговорення
              деталей вашого проекту. Разом з командою дизайнерів створимо для
              вас ідеальне рішення.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="#contact">Обговорити проект</Link>
            </Button>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
