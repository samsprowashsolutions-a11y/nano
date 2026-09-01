import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { listClientDocs, listClients, saveClient, saveClientDoc } from "@/lib/server/atelier";
import { DeskCard, DeskHeader, fileToDataUrl } from "@/components/staff/desk";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/clients")({ component: Clients });

function Clients() {
  const clients = useQuery({ queryKey: ["clients"], queryFn: () => listClients() });
  const [active, setActive] = useState<number | null>(null);
  const docs = useQuery({
    queryKey: ["client-docs", active],
    queryFn: () => listClientDocs({ data: { clientId: active! } }),
    enabled: active != null,
  });
  const [msg, setMsg] = useState("");

  async function onClient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await saveClient({
      data: {
        name: String(fd.get("name") || ""),
        organisation: String(fd.get("organisation") || "") || undefined,
        email: String(fd.get("email") || "") || undefined,
        phone: String(fd.get("phone") || "") || undefined,
        sector: String(fd.get("sector") || "") || undefined,
        notes: String(fd.get("notes") || "") || undefined,
      },
    });
    setActive(res.id);
    setMsg("Client profile opened.");
    e.currentTarget.reset();
    void clients.refetch();
  }

  async function onDoc(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (active == null) return;
    const fd = new FormData(e.currentTarget);
    const file = (e.currentTarget.elements.namedItem("file") as HTMLInputElement).files?.[0];
    const packed = file ? await fileToDataUrl(file) : undefined;
    await saveClientDoc({
      data: {
        clientId: active,
        title: String(fd.get("title") || ""),
        kind: String(fd.get("kind") || "file"),
        fileName: packed?.name,
        fileData: packed?.data,
      },
    });
    e.currentTarget.reset();
    void docs.refetch();
  }

  const current = clients.data?.find((c) => c.id === active);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <DeskHeader
        kicker="Teal · Profiles"
        title="Client atelier"
        script="The house book."
        copy="Each client profile holds documents, warranties and verify IDs. The warranty desk hooks into these files."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <DeskCard>
          <h2 className="mb-4 font-display text-xl text-gold-hi">Open a profile</h2>
          <form onSubmit={onClient} className="space-y-3">
            <div>
              <Label htmlFor="name">Client / principal</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="organisation">Organisation</Label>
              <Input id="organisation" name="organisation" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" />
            </div>
            <div>
              <Label htmlFor="sector">Sector</Label>
              <Input id="sector" name="sector" placeholder="Civic / commercial / body corporate" />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" />
            </div>
            <Button type="submit">Save profile</Button>
            {msg ? <p className="text-sm text-aqua">{msg}</p> : null}
          </form>
        </DeskCard>
        <div className="space-y-3">
          {(clients.data ?? []).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={`metal-panel w-full rounded-xl p-4 text-left ${active === c.id ? "border-gold/50" : ""}`}
            >
              <p className="font-display text-xl text-gold-hi">{c.name}</p>
              <p className="text-sm text-muted">{c.organisation || "Private"} · {c.sector || "—"}</p>
            </button>
          ))}
        </div>
      </div>

      {current ? (
        <DeskCard>
          <h2 className="font-display text-2xl text-gold-hi">{current.name}</h2>
          <p className="text-muted">{current.email} · {current.phone}</p>
          <form onSubmit={onDoc} className="mt-6 grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Document title</Label>
              <Input id="title" name="title" required />
            </div>
            <div>
              <Label htmlFor="kind">Kind</Label>
              <Select id="kind" name="kind">
                <option value="warranty">Warranty</option>
                <option value="report">Analysis report</option>
                <option value="tds">TDS / specification</option>
                <option value="cert">Verify certificate</option>
                <option value="file">Other</option>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="file">Attach to this profile</Label>
              <Input id="file" name="file" type="file" />
            </div>
            <Button type="submit">Hook document</Button>
          </form>
          <div className="mt-6 space-y-2">
            {(docs.data ?? []).map((d) => (
              <p key={d.id} className="rounded-lg border border-border p-3 text-sm">
                <span className="uppercase tracking-wider text-aqua">{d.kind}</span>
                <span className="ml-2 text-pearl">{d.title}</span>
                {d.file_name ? <span className="ml-2 text-muted">{d.file_name}</span> : null}
              </p>
            ))}
          </div>
        </DeskCard>
      ) : null}
    </div>
  );
}
