import { createFileRoute, Link } from "@tanstack/react-router";
import { ChromePlate, ChromeShield, ChromeStrip } from "@/components/chrome-shield";

export const Route = createFileRoute("/staff/")({ component: StaffGallery });

const CARDS = [
  {
    to: "/staff/workforce",
    title: "Employment & Workforce",
    desc: "Recruit · Onboard · Licences · Expiry · Deployment.",
    tone: "gold" as const,
  },
  {
    to: "/staff/operations",
    title: "Operations Command",
    desc: "Five-test field checklist, QA gates, Darwin workface.",
    tone: "teal" as const,
  },
  {
    to: "/staff/products",
    title: "Chemistry library",
    desc: "TDS / SDS aligned Nanoman systems. APAS 1441 on file.",
    tone: "purple" as const,
  },
  {
    to: "/staff/protocol",
    title: "SWMS & protocol",
    desc: "Controlled Safe Work Method Statement and chrome index.",
    tone: "carbon" as const,
  },
  {
    to: "/staff/prompt",
    title: "Master operating prompt",
    desc: "Copy the full source of truth so Grok and rebuilds miss nothing.",
    tone: "gold" as const,
  },
  {
    to: "/staff/verify",
    title: "NanoAssure Verify",
    desc: "Issue NA-YYYYMMDD-XXXX certificates after gates pass.",
    tone: "pearl" as const,
  },
  {
    to: "/staff/inbox",
    title: "Analysis inbox",
    desc: "Private analysis requests from the public maison.",
    tone: "gold" as const,
  },
];

function StaffGallery() {
  return (
    <div className="mx-auto max-w-5xl">
      <ChromePlate className="mb-8">
        <section className="p-8 text-center">
          <img
            src="/brand/sp-logo-neon-glow.webp"
            alt=""
            className="mx-auto mb-3 w-28 drop-shadow-[0_0_22px_rgba(0,208,224,.4)]"
          />
          <p className="kicker text-muted">
            By invitation · Staff access only
          </p>
          <h1 className="chrome-text mt-1 font-display text-4xl font-semibold">
            Sam's Prowash Solutions
          </h1>
          <p className="font-script text-3xl text-gold">Private Staff Gallery</p>
          <p className="mx-auto mt-2 max-w-lg text-lg text-muted">
            Controlled operations system. Advanced surface protection · stronger communities · better
            futures.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["SP Prestige", "NanoAssure™", "Chrome Standard", "Confidential"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-chrome/25 px-3 py-1 text-sm font-bold uppercase tracking-wider text-chrome"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-4 font-mono text-sm tracking-[0.14em] text-muted">
            SP · STAFF · v2026.08.23.5
          </p>
        </section>
      </ChromePlate>
      <hr className="chrome-rule mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link key={c.to} to={c.to} className="chrome-rim rounded-xl transition-transform hover:-translate-y-1">
            <article className="metal-panel h-full rounded-[14px] p-5">
              <div className="mb-3 flex items-center gap-3">
                <ChromeShield tone={c.tone} className="h-12 w-10 shrink-0" />
                <h2 className="font-display text-xl text-gold-hi">{c.title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-muted">{c.desc}</p>
              <span className="gold-cta mt-4 inline-flex rounded-md px-3 py-1.5 text-base font-bold uppercase tracking-wider">
                Enter →
              </span>
            </article>
          </Link>
        ))}
      </div>
      <ChromeStrip className="mt-10" />
    </div>
  );
}
