"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimationWrapper from "@/components/animation-wrapper"

export default function FAQSection() {
  const faqs = [
    {
      question: "Скільки часу займає розробка сайту?",
      answer:
        "Терміни залежать від складності проекту. Простий лендінг можу зробити за 1-2 тижні, корпоративний сайт - за 3-4 тижні, а складний веб-додаток може зайняти 1-3 місяці. Я завжди обговорюю реалістичні терміни на етапі планування.",
    },
    {
      question: "Чи працюєте ви з дизайнерами?",
      answer:
        "Так! Я активно співпрацюю з UI/UX дизайнерами для створення комплексних рішень. Якщо у вас є власний дизайнер - чудово, я ефективно втілю його макети в код. Якщо дизайнера немає, можу порекомендувати перевірених партнерів або створити базовий дизайн самостійно.",
    },
    {
      question: "Які технології ви використовуєте?",
      answer:
        "Я спеціалізуюся на сучасних технологіях: React, Next.js, TypeScript для фронтенду, Node.js для бекенду, PostgreSQL/MongoDB для баз даних. Також працюю з Tailwind CSS, Figma, і різними CMS системами залежно від потреб проекту.",
    },
    {
      question: "Чи надаєте ви підтримку після запуску?",
      answer:
        "Обов'язково! Я надаю гарантійну підтримку протягом 1 місяця після запуску безкоштовно. Також пропоную довгострокову підтримку, оновлення контенту, технічне обслуговування та розвиток функціональності за окремою домовленістю.",
    },
    {
      question: "Як формується вартість проекту?",
      answer:
        "Вартість залежить від складності, функціональності та термінів. Прості лендінги від $500, корпоративні сайти від $1500, інтернет-магазини від $2500. Після обговорення ваших потреб я надам детальну оцінку з розбивкою по етапах.",
    },
    {
      question: "Чи можете працювати з міжнародними клієнтами?",
      answer:
        "Так, я працюю з клієнтами з різних країн. Спілкуюся українською, російською та англійською мовами. Маю досвід роботи з різними часовими поясами та культурними особливостями ведення бізнесу.",
    },
    {
      question: "Що входить в 'рішення під ключ'?",
      answer:
        "Рішення під ключ включає: аналіз потреб, створення технічного завдання, дизайн (самостійно або з партнером-дизайнером), розробку, тестування, запуск, навчання роботі з сайтом та місяць безкоштовної підтримки. Ви отримуєте готовий до роботи продукт.",
    },
    {
      question: "Як проходить процес роботи?",
      answer:
        "1) Обговорення проекту та створення ТЗ, 2) Дизайн та узгодження макетів, 3) Розробка з регулярними демонстраціями прогресу, 4) Тестування та виправлення, 5) Запуск та навчання, 6) Підтримка. Ви завжди в курсі прогресу та можете вносити корективи.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="slide-up">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Часті питання</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Відповіді на найпоширеніші питання про мою роботу та процеси
            </p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="fade-in" delay={200}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
