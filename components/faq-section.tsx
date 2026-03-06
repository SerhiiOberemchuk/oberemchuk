"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import AnimationWrapper from "@/components/animation-wrapper";

interface FAQ {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export default function FaqSection({ title, subtitle, faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-title" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <header className="text-center mb-16">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </header>
        </AnimationWrapper>

        <ul className="max-w-3xl mx-auto space-y-4" aria-label="Поширені запитання">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const contentId = `faq-content-${index}`;

            return (
              <li key={faq.question}>
                <AnimationWrapper animation="slide-up" delay={index * 100}>
                  <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardHeader className="p-0">
                      <h3>
                        <button
                          id={triggerId}
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                          aria-expanded={isOpen}
                          aria-controls={contentId}
                        >
                          <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                          <span
                            className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            aria-hidden="true"
                          >
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </span>
                        </button>
                      </h3>
                    </CardHeader>
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <CardContent className="pt-0 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </div>
                  </Card>
                </AnimationWrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

