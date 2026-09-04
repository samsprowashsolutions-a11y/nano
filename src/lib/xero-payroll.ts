/** NanoAssure™ payroll → Xero AU upload pack. No Xero login. */

export const DEFAULT_CHART = {
  wages: "477",
  superExpense: "478",
  payg: "826",
  superPayable: "825",
  bank: "090",
  contractors: "310",
} as const;

export type ChartCodes = { [K in keyof typeof DEFAULT_CHART]: string };

export type PersonKind = "employee" | "contractor" | "director";

export type RateRow = {
  id: string;
  name: string;
  kind: PersonKind;
  xeroEmail: string;
  hourly: number;
  paygAmount: number;
  superPct: number;
  gstRegistered: boolean;
  drawings: boolean;
  rosterHours: number;
};

export const SEED_RATES: RateRow[] = [
  {
    id: "sam",
    name: "Samantha Rae",
    kind: "director",
    xeroEmail: "samsprowashsolutions@gmail.com",
    hourly: 0,
    paygAmount: 0,
    superPct: 0,
    gstRegistered: false,
    drawings: true,
    rosterHours: 0,
  },
  {
    id: "kate",
    name: "Kate",
    kind: "employee",
    xeroEmail: "",
    hourly: 0,
    paygAmount: 0,
    superPct: 12,
    gstRegistered: false,
    drawings: false,
    rosterHours: 76,
  },
  {
    id: "jas",
    name: "Jas",
    kind: "employee",
    xeroEmail: "",
    hourly: 0,
    paygAmount: 0,
    superPct: 12,
    gstRegistered: false,
    drawings: false,
    rosterHours: 76,
  },
];

/** Monday that starts the Darwin fortnight grid. */
export const FORTNIGHT_EPOCH = "2026-08-24";
export const ROSTER_DEFAULT = 76;

