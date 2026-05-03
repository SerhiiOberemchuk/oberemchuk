import type React from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@/components/ui/button";

interface SeoTextProps {
  title: string;
  expandLabel: string;
  collapseLabel: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  className?: string;
}

export default function SeoText({
  title,
  expandLabel,
  collapseLabel,
  children,
  initiallyExpanded = false,
  className = ""
}: SeoTextProps) {
  return (
    <details
      open={initiallyExpanded}
      className={`seo-text group mx-auto mt-12 w-full border-t py-8 text-center ${className}`}
    >
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="seo-text-content overflow-hidden transition-all duration-300">
        <div className="prose prose-gray mx-auto max-w-none group-open:mask-none">
          {children}
        </div>
      </div>
      <summary className="mt-2 flex cursor-pointer list-none justify-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="pointer-events-none text-[hsl(var(--primary))]"
        >
          <span className="flex items-center group-open:hidden">
            <ChevronDown className="mr-1 h-4 w-4" />
            {expandLabel}
          </span>
          <span className="hidden items-center group-open:flex">
            <ChevronUp className="mr-1 h-4 w-4" />
            {collapseLabel}
          </span>
        </Button>
      </summary>
    </details>
  );
}
