import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentFortnight, darwinIsoToday } from "@/lib/xero-payroll";

export const Route = createFileRoute("/staff/console")({ component: CustomConsole });

const AUTO_KEY = "na.payroll.auto";
const FILED_KEY = "na.payroll.filed";
const XERO_ID_KEY = "na.xero.clientId";

function readFlag(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function CustomConsole() {
  const nav = useNavigate();
  const fortnight = currentFortnight();
  const [line, setLine] = useState("");
  const [log, setLog] = useState<string[]>(() => [
    `Altier custom console · ${darwinIsoToday()} Darwin`,
    "Type help. Secrets never land in git.",
  ]);
  const [clientId, setClientId] = useState(() => readFlag(XERO_ID_KEY));
  const autoOn = readFlag(AUTO_KEY) !== "0";
  const filed = readFlag(FILED_KEY);
  const xeroState = clientId.trim() ? "WIRED NOT LIVE" : "UNWIRED";

  const stamp = `${fortnight.start}_to_${fortnight.end}`;

  const tiles = useMemo(
    () => [
      ["Fortnight", `${fortnight.start} → ${fortnight.end}`],
      ["Payroll auto", autoOn ? "ON" : "OFF"],
      ["Last Safe pack", filed || "none this browser"],
      ["Xero custom connection", xeroState],
    ],
    [autoOn, filed, fortnight.end, fortnight.start, xeroState],
  );

  function say(msg: string) {
    setLog((rows) => [...rows.slice(-40), msg]);
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    say(`› ${raw.trim()}`);
    if (cmd === "help") {
      say("payroll · safe · command · fortnight · pack · xero · clear");
      return;
    }
    if (cmd === "clear") {
      setLog([]);
      return;
    }
    if (cmd === "fortnight" || cmd === "dates") {
      say(`Darwin fortnight ${stamp}. Sam at $0 stays out.`);
      return;
    }
    if (cmd === "xero" || cmd === "connection") {
      say(`Xero custom connection is ${xeroState}. No Xero login in this environment. Pack still downloads CSVs.`);
      return;
    }
    if (cmd === "pack" || cmd === "payroll" || cmd === "wages") {
      void nav({ to: "/staff/payroll" });
      return;
    }
    if (cmd === "safe" || cmd === "vault") {
      void nav({ to: "/staff/vault" });
      return;
    }
    if (cmd === "command" || cmd === "desk") {
      void nav({ to: "/staff/command" });
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
        <div className="max-h-56 overflow-y-auto rounded-lg bg-[#11110f] p-4 font-mono text-sm text-gold-hi">
          {log.map((row, i) => (
            <p key={`${i}-${row.slice(0, 24)}`} className="whitespace-pre-wrap">
              {row}
            </p>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={line}
            onChange={(e) => setLine(e.target.value)}
            placeholder="help · payroll · safe · fortnight"
            autoComplete="off"
          />
          <Button type="submit">Run</Button>
        </form>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link to="/staff/payroll" className="rounded-full border border-gold/30 px-3 py-1 text-gold-hi">
            Payroll → Xero
          </Link>
          <Link to="/staff/vault" className="rounded-full border border-gold/30 px-3 py-1 text-gold-hi">
            Sam’s Safe
          </Link>
          <Link to="/staff/command" className="rounded-full border border-gold/30 px-3 py-1 text-gold-hi">
            Command
          </Link>
        </div>
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
              try {
                if (v) localStorage.setItem(XERO_ID_KEY, v);
                else localStorage.removeItem(XERO_ID_KEY);
              } catch {
                /* private */
              }
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
