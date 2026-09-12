import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { DEFAULT_FENCE, hoursBetween } from "@/lib/gps";

async function ensureGps(sql: Sql) {
  await sql.query(`
    create table if not exists gps_fences (
      id serial primary key,
      user_id text not null,
      label text not null default 'Office',
      address text not null,
      lat double precision not null,
      lng double precision not null,
      radius_m integer not null default 150,
      start_hour integer not null default 9,
      end_hour integer not null default 15,
      created_at timestamptz not null default now()
    )`);
  await sql.query(`
    create table if not exists gps_sessions (
      id serial primary key,
      user_id text not null,
      person text not null,
      mode text not null,
      site text,
      started_at timestamptz not null default now(),
      paid_from timestamptz not null default now(),
      ended_at timestamptz,
      start_lat double precision,
      start_lng double precision,
      start_accuracy double precision,
      inside_fence boolean not null default false,
      hours numeric,
      notes text
    )`);
  await sql.query(`
    create table if not exists gps_pings (
      id serial primary key,
      user_id text not null,
      session_id integer not null,
      lat double precision not null,
      lng double precision not null,
      accuracy double precision,
      inside_fence boolean not null default false,
      recorded_at timestamptz not null default now()
    )`);
}

export type GpsFence = {
  id: number;
  label: string;
  address: string;
  lat: number;
  lng: number;
  radius_m: number;
  start_hour: number;
  end_hour: number;
};

export type GpsSession = {
  id: number;
  person: string;
  mode: string;
  site: string | null;
  started_at: string;
  paid_from: string;
  ended_at: string | null;
  start_lat: number | null;
  start_lng: number | null;
  start_accuracy: number | null;
  inside_fence: boolean;
  hours: number | null;
  notes: string | null;
};

export type GpsPing = {
  id: number;
  session_id: number;
  lat: number;
  lng: number;
  accuracy: number | null;
  inside_fence: boolean;
  recorded_at: string;
};

export const getGpsDesk = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureGps(sql);
    const uid = context.userId;
    let fence = (
      await sql<GpsFence>`
        select id, label, address, lat, lng, radius_m, start_hour, end_hour
        from gps_fences where user_id = ${uid} order by id asc limit 1
      `
    )[0];
    if (!fence) {
      const rows = await sql<{ id: number }>`
        insert into gps_fences (user_id, label, address, lat, lng, radius_m, start_hour, end_hour)
        values (
          ${uid}, ${DEFAULT_FENCE.label}, ${DEFAULT_FENCE.address},
          ${DEFAULT_FENCE.lat}, ${DEFAULT_FENCE.lng}, ${DEFAULT_FENCE.radiusM},
          ${DEFAULT_FENCE.startHour}, ${DEFAULT_FENCE.endHour}
        )
        returning id
      `;
      fence = {
        id: rows[0].id,
        label: DEFAULT_FENCE.label,
        address: DEFAULT_FENCE.address,
        lat: DEFAULT_FENCE.lat,
        lng: DEFAULT_FENCE.lng,
        radius_m: DEFAULT_FENCE.radiusM,
        start_hour: DEFAULT_FENCE.startHour,
        end_hour: DEFAULT_FENCE.endHour,
      };
    }
    const live = (
      await sql<GpsSession>`
        select id, person, mode, site, started_at, paid_from, ended_at,
          start_lat, start_lng, start_accuracy, inside_fence, hours, notes
        from gps_sessions where user_id = ${uid} and ended_at is null
        order by started_at desc limit 1
      `
    )[0] ?? null;
    const sessions = await sql<GpsSession>`
      select id, person, mode, site, started_at, paid_from, ended_at,
        start_lat, start_lng, start_accuracy, inside_fence, hours, notes
      from gps_sessions where user_id = ${uid}
      order by started_at desc limit 20
    `;
    const pings = live
      ? await sql<GpsPing>`
          select id, session_id, lat, lng, accuracy, inside_fence, recorded_at
          from gps_pings where session_id = ${live.id}
          order by recorded_at desc limit 24
        `
      : [];
    return { fence, live, sessions, pings };
  });

