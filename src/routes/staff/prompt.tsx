import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChromePlate } from "@/components/chrome-shield";
import { MASTER_PROMPT, MASTER_PROMPT_REV, MASTER_PROMPT_TITLE } from "@/lib/master-prompt";

export const Route = createFileRoute("/staff/prompt")({ component: MasterPrompt });

const GATES = [
  "Dual surface: public maison + signed-in staff command",
  "ABN / ACN / Darwin NT / analysis@nanoassure.net",
  "Positioning line + tagline triad verbatim",
  "Chrome 01–05 shields with metallic sheen",
  "Five-Step Data Test Set™",
  "Five Test Field Checklist QA-FORM-001",
  "Seven-step process APA → NIA",
  "Full Nanoman TDS/SDS library",
  "SWMS draft unregistered master",
  "Verify IDs NA-YYYYMMDD-XXXX",
  "No public prices or phone book",
  "Finance Director-only",
  "Samantha Rae · Jasmin Calma · Kate",
  "No zip-pack visuals — chrome icons only",
];

function MasterPrompt() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(MASTER_PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="kicker">Gold · Governance</p>
        <h1 className="gold-text font-display text-4xl md:text-5xl">{MASTER_PROMPT_TITLE}</h1>
        <p className="font-script text-3xl text-gold">So nothing is missed</p>
        <p className="text-lg text-muted">{MASTER_PROMPT_REV}</p>
      </header>

      <ChromePlate>
        <div className="space-y-4 p-5 md:p-7">
          <p className="text-xl leading-relaxed text-pearl">
            Paste this entire prompt into Grok Project Instructions (or any rebuild) before changing
            the maison, staff command, certificates, SWMS, or chemistry. It is the controlled source
            of truth — legal identity, chrome system, both QA sets, seven-step process, TDS library,
            people, and the zip-visual ban.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => void copy()}>
              {copied ? "Copied to clipboard" : "Copy full prompt"}
            </Button>
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(MASTER_PROMPT)}`}
              download="NanoAssure-Master-Operating-Prompt.txt"
              className="inline-flex h-14 items-center rounded-full border border-aqua/50 px-6 text-base font-semibold uppercase tracking-wide text-aqua"
            >
              Download .txt
            </a>
          </div>
        </div>
      </ChromePlate>

      <section className="metal-panel rounded-xl p-5">
        <h2 className="mb-3 font-display text-2xl text-gold-hi">Completeness gate</h2>
        <p className="mb-4 text-lg text-muted">
          Any rebuild that cannot tick every line has dropped information. Restore from the prompt.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {GATES.map((g) => (
            <li
              key={g}
              className="rounded-lg border border-border bg-carbon/40 px-4 py-3 text-lg text-pearl"
            >
              {g}
            </li>
          ))}
        </ul>
      </section>

      <ChromePlate>
        <pre className="chrome-doc readable-doc max-h-[75vh] overflow-auto whitespace-pre-wrap p-6 text-[#1a1420] md:p-10">
          {MASTER_PROMPT}
        </pre>
      </ChromePlate>
    </div>
  );
}
