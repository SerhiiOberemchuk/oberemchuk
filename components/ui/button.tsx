import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-[background-color,border-color,box-shadow,color,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-[rgba(122,52,18,0.18)] bg-primary text-primary-foreground shadow-[0_18px_40px_rgba(166,76,32,0.28)] hover:bg-[hsl(var(--primary))]/96 hover:shadow-[0_24px_52px_rgba(166,76,32,0.36),inset_0_1px_0_rgba(255,255,255,0.18)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[rgba(24,31,43,0.14)] bg-[rgba(255,255,255,0.84)] text-foreground shadow-[0_12px_26px_rgba(15,23,42,0.06)] backdrop-blur-sm hover:border-[rgba(24,31,43,0.28)] hover:bg-white hover:shadow-[0_18px_34px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.92)]",
        secondary:
          "border border-transparent bg-[hsl(var(--secondary))] text-secondary-foreground hover:bg-[hsl(var(--secondary))]/88 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
        ghost: "text-foreground hover:bg-white/70 hover:shadow-[inset_0_0_0_1px_rgba(24,31,43,0.06)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-[0.95rem] tracking-[0.01em]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
