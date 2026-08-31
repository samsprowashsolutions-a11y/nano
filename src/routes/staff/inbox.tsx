import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listAnalysis, updateLeadStatus } from "@/lib/server/leads";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/staff/inbox")({ component: Inbox });

function Inbox() {
  const q = useQuery({ queryKey: ["leads"], queryFn: () => listAnalysis() });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gold · Concierge</p>
        <h1 className="gold-text font-display text-3xl">Analysis inbox</h1>
        <p className="text-sm text-muted">Private requests from the public maison. No public pricing.</p>
      </header>
      <div className="space-y-3">
        {(q.data ?? []).map((l) => (
          <article key={l.id} className="metal-panel rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl text-gold-hi">{l.organisation}</p>
                <p className="text-sm text-muted">
                  {l.contact_name} · {l.email} · {l.phone || "no phone"} · {l.sector}
                </p>
                {l.notes ? <p className="mt-2 text-sm">{l.notes}</p> : null}
                <p className="mt-1 text-sm uppercase tracking-widest text-muted">{l.created_at}</p>
              </div>
              <div className="flex gap-2">
                {(["review", "quoted", "closed"] as const).map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={l.status === s ? "gold" : "ghost"}
                    onClick={async () => {
                      await updateLeadStatus({ data: { id: l.id, status: s } });
                      void q.refetch();
                    }}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-aqua">Status: {l.status}</p>
          </article>
        ))}
        {q.data?.length === 0 ? (
          <p className="metal-panel rounded-xl p-8 text-center text-muted">Inbox is clear.</p>
        ) : null}
      </div>
    </div>
  );
}
