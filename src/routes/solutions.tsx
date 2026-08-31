import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Film } from "@/components/site/film";
import { PRODUCTS, SOLUTIONS } from "@/lib/content";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/solutions")({ component: Solutions });

function Solutions() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <img src="/media/commercial-glass.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-linear-to-b from-carbon/50 to-carbon" />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <p className="kicker">Specified systems</p>
          <h1 className="gold-text mt-2 font-display text-4xl md:text-6xl">The collection</h1>
          <p className="mt-4 max-w-xl text-muted">
            Premium nano-coating systems for glass, masonry, metal, antimicrobial and anti-graffiti protection — always applied to manufacturer TDS and proven by NanoAssure™ gates.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-16 px-5 pb-20">
        {SOLUTIONS.map((s, i) => (
          <article key={s.id} className="grid items-center gap-8 md:grid-cols-2">
            <img
              src={s.image}
              alt={s.title}
              className={`rounded-xl border border-chrome/20 object-cover ${i % 2 ? "md:order-2" : ""}`}
            />
            <div>
              <p className="kicker text-gold">0{i + 1} / 06</p>
              <h2 className="mt-2 font-display text-3xl text-aqua">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.copy}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="gold-text mb-6 font-display text-3xl">Chemistry on file</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="metal-panel rounded-xl p-5">
              <h3 className="font-display text-lg text-gold-hi">{p.name}</h3>
              <p className="mt-1 text-xs text-aqua">{p.tds}</p>
              <p className="mt-2 text-sm text-muted">{p.substrate}</p>
              <p className="mt-1 text-xs text-muted">
                {p.coats} · {p.coverage}
                {p.apas ? ` · ${p.apas}` : ""}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <Film src="/media/film-rain-glass.mp4" poster="/media/commercial-glass.jpg" caption="Specified glass. Proven sheeting." className="aspect-video" />
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/analysis">Request analysis</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
