export type Locale = "uk" | "en";

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  heroTitle: string;
  heroDescription: string;
  keywords: string[];
  sections: BlogSection[];
  relatedLandingSlug: string;
};

const blogPostsByLocale: Record<Locale, BlogPost[]> = {
  uk: [
    {
      slug: "website-structure-for-leads",
      title: "Яка структура сайту реально веде до заявок",
      excerpt:
        "Розбір того, чому більшість сайтів пояснюють компанію, але не ведуть до дії, і як зібрати комерційну структуру під заявки.",
      metaTitle: "Структура сайту, яка веде до заявок",
      metaDescription:
        "Як зібрати структуру сайту під заявки: перший екран, докази, послуги, FAQ, кейси, CTA і логіка переходів між сторінками.",
      category: "Стратегія сайту",
      readingTime: "6 хв",
      publishedAt: "2026-04-23",
      heroTitle: "Структура сайту, яка не просто пояснює, а веде до заявки",
      heroDescription:
        "Слабкий сайт зазвичай має багато блоків, але мало логіки прийняття рішення. Сильний сайт будується навколо того, що клієнт має зрозуміти за перші секунди і що має зробити далі.",
      keywords: ["структура сайту", "сайт під заявки", "перший екран", "кейси і CTA"],
      sections: [
        {
          title: "Чому сайти часто не продають",
          paragraphs: [
            "Типова помилка в тому, що сторінка будується як опис компанії. Користувач бачить абстрактний перший екран, довгий блок про команду і список технологій, але не розуміє, чим це допоможе бізнесу.",
            "Коли немає чіткої логіки рішення, навіть хороший дизайн не працює на конверсію. Людина просто не доходить до дії, бо її нічого не веде по сторінці."
          ],
          bullets: [
            "немає сильної обіцянки результату в першому екрані",
            "кейси й докази заховані занадто низько",
            "послуги описані через функції, а не через вигоду",
            "CTA звучить загально і не дає наступного кроку"
          ]
        },
        {
          title: "Яка структура працює краще",
          paragraphs: [
            "Для більшості B2B і сервісних сайтів сильніше працює сценарій, де сторінка швидко відповідає на три питання: що ви робите, для кого це, чому вам можна довіряти.",
            "Після цього потрібно не продовжувати опис себе, а знімати ризики: показати кейси, процес, очікуваний результат і простий спосіб отримати оцінку."
          ],
          bullets: [
            "перший екран з оффером і конкретним CTA",
            "послуги як рішення під задачу",
            "кейси як доказ і шар довіри",
            "процес і FAQ як зняття ризику",
            "контактний блок як логічний фінал сторінки"
          ]
        },
        {
          title: "Що змінюється після такої перебудови",
          paragraphs: [
            "Сайт перестає бути просто вітриною і починає працювати як система прийняття рішення. Це не гарантує магічний ріст без трафіку, але сильно підвищує якість сприйняття і готовність звернутися.",
            "Особливо добре це працює там, де бізнес продає складніші послуги або виходить на міжнародний ринок, де довіра до подачі вирішує багато."
          ]
        }
      ],
      relatedLandingSlug: "website-development-europe"
    },
    {
      slug: "nextjs-for-business-websites",
      title: "Коли Next.js дійсно дає перевагу бізнес-сайту",
      excerpt:
        "Не про хайп навколо фреймворку, а про реальні причини, коли Next.js виправданий для сайту, вітрини магазину або продуктового інтерфейсу.",
      metaTitle: "Коли Next.js підходить для бізнес-сайту",
      metaDescription:
        "Коли варто вибирати Next.js для бізнес-сайту: швидкість, SEO, масштабованість, маршрути, локалізація і продуктова архітектура.",
      category: "Технічний стек",
      readingTime: "5 хв",
      publishedAt: "2026-04-23",
      heroTitle: "Next.js для бізнес-сайту: коли це реальна перевага, а не просто тренд",
      heroDescription:
        "Фреймворк сам по собі нічого не продає. Але він може дати сильну базу під швидкість, SEO, масштабування і контрольований розвиток сайту або продукту.",
      keywords: ["Next.js", "React розробка", "SEO-ready фронтенд", "бізнес-сайт"],
      sections: [
        {
          title: "Що бізнес реально отримує від Next.js",
          paragraphs: [
            "Головна перевага не в назві стеку, а в тому, що він дозволяє зібрати сайт як контрольовану систему: з нормальною маршрутизацією, логікою макетів, метаданими, локалізаціями й продуктивністю.",
            "Для маркетингових сайтів це важливо, бо SEO і швидкість не мають бути післядумкою. Для веб-додатка це важливо, бо інтерфейс має рости без хаосу."
          ],
          bullets: [
            "краща база під технічне SEO",
            "швидший рендер і контроль над продуктивністю",
            "гнучка робота з багатьма сторінками і локалями",
            "простіше масштабувати кодову базу"
          ]
        },
        {
          title: "Коли Next.js не є самоціллю",
          paragraphs: [
            "Якщо бізнесу потрібен простий тимчасовий мікросайт без плану росту, стек не має значення настільки сильно. Але коли сайт повинен бути частиною продажів або пошуку, слабка технічна база швидко стає проблемою.",
            "Тому питання треба ставити не як 'чи потрібен нам Next.js', а як 'чи потрібен нам сайт, готовий до SEO, нових сторінок і масштабування'."
          ]
        },
        {
          title: "Де це особливо виправдано",
          paragraphs: [
            "Найчастіше перевага проявляється на landing pages під рекламу, корпоративних сайтах з багатьма сторінками, кастомних storefront і продуктах з клієнтськими кабінетами."
          ],
          bullets: [
            "посадкові сторінки",
            "корпоративні сайти",
            "e-commerce вітрина",
            "MVP веб-додатка і дашборди"
          ]
        }
      ],
      relatedLandingSlug: "nextjs-development-europe"
    },
    {
      slug: "website-redesign-without-losing-seo",
      title: "Як перезапустити сайт і не зламати SEO",
      excerpt:
        "Коротка карта того, що бізнес часто втрачає під час редизайну або перезапуску і як цього уникнути через контрольовану міграцію.",
      metaTitle: "Як зробити редизайн сайту без втрати SEO",
      metaDescription:
        "Редизайн сайту без втрати SEO: redirects, metadata, URL, sitemap, індексація і перенесення цінних сторінок у нову структуру.",
      category: "Перезапуск і SEO",
      readingTime: "7 хв",
      publishedAt: "2026-04-23",
      heroTitle: "Редизайн без втрати SEO: що треба втримати під контролем",
      heroDescription:
        "Проблема редизайну не в новому дизайні, а в тому, що під час перезапуску бізнес часто випадково ламає сторінки, які вже працювали в пошуку або були важливими для продажів.",
      keywords: ["website redesign", "SEO migration", "redirect plan", "technical SEO relaunch"],
      sections: [
        {
          title: "Що найчастіше втрачають при перезапуску",
          paragraphs: [
            "Найгірший сценарій виглядає просто: новий сайт виходить красивішим, але старі URL зникають, редіректи не налаштовані, метадані переписані хаотично, а sitemap більше не відповідає реальній структурі.",
            "У результаті бізнес отримує красивіший продукт, але слабшу видимість і просідання по важливих сторінках."
          ],
          bullets: [
            "ламається логіка старих URL",
            "втрачаються сторінки з пошуковим потенціалом",
            "нові titles і descriptions дублюються",
            "внутрішні лінки ведуть не туди"
          ]
        },
        {
          title: "Що потрібно зробити до релізу",
          paragraphs: [
            "Перед запуском має бути карта міграції: які сторінки залишаються, які об'єднуються, які отримують новий URL і куди налаштовуються redirects.",
            "Окремо потрібно перевірити metadata, canonical, sitemap, robots і те, чи нова структура взагалі сильніша за попередню, а не просто інша."
          ]
        },
        {
          title: "Чому це вигідно бізнесу",
          paragraphs: [
            "Контрольований перезапуск дозволяє оновити позиціонування, дизайн і технічну базу без втрати того, що вже накопичило SEO-цінність або допомагало в продажах."
          ]
        }
      ],
      relatedLandingSlug: "website-redesign-seo-migration"
    },
    {
      slug: "seo-ready-website-launch",
      title: "Що означає SEO-ready сайт на етапі запуску",
      excerpt:
        "SEO-ready сайт не означає магічне зростання з першого дня. Це означає, що структура і технічна база не заважають пошуку рости після запуску.",
      metaTitle: "Що означає SEO-ready сайт при запуску",
      metaDescription:
        "Що входить у SEO-ready запуск сайту: метадані, структура сторінок, schema.org, sitemap, внутрішні посилання і технічна база під пошук.",
      category: "Технічне SEO",
      readingTime: "5 хв",
      publishedAt: "2026-04-23",
      heroTitle: "SEO-ready запуск сайту: що це означає на практиці",
      heroDescription:
        "Сайт не стає видимим тільки тому, що на ньому додали title і description. Але він може вийти в реліз уже з правильною технічною базою, яка не блокує подальше SEO.",
      keywords: ["SEO-ready сайт", "технічний SEO-запуск", "метадані", "schema.org"],
      sections: [
        {
          title: "Що входить у базовий SEO-ready шар",
          paragraphs: [
            "Мінімум для сильного запуску: чиста структура сторінок, зрозумілі title і description, canonical, sitemap, robots, schema.org і нормальна внутрішня перелінковка.",
            "Додатково важлива швидкість і мобільна якість, бо слабкий UX часто знищує користь навіть від правильної структури."
          ],
          bullets: [
            "метадані без дублювань",
            "логіка URL і ієрархія сторінок",
            "schema.org і sitemap",
            "внутрішні посилання і mobile-first якість"
          ]
        },
        {
          title: "Чого SEO-ready шар не робить",
          paragraphs: [
            "Він не замінює контентну стратегію і не гарантує швидкий ріст сам по собі. Але він прибирає технічні обмеження і дає змогу будувати SEO далі без переробки фундаменту."
          ]
        }
      ],
      relatedLandingSlug: "nextjs-development-europe"
    }
  ],
  en: [
    {
      slug: "website-structure-for-leads",
      title: "What website structure actually drives inquiries",
      excerpt:
        "Why many websites explain the company but do not lead to action, and how to build a commercial structure around inquiries.",
      metaTitle: "Website structure that drives inquiries",
      metaDescription:
        "How to build website structure for inquiries: hero, proof, services, FAQ, case studies, CTA and page flow.",
      category: "Website strategy",
      readingTime: "6 min",
      publishedAt: "2026-04-23",
      heroTitle: "Website structure that does not just explain, but moves the visitor to an inquiry",
      heroDescription:
        "Weak websites often have plenty of sections but very little decision logic. Strong websites are built around what a buyer should understand in the first seconds and what they should do next.",
      keywords: ["website structure", "lead generation website", "hero section", "case studies and CTA"],
      sections: [
        {
          title: "Why websites often fail to sell",
          paragraphs: [
            "A common issue is that the page is built like a company profile. The visitor sees an abstract hero, a long team section and a technology list, but never understands how this helps the business.",
            "Without a clear decision path, even good design does not convert. The user simply is not guided toward the next action."
          ],
          bullets: [
            "no strong result-oriented promise in the hero",
            "proof and case studies are buried too low",
            "services are described through features instead of value",
            "CTA is generic and does not define the next step"
          ]
        },
        {
          title: "What structure tends to work better",
          paragraphs: [
            "For most B2B and service websites, the strongest scenario is one where the page quickly answers three questions: what you do, who it is for and why the business should trust you.",
            "After that, the goal is not to keep describing yourself, but to reduce risk through case studies, process, outcomes and a simple route to getting an estimate."
          ],
          bullets: [
            "hero with a commercial offer and clear CTA",
            "services framed as solutions to a task",
            "case studies as proof and trust layer",
            "process and FAQ as risk reduction",
            "contact block as the logical final step"
          ]
        },
        {
          title: "What changes after this restructuring",
          paragraphs: [
            "The website stops behaving like a decorative brochure and starts working as a decision system. It does not create traffic by itself, but it improves perception and increases the chance that qualified visitors will reach out.",
            "This is especially valuable for more complex services and for businesses entering international markets, where trust in the presentation matters a lot."
          ]
        }
      ],
      relatedLandingSlug: "website-development-europe"
    },
    {
      slug: "nextjs-for-business-websites",
      title: "When Next.js is actually the right choice for a business website",
      excerpt:
        "Not hype around a framework, but the real reasons why Next.js is justified for a website, storefront or product interface.",
      metaTitle: "When Next.js fits a business website",
      metaDescription:
        "When to choose Next.js for a business website: speed, SEO, scalability, routing, localization and product architecture.",
      category: "Tech stack",
      readingTime: "5 min",
      publishedAt: "2026-04-23",
      heroTitle: "Next.js for a business website: a real advantage, not just a trend",
      heroDescription:
        "A framework by itself does not sell anything. But it can provide a strong base for speed, SEO, scalability and a controlled evolution of a website or product.",
      keywords: ["Next.js", "React development", "SEO-ready frontend", "business website"],
      sections: [
        {
          title: "What the business actually gets from Next.js",
          paragraphs: [
            "The real advantage is not the stack name, but the way it allows the site to be built as a controlled system: routing, layouts, metadata, localization and performance working together.",
            "For marketing websites this matters because SEO and speed should not be afterthoughts. For web apps it matters because the interface should grow without chaos."
          ],
          bullets: [
            "stronger base for technical SEO",
            "faster rendering and better performance control",
            "good fit for many pages and locales",
            "easier long-term codebase scaling"
          ]
        },
        {
          title: "When Next.js should not be the goal itself",
          paragraphs: [
            "If the business only needs a temporary microsite with no growth plan, the framework matters far less. But once the website becomes part of sales or search, a weak technical base turns into a business problem.",
            "So the better question is not 'do we need Next.js', but 'do we need a website ready for SEO, new pages and future scale'."
          ]
        },
        {
          title: "Where the advantage is most visible",
          paragraphs: [
            "The gain usually becomes obvious on landing pages for paid traffic, multi-page corporate websites, custom storefronts and products with client portals."
          ],
          bullets: [
            "landing pages",
            "corporate websites",
            "e-commerce storefronts",
            "web app MVPs and dashboards"
          ]
        }
      ],
      relatedLandingSlug: "nextjs-development-europe"
    },
    {
      slug: "website-redesign-without-losing-seo",
      title: "How to relaunch a website without breaking SEO",
      excerpt:
        "A practical outline of what businesses often lose during redesign or relaunch, and how to avoid that through controlled migration.",
      metaTitle: "How to redesign a website without losing SEO",
      metaDescription:
        "Website redesign without losing SEO: redirects, metadata, URLs, sitemap, indexing and migration of valuable pages into a new structure.",
      category: "Relaunch and SEO",
      readingTime: "7 min",
      publishedAt: "2026-04-23",
      heroTitle: "Redesign without losing SEO: what must stay under control",
      heroDescription:
        "The problem with redesign is not the new visual layer. It is the fact that businesses often break pages that already worked in search or supported sales.",
      keywords: ["website redesign", "SEO migration", "redirect plan", "technical SEO relaunch"],
      sections: [
        {
          title: "What gets lost most often during relaunch",
          paragraphs: [
            "The worst-case scenario is simple: the new site looks better, but old URLs disappear, redirects are missing, metadata is rewritten chaotically and the sitemap no longer reflects the real structure.",
            "The result is a cleaner-looking product with weaker visibility and a drop on important pages."
          ],
          bullets: [
            "old URL logic breaks",
            "pages with search value disappear",
            "new titles and descriptions duplicate each other",
            "internal links point to the wrong places"
          ]
        },
        {
          title: "What needs to happen before launch",
          paragraphs: [
            "Before release, there should be a migration map: which pages stay, which merge, which get a new URL and how redirects are handled.",
            "Metadata, canonical tags, sitemap, robots and the new structure all need review to ensure the relaunch is genuinely stronger rather than simply different."
          ]
        },
        {
          title: "Why this matters commercially",
          paragraphs: [
            "A controlled relaunch lets the business refresh positioning, design and technical foundation without losing the search value and sales-supporting pages already built over time."
          ]
        }
      ],
      relatedLandingSlug: "website-redesign-seo-migration"
    },
    {
      slug: "seo-ready-website-launch",
      title: "What an SEO-ready website launch actually means",
      excerpt:
        "An SEO-ready website does not mean instant growth. It means the structure and technical foundation do not block search performance after launch.",
      metaTitle: "What an SEO-ready website launch means",
      metaDescription:
        "What belongs in an SEO-ready launch: metadata, page structure, schema.org, sitemap, internal links and the technical base for search growth.",
      category: "Technical SEO",
      readingTime: "5 min",
      publishedAt: "2026-04-23",
      heroTitle: "SEO-ready website launch: what that means in practice",
      heroDescription:
        "A website does not become visible just because title and description fields were added. But it can launch with a technical foundation that does not block future SEO work.",
      keywords: ["SEO-ready website", "technical SEO launch", "metadata", "schema.org"],
      sections: [
        {
          title: "What belongs in the baseline SEO-ready layer",
          paragraphs: [
            "The minimum for a strong launch is a clean page structure, clear titles and descriptions, canonical tags, sitemap, robots, schema.org and internal linking.",
            "Speed and mobile quality matter as well, because weak UX can reduce the value of even a technically correct structure."
          ],
          bullets: [
            "metadata without duplication",
            "URL logic and page hierarchy",
            "schema.org and sitemap",
            "internal links and mobile-first quality"
          ]
        },
        {
          title: "What the SEO-ready layer does not do",
          paragraphs: [
            "It does not replace content strategy and it does not guarantee instant growth. What it does is remove technical blockers and let SEO expand later without rebuilding the foundation."
          ]
        }
      ],
      relatedLandingSlug: "nextjs-development-europe"
    }
  ]
};

export const blogPostSlugs = blogPostsByLocale.uk.map((post) => post.slug);

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPostsByLocale[locale];
}

export function getBlogPost(slug: string): BlogPost | undefined;
export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined;
export function getBlogPost(localeOrSlug: Locale | string, maybeSlug?: string): BlogPost | undefined {
  if (maybeSlug === undefined) {
    return blogPostsByLocale.uk.find((post) => post.slug === localeOrSlug);
  }

  return blogPostsByLocale[localeOrSlug as Locale].find((post) => post.slug === maybeSlug);
}
