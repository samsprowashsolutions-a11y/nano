import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ChromeTone } from "@/lib/content";
import { rev } from "@/lib/cache";

export const METAL: Record<
  ChromeTone,
  { hi: string; mid: string; lo: string; ink: string; neon: string; glyph: string }
> = {
  carbon: { hi: "#f6f3ec", mid: "#8a8680", lo: "#1a1816", ink: "#141210", neon: "#9ae8f0", glyph: "#f6f3ec" },
  teal: { hi: "#e8fffe", mid: "#2eb8bc", lo: "#06343a", ink: "#062628", neon: "#00f0ff", glyph: "#042428" },
  purple: { hi: "#f6eeff", mid: "#a855f7", lo: "#3b0764", ink: "#1a0a2c", neon: "#e9d5ff", glyph: "#f4ecff" },
  pearl: { hi: "#ffffff", mid: "#d8dde6", lo: "#4a5160", ink: "#1c1c22", neon: "#ffe9a8", glyph: "#16161c" },
  gold: { hi: "#fff6d0", mid: "#e0a830", lo: "#4a2e08", ink: "#2a1c08", neon: "#ffc040", glyph: "#2a1c08" },
  blue: { hi: "#dbeafe", mid: "#3b82f6", lo: "#1e3a8a", ink: "#0a1638", neon: "#93c5fd", glyph: "#eff6ff" },
  green: { hi: "#d1fae5", mid: "#22c55e", lo: "#14532d", ink: "#052e16", neon: "#86efac", glyph: "#f0fdf4" },
  yellow: { hi: "#fef9c3", mid: "#eab308", lo: "#713f12", ink: "#2a1c08", neon: "#fde047", glyph: "#1a1208" },
  red: { hi: "#fecaca", mid: "#ef4444", lo: "#7f1d1d", ink: "#450a0a", neon: "#fca5a5", glyph: "#fff1f2" },
  aqua: { hi: "#cffafe", mid: "#22d3ee", lo: "#155e75", ink: "#083344", neon: "#67e8f9", glyph: "#ecfeff" },
};

/** Photoreal 01–05 chrome orb (house PNG) with metallic sheen. */
export function ChromeIcon({
  tone,
  className,
  alt,
}: {
  tone: ChromeTone;
  className?: string;
  alt?: string;
}) {
  const src = rev(`/chrome/${tone}.png`);
  return (
    <span
      className={cn("chrome-icon chrome-orb", className)}
      style={{ "--chrome-mask": `url(${src})` } as CSSProperties}
    >
      <img src={src} alt={alt ?? `${tone} chrome`} />
      <span className="chrome-icon-sheen" aria-hidden />
    </span>
  );
}

type DiscVariant = "collection" | "nano7";

