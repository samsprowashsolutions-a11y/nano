import { createFileRoute } from "@tanstack/react-router";
import { SWMS } from "@/lib/content";
import { ChromePlate, ChromeStrip } from "@/components/chrome-shield";

export const Route = createFileRoute("/staff/protocol")({ component: Protocol });

function Protocol() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Carbon · Governance</p>
        <h1 className="gold-text font-display text-3xl">Protocol & SWMS</h1>
        <p className="text-sm text-muted">
          Master section. Project-specific completion required before issue. Governance under{" "}
          {SWMS.authors}.
        </p>
      </header>

      <ChromePlate>
        <div className="p-6 md:p-8">
          <p className="font-script text-3xl text-gold">{SWMS.title}</p>
          <p className="kicker mt-1">
            NanoAssure™ Surface Technology
          </p>
          <dl className="mt-5 grid gap-2 text-sm md:grid-cols-2">
            {[
              ["Legal entity", SWMS.entity],
              ["Status", SWMS.status],
              ["Document ID", SWMS.documentId],
              ["Approval", SWMS.approval],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-carbon/40 px-4 py-3">
                <dt className="kicker text-muted">{k}</dt>
                <dd className="mt-1 font-semibold text-gold-hi">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-lg border border-gold/25 bg-gold/8 p-4 text-sm leading-relaxed text-pearl">
            <span className="font-bold text-gold">Control note. </span>
            {SWMS.control}
          </p>
        </div>
      </ChromePlate>

      <section className="metal-panel rounded-xl p-6">
        <h2 className="font-script text-2xl text-gold">1. Project and Work Details</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-sm uppercase tracking-widest text-gold">
                <th className="pb-2">Field</th>
                <th className="pb-2">Project-specific entry</th>
              </tr>
            </thead>
            <tbody>
              {SWMS.fields.map((f) => (
                <tr key={f} className="border-t border-border">
                  <td className="py-2.5 text-pearl">{f}</td>
                  <td className="py-2.5 text-muted">[TO BE COMPLETED]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="metal-panel rounded-xl p-6">
        <h2 className="font-script text-2xl text-gold">2. Scope and Controlled Work Sequence</h2>
        <p className="mt-2 text-sm text-muted">
          Master structure only. Delete non-applicable steps and add the actual project sequence after
          site review.
        </p>
        <ol className="mt-4 space-y-2">
          {SWMS.steps.map((s) => (
            <li key={s.n} className="flex gap-3 rounded-lg border border-border p-3">
              <span className="gold-cta grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">
                {s.n}
              </span>
              <span className="text-sm text-pearl">{s.activity}</span>
            </li>
          ))}
        </ol>
      </section>

      <img
        src="/docs/swms.png"
        alt="NanoAssure Safe Work Method Statement — page 1 of 4"
        className="w-full rounded-xl border border-chrome/20"
      />

      <ChromeStrip />
    </div>
  );
}
