import { createFileRoute } from "@tanstack/react-router";
import { AnalysisForm } from "@/components/site/analysis-form";
import { SiteShell } from "@/components/site/shell";
import { HOUSE } from "@/lib/content";

export const Route = createFileRoute("/analysis")({ component: Analysis });

function Analysis() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-carbon-3/80 via-carbon to-carbon" />
        <div className="relative mx-auto max-w-3xl px-5 py-20">
          <p className="kicker chrome-kicker text-center">Analysis · first contact</p>
          <h1 className="gold-foil mt-4 text-center font-display text-4xl md:text-5xl">Analysis</h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-xl leading-relaxed text-pearl">
            Do I qualify for an analysis? Express interest. House selection decides access.
          </p>

          <div className="mt-8 grid gap-3">
            <article className="metal-panel rounded-2xl p-5">
              <h2 className="font-display text-2xl text-gold-hi">Personal / residential</h2>
              <p className="mt-2 text-pearl">{HOUSE.personal}</p>
            </article>
            <article className="metal-panel rounded-2xl p-5">
              <h2 className="font-display text-2xl text-gold-hi">Commercial</h2>
              <p className="mt-2 text-pearl">{HOUSE.commercial}</p>
              <p className="mt-2 text-pearl">{HOUSE.allClear}</p>
            </article>
            <article className="metal-panel rounded-2xl p-5">
              <h2 className="font-display text-2xl text-gold-hi">Upgrade invitation</h2>
              <p className="mt-2 text-pearl">{HOUSE.invite}</p>
              <p className="mt-2 text-pearl">{HOUSE.upgrade}</p>
            </article>
          </div>

          <div className="b4-card mt-10">
            <div className="b4-head">Express interest · analysis</div>
            <div className="p-6 md:p-8">
              <AnalysisForm />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
