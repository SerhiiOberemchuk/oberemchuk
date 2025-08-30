"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import AnimationWrapper from "@/components/animation-wrapper"
import { Code, Palette, Search, Smartphone, Lightbulb } from "lucide-react"

export default function AboutSection() {
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Git",
    "Figma",
    "Photoshop",
  ]

  const skills = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Frontend розробка",
      description: "React, Next.js, TypeScript для створення інтерактивних інтерфейсів",
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "Співпраця з дизайнерами",
      description: "Тісна робота з UI/UX дизайнерами для створення красивих та функціональних інтерфейсів",
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: "SEO оптимізація",
      description: "Технічна оптимізація для кращого ранжування в пошукових системах",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      title: "Адаптивний дизайн",
      description: "Ідеальне відображення на всіх пристроях та розмірах екранів",
    },
  ]

  const designProcess = [
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
      title: "Ідея та концепція",
      description: "Обговорюємо ваші потреби з дизайнером",
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      title: "Створення дизайну",
      description: "Дизайнер створює макети у Figma",
    },
    {
      icon: <Code className="w-6 h-6 text-blue-600" />,
      title: "Розробка",
      description: "Я втілюю дизайн у функціональний код",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Про мене</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Веб-розробник з пристрастю до створення якісних цифрових рішень
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimationWrapper animation="slide-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Моя історія</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Привіт! Мене звати Сергій, і я веб-розробник з України з понад 5 роками досвіду. Моя подорож у світ
                  веб-розробки почалася з цікавості до того, як працюють сайти, і переросла в справжню пристрасть до
                  створення цифрових рішень.
                </p>
                <p>
                  Я спеціалізуюся на frontend розробці з використанням сучасних технологій як React та Next.js.
                  <strong className="text-gray-900">
                    {" "}
                    Для створення дизайнів активно співпрацюю з талановитими UI/UX дизайнерами
                  </strong>
                  , що дозволяє створювати комплексні рішення під ключ - від ідеї до готового продукту.
                </p>
                <p>
                  Мій підхід базується на розумінні потреб клієнта, увазі до деталей та прагненні до досконалості. Кожен
                  проект для мене - це можливість створити щось унікальне та корисне.
                </p>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Проектів</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-green-600 mb-2">40+</div>
                  <div className="text-gray-600">Клієнтів</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-gray-600">Років досвіду</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-gray-600">Якість</div>
                </CardContent>
              </Card>
            </div>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="fade-in">
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Мої навички</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">{skill.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{skill.title}</h4>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <div className="bg-white rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Як я працюю з дизайнерами</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {designProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Співпрацюючи з професійними дизайнерами, створюю не просто функціональні сайти, а справжні цифрові шедеври, які поєднують красу, зручність та ефективність.
              </p>
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Технології з якими працюю</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
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
