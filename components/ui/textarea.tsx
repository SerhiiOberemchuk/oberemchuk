import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[148px] w-full rounded-[24px] border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.96)] px-4 py-3 text-base text-foreground shadow-[0_14px_34px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.96)] transition-[border-color,box-shadow,background-color] duration-200 ring-offset-background placeholder:text-muted-foreground/88 hover:border-[rgba(24,31,43,0.22)] hover:bg-white focus-visible:border-[rgba(24,31,43,0.3)] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]/30 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
