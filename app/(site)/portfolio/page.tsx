import type { Metadata } from "next"
import PortfolioItem from "@/components/portfolio-item"
import JsonLd from "@/components/json-ld"
import AnimationWrapper from "@/components/animation-wrapper"
import SeoText from "@/components/seo-text"

interface Project {
  id: number
  slug: string
  title: string
  category: string
  image_src: string
  description: string
  technologies: string[]
  features: string[]
  year: string
  client: string
  website_url: string
  created_at: string
  updated_at: string
}

export const metadata: Metadata = {
  title: "Портфоліо | Oberemchuk Serhii - Професійна розробка вебсайтів",
  description: "Перегляньте наші останні проєкти та роботи. Професійна розробка вебсайтів від Oberemchuk Serhii.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Портфоліо | Oberemchuk Serhii - Професійна розробка вебсайтів",
    description: "Перегляньте наші останні проєкти та роботи. Професійна розробка вебсайтів від Oberemchuk Serhii.",
    url: "/portfolio",
  },
}

async function getProjects(): Promise<Project[]> {
  try {
    // Використовуємо відносний URL для внутрішнього API
    const response = await fetch("/api/projects", {
      cache: "no-store",
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        return data.data
      }
    }

    console.error("Failed to fetch projects:", response.status, response.statusText)
    return []
  } catch (error) {
    console.error("Помилка отримання проектів:", error)
    // Fallback: спробуємо отримати дані напряму з зовнішнього API
    try {
      const directResponse = await fetch("https://v0-adminca-bk.vercel.app/api/projects")
      if (directResponse.ok) {
        const directData = await directResponse.json()
        if (directData.success) {
          return directData.data
        }
      }
    } catch (fallbackError) {
      console.error("Fallback також не спрацював:", fallbackError)
    }
    return []
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Портфоліо | Oberemchuk Serhii - Професійна розробка вебсайтів",
    description: "Перегляньте наші останні проєкти та роботи. Професійна розробка вебсайтів від Oberemchuk Serhii.",
    url: "https://www.oberemchuk.site/portfolio",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `https://www.oberemchuk.site/portfolio/${project.slug}`,
          image: project.image_src,
          creator: {
            "@type": "Person",
            name: "Oberemchuk Serhii",
          },
        },
      })),
    },
  }

  return (
    <div className="container mx-auto py-12 md:py-24">
      <JsonLd data={jsonLd} />

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Наше портфоліо</h1>
        <p className="text-gray-500 md:text-xl/relaxed">
          Перегляньте наші останні проєкти та роботи. Кожен проєкт — це унікальне рішення, розроблене з урахуванням
          потреб клієнта.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <AnimationWrapper
              key={project.slug}
              animation="fade-in"
              delay={((index % 3) * 100) as 0 | 100 | 200 | 300 | 400 | 500}
            >
              <PortfolioItem
                slug={project.slug}
                imageSrc={project.image_src}
                title={project.title}
                category={project.category}
              />
            </AnimationWrapper>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Проєкти не знайдено</p>
          </div>
        )}
      </div>

      <SeoText title="Портфоліо веб-розробника">
        <p>
          Наше портфоліо демонструє широкий спектр проєктів, які ми успішно реалізували для клієнтів з різних галузей.
          Кожен проєкт у нашому портфоліо — це результат тісної співпраці з клієнтом, глибокого розуміння його потреб та
          застосування найкращих практик веб-розробки.
        </p>
        <p>
          Ми пишаємося тим, що створюємо не просто вебсайти, а ефективні інструменти для досягнення бізнес-цілей наших
          клієнтів. Наші роботи відрізняються якісним дизайном, зручним інтерфейсом, швидкістю завантаження та
          оптимізацією для пошукових систем.
        </p>
        <p>
          У нашому портфоліо ви знайдете різноманітні типи проєктів: корпоративні сайти, інтернет-магазини, лендінги,
          блоги, портфоліо та інші. Кожен з них має свої унікальні особливості та функціональність, розроблені
          відповідно до специфіки бізнесу клієнта.
        </p>
        <p>
          Ми використовуємо сучасні технології та інструменти для створення вебсайтів, які не лише виглядають
          привабливо, але й ефективно працюють на різних пристроях та в різних браузерах. Наші проєкти розробляються з
          урахуванням принципів адаптивного дизайну, що забезпечує оптимальне відображення на всіх типах пристроїв.
        </p>
        <p>
          Запрошуємо вас переглянути наше портфоліо та оцінити якість наших робіт. Якщо ви зацікавлені у співпраці або
          маєте питання щодо наших послуг, будь ласка, зв'яжіться з нами через форму контактів або за вказаними
          контактними даними.
        </p>
      </SeoText>
    </div>
  )
}
