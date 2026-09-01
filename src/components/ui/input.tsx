import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-chrome/20 bg-carbon-2 px-4 text-base text-fg placeholder:text-faint outline-none transition-shadow duration-150",
        "focus-visible:ring-2 focus-visible:ring-aqua/50",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border border-chrome/20 bg-carbon-2 px-4 py-3 text-base text-fg placeholder:text-faint outline-none transition-shadow duration-150",
        "focus-visible:ring-2 focus-visible:ring-aqua/50",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("kicker mb-2 block text-muted", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-xl border border-chrome/20 bg-carbon-2 px-4 text-base text-fg outline-none transition-shadow duration-150",
        "focus-visible:ring-2 focus-visible:ring-aqua/50",
        className,
      )}
      {...props}
    />
  );
}
