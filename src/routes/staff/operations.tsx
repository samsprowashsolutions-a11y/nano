import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { FIELD_TESTS, PRODUCTS } from "@/lib/content";
import { listFieldTests, saveFieldTest } from "@/lib/server/leads";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ChromePlate, FieldTestRow } from "@/components/chrome-shield";

export const Route = createFileRoute("/staff/operations")({ component: Operations });

function Operations() {
  const tests = useQuery({ queryKey: ["field-tests"], queryFn: () => listFieldTests() });
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
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
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Pearl · QA</p>
        <h1 className="gold-text font-display text-3xl">Five-test field checklist</h1>
        <p className="font-script text-xl text-gold">Nanotechnology · Performance · Protection</p>
        <p className="text-sm text-muted">Tested. Verified. Assured. QA-FORM-001 · Rev 1.0</p>
      </header>

      <ChromePlate>
        <form onSubmit={onSubmit} className="space-y-4 p-5 md:p-7">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="site">Site</Label>
              <Input id="site" name="site" required placeholder="Asset / address" />
            </div>
            <div>
              <Label htmlFor="product">Product</Label>
              <select
                id="product"
                name="product"
                className="h-11 w-full rounded-md border border-aqua/30 bg-carbon-2 px-3 text-sm"
                required
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </select>
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
