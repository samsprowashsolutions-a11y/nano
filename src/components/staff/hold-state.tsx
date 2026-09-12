import { HOLD_KINDS } from "@/lib/control";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  purple: "hold-doc",
  crimson: "hold-sec",
  indigo: "hold-legal",
  titanium: "hold-archive",
};

export function HoldChip({ kind, label }: { kind: string; label?: string }) {
  const meta = HOLD_KINDS.find((k) => k.id === kind);
  return (
    <span className={cn("hold-chip", TONE[meta?.tone ?? "purple"])}>
      {label ?? meta?.label ?? kind}
    </span>
  );
}

export function HoldBanner({
  kind,
  reason,
  vaultRef,
}: {
  kind: string;
  reason: string;
  vaultRef?: string;
}) {
  const meta = HOLD_KINDS.find((k) => k.id === kind);
  return (
    <div className={cn("hold-banner", TONE[meta?.tone ?? "purple"])}>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]">{meta?.label ?? kind}</p>
      <p className="mt-1 text-sm font-semibold">{reason}</p>
      {vaultRef ? <p className="mt-1 font-mono text-xs">{vaultRef}</p> : null}
    </div>
  );
}
