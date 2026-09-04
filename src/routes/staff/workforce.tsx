import { createFileRoute, Link } from "@tanstack/react-router";
import { SEED_APPLICATIONS, SEED_EMPLOYEES, SEED_VACANCIES } from "@/lib/content";

export const Route = createFileRoute("/staff/workforce")({ component: Workforce });

function Workforce() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Teal · Operations framework</p>
        <h1 className="gold-text font-display text-3xl">Employment & Workforce</h1>
        <p className="text-sm text-muted">
          Employees and subcontractors share this command with separate streams.{" "}
          <Link to="/staff/payroll" className="text-gold-hi underline">
            Payroll → Xero pack
          </Link>
          .
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Crew", String(SEED_EMPLOYEES.length), "gold"],
          ["Vacancies", String(SEED_VACANCIES.length), "aqua"],
          ["Pipeline", String(SEED_APPLICATIONS.length), "purple"],
          ["Alerts", "2", "warn"],
        ].map(([l, v]) => (
          <div key={l} className="metal-panel rounded-xl p-4">
            <p className="text-sm uppercase tracking-widest text-muted">{l}</p>
            <p className="font-display text-3xl text-gold-hi">{v}</p>
          </div>
        ))}
      </div>
      <section className="metal-panel overflow-x-auto rounded-xl p-5">
        <h2 className="mb-3 font-display text-lg text-gold-hi">Directory</h2>
        <table className="w-full min-w-[520px] text-left text-base">
          <thead className="text-sm uppercase tracking-widest text-muted">
            <tr>
              <th className="pb-2">No.</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Licences</th>
            </tr>
          </thead>
          <tbody>
            {SEED_EMPLOYEES.map((e) => (
              <tr key={e.id} className="border-t border-white/5">
                <td className="py-3 font-mono text-sm text-aqua">{e.empNo}</td>
                <td className="py-3">{e.name}</td>
                <td className="py-3 text-muted">{e.role}</td>
                <td className="py-3">
                  <span className="rounded-md border border-gold/30 px-2 py-0.5 text-sm text-gold-hi">
                    {e.type}
                  </span>
                </td>
                <td className="py-3 text-sm text-muted">{e.licences}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="metal-panel rounded-xl p-5">
          <h2 className="mb-3 font-display text-lg text-gold-hi">Vacancies</h2>
          {SEED_VACANCIES.map((v) => (
            <div key={v.id} className="mb-3 rounded-lg border border-border p-3">
              <p className="font-semibold">{v.title}</p>
              <p className="text-xs text-muted">
                {v.type} · {v.location} · {v.status} · {v.openings} open
              </p>
            </div>
          ))}
        </section>
        <section className="metal-panel rounded-xl p-5">
          <h2 className="mb-3 font-display text-lg text-gold-hi">Pipeline</h2>
          {SEED_APPLICATIONS.map((a) => (
            <div key={a.id} className="mb-3 rounded-lg border border-border p-3">
              <p className="font-semibold">{a.name}</p>
              <p className="text-xs text-muted">
                {a.vacancy} · {a.suburb} · {a.stage}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
