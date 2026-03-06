import type { Metadata } from "next";
import ServiceCard from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Code, Palette, Search, Smartphone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Послуги",
  description:
    "Послуги веб-розробника Serhii Oberemchuk: розробка лендінгів, корпоративних сайтів, інтернет-магазинів, SEO оптимізація. Професійний підхід та сучасні технології.",
  keywords: [
    "послуги веб-розробника",
    "розробка лендінгів",
    "корпоративні сайти",
    "інтернет-магазини",
    "SEO оптимізація",
    "веб-дизайн",
    "адаптивний дизайн",
    "ціни на розробку сайтів",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Послуги - Serhii Oberemchuk",
    description:
      "Послуги веб-розробника: розробка лендінгів, корпоративних сайтів, інтернет-магазинів, SEO оптимізація.",
    url: "/services",
    type: "website",
  },
};

const services = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Лендінг",
    description: "Односторінковий сайт для презентації товару або послуги",
    price: "від $300",
    features: [
      "Адаптивний дизайн",
      "SEO оптимізація",
      "Форма зворотного зв'язку",
      "Швидке завантаження",
    ],
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Дизайн + Розробка",
    description: "Повний цикл створення сайту від ідеї до реалізації",
    price: "від $800",
    features: ["Унікальний дизайн", "Розробка з нуля", "Адаптивність", "CMS інтеграція"],
    popular: true,
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Корпоративний сайт",
    description: "Багатосторінковий сайт для представлення компанії",
    price: "від $600",
    features: ["Багато сторінок", "Система управління", "Інтеграція з соцмережами", "Аналітика"],
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "SEO оптимізація",
    description: "Покращення позицій сайту в пошукових системах",
    price: "від $200",
    features: ["Технічний аудит", "Оптимізація контенту", "Мета-теги", "Швидкість завантаження"],
  },
];

const advantages = [
  {
    title: "Індивідуальний підхід",
    description:
      "Кожен проєкт розробляється з урахуванням специфіки вашого бізнесу",
  },
  {
    title: "Сучасні технології",
    description:
      "Використовую найновіші технології для створення швидких сайтів",
  },
  {
    title: "Підтримка після запуску",
    description:
      "Надаю технічну підтримку та консультації після завершення проєкту",
  },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Послуги веб-розробки",
  description:
    "Професійні послуги веб-розробки: лендінги, корпоративні сайти, інтернет-магазини, SEO оптимізація",
  provider: {
    "@type": "Person",
    name: "Serhii Oberemchuk",
    url: "https://www.oberemchuk.site",
  },
  areaServed: "Ukraine",
  serviceType: "Web Development",
  offers: services.map((service) => ({
    "@type": "Offer",
    name: service.title,
    description: service.description,
    price: service.price,
    priceCurrency: "USD",
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <article className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Мої послуги
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Створюю сучасні та функціональні вебсайти, які допомагають вашому
              бізнесу зростати
            </p>
          </header>

          <section aria-labelledby="services-catalog-title" className="mb-16">
            <h2 id="services-catalog-title" className="sr-only">
              Каталог послуг
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-label="Перелік послуг">
              {services.map((service) => (
                <li key={service.title}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl p-8 mb-16" aria-labelledby="advantages-title">
            <h2 id="advantages-title" className="text-3xl font-bold text-center text-gray-900 mb-12">
              Чому обирають мене
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage) => (
                <li key={advantage.title} className="text-center">
                  <article>
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="text-center" aria-labelledby="services-cta-title">
            <h2 id="services-cta-title" className="text-3xl font-bold text-gray-900 mb-4">
              Готові почати проєкт?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Зв'яжіться зі мною для обговорення деталей вашого проєкту
            </p>
            <Link href="/#contact">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Замовити консультацію
              </Button>
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}

