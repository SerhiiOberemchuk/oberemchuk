"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AnimationWrapper from "@/components/animation-wrapper";
import JsonLd from "@/components/json-ld";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
}

export default function FaqSection({
  title = "Часті запитання",
  subtitle,
  faqs,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Структуровані дані для FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full py-12 md:py-24 bg-white overflow-hidden">
      <JsonLd data={faqJsonLd} />
      <div className="container mx-auto">
        <AnimationWrapper animation="slide-up">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </AnimationWrapper>

        <div className="mx-auto max-w-3xl mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <AnimationWrapper
              key={index}
              animation="fade-in"
              delay={(index * 100) as 0 | 100 | 200 | 300 | 400 | 500}
            >
              <div className="border rounded-lg overflow-hidden">
                <button
                  className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 p-4 pt-0" : "max-h-0"
                  }`}
                >
                  <div className="prose prose-gray max-w-none pt-4 border-t">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
