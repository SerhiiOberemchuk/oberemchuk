"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Zap, Award } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"

export default function AboutSection() {
  const skills = [
    {
      icon: Code,
      title: "Frontend розробка",
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      icon: Users,
      title: "Співпраця з дизайнерами",
      description: "Тісна робота з UI/UX дизайнерами для ідеального результату",
    },
    {
      icon: Zap,
      title: "Швидка розробка",
      description: "Ефективні рішення з дотриманням всіх термінів",
    },
    {
      icon: Award,
      title: "Якість гарантована",
      description: "Тестування, оптимізація та підтримка проектів",
    },
  ]

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "HTML5",
    "CSS3",
    "Git",
    "Figma",
    "Responsive Design",
  ]

  const designProcess = [
    {
      step: "1",
      title: "Аналіз вимог",
      description: "Разом з дизайнером аналізуємо ваші потреби та цілі",
    },
    {
      step: "2",
      title: "Створення дизайну",
      description: "Дизайнер створює макети, я консультую по технічній частині",
    },
    {
      step: "3",
      title: "Розробка",
      description: "Втілюю дизайн в життя з використанням сучасних технологій",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Про мене
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Веб-розробник з досвідом 5+ років</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Привіт! Я Сергій Оберемчук, веб-розробник з України. Спеціалізуюся на створенні сучасних веб-сайтів та
              веб-додатків. Для створення унікальних дизайнів співпрацюю з талановитими UI/UX дизайнерами, що дозволяє
              створювати проекти під ключ - від ідеї до готового продукту.
            </p>
          </div>
        </AnimationWrapper>

        {/* Stats */}
        <AnimationWrapper delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Завершених проектів</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">40+</div>
              <div className="text-gray-600">Задоволених клієнтів</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">5+</div>
              <div className="text-gray-600">Років досвіду</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Якість гарантована</div>
            </div>
          </div>
        </AnimationWrapper>

        {/* Skills */}
        <AnimationWrapper delay={0.3}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skills.map((skill, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <skill.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimationWrapper>

        {/* Design Process */}
        <AnimationWrapper delay={0.4}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Як ми працюємо з дизайнерами</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {designProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {process.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{process.title}</h4>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimationWrapper>

        {/* Technologies */}
        <AnimationWrapper delay={0.5}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Технології, з якими працюю</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