export function darwinIsoToday(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Darwin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function addDaysIso(iso: string, days: number): string {
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function currentFortnight(today = darwinIsoToday()): { start: string; end: string } {
  const toUtc = (iso: string) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
  const days = Math.floor((toUtc(today) - toUtc(FORTNIGHT_EPOCH)) / 86_400_000);
  const start = addDaysIso(FORTNIGHT_EPOCH, Math.floor(days / 14) * 14);
  return { start, end: addDaysIso(start, 13) };
}

export function rosterHoursFor(person: RateRow): number {
  if (person.drawings || person.kind === "director") return 0;
  if (typeof person.rosterHours === "number") return person.rosterHours;
  return person.kind === "employee" ? ROSTER_DEFAULT : 0;
}

export function hoursFromRoster(rates: RateRow[]): FortnightLine[] {
  return rates.map((p) => ({ personId: p.id, hours: rosterHoursFor(p) }));
}

export function packReady(lines: BuiltLine[], balOk: boolean): { ok: boolean; blockers: string[] } {
  const blockers: string[] = [];
  const inc = lines.filter((l) => l.included);
  if (!inc.length) blockers.push("Set $/hr and roster hours on Rates — Sam at $0 stays out.");
  for (const l of inc) {
    if (l.person.kind === "employee" && !l.person.xeroEmail.trim()) {
      blockers.push(`${l.person.name} needs the exact Xero email.`);
    }
    if (!(l.person.hourly > 0)) blockers.push(`${l.person.name} needs a $/hr rate.`);
  }
  if (!balOk && inc.some((l) => l.person.kind === "employee")) blockers.push("Journal does not balance.");
  return { ok: blockers.length === 0, blockers };
}

export type FortnightLine = {
  personId: string;
  hours: number;
  paygOverride?: number;
};

export type BuiltLine = {
  person: RateRow;
  hours: number;
  gross: number;
  payg: number;
  superAmt: number;
  net: number;
  included: boolean;
  skipReason?: string;
};

export const TAX_NONE = "BAS Excluded";
export const SG_DEFAULT = 12;

export function money(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function csvEscape(v: string | number): string {
  const s = String(v ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function toCsv(headers: string[], rows: (string | number)[][]): string {
  const lines = [headers.map(csvEscape).join(",")];
  for (const row of rows) lines.push(row.map(csvEscape).join(","));
  return `${lines.join("\r\n")}\r\n`;
}

export function auDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!d) return iso;
  return `${d}/${m}/${y}`;
}

export function buildLines(rates: RateRow[], hours: FortnightLine[]): BuiltLine[] {
  return rates.map((person) => {
    const row = hours.find((h) => h.personId === person.id);
    const hrs = row?.hours ?? 0;
    const gross = money(hrs * (person.hourly || 0));
    if (person.drawings || (person.kind === "director" && gross === 0)) {
      return {
        person,
        hours: hrs,
        gross: 0,
        payg: 0,
        superAmt: 0,
        net: 0,
        included: false,
        skipReason: "Sam at $0 — drawings. Left out of the pack.",
      };
    }
    if (person.kind === "contractor") {
      return {
        person,
        hours: hrs,
        gross,
        payg: 0,
        superAmt: 0,
        net: gross,
        included: gross > 0,
        skipReason: gross > 0 ? undefined : "No hours this fortnight.",
      };
    }
    const payg = money(row?.paygOverride ?? person.paygAmount ?? 0);
    const superAmt = money(gross * ((person.superPct ?? SG_DEFAULT) / 100));
    const net = money(gross - payg);
    return {
      person,
      hours: hrs,
      gross,
      payg,
      superAmt,
      net,
      included: gross > 0,
      skipReason: gross > 0 ? undefined : "No hours this fortnight.",
    };
  });
}

export function wagesJournalCsv(
  lines: BuiltLine[],
  chart: ChartCodes,
  periodEnd: string,
  narration: string,
): string {
  const employees = lines.filter((l) => l.included && l.person.kind === "employee");
  const headers = [
    "Narration",
    "Date",
    "Description",
    "AccountCode",
    "TaxRate",
    "Amount",
    "TrackingName1",
    "TrackingOption1",
    "TrackingName2",
    "TrackingOption2",
  ];
  const date = auDate(periodEnd);
  const rows: (string | number)[][] = [];
  const push = (desc: string, code: string, amount: number, first: boolean) => {
    rows.push([
      first ? narration : "",
      first ? date : "",
      desc,
      code,
      TAX_NONE,
      amount.toFixed(2),
      "",
      "",
      "",
      "",
    ]);
  };
  let first = true;
  let wages = 0;
  let superExp = 0;
  let payg = 0;
  let superPay = 0;
  let bank = 0;
  for (const l of employees) {
    wages = money(wages + l.gross);
    superExp = money(superExp + l.superAmt);
    payg = money(payg + l.payg);
    superPay = money(superPay + l.superAmt);
    bank = money(bank + l.net);
  }
  if (!employees.length) return toCsv(headers, []);
  push("Wages — ordinary time (gross)", chart.wages, wages, first);
  first = false;
  if (superExp) push("Superannuation expense — SG on top of gross", chart.superExpense, superExp, false);
  if (payg) push("PAYG withholding payable", chart.payg, -payg, false);
  if (superPay) push("Superannuation payable", chart.superPayable, -superPay, false);
  push("Net wages clearing / bank", chart.bank, -bank, false);
  return toCsv(headers, rows);
}

export function timesheetsCsv(lines: BuiltLine[], periodStart: string, periodEnd: string): string {
  const headers = ["Email", "FirstName", "LastName", "StartDate", "EndDate", "Date", "Units", "EarningsRate", "Comments"];
  const rows: (string | number)[][] = [];
  for (const l of lines) {
    if (!l.included || l.person.kind !== "employee") continue;
    const parts = l.person.name.trim().split(/\s+/);
    const first = parts[0] ?? "";
    const last = parts.slice(1).join(" ") || first;
    rows.push([
      l.person.xeroEmail,
      first,
      last,
      auDate(periodStart),
      auDate(periodEnd),
      auDate(periodEnd),
      l.hours.toFixed(2),
      "Ordinary Hours",
      `SP NanoAssure™ fortnight ${auDate(periodStart)}–${auDate(periodEnd)}`,
    ]);
  }
  return toCsv(headers, rows);
}

export function contractorBillsCsv(lines: BuiltLine[], chart: ChartCodes, periodEnd: string): string {
  const headers = [
    "ContactName",
    "EmailAddress",
    "POAddressLine1",
    "POAddressLine2",
    "POAddressLine3",
    "POAddressLine4",
    "POCity",
    "PORegion",
    "POPostalCode",
    "POCountry",
    "InvoiceNumber",
    "Reference",
    "InvoiceDate",
    "DueDate",
    "InventoryItemCode",
    "Description",
    "Quantity",
    "UnitAmount",
    "Discount",
    "AccountCode",
    "TaxType",
    "TrackingName1",
    "TrackingOption1",
    "TrackingName2",
    "TrackingOption2",
    "Currency",
  ];
  const rows: (string | number)[][] = [];
  const date = auDate(periodEnd);
  const stamp = periodEnd.replace(/-/g, "");
  for (const l of lines) {
    if (!l.included || l.person.kind !== "contractor") continue;
    const slug = l.person.name.replace(/[^A-Za-z0-9]+/g, "").slice(0, 8).toUpperCase() || "SUB";
    rows.push([
      l.person.name,
      l.person.xeroEmail,
      "",
      "",
      "",
      "",
      "Darwin",
      "NT",
      "0812",
      "Australia",
      `SUB-${stamp}-${slug}`,
      `SP NanoAssure contractor · ${auDate(periodEnd)}`,
      date,
      date,
      "",
      `Subcontract labour ${l.hours.toFixed(2)} hrs — no PAYG, no SG`,
      l.hours.toFixed(2),
      (l.person.hourly || 0).toFixed(2),
      "",
      chart.contractors,
      l.person.gstRegistered ? "GST on Expenses" : TAX_NONE,
      "",
      "",
      "",
      "",
      "AUD",
    ]);
  }
  return toCsv(headers, rows);
}

export function packReadme(periodStart: string, periodEnd: string, lines: BuiltLine[]): string {
  const inc = lines.filter((l) => l.included);
  const skip = lines.filter((l) => !l.included);
  return [
    "SP NanoAssure™ · Xero upload pack",
    "Sam's Prowash Solutions Pty Ltd · ABN 95 698 841 128 · Darwin NT",
    `Fortnight ${auDate(periodStart)} – ${auDate(periodEnd)}`,
    "",
    "There is no Xero login in this environment.",
    "Download these files. Import them where Xero actually accepts them.",
    "",
    "File                         Goes into Xero",
    "---------------------------  ------------------------------------------",
    "wages-journal.csv            Accounting → Manual journals → Import",
    "timesheets.csv               Payroll AU → Timesheets → Import",
    "contractor-bills.csv         Bills → Import  (subs invoice — no PAYG, no SG)",
    "",
    "Journal is AU-correct: debits positive, credits negative.",
    "Super is on top of gross, not taken from net.",
    "Sam at $0 is left out (drawings).",
    "Tax rate on the journal is BAS Excluded (wages are not GST).",
    "",
    "Included this pack:",
    ...inc.map((l) => `- ${l.person.name} (${l.person.kind}) ${l.hours}h gross ${l.gross.toFixed(2)} PAYG ${l.payg.toFixed(2)} SG ${l.superAmt.toFixed(2)} net ${l.net.toFixed(2)}`),
    "",
    "Left out:",
    ...skip.map((l) => `- ${l.person.name}: ${l.skipReason ?? "skipped"}`),
    "",
    "Map each person's Xero email on the Rates tab before import.",
    "Mark the uploaded files in Sam's Safe for the bookkeeper.",
  ].join("\n");
}

export function journalBalances(csv: string): { debit: number; credit: number; ok: boolean } {
  const lines = csv.trim().split(/\r?\n/).slice(1);
  let debit = 0;
  let credit = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts: string[] = [];
    let cur = "";
    let q = false;
    for (const ch of line) {
      if (ch === '"') q = !q;
      else if (ch === "," && !q) {
        parts.push(cur);
        cur = "";
      } else cur += ch;
    }
    parts.push(cur);
    const amt = Number(parts[5] ?? 0);
    if (amt >= 0) debit = money(debit + amt);
    else credit = money(credit + Math.abs(amt));
  }
  return { debit, credit, ok: debit === credit };
}
