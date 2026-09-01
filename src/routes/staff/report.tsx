import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { listOpsReports, saveOpsReport } from "@/lib/server/atelier";
import { DeskCard, DeskHeader } from "@/components/staff/desk";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/staff/report")({ component: OpsReport });

function OpsReport() {
  const list = useQuery({ queryKey: ["ops"], queryFn: () => listOpsReports() });
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveOpsReport({
      data: {
        reportDate: String(fd.get("reportDate") || ""),
        weather: String(fd.get("weather") || "") || undefined,
        sites: String(fd.get("sites") || "") || undefined,
        completed: String(fd.get("completed") || "") || undefined,
        hazards: String(fd.get("hazards") || "") || undefined,
        body: String(fd.get("body") || ""),
        publishPublic: fd.get("publishPublic") === "on",
        publishAtelier: fd.get("publishAtelier") === "on",
      },
    });
    setMsg("Daily report filed.");
    e.currentTarget.reset();
    void list.refetch();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <DeskHeader
        kicker="Teal · Field"
        title="Ops daily report"
        script="From the workface."
        copy="File the day. Send it to the public maison, pin it in the atelier gallery, or keep it in command."
      />
      <DeskCard>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="reportDate">Date</Label>
            <Input id="reportDate" name="reportDate" type="date" required />
          </div>
          <div>
            <Label htmlFor="weather">Weather / ClimaScan™</Label>
            <Input id="weather" name="weather" placeholder="Temp · RH · wind" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="sites">Sites</Label>
            <Input id="sites" name="sites" />
          </div>
          <div>
            <Label htmlFor="completed">Completed</Label>
            <Input id="completed" name="completed" placeholder="Gates passed, m², systems" />
          </div>
          <div>
            <Label htmlFor="hazards">Hazards / holds</Label>
            <Input id="hazards" name="hazards" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="body">Brief</Label>
            <Textarea id="body" name="body" required />
          </div>
          <label className="flex items-center gap-2 text-pearl">
            <input type="checkbox" name="publishPublic" className="size-5 accent-gold" />
            Submit to the public website
          </label>
          <label className="flex items-center gap-2 text-pearl">
            <input type="checkbox" name="publishAtelier" className="size-5 accent-gold" defaultChecked />
            Pin in the atelier gallery
          </label>
          <div className="md:col-span-2">
            <Button type="submit">File report</Button>
            {msg ? <p className="mt-2 text-sm text-aqua">{msg}</p> : null}
          </div>
        </form>
      </DeskCard>
      <section className="space-y-3">
        {(list.data ?? []).map((r) => (
          <article key={r.id} className="metal-panel rounded-xl p-5">
            <p className="kicker">{r.report_date}</p>
            <p className="text-pearl">{r.sites}</p>
            <p className="mt-2 text-muted">{r.body}</p>
            <p className="mt-2 text-sm text-aqua">
              {r.published_public ? "Live on website · " : ""}
              {r.published_atelier ? "Pinned in atelier" : "Held"}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
