import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { issueVerify, listVerify } from "@/lib/server/leads";
import { PRODUCTS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/staff/verify")({ component: Verify });

function Verify() {
  const list = useQuery({ queryKey: ["verify"], queryFn: () => listVerify() });
  const [issued, setIssued] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await issueVerify({
      data: {
        clientName: String(fd.get("client") || ""),
        site: String(fd.get("site") || ""),
        product: String(fd.get("product") || ""),
      },
    });
    setIssued(res.verifyId);
    e.currentTarget.reset();
    void list.refetch();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="kicker">Gold · Strategic</p>
        <h1 className="gold-text font-display text-3xl">NanoAssure Verify</h1>
        <p className="text-sm text-muted">IDs format NA-YYYYMMDD-XXXX. Issued only after gates pass.</p>
      </header>
      <form onSubmit={onSubmit} className="metal-panel grid gap-4 rounded-xl p-5 md:grid-cols-2">
        <div>
          <Label htmlFor="client">Client / principal</Label>
          <Input id="client" name="client" required />
        </div>
        <div>
          <Label htmlFor="site">Site</Label>
          <Input id="site" name="site" required />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="product">Product</Label>
          <select id="product" name="product" className="h-11 w-full rounded-md border border-aqua/30 bg-carbon-2 px-3 text-sm" required>
            {PRODUCTS.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Issue certificate</Button>
          {issued ? <p className="mt-3 font-mono text-aqua">{issued}</p> : null}
        </div>
      </form>
      <section className="metal-panel rounded-xl p-5">
        <h2 className="mb-3 font-display text-lg text-gold-hi">Register</h2>
        <div className="space-y-2 text-sm">
          {(list.data ?? []).map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 py-2">
              <span className="font-mono text-aqua">{r.verify_id}</span>
              <span>{r.client_name}</span>
              <span className="text-muted">{r.site}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
