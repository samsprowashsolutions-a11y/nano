import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Film } from "@/components/site/film";
import { BRAND } from "@/lib/content";
import { BrandLockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        <div>
          <p className="font-script text-4xl text-gold">The maison</p>
          <h1 className="gold-text mt-1 font-display text-4xl md:text-5xl">{BRAND.public}</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Public brand: NanoAssure™ — Asset Protection, Darwin NT. Parent: {BRAND.parent} (ABN{" "}
            {BRAND.abn} · ACN {BRAND.acn}). Aboriginal-led. Invitation-only analysis. Staff systems
            remain confidential.
          </p>
          <p className="mt-4 italic text-pearl">{BRAND.positioning}</p>
          <p className="mt-4 text-sm text-muted">{BRAND.tagline}</p>
          <BrandLockup className="mt-8 max-w-lg" />
        </div>
      </section>
      <Film src="/media/film-estate.mp4" poster="/media/estate-dusk.jpg" bleed className="aspect-[21/9] min-h-[320px] md:min-h-[520px]" />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
        {[
          ["Samantha Rae", "Director — command, specification, financials"],
          ["Jasmin Calma", "Director — cultural advisor, academy, community"],
          ["Kate", "Operations — field command, chemicals, QA gates"],
        ].map(([n, r]) => (
          <div key={n} className="metal-panel rounded-xl p-6">
            <p className="font-display text-xl text-gold-hi">{n}</p>
            <p className="mt-2 text-sm text-muted">{r}</p>
          </div>
        ))}
      </section>
      <section className="w-full pb-16">
        <img src="/media/pavers.jpg" alt="Specified stone after coating" className="h-[50vh] w-full object-cover md:h-[70vh]" />
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
          <div>
            <h2 className="gold-text font-display text-3xl">Limited edition service</h2>
            <p className="mt-3 text-muted">
              Concurrent live projects are capped. We would rather protect four assets perfectly
              than twenty poorly. That is the atelier rule.
            </p>
          </div>
          <div>
            <h2 className="gold-text font-display text-3xl">Country</h2>
            <p className="mt-3 text-muted">
              We acknowledge the Traditional Owners and Custodians of Country throughout the
              Northern Territory and their continuing connection to land, waters and community.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <Button asChild>
          <Link to="/careers">Careers</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
