import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "./nav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="carbon-field min-h-dvh text-fg">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}
