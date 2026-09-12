import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { rev } from "@/lib/cache";
import { BRAND } from "@/lib/content";

export const PAGE_META: Record<string, { n: string; title: string; gold: string; kicker: string }> = {
  "/staff/command": { n: "00", title: "Altier Command", gold: "Sam’s Desk", kicker: "Director operations · vault controlled · live" },
  "/staff/crew": { n: "01", title: "Crew Walk", gold: "One job · one voice", kicker: "Sign on · inspect · handover · sign off" },
  "/staff/platform": { n: "01", title: "Master Index", gold: "Briefing pack · 23 modules", kicker: "Categories · sheets · desks" },
  "/staff/jobs": { n: "08", title: "Jobs · OPPS ALL CLEAR", gold: "Crew allocation and status", kicker: "Workflow · QA · evidence vault" },
  "/staff/alerts": { n: "19", title: "Alerts · Audit", gold: "Expiry and HOLD notices", kicker: "Transparency · discipline · control" },
  "/staff/compliance": { n: "21", title: "TDS / SDS Gate", gold: "Manufacturer source control", kicker: "Accurate sources · clear records" },
  "/staff/whs": { n: "18", title: "WHS · Pre-start", gold: "Site assessment and field checklist", kicker: "Cleaner · safer · stronger" },
  "/staff/documents": { n: "10", title: "Document Packs", gold: "Vault controlled issue", kicker: "Tender · pre-qualification · handover" },
  "/staff/bulletin": { n: "11", title: "Bulletin", gold: "Select who receives the notice", kicker: "Sam · Kate · Jas · field" },
  "/staff/analytics": { n: "07", title: "Analytics", gold: "Daily compare charts", kicker: "Evidence-led growth" },
  "/staff/admin": { n: "23", title: "Admin · Roles", gold: "Access and approval matrix", kicker: "N · M · V · A · T · Q · D · X" },
  "/staff/console": { n: "22", title: "Custom Console", gold: "Website and Altier controls", kicker: "Interchange · gallery · maison" },
  "/staff/connections": { n: "20", title: "Connections", gold: "Email, SMS, Xero, GPS", kicker: "Controlled messaging" },
  "/staff/vault": { n: "09", title: "Sam’s Safe", gold: "Authoritative vault record", kicker: "Tax · BAS · super · receipts" },
  "/staff/payroll": { n: "17", title: "Payroll → Xero", gold: "Hours, geofence, lodgement", kicker: "Kate · Jas · field" },
  "/staff/gps": { n: "14", title: "GPS Log", gold: "Sign-on heartbeat", kicker: "Payroll and warranty tracker" },
  "/staff/qr": { n: "13", title: "QR & Print", gold: "Asset and receipt codes", kicker: "Verify · print · file" },
  "/staff/clients": { n: "12", title: "Client Profiles", gold: "Released records only", kicker: "Analysis · warranty · evidence" },
  "/staff/warranty": { n: "15", title: "Warranty Desk", gold: "Hooked to the client profile", kicker: "NANO7 · NANODATA · vault" },
  "/staff/operations": { n: "06", title: "QA Pathway", gold: "NANO7 Asset Assurance Policy", kicker: "Inspect · prepare · apply · verify · record · approve · handover" },
  "/staff/gates": { n: "05", title: "NANO7 Gates", gold: "Seven-step pathway", kicker: "HOLD · GO · evidence" },
  "/staff/report": { n: "16", title: "Ops Daily Report", gold: "What completed today", kicker: "Charts · comments · emergencies" },
  "/staff/products": { n: "04", title: "Chemistry Library", gold: "Product, substrate, claim gates", kicker: "TDS · SDS · substrate · claim control" },
  "/staff/verify": { n: "03", title: "NanoAssure Verify", gold: "NA-YYYYMMDD-XXXX", kicker: "Certificate register" },
  "/staff/inbox": { n: "02", title: "Analysis Inbox", gold: "Express interest requests", kicker: "Priority line · Nanotech team" },
  "/staff/workforce": { n: "08", title: "Workforce", gold: "Roster, tickets, hours", kicker: "People · PPE · competency" },
  "/staff/protocol": { n: "18", title: "SWMS & Protocol", gold: "Per-site tick gates", kicker: "Draft unregistered master" },
  "/staff/prompt": { n: "23", title: "Master Prompt", gold: "Do not miss a control", kicker: "Vault controlled document" },
};

export function metaFor(path: string) {
  if (PAGE_META[path]) return PAGE_META[path];
  const hit = Object.keys(PAGE_META).find((k) => k !== "/staff/command" && path.startsWith(k));
  return PAGE_META[hit ?? "/staff/command"];
}

