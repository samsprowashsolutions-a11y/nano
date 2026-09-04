import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { Bell, Mail, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/lib/content";

const NAV = [
  { to: "/staff/command", label: "Command Dashboard" },
  { to: "/staff/vault", label: "Sam’s Safe" },
  { to: "/staff/payroll", label: "Payroll → Xero" },
  { to: "/staff/qr", label: "QR & Print" },
  { to: "/staff/clients", label: "Client Profiles" },
  { to: "/staff/warranty", label: "Warranty Desk" },
  { to: "/staff/operations", label: "QA Pathway" },
  { to: "/staff/report", label: "Ops Daily Report" },
  { to: "/staff/products", label: "Chemistry Library" },
  { to: "/staff/verify", label: "NanoAssure Verify" },
  { to: "/staff/inbox", label: "Analysis Inbox" },
  { to: "/staff/workforce", label: "Workforce (later desks)" },
  { to: "/staff/protocol", label: "SWMS & Protocol" },
  { to: "/staff/prompt", label: "Master Prompt" },
] as const;

export function StaffGate({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="sam-desk grid min-h-dvh place-items-center">
        <div className="h-24 w-56 animate-pulse rounded-xl bg-gold/20" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn to="/login" />;
  return <>{children}</>;
}

export function StaffShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const now = new Date().toLocaleString("en-AU", { timeZone: "Australia/Darwin" });

  return (
    <StaffGate>
      <div className="sam-desk flex min-h-dvh flex-col">
        <header className="relative z-40 bg-[#11110f] text-[#f5e2a0]">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <Link to="/staff/command" className="flex min-w-0 items-center gap-3">
              <img src="/brand/sp-lockup.png" alt="Sam's Prowash Solutions" className="h-12 w-auto max-w-[16rem] object-contain md:h-14" />
            </Link>
            <div className="hidden text-center md:block">
              <h1 className="font-script text-3xl leading-none text-gold-hi lg:text-4xl">
                Altier
              </h1>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#c4c6cc]">
                Command suite · Director desk · Sam’s Safe
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-hi lg:inline">
                {now}
              </span>
              <Search className="hidden size-4 text-gold-hi sm:block" />
              <Bell className="hidden size-4 text-gold-hi sm:block" />
              <Mail className="hidden size-4 text-gold-hi sm:block" />
              <UserButton />
              <button
                type="button"
                className="grid size-10 place-items-center rounded-md border border-gold/30 md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 flex w-[17.5rem] flex-col border-r border-gold/25 bg-[#fbf7ef] pt-[4.5rem] transition-transform md:static md:translate-x-0 md:pt-0",
              open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            )}
          >
            <div className="flex items-center gap-3 border-b border-gold/20 px-4 py-4">
              <img src="/brand/sp-shield-clear.png" alt="" className="h-14 w-14 object-contain" />
              <div>
                <p className="font-semibold text-[#2a241c]">Samantha Rae</p>
                <p className="text-sm text-[#5c564c]">Director</p>
                <span className="mt-1 inline-block rounded-full bg-purple px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Super Admin
                </span>
              </div>
            </div>
            <p className="px-4 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6a18]">
              Altier navigation
            </p>
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
              {NAV.map((n) => {
                const active = path === n.to || (n.to !== "/staff/command" && path.startsWith(n.to));
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-full px-4 py-2.5 text-base text-[#3a342c] hover:bg-gold/10",
                      active && "bg-linear-to-r from-aqua/80 to-purple text-white shadow-md",
                    )}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="m-3 rounded-2xl bg-linear-to-br from-purple to-[#3b1768] p-4 text-white">
              <p className="text-xs uppercase tracking-widest text-gold-hi">Active role</p>
              <p className="font-display text-xl">Altier</p>
              <p className="text-sm text-white/80">Director · vault · command. Kate, Jas and crew desks next.</p>
            </div>
          </aside>
          {open ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between px-4 py-2 md:hidden">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-5" />
              </button>
              <p className="font-script text-2xl text-gold">Altier</p>
            </div>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>

        <footer className="bg-[#11110f] px-4 py-3 text-center text-xs text-[#c4c6cc]">
          SP NanoAssure™ · Altier · Secure connection · ABN {BRAND.abn} · ACN {BRAND.acn} · {BRAND.location} · v2026.09.01
        </footer>
      </div>
    </StaffGate>
  );
}
