import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { FIELD_TESTS, PROCESS, PRODUCTS } from "@/lib/content";
import { listFieldTests, saveFieldTest } from "@/lib/server/leads";
import { listQaJobs, saveQaJob, setQaStep } from "@/lib/server/atelier";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { ChromePlate, FieldTestRow } from "@/components/chrome-shield";
import { DeskHeader } from "@/components/staff/desk";
import { NanoDataBand, Qa7Banner, Qa7Mark } from "@/components/qa/qa7";

export const Route = createFileRoute("/staff/operations")({ component: Operations });

const STEP_KEY = PROCESS.map((p) => p.key);
const STATUS: Record<string, string> = {
  pending: "border-border text-muted",
  live: "border-aqua bg-aqua/10 text-aqua",
  hold: "border-gold bg-gold/10 text-gold",
  passed: "border-ok bg-ok/10 text-ok",
};

function passedCount(job: { apa: string; rpt: string; dat: string; hlt: string; crt: string; dep: string; nia: string }) {
  return (["apa", "rpt", "dat", "hlt", "crt", "dep", "nia"] as const).filter((k) => job[k] === "passed").length;
}

function Operations() {
  const tests = useQuery({ queryKey: ["field-tests"], queryFn: () => listFieldTests() });
  const jobs = useQuery({ queryKey: ["qa-jobs"], queryFn: () => listQaJobs() });
  const [msg, setMsg] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  async function onJob(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await saveQaJob({
      data: {
        clientName: String(fd.get("clientName") || ""),
        site: String(fd.get("site") || ""),
        product: String(fd.get("product") || ""),
        notes: String(fd.get("notes") || "") || undefined,
      },
    });
    setOpenId(res.id);
    setMsg("Pathway opened. Seven NANO7™ gates. No shortcuts.");
    e.currentTarget.reset();
    void jobs.refetch();
  }

  async function onTest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveFieldTest({
      data: {
        site: String(fd.get("site") || ""),
        product: String(fd.get("product") || ""),
        adhesion: fd.get("adhesion") === "on",
        beading: fd.get("beading") === "on",
        uv: fd.get("uv") === "on",
        antimicrobial: fd.get("antimicrobial") === "on",
        durability: fd.get("durability") === "on",
        initials: String(fd.get("initials") || "") || undefined,
        notes: String(fd.get("notes") || "") || undefined,
      },
    });
    setMsg("Field checklist recorded.");
    e.currentTarget.reset();
    void tests.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Qa7Banner compact />
      <DeskHeader
        kicker="Pearl · NANO7™"
        title="Asset Assurance Policy"
        script="Inspect to handover."
        copy="Every job walks Inspect → Prepare → Apply → Verify → Record → Approve → Handover. NANODATA Collection™ is the science inside Verify. Hold-points are gold. Certificates are not issued from a conversation."
      />

      <div className="grid gap-3 sm:grid-cols-7">
        {PROCESS.map((p) => (
          <article key={p.code} className="metal-panel rounded-xl p-3 text-center">
            <Qa7Mark kind={p.icon} className="mx-auto h-14 w-14" title={p.name} />
            <p className="font-mono text-xs text-neon">{p.n} · {p.code}</p>
            <p className="font-display text-lg text-gold-hi">{p.short}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{p.name}</p>
          </article>
        ))}
      </div>

      <ChromePlate>
        <form onSubmit={onJob} className="grid gap-4 p-5 md:grid-cols-2 md:p-8">
          <div className="md:col-span-2">
            <p className="kicker">Open a pathway</p>
            <h2 className="gold-text font-display text-2xl">New NanoAssure™ job</h2>
          </div>
          <div>
            <Label htmlFor="clientName">Client / principal</Label>
            <Input id="clientName" name="clientName" required />
          </div>
          <div>
            <Label htmlFor="site">Site / asset</Label>
            <Input id="site" name="site" required />
          </div>
          <div>
            <Label htmlFor="product">Specified system</Label>
            <Select id="product" name="product" required>
              {PRODUCTS.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Opening notes</Label>
            <Input id="notes" name="notes" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Open the seven gates</Button>
          </div>
        </form>
      </ChromePlate>

      <section className="space-y-6">
        {(jobs.data ?? []).map((job) => {
          const done = passedCount(job);
          const live = openId === job.id;
          return (
            <article key={job.id} className="overflow-hidden rounded-2xl border border-gold/25 bg-carbon-2">
              <button
                type="button"
                className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
                onClick={() => setOpenId(live ? null : job.id)}
              >
                <div>
                  <p className="font-display text-2xl text-gold-hi">{job.client_name}</p>
                  <p className="text-muted">{job.site} · {job.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-aqua">{done} / 7 passed</p>
                  {job.verify_id ? <p className="text-sm text-gold">{job.verify_id}</p> : null}
                </div>
              </button>
              <div className="h-1.5 bg-carbon">
                <div className="h-full bg-linear-to-r from-aqua via-gold to-gold-hi" style={{ width: `${(done / 7) * 100}%` }} />
              </div>
              {live ? (
                <div className="grid gap-3 p-5 md:grid-cols-2">
                  {PROCESS.map((p) => {
                    const key = p.key;
                    const status = job[key as "apa" | "rpt" | "dat" | "hlt" | "crt" | "dep" | "nia"];
                    return (
                      <div key={p.code} className="rounded-xl border border-chrome/15 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <Qa7Mark kind={p.icon} className="h-12 w-12" title={p.name} />
                          <div>
                            <p className="font-mono text-xs text-aqua">{p.n} · {p.code}</p>
                            <p className="font-display text-xl text-gold-hi">{p.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-pearl">{p.detail}</p>
                        <p className="mt-2 text-sm italic text-gold">{p.hold}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(["pending", "live", "hold", "passed"] as const).map((s) => (
                            <button
                              key={s}
                              type="button"
                              className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${STATUS[s]} ${status === s ? "ring-1 ring-gold" : ""}`}
                              onClick={async () => {
                                await setQaStep({
                                  data: { id: job.id, step: key as "apa" | "rpt" | "dat" | "hlt" | "crt" | "dep" | "nia", status: s },
                                });
                                void jobs.refetch();
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </article>
          );
        })}
        {jobs.data?.length === 0 ? (
          <p className="text-center text-muted">No pathways open. The atelier is still.</p>
        ) : null}
      </section>

      <NanoDataBand className="px-0 py-4" />

      <ChromePlate>
        <form onSubmit={onTest} className="space-y-4 p-5 md:p-8">
          <div>
            <p className="kicker">Verify · QA-FORM-001</p>
            <h2 className="gold-text font-display text-2xl">Five-test field checklist</h2>
            <p className="font-script text-xl text-gold">Nanotechnology · Performance · Protection</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="site">Site</Label>
              <Input id="site" name="site" required placeholder="Asset / address" />
            </div>
            <div>
              <Label htmlFor="product">Product</Label>
              <Select id="product" name="product" required>
                {PRODUCTS.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            {FIELD_TESTS.map((t) => (
              <FieldTestRow
                key={t.n}
                test={t}
                as="label"
                control={<input type="checkbox" name={t.key} className="size-5 accent-gold" />}
              />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="initials">Applicator initials</Label>
              <Input id="initials" name="initials" maxLength={8} />
            </div>
            <div>
              <Label htmlFor="notes">Hold points</Label>
              <Textarea id="notes" name="notes" />
            </div>
          </div>
          <Button type="submit">Record checklist</Button>
          {msg ? <p className="text-sm text-aqua">{msg}</p> : null}
        </form>
      </ChromePlate>

      <img
        src="/docs/two-systems.png"
        alt="Two separate controlled NanoAssure systems"
        className="w-full rounded-xl border border-gold/25"
      />
      <img
        src="/docs/five-test-checklist.png"
        alt="NanoAssure five test field checklist"
        className="w-full rounded-xl border border-chrome/20"
      />

      <section className="metal-panel rounded-xl p-5">
        <h2 className="mb-3 font-display text-lg text-gold-hi">Recent field tests</h2>
        <div className="space-y-2 text-sm">
          {(tests.data ?? []).map((t) => (
            <div key={t.id} className="rounded-lg border border-border p-3">
              <p className="font-semibold">{t.site}</p>
              <p className="text-xs text-muted">
                {t.product} · {t.initials || "—"} · {t.created_at}
              </p>
            </div>
          ))}
          {tests.data?.length === 0 ? <p className="text-muted">No tests recorded yet.</p> : null}
        </div>
      </section>
    </div>
  );
}
