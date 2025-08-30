"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Calendar, Award } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"

export default function AboutSection() {
  const stats = [
    {
      icon: CheckCircle,
      number: "30+",
      label: "Завершених проектів",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      number: "20+",
      label: "Задоволених клієнтів",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Calendar,
      number: "3+",
      label: "Років досвіду",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Award,
      number: "100%",
      label: "Якість гарантована",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

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
    "MongoDB",
    "Git",
    "Figma",
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Про мене</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Я веб-розробник з України з понад 3-річним досвідом створення сучасних та функціональних вебсайтів
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimationWrapper animation="slide-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Моя історія</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Почав свій шлях у веб-розробці 3 роки тому, коли зрозумів, що технології можуть змінювати бізнес та життя людей. За цей час я створив понад 30 проектів для клієнтів з різних сфер.
                </p>
                <p>
                  Спеціалізуюся на створенні швидких, сучасних вебсайтів з використанням найновіших технологій.
                  Співпрацюю з талановитими дизайнерами, щоб забезпечити не тільки технічну досконалість, але й
                  привабливий дизайн.
                </p>
                <p>
                  Мій підхід - це поєднання технічної експертизи, креативності та уваги до деталей. Я завжди прислухаюся
                  до потреб клієнтів та створюю рішення, які допомагають їхньому бізнесу рости.
                </p>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Статистика</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="text-center">
                        <div
                          className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}
                        >
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="fade-in">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Технології, з якими працюю</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
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
