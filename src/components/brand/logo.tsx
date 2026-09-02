import { cn } from "@/lib/utils";

export function BrandMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <img
        src="/brand/sp-shield-clear.png"
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

export function BrandLockup({ className }: { className?: string }) {
  return (
    <img
      src="/brand/sp-lockup.png"
      alt="Sam's Prowash Solutions — Advanced Surface Protection"
      className={cn("h-auto object-contain", className)}
    />
  );
}

export function WaterGlassBand({
  className,
  tall = false,
}: {
  className?: string;
  tall?: boolean;
}) {
  return (
    <figure className={cn("relative w-full overflow-hidden", className)}>
      <img
        src="/media/water-glass-banner.jpg"
        alt="Water beading on glass"
        className={cn(
          "block w-full object-cover",
          tall ? "h-48 md:h-72 lg:h-96" : "h-20 md:h-28 lg:h-32",
        )}
      />
    </figure>
  );
}