const fenceSchema = z.object({
  label: z.string().min(1).max(80),
  address: z.string().min(4).max(200),
  lat: z.number(),
  lng: z.number(),
  radiusM: z.number().min(30).max(2000),
  startHour: z.number().min(0).max(23),
  endHour: z.number().min(0).max(23),
});

export const saveGpsFence = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(fenceSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensureGps(sql);
    const existing = (
      await sql<{ id: number }>`select id from gps_fences where user_id = ${context.userId} order by id asc limit 1`
    )[0];
    if (existing) {
      await sql`
        update gps_fences set
          label = ${data.label}, address = ${data.address}, lat = ${data.lat}, lng = ${data.lng},
          radius_m = ${data.radiusM}, start_hour = ${data.startHour}, end_hour = ${data.endHour}
        where id = ${existing.id} and user_id = ${context.userId}
      `;
      return { id: existing.id };
    }
    const rows = await sql<{ id: number }>`
      insert into gps_fences (user_id, label, address, lat, lng, radius_m, start_hour, end_hour)
      values (
        ${context.userId}, ${data.label}, ${data.address}, ${data.lat}, ${data.lng},
        ${data.radiusM}, ${data.startHour}, ${data.endHour}
      ) returning id
    `;
    return { id: rows[0].id };
  });

const startSchema = z.object({
  person: z.string().min(1).max(80),
  mode: z.enum(["office", "field"]),
  site: z.string().max(200).optional(),
  lat: z.number(),
  lng: z.number(),
  accuracy: z.number(),
  insideFence: z.boolean(),
  paidFrom: z.string(),
});

export const startGpsSession = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(startSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensureGps(sql);
    const open = await sql<{ id: number }>`
      select id from gps_sessions where user_id = ${context.userId} and ended_at is null
    `;
    if (open.length) throw new Error("Sign off the open session first.");
    const rows = await sql<{ id: number }>`
      insert into gps_sessions (
        user_id, person, mode, site, paid_from, start_lat, start_lng, start_accuracy, inside_fence
      ) values (
        ${context.userId}, ${data.person}, ${data.mode}, ${data.site ?? null},
        ${data.paidFrom}, ${data.lat}, ${data.lng}, ${data.accuracy}, ${data.insideFence}
      ) returning id
    `;
    await sql`
      insert into gps_pings (user_id, session_id, lat, lng, accuracy, inside_fence)
      values (${context.userId}, ${rows[0].id}, ${data.lat}, ${data.lng}, ${data.accuracy}, ${data.insideFence})
    `;
    return { id: rows[0].id };
  });

const pingSchema = z.object({
  sessionId: z.number(),
  lat: z.number(),
  lng: z.number(),
  accuracy: z.number(),
  insideFence: z.boolean(),
});

export const saveGpsPing = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(pingSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      insert into gps_pings (user_id, session_id, lat, lng, accuracy, inside_fence)
      values (${context.userId}, ${data.sessionId}, ${data.lat}, ${data.lng}, ${data.accuracy}, ${data.insideFence})
    `;
    return { ok: true };
  });

export const endGpsSession = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ sessionId: z.number() }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const row = (
      await sql<GpsSession>`
        select id, person, mode, site, started_at, paid_from, ended_at,
          start_lat, start_lng, start_accuracy, inside_fence, hours, notes
        from gps_sessions where id = ${data.sessionId} and user_id = ${context.userId}
      `
    )[0];
    if (!row) throw new Error("Session not found.");
    if (row.ended_at) return { hours: Number(row.hours ?? 0) };
    const hours = hoursBetween(row.paid_from, new Date());
    await sql`
      update gps_sessions set ended_at = now(), hours = ${hours}
      where id = ${data.sessionId} and user_id = ${context.userId}
    `;
    return { hours };
  });
