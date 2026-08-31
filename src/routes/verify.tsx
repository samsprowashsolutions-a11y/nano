import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteShell } from "@/components/site/shell";
import { lookupVerify } from "@/lib/server/leads";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/verify")({ component: PublicVerify });

function PublicVerify() {
  const [result, setResult] = useState<Awaited<ReturnType<typeof lookupVerify>> | "none" | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = String(new FormData(e.currentTarget).get("id") || "");
    const row = await lookupVerify({ data: { id } });
    setResult(row ?? "none");
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-lg px-5 py-16">
        <p className="kicker text-center">Certificate lookup</p>
        <h1 className="gold-text text-center font-display text-4xl">Verify</h1>
        <form onSubmit={onSubmit} className="metal-panel mt-8 space-y-4 rounded-2xl p-6">
          <div>
            <Label htmlFor="id">Verify ID</Label>
            <Input id="id" name="id" required placeholder="NA-20260823-XXXX" className="font-mono uppercase" />
          </div>
          <Button type="submit" className="w-full">
            Look up
          </Button>
        </form>
        {result && result !== "none" ? (
          <div className="metal-panel mt-6 rounded-xl p-6 text-center">
            <p className="font-mono text-aqua">{result.verify_id}</p>
            <p className="mt-2 font-display text-2xl text-gold-hi">{result.client_name}</p>
            <p className="text-sm text-muted">{result.site}</p>
            <p className="mt-2 text-sm">{result.product}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ok">{result.status}</p>
          </div>
        ) : null}
        {result === "none" ? <p className="mt-6 text-center text-sm text-muted">No certificate on file.</p> : null}
      </section>
    </SiteShell>
  );
}
