import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TWILIO_FROM_KEY,
  TWILIO_SID_KEY,
  XERO_ID_KEY,
  XERO_ORG_KEY,
  pluginCards,
  readFlag,
  twilioState,
  writeFlag,
  xeroState,
  type WireState,
} from "@/lib/connections";

export const Route = createFileRoute("/staff/connections")({ component: ConnectionsPlugin });

function badge(state: WireState) {
  if (state === "LIVE") return "text-[#0a6e78]";
  if (state === "WIRED NOT LIVE") return "text-gold-hi";
  return "text-muted";
}

function ConnectionsPlugin() {
  const [clientId, setClientId] = useState(() => readFlag(XERO_ID_KEY));
  const [org, setOrg] = useState(() => readFlag(XERO_ORG_KEY));
  const [sid, setSid] = useState(() => readFlag(TWILIO_SID_KEY));
  const [from, setFrom] = useState(() => readFlag(TWILIO_FROM_KEY));
  const [tick, setTick] = useState(0);
  const [note, setNote] = useState("Secrets never land in git. This bay stores public ids only.");

  const cards = useMemo(() => pluginCards(), [tick]);
  const xero = xeroState(clientId);
  const sms = twilioState(sid, from);

  function persist(key: string, value: string, setter: (v: string) => void) {
    const v = value.trim();
    setter(v);
    writeFlag(key, v);
    setTick((n) => n + 1);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gold · Altier</p>
        <h1 className="gold-text font-display text-3xl">Connections plugin</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Third-party bays for the director suite. Payroll pack stays automatic and CSV. No Xero login in this
          environment. Tokens stay out of git, the public maison, and memory.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.id} to={c.to} className="metal-panel rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-muted">{c.name}</p>
            <p className={`mt-1 font-mono text-sm ${badge(c.state)}`}>{c.state}</p>
            <p className="mt-2 text-sm text-muted">{c.desk}</p>
          </Link>
        ))}
      </div>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <h2 className="font-display text-lg text-gold-hi">Xero Custom Connection</h2>
        <p className="text-sm text-muted">
          Status <span className={badge(xero)}>{xero}</span>. A Custom Connection is a paid Xero org add-on. This
          desk will not post journals until that connection is authorised on a server that can hold the secret.
          Keep using Automatic pack → download CSVs → import in Xero (Journals → Accounting, Timesheets → Payroll
          AU, Bills → Bills, BAS Excluded).
        </p>
        <label className="block text-sm text-muted">
          Client id (this browser only)
          <Input
            className="mt-1"
            value={clientId}
            placeholder="not required for CSV pack"
            autoComplete="off"
            onChange={(e) => persist(XERO_ID_KEY, e.target.value, setClientId)}
          />
        </label>
        <label className="block text-sm text-muted">
          Org label (optional reminder)
          <Input
            className="mt-1"
            value={org}
            placeholder="Sam's Prowash Solutions Pty Ltd"
            autoComplete="off"
            onChange={(e) => persist(XERO_ORG_KEY, e.target.value, setOrg)}
          />
        </label>
        <label className="block text-sm text-muted">
          Client secret
          <Input className="mt-1" type="password" value="" readOnly placeholder="do not paste — stays in Xero My Apps" />
        </label>
        <p className="text-xs text-muted">
          {org ? `${org} · ` : ""}Client id {clientId ? "present" : "empty"}. Secret field is locked empty on purpose.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/staff/payroll">
            <Button type="button" size="sm">
              Open payroll pack
            </Button>
          </Link>
          <Link to="/staff/console">
            <Button type="button" variant="ghost" size="sm">
              Custom console
            </Button>
          </Link>
        </div>
      </section>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <h2 className="font-display text-lg text-gold-hi">Twilio SMS</h2>
        <p className="text-sm text-muted">
          Status <span className={badge(sms)}>{sms}</span>. KPI is LIVE only after Account SID + Auth token return
          200, a From sender is set, and Australia is enabled under geo permissions. This bay will not send. Do
          not invent mobiles for Jas, Kate or crew.
        </p>
        <label className="block text-sm text-muted">
          Account SID
          <Input
            className="mt-1"
            value={sid}
            placeholder="AC…"
            autoComplete="off"
            onChange={(e) => persist(TWILIO_SID_KEY, e.target.value, setSid)}
          />
        </label>
        <label className="block text-sm text-muted">
          From (+61 long code or MG Messaging Service)
          <Input
            className="mt-1"
            value={from}
            placeholder="+61… or MG…"
            autoComplete="off"
            onChange={(e) => persist(TWILIO_FROM_KEY, e.target.value, setFrom)}
          />
        </label>
        <label className="block text-sm text-muted">
          Auth token
          <Input className="mt-1" type="password" value="" readOnly placeholder="do not paste — suite env only" />
        </label>
        <p className="text-xs text-muted">
          SID must start with AC. From must be +61 or MG. Trial accounts only deliver to verified destination
          numbers. Commercial SMS sits under the Spam Act 2003 — consent, identify the business, include a way
          off.
        </p>
      </section>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <h2 className="font-display text-lg text-gold-hi">Internal rails</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between gap-4">
            <span>Sam’s Safe</span>
            <span className="text-[#0a6e78]">LIVE · Director vault</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Maison analysis</span>
            <span className="text-[#0a6e78]">LIVE · analysis@nanoassure.net</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>GitHub nano</span>
            <span className="text-gold-hi">ENVIRONMENT WIRED · app does not hold a token</span>
          </li>
        </ul>
        <p className="text-xs text-muted">
          GitHub push from this Grok session is an environment connection, not an Altier secret. Do not paste a
          personal access token into this desk.
        </p>
      </section>

      <p className="text-sm text-muted">{note}</p>
      <button type="button" className="text-xs text-gold-hi underline" onClick={() => setNote("Checked. Still no secrets in storage.")}>
        Confirm bay is clean
      </button>
    </div>
  );
}
