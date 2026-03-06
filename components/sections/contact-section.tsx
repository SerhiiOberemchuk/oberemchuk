"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import AnimationWrapper from "@/components/animation-wrapper";
import ContactForm from "@/components/contact-form";
import Link from "next/link";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: "Mail",
      label: "Email",
      value: "serhiioberemchuk@gmail.com",
      href: "mailto:serhii.oberemchuk@gmail.com",
    },
    {
      icon: "MessageCircle",
      label: "Telegram",
      value: "@SerhiiOberemchuk",
      href: "https://t.me/SerhiiOberemchuk",
    },
    {
      icon: "MapPin",
      label: "Локація",
      value: "Італія",
      href: null,
    },
    {
      icon: "Clock",
      label: "Час роботи",
      value: "Пн-Пт 9:00-18:00",
      href: null,
    },
  ];

  const advantages = [
    "Безкоштовна консультація",
    "Співпраця з дизайнерами",
    "Гарантія якості",
    "Підтримка після запуску",
  ];

  const specializations = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return <Mail className="h-5 w-5" />;
      case "MessageCircle":
        return <MessageCircle className="h-5 w-5" />;
      case "MapPin":
        return <MapPin className="h-5 w-5" />;
      case "Clock":
        return <Clock className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <header className="text-center mb-16">
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Зв'яжіться зі мною
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Готовий обговорити ваш проєкт та створити щось неймовірне разом з командою дизайнерів
            </p>
          </header>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimationWrapper animation="slide-left">
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Контактна інформація</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4" aria-label="Способи зв'язку">
                    {contactInfo.map((info) => (
                      <li key={info.label} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                          {getIcon(info.icon)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{info.label}</p>
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
                            <p className="text-gray-600">{info.value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">Чому обирають мене</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-4">
                    {advantages.map((advantage) => (
                      <li key={advantage} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>
                        <span className="text-sm text-gray-600">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Спеціалізації</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2" aria-label="Технології">
                    {specializations.map((spec) => (
                      <li key={spec}>
                        <Badge variant="secondary">{spec}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href="mailto:serhii.oberemchuk@gmail.com">Написати email</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="https://t.me/SerhiiOberemchuk" target="_blank" rel="noopener noreferrer">
                    Написати в Telegram
                  </Link>
                </Button>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Розкажіть про свій проєкт</CardTitle>
                <p className="text-gray-600">
                  Заповніть форму, і я зв'яжуся з вами протягом 24 годин для обговорення деталей
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}

