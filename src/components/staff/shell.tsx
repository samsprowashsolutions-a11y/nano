import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ChromeShield } from "@/components/chrome-shield";
import type { ChromeTone } from "@/lib/content";

const NAV = [
  { to: "/staff", label: "Gallery", tone: "gold" as ChromeTone },
  { to: "/staff/workforce", label: "Workforce", tone: "purple" as ChromeTone },
  { to: "/staff/operations", label: "Operations", tone: "teal" as ChromeTone },
  { to: "/staff/products", label: "Chemistry", tone: "pearl" as ChromeTone },
  { to: "/staff/protocol", label: "Protocol", tone: "carbon" as ChromeTone },
  { to: "/staff/prompt", label: "Master prompt", tone: "gold" as ChromeTone },
  { to: "/staff/verify", label: "Verify", tone: "gold" as ChromeTone },
  { to: "/staff/inbox", label: "Analysis inbox", tone: "teal" as ChromeTone },
] as const;

export function StaffGate({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="carbon-field grid min-h-dvh place-items-center">
        <div className="h-24 w-56 animate-pulse rounded-xl bg-white/5" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn to="/login" />;
  return <>{children}</>;
}

export function StaffShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <StaffGate>
      <div className="carbon-field flex min-h-dvh">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r border-chrome/15 bg-carbon/90 backdrop-blur-xl transition-transform md:static md:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          <div className="flex items-center gap-3 border-b border-gold/25 px-4 py-4">
            <span className="logo-chrome">
              <img src="/brand/sp-logo-neon-glow.webp" alt="" className="size-11 object-contain" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gold-hi">NanoAssure™</p>
              <p className="kicker">Staff command</p>
            </div>
          </div>
          <nav className="space-y-1 p-3">
            {NAV.map((n) => {
              const active = n.to === "/staff" ? path === "/staff" : path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-lg text-muted hover:bg-white/5 hover:text-pearl",
                    active && "border border-gold/30 bg-gold/10 text-gold-hi",
                  )}
                >
                  <ChromeShield tone={n.tone} className="h-8 w-7 shrink-0" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <p className="absolute bottom-4 left-0 right-0 px-4 text-center text-base text-muted">
            Confidential · v2026.08.23.5
          </p>
        </aside>
        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-chrome/15 bg-carbon/50 px-4 backdrop-blur-xl">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-md border border-border md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <p className="text-base uppercase tracking-[0.08em] text-muted">
              <span className="text-gold-hi">SP Prestige</span> · controlled
            </p>
            <div className="flex items-center gap-3 text-sm">
              <Link to="/" className="text-xs text-muted hover:text-aqua">
                Public site
              </Link>
              <UserButton />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </StaffGate>
  );
}
