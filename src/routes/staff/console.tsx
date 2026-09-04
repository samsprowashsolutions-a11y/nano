import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_CHART,
  SEED_RATES,
  type ChartCodes,
  type FortnightLine,
  type RateRow,
  buildLines,
  currentFortnight,
  darwinIsoToday,
  hoursFromRoster,
  journalBalances,
  packReady,
  rosterHoursFor,
  wagesJournalCsv,
} from "@/lib/xero-payroll";

export const Route = createFileRoute("/staff/console")({ component: CustomConsole });

const AUTO_KEY = "na.payroll.auto";
const FILED_KEY = "na.payroll.filed";
const RATES_KEY = "na.payroll.rates";
const CHART_KEY = "na.payroll.chart";
const HOURS_KEY = "na.payroll.hours";
const XERO_ID_KEY = "na.xero.clientId";

function readFlag(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeFlag(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    /* private */
  }
}

function loadRates(): RateRow[] {
  try {
    const raw = localStorage.getItem(RATES_KEY);
    if (raw) {
      const rows = JSON.parse(raw) as RateRow[];
      return rows.map((p) => ({
        ...p,
        rosterHours: typeof p.rosterHours === "number" ? p.rosterHours : rosterHoursFor(p),
      }));
    }
  } catch {
    /* seed */
  }
  return SEED_RATES;
}

function loadChart(): ChartCodes {
  try {
    const raw = localStorage.getItem(CHART_KEY);
    if (raw) return { ...DEFAULT_CHART, ...(JSON.parse(raw) as ChartCodes) };
  } catch {
    /* seed */
  }
  return { ...DEFAULT_CHART };
}

function loadHours(rates: RateRow[], stamp: string): FortnightLine[] {
  try {
    const raw = localStorage.getItem(`${HOURS_KEY}.${stamp}`);
    if (raw) return JSON.parse(raw) as FortnightLine[];
  } catch {
    /* roster */
  }
  return hoursFromRoster(rates);
}

const DESKS: {
  cmd: string;
  to: "/staff/payroll" | "/staff/vault" | "/staff/command" | "/staff/qr" | "/staff/report" | "/staff/operations" | "/staff/inbox";
  hint: string;
}[] = [
  { cmd: "payroll", to: "/staff/payroll", hint: "Xero pack desk" },
  { cmd: "safe", to: "/staff/vault", hint: "Sam’s Safe" },
  { cmd: "command", to: "/staff/command", hint: "Director dashboard" },
  { cmd: "qr", to: "/staff/qr", hint: "QR & print" },
  { cmd: "report", to: "/staff/report", hint: "Ops daily" },
  { cmd: "ops", to: "/staff/operations", hint: "QA pathway" },
  { cmd: "inbox", to: "/staff/inbox", hint: "Analysis inbox" },
];

