/** Connections plugin — public ids only. Secrets never persist. */

export type WireState = "UNWIRED" | "WIRED NOT LIVE" | "LIVE";

export const XERO_ID_KEY = "na.xero.clientId";
export const XERO_ORG_KEY = "na.xero.orgLabel";
export const TWILIO_SID_KEY = "na.twilio.accountSid";
export const TWILIO_FROM_KEY = "na.twilio.from";

export function readFlag(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function writeFlag(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    /* private */
  }
}

export function xeroState(clientId = readFlag(XERO_ID_KEY)): WireState {
  return clientId.trim() ? "WIRED NOT LIVE" : "UNWIRED";
}

export function twilioState(
  sid = readFlag(TWILIO_SID_KEY),
  from = readFlag(TWILIO_FROM_KEY),
): WireState {
  const okSid = /^AC[0-9a-f]{32}$/i.test(sid.trim());
  const okFrom = /^\+61\d{8,9}$/.test(from.trim()) || /^MG[0-9a-f]{32}$/i.test(from.trim());
  if (okSid && okFrom) return "WIRED NOT LIVE";
  return "UNWIRED";
}

export type PluginId = "xero" | "twilio" | "safe" | "maison";

export type PluginCard = {
  id: PluginId;
  name: string;
  desk: string;
  to: "/staff/payroll" | "/staff/vault" | "/staff/inbox" | "/staff/connections";
  state: WireState;
  purpose: string;
  liveWhen: string;
};

export function pluginCards(): PluginCard[] {
  return [
    {
      id: "xero",
      name: "Xero Custom Connection",
      desk: "Payroll pack",
      to: "/staff/payroll",
      state: xeroState(),
      purpose: "AU wages journal, timesheets and contractor bills. CSV import until the paid Custom Connection posts.",
      liveWhen:
        "LIVE only after Xero Custom Connection is authorised on the org and a server can hold the client secret. Client id may sit in this browser. Secret stays in Xero My Apps.",
    },
    {
      id: "twilio",
      name: "Twilio SMS",
      desk: "Crew SMS",
      to: "/staff/connections",
      state: twilioState(),
      purpose: "Jas / Kate / crew desk SMS in Australia. Trial accounts only reach verified mobiles.",
      liveWhen:
        "LIVE only after Accounts API 200, a From sender (+61 or MG), and Australia geo permissions. Auth token never lands in git or this page.",
    },
    {
      id: "safe",
      name: "Sam’s Safe",
      desk: "Vault",
      to: "/staff/vault",
      state: "LIVE",
      purpose: "Director vault for tax, BAS, super, finance packs and receipts.",
      liveWhen: "Signed-in Altier session. No third-party token.",
    },
    {
      id: "maison",
      name: "Maison analysis",
      desk: "Inbox",
      to: "/staff/inbox",
      state: "LIVE",
      purpose: "Public analysis form → analysis@nanoassure.net → Altier inbox.",
      liveWhen: "Public maison form is live. No phone book on the website.",
    },
  ];
}
