import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { SEED_APPLICATIONS, SEED_EMPLOYEES, SEED_VACANCIES } from "@/lib/content";
import { platformSnapshot, saveAcademy, saveContractor } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/staff/workforce")({ component: Workforce });

function Chip({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="kpi-chip p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a6a18]">{label}</p>
      <p className="font-display text-4xl text-[#2a241c]">{value}</p>
      <p className="text-sm text-[#5c564c]">{hint}</p>
    </div>
  );
}

function Workforce() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const [msg, setMsg] = useState("");
  const employees = SEED_EMPLOYEES.length;
  const contractors = q.data?.contractors.length ?? 0;
  const academy = q.data?.academy.length ?? 0;
  const vacancies = SEED_VACANCIES.reduce((n, v) => n + v.openings, 0);

  async function onContractor(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveContractor({
      data: {
        name: String(fd.get("name") || ""),
        abn: String(fd.get("abn") || "") || undefined,
        insurance: String(fd.get("insurance") || "") || undefined,
        insuranceExpires: String(fd.get("insuranceExpires") || "") || undefined,
        licences: String(fd.get("licences") || "") || undefined,
        competency: String(fd.get("competency") || "") || undefined,
      },
    });
    setMsg("Contractor filed.");
    e.currentTarget.reset();
    void q.refetch();
  }

  async function onAcademy(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveAcademy({
      data: {
        person: String(fd.get("person") || ""),
        course: String(fd.get("course") || ""),
        completedOn: String(fd.get("completedOn") || "") || undefined,
        expiresOn: String(fd.get("expiresOn") || "") || undefined,
      },
    });
    setMsg("Academy record filed.");
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <header className="hidden items-end justify-between md:flex">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0c1f4a]">
            Executive workforce operations · live command
          </p>
          <h1 className="font-display text-5xl text-[#0c1f4a]">Employment & Workforce</h1>
        </div>
        <p className="text-sm text-[#5c564c]">
          <Link to="/staff/payroll" className="text-gold-hi underline">
            Payroll → Xero
          </Link>
          {" · "}
          <Link to="/staff/gps" className="text-gold-hi underline">
            GPS roster
          </Link>
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Chip label="People" value={employees} hint="Directory" />
        <Chip label="Vacancies" value={vacancies} hint="Openings" />
        <Chip label="Pipeline" value={SEED_APPLICATIONS.length} hint="Applications" />
        <Chip label="Contractors" value={contractors} hint="ABN on file" />
        <Chip label="Academy" value={academy} hint="Competencies" />
        <Chip label="Expiry alerts" value={q.data?.alerts.expiring.length ?? 0} hint="Insurance / tickets" />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="portal-card overflow-x-auto p-4">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Employee register</h2>
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-[#8a6a18]">
              <tr>
                <th className="pb-2">No.</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Licences</th>
              </tr>
            </thead>
            <tbody>
              {SEED_EMPLOYEES.map((e) => (
                <tr key={e.id} className="border-t border-gold/20">
                  <td className="py-2 font-mono text-xs">{e.empNo}</td>
                  <td>{e.name}</td>
                  <td>{e.role}</td>
                  <td>{e.licences}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="portal-card p-4">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Vacancies & pipeline</h2>
          {SEED_VACANCIES.map((v) => (
            <p key={v.id} className="mb-2 rounded-lg border border-gold/20 px-3 py-2 text-sm">
              {v.title} · {v.openings} open · {v.status}
            </p>
          ))}
          {SEED_APPLICATIONS.map((a) => (
            <p key={a.id} className="mb-2 text-sm text-[#5c564c]">
              {a.name} · {a.vacancy} · {a.stage}
            </p>
          ))}
        </section>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="portal-card p-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Contractor onboarding</h2>
          <form className="mt-3 grid gap-2 sm:grid-cols-2" onSubmit={(e) => void onContractor(e)}>
            <div className="sm:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="abn">ABN</Label>
              <Input id="abn" name="abn" />
            </div>
            <div>
              <Label htmlFor="insuranceExpires">Insurance expires</Label>
              <Input id="insuranceExpires" name="insuranceExpires" type="date" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="licences">Licences / White Card</Label>
              <Input id="licences" name="licences" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="sm">
                File contractor
              </Button>
            </div>
          </form>
          <ul className="mt-3 space-y-1 text-sm">
            {(q.data?.contractors ?? []).map((c) => (
              <li key={c.id}>
                {c.name} · {c.abn ?? "no ABN"} · ins {c.insurance_expires ?? "—"}
              </li>
            ))}
          </ul>
        </section>
        <section className="portal-card p-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Training academy</h2>
          <form className="mt-3 grid gap-2 sm:grid-cols-2" onSubmit={(e) => void onAcademy(e)}>
            <div>
              <Label htmlFor="person">Person</Label>
              <Input id="person" name="person" required />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input id="course" name="course" required />
            </div>
            <div>
              <Label htmlFor="completedOn">Completed</Label>
              <Input id="completedOn" name="completedOn" type="date" />
            </div>
            <div>
              <Label htmlFor="expiresOn">Expires</Label>
              <Input id="expiresOn" name="expiresOn" type="date" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="sm">
                File competency
              </Button>
            </div>
          </form>
          <ul className="mt-3 space-y-1 text-sm">
            {(q.data?.academy ?? []).map((a) => (
              <li key={a.id}>
                {a.person} · {a.course} · exp {a.expires_on ?? "—"}
              </li>
            ))}
          </ul>
        </section>
      </div>
      {msg ? <p className="text-sm text-[#8a6a18]">{msg}</p> : null}
    </div>
  );
}
