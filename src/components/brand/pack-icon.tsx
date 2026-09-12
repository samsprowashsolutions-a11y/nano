import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { B4Tone } from "@/lib/brand-4";

export type PackKind =
  | "inspect"
  | "prepare"
  | "apply"
  | "verify"
  | "record"
  | "approve"
  | "handover"
  | "search"
  | "clipboard"
  | "spray"
  | "shield"
  | "file"
  | "check"
  | "camera"
  | "people"
  | "gear"
  | "cube"
  | "location"
  | "clock"
  | "warning"
  | "chart"
  | "droplet"
  | "target"
  | "handshake"
  | "glass"
  | "stone"
  | "layers"
  | "sun"
  | "ph"
  | "bond"
  | "hold"
  | "doc";

const FILL: Record<PackKind, ReactNode> = {
  inspect: (
    <>
      <circle cx="13.5" cy="13.5" r="7.4" />
      <circle cx="13.5" cy="13.5" r="3.4" fill="#0c1f4a" />
      <rect x="18.2" y="19.6" width="3.4" height="9" rx="1.6" transform="rotate(-42 20 24)" />
    </>
  ),
  search: (
    <>
      <circle cx="13.5" cy="13.5" r="7.4" />
      <circle cx="13.5" cy="13.5" r="3.4" fill="#0c1f4a" />
      <rect x="18.2" y="19.6" width="3.4" height="9" rx="1.6" transform="rotate(-42 20 24)" />
    </>
  ),
  prepare: (
    <>
      <rect x="8" y="7" width="16" height="20" rx="2.4" />
      <rect x="12" y="5" width="8" height="5" rx="1.4" />
      <rect x="11" y="14" width="10" height="2" rx="1" fill="#0c1f4a" />
      <rect x="11" y="18" width="7" height="2" rx="1" fill="#0c1f4a" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="7" width="16" height="20" rx="2.4" />
      <rect x="12" y="5" width="8" height="5" rx="1.4" />
      <rect x="11" y="14" width="10" height="2" rx="1" fill="#0c1f4a" />
      <rect x="11" y="18" width="7" height="2" rx="1" fill="#0c1f4a" />
    </>
  ),
  apply: <path d="M16 4c0 0 9 10 9 16.2A9 9 0 1 1 7 20.2C7 14 16 4 16 4z" />,
  spray: <path d="M16 4c0 0 9 10 9 16.2A9 9 0 1 1 7 20.2C7 14 16 4 16 4z" />,
  droplet: <path d="M16 4c0 0 9 10 9 16.2A9 9 0 1 1 7 20.2C7 14 16 4 16 4z" />,
  verify: (
    <>
      <path d="M16 3 28 16 16 29 4 16z" />
      <path d="M11 16.2 14.4 19.6 21.2 12" fill="none" stroke="#0c1f4a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  shield: (
    <>
      <path d="M16 3 27 7.2v8.4c0 7.2-6.2 11.4-11 13.4C11.2 27 5 22.8 5 15.6V7.2z" />
      <path d="M11 16.2 14.4 19.6 21 12.4" fill="none" stroke="#0c1f4a" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  record: (
    <>
      <path d="M8 4h11l7 7v17H8z" />
      <path d="M19 4v7h7" fill="#0c1f4a" opacity="0.35" />
      <rect x="11" y="16" width="10" height="2" rx="1" fill="#0c1f4a" />
      <rect x="11" y="20" width="7" height="2" rx="1" fill="#0c1f4a" />
    </>
  ),
  file: (
    <>
      <path d="M8 4h11l7 7v17H8z" />
      <rect x="11" y="16" width="10" height="2" rx="1" fill="#0c1f4a" />
      <rect x="11" y="20" width="7" height="2" rx="1" fill="#0c1f4a" />
    </>
  ),
  doc: (
    <>
      <path d="M8 4h11l7 7v17H8z" />
      <rect x="11" y="16" width="10" height="2" rx="1" fill="#0c1f4a" />
    </>
  ),
  approve: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M10.5 16.4 14.2 20 22 11.6" fill="none" stroke="#0c1f4a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  check: <path d="M6.5 16.5 13 23 26 8.5 23.4 6 13 18.2 9 14.2z" />,
  handover: (
    <>
      <circle cx="8" cy="16" r="4.2" />
      <path d="M12 16h12l-5-5v3h-7z" />
      <path d="M19 16v5h7l-5 5v-3h-7z" />
    </>
  ),
  camera: (
    <>
      <rect x="5" y="11" width="22" height="14" rx="3" />
      <path d="M12 11 14 7h4l2 4" />
      <circle cx="16" cy="18" r="4.2" />
      <circle cx="16" cy="18" r="2" fill="#0c1f4a" />
    </>
  ),
  people: (
    <>
      <circle cx="11" cy="10" r="4.2" />
      <circle cx="21" cy="11" r="3.4" />
      <path d="M3.5 26c0-4.4 3.4-7.5 7.6-7.5S18.7 21.6 18.7 26z" />
      <path d="M18 20.2c2.4-.6 5.4.6 6.8 5.8H29c0-3.6-2.6-6.2-6.2-6.2-1.4 0-2.7.4-3.7 1.1z" />
    </>
  ),
  gear: (
    <>
      <path d="M13.2 3.4h5.6l1.2 3.4 3.4-1.4 4 4-1.4 3.4 3.4 1.2v5.6l-3.4 1.2 1.4 3.4-4 4-3.4-1.4-1.2 3.4h-5.6l-1.2-3.4-3.4 1.4-4-4 1.4-3.4L3.2 18.8v-5.6l3.4-1.2-1.4-3.4 4-4 3.4 1.4z" />
      <circle cx="16" cy="16" r="4.2" fill="#0c1f4a" />
    </>
  ),
  cube: (
    <>
      <path d="M16 5 27 11.2 16 17.4 5 11.2z" />
      <path d="M5 11.2v8.6L16 27V17.4z" opacity="0.88" />
      <path d="M27 11.2v8.6L16 27V17.4z" opacity="0.7" />
    </>
  ),
  location: (
    <>
      <path d="M16 3c6 0 10.6 4.6 10.6 10.4 0 7.8-10.6 15.6-10.6 15.6S5.4 21.2 5.4 13.4C5.4 7.6 10 3 16 3z" />
      <circle cx="16" cy="13" r="3.6" fill="#0c1f4a" />
    </>
  ),
  clock: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 8v9l6 3" fill="none" stroke="#0c1f4a" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  warning: (
    <>
      <path d="M16 3 30 27H2z" />
      <rect x="14.6" y="11" width="2.8" height="8" rx="1" fill="#0c1f4a" />
      <rect x="14.6" y="21.2" width="2.8" height="2.8" rx="1" fill="#0c1f4a" />
    </>
  ),
  chart: (
    <>
      <rect x="6" y="14" width="5" height="12" rx="1.2" />
      <rect x="13.5" y="8" width="5" height="18" rx="1.2" />
      <rect x="21" y="11" width="5" height="15" rx="1.2" />
    </>
  ),
  target: (
    <>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="7.2" fill="#0c1f4a" />
      <circle cx="16" cy="16" r="3.2" />
    </>
  ),
  handshake: (
    <>
      <path d="M4 15h8l3 4 3-4h10v4H19l-4 5-4-5H4z" />
      <circle cx="8" cy="11" r="3" />
      <circle cx="24" cy="11" r="3" />
    </>
  ),
  glass: (
    <>
      <path d="M8 4h16l-2.4 22H10.4z" />
      <ellipse cx="16" cy="14" rx="6.4" ry="2.2" fill="#0c1f4a" opacity="0.35" />
    </>
  ),
  stone: <path d="M4 24 10 8l7 5 5-9 6 20z" />,
  layers: (
    <>
      <path d="M16 5 28 12 16 19 4 12z" />
      <path d="M6 16.5 16 22.2 26 16.5 16 22.2z" opacity="0.55" />
      <path d="M6 21 16 26.8 26 21" opacity="0.35" />
    </>
  ),
  sun: (
    <>
      <circle cx="16" cy="16" r="6.2" />
      <rect x="14.6" y="2" width="2.8" height="5" rx="1.2" />
      <rect x="14.6" y="25" width="2.8" height="5" rx="1.2" />
      <rect x="2" y="14.6" width="5" height="2.8" rx="1.2" />
      <rect x="25" y="14.6" width="5" height="2.8" rx="1.2" />
    </>
  ),
  ph: (
    <>
      <rect x="8" y="6" width="3.4" height="20" rx="1.4" />
      <path d="M11.4 6h6.2a6 6 0 0 1 0 12h-6.2z" />
      <rect x="20" y="14" width="3.2" height="12" rx="1.4" />
      <rect x="18.4" y="23.4" width="6.4" height="2.8" rx="1.2" />
    </>
  ),
  bond: (
    <>
      <circle cx="11" cy="13" r="5.4" />
      <circle cx="21" cy="19" r="5.4" />
      <rect x="12" y="14" width="8" height="3.2" rx="1.4" transform="rotate(28 16 16)" />
    </>
  ),
  hold: (
    <>
      <rect x="8" y="8" width="5.4" height="16" rx="1.4" />
      <rect x="18.6" y="8" width="5.4" height="16" rx="1.4" />
    </>
  ),
};

