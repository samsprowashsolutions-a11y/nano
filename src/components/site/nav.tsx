import { Link, useRouterState } from "@tanstack/react-router";
import { BrandLockup, BrandMark, Wordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/content";
import { ChromeStrip } from "@/components/chrome-shield";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/solutions", label: "Collection" },
  { to: "/assurance", label: "Assurance" },
  { to: "/analysis", label: "Analysis" },
  { to: "/careers", label: "Careers" },
  { to: "/verify", label: "Verify" },
];

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line-gold/70 bg-carbon/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[92rem] items-center justify-between gap-3 px-4 sm:h-24 sm:px-6">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3 text-fg">
          <BrandMark size={44} />
          <Wordmark compact />
        </Link>

        <nav className="hidden min-w-0 items-center gap-0 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-2.5 py-2 text-base font-semibold uppercase tracking-[0.06em] text-muted transition-colors duration-150 hover:text-gold-hi",
                pathname === l.to && "text-gold-hi",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/staff"
            className="rounded-full px-2.5 py-2 text-base font-semibold uppercase tracking-[0.06em] text-aqua/80 hover:text-aqua"
          >
            Staff
          </Link>
          <Button asChild size="sm" className="ml-2 shrink-0">
            <Link to="/analysis">Analyse</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-chrome/20 text-fg lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-lg text-muted hover:bg-surface hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/staff" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-lg text-aqua">
              Staff portal
            </Link>
            <Button asChild className="mt-2 w-full">
              <Link to="/analysis" onClick={() => setOpen(false)}>
                Request analysis
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line-gold/40 bg-carbon">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLockup className="max-w-md" />
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            {BRAND.parent}. {BRAND.positioning} Public pages do not publish prices. Internal
            platforms are role-locked. Finance remains Director-only.
          </p>
          <p className="mt-4 text-base text-faint">
            ABN {BRAND.abn} · ACN {BRAND.acn}
            <br />
            {BRAND.location}
          </p>
        </div>
        <div>
          <div className="kicker mb-4">Maison</div>
          <ul className="space-y-2 text-lg text-muted">
            <li><Link to="/solutions" className="hover:text-gold-hi">The collection</Link></li>
            <li><Link to="/assurance" className="hover:text-gold-hi">Five-Step QA</Link></li>
            <li><Link to="/" hash="proof" className="hover:text-gold-hi">Before & after</Link></li>
            <li><Link to="/about" className="hover:text-gold-hi">The maison</Link></li>
          </ul>
        </div>
        <div>
          <div className="kicker mb-4">Desks</div>
          <ul className="space-y-2 text-lg text-muted">
            <li><Link to="/analysis" className="hover:text-gold-hi">Analysis desk</Link></li>
            <li><Link to="/careers" className="hover:text-gold-hi">Careers</Link></li>
            <li><Link to="/staff" className="hover:text-gold-hi">Staff portal</Link></li>
            <li>
              <a href={`mailto:${BRAND.analysisEmail}`} className="hover:text-gold-hi">
                {BRAND.analysisEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-6">
        <ChromeStrip className="mx-auto mb-6 max-w-lg opacity-90" />
        <p className="text-center text-base leading-relaxed text-faint">
        {BRAND.parent} acknowledges the Traditional Owners and Custodians of Country throughout the
        Northern Territory and pays respect to Elders past and present.
        <br />© {new Date().getFullYear()} {BRAND.parent}. {BRAND.tagline}
        </p>
      </div>
    </footer>
  );
}
