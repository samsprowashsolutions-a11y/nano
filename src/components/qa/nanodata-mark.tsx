import type { ReactNode } from "react";
import { ChromeDisc, METAL } from "@/components/chrome-disc";
import type { NanoDataKey } from "@/lib/content";

function Glyph({ kind }: { kind: NanoDataKey }) {
  const tone =
    kind === "climascan" ? "carbon" : kind === "surfiq" ? "teal" : kind === "phield" ? "purple" : kind === "nanobond" ? "pearl" : "gold";
  const ink = METAL[tone].glyph;
  const common = {
    fill: "none" as const,
    stroke: ink,
    strokeWidth: 4.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "climascan":
      return (
        <g {...common}>
          <circle cx="80" cy="80" r="12" />
          <circle cx="80" cy="80" r="22" />
          <path d="M80 48v8M80 104v8M48 80h8M104 80h8" />
          <path d="M100 60l6-7" />
        </g>
      );
    case "surfiq":
      return (
        <g {...common}>
          <path d="M80 46c0 0 16 18 16 30a16 16 0 1 1-32 0c0-12 16-30 16-30z" />
          <path d="M54 112h52M62 102h36" />
        </g>
      );
    case "phield":
      return (
        <g {...common}>
          <path d="M80 46l24 10v22c0 18-14 30-24 36-10-6-24-18-24-36V56z" />
          <path d="M70 80h20M80 70v20" />
        </g>
      );
    case "nanobond":
      return (
        <g {...common}>
          <circle cx="64" cy="72" r="12" />
          <circle cx="96" cy="72" r="12" />
          <circle cx="80" cy="98" r="12" />
        </g>
      );
    case "solarstrest":
      return (
        <g {...common}>
          <circle cx="80" cy="80" r="13" />
          <path d="M80 50v8M80 102v8M50 80h8M102 80h8M58 60l6 6M96 94l6 6M58 100l6-6M96 66l6-6" />
        </g>
      );
  }
}

const TONE: Record<NanoDataKey, "carbon" | "teal" | "purple" | "pearl" | "gold"> = {
  climascan: "carbon",
  surfiq: "teal",
  phield: "purple",
  nanobond: "pearl",
  solarstrest: "gold",
};

/** Full NANODATA instrument — padded chrome disc, unique glyph, never cropped. */
export function NanoDataMark({
  kind,
  className,
  caption,
}: {
  kind: NanoDataKey;
  className?: string;
  caption?: ReactNode;
}) {
  const tone = TONE[kind];
  return (
    <ChromeDisc tone={tone} className={className} title={kind}>
      <Glyph kind={kind} />
      {caption}
    </ChromeDisc>
  );
}
