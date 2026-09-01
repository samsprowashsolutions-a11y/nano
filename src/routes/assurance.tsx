import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { PROCESS, SYSTEMS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ChromeIndex, ChromePlate, FieldChecklist } from "@/components/chrome-shield";
import { NanoDataBand, ProductAssurances, Qa7Banner, Qa7Mark } from "@/components/qa/qa7";

export const Route = createFileRoute("/assurance")({ component: Assurance });

function Assurance() {
  return (
    <SiteShell>
      <Qa7Banner />

      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="kicker">Pearl · the seven gates</p>
        <h2 className="gold-text font-display text-3xl md:text-5xl">Each mark is a hold-point</h2>
        <p className="mt-3 max-w-3xl text-lg text-muted">
          Gold metallic. Half neon. Not a shield — shields belong to {SYSTEMS.nanodata.name}.
          NANO7™ is the policy. NANODATA Collection™ is the science inside Verify.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {PROCESS.map((p) => (
            <article key={p.code} className="flex gap-4 rounded-2xl border border-gold/20 bg-carbon-2 p-5">
              <Qa7Mark kind={p.icon} className="h-16 w-16 shrink-0" title={p.name} />
              <div>
                <p className="font-mono text-sm text-neon">{p.n} · {p.code} · {p.short}</p>
                <h3 className="font-display text-2xl text-gold-hi">{p.name}</h3>
                <p className="mt-1 text-muted">{p.detail}</p>
                <p className="mt-2 text-sm italic text-gold">{p.hold}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <NanoDataBand />

      <ProductAssurances />

      <section className="mx-auto max-w-3xl px-5 pb-16">
        <h2 className="gold-text mb-2 font-display text-3xl">Five-test field checklist</h2>
        <p className="mb-6 font-script text-2xl text-gold">Nanotechnology · Performance · Protection</p>
        <p className="mb-6 text-muted">
          Verify on the NANO7™ pathway. After NANODATA Collection™ has locked the molecules, the
          workface still initials adhesion, beading, UV, antimicrobial and durability.
        </p>
        <FieldChecklist documentLook />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <ChromePlate>
          <div className="p-6 md:p-10">
            <ChromeIndex />
          </div>
        </ChromePlate>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="gold-text mb-4 font-display text-3xl">Verify IDs</h2>
        <p className="max-w-xl text-muted">
          Format <code className="text-aqua">NA-YYYYMMDD-XXXX</code>. Issued only after NANO7™
          Approve — and only after NANODATA Collection™ has confirmed the molecular lock.
        </p>
        <Button asChild className="mt-6">
          <Link to="/analysis">Request analysis</Link>
        </Button>
      </section>
    </SiteShell>
  );
}
