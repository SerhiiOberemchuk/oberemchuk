"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SeoTextProps {
  title: string
  children: React.ReactNode
  initiallyExpanded?: boolean
  className?: string
}

export default function SeoText({ title, children, initiallyExpanded = false, className = "" }: SeoTextProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)

  return (
    <div className={`mt-12 py-8 border-t w-full mx-auto text-center ${className}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[2000px]" : "max-h-[150px]"}`}>
        <div className={`prose prose-gray max-w-none mx-auto ${!isExpanded ? "mask-linear-gradient" : ""}`}>
          {children}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 flex items-center text-green-600 mx-auto"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-1 h-4 w-4" /> Згорнути
          </>
        ) : (
          <>
            <ChevronDown className="mr-1 h-4 w-4" /> Читати далі
          </>
        )}
      </Button>
    </div>
  )
}
