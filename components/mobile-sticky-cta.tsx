"use client"

import { ArrowUpRight } from "lucide-react"
import SmoothScrollLink from "@/components/smooth-scroll-link"

type MobileStickyCtaProps = {
  label: string
}

export default function MobileStickyCta({ label }: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <SmoothScrollLink
        href="#contact"
        className="flex items-center justify-center gap-2 rounded-full border border-[rgba(24,31,43,0.12)] bg-[hsl(var(--foreground))] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_24px_60px_rgba(24,31,43,0.18)]"
      >
        {label}
        <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
      </SmoothScrollLink>
    </div>
  )
}
