import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import EditorialOrbit from "@/components/editorial-orbit"

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
  return (
    <section className="px-4 py-24 md:px-6" aria-labelledby="seo-content-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="slide-up">
          <div className="premium-panel p-8 text-white md:p-10">
            <div className="premium-grid" />
            <div className="relative z-10">
              <div className="mb-14 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                <div>
                  <Badge variant="secondary" className="mb-5 border-white/14 bg-white/6 text-white">
                    {badge}
                  </Badge>
                  <h2 id="seo-content-title" className="text-4xl md:text-6xl">
                    {title}
                  </h2>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-white/72">{description}</p>
              </div>

              <div className="grid gap-12 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="grid gap-0 border-y border-white/12">
                  {pillars.map((item, index) => (
                    <div
                      key={item.title}
                      className={`grid gap-5 py-6 md:grid-cols-[auto_1fr] ${index !== 0 ? "border-t border-white/10" : ""}`}
                    >
                      <p className="pt-1 text-[0.9rem] font-semibold tracking-[0.18em] text-[rgba(217,111,58,0.95)]">
                        0{index + 1}
                      </p>
                      <div>
                        <h3 className="text-[1.65rem] leading-tight">{item.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-10">
                  <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">{keywordsTitle}</p>
                      <div className="flex flex-wrap gap-3">
                        {keywords.map((item) => (
                          <span
                            key={item}
                            className="inline-flex border border-white/14 bg-white/6 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/84"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <EditorialOrbit className="hidden w-32 opacity-75 md:block" accentClassName="text-[rgba(217,111,58,0.9)]" />
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">{reasonsTitle}</p>
                    <ul className="space-y-3">
                      {reasons.map((item) => (
                        <li key={item} className="border-b border-white/8 pb-3 text-sm leading-7 text-white/72 last:border-b-0">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-14 grid gap-6 border-t border-white/12 pt-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">{ctaTitle}</p>
                <div>
                  <p className="max-w-4xl text-[2.1rem] leading-[1.04] md:text-[3rem]">
                    SEO should sit inside the product logic, not hang on the page like a checklist.
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-white/72">{ctaDescription}</p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button asChild size="lg">
                      <SmoothScrollLink href="#contact">
                        {primaryCta}
                        <ArrowRight className="h-4 w-4" />
                      </SmoothScrollLink>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white/18 bg-white/4 text-white hover:bg-white/10 hover:border-white/28">
                      <SmoothScrollLink href="#services">{secondaryCta}</SmoothScrollLink>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
