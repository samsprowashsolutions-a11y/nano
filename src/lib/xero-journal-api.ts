import { money, type BuiltLine, type ChartCodes } from "@/lib/xero-payroll";

export type JournalApiLine = { description: string; accountCode: string; amount: number };

/** Same AU wages journal as the CSV, for Xero Manual Journals API. */
export function wagesJournalLines(lines: BuiltLine[], chart: ChartCodes): JournalApiLine[] {
  const employees = lines.filter((l) => l.included && l.person.kind === "employee");
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
  if (!employees.length) return [];
  const out: JournalApiLine[] = [{ description: "Wages — ordinary time (gross)", accountCode: chart.wages, amount: wages }];
  if (superExp) out.push({ description: "Superannuation expense — SG on top of gross", accountCode: chart.superExpense, amount: superExp });
  if (payg) out.push({ description: "PAYG withholding payable", accountCode: chart.payg, amount: -payg });
  if (superPay) out.push({ description: "Superannuation payable", accountCode: chart.superPayable, amount: -superPay });
  out.push({ description: "Net wages clearing / bank", accountCode: chart.bank, amount: -bank });
  return out;
}
