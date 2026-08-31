import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-transform duration-150 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        gold: "bg-linear-to-br from-gold-hi via-gold to-gold-deep text-carbon shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_10px_28px_rgba(232,184,56,.28)] hover:-translate-y-px",
        aqua: "border border-aqua/50 text-aqua bg-aqua/10 hover:bg-aqua/15",
        ghost: "border border-chrome/25 text-muted hover:text-fg hover:border-gold/40",
        chrome: "border border-chrome/30 text-chrome bg-pearl/5 hover:text-fg",
      },
      size: {
        sm: "h-12 px-5 text-base rounded-full",
        md: "h-14 px-7 text-base rounded-full",
        lg: "h-16 px-9 text-base rounded-full",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