function CustomConsole() {
  const nav = useNavigate();
  const fortnight = currentFortnight();
  const stamp = `${fortnight.start}_to_${fortnight.end}`;
  const [line, setLine] = useState("");
  const [tick, setTick] = useState(0);
  const [clientId, setClientId] = useState(() => readFlag(XERO_ID_KEY));
  const [autoOn, setAutoOn] = useState(() => readFlag(AUTO_KEY) !== "0");
  const [log, setLog] = useState<string[]>(() => [
    `Altier custom console · ${darwinIsoToday()} Darwin`,
    "Type help. Secrets never land in git.",
  ]);

  const snapshot = useMemo(() => {
    const rates = loadRates();
    const hours = loadHours(rates, stamp);
    const chart = loadChart();
    const lines = buildLines(rates, hours);
    const journal = wagesJournalCsv(
      lines,
      chart,
      fortnight.end,
      `SP NanoAssure wages ${fortnight.start} to ${fortnight.end}`,
    );
    const bal = journalBalances(journal);
    const ready = packReady(lines, bal.ok);
    const filed = readFlag(FILED_KEY);
    const included = lines.filter((l) => l.included);
    return { rates, lines, ready, filed, included, bal };
    // tick forces a reread of localStorage after console commands
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stamp, fortnight.end, fortnight.start, tick]);

  const xeroState = clientId.trim() ? "WIRED NOT LIVE" : "UNWIRED";
  const packState = snapshot.filed === stamp ? "FILED THIS FORTNIGHT" : snapshot.ready.ok ? "READY · NOT FILED" : "BLOCKED";

  const tiles = [
    ["Fortnight", `${fortnight.start} → ${fortnight.end}`],
    ["Payroll auto", autoOn ? "ON" : "OFF"],
    ["Pack", packState],
    ["Xero custom connection", xeroState],
  ] as const;

  function say(msg: string) {
    setLog((rows) => [...rows.slice(-48), msg]);
  }

  function refresh() {
    setTick((n) => n + 1);
  }

  function setAuto(on: boolean) {
    setAutoOn(on);
    writeFlag(AUTO_KEY, on ? "1" : "0");
    say(`Payroll auto ${on ? "ON" : "OFF"}. Pack still downloads CSVs — no Xero post.`);
    refresh();
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    say(`› ${raw.trim()}`);

    if (cmd === "help" || cmd === "?") {
      say("status · fortnight · pack · auto on · auto off · xero · rates");
      say("payroll · safe · command · qr · report · ops · inbox · clear");
      return;
    }
    if (cmd === "clear") {
      setLog([]);
      return;
    }
    if (cmd === "status") {
      say(`Darwin ${stamp}. Auto ${autoOn ? "ON" : "OFF"}. Pack ${packState}. Xero ${xeroState}.`);
      if (!snapshot.ready.ok) snapshot.ready.blockers.forEach((b) => say(`! ${b}`));
      else say(`${snapshot.included.length} line(s) in pack. Sam at $0 stays out.`);
      return;
    }
    if (cmd === "fortnight" || cmd === "dates") {
      say(`Darwin fortnight ${stamp}. Epoch Monday 2026-08-24.`);
      return;
    }
    if (cmd === "xero" || cmd === "connection") {
      say(`Xero custom connection is ${xeroState}. No login in this environment. Import CSVs in Xero.`);
      say("Journals → Accounting. Timesheets → Payroll AU. Bills → Bills. BAS Excluded.");
      return;
    }
    if (cmd === "rates") {
      snapshot.rates.forEach((p) => {
        const skip = p.drawings || p.kind === "director" ? " · drawings skip" : "";
        say(`${p.name} · ${p.kind} · $${p.hourly}/hr · ${p.rosterHours}h · ${p.xeroEmail || "no Xero email"}${skip}`);
      });
      return;
    }
    if (cmd === "auto on" || cmd === "auto 1") {
      setAuto(true);
      return;
    }
    if (cmd === "auto off" || cmd === "auto 0") {
      setAuto(false);
      return;
    }
    if (cmd === "auto") {
      say(`Payroll auto is ${autoOn ? "ON" : "OFF"}. Type auto on / auto off.`);
      return;
    }
    if (cmd === "pack" || cmd === "wages") {
      if (!snapshot.ready.ok) {
        say("Pack blocked. Fix rates first.");
        snapshot.ready.blockers.forEach((b) => say(`! ${b}`));
      } else {
        say("Opening payroll desk to run the automatic pack.");
      }
      void nav({ to: "/staff/payroll" });
      return;
    }

    const desk = DESKS.find(
      (d) => d.cmd === cmd || (cmd === "vault" && d.cmd === "safe") || (cmd === "desk" && d.cmd === "command"),
    );
    if (desk) {
      say(`→ ${desk.hint}`);
      void nav({ to: desk.to });
      return;
    }

    say(`Unknown: ${cmd}. Type help.`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(line);
    setLine("");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gold · Altier</p>
        <h1 className="gold-text font-display text-3xl">Custom console</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Director command strip. Payroll pack stays automatic. Xero is still CSV import until a Custom Connection is
          live — tokens never go in git.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(([k, v]) => (
          <div key={k} className="metal-panel rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-muted">{k}</p>
            <p className="mt-1 font-mono text-sm text-gold-hi">{v}</p>
          </div>
        ))}
      </div>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-widest text-muted">Command strip</p>
          <label className="flex items-center gap-2 text-sm text-gold-hi">
            <input
              type="checkbox"
              className="size-4 accent-gold"
              checked={autoOn}
              onChange={(e) => setAuto(e.target.checked)}
            />
            Auto pack
          </label>
        </div>
        <div className="max-h-56 overflow-y-auto rounded-lg bg-[#11110f] p-4 font-mono text-sm text-gold-hi">
          {log.map((row, i) => (
            <p key={`${i}-${row.slice(0, 32)}`} className="whitespace-pre-wrap">
              {row}
            </p>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={line}
            onChange={(e) => setLine(e.target.value)}
            placeholder="help · status · pack · auto on · xero"
            autoComplete="off"
            autoFocus
          />
          <Button type="submit">Run</Button>
        </form>
        <div className="flex flex-wrap gap-2 text-sm">
          {DESKS.slice(0, 4).map((d) => (
            <Link key={d.cmd} to={d.to} className="rounded-full border border-gold/30 px-3 py-1 text-gold-hi">
              {d.hint}
            </Link>
          ))}
        </div>
      </section>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <h2 className="font-display text-lg text-gold-hi">Payroll pack this fortnight</h2>
        <p className="text-sm text-muted">
          {snapshot.ready.ok
            ? `${snapshot.included.length} included line(s). Journal ${snapshot.bal.ok ? "balances" : "does not balance"}. Sam at $0 stays out.`
            : "Pack will not run until the blockers below are cleared on Rates."}
        </p>
        {!snapshot.ready.ok ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-gold-hi">
            {snapshot.ready.blockers.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
        <p className="text-xs text-muted">
          Last Safe pack stamp: {snapshot.filed || "none this browser"}. Import path stays Journals → Accounting,
          Timesheets → Payroll AU, Bills → Bills.
        </p>
      </section>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <h2 className="font-display text-lg text-gold-hi">Xero custom connection</h2>
        <p className="text-sm text-muted">
          Status {xeroState}. A Xero Custom Connection is a paid org add-on. This desk will not post journals until
          that connection is authorised. Client id may sit in this browser only. Do not paste the client secret here.
        </p>
        <label className="block text-sm text-muted">
          Client id (optional, this browser)
          <Input
            className="mt-1"
            value={clientId}
            placeholder="not required for CSV pack"
            onChange={(e) => {
              const v = e.target.value.trim();
              setClientId(v);
              writeFlag(XERO_ID_KEY, v);
            }}
          />
        </label>
        <p className="text-xs text-muted">
          Keep using Automatic pack → download CSVs → import in Xero. Secret stays in Xero My Apps, not in Altier.
        </p>
      </section>
    </div>
  );
}
