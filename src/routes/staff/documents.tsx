import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { BRAND } from "@/lib/content";
import { platformSnapshot, saveGeneratedDoc } from "@/lib/server/platform";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/documents")({ component: DocumentsDesk });

function DocumentsDesk() {
  const q = useQuery({ queryKey: ["platform"], queryFn: () => platformSnapshot() });
  const [msg, setMsg] = useState("");
  const [printId, setPrintId] = useState<number | null>(null);
  const doc = q.data?.docs.find((d) => d.id === printId);

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await saveGeneratedDoc({
      data: {
        kind: String(fd.get("kind") || "report") as "proposal" | "qa-record" | "compliance-pack" | "handover" | "report",
        title: String(fd.get("title") || ""),
        body: String(fd.get("body") || ""),
      },
    });
    setMsg(`Pack ${res.id} filed. Print from the list.`);
    setPrintId(res.id);
    e.currentTarget.reset();
    void q.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="kicker">Customer portal · packs</p>
        <h1 className="gold-text font-display text-3xl">Document generator</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Proposals, QA records, compliance packs, handovers. The public customer path is{" "}
          <Link to="/analysis" className="text-gold-hi underline">
            analysis
          </Link>{" "}
          and{" "}
          <Link to="/verify" className="text-gold-hi underline">
            verify
          </Link>
          . Nothing from Sam’s Safe leaves this desk.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="portal-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Compose</h2>
          <form className="mt-3 grid gap-3" onSubmit={(e) => void onSave(e)}>
            <div>
              <Label htmlFor="kind">Kind</Label>
              <select id="kind" name="kind" className="h-12 w-full rounded-xl border px-4">
                <option value="proposal">Proposal</option>
                <option value="qa-record">QA record</option>
                <option value="compliance-pack">Compliance pack</option>
                <option value="handover">Handover</option>
                <option value="report">Report</option>
              </select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div>
              <Label htmlFor="body">Body</Label>
              <Textarea id="body" name="body" rows={8} required />
            </div>
            <div>
              <Button type="submit">File pack</Button>
              {msg ? <span className="ml-3 text-sm">{msg}</span> : null}
            </div>
          </form>
        </section>

        <section className="portal-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8a6a18]">Filed</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {(q.data?.docs ?? []).map((d) => (
              <li key={d.id}>
                <button type="button" className="text-left text-gold-hi underline" onClick={() => setPrintId(d.id)}>
                  {d.kind} · {d.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {doc ? (
        <article className="portal-card p-8 print:border-0 print:shadow-none">
          <p className="kicker">{BRAND.parent}</p>
          <h2 className="font-display text-3xl text-[#2a241c]">{doc.title}</h2>
          <p className="text-sm text-[#8a6a18]">{doc.kind}</p>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-base leading-relaxed">{doc.body}</pre>
          <Button type="button" className="mt-6" onClick={() => window.print()}>
            Print
          </Button>
        </article>
      ) : null}
    </div>
  );
}
