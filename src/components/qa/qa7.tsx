import { useId, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { rev } from "@/lib/cache";
import {
  ASSURANCES,
  PROCESS,
  PRODUCTS,
  QA_TESTS,
  SURFACE_LIFE,
  type Qa7Icon,
} from "@/lib/content";
import { PROCESS_TONE } from "@/lib/brand-4";
import { B4Pick, type PackKind } from "@/components/brand/pack-icon";
import { ChromeDisc, METAL } from "@/components/chrome-disc";

function GoldGlyph({ kind }: { kind: Qa7Icon }) {
  const s = { fill: "none" as const, stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "inspect":
      return (
        <g {...s}>
          <path d="M8 32c7-16 41-16 48 0M8 32c7 16 41 16 48 0" />
          <circle cx="32" cy="32" r="8.5" />
          <circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" />
        </g>
      );
    case "prepare":
      return (
        <g {...s}>
          <path d="M12 46h40" />
          <path d="M16 40c9-12 23-12 32 0" />
          <rect x="22" y="12" width="20" height="20" rx="3" />
          <path d="M26 20h12M26 26h8" />
        </g>
      );
    case "apply":
      return (
        <g {...s}>
          <path d="M32 8c0 0 15 16 15 28a15 15 0 1 1-30 0C17 24 32 8 32 8z" fill="currentColor" fillOpacity="0.18" />
        </g>
      );
    case "verify":
      return (
        <g {...s}>
          <polygon points="32,8 54,32 32,56 10,32" fill="currentColor" fillOpacity="0.14" />
          <circle cx="32" cy="32" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="32" cy="20" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="44" cy="32" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="32" cy="44" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="20" cy="32" r="2.2" fill="currentColor" stroke="none" />
        </g>
      );
    case "record":
      return (
        <g {...s}>
          <path d="M18 12h22l10 10v32H18z" fill="currentColor" fillOpacity="0.14" />
          <path d="M40 12v10h10" />
          <path d="M24 32h16M24 40h12" />
        </g>
      );
    case "approve":
      return (
        <g {...s}>
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="13.5" />
          <polygon points="32,16 35,28 48,28 37,36 41,48 32,40 23,48 27,36 16,28 29,28" fill="currentColor" fillOpacity="0.35" />
        </g>
      );
    case "handover":
      return (
        <g {...s}>
          <path d="M12 32h30" strokeWidth="3" />
          <polyline points="32,22 48,32 32,42" strokeWidth="3" />
          <circle cx="14" cy="32" r="5" fill="currentColor" stroke="none" />
        </g>
      );
  }
}

const GATE_NEON: Record<Qa7Icon, string> = {
  inspect: "#e9d5ff",
  prepare: "#93c5fd",
  apply: "#86efac",
  verify: "#fde047",
  record: "#fca5a5",
  approve: "#67e8f9",
  handover: "#ffc040",
};

export function Qa7Mark({
  kind,
  className,
  title,
  n,
}: {
  kind: Qa7Icon;
  className?: string;
  title?: string;
  n?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const step = PROCESS.find((p) => p.icon === kind);
  const tone = step?.tone ?? "gold";
  const m = METAL[tone];
  const clip = `n7c-${uid}`;
  const glow = `n7n-${uid}`;
  const neon = GATE_NEON[kind];
  const glyphY = n ? 92 : 80;
  return (
    <ChromeDisc tone={tone} variant="nano7" neon={neon} className={cn("qa7-mark", className)} title={title ?? kind}>
      <defs>
        <clipPath id={clip}>
          <rect x="80" y="16" width="58" height="128" />
        </clipPath>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.15" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {n ? (
        <text
          x="80"
          y="58"
          textAnchor="middle"
          fill={m.glyph}
          stroke={tone === "yellow" || tone === "gold" ? "#6e5214" : m.lo}
          strokeWidth="0.6"
          style={{ fontFamily: "ui-monospace, monospace", fontSize: 16, fontWeight: 800, letterSpacing: "0.08em" }}
        >
          {n}
        </text>
      ) : null}
      <g
        transform={`translate(80 ${glyphY}) scale(${n ? 0.86 : 1.08}) translate(-32 -32)`}
        fill={m.ink}
        stroke={m.ink}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        color={m.ink}
      >
        <GoldGlyph kind={kind} />
      </g>
      <g clipPath={`url(#${clip})`} filter={`url(#${glow})`} color={neon}>
        <g
          transform={`translate(80 ${glyphY}) scale(${n ? 0.86 : 1.08}) translate(-32 -32)`}
          fill="none"
          stroke={neon}
          strokeWidth="2.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <GoldGlyph kind={kind} />
        </g>
      </g>
    </ChromeDisc>
  );
}

