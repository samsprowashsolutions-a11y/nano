import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { listClientDocs, listClients, listWarranties, saveWarranty } from "@/lib/server/atelier";
import { PRODUCTS } from "@/lib/content";
import { DeskCard, DeskHeader } from "@/components/staff/desk";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/warranty")({ component: Warranty });

function Warranty() {
  const clients = useQuery({ queryKey: ["clients"], queryFn: () => listClients() });
  const list = useQuery({ queryKey: ["warranties"], queryFn: () => listWarranties() });
  const [clientId, setClientId] = useState<number | "">("");
  const docs = useQuery({
    queryKey: ["client-docs", clientId],
    queryFn: () => listClientDocs({ data: { clientId: Number(clientId) } }),
    enabled: clientId !== "",
  });
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const docVal = String(fd.get("documentId") || "");
    await saveWarranty({
      data: {
        clientId: Number(fd.get("clientId")),
        product: String(fd.get("product") || ""),
        verifyId: String(fd.get("verifyId") || "") || undefined,
        startsOn: String(fd.get("startsOn") || ""),
        endsOn: String(fd.get("endsOn") || ""),
        terms: String(fd.get("terms") || "") || undefined,
        documentId: docVal ? Number(docVal) : undefined,
      },
    });
    setMsg("Warranty hooked to the client profile.");
    e.currentTarget.reset();
    void list.refetch();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <DeskHeader
        kicker="Gold · Aftercare"
        title="Warranty desk"
        script="Hooked to the profile."
        copy="A warranty is not a PDF in a drawer. It lives on the client profile, with the analysis report and the NanoAssure™ verify ID."
      />
      <DeskCard>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="clientId">Client profile</Label>
            <Select
              id="clientId"
              name="clientId"
              required
              value={String(clientId)}
              onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : "")}
            >
              <option value="">Select profile</option>
              {(clients.data ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="product">System</Label>
            <Select id="product" name="product" required>
              {PRODUCTS.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="verifyId">Verify ID</Label>
            <Input id="verifyId" name="verifyId" placeholder="NA-YYYYMMDD-XXXX" />
          </div>
          <div>
            <Label htmlFor="documentId">Profile document</Label>
            <Select id="documentId" name="documentId">
              <option value="">None yet</option>
              {(docs.data ?? []).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.kind} · {d.title}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="startsOn">Starts</Label>
            <Input id="startsOn" name="startsOn" type="date" required />
          </div>
          <div>
            <Label htmlFor="endsOn">Ends</Label>
            <Input id="endsOn" name="endsOn" type="date" required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="terms">Terms</Label>
            <Textarea id="terms" name="terms" placeholder="Coverage, exclusions, inspection window." />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Issue warranty</Button>
            {msg ? <p className="mt-2 text-sm text-aqua">{msg}</p> : null}
          </div>
        </form>
      </DeskCard>
      <section className="space-y-3">
        {(list.data ?? []).map((w) => (
          <article key={w.id} className="metal-panel rounded-xl p-5">
            <p className="font-display text-2xl text-gold-hi">{w.client_name}</p>
            <p className="text-pearl">{w.product}</p>
            <p className="mt-1 font-mono text-sm text-aqua">{w.verify_id || "No verify ID yet"}</p>
            <p className="text-sm text-muted">
              {w.starts_on} → {w.ends_on} · {w.status}
              {w.document_id ? ` · document #${w.document_id}` : ""}
            </p>
            {w.terms ? <p className="mt-2 text-sm text-muted">{w.terms}</p> : null}
          </article>
        ))}
      </section>
    </div>
  );
}
