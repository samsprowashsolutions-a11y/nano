import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { saveVaultItem } from "@/lib/server/atelier";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import {
  DEFAULT_CHART,
  SEED_RATES,
  type ChartCodes,
  type FortnightLine,
  type PersonKind,
  type RateRow,
  buildLines,
  contractorBillsCsv,
  journalBalances,
  packReadme,
  timesheetsCsv,
  wagesJournalCsv,
} from "@/lib/xero-payroll";

export const Route = createFileRoute("/staff/payroll")({ component: PayrollDesk });

const RATES_KEY = "na.payroll.rates";
const CHART_KEY = "na.payroll.chart";

function loadRates(): RateRow[] {
  try {
    const raw = localStorage.getItem(RATES_KEY);
    if (raw) return JSON.parse(raw) as RateRow[];
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

function download(name: string, body: string, type = "text/csv;charset=utf-8") {
  const blob = new Blob([body], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function isoToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoMinus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function PayrollDesk() {
  const [tab, setTab] = useState<"rates" | "chart" | "fortnight">("fortnight");
  const [rates, setRates] = useState<RateRow[]>(loadRates);
  const [chart, setChart] = useState<ChartCodes>(loadChart);
  const [start, setStart] = useState(isoMinus(13));
  const [end, setEnd] = useState(isoToday());
  const [hours, setHours] = useState<FortnightLine[]>(() => loadRates().map((p) => ({ personId: p.id, hours: 0 })));
  const [approved, setApproved] = useState(false);
  const [msg, setMsg] = useState("");
  const [safeOn, setSafeOn] = useState(false);

  const lines = useMemo(() => buildLines(rates, hours), [rates, hours]);
  const employees = lines.filter((l) => l.included && l.person.kind === "employee");
  const contractors = lines.filter((l) => l.included && l.person.kind === "contractor");
  const stamp = `${start}_to_${end}`;
  const narration = `SP NanoAssure wages ${start} to ${end}`;

  const journal = useMemo(() => wagesJournalCsv(lines, chart, end, narration), [lines, chart, end, narration]);
  const sheets = useMemo(() => timesheetsCsv(lines, start, end), [lines, start, end]);
  const bills = useMemo(() => contractorBillsCsv(lines, chart, end), [lines, chart, end]);
  const readme = useMemo(() => packReadme(start, end, lines), [start, end, lines]);
  const bal = useMemo(() => journalBalances(journal), [journal]);

  function persistRates(next: RateRow[]) {
    setRates(next);
    localStorage.setItem(RATES_KEY, JSON.stringify(next));
    setHours((h) => {
      const ids = new Set(next.map((p) => p.id));
      const keep = h.filter((x) => ids.has(x.personId));
      for (const p of next) if (!keep.some((x) => x.personId === p.id)) keep.push({ personId: p.id, hours: 0 });
      return keep;
    });
  }

  function persistChart(next: ChartCodes) {
    setChart(next);
    localStorage.setItem(CHART_KEY, JSON.stringify(next));
  }

  function setHour(id: string, value: number) {
    setHours((rows) => rows.map((r) => (r.personId === id ? { ...r, hours: value } : r)));
    setApproved(false);
    setSafeOn(false);
  }

  function setPayg(id: string, value: number) {
    setHours((rows) => rows.map((r) => (r.personId === id ? { ...r, paygOverride: value } : r)));
    setApproved(false);
  }

  async function fileInSafe() {
    const pack = [
      `--- wages-journal.csv ---\n${journal}`,
      `--- timesheets.csv ---\n${sheets}`,
      `--- contractor-bills.csv ---\n${bills}`,
      `--- README.txt ---\n${readme}`,
    ].join("\n\n");
    try {
      await saveVaultItem({
        data: {
          folder: "finance",
          title: `Xero payroll pack ${start} – ${end}`,
          period: `${start} / ${end}`,
          supplier: "Sam's Prowash Solutions Pty Ltd",
          notes: `Uploaded pack for bookkeeper. Journal + timesheets + contractor bills. ${narration}`.slice(0, 1800),
          fileName: `xero-pack-${stamp}.txt`,
          fileData: `data:text/plain;base64,${btoa(unescape(encodeURIComponent(pack)))}`,
        },
      });
      setSafeOn(true);
      setMsg("Pack locked in Sam’s Safe · Finance · Xero for the bookkeeper.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Safe mark failed. Stay signed in and retry.");
    }
  }

  function downloadPack() {
    download(`wages-journal-${stamp}.csv`, journal);
    download(`timesheets-${stamp}.csv`, sheets);
    download(`contractor-bills-${stamp}.csv`, bills);
    download(`XERO-PACK-${stamp}.txt`, readme, "text/plain;charset=utf-8");
    setMsg("Downloaded. No Xero login here — import the files in Xero.");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gold · Director payroll</p>
        <h1 className="gold-text font-display text-3xl">Payroll → Xero pack</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          After you build and approve the fortnight, download the files Xero actually imports. There is no Xero login
          in this environment.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["fortnight", "Fortnight"],
            ["rates", "Rates"],
            ["chart", "Chart"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === id ? "bg-gold text-carbon" : "border border-gold/30 text-gold-hi"}`}
          >
            {label}
          </button>
        ))}
        <Link to="/staff/vault" className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gold-hi">
          Sam’s Safe
        </Link>
      </div>

      {tab === "rates" ? (
        <section className="metal-panel space-y-4 rounded-xl p-5">
          <p className="text-sm text-muted">
            Put each person’s Xero email here. Super % is on top of gross. Contractors: no PAYG, no SG. Sam at $0 is
            drawings — left out of the pack.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Kind</th>
                  <th className="pb-2">Xero email</th>
                  <th className="pb-2">$/hr</th>
                  <th className="pb-2">PAYG $</th>
                  <th className="pb-2">SG %</th>
                  <th className="pb-2">GST</th>
                  <th className="pb-2">$0 drawings</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((p, i) => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="py-2">
                      <Input
                        value={p.name}
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, name: e.target.value };
                          persistRates(next);
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <Select
                        value={p.kind}
                        onChange={(e) => {
                          const kind = e.target.value as PersonKind;
                          const next = rates.slice();
                          next[i] = {
                            ...p,
                            kind,
                            superPct: kind === "contractor" || kind === "director" ? 0 : p.superPct || 12,
                            paygAmount: kind === "contractor" || kind === "director" ? 0 : p.paygAmount,
                            drawings: kind === "director" ? true : p.drawings,
                          };
                          persistRates(next);
                        }}
                      >
                        <option value="employee">Employee</option>
                        <option value="contractor">Contractor</option>
                        <option value="director">Director</option>
                      </Select>
                    </td>
                    <td className="py-2">
                      <Input
                        type="email"
                        value={p.xeroEmail}
                        placeholder="exact Xero email"
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, xeroEmail: e.target.value };
                          persistRates(next);
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={p.hourly}
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, hourly: Number(e.target.value) };
                          persistRates(next);
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        step="0.01"
                        disabled={p.kind !== "employee"}
                        value={p.paygAmount}
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, paygAmount: Number(e.target.value) };
                          persistRates(next);
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        step="0.1"
                        disabled={p.kind !== "employee"}
                        value={p.superPct}
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, superPct: Number(e.target.value) };
                          persistRates(next);
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="checkbox"
                        className="size-4 accent-gold"
                        disabled={p.kind !== "contractor"}
                        checked={p.gstRegistered}
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, gstRegistered: e.target.checked };
                          persistRates(next);
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="checkbox"
                        className="size-4 accent-gold"
                        checked={p.drawings}
                        onChange={(e) => {
                          const next = rates.slice();
                          next[i] = { ...p, drawings: e.target.checked, hourly: e.target.checked ? 0 : p.hourly };
                          persistRates(next);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              persistRates([
                ...rates,
                {
                  id: `p${Date.now()}`,
                  name: "New person",
                  kind: "employee",
                  xeroEmail: "",
                  hourly: 0,
                  paygAmount: 0,
                  superPct: 12,
                  gstRegistered: false,
                  drawings: false,
                },
              ])
            }
          >
            Add person
          </Button>
        </section>
      ) : null}

      {tab === "chart" ? (
        <section className="metal-panel space-y-4 rounded-xl p-5">
          <p className="text-sm text-muted">Match the codes on this tab to your Xero chart. Defaults are SP working codes.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["wages", "477 wages"],
                ["superExpense", "478 super expense"],
                ["payg", "826 PAYG payable"],
                ["superPayable", "825 super payable"],
                ["bank", "090 bank / wages clearing"],
                ["contractors", "310 contractors"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  value={chart[key]}
                  onChange={(e) => persistChart({ ...chart, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "fortnight" ? (
        <>
          <section className="metal-panel space-y-4 rounded-xl p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="start">Fortnight start</Label>
                <Input id="start" type="date" value={start} onChange={(e) => { setStart(e.target.value); setApproved(false); }} />
              </div>
              <div>
                <Label htmlFor="end">Fortnight end</Label>
                <Input id="end" type="date" value={end} onChange={(e) => { setEnd(e.target.value); setApproved(false); }} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-widest text-muted">
                  <tr>
                    <th className="pb-2">Person</th>
                    <th className="pb-2">Kind</th>
                    <th className="pb-2">Hours</th>
                    <th className="pb-2">Gross</th>
                    <th className="pb-2">PAYG</th>
                    <th className="pb-2">SG on top</th>
                    <th className="pb-2">Net / bill</th>
                    <th className="pb-2">Pack</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => {
                    const row = hours.find((h) => h.personId === l.person.id);
                    return (
                      <tr key={l.person.id} className="border-t border-white/5">
                        <td className="py-2">{l.person.name}</td>
                        <td className="py-2 text-muted">{l.person.kind}</td>
                        <td className="py-2">
                          <Input
                            type="number"
                            step="0.25"
                            className="w-24"
                            value={row?.hours ?? 0}
                            onChange={(e) => setHour(l.person.id, Number(e.target.value))}
                          />
                        </td>
                        <td className="py-2 font-mono">{l.gross.toFixed(2)}</td>
                        <td className="py-2">
                          {l.person.kind === "employee" && !l.person.drawings ? (
                            <Input
                              type="number"
                              step="0.01"
                              className="w-24"
                              value={row?.paygOverride ?? l.person.paygAmount}
                              onChange={(e) => setPayg(l.person.id, Number(e.target.value))}
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="py-2 font-mono">{l.person.kind === "employee" ? l.superAmt.toFixed(2) : "—"}</td>
                        <td className="py-2 font-mono">{l.net.toFixed(2)}</td>
                        <td className="py-2 text-xs text-muted">{l.included ? "in" : l.skipReason}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted">
              Journal {bal.ok ? "balances" : "DOES NOT BALANCE"} · debit {bal.debit.toFixed(2)} · credit {bal.credit.toFixed(2)}. Super is
              on top of gross. Contractors go to bills only.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => setApproved(true)} disabled={!employees.length && !contractors.length}>
                Approve fortnight
              </Button>
              <Button type="button" onClick={downloadPack} disabled={!approved || !bal.ok}>
                Download Xero pack
              </Button>
              <Button type="button" onClick={() => void fileInSafe()} disabled={!approved}>
                Mark pack in Sam’s Safe
              </Button>
            </div>
            {approved ? <p className="text-sm text-aqua">Fortnight approved. Download, then file the pack for the bookkeeper.</p> : null}
            {msg ? <p className="text-sm text-aqua">{msg}</p> : null}
            {safeOn ? <p className="text-sm text-gold-hi">Safe: Finance · Xero drawer holds this pack.</p> : null}
          </section>

          <section className="metal-panel rounded-xl p-5 text-sm">
            <h2 className="mb-3 font-display text-lg text-gold-hi">Where each file goes</h2>
            <ul className="space-y-2 text-muted">
              <li>
                <span className="font-semibold text-gold-hi">wages-journal.csv</span> — Accounting → Manual journals → Import
              </li>
              <li>
                <span className="font-semibold text-gold-hi">timesheets.csv</span> — Payroll AU → Timesheets → Import (match Xero email on Rates)
              </li>
              <li>
                <span className="font-semibold text-gold-hi">contractor-bills.csv</span> — Bills → Import (subs invoice — no PAYG, no SG)
              </li>
            </ul>
          </section>
        </>
      ) : null}
    </div>
  );
}
