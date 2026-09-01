import { useId, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  ASSURANCES,
  NANODATA_SCIENCE,
  PROCESS,
  PRODUCTS,
  QA_TESTS,
  SYSTEMS,
  type Qa7Icon,
} from "@/lib/content";
import { ChromeShield } from "@/components/chrome-shield";

function GoldGlyph({ kind }: { kind: Qa7Icon }) {
  const stroke = "currentColor";
  switch (kind) {
    case "apa":
      return (
        <>
          <polygon points="32,6 56,20 56,44 32,58 8,44 8,20" />
          <circle cx="32" cy="32" r="10" fill="none" stroke={stroke} strokeWidth="2.4" />
          <circle cx="32" cy="32" r="3.2" />
        </>
      );
    case "ar":
      return (
        <>
          <path d="M16 10h24l10 10v36H16z" />
          <path d="M40 10v10h10" fill="none" stroke={stroke} strokeWidth="2.2" />
          <circle cx="32" cy="40" r="7" fill="none" stroke={stroke} strokeWidth="2.2" />
          <path d="M32 36v8M29 40h6" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "apdc":
      return (
        <>
          <polygon points="32,4 60,32 32,60 4,32" />
          <circle cx="32" cy="32" r="3.4" />
          <circle cx="32" cy="18" r="2.2" />
          <circle cx="46" cy="32" r="2.2" />
          <circle cx="32" cy="46" r="2.2" />
          <circle cx="18" cy="32" r="2.2" />
        </>
      );
    case "aphc":
      return (
        <>
          <circle cx="32" cy="32" r="22" />
          <polyline
            points="12,32 22,32 26,20 32,44 38,24 44,32 52,32"
            fill="none"
            stroke={stroke}
            strokeWidth="2.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </>
      );
    case "ssc":
      return (
        <>
          <circle cx="32" cy="32" r="24" />
          <circle cx="32" cy="32" r="16" fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points="32,16 35,28 48,28 37,36 41,48 32,40 23,48 27,36 16,28 29,28" />
        </>
      );
    case "fdp":
      return (
        <>
          <path d="M32 8c0 0 14 16 14 26a14 14 0 1 1-28 0C18 24 32 8 32 8z" />
          <path d="M18 44c0 0 8 9 8 14a8 8 0 1 1-16 0c0-5 8-14 8-14z" transform="translate(2 -6) scale(.7)" />
          <path d="M46 44c0 0 8 9 8 14a8 8 0 1 1-16 0c0-5 8-14 8-14z" transform="translate(-18 -6) scale(.7)" />
        </>
      );
    case "nia":
      return (
        <>
          <polygon points="32,6 58,32 32,58 6,32" />
          <line x1="32" y1="20" x2="32" y2="36" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="32" cy="44" r="2.6" />
        </>
      );
  }
}

export function Qa7Mark({
  kind,
  className,
  title,
}: {
  kind: Qa7Icon;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const g = `qa7g-${uid}`;
  const clip = `qa7c-${uid}`;
  const glow = `qa7n-${uid}`;
  return (
    <svg viewBox="0 0 64 64" className={cn("qa7-mark", className)} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={g} x1="12%" y1="8%" x2="90%" y2="92%">
          <stop offset="0%" stopColor="var(--color-gold-deep)" />
          <stop offset="32%" stopColor="var(--color-gold-glow)" />
          <stop offset="52%" stopColor="var(--color-gold-hi)" />
          <stop offset="78%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="#6a4a12" />
        </linearGradient>
        <clipPath id={clip}>
          <rect x="32" y="0" width="32" height="64" />
        </clipPath>
        <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill={`url(#${g})`} stroke={`url(#${g})`} strokeWidth="1.4" strokeLinejoin="round">
        <GoldGlyph kind={kind} />
      </g>
      <g
        fill="none"
        stroke="var(--color-neon)"
        strokeWidth="2.6"
        strokeLinejoin="round"
        clipPath={`url(#${clip})`}
        filter={`url(#${glow})`}
        className="qa7-neon"
      >
        <GoldGlyph kind={kind} />
      </g>
    </svg>
  );
}

export function Qa7Drop({ className }: { className?: string }) {
  return (
    <img
      src="/brand/qa7-drop-shield.png"
      alt="NanoAssure QA7 — Nano Drop"
      className={cn("qa7-drop", className)}
    />
  );
}

export function Qa7Banner({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("qa7-banner", className)}>
      <div className={cn("relative mx-auto max-w-6xl px-5", compact ? "py-8" : "py-12 md:py-16")}>
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
          <Qa7Drop className={compact ? "h-36 w-auto md:h-44" : "h-44 w-auto md:h-64"} />
          <div className="min-w-0 text-center md:text-left">
            <p className="kicker text-neon">{SYSTEMS.qa7.kicker}</p>
            <p className="font-script mt-1 text-4xl text-gold md:text-6xl">{SYSTEMS.qa7.script}</p>
            <h2 className="gold-text mt-1 font-display text-4xl tracking-wide md:text-6xl">
              {SYSTEMS.qa7.name}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Seven gates. One certificate. The Nano Drop is the mark — molecule to substrate,
              proven before it is promised.
            </p>
          </div>
        </div>
        <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {PROCESS.map((p) => (
            <li key={p.code} className="qa7-step text-center">
              <Qa7Mark kind={p.icon} className="mx-auto h-16 w-16 md:h-20 md:w-20" title={p.name} />
              <p className="mt-2 font-mono text-sm text-neon">{p.n} · {p.code}</p>
              <p className="font-display text-lg text-gold-hi">{p.short}</p>
              <p className="text-sm leading-snug text-muted">{p.name}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function NanoDataBand({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-6xl px-5 py-12 md:py-16", className)}>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">{SYSTEMS.nanodata.kicker}</p>
          <p className="font-script text-3xl text-gold md:text-4xl">{SYSTEMS.nanodata.script}</p>
          <h2 className="gold-text font-display text-3xl md:text-5xl">{SYSTEMS.nanodata.name}</h2>
        </div>
        <p className="max-w-xl text-muted">{SYSTEMS.nanodata.role}</p>
      </div>
      <p className="mb-8 max-w-4xl text-lg leading-relaxed text-pearl">{NANODATA_SCIENCE}</p>
      <div className="grid gap-3 sm:grid-cols-5">
        {QA_TESTS.map((t) => (
          <article key={t.n} className="metal-panel rounded-xl p-4 text-center">
            <ChromeShield tone={t.tone} className="mx-auto mb-2 h-20 w-[4.5rem]" />
            <p className="font-mono text-xs text-aqua">{t.n}</p>
            <p className="font-semibold text-gold-hi">{t.name}</p>
            <p className="text-sm uppercase tracking-wider text-aqua">{t.short}</p>
            <p className="mt-2 text-sm leading-snug text-muted">{t.science}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function testsFor(keys: string[]) {
  return QA_TESTS.filter((t) => keys.includes(t.key));
}

export function ProductAssurances({
  heading = "Named assurance · each system",
}: {
  heading?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="kicker">QA7 × NANODATA</p>
      <h2 className="gold-text font-display text-3xl md:text-5xl">{heading}</h2>
      <p className="mt-3 max-w-3xl text-lg text-muted">
        Every specified system carries a named NanoAssure QA7™ bond. The science underneath is
        NANODATA Collection™ — a series of substrate tests that prove the molecules have locked
        to the face, not dried as a film on top.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ASSURANCES.map((a) => {
          const product = PRODUCTS.find((p) => p.id === a.productId);
          const tests = testsFor(a.tests);
          return (
            <article key={a.mark} className="overflow-hidden rounded-2xl border border-gold/25 bg-carbon-2">
              {product ? (
                <img src={product.image} alt="" className="aspect-[21/9] w-full object-cover" />
              ) : null}
              <div className="p-5">
                <p className="font-mono text-xs tracking-[0.14em] text-neon">{a.mark}</p>
                <h3 className="font-display text-2xl text-gold-hi">{a.name}</h3>
                {product ? <p className="text-sm text-aqua">{product.name}</p> : null}
                <p className="mt-2 text-base leading-relaxed text-pearl">{a.science}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tests.map((t) => (
                    <span
                      key={t.key}
                      className="inline-flex items-center gap-1 rounded-full border border-chrome/20 px-2 py-1"
                    >
                      <ChromeShield tone={t.tone} className="h-6 w-5" />
                      <span className="text-xs font-semibold text-gold-hi">{t.name}</span>
                    </span>
                  ))}
                </div>
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  {a.notes.map((n) => (
                    <li key={n}>— {n}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-center">
        <Link to="/analysis" className="text-gold hover:text-gold-hi">
          Request analysis →
        </Link>
      </p>
    </section>
  );
}

export function Qa7StepRow({ children }: { children?: ReactNode }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-7">
      {PROCESS.map((p) => (
        <li key={p.code} className="metal-panel rounded-xl p-3 text-center">
          <Qa7Mark kind={p.icon} className="mx-auto h-14 w-14" title={p.name} />
          <p className="mt-2 font-mono text-xs text-neon">{p.n} · {p.code}</p>
          <p className="font-display text-lg text-gold-hi">{p.short}</p>
          <p className="text-sm leading-snug text-muted">{p.name}</p>
          {children}
        </li>
      ))}
    </ol>
  );
}
