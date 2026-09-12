import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { Bell, Mail, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { GpsHeartbeat } from "@/components/staff/gps-heartbeat";
import { PackFooterBar, PackMasthead, metaFor } from "@/components/staff/pack-frame";
import { rev } from "@/lib/cache";
import { NAV_CATS } from "@/lib/altier-nav";

export function StaffGate({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="sam-desk pack-ice grid min-h-dvh place-items-center">
        <div className="h-24 w-56 animate-pulse rounded-xl bg-[#d4af37]/30" />
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
  const page = metaFor(path).n;

  return (
    <StaffGate>
      <div className="sam-desk pack-ice flex min-h-dvh flex-col">
        <div className="relative z-40">
          <PackMasthead path={path} now={now} />
          <div className="flex items-center justify-end gap-2 border-b-2 border-[#d4af37] bg-white px-3 py-2 text-[#0c1f4a]">
            <Link to="/staff/console" aria-label="Custom console" className="hidden sm:grid size-11 place-items-center rounded-full border-2 border-[#d4af37] bg-white">
              <Search className="size-5" />
            </Link>
            <Link to="/staff/report" aria-label="Ops daily" className="hidden sm:grid size-11 place-items-center rounded-full border-2 border-[#d4af37] bg-white">
              <Bell className="size-5" />
            </Link>
            <Link to="/staff/inbox" aria-label="Analysis inbox" className="hidden sm:grid size-11 place-items-center rounded-full border-2 border-[#d4af37] bg-white">
              <Mail className="size-5" />
            </Link>
            <UserButton />
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border-2 border-[#d4af37] bg-white md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 flex w-[21.5rem] flex-col border-r-2 border-[#d4af37] bg-white transition-transform md:static md:translate-x-0",
              open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            )}
          >
            <div className="flex items-center gap-3 border-b-2 border-[#d4af37] px-4 py-4">
              <img src={rev("/brand/pack-sp.png")} alt="" className="h-16 w-16 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-extrabold text-[#0c1f4a]">Samantha Rae</p>
                <p className="text-base text-[#3d4a63]">Director</p>
                <span className="mt-1 inline-block rounded-full bg-[#0c1f4a] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#e8c547]">
                  Super Admin
                </span>
              </div>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full border-2 border-[#d4af37] md:hidden"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="px-4 pt-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0c1f4a]">
              Altier · by category
            </p>
            <nav className="pack-nav flex-1 space-y-3 overflow-y-auto p-3">
              {NAV_CATS.map((cat) => (
                <div key={cat.id}>
                  <p className="cat-label">
                    <span>{cat.n}</span>
                    {cat.title}
                  </p>
                  {cat.items.map((n) => {
                    const active = path === n.to || (n.to !== "/staff/command" && path.startsWith(n.to));
                    return (
                      <Link
                        key={n.to}
                        to={n.to}
                        onClick={() => setOpen(false)}
                        className={cn(active && "is-on")}
                      >
                        <span className="n">{n.n}</span>
                        {n.label}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
            <div className="pack-head m-3 rounded-xl">
              <span>
                Active role · Altier
                <span className="mt-1 block text-[11px] font-semibold tracking-wide text-[#dce6f8]">
                  Director · vault · command
                </span>
              </span>
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
              <p className="text-lg font-extrabold text-[#0c1f4a]">Altier</p>
            </div>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <GpsHeartbeat />
              <Outlet />
            </main>
          </div>
        </div>

        <PackFooterBar page={page} />
      </div>
    </StaffGate>
  );
}
