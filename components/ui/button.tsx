import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neon-red text-white hover:bg-neon-red/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,39,66,0.5)] [&[data-theme='upside-down']]:bg-[var(--accent-primary)] [&[data-theme='upside-down']]:hover:shadow-[0_0_30px_var(--glow-strong)]",
        outline:
          "border border-neon-red/50 text-neon-red hover:bg-neon-red/10 hover:border-neon-red hover:shadow-[0_0_15px_rgba(255,39,66,0.3)] [&[data-theme='upside-down']]:border-[var(--surface-border)]/50 [&[data-theme='upside-down']]:text-[var(--accent-primary)] [&[data-theme='upside-down']]:hover:bg-[var(--accent-primary)]/20 [&[data-theme='upside-down']]:hover:shadow-[0_0_20px_var(--glow-soft)]",
        ghost: "text-neon-red hover:bg-neon-red/10 hover:text-neon-red [&[data-theme='upside-down']]:text-[var(--accent-primary)] [&[data-theme='upside-down']]:hover:bg-[var(--accent-primary)]/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

