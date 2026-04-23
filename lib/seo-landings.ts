export type Locale = "uk" | "en";

export type SeoLanding = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  searchIntent: string;
  offerSummary: string;
  idealFor: string[];
  benefits: string[];
  deliverables: string[];
  faq: Array<{question: string; answer: string}>;
  relatedServiceSlugs: string[];
  relatedPostSlugs: string[];
  updatedAt: string;
};

const seoLandingsByLocale: Record<Locale, SeoLanding[]> = {
  uk: [
    {
      slug: "website-development-europe",
      title: "Розробка сайтів для бізнесу в Європі",
      metaTitle: "Розробка сайтів для бізнесу в Європі",
      metaDescription:
        "Розробка сайтів для компаній, сервісного бізнесу, SaaS і локальних брендів у Європі. Сильна структура, SEO-ready база, швидкість і комерційна подача.",
      heroTitle: "Сайт для бізнесу в Європі, який працює на довіру, заявки й ріст",
      heroDescription:
        "Ця сторінка закриває пошуковий намір, коли бізнесу потрібен не просто виконавець, а технічний партнер для запуску сильного сайту під продажі, рекламу, SEO і масштабування.",
      searchIntent: "Розробка сайту під ключ, website development Europe, створення сайту для компанії, B2B website Europe",
      offerSummary:
        "Підходить для компаній, яким потрібна комерційна структура, сильна подача послуг, технічна надійність і база для окремих SEO-сторінок під ріст пошуку.",
      idealFor: [
        "сервісних компаній і B2B бізнесу",
        "експертних послуг і консалтингу",
        "локальних бізнесів, що виходять на міжнародний ринок",
        "брендів, яким потрібен сильний перезапуск сайту"
      ],
      benefits: [
        "чітка структура сторінок під заявки й довіру",
        "сайт готовий до реклами, SEO і запуску нових сторінок",
        "контрольований обсяг робіт і технічна база без боргу",
        "сильніша комерційна подача замість шаблонної вітрини"
      ],
      deliverables: [
        "архітектура сайту й логіка сторінок",
        "інтерфейсна реалізація на React / Next.js",
        "метадані, schema.org, sitemap і внутрішня перелінковка",
        "форми, аналітика, події і launch-ready технічна база"
      ],
      faq: [
        {
          question: "Чим ця сторінка відрізняється від звичайної сторінки послуг?",
          answer:
            "Вона заточена під пошуковий намір і пояснює конкретний формат задачі: розробка сайту для бізнесу в Європі, з акцентом на структуру, довіру і технічну готовність до росту."
        },
        {
          question: "Чи це тільки для нових сайтів?",
          answer:
            "Ні. Такий формат підходить і для перезапуску або редизайну, якщо існуючий сайт уже не підтримує продажі, SEO або нове позиціонування."
        }
      ],
      relatedServiceSlugs: ["corporate-websites", "landing-pages", "seo-optimization"],
      relatedPostSlugs: ["website-structure-for-leads", "seo-ready-website-launch"],
      updatedAt: "2026-04-23"
    },
    {
      slug: "nextjs-development-europe",
      title: "Next.js розробка для сайтів і веб-продуктів",
      metaTitle: "Next.js розробка для бізнесу в Європі",
      metaDescription:
        "Next.js розробка для посадкових сторінок, корпоративних сайтів, e-commerce і веб-додатків. Швидкість, SEO-ready структура, масштабована архітектура і чистий фронтенд.",
      heroTitle: "Next.js розробка для бізнесу, якому важливі швидкість, SEO і масштабування",
      heroDescription:
        "Сторінка під пошукові запити на кшталт Next.js developer Europe або Next.js development services. Тут акцент не на фреймворку як такому, а на тому, що він дає бізнесу на рівні продукту й росту.",
      searchIntent: "Next.js developer Europe, Next.js development services, React / Next.js developer, frontend partner for business websites",
      offerSummary:
        "Підходить, коли потрібна сучасна стекова база для швидких сайтів, SEO-friendly сторінок, кастомної вітрини магазину або продуктового інтерфейсу.",
      idealFor: [
        "посадкових сторінок під рекламу і перевірку попиту",
        "корпоративних сайтів з багатьма сторінками",
        "e-commerce вітрини і кастомних інтеграцій",
        "кабінетів, дашбордів і MVP веб-додатка"
      ],
      benefits: [
        "висока швидкість і контрольована production-збірка",
        "краща база під технічне SEO і Core Web Vitals",
        "масштабована компонентна архітектура",
        "готовність до локалізацій, нових сторінок і інтеграцій"
      ],
      deliverables: [
        "фронтенд-архітектура на React / Next.js",
        "маршрутизація, система макетів і повторно використовувані компоненти",
        "SEO-метадані, schema.org і структурований контентний шар",
        "форми, API-зв'язки, аналітика і оптимізація рендерингу"
      ],
      faq: [
        {
          question: "Коли Next.js дійсно виправданий?",
          answer:
            "Коли важливі SEO, швидкість, компонентна масштабованість і контроль над продуктом. Для маркетингових сайтів і web app це часто один з найкращих варіантів."
        },
        {
          question: "Чи підходить це тільки під фронтенд?",
          answer:
            "Ні. Можна працювати як на фронтенд-шарі, так і пов'язувати його з API, CMS, CRM або вашим бекенд-контуром."
        }
      ],
      relatedServiceSlugs: ["landing-pages", "web-app-development", "seo-optimization"],
      relatedPostSlugs: ["nextjs-for-business-websites", "seo-ready-website-launch"],
      updatedAt: "2026-04-23"
    },
    {
      slug: "website-redesign-seo-migration",
      title: "Редизайн сайту без втрати SEO-основи",
      metaTitle: "Редизайн сайту без втрати SEO і структури",
      metaDescription:
        "Редизайн або перезапуск сайту без руйнування SEO-основи: нова структура, міграція сторінок, метадані, редіректи, sitemap, внутрішні посилання і технічний контроль.",
      heroTitle: "Редизайн сайту без втрати важливих сторінок, структури й SEO-бази",
      heroDescription:
        "Це посадкова сторінка під намір, коли бізнесу потрібен редизайн або перезапуск, але не хочеться втратити індексацію, сторінки, трафік і зрозумілу комерційну структуру.",
      searchIntent: "website redesign SEO migration, redesign without losing SEO, relaunch website structure, technical SEO migration",
      offerSummary:
        "Фокус на тому, щоб оновити подачу і систему сторінок без хаотичних втрат у структурі, редіректах, метаданих і пошуковій видимості.",
      idealFor: [
        "сайтів, які морально застаріли",
        "проєктів після ребрендингу або зміни позиціонування",
        "бізнесу, який переносить сайт на Next.js",
        "компаній, яким потрібно додати нові SEO-сторінки без ламання старої бази"
      ],
      benefits: [
        "контроль над міграцією URL і сторінок",
        "чисті redirects, metadata і перелінковка",
        "сильніша структура без втрати важливого попереднього шару",
        "нова система готова до SEO і росту після перезапуску"
      ],
      deliverables: [
        "мапа старих і нових сторінок",
        "план редіректів і canonical-логіка",
        "оновлена структура сторінок і технічна SEO-база",
        "контрольований перезапуск із sitemap, schema і перевіркою індексації"
      ],
      faq: [
        {
          question: "Чи можна оновити сайт без повного зносу старої структури?",
          answer:
            "Так. Найсильніший сценарій часто не в повному перезапуску з нуля, а в контрольованому перенесенні цінних сторінок і запитів у нову архітектуру."
        },
        {
          question: "Що найчастіше ламають при перезапуску?",
          answer:
            "URL-структуру, редіректи, titles, canonical, sitemap, внутрішні посилання і логіку того, які сторінки взагалі повинні залишитися в індексі."
        }
      ],
      relatedServiceSlugs: ["corporate-websites", "seo-optimization", "web-app-development"],
      relatedPostSlugs: ["website-redesign-without-losing-seo", "website-structure-for-leads"],
      updatedAt: "2026-04-23"
    }
  ],
  en: [
    {
      slug: "website-development-europe",
      title: "Website development for businesses in Europe",
      metaTitle: "Website development for businesses in Europe",
      metaDescription:
        "Website development for service companies, SaaS teams and local brands in Europe. Strong structure, SEO-ready foundation, speed and commercial messaging.",
      heroTitle: "A business website for Europe that supports trust, inquiries and growth",
      heroDescription:
        "This page targets search intent where a company does not need a generic freelancer profile, but a technical partner who can launch a strong website ready for sales, ads, SEO and scale.",
      searchIntent: "website development Europe, company website development, B2B website Europe, end-to-end website build",
      offerSummary:
        "A fit for companies that need a commercial structure, stronger service presentation, technical reliability and a base for dedicated SEO pages as they grow.",
      idealFor: [
        "service companies and B2B businesses",
        "expert businesses and consulting firms",
        "local brands entering international markets",
        "teams planning a stronger website relaunch"
      ],
      benefits: [
        "clear page structure built for inquiries and trust",
        "ready for ads, SEO and future page expansion",
        "controlled scope and a technical base without debt",
        "commercial messaging instead of a generic brochure feel"
      ],
      deliverables: [
        "website architecture and page logic",
        "React / Next.js implementation",
        "metadata, schema.org, sitemap and internal linking",
        "forms, analytics, events and launch-ready technical setup"
      ],
      faq: [
        {
          question: "How is this different from a standard service page?",
          answer:
            "This page is built around a specific search intent and explains one exact business scenario: website development for companies in Europe, with a strong focus on structure, trust and technical growth readiness."
        },
        {
          question: "Is this only for brand-new websites?",
          answer:
            "No. It also fits relaunch and redesign projects when the current website no longer supports sales, SEO or the company’s positioning."
        }
      ],
      relatedServiceSlugs: ["corporate-websites", "landing-pages", "seo-optimization"],
      relatedPostSlugs: ["website-structure-for-leads", "seo-ready-website-launch"],
      updatedAt: "2026-04-23"
    },
    {
      slug: "nextjs-development-europe",
      title: "Next.js development for websites and web products",
      metaTitle: "Next.js development for businesses in Europe",
      metaDescription:
        "Next.js development for landing pages, corporate websites, e-commerce and web applications. Speed, SEO-ready architecture, scalability and clean front-end execution.",
      heroTitle: "Next.js development for businesses that care about speed, SEO and scale",
      heroDescription:
        "This page targets intent such as Next.js developer Europe or Next.js development services. The point is not the framework alone, but the business outcome it enables across product, performance and growth.",
      searchIntent: "Next.js developer Europe, Next.js development services, React / Next.js developer, frontend partner for business websites",
      offerSummary:
        "A strong fit when you need a modern technical base for fast websites, SEO-friendly pages, a custom storefront or a scalable product interface.",
      idealFor: [
        "landing pages for ads and demand validation",
        "multi-page corporate websites",
        "e-commerce storefronts and custom integrations",
        "portals, dashboards and web app MVPs"
      ],
      benefits: [
        "high speed and controlled production quality",
        "stronger base for technical SEO and Core Web Vitals",
        "scalable component architecture",
        "ready for localization, new pages and integrations"
      ],
      deliverables: [
        "front-end architecture with React / Next.js",
        "routing, layout system and reusable components",
        "SEO metadata, schema.org and structured content layer",
        "forms, API integrations, analytics and render optimization"
      ],
      faq: [
        {
          question: "When is Next.js actually justified?",
          answer:
            "When SEO, speed, component scalability and product control matter. For marketing websites and web apps, it is often one of the strongest stacks available."
        },
        {
          question: "Is this only a front-end offer?",
          answer:
            "No. It can stay focused on the front-end layer, or connect with APIs, CMS, CRM tools and your backend environment."
        }
      ],
      relatedServiceSlugs: ["landing-pages", "web-app-development", "seo-optimization"],
      relatedPostSlugs: ["nextjs-for-business-websites", "seo-ready-website-launch"],
      updatedAt: "2026-04-23"
    },
    {
      slug: "website-redesign-seo-migration",
      title: "Website redesign without losing the SEO foundation",
      metaTitle: "Website redesign without losing SEO structure",
      metaDescription:
        "Website redesign or relaunch without breaking the SEO foundation: new structure, page migration, metadata, redirects, sitemap, internal links and technical control.",
      heroTitle: "A website redesign without losing critical pages, structure and SEO groundwork",
      heroDescription:
        "This landing page targets the intent where a business needs a redesign or relaunch, but cannot afford to lose indexed pages, traffic, page logic or commercial structure.",
      searchIntent: "website redesign SEO migration, redesign without losing SEO, relaunch website structure, technical SEO migration",
      offerSummary:
        "The focus is on refreshing the presentation and the page system without chaotic losses in structure, redirects, metadata and search visibility.",
      idealFor: [
        "outdated websites that no longer support the brand",
        "projects after rebranding or a positioning shift",
        "businesses migrating to Next.js",
        "companies adding new SEO pages without breaking the old base"
      ],
      benefits: [
        "controlled migration of URLs and pages",
        "clean redirects, metadata and internal linking",
        "stronger structure without losing valuable existing assets",
        "a new system ready for SEO and post-launch growth"
      ],
      deliverables: [
        "map of old and new pages",
        "redirect plan and canonical logic",
        "updated page structure and technical SEO base",
        "controlled relaunch with sitemap, schema and indexing checks"
      ],
      faq: [
        {
          question: "Can the site be refreshed without destroying the old structure?",
          answer:
            "Yes. The strongest path is often not a full reset, but a controlled migration of valuable pages and search intent into a new architecture."
        },
        {
          question: "What usually gets broken during relaunch?",
          answer:
            "URL structure, redirects, titles, canonical tags, sitemap, internal links and the logic of which pages should even remain indexable."
        }
      ],
      relatedServiceSlugs: ["corporate-websites", "seo-optimization", "web-app-development"],
      relatedPostSlugs: ["website-redesign-without-losing-seo", "website-structure-for-leads"],
      updatedAt: "2026-04-23"
    }
  ]
};

export const seoLandingSlugs = seoLandingsByLocale.uk.map((page) => page.slug);

export function getSeoLandings(locale: Locale): SeoLanding[] {
  return seoLandingsByLocale[locale];
}

export function getSeoLanding(slug: string): SeoLanding | undefined;
export function getSeoLanding(locale: Locale, slug: string): SeoLanding | undefined;
export function getSeoLanding(localeOrSlug: Locale | string, maybeSlug?: string): SeoLanding | undefined {
  if (maybeSlug === undefined) {
    return seoLandingsByLocale.uk.find((page) => page.slug === localeOrSlug);
  }

  return seoLandingsByLocale[localeOrSlug as Locale].find((page) => page.slug === maybeSlug);
}
