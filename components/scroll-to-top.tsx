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
        "fixed bottom-6 right-6 z-50 p-3 bg-white text-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
        isVisible ? "opacity-100 translate-y-0 scroll-to-top-pulse" : "opacity-0 translate-y-10 pointer-events-none",
        className,
      )}
      aria-label={t("label")}
    >
      <ArrowUp className="h-6 w-6 stroke-[2.5px]" />
    </button>
  )
}

export default ScrollToTop
