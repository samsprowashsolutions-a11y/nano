import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CHROME, FIELD_TESTS, type ChromeTone } from "@/lib/content";
import { ChromeIcon, FieldTestMark } from "@/components/chrome-disc";
import { rev } from "@/lib/cache";

const GLOW: Record<ChromeTone, string> = {
  carbon: "drop-shadow-[0_10px_18px_rgba(0,0,0,.55)] drop-shadow-[0_0_14px_rgba(200,206,214,.35)]",
  teal: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(0,208,224,.55)]",
  purple: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(168,85,247,.55)]",
  pearl: "drop-shadow-[0_10px_18px_rgba(0,0,0,.4)] drop-shadow-[0_0_16px_rgba(232,228,220,.4)]",
  gold: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(232,184,56,.55)]",
  blue: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(59,130,246,.55)]",
  green: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(34,197,94,.55)]",
  yellow: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(234,179,8,.55)]",
  red: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(239,68,68,.55)]",
  aqua: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(34,211,238,.55)]",
};

export function ChromeShield({
  tone,
  className,
  alt,
}: {
  tone: ChromeTone;
  label?: string;
  className?: string;
  alt?: string;
}) {
  const meta = CHROME.find((c) => c.tone === tone);
  return (
    <ChromeIcon
      tone={tone}
      alt={alt ?? `${meta?.name ?? tone} chrome ${meta?.id ?? ""}`.trim()}
      className={cn(GLOW[tone], className)}
    />
  );
}

export function ChromePlate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("chrome-plate", className)}>
      <div className="chrome-gold-rim">
        <div className="chrome-body">
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ChromeStrip({ className }: { className?: string }) {
  return (
    <div className={cn("chrome-strip", className)}>
      {CHROME.map((c) => (
        <div key={c.id} className="text-center">
          <span className="relative mx-auto inline-grid place-items-center">
            <ChromeShield tone={c.tone} className="h-16 w-16 sm:h-[4.75rem] sm:w-[4.75rem]" />
            <span className="pointer-events-none absolute inset-[18%] grid place-items-center font-mono text-[0.7rem] font-bold tracking-[0.14em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.85)] sm:text-sm">
              {c.id}
            </span>
          </span>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gold-hi">{c.name}</p>
        </div>
      ))}
    </div>
  );
}

export function FieldTestRow({
  test,
  control,
  as: Tag = "article",
}: {
  test: (typeof FIELD_TESTS)[number];
  control?: ReactNode;
  as?: "article" | "label";
}) {
  return (
    <Tag className="field-test-row">
      <FieldTestMark n={test.n} name={test.name} tone={test.tone} className="field-test-chrome" />
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold tracking-[0.04em] text-gold-hi">{test.name}</span>
        <span className="mt-1 block text-lg leading-snug text-muted">{test.detail}</span>
      </span>
      {control}
    </Tag>
  );
}

export function FieldChecklist({
  documentLook = false,
  controls,
}: {
  documentLook?: boolean;
  controls?: Record<string, ReactNode>;
}) {
  const body = (
    <div className="space-y-2">
      {FIELD_TESTS.map((t) => (
        <FieldTestRow
          key={t.n}
          test={t}
          as={controls ? "label" : "article"}
          control={controls?.[t.key]}
        />
      ))}
    </div>
  );
  if (!documentLook) return body;
  return (
    <ChromePlate>
      <div className="chrome-doc p-5 md:p-8">
        <div className="mb-5 flex items-center gap-3 border-b border-gold-deep/40 pb-4">
          <img src={rev("/brand/sp-shield-gold.png")} alt="" className="h-14 w-14 object-contain" />
          <div>
            <p className="font-script text-2xl text-gold-deep md:text-3xl">Five Test Field Checklist</p>
            <p className="chrome-doc-kicker font-bold uppercase">NanoAssure™ Surface Technology</p>
          </div>
        </div>
        {body}
        <p className="mt-5 text-center font-script text-xl text-gold-deep">
          Nanotechnology · Performance · Protection
        </p>
        <p className="chrome-doc-kicker text-center font-bold uppercase">
          Tested. Verified. Assured. · QA-FORM-001 · Rev 1.0
        </p>
      </div>
    </ChromePlate>
  );
}

export function ChromeIndex({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("grid gap-4", compact ? "sm:grid-cols-5" : "md:grid-cols-2 md:items-center")}>
      {!compact ? (
        <div className="text-center md:text-left">
          <p className="kicker">Chrome index</p>
          <h2 className="font-script mt-2 text-4xl text-gold md:text-5xl">Index & Chrome Category System</h2>
          <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-muted md:mx-0">
            Every controlled document lives in a five-tone chrome category — carbon through gold —
            the same language as the Altier.
          </p>
        </div>
      ) : null}
      <div className={cn(compact ? "contents" : "space-y-3")}>
        {CHROME.map((c) => (
          <article
            key={c.id}
            className={cn(
              "metal-panel flex items-center gap-4 rounded-xl p-3",
              compact && "flex-col text-center",
            )}
          >
            <ChromeShield tone={c.tone} className={compact ? "h-16 w-16" : "h-24 w-24 shrink-0"} />
            <div className={compact ? "" : "min-w-0"}>
              <p className="font-display text-xl leading-tight text-gold-hi">
                <span className="mr-2 font-mono text-sm text-aqua">{c.id}</span>
                {c.name}
              </p>
              <p className="mt-1 text-lg leading-snug text-muted">{c.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
