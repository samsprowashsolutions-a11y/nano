import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { platformSnapshot } from "@/lib/server/platform";
import { commandSnapshot } from "@/lib/server/atelier";

export const Route = createFileRoute("/staff/analytics")({ component: AnalyticsDesk });

function Bar({ label, n, max }: { label: string; n: number; max: number }) {
  const w = max ? Math.max(8, Math.round((n / max) * 100)) : 8;
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-semibold">{n}</span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-[#efe6d4]">
        <div className="h-full rounded-full bg-linear-to-r from-gold to-purple" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

function AnalyticsDesk() {
  const plat = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const cmd = useQuery({ queryKey: ["command"], queryFn: () => commandSnapshot() });
  const c = plat.data?.counts;
  const k = cmd.data?.counts;
  const rows = [
    ["Jobs", c?.jobs ?? 0],
    ["Live jobs", c?.liveJobs ?? 0],
    ["QA jobs", k?.jobs ?? 0],
    ["Field tests", k?.tests ?? 0],
    ["Warranties", k?.warranties ?? 0],
    ["Vault items", k?.vault ?? 0],
    ["Inbox", k?.leads ?? 0],
    ["Pre-starts", c?.prestarts ?? 0],
    ["Academy", c?.academy ?? 0],
    ["TDS/SDS", c?.tds ?? 0],
    ["Approvals pending", c?.pending ?? 0],
    ["Alerts", c?.alerts ?? 0],
  ] as const;
  const max = Math.max(1, ...rows.map(([, n]) => n));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker">Gold · outcomes</p>
        <h1 className="gold-text font-display text-3xl">Analytics</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Live counts from jobs, QA, vault, inbox and compliance. Daily narrative stays on{" "}
          <Link to="/staff/report" className="text-gold-hi underline">
            Ops daily
          </Link>
          .
        </p>
      </header>
      <section className="portal-card space-y-4 p-5">
        {rows.map(([l, n]) => (
          <Bar key={l} label={l} n={n} max={max} />
        ))}
      </section>
    </div>
  );
}