/** Polished chrome sphere. Padded viewBox so rim, gold ring and neon arc never clip. */
export function ChromeDisc({
  tone,
  className,
  title,
  children,
  variant = "collection",
  neon: neonProp,
}: {
  tone: ChromeTone;
  className?: string;
  title?: string;
  children?: ReactNode;
  variant?: DiscVariant;
  neon?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const m = METAL[tone];
  const g = `cd-${uid}`;
  const nano7 = variant === "nano7";
  const neon = neonProp ?? (nano7 ? "#ff7a18" : m.neon);
  return (
    <span className={cn("chrome-disc", nano7 && "nano7-disc", className)} title={title}>
      <svg viewBox="0 0 160 160" className="overflow-visible" preserveAspectRatio="xMidYMid meet" aria-hidden={!title} role={title ? "img" : undefined}>
        {title ? <title>{title}</title> : null}
        <defs>
          <radialGradient id={`${g}-ball`} cx="30%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="8%" stopColor={m.hi} />
            <stop offset="32%" stopColor={m.mid} />
            <stop offset="62%" stopColor={m.lo} />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>
          <radialGradient id={`${g}-spec`} cx="28%" cy="18%" r="34%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="28%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${g}-well`} cx="48%" cy="42%" r="70%">
            <stop offset="0%" stopColor={m.lo} stopOpacity="0.55" />
            <stop offset="55%" stopColor={m.lo} stopOpacity="0.18" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${g}-gold`} x1="12%" y1="8%" x2="88%" y2="92%">
            <stop offset="0%" stopColor="#fff8d4" />
            <stop offset="22%" stopColor="#f7e08a" />
            <stop offset="48%" stopColor="#e8b838" />
            <stop offset="72%" stopColor="#8a6318" />
            <stop offset="100%" stopColor="#fff4c0" />
          </linearGradient>
          <linearGradient id={`${g}-iris`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8e0" />
            <stop offset="28%" stopColor="#c8ced6" />
            <stop offset="52%" stopColor="#f7e08a" />
            <stop offset="78%" stopColor="#c4a4f6" />
            <stop offset="100%" stopColor="#00d0e0" />
          </linearGradient>
          <radialGradient id={`${g}-equator`} cx="50%" cy="82%" r="64%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
            <stop offset="58%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id={`${g}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${g}-soft`} x="-28%" y="-28%" width="156%" height="156%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <ellipse cx="80" cy="136" rx="38" ry="6.5" fill="#000" opacity="0.42" filter={`url(#${g}-soft)`} />
        <circle cx="80" cy="80" r="56" fill={neon} opacity="0.14" filter={`url(#${g}-glow)`} />
        <circle cx="80" cy="80" r="50" fill={`url(#${g}-ball)`} />
        <circle cx="80" cy="80" r="50" fill={`url(#${g}-equator)`} />
        <circle cx="80" cy="80" r="50" fill={`url(#${g}-spec)`} />
        <ellipse cx="56" cy="50" rx="18" ry="9" fill="#fff" opacity="0.5" />
        <ellipse cx="100" cy="44" rx="6" ry="2.4" fill="#fff" opacity="0.7" />
        <circle cx="80" cy="80" r="33" fill={`url(#${g}-well)`} />
        {nano7 ? (
          <>
            <circle cx="80" cy="80" r="51.4" fill="none" stroke={`url(#${g}-gold)`} strokeWidth="3.4" />
            <circle cx="80" cy="80" r="48.6" fill="none" stroke="#fff6d0" strokeWidth="0.7" opacity="0.55" />
          </>
        ) : (
          <>
            <circle cx="80" cy="80" r="51.2" fill="none" stroke={`url(#${g}-iris)`} strokeWidth="2.1" opacity="0.92" />
            <circle cx="80" cy="80" r="49" fill="none" stroke={`url(#${g}-gold)`} strokeWidth="1.5" />
          </>
        )}
        <path
          d="M80 30 A50 50 0 0 1 80 130"
          fill="none"
          stroke={neon}
          strokeWidth={nano7 ? 3.4 : 2.9}
          strokeLinecap="round"
          filter={`url(#${g}-glow)`}
        />
        {children}
      </svg>
    </span>
  );
}

export function ChromeMedal({
  tone,
  n,
  className,
  alt,
}: {
  tone: ChromeTone;
  n: string;
  className?: string;
  alt?: string;
}) {
  return <ChromeIcon tone={tone} className={className} alt={alt ?? `${n} ${tone}`} />;
}

const FIELD_SRC: Record<string, string> = {
  "01": "/chrome/test-01.png",
  "02": "/chrome/test-02.png",
  "03": "/chrome/test-03.png",
  "04": "/chrome/test-04.png",
  "05": "/chrome/test-05.png",
};

export function FieldTestMark({
  n,
  name,
  className,
}: {
  n: string;
  name: string;
  tone?: ChromeTone;
  className?: string;
}) {
  const src = FIELD_SRC[n] ?? "/chrome/test-01.png";
  return (
    <span
      className={cn("chrome-icon field-test-mark", className)}
      style={{ "--chrome-mask": `url(${src})` } as CSSProperties}
    >
      <img src={src} alt={`${n} ${name}`} />
      <span className="chrome-icon-sheen" aria-hidden />
    </span>
  );
}

/** Gold metallic Nano Drop — NANO7™ system mark. The 7 lives inside the drop. No mashed wordmark. */
export function NanoDrop({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const g = `drop-${uid}`;
  return (
    <span className={cn("qa7-drop", className)}>
      <svg viewBox="0 0 200 260" className="overflow-visible" role="img" aria-label="NANO7 Nano Drop">
        <defs>
          <linearGradient id={`${g}-gold`} x1="18%" y1="4%" x2="86%" y2="96%">
            <stop offset="0%" stopColor="#fff8d8" />
            <stop offset="16%" stopColor="#f7e08a" />
            <stop offset="42%" stopColor="#e8b838" />
            <stop offset="68%" stopColor="#b88828" />
            <stop offset="100%" stopColor="#4a2e08" />
          </linearGradient>
          <radialGradient id={`${g}-hi`} cx="34%" cy="26%" r="58%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="32%" stopColor="#fff6d0" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
          </radialGradient>
          <radialGradient id={`${g}-well`} cx="50%" cy="62%" r="42%">
            <stop offset="0%" stopColor="#3a2408" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3a2408" stopOpacity="0" />
          </radialGradient>
          <filter id={`${g}-glow`} x="-28%" y="-22%" width="156%" height="148%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${g}-soft`} x="-18%" y="-12%" width="136%" height="130%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <ellipse cx="100" cy="236" rx="48" ry="8" fill="#000" opacity="0.38" filter={`url(#${g}-soft)`} />
        <path
          d="M100 18 C150 78 172 118 172 160 C172 204 140 234 100 234 C60 234 28 204 28 160 C28 118 50 78 100 18 Z"
          fill="#ff7a18"
          opacity="0.16"
          filter={`url(#${g}-glow)`}
        />
        <path
          d="M100 22 C146 78 168 118 168 158 C168 198 138 226 100 226 C62 226 32 198 32 158 C32 118 54 78 100 22 Z"
          fill={`url(#${g}-gold)`}
        />
        <path
          d="M100 22 C146 78 168 118 168 158 C168 198 138 226 100 226 C62 226 32 198 32 158 C32 118 54 78 100 22 Z"
          fill={`url(#${g}-hi)`}
        />
        <path
          d="M100 22 C146 78 168 118 168 158 C168 198 138 226 100 226 C62 226 32 198 32 158 C32 118 54 78 100 22 Z"
          fill={`url(#${g}-well)`}
        />
        <path
          d="M100 22 C146 78 168 118 168 158 C168 198 138 226 100 226 C62 226 32 198 32 158 C32 118 54 78 100 22 Z"
          fill="none"
          stroke={`url(#${g}-gold)`}
          strokeWidth="3.2"
        />
        <path
          d="M100 22 C146 78 168 118 168 158 C168 198 138 226 100 226"
          fill="none"
          stroke="#ff7a18"
          strokeWidth="5.2"
          strokeLinecap="round"
          filter={`url(#${g}-glow)`}
        />
        <ellipse cx="78" cy="78" rx="22" ry="14" fill="#fff" opacity="0.38" />
        <text
          x="100"
          y="176"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="92"
          fontWeight="700"
          fill="#1a1208"
        >
          7
        </text>
      </svg>
    </span>
  );
}
