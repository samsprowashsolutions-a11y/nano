import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitAnalysis } from "@/lib/server/leads";
import { BRAND } from "@/lib/content";
import { SITE_ACCESS, SITE_HAZARD, SITE_SURFACES, SITE_SWMS } from "@/lib/brand-4";
import { PackDisc } from "@/components/brand/pack-icon";
import { cn } from "@/lib/utils";

const PRIORITY = "You will receive a phone call very soon, you are in the priority line.";
const STANDARD = "The Nanotech Team will respond within 24 hours.";

export function AnalysisForm() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const [band, setBand] = useState<"under-5000" | "5000-plus" | "">("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const assetBand = String(fd.get("assetBand") || band) as "under-5000" | "5000-plus";
    const priority = assetBand === "5000-plus";
    const swms = {
      surface: String(fd.get("surface") || ""),
      access: String(fd.get("access") || ""),
      hazard: String(fd.get("hazard") || ""),
      ticks: SITE_SWMS.map((s) => ({ id: s.id, label: s.label, done: Boolean(ticks[s.id]) })),
    };
    const payload = {
      organisation: String(fd.get("organisation") || ""),
      contactName: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || "") || undefined,
      sector: String(fd.get("sector") || "Commercial"),
      site: String(fd.get("site") || ""),
      notes: String(fd.get("notes") || "") || undefined,
      swms,
      assetBand,
    };
    setBusy(true);
    setMsg("");
    const reply = priority ? PRIORITY : STANDARD;
    const subject = priority
      ? `PRIORITY analysis $5,000+ — ${payload.organisation}`
      : `Analysis request under $5,000 — ${payload.organisation}`;
    const body = [
      priority ? "LANE: PRIORITY — asset $5,000+" : "LANE: Nanotech Team — under $5,000 — respond within 24 hours",
      `Organisation: ${payload.organisation}`,
      `Contact: ${payload.contactName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "—"}`,
      `Sector: ${payload.sector}`,
      `Site: ${payload.site}`,
      `Asset size: ${priority ? "$5,000 or more" : "Under $5,000"}`,
      `Surface: ${swms.surface}`,
      `Access: ${swms.access}`,
      `Hazard: ${swms.hazard}`,
      `SWMS ticked: ${swms.ticks.filter((t) => t.done).map((t) => t.label).join(", ") || "none"}`,
      "",
      payload.notes || "",
    ].join("\n");
    try {
      await submitAnalysis({ data: payload });
      setMsg(reply);
      e.currentTarget.reset();
      setTicks({});
      setBand("");
    } catch {
      window.location.href = `mailto:${BRAND.analysisEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setMsg(reply);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2 rounded-xl border-2 border-[#c8ced6] bg-white p-4">
        <p className="font-display text-2xl font-semibold text-[#243656]">Do I qualify for an analysis?</p>
        <p className="mt-2 text-base text-[#122038]">
          First contact. House selection. Size of the asset decides the lane. We get back to your request. No application instructions.
        </p>
        <Label htmlFor="assetBand" className="mt-4 block">
          Size of the asset
        </Label>
        <select
          id="assetBand"
          name="assetBand"
          required
          value={band}
          onChange={(e) => setBand(e.target.value as typeof band)}
          className="mt-1 h-11 w-full rounded-md border-2 border-[#d4af37] bg-white px-3 text-sm text-[#0c1f4a]"
        >
          <option value="">Select…</option>
          <option value="under-5000">Under $5,000</option>
          <option value="5000-plus">$5,000 or more</option>
        </select>
        {band === "5000-plus" ? (
          <p className="mt-2 text-sm font-semibold text-[#0c1f4a]">Priority line. Express interest and we call you.</p>
        ) : null}
        {band === "under-5000" ? (
          <p className="mt-2 text-sm font-semibold text-[#0c1f4a]">Nanotech Team responds within 24 hours.</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="organisation">Organisation</Label>
        <Input id="organisation" name="organisation" required placeholder="Company or agency" />
      </div>
      <div>
        <Label htmlFor="name">Contact name</Label>
        <Input id="name" name="name" required placeholder="Your name" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div>
        <Label htmlFor="phone">Contact number</Label>
        <Input id="phone" name="phone" required={band === "5000-plus"} placeholder="For the call-back" />
      </div>
      <div>
        <Label htmlFor="site">Site address</Label>
        <Input id="site" name="site" required placeholder="Street, suburb" />
      </div>
      <div>
        <Label htmlFor="sector">Sector</Label>
        <select id="sector" name="sector" className="h-11 w-full rounded-md border-2 border-[#d4af37] bg-white px-3 text-sm text-[#0c1f4a]">
          <option>Government</option>
          <option>Education</option>
          <option>Commercial</option>
          <option>Fleet / Transport</option>
          <option>Residential / Other</option>
        </select>
      </div>
      <div>
        <Label htmlFor="surface">Surface for this site</Label>
        <select id="surface" name="surface" required className="h-11 w-full rounded-md border-2 border-[#d4af37] bg-white px-3 text-sm text-[#0c1f4a]">
          {SITE_SURFACES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="access">Access</Label>
        <select id="access" name="access" required className="h-11 w-full rounded-md border-2 border-[#d4af37] bg-white px-3 text-sm text-[#0c1f4a]">
          {SITE_ACCESS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="hazard">Hazard level</Label>
        <select id="hazard" name="hazard" required className="h-11 w-full rounded-md border-2 border-[#d4af37] bg-white px-3 text-sm text-[#0c1f4a]">
          {SITE_HAZARD.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <div className="b4-head mb-3 rounded-t-xl">
          <PackDisc kind="clipboard" n="SW" tone="navy" className="b4-sm" />
          Site SWMS — tick what is already confirmed for this site
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {SITE_SWMS.map((s) => (
            <label key={s.id} className={cn("b4-tick", ticks[s.id] && "is-on")}>
              <input
                type="checkbox"
                checked={Boolean(ticks[s.id])}
                onChange={() => setTicks((t) => ({ ...t, [s.id]: !t[s.id] }))}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="notes">Project notes</Label>
        <Textarea id="notes" name="notes" placeholder="Scope, timing, anything we should know…" />
      </div>
      <div className="md:col-span-2 text-center">
        <Button type="submit" disabled={busy || !band} size="lg">
          {busy ? "Sending…" : "Express interest"}
        </Button>
        {msg ? <p className="mt-3 text-base font-semibold text-[#0c1f4a]">{msg}</p> : null}
      </div>
    </form>
  );
}
