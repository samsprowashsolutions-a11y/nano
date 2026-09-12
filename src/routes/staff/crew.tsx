import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { CREW_STEPS, VERIFY_ASKS, type CrewStepId } from "@/lib/field-flow";
import { VoiceCoach, speak } from "@/components/staff/voice-coach";
import { PackCard } from "@/components/staff/pack-frame";
import { ClimaScanBom } from "@/components/staff/climascan-bom";
import { PRODUCTS } from "@/lib/content";
import { GPS_PEOPLE, readPosition } from "@/lib/gps";
import { endGpsSession, getGpsDesk, startGpsSession } from "@/lib/server/gps";
import { listQaJobs, saveQaJob, saveOpsReport, setQaStep } from "@/lib/server/atelier";
import { savePrestart } from "@/lib/server/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/staff/crew")({ component: CrewWalk });

type Day = {
  date: string;
  person: string;
  site: string;
  client: string;
  product: string;
  answers: Partial<Record<CrewStepId, string>>;
  photos: Partial<Record<CrewStepId, string>>;
  done: CrewStepId[];
  jobId?: number;
  sessionId?: number;
  verify: string[];
};

const KEY = "na-crew-day";

function today() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Darwin" });
}

function load(): Day {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw) as Day;
      if (d.date === today()) return d;
    }
  } catch {
    /* ignore */
  }
  return {
    date: today(),
    person: "Crew",
    site: "",
    client: "",
    product: "",
    answers: {},
    photos: {},
    done: [],
    verify: [],
  };
}

