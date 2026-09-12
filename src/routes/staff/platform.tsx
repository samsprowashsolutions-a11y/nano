import { createFileRoute } from "@tanstack/react-router";
import { MasterIndex, PlatformList } from "@/components/staff/platform-list";
import { PackCard, PackHex, PackStatus } from "@/components/staff/pack-frame";
import {
  APPROVAL_CHAIN,
  CAN_USE_NOW,
  CLAIM_HOLD,
  CLAIM_OK,
  CLARIFY_NEEDS,
  COMMERCIAL_LOGIC,
  COMMERCIAL_PRINCIPLES,
  CONFIRM_EACH_JOB,
  FUNNEL,
  HOLD_REGISTER,
  HOLD_WHY,
  HOW_TO_USE,
  KEY_OUTPUTS,
  NANODATA_CAPTURES,
  NANODATA_WHY,
  OPPORTUNITY_ROWS,
  REMAINS_HOLD,
  RELEASE_CONDITIONS,
  SCENARIO,
  SOURCE_DOCS,
  SOURCE_HIERARCHY,
  VALUE_PILLARS,
  WHO_SIGNS,
} from "@/lib/pack-sheets";

export const Route = createFileRoute("/staff/platform")({ component: PlatformIndex });

function PlatformIndex() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#0c1f4a]">
        Real opportunities · real evidence · a cleaner, safer, stronger Australia
      </p>

      <PackCard title="Master index" n="00">
        <p className="mb-3 text-base text-[#3d4a63]">Roger briefing pack structure. Tap a row. Orange means still to do.</p>
        <MasterIndex />
      </PackCard>

      <div id="sheet-01" />
      <PackCard title="Executive introduction" n="01">
        <div className="grid gap-3 sm:grid-cols-2">
          {VALUE_PILLARS.map((p) => (
            <div key={p.title} className="pack-pillar text-left">
              <h3 className="text-lg text-[#0c1f4a]">{p.title}</h3>
              <p className="mt-1 text-base text-[#3d4a63]">{p.copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <PackStatus state="go">GO — approve and proceed</PackStatus>
          <PackStatus state="amend">AMEND — approve with changes</PackStatus>
          <PackStatus state="hold">HOLD — defer for now</PackStatus>
        </div>
      </PackCard>

      <div id="sheet-02" />
      <PackCard title="NANODATA" n="02">
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">What it captures</p>
            <ul className="space-y-1 text-base text-[#122038]">
              {NANODATA_CAPTURES.map((x) => (
                <li key={x}>· {x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Five-step process</p>
            {["Inspect", "Prepare", "Apply", "Verify", "Record"].map((s, i) => (
              <div key={s} className="pack-step">
                <PackHex n={String(i + 1)} className="!h-9 !w-10 !text-sm" />
                <span className="text-lg font-extrabold text-[#0c1f4a]">{s}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Why it matters</p>
            {NANODATA_WHY.map((x) => (
              <p key={x.title} className="pack-row">
                <span>
                  <b className="text-[#0c1f4a]">{x.title}.</b> {x.copy}
                </span>
              </p>
            ))}
          </div>
        </div>
      </PackCard>

      <div id="sheet-04" />
      <PackCard title="Market analysis program" n="04">
        <p className="mb-3 text-base text-[#3d4a63]">Paid $1,000 market-validation pathway. Not a claimed completed job.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {FUNNEL.map((f) => (
            <div key={f.n} className="pack-pillar">
              <PackHex n={f.n} className="mx-auto !h-10 !w-11" />
              <h3 className="mt-2 text-lg text-[#0c1f4a]">{f.title}</h3>
              <p className="text-base text-[#3d4a63]">{f.copy}</p>
            </div>
          ))}
        </div>
      </PackCard>

      <div id="sheet-07" />
      <PackCard title="Commercial model" n="07">
        <div className="grid gap-3 lg:grid-cols-2">
          <ul className="space-y-2">
            {COMMERCIAL_LOGIC.map((x) => (
              <li key={x.title} className="pack-row">
                <span>
                  <b className="text-[#0c1f4a]">{x.title}.</b> {x.copy}
                </span>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {COMMERCIAL_PRINCIPLES.map((x) => (
              <li key={x.title} className="pack-row">
                <span>
                  <b className="text-[#0c1f4a]">{x.title}.</b> {x.copy}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="pack-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th>10 sites</th>
                <th>20 sites</th>
                <th>30 sites</th>
                <th>40 sites</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIO.map((r) => (
                <tr key={r.factor}>
                  <td className="font-bold">{r.factor}</td>
                  <td>{r.a}</td>
                  <td>{r.b}</td>
                  <td>{r.c}</td>
                  <td>{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PackCard>

      <div id="sheet-09" />
      <PackCard title="Technical approval matrix" n="09">
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          {CLARIFY_NEEDS.map((x, i) => (
            <div key={x.title} className="flex gap-3 rounded-xl border border-[#d4af37]/50 bg-[#f7fbff] p-3">
              <PackHex n={String(i + 1).padStart(2, "0")} className="!h-9 !w-10 !text-[.65rem]" />
              <div>
                <p className="font-extrabold text-[#0c1f4a]">{x.title}</p>
                <p className="text-sm text-[#3d4a63]">{x.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="pack-table">
            <thead>
              <tr>
                <th>Opportunity</th>
                <th>Clarification needed</th>
                <th>Current status</th>
                <th>Next step</th>
              </tr>
            </thead>
            <tbody>
              {OPPORTUNITY_ROWS.map((r) => (
                <tr key={r.name}>
                  <td className="font-bold">{r.name}</td>
                  <td>{r.need}</td>
                  <td>
                    <PackStatus state={r.status}>{r.statusLabel}</PackStatus>
                  </td>
                  <td>{r.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#3d4a63]">Working templates. Not claimed completed jobs.</p>
      </PackCard>

      <div id="sheet-10" />
      <PackCard title="Sources & approvals" n="10">
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Source hierarchy</p>
            {SOURCE_HIERARCHY.map((s) => (
              <div key={s.n} className="pack-step">
                <PackHex n={s.n} className="!h-8 !w-9 !text-[.65rem]" />
                <span>
                  <b className="text-[#0c1f4a]">{s.title}</b>
                  <span className="block text-sm text-[#3d4a63]">{s.copy}</span>
                </span>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Approval flow</p>
            {APPROVAL_CHAIN.map((s) => (
              <div key={s.n} className="pack-step">
                <PackHex n={s.n} className="!h-8 !w-9 !text-[.65rem]" />
                <span>
                  <b className="text-[#0c1f4a]">{s.title}</b>
                  <span className="block text-sm text-[#3d4a63]">{s.copy}</span>
                </span>
              </div>
            ))}
            <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Who signs</p>
            {WHO_SIGNS.map((s) => (
              <p key={s.who} className="pack-row text-sm">
                <span>
                  <b>{s.who}.</b> {s.copy}
                </span>
              </p>
            ))}
          </div>
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Source documents</p>
            {SOURCE_DOCS.map((s) => (
              <p key={s.title} className="pack-row text-sm">
                <span>
                  <b>{s.title}.</b> {s.copy}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border-2 border-[#166534] bg-[#ecfdf3] p-3">
            <p className="font-extrabold uppercase tracking-wide text-[#166534]">Can be used now</p>
            <ul className="mt-2 space-y-1 text-base">
              {CAN_USE_NOW.map((x) => (
                <li key={x}>✓ {x}</li>
              ))}
            </ul>
          </div>
          <div className="need-do rounded-xl p-3">
            <p className="need-do-tag">Remains on HOLD</p>
            <ul className="mt-2 space-y-1 text-base">
              {REMAINS_HOLD.map((x) => (
                <li key={x}>✕ {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </PackCard>

      <div id="sheet-03" />
      <PackCard title="HOLD register" n="03">
        <div className="grid gap-4 lg:grid-cols-[.8fr_1.4fr_.8fr]">
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Why items go on HOLD</p>
            {HOLD_WHY.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="pack-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {HOLD_REGISTER.map((r) => (
                  <tr key={r.n} className="need-do-row">
                    <td>{r.n}</td>
                    <td className="font-bold">{r.item}</td>
                    <td>
                      <PackStatus state="hold">HOLD</PackStatus>
                    </td>
                    <td>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">Release conditions</p>
            {RELEASE_CONDITIONS.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
          </div>
        </div>
      </PackCard>

      <PackCard title="Controlled claim wording">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className="mb-2 font-extrabold text-[#166534]">Approved to say</p>
            {CLAIM_OK.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
          </div>
          <div className="need-do rounded-xl p-3">
            <p className="mb-2 font-extrabold text-[#c2410c]">HOLD until approved</p>
            {CLAIM_HOLD.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
          </div>
          <div>
            <p className="mb-2 font-extrabold text-[#0c1f4a]">Must confirm each job</p>
            {CONFIRM_EACH_JOB.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
          </div>
        </div>
      </PackCard>

      <PackCard title="How to use these pages">
        <div className="grid gap-2 sm:grid-cols-2">
          {HOW_TO_USE.map((x) => (
            <p key={x.title} className="pack-row">
              <span>
                <b className="text-[#0c1f4a]">{x.title}.</b> {x.copy}
              </span>
            </p>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_OUTPUTS.map((x) => (
            <div key={x.title} className="pack-pillar">
              <h3 className="text-lg text-[#0c1f4a]">{x.title}</h3>
              <p className="text-sm text-[#3d4a63]">{x.copy}</p>
            </div>
          ))}
        </div>
      </PackCard>

      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0c1f4a]">
          Executive operating index · 23 modules
        </p>
        <h2 className="font-display text-4xl text-[#0c1f4a] md:text-5xl">The house — by category</h2>
      </header>
      <PlatformList />
    </div>
  );
}
