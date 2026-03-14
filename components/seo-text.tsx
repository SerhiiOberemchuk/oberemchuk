"use client";

import type React from "react";
import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";

interface SeoTextProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  className?: string;
}

export default function SeoText({
  title,
  children,
  initiallyExpanded = false,
  className = ""
}: SeoTextProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const t = useTranslations("SeoText");

  return (
    <div className={`mx-auto mt-12 w-full border-t py-8 text-center ${className}`}>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[2000px]" : "max-h-[150px]"}`}
      >
        <div className={`prose prose-gray mx-auto max-w-none ${!isExpanded ? "mask-linear-gradient" : ""}`}>
          {children}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mx-auto mt-2 flex items-center text-green-600"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-1 h-4 w-4" />
            {t("collapse")}
          </>
        ) : (
          <>
            <ChevronDown className="mr-1 h-4 w-4" />
            {t("expand")}
          </>
        )}
      </Button>
    </div>
  );
}
