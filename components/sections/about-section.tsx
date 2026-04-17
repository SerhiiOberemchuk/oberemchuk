import { Code, Palette, Search, Server, Smartphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"

type AboutItem = {
  title: string
  description: string
}

type AboutStat = {
  value: string
  label: string
}

type AboutSectionProps = {
  title: string
  subtitle: string
  valueTitle: string
  skillsTitle: string
  processTitle: string
  technologiesTitle: string
  paragraphs: string[]
  skills: AboutItem[]
  process: AboutItem[]
  summaryStats: AboutStat[]
}

export default function AboutSection({
  title,
  subtitle,
  valueTitle,
  skillsTitle,
  processTitle,
  technologiesTitle,
  paragraphs,
  skills,
  process,
  summaryStats
}: AboutSectionProps) {
  const isEnglish = title === "About me"
  const positioningLabel = isEnglish ? "Positioning" : "Позиціонування"
  const manifesto = isEnglish
    ? "I work where product clarity, digital taste and technical rigor need to hold together."
    : "Працюю там, де продуктова ясність, цифровий смак і технічна строгість мають триматися разом."
  const toolingLabel = isEnglish ? "Selected stack and delivery tools" : "Ключовий стек і робочі інструменти"
  const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Figma", "SEO"]
  const skillIcons = [Code, Server, Palette, Search, Smartphone]

  return (
    <section id="about" className="px-4 py-24 md:px-6" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-16 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                {positioningLabel}
              </p>
              <h2 id="about-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">
                {title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{subtitle}</p>
          </div>
        </AnimationWrapper>

        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimationWrapper animation="slide-left">
            <div className="space-y-10">
              <div className="border-t border-[rgba(24,31,43,0.18)] pt-8">
                <p className="max-w-4xl text-[2.4rem] leading-[1.03] text-[hsl(var(--foreground))] md:text-[3.6rem]">
                  {manifesto}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                {summaryStats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="border-t border-[rgba(24,31,43,0.16)] pt-4">
                    <p className="text-[2.4rem] leading-none text-[hsl(var(--foreground))] md:text-[3rem]">{stat.value}</p>
                    <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--foreground))]/56">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 text-base leading-8 text-[hsl(var(--foreground))]/68">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="grid gap-10">
              <div className="grid gap-5 border-t border-[rgba(24,31,43,0.18)] pt-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    {skillsTitle}
                  </p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{valueTitle}</p>
                </div>

                <ul className="grid gap-5">
                  {skills.map((skill, index) => {
                    const Icon = skillIcons[index] ?? Code
                    return (
                      <li key={skill.title} className="grid gap-3 border-b border-[rgba(24,31,43,0.12)] pb-5 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.94)] text-[hsl(var(--foreground))] shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-[1.45rem] leading-tight text-[hsl(var(--foreground))]">{skill.title}</h3>
                        </div>
                        <p className="pl-15 text-sm leading-7 text-[hsl(var(--foreground))]/68">{skill.description}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="border-t border-[rgba(24,31,43,0.18)] pt-6">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    {processTitle}
                  </p>
                  <ol className="space-y-5">
                    {process.map((step, index) => (
                      <li key={step.title} className="border-b border-[rgba(24,31,43,0.12)] pb-5 last:border-b-0 last:pb-0">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--primary))]">0{index + 1}</p>
                        <h3 className="mt-2 text-xl text-[hsl(var(--foreground))]">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[hsl(var(--foreground))]/68">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-l border-[rgba(24,31,43,0.12)] pl-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    {technologiesTitle}
                  </p>
                  <p className="mb-5 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{toolingLabel}</p>
                  <div className="flex flex-wrap gap-3">
                    {technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
