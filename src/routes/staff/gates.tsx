import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import {
  N7_STAGES,
  NANODATA_LIMIT,
  NANODATA_TESTS,
  OCR_USES,
  READINESS_CATEGORIES,
} from "@/lib/control";
import {
  captureOcr,
  controlSnapshot,
  issueReadiness,
  openN7Project,
  raiseHold,
  resolveHold,
  reviewNanodata,
  saveNanodata,
  setReadiness,
  submitN7Stage,
} from "@/lib/server/control";
import { HoldBanner, HoldChip } from "@/components/staff/hold-state";
import { PackDisc } from "@/components/brand/pack-icon";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { fileToDataUrl } from "@/components/staff/desk";

export const Route = createFileRoute("/staff/gates")({ component: GatesDesk });

function GatesDesk() {
  const q = useQuery({ queryKey: ["control"], queryFn: () => controlSnapshot() });
  const [msg, setMsg] = useState("");
  const [projectId, setProjectId] = useState<number | "">("");
  const d = q.data;

  async function onOpen(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await openN7Project({
      data: {
        clientName: String(fd.get("clientName") || ""),
        site: String(fd.get("site") || ""),
        surface: String(fd.get("surface") || "") || undefined,
        projectRef: String(fd.get("projectRef") || ""),
        assetRef: String(fd.get("assetRef") || ""),
      },
    });
    setMsg(`Project ${res.vaultRef} opened at Inspect.`);
    setProjectId(res.id);
    e.currentTarget.reset();
    void q.refetch();
  }

  async function onStage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!projectId) return;
    const fd = new FormData(e.currentTarget);
    const stage = String(fd.get("stage") || "INS");
    const spec = N7_STAGES.find((s) => s.code === stage);
    const payload: Record<string, string> = {};
    spec?.required.forEach((k) => {
      payload[k] = String(fd.get(k) || "");
    });
    const res = await submitN7Stage({
      data: {
        projectId: Number(projectId),
        stage,
        ownerName: String(fd.get("ownerName") || ""),
        payload,
        evidenceRefs: String(fd.get("evidenceRefs") || "") || undefined,
      },
    });
    setMsg(res.ok ? `Stage complete. Next ${res.next}.` : `HOLD. ${res.reason}`);
    void q.refetch();
  }

  async function onNano(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!projectId) return;
    const fd = new FormData(e.currentTarget);
    const file = (fd.get("photo") as File | null) ?? null;
    const shot = file && file.size ? await fileToDataUrl(file) : undefined;
    const res = await saveNanodata({
      data: {
        projectId: Number(projectId),
        testType: String(fd.get("testType") || ""),
        operator: String(fd.get("operator") || ""),
        rawResult: String(fd.get("rawResult") || ""),
        evidenceName: shot?.name,
        evidenceData: shot?.data,
      },
    });
    setMsg(`${res.vaultRef} captured · review pending. ${res.limit}`);
    e.currentTarget.reset();
    void q.refetch();
  }

  const [stageCode, setStageCode] = useState("INS");
  const active = N7_STAGES.find((s) => s.code === stageCode) ?? N7_STAGES[0];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker chrome-metal">NANO7™ Asset Assurance Policy</p>
        <h1 className="gold-foil font-display text-4xl">Inspect · Prepare · Apply · Verify · Record · Approve · Handover</h1>
        <p className="mt-2 max-w-3xl text-sm text-[#122038]">{NANODATA_LIMIT}</p>
      </header>

      {d && d.openHolds > 0 ? (
        <HoldBanner kind="document" reason={`${d.openHolds} open HOLD events. Progression is blocked until resolved.`} />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Projects", d?.projects.length ?? 0],
          ["Open HOLD", d?.openHolds ?? 0],
          ["NANODATA pending", d?.pendingReview ?? 0],
          ["Evidence", d?.evidence.length ?? 0],
        ].map(([l, v]) => (
          <div key={String(l)} className="kpi-chip p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a6a18]">{l}</p>
            <p className="font-display text-4xl text-[#2a241c]">{v}</p>
          </div>
        ))}
      </div>

      <section className="portal-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Open a controlled project</h2>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onOpen(e)}>
          <div>
            <Label htmlFor="clientName">Client</Label>
            <Input id="clientName" name="clientName" required />
          </div>
          <div>
            <Label htmlFor="site">Site</Label>
            <Input id="site" name="site" required />
          </div>
          <div>
            <Label htmlFor="projectRef">Project reference</Label>
            <Input id="projectRef" name="projectRef" required placeholder="Physical / job ref" />
          </div>
          <div>
            <Label htmlFor="assetRef">Asset / surface reference</Label>
            <Input id="assetRef" name="assetRef" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="surface">Surface</Label>
            <Input id="surface" name="surface" />
          </div>
          <Button type="submit">Open at Inspect</Button>
        </form>
      </section>

      <section className="portal-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">NANO7 stage — cannot skip</h2>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onStage(e)}>
          <div>
            <Label>Project</Label>
            <select
              className="h-11 w-full rounded-md border-2 border-[#d4af37] px-3"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : "")}
            >
              <option value="">Select project</option>
              {(d?.projects ?? []).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.vault_ref} · {p.client_name} · {p.current_stage}
                  {p.hold_open ? " · HOLD" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Stage</Label>
            <select
              name="stage"
              className="h-11 w-full rounded-md border-2 border-[#d4af37] px-3"
              value={stageCode}
              onChange={(e) => setStageCode(e.target.value)}
            >
              {N7_STAGES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} {s.name}
                </option>
              ))}
            </select>
          </div>
          <p className="sm:col-span-2 text-sm text-[#5c564c]">
            Owner: {active.owner}. HOLD if {active.holdIf}
          </p>
          <div>
            <Label htmlFor="ownerName">Acting owner</Label>
            <Input id="ownerName" name="ownerName" required />
          </div>
          {active.required.map((k) => (
            <div key={k}>
              <Label htmlFor={k}>{k}</Label>
              <Input id={k} name={k} required />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Label htmlFor="evidenceRefs">Linked vault / evidence refs</Label>
            <Input id="evidenceRefs" name="evidenceRefs" placeholder="SP-DOC-000001, SP-INT-000002" />
          </div>
          <Button type="submit">Submit stage</Button>
        </form>
      </section>

      <section className="portal-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <PackDisc kind="check" n="ND" tone="navy" className="b4-sm" />
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">NANODATA Collection™ — field evidence only</h2>
        </div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onNano(e)}>
          <div>
            <Label>Instrument</Label>
            <select name="testType" required className="h-11 w-full rounded-md border-2 border-[#d4af37] px-3">
              {NANODATA_TESTS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.mark}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="operator">Operator</Label>
            <Input id="operator" name="operator" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="rawResult">Raw result / observation</Label>
            <Textarea id="rawResult" name="rawResult" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="photo">Supporting image</Label>
            <Input id="photo" name="photo" type="file" accept="image/*" capture="environment" />
          </div>
          <Button type="submit">Capture NANODATA</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {(d?.tests ?? []).map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 py-2 text-sm">
              <span>
                <span className="font-mono text-purple">{t.vault_ref}</span> · {t.test_type} · {t.operator}
                <span className="block text-[#5c564c]">{t.raw_result}</span>
              </span>
              <span className="flex gap-2">
                <HoldChip kind={t.review_state === "reviewed" ? "archive" : "document"} label={t.review_state} />
                {t.review_state === "pending" ? (
                  <>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => void reviewNanodata({ data: { id: t.id, pass: true, reviewer: "verifier" } }).then(() => q.refetch())}
                    >
                      Review pass
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={() => void reviewNanodata({ data: { id: t.id, pass: false, reviewer: "verifier" } }).then(() => q.refetch())}
                    >
                      HOLD
                    </Button>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="portal-card p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">HOLD / quarantine</h2>
          <form
            className="grid gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              void raiseHold({
                data: {
                  kind: String(fd.get("kind") || "document") as "document" | "security" | "legal" | "archive",
                  ownerName: String(fd.get("holdOwner") || ""),
                  reason: String(fd.get("reason") || ""),
                  relatedRecord: projectId ? String(projectId) : undefined,
                },
              }).then((r) => {
                setMsg(`HOLD ${r.vaultRef}`);
                void q.refetch();
              });
            }}
          >
            <select name="kind" className="h-11 rounded-md border-2 border-[#d4af37] px-3">
              <option value="document">Document Control HOLD</option>
              <option value="security">Security Quarantine</option>
              <option value="legal">Legal / Privacy HOLD</option>
              <option value="archive">Archive</option>
            </select>
            <Input name="holdOwner" required placeholder="Owner" />
            <Textarea name="reason" required placeholder="Reason, scope, remediation path" />
            <Button type="submit">Raise HOLD</Button>
          </form>
          <ul className="mt-3 space-y-2">
            {(d?.holds ?? []).map((h) => (
              <li key={h.id}>
                <HoldBanner kind={h.kind} reason={h.reason} vaultRef={h.vault_ref} />
                {h.status === "OPEN" ? (
                  <Button
                    size="sm"
                    className="mt-1"
                    type="button"
                    onClick={() =>
                      void resolveHold({ data: { id: h.id, authority: "control", remediation: "Authorised resolution" } }).then(() => q.refetch())
                    }
                  >
                    Resolve (does not auto-release others)
                  </Button>
                ) : (
                  <p className="text-xs text-[#5c564c]">{h.status}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="portal-card p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Scanner / OCR — captured only</h2>
          <form
            className="grid gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const file = (fd.get("scan") as File | null) ?? null;
              void (async () => {
                const shot = file && file.size ? await fileToDataUrl(file) : undefined;
                const res = await captureOcr({
                  data: {
                    useCase: String(fd.get("useCase") || "receipt"),
                    rawText: String(fd.get("rawText") || "") || undefined,
                    sourceFile: shot?.name,
                    fileData: shot?.data,
                  },
                });
                setMsg(`${res.vaultRef} · ${res.note}`);
                void q.refetch();
              })();
            }}
          >
            <select name="useCase" className="h-11 rounded-md border-2 border-[#d4af37] px-3">
              {OCR_USES.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <Input name="scan" type="file" accept="image/*,application/pdf" capture="environment" />
            <Textarea name="rawText" placeholder="Optional observed text — still captured, not verified" />
            <Button type="submit">File scan to vault</Button>
          </form>
          <ul className="mt-3 text-sm">
            {(d?.ocr ?? []).map((o) => (
              <li key={o.id} className="border-b border-gold/20 py-1">
                <span className="font-mono text-purple">{o.vault_ref}</span> · {o.use_case} · {o.ocr_status} / {o.review_state}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="portal-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Job readiness — no invented pass</h2>
        <form
          className="grid gap-2 sm:grid-cols-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            void setReadiness({
              data: {
                jobId: Number(fd.get("jobId") || 0) || undefined,
                projectId: projectId ? Number(projectId) : undefined,
                category: String(fd.get("category") || "people"),
                ownerName: String(fd.get("readyOwner") || ""),
                sourceRecord: String(fd.get("sourceRecord") || "") || undefined,
                satisfied: fd.get("satisfied") === "on",
              },
            }).then(() => q.refetch());
          }}
        >
          <Input name="jobId" placeholder="Job id" />
          <select name="category" className="h-11 rounded-md border-2 border-[#d4af37] px-3">
            {READINESS_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <Input name="readyOwner" required placeholder="Reviewer" />
          <Input name="sourceRecord" placeholder="Source record ref" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="satisfied" className="size-4 accent-gold" /> Approved underlying data
          </label>
          <Button type="submit">Record category</Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              const jobId = Number((document.querySelector('input[name="jobId"]') as HTMLInputElement | null)?.value || 0);
              if (!jobId) return;
              void issueReadiness({ data: { jobId, ownerName: "operations" } }).then((r) => {
                setMsg(r.ok ? r.result + " — " + r.note : r.result);
                void q.refetch();
              });
            }}
          >
            Issue PASS / HOLD
          </Button>
        </form>
        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          {(d?.readiness ?? []).slice(0, 16).map((r) => (
            <li key={r.id}>
              {r.category} · {r.result} · {r.owner_name}
            </li>
          ))}
        </ul>
      </section>

      {msg ? <p className="text-sm font-semibold text-[#0c1f4a]">{msg}</p> : null}
    </div>
  );
}
