import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export default function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  return (
    <article>
      <Card className={`hover:shadow-lg transition-shadow duration-300 ${className || ""}`}>
        <CardHeader>
          <div className="mb-4" aria-hidden="true">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
      </Card>
    </article>
  )
}
