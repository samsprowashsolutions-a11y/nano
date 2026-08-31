import { cn } from "@/lib/utils";

export function Film({
  src,
  poster,
  className,
  caption,
}: {
  src: string;
  poster?: string;
  className?: string;
  caption?: string;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl border border-chrome/25 shadow-[0_28px_70px_rgba(0,0,0,.55),0_0_40px_rgba(0,208,224,.08)]",
        className,
      )}
    >
      <video
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-carbon/70 via-transparent to-carbon/20" />
      {caption ? (
        <figcaption className="absolute bottom-4 left-4 right-4 text-base font-semibold uppercase tracking-[0.1em] text-pearl/90">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
