"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  className?: string
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations("ScrollToTop")

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/88 text-[hsl(var(--foreground))] shadow-[0_18px_50px_rgba(24,31,43,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--foreground))]/14 hover:bg-white hover:text-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/35 focus:ring-offset-0",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        className,
      )}
      aria-label={t("label")}
    >
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(230,90,48,0.12),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <ArrowUp className="relative h-5 w-5 stroke-[2.3px]" />
    </button>
  )
}

export default ScrollToTop
