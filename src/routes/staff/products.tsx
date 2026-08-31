import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/content";
import { ChromePlate } from "@/components/chrome-shield";

export const Route = createFileRoute("/staff/products")({ component: Products });

function Products() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Purple · Reference</p>
        <h1 className="gold-text font-display text-3xl">Chemistry library</h1>
        <p className="text-sm text-muted">
          Source of truth: Nanoman TDS & SDS. SP brands assurance only. Cross-checked 22 Aug 2026.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {PRODUCTS.map((p) => (
          <ChromePlate key={p.id}>
            <article className="p-5">
              <h2 className="font-display text-xl text-gold-hi">{p.name}</h2>
              <p className="text-xs text-aqua">{p.tds}</p>
              <p className="text-sm text-muted">{p.sds}</p>
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
                <div>
                  <dt className="inline text-pearl">Environment: </dt>
                  <dd className="inline">{p.env}</dd>
                </div>
                <div>
                  <dt className="inline text-pearl">Dry / cure: </dt>
                  <dd className="inline">{p.dryTimes}</dd>
                </div>
                {p.apas ? (
                  <div>
                    <dt className="inline text-pearl">APAS: </dt>
                    <dd className="inline text-gold">{p.apas}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-pearl/80">{p.certNote}</p>
            </article>
          </ChromePlate>
        ))}
      </div>
    </div>
  );
}