export function N7Seal({ className }: { className?: string }) {
  const src = rev("/brand/n7-seal.png");
  return (
    <span className={cn("n7-seal", className)}>
      <img src={src} alt="NANO7™ Seven Step Pathway" />
    </span>
  );
}

export function Qa7Drop({ className }: { className?: string }) {
  return <N7Seal className={className} />;
}

export function Qa7Banner({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<(typeof PROCESS)[number]["code"]>("INS");
  const active = PROCESS.find((p) => p.code === open) ?? PROCESS[0];
  return (
    <section className={cn("qa7-banner chrome-break", className)}>
      <div className={cn("relative mx-auto max-w-6xl px-5", compact ? "py-10 md:py-12" : "py-12 md:py-16")}>
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
          <div className={cn("n7-well", !compact && "n7-well-lg")}>
            <N7Seal />
          </div>
          <div className="min-w-0 text-center md:text-left">
            <p className="kicker chrome-kicker">Chrome · NanoAssure™ breakaway</p>
            <h2 className="chrome-text mt-4 font-display text-4xl leading-none tracking-wide md:text-6xl">
              NANO7™
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-pearl md:text-xl">
              Seven checks on every job. Tap a step. If a check fails, we stop — we do not sign off.
            </p>
            {compact ? (
              <Link to="/assurance" className="glass-btn mt-6 inline-flex">
                See the seven steps
              </Link>
            ) : null}
          </div>
        </div>
        {compact ? (
          <ol className="qa7-steps mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
            {PROCESS.map((p) => (
              <li key={p.code}>
                <B4Pick
                  kind={p.icon as PackKind}
                  n={p.n}
                  name={p.name}
                  tone={PROCESS_TONE[p.icon]}
                />
              </li>
            ))}
          </ol>
        ) : (
          <>
            <ol className="qa7-steps mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {PROCESS.map((p) => (
                <li key={p.code}>
                  <B4Pick
                    kind={p.icon as PackKind}
                    n={p.n}
                    name={p.name}
                    hint={p.short}
                    tone={PROCESS_TONE[p.icon]}
                    on={open === p.code}
                    onClick={() => setOpen(p.code)}
                  />
                </li>
              ))}
            </ol>
            <article className="b4-card mt-6">
              <div className="b4-head">Step {active.n} of 07 · {active.name}</div>
              <div className="p-6 md:p-8">
                <p className="text-xl leading-relaxed">{active.plain}</p>
              </div>
            </article>
          </>
        )}
      </div>
    </section>
  );
}

