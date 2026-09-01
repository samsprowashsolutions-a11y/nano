import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "./nav";
import { WaterGlassBand } from "@/components/brand/logo";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="carbon-field min-h-dvh text-fg">
      <SiteNav />
      <WaterGlassBand />
      {children}
      <SiteFooter />
    </div>
  );
}
