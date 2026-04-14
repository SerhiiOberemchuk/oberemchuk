import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.28em] transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/85",
        secondary: "border-[rgba(45,34,24,0.12)] bg-white/40 text-secondary-foreground hover:bg-white/56",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-[hsl(var(--border))] bg-transparent text-foreground",
        success: "border-transparent bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/85",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
