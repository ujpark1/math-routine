import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border border-border bg-bg-subtle p-6", className)} {...props} />
  )
);
Card.displayName = "Card";

export const ProgressDots = ({ total, current }: { total: number; current: number }) => (
  <div className="flex gap-2" role="status" aria-label={`${current}/${total} 진행`}>
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        aria-hidden
        className={cn(
          "h-2 w-2 rounded-full transition-colors",
          i < current ? "bg-accent" : "bg-border"
        )}
      />
    ))}
  </div>
);
