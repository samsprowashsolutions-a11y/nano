import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Film } from "@/components/site/film";
import { PRODUCTS, SOLUTIONS, assuranceFor, QA_TESTS, productMethod } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ChromeShield } from "@/components/chrome-shield";

export const Route = createFileRoute("/solutions")({ component: Solutions });

function Solutions() {
  return (
    <SiteShell>
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <img src="/media/commercial-glass.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-carbon/40 via-carbon/55 to-carbon" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-20">
          <div>
            <p className="kicker">Specified systems</p>
            <h1 className="gold-text mt-2 font-display text-4xl md:text-6xl">The collection</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Premium nano-coating systems for glass, masonry, chrome, fabric, mould and
              anti-graffiti protection — always applied to manufacturer TDS and proven by
              NanoAssure QA7™.
            </p>
          </div>
        </div>
      </section>

      {SOLUTIONS.map((s, i) => (
        <article key={s.id} className="relative min-h-[85vh] w-full overflow-hidden">
          <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
          <div
            className={`absolute inset-0 bg-linear-to-r from-carbon via-carbon/70 to-transparent ${i % 2 ? "md:bg-linear-to-l" : ""}`}
          />
          <div className={`relative mx-auto flex min-h-[85vh] max-w-6xl items-center px-5 py-20 ${i % 2 ? "md:justify-end" : ""}`}>
            <div className="max-w-lg">
              <p className="kicker text-gold">
                {String(i + 1).padStart(2, "0")} / {String(SOLUTIONS.length).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-4xl text-gold-hi md:text-5xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-pearl">{s.copy}</p>
            </div>
          </div>
        </article>
      ))}

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="gold-text mb-6 font-display text-3xl">Chemistry on file</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border border-chrome/20 bg-carbon-2">
              <img src={p.image} alt={p.name} className="aspect-video w-full object-cover" />
              <div className="p-5">
                <h3 className="font-display text-lg text-gold-hi">{p.name}</h3>
                {(() => {
                  const a = assuranceFor(p.id);
                  if (!a) return null;
                  const tests = QA_TESTS.filter((t) => a.tests.includes(t.key));
                  return (
                    <>
                      <p className="font-mono text-xs text-neon">{a.mark}</p>
                      <p className="font-display text-xl text-gold">{a.name}</p>
                      <p className="mt-2 text-sm text-pearl">{a.science}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {tests.map((t) => (
                          <span key={t.key} className="inline-flex items-center gap-1 rounded-full border border-chrome/20 px-2 py-0.5">
                            <ChromeShield tone={t.tone} className="h-5 w-4" />
                            <span className="text-xs text-gold-hi">{t.name}</span>
                          </span>
                        ))}
                      </div>
                    </>
                  );
                })()}
                <p className="mt-2 text-sm text-aqua">{p.tds}</p>
                {productMethod(p) ? (
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-pearl">
                    {productMethod(p)!.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                ) : null}
                <p className="mt-2 text-base text-muted">{p.substrate}</p>
                <p className="mt-1 text-sm text-muted">
                  {p.coats} · {p.coverage}
                  {p.apas ? ` · ${p.apas}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Film
        bleed
        src="/media/film-facade.mp4"
        poster="/media/facade-dusk.jpg"
        caption="Specified glass at dusk."
        className="aspect-[21/9] min-h-[280px] md:min-h-[520px]"
      />
      <div className="py-16 text-center">
        <Button asChild>
          <Link to="/analysis">Request analysis</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
