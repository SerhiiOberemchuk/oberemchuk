import type { Metadata } from "next";
import PortfolioItem from "@/components/portfolio-item";
import JsonLd from "@/components/json-ld";
import AnimationWrapper from "@/components/animation-wrapper";
import SeoText from "@/components/seo-text";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image_src: string;
  description: string;
  technologies: string[];
  features: string[];
  year: string;
  client: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}

export const metadata: Metadata = {
  title: "Портфоліо | Serhii Oberemchuk - Мої проєкти веб-розробки",
  description:
    "Перегляньте мої останні проєкти та роботи. Я створюю унікальні вебсайти для різних сфер бізнесу - від лендінгів до складних веб-додатків. Більше 50 успішних проектів.",
  keywords:
    "портфоліо веб-розробника, проєкти сайтів, веб-дизайн, Serhii Oberemchuk, приклади робіт, лендінги, інтернет-магазини, корпоративні сайти",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Портфоліо | Serhii Oberemchuk - Мої проєкти веб-розробки",
    description:
      "Перегляньте мої останні проєкти та роботи. Я створюю унікальні вебсайти для різних сфер бізнесу - від лендінгів до складних веб-додатків.",
    url: "/portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Портфоліо Serhii Oberemchuk - Веб-розробник",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Портфоліо | Serhii Oberemchuk - Мої проєкти веб-розробки",
    description:
      "Перегляньте мої останні проєкти та роботи. Більше 50 успішних проектів веб-розробки.",
  },
};

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      "https://v0-adminca-bk.vercel.app/api/projects",
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    }

    console.error(
      "Failed to fetch projects:",
      response.status,
      response.statusText,
    );
    return [];
  } catch (error) {
    console.error("Помилка отримання проектів:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Портфоліо | Serhii Oberemchuk - Мої проєкти веб-розробки",
    description:
      "Перегляньте мої останні проєкти та роботи. Я створюю унікальні вебсайти для різних сфер бізнесу.",
    url: "https://www.oberemchuk.site/portfolio",
    author: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
      url: "https://www.oberemchuk.site",
      jobTitle: "Web Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
    },
    publisher: {
      "@type": "Person",
      name: "Serhii Oberemchuk",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `https://www.oberemchuk.site/portfolio/${project.slug}`,
          image: project.image_src,
          dateCreated: project.created_at,
          dateModified: project.updated_at,
          creator: {
            "@type": "Person",
            name: "Serhii Oberemchuk",
          },
          genre: project.category,
          keywords: project.technologies.join(", "),
          about: project.category,
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Головна",
          item: "https://www.oberemchuk.site",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Портфоліо",
          item: "https://www.oberemchuk.site/portfolio",
        },
      ],
    },
  };

  return (
    <div className="container mx-auto py-12 md:py-24">
      <JsonLd data={jsonLd} />

      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Моє портфоліо
        </h1>
        <p className="text-gray-500 md:text-xl/relaxed">
          Перегляньте мої останні проєкти та роботи. Кожен проєкт — це унікальне
          рішення, розроблене з урахуванням потреб клієнта та сучасних
          веб-стандартів.
        </p>
      </header>

      <Suspense
        fallback={
          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-label="Завантаження проектів"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </section>
        }
      >
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label="Список проектів"
        >
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
        </section>
      </Suspense>

      <SeoText title="Портфоліо веб-розробника Serhii Oberemchuk">
        <p>
          Моє портфоліо демонструє широкий спектр проєктів, які я успішно
          реалізував для клієнтів з різних галузей. Кожен проєкт у моєму
          портфоліо — це результат тісної співпраці з клієнтом, глибокого
          розуміння його потреб та застосування найкращих практик веб-розробки.
        </p>
        <p>
          Я пишаюся тим, що створюю не просто вебсайти, а ефективні інструменти
          для досягнення бізнес-цілей моїх клієнтів. Мої роботи відрізняються
          якісним дизайном, зручним інтерфейсом, швидкістю завантаження та
          оптимізацією для пошукових систем.
        </p>
        <p>
          У моєму портфоліо ви знайдете різноманітні типи проєктів: корпоративні
          сайти, інтернет-магазини, лендінги, блоги, портфоліо та інші. Кожен з
          них має свої унікальні особливості та функціональність, розроблені
          відповідно до специфіки бізнесу клієнта.
        </p>
        <p>
          Я використовую сучасні технології та інструменти для створення
          вебсайтів, які не лише виглядають привабливо, але й ефективно працюють
          на різних пристроях та в різних браузерах. Мої проєкти розробляються з
          урахуванням принципів адаптивного дизайну, що забезпечує оптимальне
          відображення на всіх типах пристроїв.
        </p>
        <p>
          Запрошую вас переглянути моє портфоліо та оцінити якість моїх робіт.
          Якщо ви зацікавлені у співпраці або маєте питання щодо моїх послуг,
          будь ласка, зв'яжіться зі мною через форму контактів або за вказаними
          контактними даними.
        </p>
      </SeoText>
    </div>
  );
}
