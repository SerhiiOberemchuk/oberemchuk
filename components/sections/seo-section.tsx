"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Palette,
  Search,
  Smartphone,
  Zap,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Target,
  Award,
} from "lucide-react";
import AnimationWrapper from "@/components/animation-wrapper";
import SmoothScrollLink from "@/components/smooth-scroll-link";

export default function SeoSection() {
  const benefits = [
    {
      icon: "Code",
      title: "Сучасні технології",
      description:
        "Використовую React, Next.js, TypeScript та інші передові технології для створення швидких та надійних сайтів",
    },
    {
      icon: "Palette",
      title: "Співпраця з дизайнерами",
      description:
        "Працюю в команді з талановитими UI/UX дизайнерами для створення унікальних та ефективних рішень",
    },
    {
      icon: "Search",
      title: "SEO-оптимізація",
      description:
        "Кожен сайт оптимізую для пошукових систем з самого початку розробки для кращої видимості",
    },
    {
      icon: "Smartphone",
      title: "Мобільна адаптація",
      description:
        "Всі мої сайти ідеально працюють на будь-яких пристроях - від смартфонів до великих моніторів",
    },
    {
      icon: "Zap",
      title: "Швидкість завантаження",
      description:
        "Оптимізую код та зображення для забезпечення блискавичної швидкості завантаження сторінок",
    },
    {
      icon: "Users",
      title: "Індивідуальний підхід",
      description:
        "Кожен проект унікальний - я детально вивчаю ваші потреби та створюю персоналізоване рішення",
    },
  ];

  const stats = [
    { icon: "Target", number: "50+", label: "Успішних проектів" },
    { icon: "Users", number: "40+", label: "Задоволених клієнтів" },
    { icon: "Award", number: "5+", label: "Років досвіду" },
    { icon: "Globe", number: "100%", label: "Якість виконання" },
  ];

  const services = [
    "Лендінг сторінки",
    "Корпоративні сайти",
    "Інтернет-магазини",
    "Веб-додатки",
    "Портфоліо сайти",
    "Блоги та новинні сайти",
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-6 w-6 text-blue-600" />;
      case "Palette":
        return <Palette className="h-6 w-6 text-green-600" />;
      case "Search":
        return <Search className="h-6 w-6 text-purple-600" />;
      case "Smartphone":
        return <Smartphone className="h-6 w-6 text-orange-600" />;
      case "Zap":
        return <Zap className="h-6 w-6 text-yellow-600" />;
      case "Users":
        return <Users className="h-6 w-6 text-pink-600" />;
      case "Target":
        return <Target className="h-8 w-8 text-blue-600" />;
      case "Award":
        return <Award className="h-8 w-8 text-green-600" />;
      case "Globe":
        return <Globe className="h-8 w-8 text-purple-600" />;
      default:
        return <Code className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <section className="py-24 bg-linear-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">
              Професійна розробка
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Веб-розробник з України - Serhii Oberemchuk
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Я створюю сучасні, швидкі та функціональні вебсайти, які
              допомагають бізнесу рости та залучати нових клієнтів. Як
              досвідчений веб-розробник, я поєдную технічну експертизу з
              креативним підходом для досягнення найкращих результатів.
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <AnimationWrapper animation="slide-left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Чому обирають мене?
                </h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                        {getIcon(benefit.icon)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="space-y-8">
              <Card className="p-6 bg-white shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Мої досягнення
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          {getIcon(stat.icon)}
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Типи сайтів, які я створюю:
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="slide-up" delay={400}>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Мій підхід до роботи
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Як індивідуальний веб-розробник, я надаю персональну увагу
                кожному проекту. Я детально вивчаю ваші потреби, співпрацюю з
                професійними дизайнерами при необхідності, та створюю рішення,
                яке ідеально підходить саме вашому бізнесу. Мій досвід у
                створенні понад 50 проектів дозволяє мені швидко знаходити
                оптимальні рішення для будь-яких завдань.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="px-4 py-2">
                  React & Next.js
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  Tailwind CSS
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  Node.js
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  PostgreSQL
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  SEO
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  <SmoothScrollLink href="#contact">
                    Почати співпрацю
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </SmoothScrollLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <SmoothScrollLink href="#services">
                    Дізнатися більше
                  </SmoothScrollLink>
                </Button>
              </div>
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="fade-in" delay={600}>
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Якість гарантована
                </h4>
                <p className="text-gray-600 text-sm text-center">
                  Кожен проект проходить ретельне тестування та оптимізацію
                  перед здачею
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Дотримання термінів
                </h4>
                <p className="text-gray-600 text-sm text-center">
                  Завжди здаю проекти вчасно згідно з узгодженим планом роботи
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Підтримка після запуску
                </h4>
                <p className="text-gray-600 text-sm text-center">
                  Надаю технічну підтримку та консультації після завершення
                  проекту
                </p>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
