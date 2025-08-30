import type { Metadata } from "next"
import JsonLd from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Послуги | Serhii Oberemchuk - Веб-розробка та дизайн сайтів",
  description:
    "Повний спектр послуг з розробки вебсайтів від Serhii Oberemchuk: веб-дизайн, розробка, SEO оптимізація, технічна підтримка. Створюю сучасні, швидкі та функціональні сайти.",
  keywords:
    "веб-розробка, веб-дизайн, SEO оптимізація, адаптивний дизайн, інтеграції, технічна підтримка, Serhii Oberemchuk",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Послуги | Serhii Oberemchuk - Веб-розробка та дизайн сайтів",
    description:
      "Повний спектр послуг з розробки вебсайтів від Serhii Oberemchuk: веб-дизайн, розробка, SEO оптимізація, технічна підтримка. Створюю сучасні, швидкі та функціональні сайти.",
    url: "/services",
  },
}

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Послуги веб-розробника Serhii Oberemchuk",
    description: "Повний спектр послуг з розробки вебсайтів",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Веб-дизайн",
          description: "Створюю унікальний, сучасний дизайн, який відображає вашу індивідуальність та цінності бренду.",
          provider: {
            "@type": "Person",
            name: "Serhii Oberemchuk",
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
            "Розробляю функціональні вебсайти з чистим кодом, семантичною версткою та оптимальною швидкістю.",
          provider: {
            "@type": "Person",
            name: "Serhii Oberemchuk",
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
          description: "Оптимізую ваш сайт для пошукових систем, щоб збільшити органічний трафік та видимість.",
          provider: {
            "@type": "Person",
            name: "Serhii Oberemchuk",
          },
          url: "https://www.oberemchuk.site/services#seo",
        },
      },
    ],
  }

  return (
    <div className="container mx-auto py-12 md:py-24">
      <JsonLd data={jsonLd} />

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Мої послуги</h1>
        <p className="text-gray-500 md:text-xl/relaxed">
          Повний спектр послуг з розробки вебсайтів: від дизайну до запуску та підтримки. Створюю сучасні, швидкі та
          функціональні сайти, які допомагають вашому бізнесу зростати.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">Веб-дизайн</h3>
          <p className="text-gray-600 mb-4">
            Створюю унікальний, сучасний дизайн, який відображає вашу індивідуальність та цінності бренду. Кожен дизайн
            розробляється з урахуванням потреб цільової аудиторії.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• UI/UX дизайн</li>
            <li>• Адаптивний дизайн</li>
            <li>• Прототипування</li>
            <li>• Брендинг</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">Розробка</h3>
          <p className="text-gray-600 mb-4">
            Розробляю функціональні вебсайти з чистим кодом, семантичною версткою та оптимальною швидкістю. Використовую
            сучасні технології та фреймворки.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• React / Next.js</li>
            <li>• HTML5 / CSS3</li>
            <li>• JavaScript / TypeScript</li>
            <li>• Адаптивна верстка</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">SEO-оптимізація</h3>
          <p className="text-gray-600 mb-4">
            Оптимізую ваш сайт для пошукових систем, щоб збільшити органічний трафік та видимість. Використовую сучасні
            SEO-практики та інструменти.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Технічне SEO</li>
            <li>• Оптимізація контенту</li>
            <li>• Швидкість завантаження</li>
            <li>• Структуровані дані</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Готові почати проект?</h2>
        <p className="text-gray-600 mb-6">
          Зв'яжіться зі мною для обговорення вашого проекту та отримання персональної консультації.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Зв'язатися зі мною
        </a>
      </div>
    </div>
  )
}
