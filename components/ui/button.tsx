"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 min-h-[44px]",
  {
    variants: {
      variant: {
        default: "bg-ink text-surface hover:opacity-90",
        accent: "bg-accent text-white hover:opacity-90",
        outline: "border border-line bg-surface text-ink hover:bg-surface-soft",
        ghost: "text-ink-soft hover:text-ink hover:bg-surface-soft",
      },
      size: {
        default: "h-12 px-6 text-body",
        lg: "h-14 px-8 text-h1",
        sm: "h-10 px-4 text-small",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";
