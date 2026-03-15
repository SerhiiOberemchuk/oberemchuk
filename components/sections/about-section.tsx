import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import AnimationWrapper from "@/components/animation-wrapper"
import { Code, Palette, Search, Smartphone, Server } from "lucide-react"

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
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Git",
    "Figma",
  ]

  const skillIcons = [
    <Code key="code" className="w-8 h-8 text-blue-600" />,
    <Server key="server" className="w-8 h-8 text-red-600" />,
    <Palette key="palette" className="w-8 h-8 text-purple-600" />,
    <Search key="search" className="w-8 h-8 text-green-600" />,
    <Smartphone key="phone" className="w-8 h-8 text-orange-600" />,
  ]

  const processIcons = [
    <Palette key="process-palette" className="w-6 h-6 text-purple-600" />,
    <Code key="process-code" className="w-6 h-6 text-blue-600" />,
    <Server key="process-server" className="w-6 h-6 text-red-600" />,
  ]

  const statColors = ["text-blue-600", "text-green-600", "text-purple-600", "text-orange-600"]

  return (
    <section id="about" className="py-20 bg-gray-50" aria-labelledby="about-title">
      <div className="container mx-auto px-4">
        <AnimationWrapper animation="fade-in">
          <div className="text-center mb-16">
            <h2 id="about-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimationWrapper animation="slide-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{valueTitle}</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <dl className="grid grid-cols-2 gap-6">
              {summaryStats.map((stat, index) => (
                <Card key={`${stat.value}-${stat.label}`} className="text-center p-6">
                  <CardContent className="p-0">
                    <dd className={`text-3xl font-bold mb-2 ${statColors[index] ?? "text-blue-600"}`}>{stat.value}</dd>
                    <dt className="text-gray-600">{stat.label}</dt>
                  </CardContent>
                </Card>
              ))}
            </dl>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="fade-in">
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{skillsTitle}</h3>
            <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => (
                <li key={skill.title}>
                  <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="mb-4">{skillIcons[index]}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{skill.title}</h4>
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <div className="bg-white rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{processTitle}</h3>
            <ol className="grid md:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <li key={step.title} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {processIcons[index]}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="slide-up">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{technologiesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm py-2 px-4">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
