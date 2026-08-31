import { createFileRoute } from "@tanstack/react-router";
import { AnalysisForm } from "@/components/site/analysis-form";
import { SiteShell } from "@/components/site/shell";
import { ChromePlate } from "@/components/chrome-shield";

export const Route = createFileRoute("/analysis")({ component: Analysis });

function Analysis() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-carbon-3/80 via-carbon to-carbon" />
        <div className="relative mx-auto max-w-3xl px-5 py-20">
          <p className="text-center font-script text-4xl text-gold">Concierge</p>
          <h1 className="gold-text text-center font-display text-4xl md:text-5xl">Private analysis</h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-xl leading-relaxed text-muted">
            No public prices. No cold call-outs. Tell us the asset. We respond with a confidential
            pathway — inspection, specification, and NanoAssure™ proof.
          </p>
          <ChromePlate className="mt-10">
            <div className="p-8">
              <AnalysisForm />
            </div>
          </ChromePlate>
        </div>
      </section>
    </SiteShell>
  );
}
