import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent } from "react";
import { decideApproval, platformSnapshot, saveApproval } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/staff/alerts")({ component: AlertsDesk });

function AlertsDesk() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveApproval({
      data: {
        subject: String(fd.get("subject") || ""),
        stage: String(fd.get("stage") || "operations") as "technician" | "supervisor" | "operations" | "director",
        notes: String(fd.get("notes") || "") || undefined,
      },
    });
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker">Sign-off · log</p>
        <h1 className="gold-text font-display text-3xl">Alerts · Approvals · Audit</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Expiry, missing TDS, failed QA, outstanding approvals. Technician → supervisor → operations → director.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Expiries", q.data?.alerts.expiring.length ?? 0],
          ["Pending", q.data?.counts.pending ?? 0],
          ["Missing TDS", q.data?.alerts.missingTds.length ?? 0],
          ["Hold / fail", q.data?.alerts.failedQa.length ?? 0],
        ].map(([l, v]) => (
          <div key={String(l)} className="kpi-chip p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a6a18]">{l}</p>
            <p className="font-display text-4xl text-[#2a241c]">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="portal-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Expiry & holds</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {(q.data?.alerts.expiring ?? []).map((a) => (
              <li key={a} className="rounded-lg border border-gold/30 px-3 py-2">
                {a}
              </li>
            ))}
            {(q.data?.alerts.missingTds ?? []).map((a) => (
              <li key={a} className="rounded-lg border border-gold/30 px-3 py-2">
                Missing TDS · {a}
              </li>
            ))}
            {(q.data?.alerts.failedQa ?? []).map((a) => (
              <li key={a} className="rounded-lg border border-gold/30 px-3 py-2">
                Hold · {a}
              </li>
            ))}
            {!q.data?.counts.alerts ? <li className="text-[#5c564c]">Clear.</li> : null}
          </ul>
        </section>

        <section className="portal-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Open an approval</h2>
          <form className="mt-3 grid gap-3" onSubmit={(e) => void onSave(e)}>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" required />
            </div>
            <div>
              <Label htmlFor="stage">Stage</Label>
              <select id="stage" name="stage" className="h-12 w-full rounded-xl border px-4">
                <option value="technician">Technician</option>
                <option value="supervisor">Supervisor</option>
                <option value="operations">Operations</option>
                <option value="director">Director</option>
              </select>
            </div>
            <Button type="submit">Queue</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm">
            {(q.data?.approvals ?? []).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-2 rounded-lg border border-gold/20 px-3 py-2">
                <span>
                  {a.subject} · {a.stage} · {a.status}
                </span>
                {a.status === "pending" ? (
                  <span className="flex gap-1">
                    <Button type="button" size="sm" onClick={() => void decideApproval({ data: { id: a.id, status: "approved" } }).then(() => q.refetch())}>
                      Approve
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => void decideApproval({ data: { id: a.id, status: "held" } }).then(() => q.refetch())}>
                      Hold
                    </Button>
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="portal-card overflow-x-auto p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Audit trail</h2>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#8a6a18]">
            <tr>
              <th className="pb-2">When</th>
              <th className="pb-2">Module</th>
              <th className="pb-2">Action</th>
              <th className="pb-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {(q.data?.audit ?? []).map((e) => (
              <tr key={e.id} className="border-t border-gold/20">
                <td className="py-2">{new Date(e.created_at).toLocaleString("en-AU", { timeZone: "Australia/Darwin" })}</td>
                <td>{e.module}</td>
                <td>{e.action}</td>
                <td>{e.detail ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
