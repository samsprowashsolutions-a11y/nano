import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Film } from "@/components/site/film";
import { SOLUTIONS } from "@/lib/content";

export const Route = createFileRoute("/solutions")({ component: Solutions });

function Solutions() {
  return (
    <SiteShell>
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <img src="/media/commercial-glass.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-b from-carbon/40 via-carbon/55 to-carbon" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-20">
          <div>
            <p className="kicker">What we coat</p>
            <h1 className="gold-text mt-2 font-display text-4xl md:text-6xl">Surfaces</h1>
            <p className="mt-4 max-w-xl text-lg text-pearl">
              Glass, stone, metal, graffiti, fabric and wet areas. We apply the coating. You never do it yourself.
            </p>
          </div>
        </div>
      </section>

      {SOLUTIONS.map((s, i) => (
        <article key={s.id} id={s.id} className="surface-panel relative min-h-[85vh] w-full scroll-mt-24 overflow-hidden">
          <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div
            className={`absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/15 ${i % 2 ? "md:bg-linear-to-l" : ""}`}
          />
          <div className={`relative mx-auto flex min-h-[85vh] max-w-6xl items-center px-5 py-20 ${i % 2 ? "md:justify-end" : ""}`}>
            <div className="max-w-lg">
              <p className="kicker chrome-metal">
                {String(i + 1).padStart(2, "0")} / {String(SOLUTIONS.length).padStart(2, "0")}
              </p>
              <h2 className="gold-foil mt-2 font-display text-4xl md:text-5xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed">{s.copy}</p>
            </div>
          </div>
        </article>
      ))}

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="glass-panel p-8 text-center">
          <h2 className="font-display text-3xl text-gold-hi">Not sure which surface?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-pearl">
            Send photos. We tell you which system fits. No public prices.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/analysis" className="glass-btn glass-btn-gold">
              Express interest
            </Link>
            <Link to="/assurance" className="glass-btn">
              See how we prove it
            </Link>
          </div>
        </div>
      </section>

      <Film
        bleed
        src="/media/film-facade.mp4"
        poster="/media/facade-dusk.jpg"
        caption="Specified glass at dusk"
        className="aspect-[21/9] min-h-[280px] md:min-h-[520px]"
      />
      <div className="py-16 text-center">
        <Link to="/analysis" className="glass-btn glass-btn-gold">
          Express interest
        </Link>
      </div>
    </SiteShell>
  );
}
