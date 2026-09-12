import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { platformSnapshot, saveBulletin } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/bulletin")({ component: BulletinDesk });

function BulletinDesk() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const [msg, setMsg] = useState("");

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveBulletin({
      data: {
        audience: String(fd.get("audience") || "all") as "all" | "kate" | "jas" | "staff" | "crew",
        title: String(fd.get("title") || ""),
        body: String(fd.get("body") || ""),
      },
    });
    setMsg("Posted. Kate, Jas or crew see it on their next open.");
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Messaging</p>
        <h1 className="gold-text font-display text-3xl">Bulletin</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          All, Kate, Jas, staff or crew. No public phone numbers. SMS stays on Connections until Twilio is LIVE.
        </p>
      </header>
      <section className="portal-card p-5">
        <form className="grid gap-3" onSubmit={(e) => void onSave(e)}>
          <div>
            <Label htmlFor="audience">Send to</Label>
            <select id="audience" name="audience" className="h-12 w-full rounded-xl border px-4">
              <option value="all">Everyone</option>
              <option value="kate">Kate</option>
              <option value="jas">Jas</option>
              <option value="staff">Staff</option>
              <option value="crew">Crew</option>
            </select>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="body">Message</Label>
            <Textarea id="body" name="body" rows={5} required />
          </div>
          <div>
            <Button type="submit">Post bulletin</Button>
            {msg ? <span className="ml-3 text-sm">{msg}</span> : null}
          </div>
        </form>
      </section>
      <section className="portal-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Log</h2>
        <ul className="space-y-3">
          {(q.data?.bulletins ?? []).map((b) => (
            <li key={b.id} className="rounded-xl border border-gold/20 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-[#8a6a18]">{b.audience}</p>
              <p className="font-semibold">{b.title}</p>
              <p className="text-sm text-[#5c564c]">{b.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