function CrewWalk() {
  const gps = useQuery({ queryKey: ["gps-desk"], queryFn: () => getGpsDesk() });
  const jobs = useQuery({ queryKey: ["qa-jobs"], queryFn: () => listQaJobs() });
  const [day, setDay] = useState<Day>(load);
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const cur = CREW_STEPS[step];
  const incomplete = CREW_STEPS.filter((s) => !day.done.includes(s.id));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(day));
  }, [day]);

  useEffect(() => {
    speak(`${cur.title}. ${cur.ask}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const answer = day.answers[cur.id] ?? "";
  const filled = Boolean(answer.trim()) || day.done.includes(cur.id);

  function patch(p: Partial<Day>) {
    setDay((d) => ({ ...d, ...p }));
  }

  function setAnswer(text: string) {
    const next = { ...day.answers, [cur.id]: text };
    if (cur.id === "job") {
      const bits = text.split(/[.,]/).map((s) => s.trim()).filter(Boolean);
      patch({
        answers: next,
        site: bits[0] ?? day.site,
        client: bits[1] ?? day.client,
      });
      return;
    }
    if (cur.id === "signon" && text.trim()) {
      patch({ person: text.trim(), answers: next });
      return;
    }
    patch({ answers: next });
  }

  async function photo(file: File | null) {
    if (!file) return;
    const data = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = () => rej(r.error);
      r.readAsDataURL(file);
    });
    patch({ photos: { ...day.photos, [cur.id]: data } });
  }

  async function markDone() {
    const nextDone = day.done.includes(cur.id) ? day.done : [...day.done, cur.id];
    patch({ done: nextDone });
    setMsg("Saved.");
    if (step < CREW_STEPS.length - 1) setStep(step + 1);
  }

  async function onSignOn() {
    setBusy(true);
    setMsg("");
    try {
      const fix = await readPosition();
      const res = await startGpsSession({
        data: {
          person: day.person || "Crew",
          mode: "field",
          site: day.site || undefined,
          lat: fix.lat,
          lng: fix.lng,
          accuracy: fix.accuracy,
          insideFence: false,
          paidFrom: new Date().toISOString(),
        },
      });
      patch({ sessionId: res.id, done: day.done.includes("signon") ? day.done : [...day.done, "signon"] });
      setMsg("Clock started. GPS is on until you sign off.");
      setStep(1);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Sign on failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onSignOff() {
    const id = day.sessionId ?? gps.data?.live?.id;
    if (!id) {
      setMsg("No live session. You can still leave.");
      await markDone();
      return;
    }
    setBusy(true);
    try {
      await endGpsSession({ data: { sessionId: id } });
      patch({ done: day.done.includes("signoff") ? day.done : [...day.done, "signoff"] });
      setMsg("Clock stopped. GPS is off.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Sign off failed.");
    } finally {
      setBusy(false);
    }
  }

  async function saveThis() {
    setBusy(true);
    setMsg("");
    try {
      if (cur.id === "job") {
        const res = await saveQaJob({
          data: {
            clientName: day.client || answer || "Site client",
            site: day.site || answer || "Site",
            product: day.product || PRODUCTS[0]?.name || "NanoAssure",
            notes: answer || undefined,
          },
        });
        patch({ jobId: res.id });
      }
      if (cur.id === "prestart") {
        await savePrestart({
          data: {
            site: day.site || "Site",
            hazards: answer || undefined,
            ppe: "Yes",
            signedBy: day.person,
          },
        });
      }
      if (cur.qaKey && (day.jobId || jobs.data?.[0]?.id)) {
        const id = day.jobId ?? jobs.data?.[0]?.id ?? 0;
        if (id) {
          await setQaStep({
            data: {
              id,
              step: cur.qaKey,
              status: /hold/i.test(answer) ? "hold" : "passed",
            },
          });
        }
      }
      if (cur.id === "report") {
        await saveOpsReport({
          data: {
            reportDate: today(),
            sites: day.site || undefined,
            completed: answer,
            body: answer || "Daily report.",
            publishPublic: false,
            publishAtelier: true,
          },
        });
      }
      await markDone();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Saved on this phone. Desk save failed.");
      await markDone();
    } finally {
      setBusy(false);
    }
  }

  const live = Boolean(gps.data?.live);
  const dots = useMemo(
    () =>
      CREW_STEPS.map((s, i) => ({
        ...s,
        on: i === step,
        ok: day.done.includes(s.id),
      })),
    [day.done, step],
  );

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#0c1f4a]">
        Crew concierge · one job · one voice
      </p>

      {incomplete.length ? (
        <div className="need-do-banner">
          <span className="need-do-tag">Still to do</span>
          <p className="mt-2 text-lg font-extrabold text-[#9a3412]">
            {incomplete.map((s) => s.title).join(" · ")}
          </p>
          <p className="text-base text-[#9a3412]">Orange means not filled. Tap the number. Talk or type.</p>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-[#166534] bg-[#ecfdf3] p-4 text-[#166534]">
          <p className="text-lg font-extrabold">All twelve steps done for today.</p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {dots.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(i)}
            className={cn(
              "grid size-12 place-items-center rounded-full border-2 text-sm font-extrabold",
              s.ok && "border-[#166534] bg-[#ecfdf3] text-[#166534]",
              !s.ok && "need-do !size-12 !rounded-full",
              s.on && "ring-4 ring-[#d4af37]",
            )}
            aria-label={s.title}
          >
            {s.n}
          </button>
        ))}
      </div>

      <PackCard title={cur.title} n={cur.n} className={cn(!filled && "need-do")}>
        <p className="text-2xl font-extrabold leading-snug text-[#0c1f4a]">{cur.do}</p>
        <p className="mt-2 text-xl text-[#122038]">{cur.ask}</p>
        <p className="mt-1 text-base text-[#3d4a63]">{cur.hint}</p>

        {cur.id === "signon" ? (
          <div className="mt-4 grid gap-3">
            <label className="text-lg font-bold text-[#0c1f4a]">
              Who are you
              <select
                className="mt-1 h-16 w-full rounded-xl border-2 border-[#d4af37] bg-white px-4 text-xl"
                value={GPS_PEOPLE.includes(day.person as (typeof GPS_PEOPLE)[number]) ? day.person : "Crew"}
                onChange={(e) => patch({ person: e.target.value })}
              >
                {GPS_PEOPLE.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <VoiceCoach ask={cur.ask} value={day.person} onHeard={(t) => patch({ person: t })} />
            <button type="button" className="crew-btn crew-btn-gold" disabled={busy || live} onClick={() => void onSignOn()}>
              {live ? "Already signed on" : busy ? "Starting…" : "Sign on — start the clock"}
            </button>
          </div>
        ) : null}

        {cur.id === "job" ? (
          <div className="mt-4 grid gap-3">
            <input
              className="h-16 rounded-xl border-2 border-[#d4af37] px-4 text-xl"
              placeholder="Site"
              value={day.site}
              onChange={(e) => patch({ site: e.target.value })}
            />
            <input
              className="h-16 rounded-xl border-2 border-[#d4af37] px-4 text-xl"
              placeholder="Client"
              value={day.client}
              onChange={(e) => patch({ client: e.target.value })}
            />
            <select
              className="h-16 rounded-xl border-2 border-[#d4af37] bg-white px-4 text-xl"
              value={day.product}
              onChange={(e) => patch({ product: e.target.value })}
            >
              <option value="">Product</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {cur.id === "verify" ? (
          <div className="mt-4 space-y-3">
            <ClimaScanBom
              lat={gps.data?.live?.start_lat ?? gps.data?.fence?.lat}
              lng={gps.data?.live?.start_lng ?? gps.data?.fence?.lng}
              onFill={(line) => {
                const rest = day.verify.filter((v) => !v.startsWith("ClimaScan"));
                const note = `ClimaScan BOM ${line}`;
                patch({ verify: [note, ...rest], answers: { ...day.answers, verify: [note, ...rest].join("\n") } });
              }}
            />
            <ol className="space-y-2">
              {VERIFY_ASKS.map((q, i) => (
                <li key={q} className="rounded-xl border-2 border-[#d4af37] bg-white p-3 text-lg">
                  <button type="button" className="font-extrabold text-[#0c1f4a]" onClick={() => speak(q)}>
                    {i + 1}. {q}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {cur.id !== "signon" && cur.id !== "signoff" ? (
          <div className="mt-4 space-y-3">
            <VoiceCoach ask={cur.ask} value={answer} onHeard={setAnswer} />
            <textarea
              className="min-h-28 w-full rounded-xl border-2 border-[#d4af37] bg-white px-4 py-3 text-xl text-[#0c1f4a]"
              placeholder="Talk or type the answer here"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        ) : null}

        {cur.photo ? (
          <label className="crew-btn crew-btn-navy mt-3 block text-center">
            Take a photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => void photo(e.target.files?.[0] ?? null)}
            />
          </label>
        ) : null}
        {day.photos[cur.id] ? (
          <img src={day.photos[cur.id]} alt="" className="mt-3 max-h-48 w-full rounded-xl object-cover" />
        ) : cur.photo && !day.photos[cur.id] ? (
          <p className="need-do-tag mt-3 inline-block">Photo still needed</p>
        ) : null}

        {cur.id === "signoff" ? (
          <button type="button" className="crew-btn crew-btn-gold mt-4" disabled={busy} onClick={() => void onSignOff()}>
            Sign off — stop the clock
          </button>
        ) : cur.id !== "signon" ? (
          <button type="button" className="crew-btn crew-btn-gold mt-4" disabled={busy} onClick={() => void saveThis()}>
            {busy ? "Saving…" : "Next"}
          </button>
        ) : null}

        {msg ? <p className="mt-3 text-center text-lg font-bold text-[#0c1f4a]">{msg}</p> : null}
        <p className="mt-3 text-center text-sm">
          Full desk:{" "}
          <Link to={cur.to} className="font-bold text-[#8a6a18] underline">
            {cur.to.replace("/staff/", "")}
          </Link>
        </p>
      </PackCard>
    </div>
  );
}
