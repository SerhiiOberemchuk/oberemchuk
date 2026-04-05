import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[148px] w-full rounded-[24px] border border-[hsl(var(--border))]/90 bg-white px-4 py-3 text-base text-foreground shadow-[0_10px_30px_rgba(24,31,43,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow,background-color] duration-200 ring-offset-background placeholder:text-muted-foreground/80 hover:border-[hsl(var(--foreground))]/18 focus-visible:border-[hsl(var(--foreground))]/28 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]/35 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