export function NanoDataBand({ className }: { className?: string }) {
  const [open, setOpen] = useState<(typeof QA_TESTS)[number]["key"]>("climascan");
  const active = QA_TESTS.find((t) => t.key === open) ?? QA_TESTS[0];
  return (
    <section className={cn("nanodata-banner chrome-break", className)}>
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="kicker chrome-kicker">Chrome · five lab checks inside step 04 · Verify</p>
        <h2 className="chrome-text mt-4 font-display text-4xl leading-none md:text-6xl">NANODATA Collection™</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-pearl">
          Before we approve a job we run five substrate tests. They prove the coating locked to the surface — not dried on top.
        </p>

        <p className="mt-10 text-sm uppercase tracking-[0.16em] text-aqua">Tap a test</p>
        <div className="qa7-steps mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {QA_TESTS.map((t) => (
            <B4Pick
              key={t.key}
              kind={
                t.key === "climascan"
                  ? "droplet"
                  : t.key === "surfiq"
                    ? "layers"
                    : t.key === "phield"
                      ? "ph"
                      : t.key === "nanobond"
                        ? "bond"
                        : "sun"
              }
              n={t.n}
              name={t.name}
              hint={t.short}
              tone={t.key === "climascan" ? "cyan" : t.key === "surfiq" ? "teal" : t.key === "phield" ? "purple" : t.key === "nanobond" ? "gold" : "orange"}
              on={open === t.key}
              onClick={() => setOpen(t.key)}
            />
          ))}
        </div>

        <article className="b4-card mt-8">
          <div className="b4-head">Test {active.n} of 05 · {active.name}</div>
          <div className="p-6 md:p-8">
            <p className="text-lg leading-relaxed">{active.science}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function SurfaceLifeBand({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-6xl px-5 py-12 md:py-16", className)}>
      <p className="kicker">How the surface lives</p>
      <h2 className="gold-text font-display text-3xl md:text-5xl">Cleaner longer. Less maintenance.</h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        The film is the atelier’s work. This is what the asset does after handover — never a
        client application method.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SURFACE_LIFE.map((s) => (
          <li key={s.n} className="rounded-2xl border border-gold/25 bg-carbon-2 p-5">
            <p className="font-mono text-xs tracking-[0.16em] text-neon">{s.n}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-gold-hi">{s.name}</h3>
            <p className="mt-2 text-muted">{s.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProductAssurances({
  heading = "What we coat",
}: {
  heading?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="kicker chrome-kicker">Chrome · NanoAssure™ surfaces</p>
      <h2 className="chrome-text font-display text-3xl md:text-5xl">{heading}</h2>
      <p className="mt-3 max-w-3xl text-lg text-muted">
        Each surface has its own named bond. Open a card to see the product on the collection page.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ASSURANCES.map((a, i) => {
          const product = PRODUCTS.find((p) => p.id === a.productId);
          const n = String(i + 1).padStart(2, "0");
          const hash = product
            ? product.id.includes("glass")
              ? "glass"
              : product.id.includes("stone")
                ? "stone"
                : product.id.includes("ag-")
                  ? "graffiti"
                  : product.id.includes("chrome") || product.id.includes("metal")
                    ? "metal"
                    : product.id.includes("mould")
                      ? "mould"
                      : product.id.includes("fabric")
                        ? "fabric"
                        : product.id.includes("antimicrobial")
                          ? "antimicrobial"
                          : undefined
            : undefined;
          return (
            <Link
              key={a.mark}
              to="/solutions"
              hash={hash}
              className="glass-btn glass-btn-tile"
            >
              {product ? <img src={product.image} alt="" className="glass-btn-photo" /> : null}
              <span className="glass-btn-label">
                {n} · {a.name}
                <span className="glass-btn-hint">{product?.name ?? a.mark}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function Qa7StepRow({ children }: { children?: ReactNode }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-7">
      {PROCESS.map((p) => (
        <li key={p.code} className="metal-panel rounded-xl p-3 text-center">
          <Qa7Mark kind={p.icon} n={p.n} className="mx-auto h-20 w-20" title={`${p.n} ${p.name}`} />
          <p className="mt-2 font-mono text-xs tracking-[0.14em] text-neon">{p.n}</p>
          <p className="mt-1 font-display text-lg leading-tight text-gold-hi">{p.name}</p>
          {children}
        </li>
      ))}
    </ol>
  );
}
