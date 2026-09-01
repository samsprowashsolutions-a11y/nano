import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS, QA_TESTS, assuranceFor } from "@/lib/content";
import { ChromePlate, ChromeShield } from "@/components/chrome-shield";
import { Qa7Drop } from "@/components/qa/qa7";

export const Route = createFileRoute("/staff/products")({ component: Products });

function Products() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex items-center gap-4">
        <Qa7Drop className="h-24 w-auto" />
        <div>
          <p className="kicker">Purple · Reference</p>
          <h1 className="gold-text font-display text-3xl">Chemistry library</h1>
          <p className="text-sm text-muted">
            Each system carries a named NanoAssure QA7™ bond. NANODATA Collection™ is the science.
          </p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {PRODUCTS.map((p) => {
          const a = assuranceFor(p.id);
          const tests = QA_TESTS.filter((t) => a?.tests.includes(t.key));
          return (
            <ChromePlate key={p.id}>
              <article className="overflow-hidden">
                <img src={p.image} alt={p.name} className="aspect-video w-full object-cover" />
                <div className="p-5">
                  <h2 className="font-display text-xl text-gold-hi">{p.name}</h2>
                  {a ? (
                    <>
                      <p className="font-mono text-xs text-neon">{a.mark}</p>
                      <p className="font-display text-lg text-gold">{a.name}</p>
                      <p className="mt-2 text-sm text-muted">{a.science}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {tests.map((t) => (
                          <span key={t.key} className="inline-flex items-center gap-1 rounded-full border border-gold/25 px-2 py-0.5">
                            <ChromeShield tone={t.tone} className="h-5 w-4" />
                            <span className="text-xs">{t.name}</span>
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                  <p className="mt-2 text-xs text-aqua">{p.tds}</p>
                  <dl className="mt-3 space-y-1 text-sm text-muted">
                    <div>
                      <dt className="inline text-pearl">Substrate: </dt>
                      <dd className="inline">{p.substrate}</dd>
                    </div>
                    <div>
                      <dt className="inline text-pearl">Coats: </dt>
                      <dd className="inline">{p.coats}</dd>
                    </div>
                    <div>
                      <dt className="inline text-pearl">Coverage: </dt>
                      <dd className="inline">{p.coverage}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-pearl/80">{p.certNote}</p>
                </div>
              </article>
            </ChromePlate>
          );
        })}
      </div>
    </div>
  );
}
