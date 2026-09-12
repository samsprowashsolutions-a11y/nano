import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useMemo, useState } from "react";
import { commandSnapshot, saveSitePost, togglePost } from "@/lib/server/atelier";
import { controlSnapshot } from "@/lib/server/control";
import { getGpsDesk } from "@/lib/server/gps";
import { commandNeeds } from "@/lib/field-flow";
import { PROCESS } from "@/lib/content";
import { PROCESS_TONE } from "@/lib/brand-4";
import { PlatformList } from "@/components/staff/platform-list";
import { PackCard, PackHex, PackInfo, PackPillar, PackStatus } from "@/components/staff/pack-frame";
import { PackDisc } from "@/components/brand/pack-icon";
import type { PackKind } from "@/components/brand/pack-icon";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Bell, FileScan, QrCode, ShieldCheck, Upload, Users, Wallet } from "lucide-react";

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
    <Link to={to} className="pack-kpi">
      <p className="lab">{label}</p>
      <p className="val">{value}</p>
      <p className="hint">{hint}</p>
    </Link>
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
    <PackCard title="Calculator">
      <div className="mb-2 rounded-lg bg-[#0c1f4a] px-3 py-2 text-right font-mono text-xl text-[#fff8d4]">{expr}</div>
      <div className="pack-calc-keys grid grid-cols-4 gap-1">
        {keys.map((k) => (
          <button key={k} type="button" onClick={() => hit(k)}>
            {k}
          </button>
        ))}
        <button type="button" onClick={() => hit("=")} className="col-span-4 !bg-[#d4af37] !text-[#1a1208]">
          =
        </button>
      </div>
    </PackCard>
  );
}

const HOW = [
  { kind: "check" as PackKind, title: "Only approved combinations proceed", copy: "Products, substrates and claims must all be approved." },
  { kind: "hold" as PackKind, title: "Unsupported claims remain on HOLD", copy: "Do not use performance claims that are not approved." },
  { kind: "search" as PackKind, title: "Current documents must be checked", copy: "Confirm latest TDS, SDS and substrate information." },
  { kind: "people" as PackKind, title: "External materials need sign-off", copy: "All external marketing and technical materials require approval." },
  { kind: "target" as PackKind, title: "Field teams follow approved pathways only", copy: "Use the approved pathways. Do not deviate without authorisation." },
];

