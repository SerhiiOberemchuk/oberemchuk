"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <div className="text-center mb-16">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </AnimationWrapper>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimationWrapper key={index} animation="slide-up" delay={index * 100}>
              <Card className="mb-4 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardHeader className="hover:bg-gray-50 transition-colors duration-200">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                    >
                      <span className="text-left">{faq.question}</span>
                      <span
                        className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      </span>
                    </button>
                  </CardTitle>
                </CardHeader>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <CardContent className="pt-0 pb-6">
                    <div className="transform transition-transform duration-300 ease-out">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
