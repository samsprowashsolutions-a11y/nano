import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { SWMS } from "@/lib/content";
import { platformSnapshot, savePrestart } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/whs")({ component: WhsDesk });

function WhsDesk() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const [msg, setMsg] = useState("");

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await savePrestart({
      data: {
        jobRef: String(fd.get("jobRef") || "") || undefined,
        site: String(fd.get("site") || ""),
        hazards: String(fd.get("hazards") || "") || undefined,
        ppe: String(fd.get("ppe") || "") || undefined,
        controls: String(fd.get("controls") || "") || undefined,
        signedBy: String(fd.get("signedBy") || "") || undefined,
      },
    });
    setMsg("Pre-start filed. SWMS master stays DRAFT until this job is complete.");
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker">Carbon · Governance</p>
        <h1 className="gold-text font-display text-3xl">WHS · Pre-start · SWMS</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          {SWMS.status}. Document {SWMS.documentId}. Master template on{" "}
          <Link to="/staff/protocol" className="text-gold-hi underline">
            Protocol
          </Link>
          . Sign here for the job.
        </p>
      </header>

      <section className="portal-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Site pre-start</h2>
        <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onSave(e)}>
          <div>
            <Label htmlFor="site">Site</Label>
            <Input id="site" name="site" required />
          </div>
          <div>
            <Label htmlFor="jobRef">Job ref</Label>
            <Input id="jobRef" name="jobRef" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="hazards">Hazards</Label>
            <Textarea id="hazards" name="hazards" rows={2} />
          </div>
          <div>
            <Label htmlFor="ppe">PPE</Label>
            <Input id="ppe" name="ppe" placeholder="Gloves · eye · White Card" />
          </div>
          <div>
            <Label htmlFor="signedBy">Signed by</Label>
            <Input id="signedBy" name="signedBy" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="controls">Controls</Label>
            <Textarea id="controls" name="controls" rows={2} />
          </div>
          <div>
            <Button type="submit">Sign pre-start</Button>
            {msg ? <span className="ml-3 text-sm">{msg}</span> : null}
          </div>
        </form>
      </section>

      <section className="portal-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Signed today</h2>
        <ul className="space-y-2 text-sm">
          {(q.data?.prestarts ?? []).map((p) => (
            <li key={p.id} className="rounded-lg border border-gold/20 px-3 py-2">
              <p className="font-semibold">{p.site}</p>
              <p className="text-[#5c564c]">
                {p.signed_by ?? "unsigned"} · {p.ppe ?? "PPE not listed"} · {p.hazards ?? "—"}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
