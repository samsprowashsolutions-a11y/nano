import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AnalysisForm } from "@/components/site/analysis-form";
import { BeforeAfter } from "@/components/site/before-after";
import { Film } from "@/components/site/film";
import { SiteShell } from "@/components/site/shell";
import { ChromeStrip, FieldChecklist } from "@/components/chrome-shield";
import { SOLUTIONS, TRUST } from "@/lib/content";
import { BrandLockup, WaterGlassBand } from "@/components/brand/logo";
import { NanoDataBand, Qa7Banner } from "@/components/qa/qa7";
import { listPublicBriefs } from "@/lib/server/atelier";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const briefs = useQuery({ queryKey: ["public-briefs"], queryFn: () => listPublicBriefs() });
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src="/media/film-estate.mp4"
          poster="/media/estate-dusk.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-linear-to-b from-carbon/40 via-carbon/70 to-carbon" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-28">
          <div className="max-w-2xl">
            <p className="kicker mb-4 inline-block rounded-full border border-aqua/40 bg-aqua/10 px-3 py-1">
              Darwin · By appointment · Limited edition
            </p>
            <h1 className="mb-4 font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
              Advanced nano protection.
              <span className="gold-text block italic">Lasting performance.</span>
            </h1>
            <p className="mb-6 max-w-lg text-xl leading-relaxed text-muted md:text-2xl">
              NanoAssure™ Surface Technology is the private asset-protection atelier of Sam's
              Pro-Wash Solutions. We do not quote in public. We analyse, specify, and prove.
            </p>
            <div className="mb-8 grid grid-cols-2 gap-2">
              {[
                ["Long lasting", "Invisible nano barrier, years not months"],
                ["UV & weather", "Built for Darwin heat, salt and storms"],
                ["Self-cleaning", "Water beads, dirt releases, glass stays clear"],
                ["PFAS free", "Low-impact chemistry, specification documented"],
              ].map(([t, d]) => (
                <div key={t} className="metal-panel rounded-lg p-3">
                  <p className="text-base font-semibold text-gold-hi">{t}</p>
                  <p className="mt-1 text-base leading-snug text-muted">{d}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/analysis">Private analysis</Link>
              </Button>
              <Button asChild variant="aqua" size="lg">
                <Link to="/solutions">The collection</Link>
              </Button>
            </div>
            <ChromeStrip className="mt-8 max-w-md" />
            <BrandLockup className="mt-8 max-w-lg" />
          </div>
        </div>
      </section>

      <Film
        bleed
        src="/media/film-beads.mp4"
        poster="/media/beads-macro.jpg"
        caption="The astonishment of water repulsion"
        className="aspect-[21/9] min-h-[320px] md:min-h-[480px]"
      />

      <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t) => (
          <article key={t.title} className="metal-panel rounded-xl p-5 text-center">
            <h3 className="mb-2 font-display text-2xl text-gold-hi">{t.title}</h3>
            <p className="text-lg text-muted">{t.copy}</p>
          </article>
        ))}
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5 pb-8 text-center">
          <p className="kicker mb-2">Edition 01 · Glass</p>
          <h2 className="gold-text font-display text-3xl md:text-4xl">Self-cleaning window coating</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Hydrophobic nano-coating creates a microscopic barrier. Water beads, lifts dirt, and
            rolls away. Cleaner longer. Less maintenance. Extended asset life.
          </p>
        </div>
        <BeforeAfter />
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="metal-panel rounded-xl p-6">
            <h3 className="mb-3 font-display text-xl text-purple-glow">How it works</h3>
            <ol className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {["Coating bonds", "Water hits", "Beads & rolls", "Clean & clear"].map((s, i) => (
                <li key={s} className="rounded-lg border border-border p-3 text-center">
                  <span className="gold-cta mx-auto mb-2 grid size-8 place-items-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-gold-hi">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <WaterGlassBand tall />
        <Film
          bleed
          src="/media/film-rain-glass.mp4"
          poster="/media/water-glass-banner.jpg"
          caption="Rain on specified glass."
          className="aspect-[21/9] min-h-[280px] md:min-h-[420px]"
        />
      </section>

      <section className="pb-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-5 pb-8">
          <div>
            <p className="kicker">The collection</p>
            <h2 className="gold-text font-display text-3xl">Specified systems</h2>
          </div>
          <Link to="/solutions" className="text-xs font-bold uppercase tracking-widest text-gold">
            View all →
          </Link>
        </div>
        <div>
          {SOLUTIONS.map((s) => (
            <Link key={s.id} to="/solutions" className="group relative block min-h-[58vh] w-full overflow-hidden md:min-h-[70vh]">
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/45 to-carbon/10" />
              <div className="relative flex min-h-[58vh] items-end px-5 py-12 md:min-h-[70vh] md:px-12">
                <div className="max-w-xl">
                  <h3 className="font-display text-3xl text-gold-hi md:text-5xl">{s.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-pearl md:text-xl">{s.copy}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Qa7Banner />
      <NanoDataBand />

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <p className="kicker mb-2 text-center">
          Pearl · QA-FORM-001 · Verify
        </p>
        <h2 className="gold-text mb-6 text-center font-display text-3xl">Five-test field checklist</h2>
        <FieldChecklist documentLook />
      </section>
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <img
          src="/media/application.jpg"
          alt="NanoAssure field application on commercial glass"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-carbon via-carbon/75 to-carbon/20" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center px-5 py-20">
          <div className="max-w-xl">
          <p className="font-script text-3xl text-gold">By invitation</p>
          <h2 className="gold-text mt-1 font-display text-3xl md:text-4xl">Exclusive analysis pathway</h2>
          <p className="mt-4 leading-relaxed text-muted">
            There are no public prices. No call-out menus. Clients, agencies and asset owners
            request a confidential analysis. We inspect, specify chemistry to TDS, and issue a
            NanoAssure™ verify ID when the work is proven.
          </p>
          <p className="mt-3 text-sm italic text-pearl/80">
            SP applies advanced surface protection to specification. NanoAssure™ proves it.
          </p>
          <Button asChild className="mt-6">
            <Link to="/analysis">Begin analysis</Link>
          </Button>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <p className="kicker mx-auto max-w-6xl px-5 pb-4">Atelier film</p>
        <Film
          bleed
          src="/media/film-house.mp4"
          poster="/media/residence-night.jpg"
          caption="Golden hour on glass."
          className="aspect-[21/9] min-h-[280px] md:min-h-[520px]"
        />
        <Film
          bleed
          src="/media/film-rain-glass.mp4"
          poster="/media/beads-macro.jpg"
          caption="Rain. Chrome beads."
          className="aspect-[21/9] min-h-[280px] md:min-h-[520px]"
        />
        <div className="grid grid-cols-2 md:grid-cols-3">
          {[
            ["/media/estate-dusk.jpg", "Dusk façade"],
            ["/media/pavers.jpg", "Stone after coating"],
            ["/media/stone-split.jpg", "Masonry split view"],
            ["/media/estate-night.jpg", "Night façade"],
            ["/media/facade-dusk.jpg", "Plaza dusk"],
            ["/media/residence-night.jpg", "Evening glass"],
            ["/media/beads-macro.jpg", "Hydrophobic beads"],
            ["/media/technician.jpg", "Controlled application"],
            ["/media/civic-stone.jpg", "Civic sandstone"],
            ["/media/commercial-glass.jpg", "Commercial glass"],
            ["/media/application.jpg", "Field mist"],
            ["/media/metal-cladding.jpg", "Metal cladding"],
            ["/media/solar-array.jpg", "Solar array"],
            ["/media/antimicrobial-lobby.jpg", "High-touch interiors"],
            ["/media/masonry-protected.jpg", "Protected masonry"],
          ].map(([src, cap]) => (
            <figure key={src} className="overflow-hidden">
              <img src={src} alt={cap} className="aspect-[4/3] h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section id="brief" className="mx-auto max-w-6xl px-5 pb-20">
        {(briefs.data ?? []).length > 0 ? (
          <>
            <p className="kicker mb-3">Ops brief</p>
            <div className="grid gap-4 md:grid-cols-2">
              {briefs.data?.map((b) => (
                <article key={b.id} className="metal-panel rounded-xl p-6">
                  <h2 className="font-display text-2xl text-gold-hi">{b.title}</h2>
                  <p className="mt-2 text-lg text-muted">{b.body}</p>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24">
        <ChromePlate>
          <div className="p-8">
            <h2 className="gold-text mb-2 text-center font-display text-3xl">Request analysis</h2>
            <p className="mb-6 text-center text-lg text-muted">
              Direct to the atelier. Same-day acknowledgement. No public phone book.
            </p>
            <AnalysisForm />
          </div>
        </ChromePlate>
      </section>
    </SiteShell>
  );
}

