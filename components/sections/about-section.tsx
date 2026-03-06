"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AnimationWrapper from "@/components/animation-wrapper";
import { Code, Palette, Search, Smartphone, Server } from "lucide-react";

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
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Git",
    "Figma",
  ];

  const skills = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Frontend розробка",
      description:
        "React, Next.js, TypeScript для створення інтерактивних інтерфейсів",
    },
    {
      icon: <Server className="w-8 h-8 text-red-600" />,
      title: "Backend розробка",
      description:
        "Node.js, Express.js, API розробка, бази даних PostgreSQL та MongoDB",
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "Співпраця з дизайнерами",
      description:
        "Тісна робота з UI/UX дизайнерами для створення красивих та функціональних інтерфейсів",
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
  ];

  const designProcess = [
    {
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      title: "Ідея та концепція",
      description: "Обговорюємо ваші потреби з дизайнером",
    },
    {
      icon: <Code className="w-6 h-6 text-blue-600" />,
      title: "Створення дизайну",
      description: "Дизайнер створює макети у Figma",
    },
    {
      icon: <Server className="w-6 h-6 text-red-600" />,
      title: "Розробка",
      description: "Я втілюю дизайн у функціональний код з backend логікою",
    },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <header className="text-center mb-16">
            <h2 id="about-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Про мене
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fullstack веб-розробник з пристрастю до створення якісних цифрових рішень
            </p>
          </header>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimationWrapper animation="slide-left">
            <article>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Моя історія</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Привіт! Мене звати Сергій, і я fullstack веб-розробник з України з понад 5 роками досвіду. Моя подорож
                  у світ веб-розробки почалася з цікавості до того, як працюють сайти, і переросла в справжню пристрасть
                  до створення цифрових рішень.
                </p>
                <p>
                  Я спеціалізуюся на повному циклі розробки - від frontend з використанням React та Next.js до backend з
                  Node.js та базами даних.
                  <strong className="text-gray-900"> Для створення дизайнів активно співпрацюю з талановитими UI/UX дизайнерами</strong>,
                  що дозволяє створювати комплексні рішення під ключ - від ідеї до готового продукту.
                </p>
                <p>
                  Мій підхід базується на розумінні потреб клієнта, увазі до деталей та прагненні до досконалості. Кожен
                  проєкт для мене - це можливість створити щось унікальне та корисне з повним технічним стеком.
                </p>
              </div>
            </article>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <dl className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <dd className="text-3xl font-bold text-blue-600 mb-2">50+</dd>
                  <dt className="text-gray-600">Проєктів</dt>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <dd className="text-3xl font-bold text-green-600 mb-2">40+</dd>
                  <dt className="text-gray-600">Клієнтів</dt>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <dd className="text-3xl font-bold text-purple-600 mb-2">5+</dd>
                  <dt className="text-gray-600">Років досвіду</dt>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <dd className="text-3xl font-bold text-orange-600 mb-2">100%</dd>
                  <dt className="text-gray-600">Якість</dt>
                </CardContent>
              </Card>
            </dl>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="fade-in">
          <section className="mb-16" aria-labelledby="skills-title">
            <h3 id="skills-title" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Мої навички
            </h3>
            <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {skills.map((skill) => (
                <li key={skill.title}>
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-0">
                      <article>
                        <div className="mb-4" aria-hidden="true">{skill.icon}</div>
                        <h4 className="font-semibold text-gray-900 mb-2">{skill.title}</h4>
                        <p className="text-sm text-gray-600">{skill.description}</p>
                      </article>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <section className="bg-white rounded-2xl p-8 mb-16" aria-labelledby="process-title">
            <h3 id="process-title" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Як я працюю з дизайнерами
            </h3>
            <ol className="grid md:grid-cols-3 gap-8">
              {designProcess.map((step) => (
                <li key={step.title} className="text-center">
                  <article>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto" aria-hidden="true">
                      {step.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </article>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-gray-600 max-w-2xl mx-auto">
              Співпрацюючи з професійними дизайнерами, створюю не просто функціональні сайти, а справжні цифрові
              продукти, які поєднують красу, зручність та ефективність.
            </p>
          </section>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <section className="text-center" aria-labelledby="tech-title">
            <h3 id="tech-title" className="text-2xl font-bold text-gray-900 mb-8">
              Технології, з якими працюю
            </h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant="secondary" className="text-sm py-2 px-4">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        </AnimationWrapper>
      </div>
    </section>
  );
}

