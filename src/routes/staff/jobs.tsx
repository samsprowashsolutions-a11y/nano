import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { PRODUCTS } from "@/lib/content";
import { platformSnapshot, saveJob, setAllClear, setJobStatus } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/jobs")({ component: JobsDesk });

function JobsDesk() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const [msg, setMsg] = useState("");

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await saveJob({
      data: {
        clientName: String(fd.get("clientName") || ""),
        site: String(fd.get("site") || ""),
        product: String(fd.get("product") || "") || undefined,
        scope: String(fd.get("scope") || "") || undefined,
        price: String(fd.get("price") || "") || undefined,
        crew: String(fd.get("crew") || "") || undefined,
        scheduledOn: String(fd.get("scheduledOn") || "") || undefined,
        notes: String(fd.get("notes") || "") || undefined,
      },
    });
    setMsg(res.status === "hold" ? "Compliance gate: no TDS on register. Job is on HOLD." : `Job ${res.id} open.`);
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker">Operations Command</p>
        <h1 className="gold-text font-display text-3xl md:text-4xl">Jobs · OPPS ALL CLEAR</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Scope, price, crew, schedule. GPS hours sit on the{" "}
          <Link to="/staff/gps" className="text-gold-hi underline">
            GPS log
          </Link>
          . Handover does not print until OPPS ALL CLEAR.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Live jobs", q.data?.counts.liveJobs ?? "—"],
          ["On hold", q.data?.jobs.filter((j) => j.status === "hold").length ?? "—"],
          ["OPPS ALL CLEAR", q.data?.jobs.filter((j) => j.all_clear).length ?? "—"],
          ["Alerts", q.data?.counts.alerts ?? "—"],
        ].map(([l, v]) => (
          <div key={l} className="kpi-chip p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a6a18]">{l}</p>
            <p className="font-display text-4xl text-[#2a241c]">{v}</p>
          </div>
        ))}
      </div>

      <section className="portal-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Open a job</h2>
        <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onSave(e)}>
          <div>
            <Label htmlFor="clientName">Client</Label>
            <Input id="clientName" name="clientName" required />
          </div>
          <div>
            <Label htmlFor="site">Site</Label>
            <Input id="site" name="site" required />
          </div>
          <div>
            <Label htmlFor="product">Product</Label>
            <select id="product" name="product" className="h-12 w-full rounded-xl border border-chrome/20 bg-white px-4">
              <option value="">Select</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="crew">Crew</Label>
            <Input id="crew" name="crew" placeholder="Kate · field" />
          </div>
          <div>
            <Label htmlFor="price">Price (ex GST)</Label>
            <Input id="price" name="price" placeholder="0.00" />
          </div>
          <div>
            <Label htmlFor="scheduledOn">Scheduled</Label>
            <Input id="scheduledOn" name="scheduledOn" type="date" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="scope">Scope</Label>
            <Textarea id="scope" name="scope" rows={3} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Open job</Button>
            {msg ? <span className="ml-3 text-sm text-[#8a6a18]">{msg}</span> : null}
          </div>
        </form>
      </section>

      <section className="portal-card overflow-x-auto p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Board</h2>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#8a6a18]">
            <tr>
              <th className="pb-2">Client</th>
              <th className="pb-2">Site</th>
              <th className="pb-2">Crew</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">OPPS ALL CLEAR</th>
            </tr>
          </thead>
          <tbody>
            {(q.data?.jobs ?? []).map((j) => (
              <tr key={j.id} className="border-t border-gold/20">
                <td className="py-2">{j.client_name}</td>
                <td>{j.site}</td>
                <td>{j.crew ?? "—"}</td>
                <td>
                  <select
                    className="rounded-lg border border-gold/30 bg-white px-2 py-1"
                    value={j.status}
                    onChange={(e) =>
                      void setJobStatus({ data: { id: j.id, status: e.target.value as "open" | "live" | "hold" | "all_clear" | "complete" } }).then(
                        () => q.refetch(),
                      )
                    }
                  >
                    {["open", "live", "hold", "all_clear", "complete"].map((s) => (
                      <option key={s} value={s}>
                        {s === "all_clear" ? "OPPS ALL CLEAR" : s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {j.all_clear ? (
                    <span className="text-ok">OPPS · {j.all_clear_by}</span>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => void setAllClear({ data: { id: j.id, by: "OPPS" } }).then(() => q.refetch())}
                    >
                      OPPS ALL CLEAR
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
