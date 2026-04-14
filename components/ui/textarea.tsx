import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[148px] w-full border border-[rgba(45,34,24,0.14)] bg-[rgba(255,255,255,0.78)] px-4 py-3 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition-[border-color,box-shadow,background-color] duration-200 ring-offset-background placeholder:text-muted-foreground/80 hover:border-[rgba(45,34,24,0.22)] focus-visible:border-[rgba(45,34,24,0.34)] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]/22 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
