import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export default function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md flex flex-col",
        className,
      )}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-500 flex-grow">{description}</p>
    </div>
  )
}
