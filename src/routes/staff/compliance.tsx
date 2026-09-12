import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { PRODUCTS } from "@/lib/content";
import { platformSnapshot, saveTds } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/staff/compliance")({ component: ComplianceDesk });

function ComplianceDesk() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const [msg, setMsg] = useState("");

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveTds({
      data: {
        product: String(fd.get("product") || ""),
        kind: String(fd.get("kind") || "TDS") as "TDS" | "SDS",
        version: String(fd.get("version") || ""),
        issuedOn: String(fd.get("issuedOn") || "") || undefined,
        expiresOn: String(fd.get("expiresOn") || "") || undefined,
      },
    });
    setMsg("Register updated. Jobs without a current TDS stay on hold.");
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker">Controlled library</p>
        <h1 className="gold-text font-display text-3xl">TDS / SDS · Compliance gate</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Manufacturer source of truth. A job cannot leave HOLD without a TDS on this register.{" "}
          <Link to="/staff/whs" className="text-gold-hi underline">
            WHS / SWMS
          </Link>
          .
        </p>
      </header>

      {(q.data?.alerts.missingTds.length ?? 0) > 0 ? (
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm">
          Gate live: {q.data?.alerts.missingTds.join(" · ")}
        </p>
      ) : (
        <p className="rounded-xl border border-ok/30 bg-ok/10 px-4 py-3 text-sm">No jobs blocked for missing TDS.</p>
      )}

      <section className="portal-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Add version</h2>
        <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onSave(e)}>
          <div>
            <Label htmlFor="product">Product</Label>
            <select id="product" name="product" className="h-12 w-full rounded-xl border px-4" required>
              {PRODUCTS.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="kind">Kind</Label>
            <select id="kind" name="kind" className="h-12 w-full rounded-xl border px-4">
              <option>TDS</option>
              <option>SDS</option>
            </select>
          </div>
          <div>
            <Label htmlFor="version">Version</Label>
            <Input id="version" name="version" required placeholder="TDS-03a v0.2" />
          </div>
          <div>
            <Label htmlFor="expiresOn">Expires</Label>
            <Input id="expiresOn" name="expiresOn" type="date" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">File on register</Button>
            {msg ? <span className="ml-3 text-sm">{msg}</span> : null}
          </div>
        </form>
      </section>

      <section className="portal-card overflow-x-auto p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Register</h2>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#8a6a18]">
            <tr>
              <th className="pb-2">Product</th>
              <th className="pb-2">Kind</th>
              <th className="pb-2">Version</th>
              <th className="pb-2">Expires</th>
            </tr>
          </thead>
          <tbody>
            {(q.data?.tds ?? []).map((t) => (
              <tr key={t.id} className="border-t border-gold/20">
                <td className="py-2">{t.product}</td>
                <td>{t.kind}</td>
                <td>{t.version}</td>
                <td>{t.expires_on ?? "current"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
