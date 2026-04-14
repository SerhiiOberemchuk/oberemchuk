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
  process
}: AboutSectionProps) {
  const isEnglish = title === "About me"
  const positioningLabel = isEnglish ? "Working principles" : "Принципи роботи"
  const manifesto = isEnglish
    ? "The work is strongest when positioning, interface thinking and implementation quality are treated as one decision system."
    : "Найсильніший результат виходить тоді, коли позиціонування, інтерфейсне мислення і якість реалізації зібрані в одну систему рішень."
  const toolingLabel = isEnglish ? "Selected stack and delivery tools" : "Ключовий стек і робочі інструменти"
  const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Figma", "SEO"]
  const skillCodes = ["01", "02", "03", "04", "05"]
  const methodLabel = isEnglish ? "Method" : "Метод"
  const framingTitle = isEnglish ? "What clients actually buy here" : "Що тут реально купує клієнт"
  const framingPoints = isEnglish
    ? [
        "A sharper digital position, not just a nicer screen.",
        "One accountable layer from structure to release."
      ]
    : [
        "Чіткішу цифрову позицію, а не просто приємніший екран.",
        "Один відповідальний контур від структури до релізу."
      ]

  return (
    <section id="about" className="px-4 py-24 md:px-6" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-16 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="mb-4 editorial-kicker">{positioningLabel}</p>
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
              <div className="editorial-divider pt-8">
                <p className="max-w-4xl text-[2.35rem] leading-[1.01] text-[hsl(var(--foreground))] md:text-[3.65rem]">
                  {manifesto}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {framingPoints.map((point, index) => (
                  <div key={point} className={index === 1 ? "premium-panel p-6 text-white" : "editorial-surface p-6"}>
                    {index === 1 ? <div className="premium-grid" /> : null}
                    <div className="relative z-10">
                      <p className={`mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] ${index === 1 ? "text-white/56" : "text-[hsl(var(--muted-foreground))]"}`}>
                        {framingTitle}
                      </p>
                      <p className={`text-[1.7rem] leading-[1.02] md:text-[2rem] ${index === 1 ? "text-white" : "text-[hsl(var(--foreground))]"}`}>
                        {point}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 text-base leading-8 text-[hsl(var(--muted-foreground))]">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="grid gap-10">
              <div className="grid gap-5 editorial-divider pt-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="editorial-kicker">{skillsTitle}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{valueTitle}</p>
                </div>

                <ul className="grid gap-5">
                  {skills.map((skill, index) => (
                    <li
                      key={skill.title}
                      className="grid gap-3 border-b border-[rgba(24,31,43,0.08)] pb-5 last:border-b-0 last:pb-0 md:grid-cols-[auto_1fr] md:gap-5"
                    >
                      <p className="text-[0.9rem] font-semibold tracking-[0.18em] text-[hsl(var(--primary))]">
                        {skillCodes[index] ?? "00"}
                      </p>
                      <div>
                        <h3 className="text-[1.45rem] leading-tight text-[hsl(var(--foreground))]">{skill.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{skill.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="editorial-divider pt-6">
                  <p className="mb-5 editorial-kicker">{processTitle}</p>
                  <ol className="space-y-5">
                    {process.map((step, index) => (
                      <li key={step.title} className="border-b border-[rgba(24,31,43,0.08)] pb-5 last:border-b-0 last:pb-0">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--primary))]">0{index + 1}</p>
                        <h3 className="mt-2 text-xl text-[hsl(var(--foreground))]">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="editorial-surface p-6">
                  <p className="mb-4 editorial-kicker">{methodLabel}</p>
                  <p className="text-[2rem] leading-[1.02] text-[hsl(var(--foreground))] md:text-[2.4rem]">
                    {isEnglish ? "One accountable layer from structure to release." : "Один відповідальний контур від структури до релізу."}
                  </p>
                  <p className="mb-4 mt-6 editorial-kicker">{technologiesTitle}</p>
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
