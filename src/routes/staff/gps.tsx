import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DeskCard, DeskHeader } from "@/components/staff/desk";
import {
  DEFAULT_FENCE,
  GPS_PEOPLE,
  darwinNow,
  insideFence,
  metresBetween,
  officePaidFrom,
  readPosition,
  type Fix,
} from "@/lib/gps";
import { endGpsSession, getGpsDesk, saveGpsFence, startGpsSession } from "@/lib/server/gps";

export const Route = createFileRoute("/staff/gps")({ component: GpsDesk });

function GpsDesk() {
  const desk = useQuery({ queryKey: ["gps-desk"], queryFn: () => getGpsDesk() });
  const fence = desk.data?.fence;
  const live = desk.data?.live;
  const [msg, setMsg] = useState("");
  const [fix, setFix] = useState<Fix | null>(null);
  const [busy, setBusy] = useState(false);
  const [person, setPerson] = useState<(typeof GPS_PEOPLE)[number]>("Kate");
  const [site, setSite] = useState("");

  const radius = fence?.radius_m ?? DEFAULT_FENCE.radiusM;
  const centre = fence
    ? { lat: Number(fence.lat), lng: Number(fence.lng), radiusM: radius }
    : { lat: DEFAULT_FENCE.lat, lng: DEFAULT_FENCE.lng, radiusM: DEFAULT_FENCE.radiusM };
  const inFence = fix ? insideFence(fix, centre) : null;
  const distance = fix ? Math.round(metresBetween(fix, centre)) : null;

  async function locate() {
    setBusy(true);
    setMsg("");
    try {
      const next = await readPosition();
      setFix(next);
      setMsg(`Fix ±${Math.round(next.accuracy)} m.`);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "GPS failed.");
    } finally {
      setBusy(false);
    }
  }

  async function signOn(mode: "office" | "field") {
    setBusy(true);
    setMsg("");
    try {
      const next = fix ?? (await readPosition());
      setFix(next);
      const inside = insideFence(next, centre);
      if (mode === "office" && !inside) {
        setMsg(`Outside the office fence (${Math.round(metresBetween(next, centre))} m). Use Field, or stand at ${fence?.address ?? DEFAULT_FENCE.address}.`);
        setBusy(false);
        return;
      }
      const paidFrom =
        mode === "office" && inside
          ? officePaidFrom(new Date(), fence?.start_hour ?? 9).toISOString()
          : new Date().toISOString();
      await startGpsSession({
        data: {
          person,
          mode,
          site: mode === "field" ? site || undefined : fence?.address,
          lat: next.lat,
          lng: next.lng,
          accuracy: next.accuracy,
          insideFence: inside,
          paidFrom,
        },
      });
      setMsg(mode === "office" ? "Office session live. Paid clock started. 30-minute logs while Altier is open." : "Field session live. Warranty / payroll pings every 30 minutes until Sign off.");
      void desk.refetch();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not sign on.");
    } finally {
      setBusy(false);
    }
  }

  async function signOff() {
    if (!live) return;
    setBusy(true);
    try {
      const res = await endGpsSession({ data: { sessionId: live.id } });
      setMsg(`Signed off. ${res.hours.toFixed(2)} h to payroll.`);
      void desk.refetch();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not sign off.");
    } finally {
      setBusy(false);
    }
  }

  async function onFence(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lat = Number(fd.get("lat"));
    const lng = Number(fd.get("lng"));
    await saveGpsFence({
      data: {
        label: String(fd.get("label") || "Office"),
        address: String(fd.get("address") || ""),
        lat,
        lng,
        radiusM: Number(fd.get("radiusM") || 150),
        startHour: Number(fd.get("startHour") || 9),
        endHour: Number(fd.get("endHour") || 15),
      },
    });
    setMsg("Fence updated. Changeable any time.");
    void desk.refetch();
  }

  async function pinHere() {
    const next = fix ?? (await readPosition());
    setFix(next);
    await saveGpsFence({
      data: {
        label: fence?.label ?? "Office",
        address: fence?.address ?? DEFAULT_FENCE.address,
        lat: next.lat,
        lng: next.lng,
        radiusM: radius,
        startHour: fence?.start_hour ?? 9,
        endHour: fence?.end_hour ?? 15,
      },
    });
    setMsg("Fence pinned to this phone.");
    void desk.refetch();
  }

  const d = darwinNow();
  const bbox = `${centre.lng - 0.008},${centre.lat - 0.006},${centre.lng + 0.008},${centre.lat + 0.006}`;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <DeskHeader
        kicker="Teal · Payroll & warranty tracker"
        title="GPS log"
        copy="Nothing is tracked until Sign on. Office geofence is 17 Driffield Street, Anula — changeable. Field pings every 30 minutes while Altier stays open. Sign off stops it."
      />

      <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-[#3a342c]">
        Darwin {d.weekday} {d.day}/{d.month} {String(d.hour).padStart(2, "0")}:{String(d.minute).padStart(2, "0")} ACST.
        Kate / Jas: stand at the office, Sign on. Paid from {fence?.start_hour ?? 9}:00 if inside the fence. Sign off at {fence?.end_hour ?? 15}:00.
        Browsers cannot log in the background once the phone sleeps — keep Altier open, or Sign off.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <DeskCard>
          <h2 className="font-display text-xl text-gold-hi">Sign on</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="person">Who</Label>
              <select
                id="person"
                className="h-12 w-full rounded-xl border border-chrome/20 bg-carbon-2 px-4 text-base"
                value={person}
                onChange={(e) => setPerson(e.target.value as (typeof GPS_PEOPLE)[number])}
              >
                {GPS_PEOPLE.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="site">Field site (optional)</Label>
              <Input id="site" value={site} onChange={(e) => setSite(e.target.value)} placeholder="Asset / job" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" disabled={busy} onClick={() => void locate()}>
              Read GPS
            </Button>
            <Button type="button" disabled={busy || Boolean(live)} variant="aqua" onClick={() => void signOn("office")}>
              Office sign on
            </Button>
            <Button type="button" disabled={busy || Boolean(live)} onClick={() => void signOn("field")}>
              Field sign on
            </Button>
            <Button type="button" disabled={busy || !live} variant="ghost" onClick={() => void signOff()}>
              Sign off
            </Button>
          </div>
          {fix ? (
            <p className="mt-3 font-mono text-sm text-muted">
              {fix.lat.toFixed(6)}, {fix.lng.toFixed(6)} · ±{Math.round(fix.accuracy)} m
              {distance != null ? ` · ${distance} m from fence` : ""} · {inFence ? "INSIDE" : "OUTSIDE"}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">Allow location once. High-accuracy GPS. No movement log until Sign on.</p>
          )}
          {live ? (
            <p className="mt-3 rounded-lg border border-ok/40 bg-ok/10 px-3 py-2 text-sm">
              Live · {live.person} · {live.mode} · paid from {new Date(live.paid_from).toLocaleString("en-AU", { timeZone: "Australia/Darwin" })}
            </p>
          ) : null}
          {msg ? <p className="mt-3 text-sm text-gold-hi">{msg}</p> : null}
          <p className="mt-4 text-sm">
            Hours land on{" "}
            <Link to="/staff/payroll" className="text-gold-hi underline">
              Payroll → Xero
            </Link>
            . Warranty sites stay on the session.
          </p>
        </DeskCard>

        <DeskCard>
          <h2 className="font-display text-xl text-gold-hi">Office fence</h2>
          <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={(e) => void onFence(e)}>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={fence?.address ?? DEFAULT_FENCE.address} required />
            </div>
            <div>
              <Label htmlFor="label">Label</Label>
              <Input id="label" name="label" defaultValue={fence?.label ?? "Office"} />
            </div>
            <div>
              <Label htmlFor="radiusM">Radius (m)</Label>
              <Input id="radiusM" name="radiusM" type="number" defaultValue={fence?.radius_m ?? 150} />
            </div>
            <div>
              <Label htmlFor="lat">Latitude</Label>
              <Input id="lat" name="lat" defaultValue={String(fence?.lat ?? DEFAULT_FENCE.lat)} />
            </div>
            <div>
              <Label htmlFor="lng">Longitude</Label>
              <Input id="lng" name="lng" defaultValue={String(fence?.lng ?? DEFAULT_FENCE.lng)} />
            </div>
            <div>
              <Label htmlFor="startHour">Paid from (hour)</Label>
              <Input id="startHour" name="startHour" type="number" defaultValue={fence?.start_hour ?? 9} />
            </div>
            <div>
              <Label htmlFor="endHour">Sign off (hour)</Label>
              <Input id="endHour" name="endHour" type="number" defaultValue={fence?.end_hour ?? 15} />
            </div>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button type="submit">Save fence</Button>
              <Button type="button" variant="ghost" onClick={() => void pinHere()}>
                Pin fence to this phone
              </Button>
            </div>
          </form>
        </DeskCard>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gold/20">
        <iframe
          title="Office geofence"
          className="h-[320px] w-full"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${centre.lat}%2C${centre.lng}`}
        />
      </div>

      <DeskCard>
        <h2 className="font-display text-xl text-gold-hi">Sessions</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted">
              <tr>
                <th className="pb-2">Who</th>
                <th className="pb-2">Mode</th>
                <th className="pb-2">Paid from</th>
                <th className="pb-2">Off</th>
                <th className="pb-2">Hours</th>
                <th className="pb-2">Fence</th>
              </tr>
            </thead>
            <tbody>
              {(desk.data?.sessions ?? []).map((s) => (
                <tr key={s.id} className="border-t border-gold/15">
                  <td className="py-2">{s.person}</td>
                  <td>{s.mode}</td>
                  <td>{new Date(s.paid_from).toLocaleString("en-AU", { timeZone: "Australia/Darwin" })}</td>
                  <td>
                    {s.ended_at
                      ? new Date(s.ended_at).toLocaleString("en-AU", { timeZone: "Australia/Darwin" })
                      : "LIVE"}
                  </td>
                  <td>{s.hours != null ? Number(s.hours).toFixed(2) : "—"}</td>
                  <td>{s.inside_fence ? "in" : "out"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DeskCard>
    </div>
  );
}
