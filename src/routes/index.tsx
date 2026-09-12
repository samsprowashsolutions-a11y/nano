import { createFileRoute, Link } from "@tanstack/react-router";
import { AnalysisForm } from "@/components/site/analysis-form";
import { BeforeAfter } from "@/components/site/before-after";
import { Film } from "@/components/site/film";
import { SiteShell } from "@/components/site/shell";
import { ChromePlate } from "@/components/chrome-shield";
import { BRAND, HOUSE, SOLUTIONS, TRUST } from "@/lib/content";
import { NanoDataBand, Qa7Banner, SurfaceLifeBand } from "@/components/qa/qa7";
import { listPublicBriefs } from "@/lib/server/atelier";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const briefs = useQuery({ queryKey: ["public-briefs"], queryFn: () => listPublicBriefs() });
  return (
    <SiteShell>
      <section className="relative isolate min-h-[72vh] overflow-hidden md:min-h-[82vh]">
        <img
          src="/media/estate-dusk.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/media/film-estate.mp4"
          poster="/media/estate-dusk.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-linear-to-b from-carbon/25 via-carbon/40 to-carbon/90" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl items-end px-5 py-16 md:min-h-[82vh] md:py-24">
          <div className="max-w-2xl">
            <p className="kicker mb-4 inline-block rounded-full border border-aqua/40 bg-aqua/10 px-3 py-1">
              Darwin NT · We apply it. You don’t.
            </p>
            <h1 className="mb-6 font-display text-4xl font-semibold leading-[1.12] md:text-6xl">
              We coat glass, stone, metal, fabric and civic interiors so they stay cleaner.
              <span className="gold-text mt-2 block italic">Water beads. Dirt lets go.</span>
            </h1>
            <p className="mb-8 max-w-lg text-xl leading-relaxed text-pearl md:text-2xl">
              {BRAND.positioning} We apply the film, run the checks, then hand you the proof.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#surfaces" className="glass-btn glass-btn-gold">
                Surfaces
              </a>
              <Link to="/analysis" className="glass-btn">
                Express interest
              </Link>
              <Link to="/verify" className="glass-btn">
                Verify ID
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="kicker mb-2">The house</p>
        <h2 className="gold-text mb-6 font-display text-3xl md:text-4xl">Exclusive, insured, evidence-led</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <article key={t.title} className="rounded-2xl border border-gold/25 bg-carbon-2 p-5">
              <h3 className="font-display text-xl text-gold-hi">{t.title}</h3>
              <p className="mt-2 text-base text-muted">{t.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="surfaces" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-10">
        <p className="kicker mb-2">What do you need coated?</p>
        <h2 className="gold-text mb-3 font-display text-3xl md:text-4xl">Tap the surface</h2>
        <p className="mb-6 max-w-2xl text-lg text-muted">
          Named systems only. We inspect before we specify. Method stays with the atelier.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {SOLUTIONS.map((s) => (
            <Link key={s.id} to="/solutions" hash={s.id} className="b4-pick">
              <img src={s.image} alt="" className="mb-2 h-28 w-full rounded-xl object-cover md:h-32" />
              <span className="b4-pick-name">{s.title}</span>
              <span className="b4-pick-hint">{s.copy.split(".")[0]}.</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="proof" className="scroll-mt-28 pb-8">
        <div className="mx-auto max-w-6xl px-5 pb-8 text-center">
          <p className="kicker mb-2">What glass looks like after</p>
          <h2 className="gold-text font-display text-3xl md:text-4xl">Self-cleaning window coating</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">
            Water beads and dirt releases. The glass stays presentation-ready. We apply this. It is not a DIY kit.
          </p>
        </div>
        <BeforeAfter />
        <Film
          bleed
          src="/media/film-rain-glass.mp4"
          poster="/media/water-glass-banner.jpg"
          caption="Rain on specified glass"
          className="mt-8 aspect-[21/9] min-h-[280px] md:min-h-[420px]"
        />
      </section>

      <SurfaceLifeBand />

      <Film
        bleed
        src="/media/film-facade.mp4"
        poster="/media/facade-dusk.jpg"
        caption="Specified façade. Presentation-ready."
        className="aspect-[21/9] min-h-[260px] md:min-h-[400px]"
      />

      <Qa7Banner />

      <Film
        bleed
        src="/media/n7-pathway.mp4"
        poster="/media/estate-night.jpg"
        caption="NANO7™ · seven metallic gates"
        className="aspect-[21/9] min-h-[240px] md:min-h-[360px]"
      />

      <NanoDataBand />

      <section className="relative isolate min-h-[52vh] overflow-hidden">
        <img src="/media/chrome-banner.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/40 to-carbon/25" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl items-end px-5 py-10">
          <div className="max-w-xl">
            <p className="kicker">Metal & chrome</p>
            <h2 className="chrome-text font-display text-3xl md:text-5xl">Protects chrome. Does not chrome it.</h2>
            <p className="mt-3 text-lg text-pearl">
              A light film on existing polished metal. Not plating. Not wax. Applied by the atelier.
            </p>
            <Link to="/solutions" hash="metal" className="glass-btn mt-5 inline-flex">
              Metal & chrome
            </Link>
          </div>
        </div>
      </section>

      <section id="qualify" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14">
        <p className="kicker mb-2">First contact</p>
        <h2 className="gold-text font-display text-3xl md:text-4xl">Do I qualify for an analysis?</h2>
        <p className="mt-3 max-w-2xl text-lg text-pearl">
          Express interest. House selection. We reply by the size of the asset. No public prices. No application instructions.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <article className="rounded-2xl border-2 border-gold/50 bg-gold/10 p-6">
            <p className="font-mono text-xs tracking-[0.16em] text-gold-hi">$5,000 or more</p>
            <h3 className="mt-2 font-display text-2xl text-gold-hi">Priority line</h3>
            <p className="mt-2 text-lg text-pearl">
              Automated approved response. You will receive a phone call very soon, you are in the priority line.
            </p>
          </article>
          <article className="rounded-2xl border border-chrome/40 bg-carbon-2 p-6">
            <p className="font-mono text-xs tracking-[0.16em] text-pearl">Under $5,000</p>
            <h3 className="mt-2 font-display text-2xl text-gold-hi">Nanotech Team</h3>
            <p className="mt-2 text-lg text-pearl">The Nanotech Team will respond within 24 hours.</p>
          </article>
          <article className="rounded-2xl border border-chrome/40 bg-carbon-2 p-6">
            <p className="font-mono text-xs tracking-[0.16em] text-pearl">Personal</p>
            <h3 className="mt-2 font-display text-2xl text-gold-hi">Residential pathway</h3>
            <p className="mt-2 text-lg text-pearl">{HOUSE.personal}</p>
          </article>
          <article className="rounded-2xl border border-chrome/40 bg-carbon-2 p-6">
            <p className="font-mono text-xs tracking-[0.16em] text-pearl">Commercial</p>
            <h3 className="mt-2 font-display text-2xl text-gold-hi">Applicator All Clear</h3>
            <p className="mt-2 text-lg text-pearl">{HOUSE.commercial}</p>
          </article>
        </div>
        <p className="mt-5 max-w-2xl text-lg text-pearl">{HOUSE.upgrade}</p>
        <a href="#interest" className="glass-btn glass-btn-gold mt-6 inline-flex">
          Express interest
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="grid gap-3 md:grid-cols-3">
          <Link to="/assurance" className="b4-pick">
            <span className="b4-pick-name">NANO7™ pathway</span>
            <span className="b4-pick-hint">Inspect to handover. Seven metallic gates.</span>
          </Link>
          <Link to="/verify" className="b4-pick">
            <span className="b4-pick-name">Verify ID</span>
            <span className="b4-pick-hint">NA-YYYYMMDD-XXXX on the asset certificate.</span>
          </Link>
          <Link to="/about" className="b4-pick">
            <span className="b4-pick-name">The maison</span>
            <span className="b4-pick-hint">Sam’s Prowash Solutions · NanoAssure™.</span>
          </Link>
        </div>
      </section>

      {(briefs.data ?? []).length > 0 ? (
        <section id="brief" className="mx-auto max-w-6xl px-5 py-12">
          <p className="kicker mb-3">Ops brief</p>
          <div className="grid gap-4 md:grid-cols-2">
            {briefs.data?.map((b) => (
              <article key={b.id} className="metal-panel rounded-xl p-6">
                <h2 className="font-display text-2xl text-gold-hi">{b.title}</h2>
                <p className="mt-2 text-lg text-muted">{b.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section id="interest" className="mx-auto max-w-3xl scroll-mt-28 px-5 py-16">
        <ChromePlate>
          <div className="p-8">
            <h2 className="gold-foil mb-2 text-center font-display text-3xl">Express interest</h2>
            <p className="mb-6 text-center text-lg text-muted">
              Tell us the surface and the size of the asset. We inspect, specify and reply.
            </p>
            <AnalysisForm />
          </div>
        </ChromePlate>
      </section>
    </SiteShell>
  );
}
