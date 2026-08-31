import { useId, useRef, useState } from "react";

const BEADS = [
  { x: 14, y: 16, r: 2.8 },
  { x: 27, y: 11, r: 1.9 },
  { x: 39, y: 18, r: 3.6 },
  { x: 61, y: 13, r: 2.2 },
  { x: 74, y: 19, r: 3.1 },
  { x: 88, y: 12, r: 2.4 },
  { x: 18, y: 31, r: 2.1 },
  { x: 32, y: 28, r: 4.2 },
  { x: 47, y: 24, r: 1.8 },
  { x: 68, y: 30, r: 2.7 },
  { x: 82, y: 26, r: 3.4 },
  { x: 11, y: 48, r: 2.5 },
  { x: 24, y: 44, r: 1.7 },
  { x: 36, y: 52, r: 3.8 },
  { x: 58, y: 46, r: 4.6 },
  { x: 72, y: 51, r: 2.0 },
  { x: 86, y: 44, r: 2.9 },
  { x: 16, y: 64, r: 3.2 },
  { x: 29, y: 68, r: 2.3 },
  { x: 44, y: 62, r: 1.9 },
  { x: 63, y: 66, r: 3.5 },
  { x: 78, y: 63, r: 2.6 },
  { x: 91, y: 69, r: 2.1 },
] as const;

const STREAKS = [
  { x: 12, y: 8, w: 1.1, h: 38, o: 0.18 },
  { x: 21, y: 14, w: 0.7, h: 44, o: 0.14 },
  { x: 34, y: 6, w: 1.4, h: 52, o: 0.2 },
  { x: 48, y: 18, w: 0.8, h: 36, o: 0.12 },
  { x: 59, y: 10, w: 1.2, h: 48, o: 0.16 },
  { x: 71, y: 7, w: 0.9, h: 55, o: 0.15 },
  { x: 83, y: 16, w: 1.3, h: 40, o: 0.19 },
  { x: 91, y: 12, w: 0.6, h: 46, o: 0.11 },
] as const;

const SPOTS = [
  [18, 22],
  [29, 41],
  [41, 17],
  [53, 33],
  [66, 21],
  [77, 39],
  [22, 58],
  [38, 63],
  [57, 55],
  [84, 58],
] as const;

function WindowScene({ mode, uid }: { mode: "treated" | "untreated"; uid: string }) {
  const treated = mode === "treated";
  return (
    <svg
      viewBox="0 0 100 75"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          {treated ? (
            <>
              <stop offset="0%" stopColor="#1a1430" />
              <stop offset="42%" stopColor="#0c1a28" />
              <stop offset="78%" stopColor="#24180c" />
              <stop offset="100%" stopColor="#3a2a12" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#7a7874" />
              <stop offset="55%" stopColor="#6a6660" />
              <stop offset="100%" stopColor="#5a5248" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9aa0a8" />
          <stop offset="40%" stopColor="#f5f3ec" />
          <stop offset="70%" stopColor="#c8ced6" />
          <stop offset="100%" stopColor="#6a6e78" />
        </linearGradient>
        <radialGradient id={`${uid}-bead`} cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="16%" stopColor="#b8fff8" />
          <stop offset="38%" stopColor="#1a7a82" />
          <stop offset="100%" stopColor="#050508" />
        </radialGradient>
        <radialGradient id={`${uid}-haze`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#d8d0c4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8a8478" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <rect width="100" height="75" fill={`url(#${uid}-sky)`} />

      {treated ? (
        <>
          <ellipse cx="78" cy="10" rx="22" ry="10" fill="#7a32c8" opacity="0.18" />
          <ellipse cx="18" cy="68" rx="28" ry="12" fill="#00d0e0" opacity="0.12" />
          <rect x="2" y="52" width="96" height="21" fill="#f5e2a0" opacity="0.06" />
          {BEADS.map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={`url(#${uid}-bead)`} opacity="0.94" />
              <ellipse
                cx={b.x - b.r * 0.28}
                cy={b.y - b.r * 0.34}
                rx={b.r * 0.3}
                ry={b.r * 0.16}
                fill="#fff"
                opacity="0.72"
              />
            </g>
          ))}
        </>
      ) : (
        <>
          <rect width="100" height="75" fill={`url(#${uid}-haze)`} />
          {STREAKS.map((s, i) => (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={0.4}
              fill="#efe6d6"
              opacity={s.o}
            />
          ))}
          {SPOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.7 + (i % 3) * 0.25} fill="#c8c0b0" opacity="0.45" />
          ))}
        </>
      )}

      <rect
        x="1.1"
        y="1.1"
        width="97.8"
        height="72.8"
        fill="none"
        stroke={`url(#${uid}-chrome)`}
        strokeWidth="2.2"
        rx="0.8"
      />
      <line x1="50" y1="2" x2="50" y2="73" stroke={`url(#${uid}-chrome)`} strokeWidth="1.35" opacity="0.85" />
      <line x1="2" y1="38" x2="98" y2="38" stroke={`url(#${uid}-chrome)`} strokeWidth="1.1" opacity="0.8" />
    </svg>
  );
}

export function BeforeAfter({
  beforeLabel = "Non applied",
  afterLabel = "NanoAssure™ applied",
}: {
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(48);
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  function setFromClientX(x: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((x - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }

  return (
    <div
      ref={ref}
      className="glass-proof relative aspect-4/3 touch-none overflow-hidden rounded-[28px] bg-carbon shadow-[var(--shadow-chrome)] outline outline-1 -outline-offset-1 outline-chrome/25"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientX(e.clientX);
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label="Before and after comparison"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      <WindowScene mode="treated" uid={`${uid}a`} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <WindowScene mode="untreated" uid={`${uid}b`} />
      </div>
      <div
        className="absolute inset-y-0 w-px bg-gold-hi shadow-[0_0_18px_rgba(245,226,160,.8)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-hi/70 bg-carbon/80 text-gold-hi backdrop-blur">
          <span className="text-sm font-bold tracking-widest">DRG</span>
        </div>
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-carbon/70 px-3 py-1 text-base uppercase tracking-[0.1em] text-muted backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-carbon/70 px-3 py-1 text-base uppercase tracking-[0.1em] text-aqua backdrop-blur">
        {afterLabel}
      </span>
    </div>
  );
}
