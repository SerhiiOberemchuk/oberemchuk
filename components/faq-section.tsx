import {ChevronDown} from "lucide-react";
import AnimationWrapper from "@/components/animation-wrapper";

interface FAQ {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle: string;
  label: string;
  faqs: FAQ[];
}

export default function FaqSection({
  title,
  subtitle,
  label,
  faqs
}: FaqSectionProps) {
  return (
    <section className="px-4 py-24 md:px-6" aria-labelledby="faq-title">
      <div className="mx-auto max-w-6xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {label}
              </p>
              <h2
                id="faq-title"
                className="text-4xl text-[hsl(var(--foreground))] md:text-6xl"
              >
                {title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              {subtitle}
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid gap-0 border-y border-[rgba(24,31,43,0.12)]">
          {faqs.map((faq, index) => (
            <AnimationWrapper
              key={faq.question}
              animation="slide-up"
              delay={index * 100}
            >
              <details
                name="faq-accordion"
                open={index === 0}
                className={`faq-item group ${index !== 0 ? "border-t border-[rgba(24,31,43,0.08)]" : ""}`}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 px-0 py-6 text-left"
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="max-w-4xl text-[1.55rem] leading-tight text-[hsl(var(--foreground))] md:text-[2rem]">
                    {faq.question}
                  </span>
                  <span className="faq-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(24,31,43,0.12)] bg-white text-[hsl(var(--foreground))] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out group-open:border-[hsl(var(--foreground))] group-open:bg-[hsl(var(--foreground))] group-open:text-white group-open:rotate-180 group-open:shadow-[0_10px_24px_rgba(24,31,43,0.16)]">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </summary>
                <div
                  id={`faq-panel-${index}`}
                  className="faq-panel grid overflow-hidden transition-all duration-300 ease-out"
                >
                  <div className="max-w-4xl pb-6 pr-14 text-base leading-8 text-[hsl(var(--muted-foreground))]">
                    {faq.answer}
                  </div>
                </div>
              </details>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
