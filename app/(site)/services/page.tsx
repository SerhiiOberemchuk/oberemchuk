import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Послуги | Oberemchuk Serhii - Професійна розробка вебсайтів",
  description:
    "Повний спектр послуг з розробки вебсайтів: від дизайну до запуску та підтримки. Створюємо сучасні, швидкі та функціональні сайти.",
  keywords:
    "веб-розробка, веб-дизайн, SEO оптимізація, адаптивний дизайн, інтеграції, технічна підтримка",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Послуги | Oberemchuk Serhii - Професійна розробка вебсайтів",
    description:
      "Повний спектр послуг з розробки вебсайтів: від дизайну до запуску та підтримки. Створюємо сучасні, швидкі та функціональні сайти.",
    url: "/services",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Веб-дизайн",
          description:
            "Створюємо унікальний, сучасний дизайн, який відображає вашу індивідуальність та цінності бренду.",
          provider: {
            "@type": "ProfessionalService",
            name: "Oberemchuk Serhii",
          },
          url: "https://www.oberemchuk.site/services#web-design",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Розробка",
          description:
            "Розробляємо функціональні вебсайти з чистим кодом, семантичною версткою та оптимальною швидкістю.",
          provider: {
            "@type": "ProfessionalService",
            name: "Oberemchuk Serhii",
          },
          url: "https://www.oberemchuk.site/services#development",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "SEO-оптимізація",
          description:
            "Оптимізуємо ваш сайт для пошукових систем, щоб збільшити органічний трафік та видимість.",
          provider: {
            "@type": "ProfessionalService",
            name: "Oberemchuk Serhii",
          },
          url: "https://www.oberemchuk.site/services#seo",
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-12 md:py-24">
      <JsonLd data={jsonLd} />
      {/* Решта коду залишається без змін */}
    </div>
  );
}
