import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitAnalysis } from "@/lib/server/leads";
import { BRAND } from "@/lib/content";

export function AnalysisForm() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      organisation: String(fd.get("organisation") || ""),
      contactName: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || "") || undefined,
      sector: String(fd.get("sector") || "Commercial"),
      notes: String(fd.get("notes") || "") || undefined,
    };
    setBusy(true);
    setMsg("");
    try {
      await submitAnalysis({ data: payload });
      setMsg("Request received. A principal will respond with a private analysis pathway.");
      e.currentTarget.reset();
    } catch {
      const body = encodeURIComponent(
        `Organisation: ${payload.organisation}\nContact: ${payload.contactName}\nEmail: ${payload.email}\nPhone: ${payload.phone || "—"}\nSector: ${payload.sector}\n\n${payload.notes || ""}`,
      );
      window.location.href = `mailto:${BRAND.analysisEmail}?subject=${encodeURIComponent("NanoAssure Analysis — " + payload.organisation)}&body=${body}`;
      setMsg("Opening your mail client…");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
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
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" placeholder="Optional" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="sector">Sector</Label>
        <select
          id="sector"
          name="sector"
          className="h-11 w-full rounded-md border border-aqua/30 bg-carbon-2 px-3 text-sm text-pearl"
        >
          <option>Government</option>
          <option>Education</option>
          <option>Commercial</option>
          <option>Fleet / Transport</option>
          <option>Residential / Other</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="notes">Project notes</Label>
        <Textarea id="notes" name="notes" placeholder="Site, substrate, timeline…" />
      </div>
      <div className="md:col-span-2 text-center">
        <Button type="submit" disabled={busy} size="lg">
          {busy ? "Sending…" : "Request private analysis"}
        </Button>
        {msg ? <p className="mt-3 text-sm text-aqua">{msg}</p> : null}
      </div>
    </form>
  );
}
