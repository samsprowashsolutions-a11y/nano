import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Film } from "@/components/site/film";
import { BRAND, HOUSE, PUBLIC_ROLES } from "@/lib/content";
import { HousePair } from "@/components/brand/logo";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        <div>
          <p className="kicker chrome-kicker">The maison</p>
          <h1 className="gold-text font-display text-4xl leading-none md:text-5xl">{BRAND.public}</h1>
          <p className="mt-4 leading-relaxed text-pearl">
            Public brand: NanoAssure™ — Asset Protection, Darwin NT. Parent: {BRAND.parent} (ABN{" "}
            {BRAND.abn} · ACN {BRAND.acn}). Aboriginal-led. Invitation-only analysis. Altier
            remains confidential.
          </p>
          <p className="mt-4 italic text-pearl">{BRAND.positioning}</p>
          <p className="mt-4 text-pearl">{HOUSE.trade}</p>
          <Link to="/analysis" className="glass-btn glass-btn-gold mt-8 inline-flex">
            Express interest
          </Link>
        </div>
        <HousePair className="h-48 w-auto max-w-full justify-self-center md:h-64" />
      </section>
      <Film src="/media/film-estate.mp4" poster="/media/estate-dusk.jpg" bleed className="aspect-[21/9] min-h-[320px] md:min-h-[520px]" />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="kicker chrome-kicker">House selection</p>
        <h2 className="gold-text font-display text-3xl md:text-4xl">Invitation, not a shopfront</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {[HOUSE.invite, HOUSE.personal, HOUSE.commercial, HOUSE.allClear, HOUSE.upgrade].map((copy) => (
            <article key={copy} className="metal-panel rounded-2xl p-6">
              <p className="text-lg leading-relaxed text-pearl">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <p className="kicker chrome-kicker">Roles · responsibilities</p>
        <h2 className="gold-text mb-6 font-display text-3xl md:text-4xl">Who holds what</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PUBLIC_ROLES.map((r) => (
            <article key={r.name} className="metal-panel rounded-2xl p-6">
              <p className="font-display text-2xl text-gold-hi">{r.name}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-pearl">{r.role}</p>
              <p className="mt-3 text-base leading-relaxed text-pearl">{r.duty}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full pb-16">
        <img src="/media/pavers.jpg" alt="Specified stone after coating" className="h-[50vh] w-full object-cover md:h-[70vh]" />
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
          <div>
            <h2 className="gold-text font-display text-3xl">Limited edition service</h2>
            <p className="mt-3 text-pearl">
              Concurrent live projects are capped. We would rather protect four assets perfectly
              than twenty poorly. That is the atelier rule.
            </p>
          </div>
          <div>
            <h2 className="gold-text font-display text-3xl">Country</h2>
            <p className="mt-3 text-pearl">
              We acknowledge the Traditional Owners and Custodians of Country throughout the
              Northern Territory and their continuing connection to land, waters and community.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <Link to="/careers" className="glass-btn inline-flex">
          Careers
        </Link>
      </div>
    </SiteShell>
  );
}
