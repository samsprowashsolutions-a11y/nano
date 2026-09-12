import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Button } from "@/components/ui/button";
import { NanoDataBand, ProductAssurances, Qa7Banner } from "@/components/qa/qa7";

export const Route = createFileRoute("/assurance")({
  component: Assurance,
  head: () => ({
    meta: [{ title: "NanoAssure™ · NANO7™ · seven-step pathway" }],
  }),
});

function Assurance() {
  return (
    <SiteShell>
      <Qa7Banner />

      <NanoDataBand />

      <ProductAssurances heading="What we coat" />

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="glass-panel p-8 text-center">
          <h2 className="font-display text-3xl text-gold-hi">Want this on your asset?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
            We look at the surface, specify the right system, apply it, then prove it bonded.
            No public prices. Request a private analysis.
          </p>
          <Button asChild className="mt-6">
            <Link to="/analysis">Express interest</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
