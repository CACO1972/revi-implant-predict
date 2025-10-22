import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary/80 to-primary text-primary-foreground hover:from-primary hover:to-primary-glow shadow-[0_0_20px_rgba(103,204,255,0.3)] hover:shadow-[0_0_30px_rgba(103,204,255,0.5)]",
        gold: "bg-gradient-to-r from-accent via-[hsl(42_85%_55%)] to-accent text-accent-foreground hover:from-[hsl(40_80%_50%)] hover:to-[hsl(42_85%_55%)] shadow-[0_0_20px_rgba(191,161,129,0.3)] hover:shadow-[0_0_30px_rgba(191,161,129,0.5)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary/30 bg-transparent backdrop-blur-sm text-foreground hover:bg-primary/10 hover:border-primary/50",
        secondary:
          "bg-secondary/50 backdrop-blur-sm text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-primary/10 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
