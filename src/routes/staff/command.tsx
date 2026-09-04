import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useMemo, useState } from "react";
import { commandSnapshot, saveSitePost, togglePost } from "@/lib/server/atelier";
import { PROCESS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import {
  Bell,
  Calculator as CalcIcon,
  FileScan,
  QrCode,
  ShieldCheck,
  Upload,
  Users,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/staff/command")({ component: CommandPost });

function Kpi({
  label,
  value,
  hint,
  to,
}: {
  label: string;
  value: number | string;
  hint: string;
  to: string;
}) {
  return (
    <Link to={to} className="kpi-chip p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a6a18]">{label}</p>
      <p className="font-display text-4xl text-[#2a241c]">{value}</p>
      <p className="text-sm text-[#5c564c]">{hint}</p>
    </Link>
  );
}

function Card({ title, action, to, children }: { title: string; action?: string; to?: string; children: React.ReactNode }) {
  return (
    <section className="portal-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">{title}</h2>
        {to ? (
          <Link to={to} className="text-xs font-semibold text-purple">
            {action ?? "Open"}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Calculator() {
  const [expr, setExpr] = useState("0");
  function hit(v: string) {
    if (v === "C") return setExpr("0");
    if (v === "=") {
      try {
        const safe = expr.replace(/[^0-9+\-*/.]/g, "");
        const out = Function(`"use strict"; return (${safe})`)();
        setExpr(String(out));
      } catch {
        setExpr("0");
      }
      return;
    }
    setExpr((e) => (e === "0" ? v : e + v));
  }
  const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "C", "+"];
  return (
    <div className="portal-card p-4">
      <div className="mb-2 flex items-center gap-2 text-[#8a6a18]">
        <CalcIcon className="size-4" />
        <p className="text-sm font-bold uppercase tracking-[0.12em]">Calculator</p>
      </div>
      <div className="mb-2 rounded-lg bg-[#11110f] px-3 py-2 text-right font-mono text-xl text-gold-hi">{expr}</div>
      <div className="grid grid-cols-4 gap-1">
        {keys.map((k) => (
          <button key={k} type="button" onClick={() => hit(k)} className="rounded-md bg-[#f3eee4] py-2 text-sm font-semibold hover:bg-gold/20">
            {k}
          </button>
        ))}
        <button type="button" onClick={() => hit("=")} className="col-span-4 rounded-md bg-gold py-2 text-sm font-bold text-carbon">
          =
        </button>
      </div>
    </div>
  );
}

function CommandPost() {
  const snap = useQuery({ queryKey: ["command"], queryFn: () => commandSnapshot() });
  const [msg, setMsg] = useState("");
  const c = snap.data?.counts;
  const jobs = snap.data?.recentJobs ?? [];
  const funnel = useMemo(() => {
    const steps = PROCESS.map((p) => ({
      code: p.code,
      n: jobs.filter((j) => j[p.key as keyof typeof j] === "passed").length,
    }));
    return steps;
  }, [jobs]);

  async function onPublish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveSitePost({
      data: {
        channel: fd.get("channel") === "atelier" ? "atelier" : "public",
        title: String(fd.get("title") || ""),
        body: String(fd.get("body") || ""),
        published: fd.get("published") === "on",
      },
    });
    setMsg("Posted to the selected gallery.");
    e.currentTarget.reset();
    void snap.refetch();
  }

  return (
    <div className="space-y-4">
      <div className="hidden items-end justify-between md:flex">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6a18]">
            Executive director operations · live command dashboard
          </p>
          <h1 className="font-script text-5xl text-gold">Sam’s Desk</h1>
        </div>
        <video
          src="/brand/sp-lockup-film.mp4"
          poster="/brand/sp-lockup.png"
          autoPlay
          muted
          loop
          playsInline
          className="h-16 w-auto rounded-lg"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Vault items" value={c?.vault ?? 0} hint="Sam’s Safe" to="/staff/vault" />
        <Kpi label="NANO7 jobs" value={c?.jobs ?? 0} hint="Asset Assurance Policy" to="/staff/operations" />
        <Kpi label="Inbox" value={c?.leads ?? 0} hint="Analysis requests" to="/staff/inbox" />
        <Kpi label="Warranties" value={c?.warranties ?? 0} hint="Hooked to profiles" to="/staff/warranty" />
        <Kpi label="Certificates" value={c?.certs ?? 0} hint="Verify IDs" to="/staff/verify" />
        <Kpi label="Ops briefs" value={c?.ops ?? 0} hint="Daily reports" to="/staff/report" />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card title="NANO7™ funnel" to="/staff/operations" action="Pathway">
          <ul className="space-y-1 text-sm">
            {funnel.map((s) => (
              <li key={s.code} className="flex items-center justify-between">
                <span className="font-mono text-purple">{s.code}</span>
                <span className="h-2 w-24 rounded-full bg-[#efe6d4]">
                  <span className="block h-2 rounded-full bg-linear-to-r from-aqua to-purple" style={{ width: `${Math.min(100, s.n * 20 + 8)}%` }} />
                </span>
                <span>{s.n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[#5c564c]">NANODATA Collection™ sits in Verify. Never merged.</p>
        </Card>
        <Card title="Open QA jobs" to="/staff/operations" action="View all">
          {jobs.length === 0 ? <p className="text-sm text-[#5c564c]">No pathways open.</p> : null}
          {jobs.map((j) => (
            <p key={j.id} className="border-b border-gold/15 py-2 text-sm">
              <span className="font-semibold">{j.client_name}</span>
              <span className="block text-[#5c564c]">{j.site} · {j.product}</span>
            </p>
          ))}
        </Card>
        <Card title="Analysis inbox" to="/staff/inbox" action="Open">
          {(snap.data?.inbox ?? []).length === 0 ? <p className="text-sm text-[#5c564c]">No requests.</p> : null}
          {(snap.data?.inbox ?? []).map((l) => (
            <p key={l.id} className="border-b border-gold/15 py-2 text-sm">
              {l.organisation}
              <span className="block text-[#5c564c]">{l.contact_name} · {l.status}</span>
            </p>
          ))}
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card title="Sam’s Safe" to="/staff/vault" action="Open vault">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ["Tax", "tax"],
              ["BAS", "bas"],
              ["Super", "super"],
              ["Xero / Finance", "finance"],
              ["Receipts", "receipt"],
            ].map(([label]) => (
              <Link key={label} to="/staff/vault" className="rounded-xl border border-gold/20 px-3 py-2 hover:bg-gold/10">
                <Wallet className="mb-1 size-4 text-gold" />
                {label}
              </Link>
            ))}
          </div>
          {(snap.data?.recentVault ?? []).slice(0, 3).map((v) => (
            <p key={v.id} className="mt-2 text-sm">
              <span className="uppercase text-aqua">{v.folder}</span> · {v.title}
            </p>
          ))}
        </Card>
        <Card title="Website ↔ atelier interchange">
          <form onSubmit={onPublish} className="space-y-2">
            <Select name="channel" required defaultValue="public">
              <option value="public">Public website</option>
              <option value="atelier">Atelier gallery</option>
            </Select>
            <Input name="title" required placeholder="Title" />
            <Textarea name="body" required placeholder="Brief" className="min-h-20" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" className="size-4 accent-gold" defaultChecked />
              Publish now
            </label>
            <Button type="submit" size="sm">
              Send
            </Button>
            {msg ? <p className="text-sm text-aqua">{msg}</p> : null}
          </form>
          <div className="mt-3 space-y-1">
            {(snap.data?.posts ?? []).slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span>{p.title}</span>
                <button
                  type="button"
                  className="text-purple"
                  onClick={async () => {
                    await togglePost({ data: { id: p.id, published: !p.published } });
                    void snap.refetch();
                  }}
                >
                  {p.published ? "Hold" : "Live"}
                </button>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Quick actions">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/staff/vault" className="rounded-xl border border-gold/20 p-3 hover:bg-gold/10">
              <FileScan className="mb-1 size-4 text-gold" /> Receipt scan
            </Link>
            <Link to="/staff/qr" className="rounded-xl border border-gold/20 p-3 hover:bg-gold/10">
              <QrCode className="mb-1 size-4 text-gold" /> Print QR
            </Link>
            <Link to="/staff/report" className="rounded-xl border border-gold/20 p-3 hover:bg-gold/10">
              <Bell className="mb-1 size-4 text-gold" /> Ops daily
            </Link>
            <Link to="/staff/warranty" className="rounded-xl border border-gold/20 p-3 hover:bg-gold/10">
              <ShieldCheck className="mb-1 size-4 text-gold" /> Warranty
            </Link>
            <Link to="/staff/clients" className="rounded-xl border border-gold/20 p-3 hover:bg-gold/10">
              <Users className="mb-1 size-4 text-gold" /> Client
            </Link>
            <Link to="/staff/payroll" className="rounded-xl border border-gold/20 p-3 hover:bg-gold/10">
              <Upload className="mb-1 size-4 text-gold" /> Payroll → Xero
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <Card title="System status">
          <ul className="space-y-2 text-sm">
            {[
              ["Database", "Operational"],
              ["Verify register", "Operational"],
              ["Sam’s Safe", "Locked · Director"],
              ["Public maison", "Live"],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span>{k}</span>
                <span className="text-[#0a6e78]">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Calculator />
      </div>
    </div>
  );
}
