import { useNavigate } from "@tanstack/react-router";
import { PLATFORM, PLATFORM_CATS } from "@/lib/platform";
import { PACK_INDEX } from "@/lib/pack-sheets";
import { cn } from "@/lib/utils";
import { PackHex } from "@/components/staff/pack-frame";

export function MasterIndex() {
  return (
    <ol className="grid gap-2">
      {PACK_INDEX.map((row) => (
        <li key={row.n}>
          <a href={`#sheet-${row.n}`} className="pack-index-row">
            <PackHex n={row.n} className="!h-11 !w-12 !text-sm" />
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl leading-tight text-[#0c1f4a] md:text-2xl">{row.title}</span>
              <span className="mt-0.5 block text-base text-[#3d4a63]">{row.copy}</span>
            </span>
            <span className="pack-index-bars" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function PlatformList({ variant = "full" }: { variant?: "full" | "command" }) {
  const navigate = useNavigate();
  const compact = variant === "command";
  return (
    <div className="grid gap-6">
      {PLATFORM_CATS.map((cat) => {
        const rows = PLATFORM.filter((m) => m.cat === cat.id);
        return (
          <section key={cat.id} className="pack-card">
            <div className="pack-head">
              <PackHex n={cat.n} className="!h-8 !w-9 !text-[.7rem]" />
              <span>{cat.title}</span>
            </div>
            <div className="pack-body space-y-2">
              <p className="text-base text-[#3d4a63]">{cat.copy}</p>
              <ol className={cn("grid gap-2", compact ? "lg:grid-cols-2" : "")}>
                {rows.map((m, i) => {
                  const n = String(i + 1).padStart(2, "0");
                  return (
                    <li key={m.id} id={`m-${m.id}`}>
                      <a
                        href={m.to}
                        className="group flex min-h-[4.6rem] items-center gap-3 rounded-2xl border-2 border-[#c8ced6] bg-linear-to-b from-white to-[#e8eef6] px-4 py-3 shadow-[inset_0_1px_0_#fff,0_8px_18px_rgba(12,31,74,.08)] transition hover:from-[#fff6d0] hover:to-[#e8b838]"
                        onClick={(e) => {
                          e.preventDefault();
                          void navigate({ to: m.to });
                        }}
                      >
                        <PackHex n={n} className="!h-10 !w-11 !text-sm" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a6a18]">{m.kicker}</span>
                          <span className="block font-display text-lg leading-tight text-[#0c1f4a] md:text-xl">{m.name}</span>
                          <span className="mt-0.5 block text-sm leading-snug text-[#3d4a63]">{m.copy}</span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1">
                          <span className="rounded-full bg-[#ecfdf3] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#166534]">
                            Applied
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#c9a227] group-hover:underline">
                            Open
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
        );
      })}
    </div>
  );
}
