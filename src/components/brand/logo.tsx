import { cn } from "@/lib/utils";
import { rev } from "@/lib/cache";

/** Gold SP shield — Sam's Prowash Solutions crest. */
export function BrandMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <img
        src={rev("/brand/sp-shield-gold.png")}
        alt="Sam's Prowash Solutions"
        width={size}
        height={size}
        className="h-full w-auto object-contain"
      />
    </span>
  );
}

/** Chrome NanoAssure™ shield — NA monogram + NanoAssure script. */
export function NanoAssureMark({ className }: { className?: string }) {
  return (
    <img
      src={rev("/brand/na-shield-chrome.png")}
      alt="NanoAssure™"
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

/** Compact header: SP crest only. Name lives in the lockup art, never beside it. */
export function NavLockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={rev("/brand/sp-shield-gold.png")}
        alt="Sam's Prowash Solutions"
        className="h-full w-auto object-contain"
      />
    </span>
  );
}

/** Full SP lockup — crest + Sam's Prowash Solutions. Do not add extra type on top. */
export function BrandLockup({ className }: { className?: string }) {
  return (
    <img
      src={rev("/brand/sp-lockup.png")}
      alt="Sam's Prowash Solutions — Advanced Surface Protection"
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return <BrandLockup className={compact ? "h-10" : "h-16 sm:h-20"} />;
}

/** SP + NanoAssure crests together. */
export function HousePair({ className }: { className?: string }) {
  return (
    <img
      src={rev("/brand/house-pair.png")}
      alt="Sam's Prowash Solutions and NanoAssure™"
      className={cn("h-auto w-auto object-contain", className)}
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
        src={rev("/media/water-glass-banner.jpg")}
        alt="Water beading on glass"
        className={cn(
          "block w-full object-cover",
          tall ? "h-48 md:h-72 lg:h-96" : "h-20 md:h-28 lg:h-32",
        )}
      />
    </figure>
  );
}
