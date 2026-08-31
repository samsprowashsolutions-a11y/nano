import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { SEED_VACANCIES } from "@/lib/content";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/careers")({ component: Careers });

function Careers() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="kicker">Workforce</p>
        <h1 className="gold-text mt-2 font-display text-4xl">Join the atelier</h1>
        <p className="mt-4 text-muted">
          NanoAssure crews apply specified chemistry across Darwin government, education and
          commercial sites. White Card is mandatory. We train the rest.
        </p>
        <div className="mt-10 space-y-4">
          {SEED_VACANCIES.filter((v) => v.status === "Public").map((v) => (
            <article key={v.id} className="metal-panel rounded-xl p-6">
              <p className="text-xs uppercase tracking-widest text-aqua">{v.type} · {v.location}</p>
              <h2 className="mt-1 font-display text-2xl text-gold-hi">{v.title}</h2>
              <p className="mt-2 text-sm text-muted">{v.openings} opening{v.openings > 1 ? "s" : ""}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Applications: <a className="text-aqua" href="mailto:analysis@nanoassure.net">analysis@nanoassure.net</a> with subject line Career.
        </p>
        <Button asChild className="mt-6" variant="ghost">
          <Link to="/about">Back to maison</Link>
        </Button>
      </section>
    </SiteShell>
  );
}
