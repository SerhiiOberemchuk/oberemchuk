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
  faq: Array<{ question: string; answer: string }>;
};

const servicePagesByLocale: Record<Locale, ServicePage[]> = {
  uk: [
    {
      slug: "landing-pages",
      title: "Розробка лендінгів під ключ",
      shortTitle: "Лендінги",
      metaTitle: "Розробка лендінгів під ключ для бізнесу",
      metaDescription:
        "Створюю лендінги під ключ для SaaS, сервісних компаній, експертів і локального бізнесу. Швидкий запуск, сильна структура, SEO-ready база та фокус на конверсії.",
      heroTitle: "Лендінг для запуску реклами, продажів і тесту попиту",
      heroDescription:
        "Підходить, якщо вам потрібна одна сильна сторінка під рекламу, презентацію продукту або збір лідів. Проєктую структуру, збираю контентні блоки, розробляю сторінку на React / Next.js і готую її до аналітики та SEO.",
      priceFrom: "від 800 EUR",
      keywords: [
        "лендінг під ключ",
        "створення лендінгу",
        "розробка лендінгу для бізнесу",
        "розробка landing page",
        "лендінг для SaaS",
      ],
      outcomes: [
        "чітка структура під одну цільову дію",
        "швидкий запуск рекламних кампаній",
        "адаптивність для мобільного трафіку",
        "готовність до аналітики та A/B тестів",
      ],
      deliverables: [
        "структура сторінки або прототип блоків",
        "розробка сторінки на Next.js",
        "базова SEO-оптимізація",
        "підключення форм, аналітики та подій",
        "підготовка до запуску реклами",
      ],
      fitFor: [
        "SaaS і технологічних продуктів",
        "консалтингу та експертних послуг",
        "B2B-лідогенерації",
        "локальних сервісів",
      ],
      faq: [
        {
          question: "Скільки часу займає розробка лендінгу?",
          answer:
            "Зазвичай 1-2 тижні, якщо структура погоджена і матеріали доступні. Якщо потрібні тексти, прототип і дизайн з нуля, строк буде довший.",
        },
        {
          question: "Чи можна підключити рекламу одразу після запуску?",
          answer:
            "Так. Я одразу готую сторінку до аналітики, подій, форм і технічних вимог для рекламного трафіку.",
        },
      ],
    },
    {
      slug: "corporate-websites",
      title: "Розробка корпоративних сайтів",
      shortTitle: "Корпоративні сайти",
      metaTitle: "Розробка корпоративного сайту для компаній",
      metaDescription:
        "Розробка корпоративних сайтів для B2B, сервісних і виробничих компаній. Чітка структура, сильна презентація послуг, SEO та технічна надійність.",
      heroTitle: "Корпоративний сайт, який пояснює вашу цінність і підтримує продажі",
      heroDescription:
        "Збираю багатосторінкові сайти для компаній, яким потрібно виглядати надійно, зрозуміло пояснювати послуги й отримувати звернення від нових клієнтів.",
      priceFrom: "від 1600 EUR",
      keywords: [
        "розробка корпоративного сайту",
        "створення сайту компанії",
        "corporate website development",
        "B2B website Europe",
        "сайт для сервісної компанії",
      ],
      outcomes: [
        "зрозуміла структура послуг і кейсів",
        "сильніша довіра через презентацію компанії",
        "окремі посадкові сторінки під напрямки послуг",
        "краща видимість у пошуку за комерційними запитами",
      ],
      deliverables: [
        "мапа сайту і структура сторінок",
        "головна, послуги, про компанію, кейси, контакти",
        "компонентна розробка на Next.js",
        "SEO-метадані, schema.org, sitemap",
        "форми, інтеграції, базова CMS за потреби",
      ],
      fitFor: [
        "B2B компаній",
        "агенцій і студій",
        "виробництва та логістики",
        "локального бізнесу, що виходить на міжнародний ринок",
      ],
      faq: [
        {
          question: "Чи можна додавати нові сторінки після запуску?",
          answer:
            "Так. Архітектуру одразу закладаю так, щоб сайт масштабувався без переписування основи.",
        },
        {
          question: "Чи підходить корпоративний сайт для SEO?",
          answer:
            "Так. Це один з найкращих форматів для просування послуг, тому що дозволяє створювати окремі сторінки під конкретні запити.",
        },
      ],
    },
    {
      slug: "astro-content-websites",
      title: "Розробка контентних сайтів на Astro",
      shortTitle: "Astro сайти",
      metaTitle: "Розробка контентних і маркетингових сайтів на Astro",
      metaDescription:
        "Створюю швидкі контентні сайти на Astro для SEO, блогу, knowledge base і маркетингових проєктів. Легка архітектура, швидке завантаження і сильна контентна база.",
      heroTitle: "Astro-сайт, коли потрібні швидкість, контент і SEO без зайвого оверхеду",
      heroDescription:
        "Це формат для маркетингових, editorial і контентних проєктів, де важливі висока продуктивність, чиста структура контенту та зручний ріст сторінок без важкого application-layer.",
      priceFrom: "від 1200 EUR",
      keywords: [
        "Astro website development",
        "розробка сайту на Astro",
        "Astro SEO site",
        "контентний сайт на Astro",
        "маркетинговий сайт Astro",
      ],
      outcomes: [
        "швидке завантаження і сильні Core Web Vitals",
        "зручна структура для SEO і контентного росту",
        "менше технічного шуму для простих маркетингових задач",
        "зручна основа для блогу, knowledge base або сервісного сайту",
      ],
      deliverables: [
        "підбір структури під контентну модель",
        "розробка сайту на Astro",
        "контентні колекції або зручна схема сторінок",
        "SEO-метадані, sitemap, schema.org",
        "легкі інтерактивні islands там, де це справді потрібно",
      ],
      fitFor: [
        "контентних і editorial проєктів",
        "маркетингових сайтів з SEO-фокусом",
        "knowledge base і документації",
        "бізнесу, якому важлива максимальна швидкість без зайвої логіки",
      ],
      faq: [
        {
          question: "Коли Astro кращий за Next.js?",
          answer:
            "Коли сайт в основному контентний і не потребує складної продуктовоï логіки. У такому випадку Astro часто дає легшу, швидшу і простішу архітектуру.",
        },
        {
          question: "Чи можна додати інтерактивні блоки на Astro-сайт?",
          answer:
            "Так. За потреби підключаються islands-компоненти на React для форм, калькуляторів, фільтрів чи інших локальних інтерактивних зон.",
        },
      ],
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
        "Працюю з проєктами електронної комерції, де важливі швидкість, чистий UX, SEO-категорії та технічна готовність до росту асортименту, маркетингу й інтеграцій.",
      priceFrom: "від 2500 EUR",
      keywords: [
        "розробка інтернет-магазину",
        "створення ecommerce сайту",
        "розробка магазину на Next.js",
        "онлайн-магазин під ключ",
        "ecommerce storefront development",
      ],
      outcomes: [
        "зручний каталог і фільтрація",
        "швидка вітрина з пріоритетом мобільних пристроїв",
        "структура під SEO-категорії",
        "готовність до інтеграцій з оплатою і CRM",
      ],
      deliverables: [
        "архітектура каталогу та карток товарів",
        "фронтенд для магазину на Next.js",
        "checkout і форми замовлення",
        "інтеграції з CMS, CRM або платіжними системами",
        "технічна SEO-оптимізація магазину",
      ],
      fitFor: [
        "D2C брендів",
        "нішевих онлайн-магазинів",
        "B2B каталогів із замовленням",
        "магазинів, яким потрібне кастомне рішення",
      ],
      faq: [
        {
          question: "Чи робите ви кастомний магазин, а не шаблон?",
          answer:
            "Так. Якщо типовий шаблон не підходить під вашу логіку продажів, я розробляю кастомну вітрину і потрібні інтеграції.",
        },
        {
          question: "Чи можна почати з MVP магазину?",
          answer:
            "Так. Часто це найкращий шлях: запускаємо базову версію і далі додаємо модулі по мірі росту.",
        },
      ],
    },
    {
      slug: "payment-gateway-integration",
      title: "Інтеграція платіжних систем",
      shortTitle: "Платіжні інтеграції",
      metaTitle: "Інтеграція платіжних систем для сайтів і веб-продуктів",
      metaDescription:
        "Підключаю платіжні системи до сайтів, checkout-flow і веб-продуктів на React / Next.js. Обробка статусів, подій, webhook-сценаріїв і технічна надійність.",
      heroTitle: "Платіжна інтеграція, яка не ламає checkout і не губить замовлення",
      heroDescription:
        "Якщо у вас вже є storefront, сайт або MVP, я підключаю оплату так, щоб вона працювала стабільно: статуси, успішні та неуспішні сценарії, події, технічний handoff і контроль edge cases.",
      priceFrom: "від 450 EUR",
      keywords: [
        "інтеграція платіжної системи",
        "payment gateway integration",
        "checkout integration next.js",
        "підключення оплати на сайт",
        "react payment integration",
      ],
      outcomes: [
        "стабільний checkout без ручних костилів",
        "коректна обробка success / fail / pending сценаріїв",
        "готовність до аналітики і conversion tracking",
        "менше ризику втрати замовлень через технічні збої",
      ],
      deliverables: [
        "аналіз flow оплати і точок ризику",
        "інтеграція checkout або payment form",
        "обробка callback / webhook / status sync",
        "tracking ключових подій оплати",
        "документація і handoff для подальшої підтримки",
      ],
      fitFor: [
        "e-commerce storefront",
        "digital products з оплатою",
        "бронювання або сервісних платформ",
        "проєктів, де потрібна кастомна логіка checkout",
      ],
      faq: [
        {
          question: "Чи працюєте ви тільки з frontend-частиною оплати?",
          answer:
            "Ні. За потреби закриваю і серверну частину: статуси, валідацію, webhook-обробку, синхронізацію замовлень і подій.",
        },
        {
          question: "Чи можна інтегрувати локальні або нестандартні платіжні рішення?",
          answer:
            "Так, якщо є технічна документація або робоче API. Далі вже оцінка залежить від складності протоколу і бізнес-логіки.",
        },
      ],
    },
    {
      slug: "crm-integrations",
      title: "CRM інтеграції та автоматизація лідів",
      shortTitle: "CRM інтеграції",
      metaTitle: "CRM інтеграції для сайтів, форм і продажів",
      metaDescription:
        "Підключаю CRM інтеграції для сайтів і веб-продуктів: форми, lead routing, поля джерел, синхронізація подій і автоматизація первинної обробки лідів.",
      heroTitle: "CRM інтеграція, яка прибирає ручний хаос між сайтом і продажами",
      heroDescription:
        "Ця послуга потрібна, коли заявки є, але вони губляться, дублюються або потрапляють у CRM без контексту. Будую зрозумілий flow від форми чи події до відділу продажів.",
      priceFrom: "від 700 EUR",
      keywords: [
        "CRM integration",
        "crm інтеграція сайту",
        "lead routing automation",
        "інтеграція форм у CRM",
        "website crm sync",
      ],
      outcomes: [
        "ліди потрапляють у CRM без ручного перенесення",
        "заявки мають source, контекст і потрібні поля",
        "менше втрат між маркетингом і продажами",
        "зрозуміліший контроль ефективності каналів",
      ],
      deliverables: [
        "аналіз поточного flow заявок",
        "мапінг полів форми або подій у CRM",
        "lead routing і базові automation triggers",
        "sync джерел, utm і ключових бізнес-полів",
        "технічне тестування і handoff",
      ],
      fitFor: [
        "B2B сайтів і сервісних компаній",
        "маркетингових сайтів з paid traffic",
        "команд продажів, яким потрібен чистий lead flow",
        "бізнесу, де форма вже є, але процес після неї не працює",
      ],
      faq: [
        {
          question: "Чи можна підключити CRM до існуючого сайту без повного редизайну?",
          answer:
            "Так. У більшості випадків це окремий технічний шар, який можна побудувати без повного переписування сайту.",
        },
        {
          question: "Чи працюєте ви з кастомними полями, тегами і сегментацією?",
          answer:
            "Так. Саме це часто і є основною цінністю інтеграції, бо без структури CRM швидко перетворюється на хаос.",
        },
      ],
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
        "розробка веб-додатків на React",
        "розробка веб-додатків на Next.js",
        "розробка для SaaS",
        "кастомний веб-додаток",
      ],
      outcomes: [
        "зручний інтерфейс для щоденної роботи",
        "масштабована фронтенд-архітектура",
        "чіткі сценарії для ролей і доступів",
        "готовність до подальшої продуктової розробки",
      ],
      deliverables: [
        "проєктування модулів і користувацьких сценаріїв",
        "розробка інтерфейсу на React / Next.js",
        "інтеграція з API та бекендом",
        "авторизація, ролі, дашборди",
        "тестування й технічна документація по модулю",
      ],
      fitFor: [
        "SaaS продуктів",
        "клієнтських кабінетів",
        "внутрішніх дашбордів",
        "MVP для цифрових продуктів",
      ],
      faq: [
        {
          question: "Чи працюєте ви тільки з фронтендом, чи з повним стеком?",
          answer:
            "Я можу закривати fullstack-частину або працювати разом з вашою бекенд-командою. Формат залежить від архітектури проєкту.",
        },
        {
          question: "Чи підходить це для MVP стартапу?",
          answer:
            "Так. Web app MVP часто є найкращим форматом для перевірки продукту без перевитрат на перший реліз.",
        },
      ],
    },
    {
      slug: "website-relaunch-migration",
      title: "Оновлення сайту та міграція на новий стек",
      shortTitle: "Relaunch / міграція",
      metaTitle: "Relaunch сайту, редизайн і міграція на Next.js або Astro",
      metaDescription:
        "Оновлюю сайти, переношу на Next.js або Astro, прибираю технічний борг, готую редіректи, metadata, контентний перехід і продуктивнішу основу для росту.",
      heroTitle: "Relaunch сайту без втрати структури, SEO і контрольованості",
      heroDescription:
        "Якщо поточний сайт застарів, важкий в підтримці або вже не відповідає бізнес-задачам, я збираю нову версію з чистішою архітектурою, зрозумілим rollout-планом і технічно акуратною міграцією.",
      priceFrom: "від 900 EUR",
      keywords: [
        "website relaunch",
        "міграція сайту на next.js",
        "редизайн і міграція сайту",
        "site migration seo",
        "перенесення сайту на astro",
      ],
      outcomes: [
        "сучасніша технічна база без зайвого боргу",
        "контрольований перехід контенту і URL-структури",
        "краща швидкість і зручність підтримки",
        "менший ризик SEO-втрат під час запуску нової версії",
      ],
      deliverables: [
        "аудит поточного сайту і зони ризику",
        "план міграції контенту, URL і редіректів",
        "нова фронтенд-збірка на Next.js або Astro",
        "оновлення metadata, sitemap, canonical і технічної структури",
        "план rollout і post-launch перевірка",
      ],
      fitFor: [
        "сайтів після років точкових правок",
        "бізнесу, який переходить на новий стек",
        "проєктів після ребрендингу або зміни позиціонування",
        "команд, яким потрібно зберегти SEO і не зламати індексацію",
      ],
      faq: [
        {
          question: "Чи можна оновити сайт поетапно, а не одним великим релізом?",
          answer:
            "Так. У багатьох кейсах це навіть безпечніше: розбиваємо реліз на логічні етапи і зменшуємо ризики.",
        },
        {
          question: "Чи допомагаєте ви з SEO-частиною міграції?",
          answer:
            "Так. Redirect map, metadata, canonical, sitemap, структура сторінок і базові перевірки після запуску входять у логіку такої роботи.",
        },
      ],
    },
    {
      slug: "seo-support-retainers",
      title: "Технічне SEO та підтримка сайту",
      shortTitle: "SEO / support",
      metaTitle: "Технічне SEO, підтримка і постійне покращення сайту",
      metaDescription:
        "Підтримую сайти на React, Next.js і Astro: технічне SEO, Core Web Vitals, контентні правки, QA, аналітика і регулярні технічні покращення.",
      heroTitle: "Підтримка сайту, коли потрібен не хаос правок, а стабільний технічний ритм",
      heroDescription:
        "Це формат для бізнесу, в якого сайт вже працює, але потребує регулярних технічних покращень: SEO, швидкість, дрібні релізи, виправлення аналітики, QA і контроль якості без накопичення боргу.",
      priceFrom: "від 350 EUR / міс",
      keywords: [
        "website support retainer",
        "технічне seo підтримка",
        "next.js maintenance",
        "core web vitals optimization",
        "site support monthly",
      ],
      outcomes: [
        "сайт розвивається без накопичення дрібного технічного боргу",
        "SEO і швидкість підтримуються системно, а не хаотично",
        "менше ризику ламати прод через несистемні правки",
        "зрозуміліший технічний backlog і пріоритети",
      ],
      deliverables: [
        "щомісячний список пріоритетних технічних задач",
        "правки по SEO, швидкості й Core Web Vitals",
        "оновлення сторінок, блоків і невеликих функцій",
        "QA, перевірка аналітики і технічний контроль релізів",
        "рекомендації по наступних етапах росту",
      ],
      fitFor: [
        "бізнесу після запуску нового сайту",
        "маркетингових сайтів з регулярними кампаніями",
        "команд без окремого in-house frontend ресурсу",
        "проєктів, де важливо не лише запустити, а й нормально вести сайт далі",
      ],
      faq: [
        {
          question: "Це фіксований пакет чи гнучка підтримка?",
          answer:
            "Залежить від формату співпраці. Зазвичай є базовий місячний обсяг і пріоритетний backlog, який ми закриваємо ітераціями.",
        },
        {
          question: "Чи входять сюди нові невеликі блоки і сторінки?",
          answer:
            "Так, якщо це в межах узгодженого обсягу. Більші модулі або окремі функції краще виносити в окремий scope.",
        },
      ],
    },
    {
      slug: "seo-optimization",
      title: "Технічна SEO-оптимізація сайтів",
      shortTitle: "SEO-оптимізація",
      metaTitle: "Технічна SEO-оптимізація сайтів для бізнесу",
      metaDescription:
        "Покращую технічну SEO-основу сайтів: швидкість, метадані, schema.org, внутрішня структура, індексація та Core Web Vitals для бізнесу.",
      heroTitle: "Технічне SEO, яке покращує видимість без магії",
      heroDescription:
        "Працюю з тим, що реально впливає на індексацію і видимість: структура сторінок, метадані, внутрішні посилання, sitemap, schema.org, швидкість і зручність на мобільних пристроях.",
      priceFrom: "від 600 EUR",
      keywords: [
        "технічне SEO",
        "SEO оптимізація сайту",
        "оптимізація Core Web Vitals",
        "SEO для Next.js",
        "SEO-аудит",
      ],
      outcomes: [
        "чисті title і description без дублювання",
        "краща індексація важливих сторінок",
        "зрозуміла структура під комерційні запити",
        "покращення швидкості й Core Web Vitals",
      ],
      deliverables: [
        "SEO-аудит технічної частини",
        "виправлення метаданих і canonical",
        "schema.org, sitemap і robots покращення",
        "внутрішні перелінковки й структура сторінок",
        "список пріоритетних контентних SEO-задач",
      ],
      fitFor: [
        "сайтів послуг",
        "корпоративних сайтів",
        "магазинів на Next.js",
        "проєктів після редизайну або міграції",
      ],
      faq: [
        {
          question: "Чи займаєтесь ви контентною SEO-стратегією?",
          answer:
            "Так, але мій фокус саме на технічній основі й структурі сторінок. За потреби я також пропоную контентний план під комерційні сторінки.",
        },
        {
          question: "Чи можна оптимізувати існуючий сайт без повної переробки?",
          answer:
            "Так. Багато проблем вирішуються без повного редизайну: виправлення метаданих, структури, швидкості та індексації дають відчутний ефект.",
        },
      ],
    },
  ],
  en: [
    {
      slug: "landing-pages",
      title: "End-to-end landing page development",
      shortTitle: "Landing page",
      metaTitle: "Landing page development for businesses in Europe",
      metaDescription:
        "I build end-to-end landing pages for SaaS, service companies, experts and local businesses in Europe. Fast launch, strong structure, SEO-ready foundation and conversion focus.",
      heroTitle: "Landing pages for paid traffic, sales and demand validation",
      heroDescription:
        "A strong fit when you need a focused page for ads, product presentation or lead generation. I shape the structure, define the content blocks, build the page with React / Next.js and prepare it for analytics and SEO.",
      priceFrom: "from 800 EUR",
      keywords: [
        "landing page development",
        "landing page for SaaS",
        "landing page Europe",
        "conversion-focused landing page",
        "Next.js landing page",
      ],
      outcomes: [
        "clear structure built around one target action",
        "faster launch of paid acquisition campaigns",
        "mobile-friendly experience for paid traffic",
        "ready for analytics and A/B testing",
      ],
      deliverables: [
        "page structure or block-level wireframe",
        "landing page development with Next.js",
        "baseline SEO optimization",
        "forms, analytics and event tracking setup",
        "launch-ready implementation",
      ],
      fitFor: [
        "SaaS and tech products",
        "consulting and expert services",
        "B2B lead generation",
        "local service businesses in Europe",
      ],
      faq: [
        {
          question: "How long does landing page development take?",
          answer:
            "Usually 1-2 weeks if the structure is approved and the materials are available. If copy, wireframes and design need to be created from scratch, the timeline is longer.",
        },
        {
          question: "Can paid ads be connected right after launch?",
          answer:
            "Yes. I prepare the page for analytics, events, forms and the technical requirements needed for paid traffic from the start.",
        },
      ],
    },
    {
      slug: "corporate-websites",
      title: "Corporate website development",
      shortTitle: "Corporate websites",
      metaTitle: "Corporate website development for companies in Europe",
      metaDescription:
        "Corporate website development for B2B, service and manufacturing companies in Europe. Clear structure, strong service presentation, SEO and technical reliability.",
      heroTitle: "A corporate website that explains your value and supports sales",
      heroDescription:
        "I build multi-page websites for companies that need to look credible, explain their services clearly and generate inquiries from new clients across Europe.",
      priceFrom: "from 1600 EUR",
      keywords: [
        "corporate website development",
        "company website development",
        "B2B website Europe",
        "service company website",
        "multi-page website development",
      ],
      outcomes: [
        "clear structure for services and case studies",
        "stronger trust through company presentation",
        "dedicated landing pages for service directions",
        "better visibility for commercial search intent",
      ],
      deliverables: [
        "site map and page structure",
        "homepage, services, about, case studies and contact pages",
        "component-based Next.js development",
        "SEO metadata, schema.org and sitemap",
        "forms, integrations and basic CMS if needed",
      ],
      fitFor: [
        "B2B companies",
        "agencies and studios",
        "manufacturing and logistics businesses",
        "local companies entering international markets",
      ],
      faq: [
        {
          question: "Can new pages be added after launch?",
          answer:
            "Yes. I set up the architecture so the website can scale without rebuilding the foundation later.",
        },
        {
          question: "Is a corporate website a good SEO format?",
          answer:
            "Yes. It is one of the strongest formats for service SEO because it allows you to create dedicated pages for specific search intents.",
        },
      ],
    },
    {
      slug: "astro-content-websites",
      title: "Astro content website development",
      shortTitle: "Astro websites",
      metaTitle: "Astro website development for content and SEO-focused projects",
      metaDescription:
        "I build fast content and marketing websites with Astro for blogs, editorial projects, SEO growth and lightweight commercial websites.",
      heroTitle: "Astro websites for speed, content clarity and SEO growth",
      heroDescription:
        "This format fits content-heavy and marketing-led projects where fast delivery, clean architecture and strong performance matter more than a large application layer.",
      priceFrom: "from 1200 EUR",
      keywords: [
        "Astro website development",
        "Astro SEO website",
        "content website development",
        "marketing website Astro",
        "Astro developer Europe",
      ],
      outcomes: [
        "fast loading and stronger Core Web Vitals",
        "clear structure for SEO and content scaling",
        "less technical overhead for content-led projects",
        "a cleaner system for blogs, editorial sites and knowledge hubs",
      ],
      deliverables: [
        "content architecture planning",
        "Astro website implementation",
        "content collections or scalable page setup",
        "SEO metadata, sitemap and schema.org",
        "light interactive islands only where they add value",
      ],
      fitFor: [
        "editorial and content-driven projects",
        "SEO-led marketing websites",
        "knowledge bases and documentation hubs",
        "businesses that need maximum speed without complex app logic",
      ],
      faq: [
        {
          question: "When is Astro a better choice than Next.js?",
          answer:
            "When the project is mostly content-focused and does not need complex product logic. In those cases Astro is often lighter, faster and easier to maintain.",
        },
        {
          question: "Can interactive elements still be added to an Astro site?",
          answer:
            "Yes. React islands can be added for forms, calculators, filters or other local interaction zones when needed.",
        },
      ],
    },
    {
      slug: "ecommerce-development",
      title: "E-commerce development",
      shortTitle: "E-commerce stores",
      metaTitle: "E-commerce development for brands and retail in Europe",
      metaDescription:
        "I build e-commerce stores for brands and retailers in Europe with catalogues, product pages, checkout flows, integrations, SEO structure and high performance.",
      heroTitle: "An e-commerce store that feels smooth and does not slow sales down",
      heroDescription:
        "I work on e-commerce projects where speed, clean UX, SEO-ready categories and technical readiness for assortment growth, marketing and integrations matter.",
      priceFrom: "from 2500 EUR",
      keywords: [
        "e-commerce development",
        "online store development",
        "Next.js ecommerce development",
        "custom storefront",
        "ecommerce Europe",
      ],
      outcomes: [
        "convenient catalogue and filtering",
        "fast mobile-first storefront",
        "SEO-ready category structure",
        "ready for payment and CRM integrations",
      ],
      deliverables: [
        "catalogue and product page architecture",
        "storefront front-end with Next.js",
        "checkout and order forms",
        "CMS, CRM or payment integrations",
        "technical SEO optimization for the store",
      ],
      fitFor: [
        "D2C brands",
        "niche online shops",
        "B2B catalogues with ordering flows",
        "stores that need a custom setup",
      ],
      faq: [
        {
          question: "Do you build custom stores rather than templates?",
          answer:
            "Yes. If an off-the-shelf template does not fit your sales logic, I build a custom storefront and the integrations you need.",
        },
        {
          question: "Can we start with an e-commerce MVP?",
          answer:
            "Yes. In many cases that is the best route: launch a lean version first and add modules as the business grows.",
        },
      ],
    },
    {
      slug: "payment-gateway-integration",
      title: "Payment gateway integration",
      shortTitle: "Payment integrations",
      metaTitle: "Payment gateway integration for websites and web products",
      metaDescription:
        "I integrate payment gateways into websites, storefronts and web products with reliable checkout flows, status handling, events, webhooks and technical clarity.",
      heroTitle: "Payment integration that keeps checkout stable and orders under control",
      heroDescription:
        "If you already have a storefront, website or MVP, I connect the payment layer so it works reliably: statuses, success and failure flows, events, webhooks and a clean technical handoff.",
      priceFrom: "from 450 EUR",
      keywords: [
        "payment gateway integration",
        "checkout integration next.js",
        "website payment integration",
        "React payment gateway",
        "custom checkout flow",
      ],
      outcomes: [
        "stable checkout without manual workarounds",
        "correct handling of success, fail and pending states",
        "ready for analytics and conversion tracking",
        "lower risk of lost orders due to technical gaps",
      ],
      deliverables: [
        "checkout flow and risk-point review",
        "payment form or provider integration",
        "callback, webhook and status sync handling",
        "tracking for critical payment events",
        "technical documentation and handoff",
      ],
      fitFor: [
        "e-commerce storefronts",
        "digital products with payments",
        "booking or service platforms",
        "projects that need custom checkout logic",
      ],
      faq: [
        {
          question: "Do you only handle the front-end part of the payment flow?",
          answer:
            "No. I can also cover the server-side layer: statuses, validation, webhook handling, order synchronization and payment-related events.",
        },
        {
          question: "Can local or non-standard payment providers be integrated too?",
          answer:
            "Yes, as long as there is usable technical documentation or a workable API. The final scope depends on the protocol complexity and business logic.",
        },
      ],
    },
    {
      slug: "crm-integrations",
      title: "CRM integration and lead routing",
      shortTitle: "CRM integrations",
      metaTitle: "CRM integration for websites, forms and sales workflows",
      metaDescription:
        "I connect websites and web products to CRM systems through forms, lead routing, source fields, event sync and workflow automation that reduces manual work.",
      heroTitle: "CRM integration that removes friction between your website and sales flow",
      heroDescription:
        "This service fits when leads exist, but get lost, duplicated or enter the CRM without the right context. I build a cleaner path from form or event to the sales team.",
      priceFrom: "from 700 EUR",
      keywords: [
        "CRM integration",
        "website crm integration",
        "lead routing automation",
        "form to CRM integration",
        "sales workflow sync",
      ],
      outcomes: [
        "leads reach the CRM without manual copy-paste work",
        "submissions include source context and key fields",
        "less friction between marketing and sales",
        "clearer visibility into channel performance",
      ],
      deliverables: [
        "review of the current lead flow",
        "field mapping from forms or events into the CRM",
        "lead routing and base automation triggers",
        "source, UTM and business-field synchronization",
        "technical testing and handoff",
      ],
      fitFor: [
        "B2B and service websites",
        "marketing sites with paid acquisition",
        "sales teams that need a cleaner lead flow",
        "businesses where the form exists but the follow-up system does not work",
      ],
      faq: [
        {
          question: "Can CRM integration be added to an existing site without a full redesign?",
          answer:
            "Yes. In most cases it is a separate technical layer that can be added without rebuilding the full website.",
        },
        {
          question: "Do you work with custom fields, tags and segmentation logic?",
          answer:
            "Yes. That is often the main value of the integration, because without structure a CRM quickly turns into operational noise.",
        },
      ],
    },
    {
      slug: "web-app-development",
      title: "Web application development",
      shortTitle: "Web applications",
      metaTitle: "Web application development with React and Next.js for Europe",
      metaDescription:
        "Web application development with React, Next.js and TypeScript for SaaS, internal systems and client platforms in Europe. Reliable architecture, UX and scalability.",
      heroTitle: "Web apps for SaaS, client portals and internal platforms",
      heroDescription:
        "When a regular website is no longer enough, I move into product interface work: user roles, dashboards, integrations, APIs, complex logic and future scaling.",
      priceFrom: "from 3000 EUR",
      keywords: [
        "web application development",
        "React developer Europe",
        "Next.js developer Europe",
        "SaaS development",
        "custom web application",
      ],
      outcomes: [
        "usable interface for daily workflows",
        "scalable front-end architecture",
        "clear scenarios for roles and access",
        "ready for further product development",
      ],
      deliverables: [
        "module planning and user flows",
        "interface development with React / Next.js",
        "API and backend integration",
        "authentication, roles and dashboards",
        "testing and technical handoff for the module",
      ],
      fitFor: [
        "SaaS products",
        "customer portals",
        "internal dashboards",
        "MVPs for digital products",
      ],
      faq: [
        {
          question: "Do you work only on front-end or on full stack too?",
          answer:
            "I can cover the fullstack part or work together with your backend team. The exact setup depends on the project architecture.",
        },
        {
          question: "Is this a good fit for a startup MVP?",
          answer:
            "Yes. A web app MVP is often the best format for validating a product without overspending on the first release.",
        },
      ],
    },
    {
      slug: "website-relaunch-migration",
      title: "Website relaunch and migration",
      shortTitle: "Relaunch / migration",
      metaTitle: "Website relaunch, redesign and migration to Next.js or Astro",
      metaDescription:
        "I relaunch websites, migrate them to Next.js or Astro, remove technical debt, preserve SEO signals and create a cleaner base for future growth.",
      heroTitle: "Website relaunch without losing structure, SEO and delivery control",
      heroDescription:
        "If the current website is outdated, slow to maintain or no longer fits the business, I build a cleaner version with a controlled migration path, rollout planning and stronger technical foundations.",
      priceFrom: "from 900 EUR",
      keywords: [
        "website relaunch",
        "site migration next.js",
        "website redesign migration",
        "SEO-safe migration",
        "Astro migration",
      ],
      outcomes: [
        "cleaner technical foundation with less debt",
        "controlled transition for content and URLs",
        "better speed and easier long-term maintenance",
        "lower SEO risk during the new release rollout",
      ],
      deliverables: [
        "audit of the current website and risk areas",
        "migration plan for content, URLs and redirects",
        "new front-end implementation with Next.js or Astro",
        "metadata, sitemap, canonical and structural cleanup",
        "rollout plan and post-launch verification",
      ],
      fitFor: [
        "sites that grew through years of fragmented edits",
        "businesses moving to a new technical stack",
        "projects after rebranding or repositioning",
        "teams that need to preserve SEO and avoid indexing damage",
      ],
      faq: [
        {
          question: "Can a relaunch be split into stages instead of one big release?",
          answer:
            "Yes. In many cases that is the safer route: the rollout is divided into logical phases so the risk stays lower and the transition remains controlled.",
        },
        {
          question: "Do you cover the SEO side of the migration too?",
          answer:
            "Yes. Redirect mapping, metadata, canonical handling, sitemap updates, structure review and post-launch checks are part of this work.",
        },
      ],
    },
    {
      slug: "seo-support-retainers",
      title: "Technical SEO and website support",
      shortTitle: "SEO / support",
      metaTitle: "Technical SEO, website support and ongoing optimization",
      metaDescription:
        "I support React, Next.js and Astro websites through technical SEO, Core Web Vitals work, page updates, QA, analytics fixes and structured ongoing improvement.",
      heroTitle: "Website support for teams that need steady technical momentum, not random fixes",
      heroDescription:
        "This format fits businesses with a live site that now needs regular technical improvement: SEO work, performance updates, small releases, analytics corrections, QA and controlled product quality.",
      priceFrom: "from 350 EUR / month",
      keywords: [
        "website support retainer",
        "technical SEO support",
        "Next.js maintenance",
        "Core Web Vitals optimization",
        "monthly website support",
      ],
      outcomes: [
        "the website evolves without small technical debt piling up",
        "SEO and performance are maintained systematically",
        "less production risk from ad hoc changes",
        "clearer backlog and technical priorities over time",
      ],
      deliverables: [
        "monthly priority task list",
        "SEO, speed and Core Web Vitals improvements",
        "page, block and small feature updates",
        "QA, analytics review and release checks",
        "recommendations for the next growth stages",
      ],
      fitFor: [
        "businesses after a new website launch",
        "marketing websites with recurring campaigns",
        "teams without a dedicated in-house front-end resource",
        "projects where launch is only the beginning and stable maintenance matters",
      ],
      faq: [
        {
          question: "Is this a fixed support package or a flexible retainer?",
          answer:
            "That depends on the collaboration format. Usually there is a base monthly scope with a prioritized backlog handled in iterations.",
        },
        {
          question: "Can this include new small blocks or pages too?",
          answer:
            "Yes, if they fit within the agreed support scope. Larger features or new modules are better separated into a distinct project scope.",
        },
      ],
    },
    {
      slug: "seo-optimization",
      title: "Technical SEO optimization",
      shortTitle: "SEO optimization",
      metaTitle: "Technical SEO optimization for businesses in Europe",
      metaDescription:
        "I improve the technical SEO foundation of websites: speed, metadata, schema.org, internal structure, indexing and Core Web Vitals for businesses in Europe.",
      heroTitle: "Technical SEO that improves visibility without vague promises",
      heroDescription:
        "I focus on what actually impacts indexing and visibility: page structure, metadata, internal links, sitemap, schema.org, speed and mobile usability.",
      priceFrom: "from 600 EUR",
      keywords: [
        "technical SEO",
        "website SEO optimization",
        "Core Web Vitals optimization",
        "Next.js SEO",
        "SEO audit Europe",
      ],
      outcomes: [
        "clean titles and descriptions without duplication",
        "better indexing for important pages",
        "clear structure for commercial intent",
        "improved speed and Core Web Vitals",
      ],
      deliverables: [
        "technical SEO audit",
        "metadata and canonical fixes",
        "schema.org, sitemap and robots improvements",
        "internal linking and page structure updates",
        "prioritized list of content and SEO tasks",
      ],
      fitFor: [
        "service websites",
        "corporate websites",
        "Next.js stores",
        "projects after redesign or migration",
      ],
      faq: [
        {
          question: "Do you also work on content SEO strategy?",
          answer:
            "Yes, but my main focus is the technical foundation and page structure. If needed, I can also define a content plan for commercial pages.",
        },
        {
          question: "Can an existing website be optimized without a full rebuild?",
          answer:
            "Yes. Many issues can be fixed without a full redesign: metadata, structure, speed and indexing improvements often make a measurable difference.",
        },
      ],
    },
  ],
};

export const servicePageSlugs = servicePagesByLocale.uk.map(
  (service) => service.slug,
);
export const servicePages = servicePagesByLocale.uk;

export function getServicePages(locale: Locale): ServicePage[] {
  return servicePagesByLocale[locale];
}

export function getServicePage(slug: string): ServicePage | undefined;
export function getServicePage(
  locale: Locale,
  slug: string,
): ServicePage | undefined;
export function getServicePage(
  localeOrSlug: Locale | string,
  maybeSlug?: string,
): ServicePage | undefined {
  if (maybeSlug === undefined) {
    return servicePagesByLocale.uk.find(
      (service) => service.slug === localeOrSlug,
    );
  }

  return servicePagesByLocale[localeOrSlug as Locale].find(
    (service) => service.slug === maybeSlug,
  );
}
