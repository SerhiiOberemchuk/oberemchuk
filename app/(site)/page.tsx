import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ServicesSection from "@/components/sections/services-section"
import ContactSection from "@/components/sections/contact-section"
import FaqSection from "@/components/faq-section"
import JsonLd from "@/components/json-ld"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Serhii Oberemchuk",
    jobTitle: "Web Developer",
    description: "Професійний веб-розробник з України, який створює швидкі, сучасні та функціональні вебсайти",
    url: "https://www.oberemchuk.site",
    logo: "https://www.oberemchuk.site/icon.png",
    image: "https://www.oberemchuk.site/og-image.png",
    email: "serhiioberemchuk@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Ukraine",
    },
    sameAs: [
      "https://www.linkedin.com/in/serhii-oberemchuk",
      "https://github.com/oberemchuk",
      "https://t.me/SerhiiOberemchuk",
    ],
    knowsAbout: ["Web Development", "Web Design", "SEO Optimization", "React", "Next.js", "JavaScript"],
    areaServed: {
      "@type": "Country",
      name: "Ukraine",
    },
    offers: {
      "@type": "Offer",
      itemOffered: [
        {
          "@type": "Service",
          name: "Веб-дизайн",
          description: "Створюю унікальний, сучасний дизайн, який відображає вашу індивідуальність та цінності бренду.",
        },
        {
          "@type": "Service",
          name: "Розробка",
          description:
            "Розробляю функціональні вебсайти з чистим кодом, семантичною версткою та оптимальною швидкістю.",
        },
        {
          "@type": "Service",
          name: "SEO-оптимізація",
          description: "Оптимізую ваш сайт для пошукових систем, щоб збільшити органічний трафік та видимість.",
        },
      ],
    },
  }

  const faqs = [
    {
      question: "Скільки коштує розробка вебсайту?",
      answer:
        "Вартість розробки залежить від складності проекту. Простий лендінг від $800, корпоративний сайт від $1200, інтернет-магазин від $1500. Я завжди надаю детальну консультацію та розрахунок вартості для вашого конкретного проекту.",
    },
    {
      question: "Скільки часу займає розробка?",
      answer:
        "Терміни залежать від складності: лендінг - 1-2 тижні, корпоративний сайт - 3-4 тижні, складний проект - 1-3 місяці. Я завжди дотримуюся узгодженого графіка та інформую про прогрес.",
    },
    {
      question: "Чи надаєте підтримку після запуску?",
      answer:
        "Так, я пропоную повний спектр послуг з підтримки: технічна підтримка, оновлення контенту, моніторинг безпеки, резервне копіювання. Можу запропонувати різні пакети підтримки залежно від ваших потреб.",
    },
    {
      question: "Чи працюєте з мобільними пристроями?",
      answer:
        "Абсолютно! Всі мої сайти створюються з адаптивним дизайном для оптимального відображення на смартфонах, планшетах та комп'ютерах. Мобільна оптимізація - це стандарт моєї роботи.",
    },
    {
      question: "Чи включена SEO-оптимізація?",
      answer:
        "Базова SEO-оптимізація входить у всі пакети: чистий код, правильна структура, оптимізовані зображення, метатеги. Для глибшої оптимізації пропоную додаткові SEO-послуги.",
    },
    {
      question: "Чи можете оновити існуючий сайт?",
      answer:
        "Так, я пропоную модернізацію існуючих сайтів: оновлення дизайну, покращення функціональності, оптимізація швидкості, мобільна адаптація. Проведу аудит та запропоную оптимальне рішення.",
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FaqSection
        title="Часті запитання"
        subtitle="Відповіді на найпоширеніші питання про розробку вебсайтів"
        faqs={faqs}
      />
      <ContactSection />
    </>
  )
}
