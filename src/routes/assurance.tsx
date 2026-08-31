import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { PROCESS, QA_TESTS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ChromeIndex, ChromePlate, ChromeShield, FieldChecklist } from "@/components/chrome-shield";

export const Route = createFileRoute("/assurance")({ component: Assurance });

function Assurance() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="kicker">Pearl category · QA</p>
        <h1 className="gold-text mt-2 font-display text-4xl md:text-6xl">Proven. Not promised.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          NanoAssure™ is the evidence layer. SP applies the chemistry. The five-step data test set
          and the field five-test checklist are how we show the work.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="gold-text mb-6 font-display text-3xl">5-Step Data Test Set™</h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {QA_TESTS.map((t) => (
            <div key={t.n} className="metal-panel rounded-xl p-4 text-center">
              <ChromeShield tone={t.tone} className="mx-auto mb-2 h-20 w-[4.5rem]" />
              <p className="font-mono text-xs text-aqua">{t.n}</p>
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-xs text-muted">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-16">
        <h2 className="gold-text mb-2 font-display text-3xl">Five-test field checklist</h2>
        <p className="mb-6 font-script text-2xl text-gold">Nanotechnology · Performance · Protection</p>
        <FieldChecklist documentLook />
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <ChromePlate>
          <div className="p-6 md:p-10">
            <ChromeIndex />
          </div>
        </ChromePlate>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="gold-text mb-6 font-display text-3xl">Seven-step process</h2>
        <ol className="grid gap-3 md:grid-cols-7">
          {PROCESS.map((p, i) => (
            <li key={p.code} className="metal-panel rounded-xl p-4 text-center">
              <p className="text-sm text-muted">0{i + 1}</p>
              <p className="font-bold text-gold">{p.code}</p>
              <p className="mt-1 text-sm text-muted">{p.name}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="gold-text mb-4 font-display text-3xl">Verify IDs</h2>
        <p className="max-w-xl text-sm text-muted">
          Format <code className="text-aqua">NA-YYYYMMDD-XXXX</code>. Issued only after gates pass.
          The public may look up a certificate. The atelier holds the register.
        </p>
        <Button asChild className="mt-6">
          <Link to="/analysis">Request analysis</Link>
        </Button>
      </section>
    </SiteShell>
  );
}
