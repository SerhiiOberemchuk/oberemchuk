import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { Link } from "@/i18n/navigation"

type HeroStat = {
  value: string
  label: string
}

type HeroSectionProps = {
  badge: string
  titlePrefix: string
  titleHighlight: string
  titleSuffix: string
  description: string
  primaryCta: string
  secondaryCta: string
  stats: HeroStat[]
}

export default function HeroSection({
  badge,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  description,
  primaryCta,
  secondaryCta,
  stats
}: HeroSectionProps) {
  const isEnglish = titlePrefix === "I build"
  const manifestoLabel = isEnglish ? "Positioning" : "Позиціонування"
  const manifestoTitle = isEnglish ? "Commercial website logic, not freelance filler." : "Комерційна логіка сайту, а не фриланс-подача."
  const manifestoBody = isEnglish
    ? "Positioning, structure, development and launch are assembled as one system aimed at business impact."
    : "Позиціонування, структура, розробка і запуск збираються як одна система під бізнес-результат."
  const proofLabel = isEnglish ? "What matters" : "Що важливо"
  const proofBody = isEnglish
    ? "Not just a polished site, but a digital asset ready for traffic, trust and conversion."
    : "Не просто акуратний сайт, а цифровий актив, готовий до трафіку, довіри й конверсії."

  return (
    <section className="relative -mt-16 overflow-hidden px-4 pb-18 pt-22 md:px-6 md:pt-30" aria-labelledby="hero-title">
      <div className="absolute inset-x-0 top-0 -z-10 h-[58rem] bg-[radial-gradient(circle_at_8%_12%,rgba(220,92,40,0.18),transparent_25%),radial-gradient(circle_at_86%_10%,rgba(77,98,136,0.18),transparent_18%),linear-gradient(180deg,rgba(252,254,255,0.995)_0%,rgba(238,243,248,0.99)_46%,rgba(238,243,248,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[linear-gradient(180deg,rgba(15,23,42,0.06),transparent)]" />
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="grid gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:items-start">
            <div className="pt-8">
              <Badge variant="secondary" className="mb-8">
                {badge}
              </Badge>

              <h1
                id="hero-title"
                className="max-w-5xl text-[4.15rem] leading-[0.88] text-[hsl(var(--foreground))] md:text-[5.7rem] xl:text-[7.1rem]"
              >
                <span className="block">{titlePrefix}</span>
                <span className="block bg-[linear-gradient(180deg,hsl(var(--primary)),hsl(20_85%_36%))] bg-clip-text text-transparent">{titleHighlight}</span>
                <span className="block">{titleSuffix}</span>
              </h1>

              <div className="mt-10 grid gap-8 lg:grid-cols-[0.76fr_0.24fr] lg:items-end">
                <div>
                  <p className="max-w-2xl text-[1.08rem] leading-8 text-[hsl(var(--foreground))]/74 md:text-[1.18rem]">
                    {description}
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button asChild size="lg" className="min-w-[220px]">
                      <SmoothScrollLink href="#contact">
                        {primaryCta}
                        <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                      </SmoothScrollLink>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="min-w-[220px]">
                      <Link href="/portfolio">{secondaryCta}</Link>
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="premium-float-delayed rounded-[28px] border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.78)] p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[hsl(var(--foreground))]/54">
                      {proofLabel}
                    </p>
                    <p className="mt-4 max-w-[12rem] text-sm leading-7 text-[hsl(var(--foreground))]/72">{proofBody}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:pt-18">
              <div className="premium-float rounded-[34px] border border-[rgba(24,31,43,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,249,251,0.78))] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
                <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-1">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[hsl(var(--foreground))]/54">
                      {manifestoLabel}
                    </p>
                    <p className="mt-4 text-[2.05rem] leading-[1.04] text-[hsl(var(--foreground))] md:text-[2.45rem]">
                      {manifestoTitle}
                    </p>
                  </div>
                  <p className="max-w-xl border-l border-[rgba(24,31,43,0.14)] pl-5 text-base leading-8 text-[hsl(var(--foreground))]/72">
                    {manifestoBody}
                  </p>
                </div>
              </div>

              <dl className="grid gap-0 rounded-[30px] border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.82)] px-6 shadow-[0_22px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl">
                {stats.map((stat, index) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className={`group grid gap-3 py-5 transition-colors duration-300 md:grid-cols-[auto_1fr] md:items-end ${index !== 0 ? "border-t border-[rgba(24,31,43,0.12)]" : ""}`}
                  >
                    <dd className="text-[2.75rem] leading-none text-[hsl(var(--foreground))] transition-transform duration-300 group-hover:translate-x-0.5 md:text-[3.55rem]">{stat.value}</dd>
                    <dt className="max-w-[16rem] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--foreground))]/58 transition-colors duration-300 group-hover:text-[hsl(var(--foreground))]/72">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
