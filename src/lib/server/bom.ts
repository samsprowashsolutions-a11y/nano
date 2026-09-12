import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { DEFAULT_FENCE } from "@/lib/gps";

export type BomObs = {
  source: "BOM" | "Open-Meteo";
  station: string;
  bomId: string | null;
  at: string;
  tempC: number | null;
  humidity: number | null;
  rainMm: number | null;
  windKmh: number | null;
  windDir: string | null;
  condition: string;
  lat: number;
  lng: number;
  suggestHold: boolean;
  holdWhy: string[];
  line: string;
};

function holdFrom(obs: Omit<BomObs, "suggestHold" | "holdWhy" | "line">): BomObs {
  const holdWhy: string[] = [];
  if (obs.tempC != null && (obs.tempC < 5 || obs.tempC > 35)) holdWhy.push("Temperature outside 5–35°C.");
  if (obs.humidity != null && obs.humidity > 90) holdWhy.push("Humidity above 90%.");
  if (obs.rainMm != null && obs.rainMm > 0) holdWhy.push("Rain recorded.");
  const line = [
    obs.station,
    obs.tempC != null ? `${obs.tempC.toFixed(1)}°C` : null,
    obs.humidity != null ? `RH ${obs.humidity}%` : null,
    obs.rainMm != null ? `rain ${obs.rainMm} mm` : null,
    obs.windKmh != null ? `wind ${obs.windKmh} km/h ${obs.windDir ?? ""}`.trim() : null,
    obs.condition,
  ]
    .filter(Boolean)
    .join(" · ");
  return { ...obs, suggestHold: holdWhy.length > 0, holdWhy, line };
}

async function grab(url: string, ms = 8000): Promise<unknown | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "NanoAssure-ClimaScan/1.0 (samsprowashsolutions; analysis@nanoassure.net)",
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function fromBom(lat: number, lng: number): Promise<BomObs | null> {
  const search = (await grab(
    `https://api.weather.bom.gov.au/v1/locations?search=${lat},${lng}`,
  )) as { data?: { geohash?: string; name?: string }[] } | null;
  const hit = search?.data?.[0];
  if (!hit?.geohash) return null;
  const hash = hit.geohash.slice(0, 6);
  const obs = (await grab(`https://api.weather.bom.gov.au/v1/locations/${hash}/observations`)) as {
    metadata?: { observation_time?: string };
    data?: {
      temp?: number;
      humidity?: number;
      rain_since_9am?: number;
      wind?: { speed_kilometre?: number; direction?: string };
      station?: { name?: string; bom_id?: string };
    };
  } | null;
  const d = obs?.data;
  if (!d || d.temp == null) return null;
  return holdFrom({
    source: "BOM",
    station: d.station?.name ?? hit.name ?? "BOM station",
    bomId: d.station?.bom_id ?? null,
    at: obs?.metadata?.observation_time ?? new Date().toISOString(),
    tempC: d.temp ?? null,
    humidity: d.humidity ?? null,
    rainMm: d.rain_since_9am ?? null,
    windKmh: d.wind?.speed_kilometre ?? null,
    windDir: d.wind?.direction ?? null,
    condition: (d.rain_since_9am ?? 0) > 0 ? "Rain since 9am" : "No rain since 9am",
    lat,
    lng,
  });
}

const WMO: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  51: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Showers",
  95: "Thunder",
};

async function fromOpenMeteo(lat: number, lng: number): Promise<BomObs | null> {
  const j = (await grab(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&timezone=Australia%2FDarwin`,
  )) as {
    current?: {
      time?: string;
      temperature_2m?: number;
      relative_humidity_2m?: number;
      precipitation?: number;
      rain?: number;
      weather_code?: number;
      wind_speed_10m?: number;
      wind_direction_10m?: number;
    };
  } | null;
  const c = j?.current;
  if (!c || c.temperature_2m == null) return null;
  const rain = c.rain ?? c.precipitation ?? 0;
  return holdFrom({
    source: "Open-Meteo",
    station: "Nearest model grid (BOM-region climate)",
    bomId: null,
    at: c.time ?? new Date().toISOString(),
    tempC: c.temperature_2m,
    humidity: c.relative_humidity_2m ?? null,
    rainMm: rain,
    windKmh: c.wind_speed_10m ?? null,
    windDir: c.wind_direction_10m != null ? `${c.wind_direction_10m}°` : null,
    condition: WMO[c.weather_code ?? 0] ?? "Current",
    lat,
    lng,
  });
}

async function fromDarwinAirport(): Promise<BomObs | null> {
  const j = (await grab("https://www.bom.gov.au/fwo/IDD60901/IDD60901.94120.json")) as {
    observations?: {
      data?: {
        name?: string;
        local_date_time_full?: string;
        air_temp?: string;
        rel_hum?: string;
        rain_trace?: string;
        wind_spd_kmh?: string;
        wind_dir?: string;
        weather?: string;
      }[];
    };
  } | null;
  const d = j?.observations?.data?.[0];
  if (!d) return null;
  const temp = Number(d.air_temp);
  const rh = Number(d.rel_hum);
  const rain = Number(d.rain_trace);
  return holdFrom({
    source: "BOM",
    station: d.name ?? "Darwin Airport",
    bomId: "014015",
    at: d.local_date_time_full ?? new Date().toISOString(),
    tempC: Number.isFinite(temp) ? temp : null,
    humidity: Number.isFinite(rh) ? rh : null,
    rainMm: Number.isFinite(rain) ? rain : null,
    windKmh: Number.isFinite(Number(d.wind_spd_kmh)) ? Number(d.wind_spd_kmh) : null,
    windDir: d.wind_dir ?? null,
    condition: d.weather || ((Number.isFinite(rain) && rain > 0) ? "Rain" : "Observation"),
    lat: -12.4239,
    lng: 130.8925,
  });
}

export const getBomObservation = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const lat = data.lat ?? DEFAULT_FENCE.lat;
    const lng = data.lng ?? DEFAULT_FENCE.lng;
    const bom = await fromBom(lat, lng);
    if (bom) return bom;
    const fwo = await fromDarwinAirport();
    if (fwo) return fwo;
    const om = await fromOpenMeteo(lat, lng);
    if (om) return om;
    return holdFrom({
      source: "BOM",
      station: "No live feed",
      bomId: null,
      at: new Date().toISOString(),
      tempC: null,
      humidity: null,
      rainMm: null,
      windKmh: null,
      windDir: null,
      condition: "Weather unavailable — log by hand.",
      lat,
      lng,
    });
  });
