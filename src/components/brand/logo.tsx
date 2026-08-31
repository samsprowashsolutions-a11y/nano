import { cn } from "@/lib/utils";

export function BrandMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <span className={cn("logo-chrome", className)}>
      <img
        src="/brand/sp-shield.png"
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    </span>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="leading-none">
      <div className="font-display text-2xl text-gold-hi sm:text-3xl">NanoAssure™</div>
      {!compact ? (
        <div className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-aqua">
          Asset Protection
        </div>
      ) : null}
    </div>
  );
}
