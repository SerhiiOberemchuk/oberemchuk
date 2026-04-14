import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border text-sm font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[rgba(93,41,17,0.18)] bg-[linear-gradient(180deg,rgba(198,90,46,1),rgba(165,73,34,1))] text-primary-foreground shadow-[0_16px_32px_rgba(198,90,46,0.24)] hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(93,41,17,0.32)] hover:shadow-[0_24px_42px_rgba(198,90,46,0.3)] active:translate-y-0 active:scale-[0.99]",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-[rgba(45,34,24,0.12)] bg-white/24 text-foreground shadow-none backdrop-blur-sm hover:-translate-y-0.5 hover:border-[rgba(45,34,24,0.3)] hover:bg-white/42",
        secondary:
          "border-[rgba(45,34,24,0.08)] bg-[hsl(var(--secondary))]/72 text-secondary-foreground hover:bg-[hsl(var(--secondary))]",
        ghost: "border-transparent text-foreground hover:border-[rgba(45,34,24,0.08)] hover:bg-white/34",
        link: "border-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4",
        lg: "h-[3.8rem] px-8 text-[0.9rem] uppercase tracking-[0.18em]",
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
