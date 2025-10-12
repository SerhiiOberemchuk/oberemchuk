import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services-section";
import ContactSection from "@/components/sections/contact-section";
import FaqSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Serhii Oberemchuk - Веб-розробник | Створення сайтів та веб-додатків",
  description:
    "Професійна розробка сайтів та веб-додатків. Створюю сучасні, швидкі та SEO-оптимізовані вебсайти. Більше 5 років досвіду, 50+ успішних проектів.",
  keywords:
    "веб-розробник, створення сайтів, розробка веб-додатків, лендінги, інтернет-магазини, корпоративні сайти, SEO оптимізація, Serhii Oberemchuk",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Serhii Oberemchuk - Веб-розробник | Створення сайтів та веб-додатків",
    description:
      "Професійна розробка сайтів та веб-додатків. Створюю сучасні, швидкі та SEO-оптимізовані вебсайти. Більше 5 років досвіду.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serhii Oberemchuk - Веб-розробник",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serhii Oberemchuk - Веб-розробник",
    description:
      "Професійна розробка сайтів та веб-додатків. Більше 5 років досвіду, 50+ успішних проектів.",
  },
};

const faqs = [
  {
    question: "Скільки часу займає розробка сайту?",
    answer:
      "Час розробки залежить від складності проекту. Простий лендінг - 1-2 тижні, корпоративний сайт - 2-4 тижні, інтернет-магазин - 4-8 тижнів. Точні терміни обговорюємо після аналізу вимог.",
  },
  {
    question: "Чи включена SEO оптимізація в розробку?",
    answer:
      "Так, базова SEO оптимізація включена в усі мої проекти: правильна структура HTML, мета-теги, швидкість завантаження, адаптивність. Додаткові SEO послуги обговорюються окремо.",
  },
  {
    question: "Чи надаєте ви підтримку після запуску сайту?",
    answer:
      "Так, я надаю технічну підтримку протягом 1 місяця після запуску безкоштовно. Далі можемо укласти договір на постійну підтримку та оновлення контенту.",
  },
  {
    question: "Які технології ви використовуєте?",
    answer:
      "Я працюю з сучасними технологіями: React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB. Вибір технологій залежить від специфіки проекту та ваших потреб.",
  },
  {
    question: "Чи можете працювати з готовим дизайном?",
    answer:
      "Так, я можу реалізувати ваш готовий дизайн або працювати з дизайнером у команді. Також можу запропонувати власні дизайнерські рішення, якщо потрібно.",
  },
  {
    question: "Яка вартість розробки сайту?",
    answer:
      "Вартість залежить від складності та функціоналу. Лендінг від $500, корпоративний сайт від $1000, інтернет-магазин від $1500. Точну ціну розраховую після обговорення деталей проекту.",
  },
];

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Serhii Oberemchuk",
    jobTitle: "Web Developer",
    description:
      "Професійний веб-розробник з досвідом створення сучасних сайтів та веб-додатків",
    url: "https://www.oberemchuk.site",
    sameAs: [
      "https://www.linkedin.com/in/serhii-oberemchuk",
      "https://github.com/oberemchuk",
      "https://t.me/oberemchuk",
    ],
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "SEO",
      "Frontend Development",
      "Backend Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Web Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Ukraine",
      },
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "SEO",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Serhii Oberemchuk - Веб-розробник",
    description: "Професійна розробка сайтів та веб-додатків",
    url: "https://www.oberemchuk.site",
    author: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.oberemchuk.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Serhii Oberemchuk - Web Development Services",
    description:
      "Професійні послуги веб-розробки: створення сайтів, веб-додатків, SEO оптимізація",
    url: "https://www.oberemchuk.site",
    telephone: "+393516648498",
    email: "hello@oberemchuk.site",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UA",
      addressRegion: "Ukraine",
    },
    serviceType: "Web Development",
    provider: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
    },
    areaServed: {
      "@type": "Country",
      name: "Ukraine",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page Development",
            description: "Створення ефективних лендінгів",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Website Development",
            description: "Розробка корпоративних сайтів",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Development",
            description: "Створення інтернет-магазинів",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <FaqSection
        title="Часті запитання"
        subtitle="Відповіді на найпоширеніші питання про розробку вебсайтів"
        faqs={faqs}
      />
    </>
  );
}
