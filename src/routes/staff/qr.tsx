import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useMemo, useState } from "react";
import QRCode from "qrcode";
import { listQr, saveQr } from "@/lib/server/atelier";
import { DeskCard, DeskHeader } from "@/components/staff/desk";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";

export const Route = createFileRoute("/staff/qr")({ component: QrDesk });

const KINDS = [
  { id: "verify", label: "NanoAssure Verify ID", hint: "NA-YYYYMMDD-XXXX" },
  { id: "warranty", label: "Client warranty tag", hint: "Warranty + client name" },
  { id: "client", label: "Client asset tag", hint: "Client / site" },
  { id: "analysis", label: "Private analysis desk", hint: "Opens /analysis" },
  { id: "collection", label: "The collection", hint: "Opens /solutions" },
  { id: "staff", label: "Staff atelier gate", hint: "Opens /staff" },
  { id: "site", label: "Public maison", hint: "Opens home" },
  { id: "ops", label: "Ops daily brief", hint: "Brief title" },
  { id: "product", label: "Chemistry / TDS", hint: "Product name" },
  { id: "custom", label: "Custom payload", hint: "URL or text" },
] as const;

function payloadFor(kind: string, value: string, origin: string) {
  const v = value.trim();
  switch (kind) {
    case "verify":
      return `${origin}/verify?id=${encodeURIComponent(v.toUpperCase())}`;
    case "warranty":
      return `${origin}/staff/warranty#${encodeURIComponent(v)}`;
    case "client":
      return `${origin}/staff/clients#${encodeURIComponent(v)}`;
    case "analysis":
      return `${origin}/analysis`;
    case "collection":
      return `${origin}/solutions`;
    case "staff":
      return `${origin}/staff`;
    case "site":
      return `${origin}/`;
    case "ops":
      return `${origin}/#brief`;
    case "product":
      return `${origin}/solutions#${encodeURIComponent(v)}`;
    default:
      return v;
  }
}

function QrDesk() {
  const list = useQuery({ queryKey: ["qr"], queryFn: () => listQr() });
  const [kind, setKind] = useState<(typeof KINDS)[number]["id"]>("verify");
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [png, setPng] = useState("");
  const origin = typeof window === "undefined" ? "https://www.nanoassure.net" : window.location.origin;
  const payload = useMemo(() => payloadFor(kind, value, origin), [kind, value, origin]);
  const meta = KINDS.find((k) => k.id === kind)!;

  async function render(text: string) {
    const url = await QRCode.toDataURL(text, {
      width: 640,
      margin: 1,
      color: { dark: "#050508", light: "#f5e2a0" },
    });
    setPng(url);
    return url;
  }

  async function onGenerate(e: FormEvent) {
    e.preventDefault();
    const url = await render(payload);
    await saveQr({
      data: {
        kind,
        label: label || meta.label,
        payload,
      },
    });
    void list.refetch();
    setPng(url);
  }

  function printSheet() {
    window.print();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <DeskHeader
        kicker="Pearl · Tags"
        title="QR & barcode desk"
        script="Print the proof."
        copy="Choose what the mark encodes. Verify IDs, warranties, client tags, analysis, chemistry — then print a gold-on-carbon plate."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <DeskCard className="no-print">
          <form onSubmit={onGenerate} className="space-y-4">
            <div>
              <Label htmlFor="kind">Barcode payload</Label>
              <Select
                id="kind"
                value={kind}
                onChange={(e) => setKind(e.target.value as typeof kind)}
              >
                {KINDS.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.label}
                  </option>
                ))}
              </Select>
            </div>
            {["verify", "warranty", "client", "ops", "product", "custom"].includes(kind) ? (
              <div>
                <Label htmlFor="value">{meta.hint}</Label>
                <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} required={kind === "custom" || kind === "verify"} />
              </div>
            ) : null}
            <div>
              <Label htmlFor="label">Print label</Label>
              <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder={meta.label} />
            </div>
            <p className="break-all font-mono text-sm text-aqua">{payload || "—"}</p>
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Generate & save</Button>
              <Button type="button" variant="aqua" onClick={printSheet} disabled={!png}>
                Print plate
              </Button>
            </div>
          </form>
        </DeskCard>

        <div className="print-sheet metal-panel rounded-xl p-5 text-center">
          <img src="/brand/sp-lockup.jpg" alt="" className="mx-auto mb-3 w-48" />
          {png ? (
            <img src={png} alt="QR" className="mx-auto w-56 rounded-lg" />
          ) : (
            <div className="grid h-56 place-items-center text-muted">No mark yet</div>
          )}
          <p className="mt-3 font-display text-xl text-gold-hi">{label || meta.label}</p>
          <p className="font-mono text-xs text-muted">{payload}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-aqua">NanoAssure™ · SP Prestige</p>
        </div>
      </div>

      <section className="no-print space-y-2">
        {(list.data ?? []).map((q) => (
          <button
            key={q.id}
            type="button"
            className="metal-panel w-full rounded-xl p-4 text-left"
            onClick={() => {
              setKind((KINDS.find((k) => k.id === q.kind)?.id as typeof kind) || "custom");
              setLabel(q.label);
              setValue(q.payload);
              void render(q.payload);
            }}
          >
            <p className="font-semibold text-gold-hi">{q.label}</p>
            <p className="text-sm text-muted">{q.kind}</p>
            <p className="break-all font-mono text-xs text-aqua">{q.payload}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
