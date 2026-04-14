export type Locale = "uk" | "en";

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  priceFrom: string;
  keywords: string[];
  outcomes: string[];
  deliverables: string[];
  fitFor: string[];
  faq: Array<{question: string; answer: string}>;
};

const servicePagesByLocale: Record<Locale, ServicePage[]> = {
  uk: [
    {
      slug: "landing-pages",
      title: "Розробка landing page під ключ",
      shortTitle: "Landing page",
      metaTitle: "Розробка landing page під ключ для бізнесу",
      metaDescription:
        "Створюю landing page під ключ для SaaS, сервісних компаній, експертів і локального бізнесу. Швидкий запуск, сильна структура, SEO-ready база і висока конверсія.",
      heroTitle: "Landing page для запуску реклами, продажів і тесту попиту",
      heroDescription:
        "Підійде, якщо вам потрібна одна сильна сторінка під рекламу, презентацію продукту або збір лідів. Проєктую структуру, збираю контентні блоки, розробляю сторінку на React / Next.js і готую її до аналітики та SEO.",
      priceFrom: "від 800 EUR",
      keywords: [
        "landing page під ключ",
        "створення лендингу",
        "розробка лендингу для бізнесу",
        "landing page",
        "лендинг для SaaS"
      ],
      outcomes: [
        "чітка структура під одну цільову дію",
        "швидкий запуск рекламних кампаній",
        "адаптивність для мобільного трафіку",
        "готовність до аналітики та A/B тестів"
      ],
      deliverables: [
        "структура сторінки або прототип блоків",
        "розробка сторінки на Next.js",
        "базова SEO-оптимізація",
        "підключення форм, аналітики та подій",
        "підготовка до запуску реклами"
      ],
      fitFor: [
        "SaaS і tech products",
        "консалтингу та експертних послуг",
        "B2B lead generation",
        "локальних сервісів"
      ],
      faq: [
        {
          question: "Скільки часу займає розробка landing page?",
          answer:
            "Зазвичай 1-2 тижні, якщо структура погоджена і матеріали доступні. Якщо потрібні тексти, прототип і дизайн з нуля, строк буде довший."
        },
        {
          question: "Чи можна підключити рекламу одразу після запуску?",
          answer:
            "Так. Я одразу готую сторінку до аналітики, подій, форм і технічних вимог для рекламного трафіку."
        }
      ]
    },
    {
      slug: "corporate-websites",
      title: "Розробка корпоративних сайтів",
      shortTitle: "Корпоративні сайти",
      metaTitle: "Розробка корпоративного сайту для компаній",
      metaDescription:
        "Розробка корпоративних сайтів для B2B, сервісних і виробничих компаній. Чітка структура, сильна презентація послуг, SEO і технічна надійність.",
      heroTitle: "Корпоративний сайт, який пояснює вашу цінність і підтримує продажі",
      heroDescription:
        "Збираю багатосторінкові сайти для компаній, яким потрібно виглядати надійно, зрозуміло пояснювати послуги й отримувати звернення від нових клієнтів.",
      priceFrom: "від 1600 EUR",
      keywords: [
        "розробка корпоративного сайту",
        "створення сайту компанії",
        "corporate website development",
        "B2B website",
        "сайт для сервісної компанії"
      ],
      outcomes: [
        "зрозуміла структура послуг і кейсів",
        "сильніша довіра через презентацію компанії",
        "окремі посадкові сторінки під напрями послуг",
        "краща видимість у пошуку за комерційними запитами"
      ],
      deliverables: [
        "мапа сайту і структура сторінок",
        "головна, послуги, про компанію, кейси, контакти",
        "компонентна розробка на Next.js",
        "SEO metadata, schema.org, sitemap",
        "форми, інтеграції, базова CMS за потреби"
      ],
      fitFor: [
        "B2B компаній",
        "агенцій і студій",
        "виробництва та логістики",
        "локального бізнесу, що виходить на міжнародний ринок"
      ],
      faq: [
        {
          question: "Чи можна додавати нові сторінки після запуску?",
          answer:
            "Так. Архітектуру одразу закладаю так, щоб сайт масштабувався без переписування основи."
        },
        {
          question: "Чи підходить корпоративний сайт для SEO?",
          answer:
            "Так. Це один з найкращих форматів для просування послуг, тому що дозволяє створювати окремі сторінки під конкретні запити."
        }
      ]
    },
    {
      slug: "ecommerce-development",
      title: "Розробка інтернет-магазинів",
      shortTitle: "Інтернет-магазини",
      metaTitle: "Розробка інтернет-магазину для брендів і ритейлу",
      metaDescription:
        "Створюю інтернет-магазини для брендів і ритейлу: каталог, картка товару, checkout, інтеграції, SEO-структура і висока швидкість.",
      heroTitle: "Інтернет-магазин, який зручний у користуванні і не гальмує продажі",
      heroDescription:
        "Працюю з e-commerce проєктами, де важливі швидкість, чистий UX, SEO-категорії та технічна готовність до росту асортименту, маркетингу й інтеграцій.",
      priceFrom: "від 2500 EUR",
      keywords: [
        "розробка інтернет-магазину",
        "створення ecommerce сайту",
        "Next.js ecommerce development",
        "онлайн магазин під ключ",
        "ecommerce"
      ],
      outcomes: [
        "зручний каталог і фільтрація",
        "швидкий mobile-first storefront",
        "структура під SEO-категорії",
        "готовність до інтеграцій з оплатою і CRM"
      ],
      deliverables: [
        "архітектура каталогу та карток товарів",
        "front-end для магазину на Next.js",
        "checkout і форми замовлення",
        "інтеграції з CMS, CRM або платіжними системами",
        "технічна SEO-оптимізація магазину"
      ],
      fitFor: [
        "D2C брендів",
        "нішевих online shops",
        "B2B каталогів із замовленням",
        "магазинів, яким потрібне кастомне рішення"
      ],
      faq: [
        {
          question: "Чи робите ви кастомний магазин, а не шаблон?",
          answer:
            "Так. Якщо типовий шаблон не підходить під вашу логіку продажів, я розробляю кастомний storefront і потрібні інтеграції."
        },
        {
          question: "Чи можна почати з MVP магазину?",
          answer:
            "Так. Часто це найкращий шлях: запускаємо базову версію і далі додаємо модулі по мірі росту."
        }
      ]
    },
    {
      slug: "web-app-development",
      title: "Розробка веб-додатків",
      shortTitle: "Веб-додатки",
      metaTitle: "Розробка веб-додатків на React і Next.js",
      metaDescription:
        "Розробка веб-додатків на React, Next.js і TypeScript для SaaS, внутрішніх систем і клієнтських платформ. Надійна архітектура, UX і масштабованість.",
      heroTitle: "Веб-додатки для SaaS, клієнтських кабінетів і внутрішніх платформ",
      heroDescription:
        "Коли звичайного сайту вже мало, переходжу до розробки продуктового інтерфейсу: ролі користувачів, дашборди, інтеграції, API, складна логіка і масштабування.",
      priceFrom: "від 3000 EUR",
      keywords: [
        "розробка веб-додатків",
        "React developer",
        "Next.js developer",
        "SaaS development",
        "custom web application"
      ],
      outcomes: [
        "зручний інтерфейс для щоденної роботи",
        "масштабована front-end архітектура",
        "чіткі сценарії для ролей і доступів",
        "готовність до подальшої продуктової розробки"
      ],
      deliverables: [
        "проєктування модулів і user flows",
        "розробка інтерфейсу на React / Next.js",
        "інтеграція з API та backend",
        "авторизація, ролі, дашборди",
        "тестування й технічна документація по модулю"
      ],
      fitFor: [
        "SaaS продуктів",
        "customer portals",
        "internal dashboards",
        "MVP для digital products"
      ],
      faq: [
        {
          question: "Чи працюєте ви тільки з front-end, чи з повним стеком?",
          answer:
            "Я можу закривати fullstack-частину або працювати разом з вашою backend-командою. Формат залежить від архітектури проєкту."
        },
        {
          question: "Чи підходить це для MVP стартапу?",
          answer:
            "Так. Web app MVP часто є найкращим форматом для перевірки продукту без перевитрат на перший реліз."
        }
      ]
    },
    {
      slug: "seo-optimization",
      title: "Технічна SEO-оптимізація сайтів",
      shortTitle: "SEO-оптимізація",
      metaTitle: "Технічна SEO-оптимізація сайтів для бізнесу",
      metaDescription:
        "Покращую технічну SEO-основу сайтів: швидкість, metadata, schema.org, внутрішня структура, індексація та Core Web Vitals для бізнесу.",
      heroTitle: "Технічне SEO, яке покращує видимість без магії",
      heroDescription:
        "Працюю з тим, що реально впливає на індексацію і видимість: структура сторінок, metadata, внутрішні посилання, sitemap, schema.org, швидкість і mobile usability.",
      priceFrom: "від 600 EUR",
      keywords: [
        "технічне SEO",
        "SEO оптимізація сайту",
        "Core Web Vitals optimization",
        "Next.js SEO",
        "SEO audit"
      ],
      outcomes: [
        "чисті title і description без дублювання",
        "краща індексація важливих сторінок",
        "зрозуміла структура під комерційні запити",
        "покращення швидкості й Core Web Vitals"
      ],
      deliverables: [
        "SEO-аудит технічної частини",
        "виправлення metadata та canonical",
        "schema.org, sitemap і robots",
        "внутрішні перелінковки й структура сторінок",
        "список пріоритетних контентних задач"
      ],
      fitFor: [
        "сайтів послуг",
        "корпоративних сайтів",
        "магазинів на Next.js",
        "проєктів після редизайну або міграції"
      ],
      faq: [
        {
          question: "Чи займаєтесь ви контентною SEO-стратегією?",
          answer:
            "Так, але мій фокус саме на технічній основі й структурі сторінок. За потреби я також пропоную контентний план під комерційні сторінки."
        },
        {
          question: "Чи можна оптимізувати існуючий сайт без повної переробки?",
          answer:
            "Так. Багато проблем вирішуються без повного редизайну: виправлення metadata, структури, швидкості та індексації дають відчутний ефект."
        }
      ]
    }
  ],
  en: [
    {
      slug: "landing-pages",
      title: "End-to-end landing page development",
      shortTitle: "Landing page",
      metaTitle: "Landing page development for businesses",
      metaDescription:
        "I build end-to-end landing pages for SaaS, service companies, experts and local businesses. Fast launch, strong structure, SEO-ready foundation and conversion focus.",
      heroTitle: "Landing pages for paid traffic, sales and demand validation",
      heroDescription:
        "A strong fit when you need a focused page for ads, product presentation or lead generation. I shape the structure, define the content blocks, build the page with React / Next.js and prepare it for analytics and SEO.",
      priceFrom: "from 800 EUR",
      keywords: [
        "landing page development",
        "landing page for SaaS",
        "landing page",
        "conversion-focused landing page",
        "Next.js landing page"
      ],
      outcomes: [
        "clear structure built around one target action",
        "faster launch of paid acquisition campaigns",
        "mobile-friendly experience for paid traffic",
        "ready for analytics and A/B testing"
      ],
      deliverables: [
        "page structure or block-level wireframe",
        "landing page development with Next.js",
        "baseline SEO optimization",
        "forms, analytics and event tracking setup",
        "launch-ready implementation"
      ],
      fitFor: [
        "SaaS and tech products",
        "consulting and expert services",
        "B2B lead generation",
        "local service businesses"
      ],
      faq: [
        {
          question: "How long does landing page development take?",
          answer:
            "Usually 1-2 weeks if the structure is approved and the materials are available. If copy, wireframes and design need to be created from scratch, the timeline is longer."
        },
        {
          question: "Can paid ads be connected right after launch?",
          answer:
            "Yes. I prepare the page for analytics, events, forms and the technical requirements needed for paid traffic from the start."
        }
      ]
    },
    {
      slug: "corporate-websites",
      title: "Corporate website development",
      shortTitle: "Corporate websites",
      metaTitle: "Corporate website development for companies",
      metaDescription:
        "Corporate website development for B2B, service and manufacturing companies. Clear structure, strong service presentation, SEO and technical reliability.",
      heroTitle: "A corporate website that explains your value and supports sales",
      heroDescription:
        "I build multi-page websites for companies that need to look credible, explain their services clearly and generate inquiries from new clients.",
      priceFrom: "from 1600 EUR",
      keywords: [
        "corporate website development",
        "company website development",
        "B2B website",
        "service company website",
        "multi-page website development"
      ],
      outcomes: [
        "clear structure for services and case studies",
        "stronger trust through company presentation",
        "dedicated landing pages for service directions",
        "better visibility for commercial search intent"
      ],
      deliverables: [
        "site map and page structure",
        "homepage, services, about, case studies and contact pages",
        "component-based Next.js development",
        "SEO metadata, schema.org and sitemap",
        "forms, integrations and basic CMS if needed"
      ],
      fitFor: [
        "B2B companies",
        "agencies and studios",
        "manufacturing and logistics businesses",
        "local companies entering international markets"
      ],
      faq: [
        {
          question: "Can new pages be added after launch?",
          answer:
            "Yes. I set up the architecture so the website can scale without rebuilding the foundation later."
        },
        {
          question: "Is a corporate website a good SEO format?",
          answer:
            "Yes. It is one of the strongest formats for service SEO because it allows you to create dedicated pages for specific search intents."
        }
      ]
    },
    {
      slug: "ecommerce-development",
      title: "E-commerce development",
      shortTitle: "E-commerce stores",
      metaTitle: "E-commerce development for brands and retail",
      metaDescription:
        "I build e-commerce stores for brands and retailers with catalogues, product pages, checkout flows, integrations, SEO structure and high performance.",
      heroTitle: "An e-commerce store that feels smooth and does not slow sales down",
      heroDescription:
        "I work on e-commerce projects where speed, clean UX, SEO-ready categories and technical readiness for assortment growth, marketing and integrations matter.",
      priceFrom: "from 2500 EUR",
      keywords: [
        "e-commerce development",
        "online store development",
        "Next.js ecommerce development",
        "custom storefront",
        "ecommerce"
      ],
      outcomes: [
        "convenient catalogue and filtering",
        "fast mobile-first storefront",
        "SEO-ready category structure",
        "ready for payment and CRM integrations"
      ],
      deliverables: [
        "catalogue and product page architecture",
        "storefront front-end with Next.js",
        "checkout and order forms",
        "CMS, CRM or payment integrations",
        "technical SEO optimization for the store"
      ],
      fitFor: [
        "D2C brands",
        "niche online shops",
        "B2B catalogues with ordering flows",
        "stores that need a custom setup"
      ],
      faq: [
        {
          question: "Do you build custom stores rather than templates?",
          answer:
            "Yes. If an off-the-shelf template does not fit your sales logic, I build a custom storefront and the integrations you need."
        },
        {
          question: "Can we start with an e-commerce MVP?",
          answer:
            "Yes. In many cases that is the best route: launch a lean version first and add modules as the business grows."
        }
      ]
    },
    {
      slug: "web-app-development",
      title: "Web application development",
      shortTitle: "Web applications",
      metaTitle: "Web application development with React and Next.js",
      metaDescription:
        "Web application development with React, Next.js and TypeScript for SaaS, internal systems and client platforms. Reliable architecture, UX and scalability.",
      heroTitle: "Web apps for SaaS, client portals and internal platforms",
      heroDescription:
        "When a regular website is no longer enough, I move into product interface work: user roles, dashboards, integrations, APIs, complex logic and future scaling.",
      priceFrom: "from 3000 EUR",
      keywords: [
        "web application development",
        "React developer",
        "Next.js developer",
        "SaaS development",
        "custom web application"
      ],
      outcomes: [
        "usable interface for daily workflows",
        "scalable front-end architecture",
        "clear scenarios for roles and access",
        "ready for further product development"
      ],
      deliverables: [
        "module planning and user flows",
        "interface development with React / Next.js",
        "API and backend integration",
        "authentication, roles and dashboards",
        "testing and technical handoff for the module"
      ],
      fitFor: [
        "SaaS products",
        "customer portals",
        "internal dashboards",
        "MVPs for digital products"
      ],
      faq: [
        {
          question: "Do you work only on front-end or on full stack too?",
          answer:
            "I can cover the fullstack part or work together with your backend team. The exact setup depends on the project architecture."
        },
        {
          question: "Is this a good fit for a startup MVP?",
          answer:
            "Yes. A web app MVP is often the best format for validating a product without overspending on the first release."
        }
      ]
    },
    {
      slug: "seo-optimization",
      title: "Technical SEO optimization",
      shortTitle: "SEO optimization",
      metaTitle: "Technical SEO optimization for businesses",
      metaDescription:
        "I improve the technical SEO foundation of websites: speed, metadata, schema.org, internal structure, indexing and Core Web Vitals for businesses.",
      heroTitle: "Technical SEO that improves visibility without vague promises",
      heroDescription:
        "I focus on what actually impacts indexing and visibility: page structure, metadata, internal links, sitemap, schema.org, speed and mobile usability.",
      priceFrom: "from 600 EUR",
      keywords: [
        "technical SEO",
        "website SEO optimization",
        "Core Web Vitals optimization",
        "Next.js SEO",
        "SEO audit"
      ],
      outcomes: [
        "clean titles and descriptions without duplication",
        "better indexing for important pages",
        "clear structure for commercial intent",
        "improved speed and Core Web Vitals"
      ],
      deliverables: [
        "technical SEO audit",
        "metadata and canonical fixes",
        "schema.org, sitemap and robots improvements",
        "internal linking and page structure updates",
        "prioritized list of content and SEO tasks"
      ],
      fitFor: [
        "service websites",
        "corporate websites",
        "Next.js stores",
        "projects after redesign or migration"
      ],
      faq: [
        {
          question: "Do you also work on content SEO strategy?",
          answer:
            "Yes, but my main focus is the technical foundation and page structure. If needed, I can also define a content plan for commercial pages."
        },
        {
          question: "Can an existing website be optimized without a full rebuild?",
          answer:
            "Yes. Many issues can be fixed without a full redesign: metadata, structure, speed and indexing improvements often make a measurable difference."
        }
      ]
    }
  ]
};

export const servicePageSlugs = servicePagesByLocale.uk.map((service) => service.slug);
export const servicePages = servicePagesByLocale.uk;

export function getServicePages(locale: Locale): ServicePage[] {
  return servicePagesByLocale[locale];
}

export function getServicePage(slug: string): ServicePage | undefined;
export function getServicePage(locale: Locale, slug: string): ServicePage | undefined;
export function getServicePage(localeOrSlug: Locale | string, maybeSlug?: string): ServicePage | undefined {
  if (maybeSlug === undefined) {
    return servicePagesByLocale.uk.find((service) => service.slug === localeOrSlug);
  }

  return servicePagesByLocale[localeOrSlug as Locale].find((service) => service.slug === maybeSlug);
}
