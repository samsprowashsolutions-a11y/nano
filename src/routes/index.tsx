import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AnalysisForm } from "@/components/site/analysis-form";
import { BeforeAfter } from "@/components/site/before-after";
import { Film } from "@/components/site/film";
import { SiteShell } from "@/components/site/shell";
import { ChromeIndex, ChromePlate, ChromeShield, ChromeStrip, FieldChecklist } from "@/components/chrome-shield";
import { PROCESS, QA_TESTS, SOLUTIONS, TRUST } from "@/lib/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
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
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
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
          </div>
          <div className="space-y-4">
            <div className="logo-chrome mx-auto w-44 md:w-56">
              <img
                src="/brand/sp-logo-neon-glow.webp"
                alt="SP NanoAssure neon chrome shield"
                className="w-full"
              />
            </div>
            <Film
              src="/media/film-beads.mp4"
              poster="/media/beads-macro.jpg"
              caption="The astonishment of water repulsion"
              className="aspect-3/4 max-h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t) => (
          <article key={t.title} className="metal-panel rounded-xl p-5 text-center">
            <h3 className="mb-2 font-display text-2xl text-gold-hi">{t.title}</h3>
            <p className="text-lg text-muted">{t.copy}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-8 text-center">
          <p className="kicker mb-2">Edition 01 · Glass</p>
          <h2 className="gold-text font-display text-3xl md:text-4xl">Self-cleaning window coating</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Hydrophobic nano-coating creates a microscopic barrier. Water beads, lifts dirt, and
            rolls away. Cleaner longer. Less maintenance. Extended asset life.
          </p>
        </div>
        <BeforeAfter />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="metal-panel rounded-xl p-6">
            <h3 className="mb-3 font-display text-xl text-purple-glow">How it works</h3>
            <ol className="grid grid-cols-2 gap-3">
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
          <Film
            src="/media/film-facade.mp4"
            poster="/media/commercial-glass.jpg"
            caption="Rain on specified glass."
            className="aspect-video"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="kicker">The collection</p>
            <h2 className="gold-text font-display text-3xl">Specified systems</h2>
          </div>
          <Link to="/solutions" className="text-xs font-bold uppercase tracking-widest text-gold">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link key={s.id} to="/solutions" className="group chrome-rim overflow-hidden rounded-xl">
              <article className="overflow-hidden rounded-[14px] bg-carbon-2">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-aqua">{s.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{s.copy}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <ChromePlate>
          <div className="p-6 md:p-10">
            <ChromeIndex />
          </div>
        </ChromePlate>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <p className="kicker mb-2 text-center">
          Pearl · QA-FORM-001
        </p>
        <h2 className="gold-text mb-6 text-center font-display text-3xl">Five-test field checklist</h2>
        <FieldChecklist documentLook />
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl px-5 pb-20">
        <img
          src="/media/estate-night.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative metal-panel rounded-2xl p-8 md:p-12">
          <p className="kicker">Core QA · 5-step data test set™</p>
          <h2 className="gold-text mt-2 font-display text-3xl">Every application is proven</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {QA_TESTS.map((t) => (
              <div key={t.n} className="rounded-xl border border-border bg-carbon/50 p-4 text-center">
                <ChromeShield tone={t.tone} className="mx-auto mb-2 h-14 w-12" />
                <p className="font-display text-2xl text-gold">{t.n}</p>
                <p className="mt-1 text-sm font-semibold">{t.name}</p>
                <p className="mt-1 text-base text-muted">{t.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h3 className="mb-4 font-display text-xl text-gold-hi">Proven 7-step process</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PROCESS.map((p, i) => (
                <div key={p.code} className="flex items-center gap-2">
                  <div className="w-24 rounded-lg border border-border bg-carbon/60 p-3 text-center">
                    <p className="text-xs font-bold text-gold">{p.code}</p>
                    <p className="mt-1 text-base leading-tight text-muted">{p.name}</p>
                  </div>
                  {i < PROCESS.length - 1 ? <span className="hidden text-gold md:inline">→</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-20 md:grid-cols-2">
        <img
          src="/media/application.jpg"
          alt="NanoAssure field application on commercial glass"
          className="rounded-xl border border-chrome/25 object-cover shadow-[0_24px_60px_rgba(0,0,0,.45)]"
        />
        <div>
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
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <p className="kicker mb-4">Atelier film</p>
        <div className="mb-3 grid gap-3 md:grid-cols-2">
          <Film src="/media/film-house.mp4" poster="/media/residence-night.jpg" caption="Golden hour on glass." className="aspect-video" />
          <Film src="/media/film-rain-glass.mp4" poster="/media/beads-macro.jpg" caption="Rain. Chrome beads." className="aspect-video" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
          ].map(([src, cap]) => (
            <figure key={src} className="overflow-hidden rounded-xl border border-chrome/20">
              <img src={src} alt={cap} className="aspect-4/3 h-full w-full object-cover" />
            </figure>
          ))}
        </div>
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

