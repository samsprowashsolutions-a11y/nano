import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SWMS } from "@/lib/content";
import { SITE_ACCESS, SITE_HAZARD, SITE_SURFACES, SITE_SWMS } from "@/lib/brand-4";
import { PackDisc } from "@/components/brand/pack-icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/staff/protocol")({ component: Protocol });

function Protocol() {
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const done = useMemo(() => SITE_SWMS.filter((s) => ticks[s.id]).length, [ticks]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Carbon · Governance</p>
        <h1 className="font-display text-3xl">Protocol & SWMS</h1>
        <p className="text-sm text-muted">
          Master is {SWMS.status}. Tick the gates for the site you are on. Document {SWMS.documentId}.
        </p>
      </header>

      <article className="b4-card">
        <div className="b4-head">
          <PackDisc kind="clipboard" n="01" tone="navy" className="b4-sm" />
          Per-site SWMS — complete on analysis / on site
        </div>
        <div className="grid gap-3 p-5 md:grid-cols-2">
          <label className="text-sm font-bold">
            Site
            <input className="mt-1 h-11 w-full rounded-md border-2 border-[#d4af37] px-3" placeholder="Street, suburb" />
          </label>
          <label className="text-sm font-bold">
            Surface
            <select className="mt-1 h-11 w-full rounded-md border-2 border-[#d4af37] px-3">
              {SITE_SURFACES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold">
            Access
            <select className="mt-1 h-11 w-full rounded-md border-2 border-[#d4af37] px-3">
              {SITE_ACCESS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold">
            Hazard
            <select className="mt-1 h-11 w-full rounded-md border-2 border-[#d4af37] px-3">
              {SITE_HAZARD.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-2 px-5 pb-5 sm:grid-cols-2">
          {SITE_SWMS.map((s) => (
            <label key={s.id} className={cn("b4-tick", ticks[s.id] && "is-on")}>
              <input
                type="checkbox"
                checked={Boolean(ticks[s.id])}
                onChange={() => setTicks((t) => ({ ...t, [s.id]: !t[s.id] }))}
              />
              {s.label}
            </label>
          ))}
        </div>
        <p className="px-5 pb-5 text-sm text-muted">
          {done} of {SITE_SWMS.length} gates ticked for this site. Unticked items stay on hold. Master remains a draft until the job is complete.
        </p>
      </article>

      <article className="b4-card">
        <div className="b4-head">Master template — not a finished job SWMS</div>
        <div className="p-5 text-sm leading-relaxed">
          <p><strong>{SWMS.entity}</strong> · {SWMS.authors}</p>
          <p className="mt-2">{SWMS.control}</p>
          <ol className="mt-4 space-y-2">
            {SWMS.steps.map((s) => (
              <li key={s.n} className="flex gap-3 rounded-lg border border-[#d4af37] p-3">
                <PackDisc kind="check" n={s.n} tone="gold" className="b4-sm" />
                <span>{s.activity}</span>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}