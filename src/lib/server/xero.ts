import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";

/** Granular scopes for Custom Connections created after 29 Apr 2026. */
export const XERO_SCOPES_DEFAULT = "accounting.manualjournals accounting.settings";

export type XeroProbe = {
  state: "UNWIRED" | "WIRED NOT LIVE" | "LIVE";
  hasId: boolean;
  hasSecret: boolean;
  orgName?: string;
  reason?: string;
};

function creds() {
  const clientId = (process.env.XERO_CLIENT_ID ?? "").trim();
  const clientSecret = (process.env.XERO_CLIENT_SECRET ?? "").trim();
  const scope = (process.env.XERO_SCOPES ?? XERO_SCOPES_DEFAULT).trim();
  return { clientId, clientSecret, scope };
}

async function token(): Promise<{ ok: true; access: string } | { ok: false; status: number; reason: string }> {
  const { clientId, clientSecret, scope } = creds();
  if (!clientId || !clientSecret) {
    return { ok: false, status: 0, reason: "XERO_CLIENT_ID and XERO_CLIENT_SECRET are not set on the suite." };
  }
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = new URLSearchParams({ grant_type: "client_credentials", scope });
  const res = await fetch("https://identity.xero.com/connect/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const text = await res.text();
  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      reason: res.status === 401 || res.status === 403 ? "Xero rejected the client id or secret." : `Token HTTP ${res.status}`,
    };
  }
  let parsed: { access_token?: string };
  try {
    parsed = JSON.parse(text) as { access_token?: string };
  } catch {
    return { ok: false, status: res.status, reason: "Xero token response was not JSON." };
  }
  if (!parsed.access_token) return { ok: false, status: res.status, reason: "Xero token response had no access_token." };
  return { ok: true, access: parsed.access_token };
}

export const xeroProbe = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async (): Promise<XeroProbe> => {
    const { clientId, clientSecret } = creds();
    const hasId = Boolean(clientId);
    const hasSecret = Boolean(clientSecret);
    if (!hasId && !hasSecret) {
      return { state: "UNWIRED", hasId, hasSecret, reason: "Set XERO_CLIENT_ID and XERO_CLIENT_SECRET on the host. Not in git." };
    }
    if (!hasId || !hasSecret) {
      return { state: "WIRED NOT LIVE", hasId, hasSecret, reason: "Both id and secret must sit in suite env." };
    }
    const tok = await token();
    if (!tok.ok) {
      return { state: "WIRED NOT LIVE", hasId, hasSecret, reason: tok.reason };
    }
    const orgRes = await fetch("https://api.xero.com/api.xro/2.0/Organisation", {
      headers: { Authorization: `Bearer ${tok.access}`, Accept: "application/json" },
    });
    if (!orgRes.ok) {
      return {
        state: "WIRED NOT LIVE",
        hasId,
        hasSecret,
        reason: `Token issued but Organisation returned HTTP ${orgRes.status}. Check scopes on the Custom Connection.`,
      };
    }
    const payload = (await orgRes.json()) as { Organisations?: { Name?: string }[] };
    const orgName = payload.Organisations?.[0]?.Name;
    return { state: "LIVE", hasId, hasSecret, orgName, reason: orgName ? `Connected to ${orgName}.` : "Token accepted." };
  });

const lineSchema = z.object({
  description: z.string().min(1).max(200),
  accountCode: z.string().min(1).max(20),
  amount: z.number(),
});

const journalSchema = z.object({
  narration: z.string().min(4).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lines: z.array(lineSchema).min(2).max(40),
});

export const xeroPostDraftJournal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(journalSchema)
  .handler(async ({ data }) => {
    const debit = data.lines.filter((l) => l.amount >= 0).reduce((s, l) => s + l.amount, 0);
    const credit = data.lines.filter((l) => l.amount < 0).reduce((s, l) => s + Math.abs(l.amount), 0);
    const bal = Math.round(debit * 100) === Math.round(credit * 100);
    if (!bal) {
      return { ok: false as const, reason: "Journal does not balance. Pack stays CSV-only." };
    }
    const tok = await token();
    if (!tok.ok) {
      return { ok: false as const, reason: tok.reason };
    }
    const payload = {
      Narration: data.narration,
      Date: data.date,
      Status: "DRAFT",
      LineAmountTypes: "NoTax",
      ShowOnCashBasisReports: false,
      JournalLines: data.lines.map((l) => ({
        Description: l.description,
        AccountCode: l.accountCode,
        LineAmount: l.amount,
        TaxType: "BASEXCLUDED",
      })),
    };
    const res = await fetch("https://api.xero.com/api.xro/2.0/ManualJournals", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tok.access}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (!res.ok) {
      return {
        ok: false as const,
        reason: `Xero journal HTTP ${res.status}. Keep using CSV import. ${text.slice(0, 180)}`,
      };
    }
    let id = "";
    try {
      const parsed = JSON.parse(text) as { ManualJournals?: { ManualJournalID?: string }[] };
      id = parsed.ManualJournals?.[0]?.ManualJournalID ?? "";
    } catch {
      /* id optional */
    }
    return { ok: true as const, id, reason: "Draft manual journal sits in Xero. Review then post there." };
  });
