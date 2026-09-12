import { useQuery } from "@tanstack/react-query";
import { getBomObservation } from "@/lib/server/bom";
import { DEFAULT_FENCE } from "@/lib/gps";
import { cn } from "@/lib/utils";

export function ClimaScanBom({
  lat,
  lng,
  onFill,
}: {
  lat?: number;
  lng?: number;
  onFill?: (line: string) => void;
}) {
  const q = useQuery({
    queryKey: ["bom", lat, lng],
    queryFn: () =>
      getBomObservation({
        data: {
          lat: lat ?? DEFAULT_FENCE.lat,
          lng: lng ?? DEFAULT_FENCE.lng,
        },
      }),
    staleTime: 5 * 60_000,
  });
  const o = q.data;

  return (
    <div className={cn("rounded-2xl border-2 p-4", o?.suggestHold ? "need-do" : "border-[#166534] bg-[#ecfdf3]")}>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6a18]">
        ClimaScan™ · Bureau of Meteorology
      </p>
      {q.isLoading ? <p className="mt-2 text-lg font-bold text-[#0c1f4a]">Reading BOM…</p> : null}
      {o ? (
        <>
          <p className="mt-1 font-display text-3xl text-[#0c1f4a]">
            {o.tempC != null ? `${o.tempC.toFixed(1)}°C` : "—"}{" "}
            <span className="text-xl">{o.humidity != null ? `RH ${o.humidity}%` : ""}</span>
          </p>
          <p className="mt-1 text-base font-semibold text-[#122038]">
            {o.station}
            {o.bomId ? ` · ${o.bomId}` : ""} · {o.condition}
          </p>
          <p className="text-sm text-[#3d4a63]">
            {o.windKmh != null ? `Wind ${o.windKmh} km/h ${o.windDir ?? ""} · ` : ""}
            {o.rainMm != null ? `Rain ${o.rainMm} mm · ` : ""}
            {o.source}
          </p>
          {o.suggestHold ? (
            <ul className="mt-2 text-base font-bold text-[#9a3412]">
              {o.holdWhy.map((w) => (
                <li key={w}>HOLD · {w}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-base font-bold text-[#166534]">Inside the generic 5–35°C / RH ≤ 90% window. Still confirm the TDS for this product.</p>
          )}
          {onFill ? (
            <button type="button" className="crew-btn crew-btn-gold mt-3" onClick={() => onFill(o.line)}>
              Put this on ClimaScan
            </button>
          ) : null}
          <p className="mt-2 text-xs text-[#3d4a63]">
            Attribution: Bureau of Meteorology. Not a pass by itself — crew still says pass or hold. Pending review.
          </p>
        </>
      ) : null}
    </div>
  );
}
