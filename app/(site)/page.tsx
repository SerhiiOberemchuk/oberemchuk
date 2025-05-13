import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"
import FaqSection from "@/components/faq-section"
import JsonLd from "@/components/json-ld"
import SeoSection from "@/components/sections/seo-section"

export default function Home() {
  // Структуровані дані для головної сторінки
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Oberemchuk Serhii - Професійна розробка вебсайтів",
    description: "Створюємо швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати",
    url: "https://www.oberemchuk.site",
    logo: "https://www.oberemchuk.site/icon.png",
    image: "https://www.oberemchuk.site/og-image.png",
    telephone: "+380XXXXXXXXX",
    email: "serhiioberemchuk@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Ukraine",
    },
    priceRange: "$$",
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
    sameAs: ["https://www.linkedin.com/in/serhii-oberemchuk", "https://github.com/oberemchuk"],
    serviceType: ["Web Development", "Web Design", "SEO Optimization"],
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
          description:
            "Створюємо унікальний, сучасний дизайн, який відображає вашу індивідуальність та цінності бренду.",
        },
        {
          "@type": "Service",
          name: "Розробка",
          description:
            "Розробляємо функціональні вебсайти з чистим кодом, семантичною версткою та оптимальною швидкістю.",
        },
        {
          "@type": "Service",
          name: "SEO-оптимізація",
          description: "Оптимізуємо ваш сайт для пошукових систем, щоб збільшити органічний трафік та видимість.",
        },
      ],
    },
  }

  // Дані для FAQ секції
  const faqs = [
    {
      question: "Скільки коштує розробка вебсайту?",
      answer:
        "Вартість розробки вебсайту залежить від багатьох факторів: складності дизайну, функціональності, кількості сторінок та інших особливостей проекту. Ми пропонуємо індивідуальний підхід до ціноутворення, тому найкраще зв'язатися з нами для отримання детальної консультації та розрахунку вартості вашого проекту.",
    },
    {
      question: "Скільки часу займає розробка вебсайту?",
      answer:
        "Терміни розробки вебсайту варіюються залежно від складності проекту. Простий лендінг може бути готовий за 1-2 тижні, корпоративний сайт - за 3-4 тижні, а складний інтернет-магазин може зайняти 1-3 місяці. Ми завжди обговорюємо терміни на початку проекту і дотримуємося узгодженого графіка.",
    },
    {
      question: "Чи надаєте ви послуги з підтримки сайту після запуску?",
      answer:
        "Так, ми пропонуємо повний спектр послуг з підтримки та обслуговування вебсайтів після запуску. Це включає технічну підтримку, оновлення контенту, моніторинг безпеки, резервне копіювання даних та інші послуги. Ми можемо запропонувати різні пакети підтримки залежно від ваших потреб.",
    },
    {
      question: "Чи оптимізуєте ви сайти для мобільних пристроїв?",
      answer:
        "Абсолютно! Всі наші вебсайти розробляються з використанням адаптивного дизайну, який забезпечує оптимальне відображення на всіх пристроях: смартфонах, планшетах, ноутбуках та настільних комп'ютерах. Мобільна оптимізація є стандартом нашої роботи, а не додатковою опцією.",
    },
    {
      question: "Чи включає розробка сайту SEO-оптимізацію?",
      answer:
        "Так, базова SEO-оптимізація входить у всі наші пакети розробки. Ми створюємо сайти з чистим кодом, правильною структурою, оптимізованими зображеннями та метатегами. Для більш глибокої оптимізації ми пропонуємо додаткові послуги з SEO, які включають аналіз ключових слів, оптимізацію контенту та технічний аудит.",
    },
    {
      question: "Чи можете ви оновити мій існуючий сайт?",
      answer:
        "Так, ми пропонуємо послуги з оновлення та модернізації існуючих вебсайтів. Це може включати оновлення дизайну, покращення функціональності, оптимізацію швидкості завантаження, адаптацію для мобільних пристроїв та інші покращення. Ми проведемо аудит вашого поточного сайту і запропонуємо оптимальне рішення.",
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <FaqSection
        title="Часті запитання про розробку вебсайтів"
        subtitle="Відповіді на найпоширеніші запитання наших клієнтів"
        faqs={faqs}
      />
      <ContactSection />
      <SeoSection />
    </>
  )
}
