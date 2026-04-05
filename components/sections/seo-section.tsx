import { ArrowRight, CheckCircle, Globe, Search, Target, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"

type SeoItem = {
  title: string
  description: string
}

type SeoSectionProps = {
  badge: string
  title: string
  description: string
  keywordsTitle: string
  reasonsTitle: string
  ctaTitle: string
  ctaDescription: string
  primaryCta: string
  secondaryCta: string
  pillars: SeoItem[]
  keywords: string[]
  reasons: string[]
}

export default function SeoSection({
  badge,
  title,
  description,
  keywordsTitle,
  reasonsTitle,
  ctaTitle,
  ctaDescription,
  primaryCta,
  secondaryCta,
  pillars,
  keywords,
  reasons
}: SeoSectionProps) {
  const pillarIcons = [Target, Search, Globe, Zap]

  return (
    <section className="px-4 py-24 md:px-6" aria-labelledby="seo-content-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="slide-up">
          <div className="mb-16 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Badge variant="secondary" className="mb-5">
                {badge}
              </Badge>
              <h2 id="seo-content-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">
                {title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{description}</p>
          </div>
        </AnimationWrapper>

        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimationWrapper animation="slide-left">
            <div className="grid gap-0 border-y border-[rgba(24,31,43,0.12)]">
              {pillars.map((item, index) => {
                const Icon = pillarIcons[index] ?? Target
                return (
                  <div
                    key={item.title}
                    className={`grid gap-4 py-6 md:grid-cols-[auto_1fr] ${index !== 0 ? "border-t border-[rgba(24,31,43,0.08)]" : ""}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(24,31,43,0.08)] bg-white text-[hsl(var(--foreground))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-[1.55rem] leading-tight text-[hsl(var(--foreground))]">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="grid gap-10">
              <div className="border-t border-[rgba(24,31,43,0.14)] pt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{keywordsTitle}</p>
                <div className="flex flex-wrap gap-3">
                  {keywords.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-[rgba(24,31,43,0.08)] bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--foreground))]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-l border-[rgba(24,31,43,0.08)] pl-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{reasonsTitle}</p>
                <ul className="space-y-4">
                  {reasons.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
                      <p className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="slide-up">
          <div className="mt-12 border-t border-[rgba(24,31,43,0.14)] pt-8">
            <div className="grid gap-6 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{ctaTitle}</p>
              <div>
                <p className="max-w-4xl text-[2.1rem] leading-[1.04] text-[hsl(var(--foreground))] md:text-[3rem]">
                  SEO should sit inside the product logic, not hang on the page like a checklist.
                </p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[hsl(var(--muted-foreground))]">{ctaDescription}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <SmoothScrollLink href="#contact">
                      {primaryCta}
                      <ArrowRight className="h-4 w-4" />
                    </SmoothScrollLink>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <SmoothScrollLink href="#services">{secondaryCta}</SmoothScrollLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
