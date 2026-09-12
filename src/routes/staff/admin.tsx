import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/content";

export const Route = createFileRoute("/staff/admin")({ component: AdminDesk });

const ROLES = [
  { role: "Director", who: "Samantha Rae", access: "All desks. Sam’s Safe. Payroll. Bulletin. Approvals final." },
  { role: "Operations", who: "Kate", access: "Jobs, OPPS ALL CLEAR, GPS office fence, WHS, QA pathway." },
  { role: "Academy / Cultural", who: "Jas", access: "Training, workforce, SWMS consult, bulletins to crew." },
  { role: "Supervisor", who: "Site lead", access: "Jobs live, pre-start, QA gates, not finance." },
  { role: "Technician", who: "Field crew", access: "GPS field sign-on, QA tests, evidence upload, not vault." },
  { role: "Contractor", who: "Trade", access: "Onboarding, licences, SWMS, no client finance." },
  { role: "Customer", who: "Public maison", access: "Analysis form + verify ID. No Altier. No PIN." },
] as const;

function AdminDesk() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gate</p>
        <h1 className="gold-text font-display text-3xl">Admin · permissions · backup</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Altier is invitation-only Google / X. Finance never on the maison. One live database. No public phone book.
        </p>
      </header>
      <section className="portal-card overflow-x-auto p-5">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#8a6a18]">
            <tr>
              <th className="pb-2">Role</th>
              <th className="pb-2">Who</th>
              <th className="pb-2">Access</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map((r) => (
              <tr key={r.role} className="border-t border-gold/20">
                <td className="py-3 font-semibold">{r.role}</td>
                <td>{r.who}</td>
                <td className="text-[#5c564c]">{r.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="portal-card p-5 text-sm leading-relaxed text-[#5c564c]">
        <p>
          {BRAND.parent} · ABN {BRAND.abn}. Backup is the Postgres volume. Connections (Xero / Twilio) stay{" "}
          <Link to="/staff/connections" className="text-gold-hi underline">
            unwired until LIVE
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
