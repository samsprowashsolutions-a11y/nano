import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { listVault, saveVaultItem } from "@/lib/server/atelier";
import { DeskCard, FOLDERS, fileToDataUrl } from "@/components/staff/desk";
import { ChromeShield } from "@/components/chrome-shield";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/vault")({ component: Vault });

function Vault() {
  const [folder, setFolder] = useState<(typeof FOLDERS)[number]["id"]>("tax");
  const items = useQuery({
    queryKey: ["vault", folder],
    queryFn: () => listVault({ data: { folder } }),
  });
  const [msg, setMsg] = useState("");
  const [scan, setScan] = useState<{ name: string; data: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveVaultItem({
      data: {
        folder,
        title: String(fd.get("title") || ""),
        period: String(fd.get("period") || "") || undefined,
        amount: String(fd.get("amount") || "") || undefined,
        gst: String(fd.get("gst") || "") || undefined,
        abn: String(fd.get("abn") || "") || undefined,
        supplier: String(fd.get("supplier") || "") || undefined,
        notes: String(fd.get("notes") || "") || undefined,
        fileName: scan?.name,
        fileData: scan?.data,
      },
    });
    setMsg("Locked in Sam’s Safe.");
    setScan(null);
    e.currentTarget.reset();
    void items.refetch();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="mb-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6a18]">Gold · Director only</p>
        <h1 className="font-script text-5xl text-gold">Sam’s Safe</h1>
        <p className="max-w-2xl text-lg text-[#5c564c]">
          The vault. Tax, BAS, super, Xero finance uploads and scanned receipts. Kate, Jas and crew desks come after this lockbox is right.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-5">
        {FOLDERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFolder(f.id)}
            className={`metal-panel rounded-xl p-4 text-left ${folder === f.id ? "border-gold/50 bg-gold/10" : ""}`}
          >
            <ChromeShield tone={f.tone} className="mb-2 h-10 w-8" />
            <p className="font-semibold text-gold-hi">{f.title}</p>
            <p className="mt-1 text-sm text-muted">{f.copy}</p>
          </button>
        ))}
      </div>

      <DeskCard>
        <h2 className="gold-text mb-4 font-display text-2xl">
          {folder === "receipt" ? "Receipt scanner" : folder === "finance" ? "Xero / finance upload" : `File into ${folder.toUpperCase()}`}
        </h2>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required placeholder={folder === "finance" ? "Xero P&L · FY26 Q1" : "Document title"} />
          </div>
          <div>
            <Label htmlFor="period">Period</Label>
            <Input id="period" name="period" placeholder="FY26 Q1" />
          </div>
          <div>
            <Label htmlFor="supplier">Supplier / entity</Label>
            <Input id="supplier" name="supplier" />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" placeholder="0.00" />
          </div>
          <div>
            <Label htmlFor="gst">GST</Label>
            <Input id="gst" name="gst" placeholder="0.00" />
          </div>
          <div>
            <Label htmlFor="abn">ABN</Label>
            <Input id="abn" name="abn" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="scan">{folder === "receipt" ? "Scan or photograph receipt" : "Upload (Xero CSV / PDF / image)"}</Label>
            <Input
              id="scan"
              type="file"
              accept={folder === "receipt" ? "image/*,application/pdf" : ".csv,.pdf,image/*,.xlsx"}
              capture={folder === "receipt" ? "environment" : undefined}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setScan(await fileToDataUrl(file));
              }}
            />
            {scan ? (
              scan.data.startsWith("data:image") ? (
                <img src={scan.data} alt="" className="mt-3 max-h-48 rounded-lg border border-chrome/20" />
              ) : (
                <p className="mt-2 text-sm text-aqua">{scan.name} ready.</p>
              )
            ) : null}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Lock in the vault</Button>
            {msg ? <p className="mt-2 text-sm text-aqua">{msg}</p> : null}
          </div>
        </form>
      </DeskCard>

      <section className="space-y-3">
        {(items.data ?? []).map((it) => (
          <article key={it.id} className="metal-panel rounded-xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl text-gold-hi">{it.title}</p>
                <p className="text-sm text-muted">
                  {it.period || "—"} · {it.supplier || "—"} · {it.amount || "no amount"}
                  {it.gst ? ` · GST ${it.gst}` : ""}
                </p>
                {it.notes ? <p className="mt-2 text-sm text-pearl">{it.notes}</p> : null}
              </div>
              {it.file_data?.startsWith("data:image") ? (
                <img src={it.file_data} alt="" className="h-20 rounded-md border border-chrome/20" />
              ) : it.file_name ? (
                <p className="text-sm text-aqua">{it.file_name}</p>
              ) : null}
            </div>
          </article>
        ))}
        {items.data?.length === 0 ? <p className="text-muted">This drawer is empty.</p> : null}
      </section>
    </div>
  );
}
