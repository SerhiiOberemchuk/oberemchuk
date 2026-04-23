import { ArrowUpRight, Clock3, FileText, LineChart, Search } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"
import { Button } from "@/components/ui/button"
import SmoothScrollLink from "@/components/smooth-scroll-link"

type OutcomeItem = {
  title: string
  description: string
}

type ClientOutcomesSectionProps = {
  title: string
  subtitle: string
  cta: string
  items: OutcomeItem[]
}

export default function ClientOutcomesSection({
  title,
  subtitle,
  cta,
  items
}: ClientOutcomesSectionProps) {
  const icons = [FileText, Clock3, LineChart, Search]

  return (
    <section className="px-4 py-24 md:px-6" aria-labelledby="client-outcomes-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {title}
              </p>
              <h2 id="client-outcomes-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">
                {subtitle}
              </h2>
            </div>
            <div className="lg:flex lg:justify-end">
              <Button asChild size="lg">
                <SmoothScrollLink href="#contact">
                  {cta}
                  <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                </SmoothScrollLink>
              </Button>
            </div>
          </div>
        </AnimationWrapper>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index] ?? FileText

            return (
              <AnimationWrapper
                key={item.title}
                animation="slide-up"
                delay={(index * 100) as 0 | 100 | 200 | 300 | 400 | 500}
              >
                <article className="h-full rounded-[1.75rem] border border-[rgba(24,31,43,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(24,31,43,0.1)] bg-[rgba(24,31,43,0.04)] text-[hsl(var(--foreground))]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-5 text-[1.7rem] leading-tight text-[hsl(var(--foreground))]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{item.description}</p>
                </article>
              </AnimationWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