function CommandPost() {
  const snap = useQuery({ queryKey: ["command"], queryFn: () => commandSnapshot() });
  const ctrl = useQuery({ queryKey: ["control"], queryFn: () => controlSnapshot() });
  const gps = useQuery({ queryKey: ["gps-desk"], queryFn: () => getGpsDesk() });
  const [msg, setMsg] = useState("");
  const c = snap.data?.counts;
  const jobs = snap.data?.recentJobs ?? [];
  const funnel = useMemo(() => {
    const steps = PROCESS.map((p) => ({
      code: p.code,
      name: p.name,
      n: p.n,
      icon: p.icon,
      key: p.key,
      tone: PROCESS_TONE[p.icon] ?? "navy",
      passed: jobs.filter((j) => j[p.key as keyof typeof j] === "passed").length,
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

  const holds = (ctrl.data?.holds ?? []).filter((h) => h.status !== "released").slice(0, 6);
  const projects = ctrl.data?.projects ?? [];
  const needs = commandNeeds({
    jobs: c?.jobs ?? 0,
    vault: c?.vault ?? 0,
    ops: c?.ops ?? 0,
    leads: c?.leads ?? 0,
    openHolds: ctrl.data?.openHolds ?? 0,
    pendingReview: ctrl.data?.pendingReview ?? 0,
    gpsLive: Boolean(gps.data?.live),
  });

  return (
    <div className="space-y-5">
      {needs.length ? (
        <div className="need-do-banner">
          <span className="need-do-tag">Still to do</span>
          <p className="mt-2 text-lg font-extrabold text-[#9a3412]">Orange means not filled. Tap it. Do that next.</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {needs.map((n) => (
              <li key={n.id}>
                <Link to={n.to} className="need-do flex items-start justify-between gap-3 p-3 no-underline">
                  <span>
                    <b className="block text-lg text-[#9a3412]">{n.label}</b>
                    <span className="text-base text-[#9a3412]">{n.do}</span>
                  </span>
                  <span className="text-sm font-extrabold uppercase tracking-wide text-[#c2410c]">Open</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.7fr_.9fr]">
        <PackCard title="What this desk delivers" n="01">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Complete overview", "Jobs, HOLDs, analysis and vault in one live board."],
              ["Real evidence", "NANODATA field records stay internal until released."],
              ["Clear decisions", "GO · AMEND · HOLD on every opportunity."],
              ["Approval first", "TDS / SDS and claim gates before anything leaves Altier."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-3">
                <PackDisc kind="shield" tone="navy" />
                <div>
                  <p className="font-extrabold uppercase tracking-wide text-[#0c1f4a]">{t}</p>
                  <p className="text-sm text-[#3d4a63]">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </PackCard>
        <PackCard title="How to use this page">
          <ul>
            {HOW.map((h) => (
              <li key={h.title} className="pack-row">
                <PackDisc kind={h.kind} tone={h.kind === "hold" ? "gold" : "navy"} />
                <div>
                  <p className="font-extrabold text-[#0c1f4a]">{h.title}</p>
                  <p className="text-sm text-[#3d4a63]">{h.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </PackCard>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PackPillar n="01" title="Entry pathway" copy="Analysis requests over $5,000 enter the priority line." tone="cyan" />
        <PackPillar n="02" title="Upsell potential" copy="Broader site reviews identify additional substrates." tone="purple" />
        <PackPillar n="03" title="Operational capacity" copy="Scale with people, GPS hours and NANO7 gates." tone="navy" />
        <PackPillar n="04" title="Long-term value" copy="Evidence in the vault builds warranty and tender packs." tone="gold" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PackCard title="Operational workflow" n="08" to="/staff/operations" action="Pathway">
          {funnel.map((s) => (
            <div key={s.code} className="pack-step">
              <PackDisc kind={s.icon as PackKind} n={s.n} tone={s.tone} />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold uppercase tracking-wide text-[#0c1f4a]">
                  {s.n} {s.name}
                </p>
                <p className="text-sm text-[#3d4a63]">{s.code} · passed {s.passed}</p>
              </div>
            </div>
          ))}
        </PackCard>
        <PackCard title="Core registers" to="/staff/gates" action="Gates">
          {[
            ["TDS / SDS register", "/staff/compliance", "doc"],
            ["Application register", "/staff/operations", "clipboard"],
            ["HOLD register", "/staff/gates", "hold"],
            ["Training register", "/staff/workforce", "people"],
            ["Approval log", "/staff/jobs", "check"],
            ["Asset analysis log", "/staff/inbox", "chart"],
            ["Client feedback", "/staff/clients", "handshake"],
          ].map(([name, to, kind]) => (
            <Link key={name} to={to} className="pack-row hover:bg-[#f7fbff]">
              <PackDisc kind={kind as PackKind} tone={kind === "hold" ? "gold" : "navy"} />
              <span className="font-semibold text-[#0c1f4a]">{name}</span>
            </Link>
          ))}
        </PackCard>
        <PackCard title="Accountability">
          {[
            ["Sam — strategic control", "Governance, commercial direction, final authority."],
            ["Kate — operations coordination", "Day-to-day registers, workflow, OPPS ALL CLEAR gate."],
            ["Jas — field desk", "Site records, photos, client sign-off."],
            ["Approval before external claims", "Nothing leaves Altier without released evidence."],
            ["Vault-controlled documents", "Sam’s Safe is the authoritative record."],
          ].map(([t, d]) => (
            <div key={t} className="pack-row">
              <PackDisc kind="people" tone="navy" />
              <div>
                <p className="font-extrabold text-[#0c1f4a]">{t}</p>
                <p className="text-sm text-[#3d4a63]">{d}</p>
              </div>
            </div>
          ))}
        </PackCard>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Vault items" value={c?.vault ?? 0} hint="Sam’s Safe" to="/staff/vault" />
        <Kpi label="NANO7 jobs" value={c?.jobs ?? 0} hint="Asset Assurance Policy" to="/staff/operations" />
        <Kpi label="Inbox" value={c?.leads ?? 0} hint="Analysis requests" to="/staff/inbox" />
        <Kpi label="Warranties" value={c?.warranties ?? 0} hint="Hooked to profiles" to="/staff/warranty" />
        <Kpi label="Certificates" value={c?.certs ?? 0} hint="Verify IDs" to="/staff/verify" />
        <Kpi label="Ops briefs" value={c?.ops ?? 0} hint="Daily reports" to="/staff/report" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="NANO7 projects" value={ctrl.data?.projects.length ?? 0} hint="Controlled gates" to="/staff/gates" />
        <Kpi label="Technical HOLD" value={ctrl.data?.openHolds ?? 0} hint="Blocks progression" to="/staff/gates" />
        <Kpi label="NANODATA pending" value={ctrl.data?.pendingReview ?? 0} hint="Field evidence review" to="/staff/gates" />
        <Kpi label="OCR captured" value={ctrl.data?.ocr.length ?? 0} hint="Not verified until review" to="/staff/gates" />
      </div>

      <PackCard title="Technical approval matrix" n="09" to="/staff/gates" action="Open gates">
        <p className="mb-3 text-sm text-[#3d4a63]">Product, substrate and claim approval gates. Working control — does not replace manufacturer documents.</p>
        <div className="overflow-x-auto">
          <table className="pack-table">
            <thead>
              <tr>
                <th>Opportunity</th>
                <th>Pathway</th>
                <th>Substrate</th>
                <th>Stage</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-[#3d4a63]">
                    No live opportunities. New analysis requests land here after express interest.
                  </td>
                </tr>
              ) : null}
              {projects.map((p) => (
                <tr key={`p-${p.id}`}>
                  <td>
                    <p className="font-extrabold text-[#0c1f4a]">{p.client_name}</p>
                    <p className="text-xs text-[#3d4a63]">{p.site} · {p.vault_ref}</p>
                  </td>
                  <td>{p.project_ref}</td>
                  <td>{p.surface ?? "To be confirmed"}</td>
                  <td className="font-mono">{p.current_stage}</td>
                  <td>
                    {p.hold_open ? (
                      <PackStatus state="hold">HOLD · review required</PackStatus>
                    ) : p.current_stage === "HND" ? (
                      <PackStatus state="go">Released</PackStatus>
                    ) : (
                      <PackStatus state="amend">Approval required</PackStatus>
                    )}
                  </td>
                </tr>
              ))}
              {jobs.slice(0, 6).map((j) => (
                <tr key={`j-${j.id}`}>
                  <td>
                    <p className="font-extrabold text-[#0c1f4a]">{j.client_name}</p>
                    <p className="text-xs text-[#3d4a63]">{j.site}</p>
                  </td>
                  <td>{j.product}</td>
                  <td>—</td>
                  <td>NANO7</td>
                  <td>
                    <PackStatus state="pending">In pathway</PackStatus>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PackCard>

      <PackCard title="HOLD register" n="19" to="/staff/alerts" action="Alerts">
        {holds.length === 0 ? (
          <p className="text-sm text-[#3d4a63]">No open HOLD items. Release only after required approvals.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="pack-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Reason</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {holds.map((h) => (
                  <tr key={h.id}>
                    <td className="font-mono text-xs">{h.vault_ref}</td>
                    <td>{h.reason}</td>
                    <td>{h.owner_name}</td>
                    <td>
                      <PackStatus state="hold">{h.status}</PackStatus>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PackCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <PackCard title="Sam’s Safe" to="/staff/vault" action="Open vault">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Tax", "BAS", "Super", "Xero / Finance", "Receipts"].map((label) => (
              <Link key={label} to="/staff/vault" className="rounded-xl border-2 border-[#d4af37] px-3 py-2 hover:bg-[#fff6d0]">
                <Wallet className="mb-1 size-4 text-[#c9a227]" />
                {label}
              </Link>
            ))}
          </div>
          {(snap.data?.recentVault ?? []).slice(0, 3).map((v) => (
            <p key={v.id} className="mt-2 text-sm">
              <span className="uppercase text-[#0a6e78]">{v.folder}</span> · {v.title}
            </p>
          ))}
        </PackCard>
        <PackCard title="Website ↔ Altier interchange">
          <form onSubmit={onPublish} className="space-y-2">
            <Select name="channel" required defaultValue="public">
              <option value="public">Public website</option>
              <option value="atelier">Altier gallery</option>
            </Select>
            <Input name="title" required placeholder="Title" />
            <Textarea name="body" required placeholder="Brief" className="min-h-20" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" className="size-4 accent-[#d4af37]" defaultChecked />
              Publish now
            </label>
            <Button type="submit" size="sm">
              Send
            </Button>
            {msg ? <p className="text-sm text-[#0a6e78]">{msg}</p> : null}
          </form>
          <div className="mt-3 space-y-1">
            {(snap.data?.posts ?? []).slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span>{p.title}</span>
                <button
                  type="button"
                  className="font-bold uppercase tracking-wide text-[#0c1f4a]"
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
        </PackCard>
        <PackCard title="Quick actions">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/staff/vault" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <FileScan className="mb-1 size-4 text-[#c9a227]" /> Receipt scan
            </Link>
            <Link to="/staff/qr" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <QrCode className="mb-1 size-4 text-[#c9a227]" /> Print QR
            </Link>
            <Link to="/staff/report" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <Bell className="mb-1 size-4 text-[#c9a227]" /> Ops daily
            </Link>
            <Link to="/staff/warranty" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <ShieldCheck className="mb-1 size-4 text-[#c9a227]" /> Warranty
            </Link>
            <Link to="/staff/clients" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <Users className="mb-1 size-4 text-[#c9a227]" /> Client
            </Link>
            <Link to="/staff/payroll" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <Upload className="mb-1 size-4 text-[#c9a227]" /> Payroll → Xero
            </Link>
            <Link to="/staff/gps" className="rounded-xl border-2 border-[#d4af37] p-3 hover:bg-[#fff6d0]">
              <Wallet className="mb-1 size-4 text-[#c9a227]" /> GPS log
            </Link>
          </div>
        </PackCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <PackCard title="System status">
          <ul>
            {[
              ["Database", "Operational", "go"],
              ["Verify register", "Operational", "go"],
              ["Sam’s Safe", "Locked · Director", "amend"],
              ["Public maison", "Live", "go"],
            ].map(([k, v, s]) => (
              <li key={k} className="pack-row justify-between">
                <span className="font-semibold">{k}</span>
                <PackStatus state={s as "go" | "amend"}>{v}</PackStatus>
              </li>
            ))}
          </ul>
        </PackCard>
        <Calculator />
      </div>

      <PackCard title="01–23 · The list" n="01" to="/staff/platform" action="Full index">
        <PlatformList variant="command" />
      </PackCard>

      <PackInfo>
        This desk is a working control page and does not replace current manufacturer documents. Items on HOLD must not be presented externally as approved until formally released.
      </PackInfo>
    </div>
  );
}
