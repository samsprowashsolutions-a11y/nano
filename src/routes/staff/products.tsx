import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, QA_TESTS, assuranceFor } from "@/lib/content";
import { PackCard, PackHex, PackStatus } from "@/components/staff/pack-frame";
import {
  CAN_USE_NOW,
  CHEMISTRY_HOLDS,
  CLAIM_HOLD,
  CLAIM_OK,
  CONFIRM_EACH_JOB,
  REMAINS_HOLD,
} from "@/lib/pack-sheets";

export const Route = createFileRoute("/staff/products")({ component: Products });

function Products() {
  const openHolds = PRODUCTS.filter((p) => (CHEMISTRY_HOLDS[p.id] ?? []).length > 0).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="need-do-banner">
        <span className="need-do-tag">Still to do</span>
        <p className="mt-2 text-lg font-extrabold text-[#9a3412]">
          {openHolds} chemistries have open HOLDs. TDS facts for crew match only. Method is never taught to the client.
        </p>
        <p className="mt-1 text-base text-[#9a3412]">
          Register versions on{" "}
          <Link to="/staff/compliance" className="font-bold underline">
            TDS / SDS
          </Link>
          . Stamp still sits with Roger / Nanoman.
        </p>
      </div>

      <PackCard title="Chemistry house rules" n="00">
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
            <p className="mb-2 font-extrabold text-[#c2410c]">HOLD until stamped</p>
            {CLAIM_HOLD.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
          </div>
          <div>
            <p className="mb-2 font-extrabold text-[#0c1f4a]">Confirm each job</p>
            {CONFIRM_EACH_JOB.map((x) => (
              <p key={x} className="pack-row text-base">
                {x}
              </p>
            ))}
            <p className="mt-3 text-sm text-[#3d4a63]">Ticks live on the crew walk. Not a client tutorial.</p>
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

      {PRODUCTS.map((p, i) => {
        const a = assuranceFor(p.id);
        const tests = QA_TESTS.filter((t) => a?.tests.includes(t.key));
        const holds = CHEMISTRY_HOLDS[p.id] ?? [];
        const n = String(i + 1).padStart(2, "0");
        return (
          <PackCard key={p.id} title={p.name} n={n} className={holds.length ? "need-do" : undefined}>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {holds.length ? <PackStatus state="hold">HOLD</PackStatus> : <PackStatus state="go">Internal use</PackStatus>}
                  {a ? <span className="font-mono text-sm font-bold text-[#0c1f4a]">{a.mark}</span> : null}
                </div>
                {a ? <p className="mt-2 font-display text-2xl text-[#0c1f4a]">{a.name}</p> : null}
                {a ? <p className="mt-1 text-base text-[#3d4a63]">{a.science}</p> : null}

                <dl className="mt-4 grid gap-2 text-base sm:grid-cols-2">
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">Substrate</dt>
                    <dd className="font-semibold text-[#122038]">{p.substrate}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">TDS</dt>
                    <dd className="font-semibold text-[#122038]">{p.tds}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">SDS</dt>
                    <dd className="font-semibold text-[#122038]">{p.sds}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">Coats</dt>
                    <dd className="font-semibold text-[#122038]">{p.coats}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">Coverage</dt>
                    <dd className="font-semibold text-[#122038]">{p.coverage}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">Window</dt>
                    <dd className="font-semibold text-[#122038]">{p.env}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">Cure</dt>
                    <dd className="font-semibold text-[#122038]">{p.dryTimes}</dd>
                  </div>
                  {p.apas ? (
                    <div>
                      <dt className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8a6a18]">APAS</dt>
                      <dd className="font-semibold text-[#122038]">{p.apas}</dd>
                    </div>
                  ) : null}
                </dl>
                <p className="mt-3 text-sm text-[#3d4a63]">{p.certNote}</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">NANODATA on this system</p>
                <div className="space-y-2">
                  {tests.map((t) => (
                    <div key={t.key} className="pack-step">
                      <PackHex n={t.n} className="!h-9 !w-10 !text-sm" />
                      <span className="text-lg font-extrabold text-[#0c1f4a]">{t.name}</span>
                    </div>
                  ))}
                </div>
                {holds.length ? (
                  <div className="need-do mt-4 rounded-xl p-3">
                    <p className="need-do-tag">Still to do</p>
                    <ul className="mt-2 space-y-1 text-base text-[#9a3412]">
                      {holds.map((h) => (
                        <li key={h}>· {h}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border-2 border-[#166534] bg-[#ecfdf3] p-3 text-base font-semibold text-[#166534]">
                    No open HOLD on this card.
                  </p>
                )}
              </div>
            </div>
          </PackCard>
        );
      })}
    </div>
  );
}