export function PackGlyph({ kind }: { kind: PackKind }) {
  return (
    <svg viewBox="0 0 32 32" className="h-[64%] w-[64%] drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]" aria-hidden>
      <g fill="currentColor">{FILL[kind] ?? FILL.check}</g>
    </svg>
  );
}

export function PackDisc({
  kind,
  n,
  tone = "navy",
  className,
  on,
}: {
  kind: PackKind;
  n?: string;
  tone?: B4Tone;
  className?: string;
  on?: boolean;
}) {
  return (
    <span className={cn("b4-disc", `b4-${tone}`, on && "is-on", className)}>
      <PackGlyph kind={kind} />
      {n ? <i className="b4-badge">{n}</i> : null}
    </span>
  );
}

export function B4Pick({
  kind,
  n,
  name,
  hint,
  tone = "navy",
  on,
  onClick,
  className,
}: {
  kind: PackKind;
  n?: string;
  name: string;
  hint?: string;
  tone?: B4Tone;
  on?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      <PackDisc kind={kind} n={n} tone={tone} on={on} />
      <span className="b4-pick-copy">
        <span className="b4-pick-name">{name}</span>
        {hint ? <span className="b4-pick-hint">{hint}</span> : null}
      </span>
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={on} className={cn("b4-pick", on && "is-on", className)}>
        {inner}
      </button>
    );
  }
  return <div className={cn("b4-pick", on && "is-on", className)}>{inner}</div>;
}