function Molecules({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 70" className={cn("pack-mol", className)} aria-hidden>
      <g fill="none" stroke="#9aa7bd" strokeWidth="1.6">
        <line x1="18" y1="36" x2="48" y2="18" />
        <line x1="48" y1="18" x2="78" y2="32" />
        <line x1="78" y1="32" x2="108" y2="14" />
        <line x1="78" y1="32" x2="118" y2="48" />
        <line x1="48" y1="18" x2="40" y2="52" />
      </g>
      {[
        [18, 36, 7],
        [48, 18, 9],
        [78, 32, 8],
        [108, 14, 7],
        [118, 48, 6],
        [40, 52, 6],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#d5dbe4" stroke="#9aa7bd" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

export function PackHex({ n, className }: { n: string; className?: string }) {
  return (
    <span className={cn("pack-hex", className)}>
      <svg viewBox="0 0 64 56" aria-hidden>
        <polygon
          points="16,3 48,3 61,28 48,53 16,53 3,28"
          fill="#0c1f4a"
          stroke="#d4af37"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <b>{n}</b>
    </span>
  );
}

export function PackStatus({
  state,
  children,
}: {
  state: "go" | "amend" | "hold" | "pending";
  children: ReactNode;
}) {
  return <span className={cn("pack-status", `pack-${state}`)}>{children}</span>;
}

export function PackCard({
  title,
  n,
  action,
  to,
  children,
  className,
}: {
  title: string;
  n?: string;
  action?: string;
  to?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pack-card", className)}>
      <div className="pack-head">
        {n ? <PackHex n={n} className="!h-8 !w-9 !text-[.7rem]" /> : null}
        <span>{title}</span>
        {to ? (
          <Link to={to} className="ml-auto text-[.65rem] font-bold tracking-[.14em] text-[#e8c547]">
            {action ?? "Open"}
          </Link>
        ) : null}
      </div>
      <div className="pack-body">{children}</div>
    </section>
  );
}

export function PackMasthead({
  path,
  now,
}: {
  path: string;
  now?: string;
}) {
  const m = metaFor(path);
  return (
    <header className="pack-mast">
      <span className="pack-slash" />
      <Molecules className="pack-mol-l" />
      <Molecules className="pack-mol-r" />
      <div className="pack-mast-inner">
        <Link to="/staff/command" className="relative z-[1] shrink-0 justify-self-start">
          <img src={rev("/brand/pack-sp.png")} alt="Sam's Prowash Solutions" className="pack-crest" />
        </Link>
        <div className="min-w-0 text-center">
          <p className="pack-kicker">SP NanoAssure™</p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <PackHex n={m.n} />
            <div>
              <h1 className="pack-title text-2xl md:text-4xl">{m.title}</h1>
              <p className="pack-gold text-lg md:text-2xl">{m.gold}</p>
            </div>
          </div>
          <p className="pack-sub">
            <span className="pack-drop" />
            {m.kicker}
            <span className="pack-drop" />
          </p>
        </div>
        <div className="pack-house justify-self-end">
          <img src={rev("/brand/na-shield-chrome.png")} alt="NanoAssure™" className="pack-crest pack-crest-na" />
          <img src={rev("/brand/pack-n7.png")} alt="N7 seven step pathway" className="pack-crest pack-crest-n7" />
          <p className="pack-slogan hidden lg:flex">
            Cleaner
            <span>Safer</span>
            <span>Stronger</span>
            <span>Australia</span>
          </p>
        </div>
      </div>
      {now ? (
        <p className="relative z-[1] px-4 pb-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#3d4a63]">
          {now}
        </p>
      ) : null}
    </header>
  );
}

export function PackFooterBar({ page, of = "23" }: { page: string; of?: string }) {
  return (
    <footer className="pack-foot">
      <div className="pack-ribbon" />
      <div className="pack-foot-inner">
        <span className="pack-lock">
          <Lock className="size-3.5" /> Vault controlled document
        </span>
        <img src={rev("/brand/sp-wordmark-script.png")} alt="Sam's Prowash Solutions" className="h-10 w-auto object-contain md:h-12" />
        <p className="hidden text-center text-xs font-semibold text-[#c5d4ea] lg:block">
          SP NanoAssure™ · Altier · ABN {BRAND.abn} · {BRAND.location}
        </p>
        <span className="pack-pagechip">
          Page {page} of {of}
        </span>
      </div>
    </footer>
  );
}

export function PackInfo({ children }: { children: ReactNode }) {
  return (
    <p className="pack-info">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#0c1f4a] font-display text-sm text-[#fff8d4]">
        i
      </span>
      <span>{children}</span>
    </p>
  );
}

export function PackPillar({
  n,
  title,
  copy,
  tone = "navy",
}: {
  n: string;
  title: string;
  copy: string;
  tone?: "navy" | "purple" | "cyan" | "gold";
}) {
  const disc =
    tone === "gold"
      ? "b4-gold"
      : tone === "purple"
        ? "b4-purple"
        : tone === "cyan"
          ? "b4-cyan"
          : "b4-navy";
  return (
    <article className="pack-pillar">
      <span className={cn("b4-disc mx-auto", disc)}>
        <b className="text-sm">{n}</b>
      </span>
      <h3 className="mt-2 font-display text-lg uppercase tracking-wide text-[#0c1f4a]">{title}</h3>
      <p className="mt-1 text-sm text-[#3d4a63]">{copy}</p>
    </article>
  );
}
