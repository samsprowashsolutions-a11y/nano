import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { xeroProbe, type XeroProbe } from "@/lib/server/xero";
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
  const [probe, setProbe] = useState<XeroProbe | null>(null);
  const [busy, setBusy] = useState(false);

  const cards = useMemo(() => pluginCards(), [tick]);
  const xeroLocal = xeroState(clientId);
  const xero = probe?.state ?? xeroLocal;
  const sms = twilioState(sid, from);

  function persist(key: string, value: string, setter: (v: string) => void) {
    const v = value.trim();
    setter(v);
    writeFlag(key, v);
    setTick((n) => n + 1);
  }

  async function verifyXero() {
    setBusy(true);
    try {
      const next = await xeroProbe();
      setProbe(next);
      setNote(next.reason ?? next.state);
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Verify failed. Stay signed in.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void verifyXero();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gold · Altier</p>
        <h1 className="gold-text font-display text-3xl">Connections plugin</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Xero Custom Connection uses client credentials on the suite host. Secret stays in env — never this page,
          never git. Until LIVE, the payroll pack is still CSV import.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.id} to={c.to} className="metal-panel rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-muted">{c.name}</p>
            <p className={`mt-1 font-mono text-sm ${badge(c.id === "xero" ? xero : c.state)}`}>
              {c.id === "xero" ? xero : c.state}
            </p>
            <p className="mt-2 text-sm text-muted">{c.desk}</p>
          </Link>
        ))}
      </div>

      <section className="metal-panel space-y-3 rounded-xl p-5">
        <h2 className="font-display text-lg text-gold-hi">Xero Custom Connection</h2>
        <p className="text-sm text-muted">
          Status <span className={badge(xero)}>{xero}</span>
          {probe?.orgName ? ` · ${probe.orgName}` : ""}. Paid Xero add-on. Token lasts 30 minutes and is requested
          again — no refresh token. New connections (after 29 Apr 2026) use granular scopes. This desk posts a{" "}
          <span className="text-gold-hi">DRAFT</span> manual journal only. You post it in Xero after review.
        </p>
        <label className="block text-sm text-muted">
          Client id reminder (this browser)
          <Input
            className="mt-1"
            value={clientId}
            placeholder="optional — live id is XERO_CLIENT_ID on the host"
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
          <Input className="mt-1" type="password" value="" readOnly placeholder="do not paste — XERO_CLIENT_SECRET on the host" />
        </label>
        <p className="text-xs text-muted">
          Host env: XERO_CLIENT_ID, XERO_CLIENT_SECRET, optional XERO_SCOPES (default accounting.manualjournals
          accounting.settings). Suite env / Netlify env only.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => void verifyXero()} disabled={busy}>
            {busy ? "Checking…" : "Verify Custom Connection"}
          </Button>
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
          Status <span className={badge(sms)}>{sms}</span>. Not this pass. SID + From may sit here. Auth token never
          does.
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
        </ul>
      </section>

      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}
