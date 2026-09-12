import { useEffect } from "react";
import { darwinNow, insideFence, PING_MS, readPosition } from "@/lib/gps";
import { endGpsSession, getGpsDesk, saveGpsPing } from "@/lib/server/gps";

/** Quiet 30-minute pings while a session is live and Altier is open. */
export function GpsHeartbeat() {
  useEffect(() => {
    let cancelled = false;
    async function ping() {
      try {
        const desk = await getGpsDesk();
        if (cancelled || !desk.live) return;
        const fence = desk.fence;
        const d = darwinNow();
        if (desk.live.mode === "office" && d.hour >= fence.end_hour) {
          await endGpsSession({ data: { sessionId: desk.live.id } });
          return;
        }
        const fix = await readPosition();
        if (cancelled) return;
        const inside = insideFence(fix, {
          lat: Number(fence.lat),
          lng: Number(fence.lng),
          radiusM: fence.radius_m,
        });
        await saveGpsPing({
          data: {
            sessionId: desk.live.id,
            lat: fix.lat,
            lng: fix.lng,
            accuracy: fix.accuracy,
            insideFence: inside,
          },
        });
      } catch {
        /* permission denied or no session — stay quiet */
      }
    }
    const t = window.setInterval(() => void ping(), PING_MS);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);
  return null;
}