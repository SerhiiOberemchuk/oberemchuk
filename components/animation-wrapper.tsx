"use client"

import type { ReactNode } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface AnimationWrapperProps {
  children: ReactNode
  animation: "fade-in" | "slide-up" | "slide-right" | "slide-left" | "scale"
  className?: string
  delay?: number
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export default function AnimationWrapper({
  children,
  animation,
  className,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: AnimationWrapperProps) {
  const [ref, isInView] = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  })

  const delayClass = delay ? `delay-${delay}` : ""

  return (
    <div ref={ref} className={cn(`animate-${animation}`, isInView && "in-view", delayClass, className)}>
      {children}
    </div>
  )
}
