/** Privacy-first GPS for Altier. Tracking starts only after Sign on. */

export const DEFAULT_FENCE = {
  label: "Office",
  address: "17 Driffield Street, Anula NT 0812",
  lat: -12.3945122,
  lng: 130.88698,
  radiusM: 150,
  startHour: 9,
  endHour: 15,
} as const;

export type Fix = { lat: number; lng: number; accuracy: number; at: string };

export function metresBetween(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6_371_000;
  const toR = (d: number) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat);
  const dLng = toR(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function insideFence(
  fix: { lat: number; lng: number },
  fence: { lat: number; lng: number; radiusM: number },
): boolean {
  return metresBetween(fix, fence) <= fence.radiusM;
}

export function readPosition(): Promise<Fix> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("This device has no GPS."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          at: new Date().toISOString(),
        });
      },
      (err) => reject(new Error(err.message || "GPS denied")),
      { enableHighAccuracy: true, timeout: 20_000, maximumAge: 0 },
    );
  });
}

export function darwinNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Darwin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(d);
  const grab = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    year: grab("year"),
    month: grab("month"),
    day: grab("day"),
    hour: Number(grab("hour")),
    minute: Number(grab("minute")),
    weekday: grab("weekday"),
  };
}

/** Office sessions inside the fence pay from the nominated start hour (Darwin). */
export function officePaidFrom(now = new Date(), startHour = 9): Date {
  const d = darwinNow(now);
  return new Date(
    `${d.year}-${d.month}-${d.day}T${String(startHour).padStart(2, "0")}:00:00+09:30`,
  );
}

export function hoursBetween(from: string | Date, to: string | Date): number {
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  return Math.max(0, (b - a) / 3_600_000);
}

export const GPS_PEOPLE = ["Kate", "Jas", "Samantha Rae", "Crew"] as const;

export const PING_MS = 30 * 60 * 1000;
