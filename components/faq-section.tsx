"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"

interface FAQ {
  question: string
  answer: string
}

interface FaqSectionProps {
  title: string
  subtitle: string
  faqs: FAQ[]
}

export default function FaqSection({ title, subtitle, faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const isEnglish = title === "Frequently asked questions"
  const clarityLabel = isEnglish ? "Clarity" : "Ясність"

  return (
    <section className="px-4 py-24 md:px-6" aria-labelledby="faq-title">
      <div className="mx-auto max-w-6xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {clarityLabel}
              </p>
              <h2 id="faq-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">
                {title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{subtitle}</p>
          </div>
        </AnimationWrapper>

        <div className="grid gap-0 border-y border-[rgba(24,31,43,0.12)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <AnimationWrapper key={faq.question} animation="slide-up" delay={index * 100}>
                <article className={index !== 0 ? "border-t border-[rgba(24,31,43,0.08)]" : ""}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-0 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                  >
                    <span className="max-w-4xl text-[1.55rem] leading-tight text-[hsl(var(--foreground))] md:text-[2rem]">{faq.question}</span>
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                        isOpen
                          ? "border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-white"
                          : "border-[rgba(24,31,43,0.12)] bg-white text-[hsl(var(--foreground))]"
                      } transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out ${isOpen ? "rotate-180 shadow-[0_10px_24px_rgba(24,31,43,0.16)]" : ""}`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    className={`${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} grid transition-all duration-300 ease-out`}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-4xl pb-6 pr-14 text-base leading-8 text-[hsl(var(--muted-foreground))]">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </article>
              </AnimationWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
