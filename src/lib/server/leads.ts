import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

const leadSchema = z.object({
  organisation: z.string().min(2).max(160),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional(),
  sector: z.string().min(2).max(80),
  notes: z.string().max(2000).optional(),
});

export const submitAnalysis = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into analysis_requests (organisation, contact_name, email, phone, sector, notes)
      values (${data.organisation}, ${data.contactName}, ${data.email}, ${data.phone ?? null}, ${data.sector}, ${data.notes ?? null})
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listAnalysis = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: number;
      organisation: string;
      contact_name: string;
      email: string;
      phone: string | null;
      sector: string;
      notes: string | null;
      status: string;
      created_at: string;
    }>`
      select id, organisation, contact_name, email, phone, sector, notes, status, created_at
      from analysis_requests
      order by created_at desc
      limit 80
    `;
  });

const statusSchema = z.object({
  id: z.number(),
  status: z.enum(["new", "review", "quoted", "closed"]),
});

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(statusSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      update analysis_requests set status = ${data.status} where id = ${data.id}
    `;
    return { ok: true as const };
  });

const verifySchema = z.object({
  clientName: z.string().min(2).max(160),
  site: z.string().min(2).max(200),
  product: z.string().min(2).max(160),
});

export const issueVerify = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(verifySchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const d = new Date();
    const stamp = d.toISOString().slice(0, 10).replaceAll("-", "");
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const verifyId = `NA-${stamp}-${suffix}`;
    await sql`
      insert into verify_records (verify_id, client_name, site, product, issued_on, created_by)
      values (${verifyId}, ${data.clientName}, ${data.site}, ${data.product}, ${d.toISOString().slice(0, 10)}, ${context.userId})
    `;
    return { ok: true as const, verifyId };
  });

export const listVerify = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: number;
      verify_id: string;
      client_name: string;
      site: string;
      product: string;
      issued_on: string;
      status: string;
    }>`
      select id, verify_id, client_name, site, product, issued_on, status
      from verify_records
      order by created_at desc
      limit 60
    `;
  });

export const lookupVerify = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(6).max(40) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{
      verify_id: string;
      client_name: string;
      site: string;
      product: string;
      issued_on: string;
      status: string;
    }>`
      select verify_id, client_name, site, product, issued_on, status
      from verify_records
      where verify_id = ${data.id.toUpperCase()}
      limit 1
    `;
    return rows[0] ?? null;
  });

const testSchema = z.object({
  site: z.string().min(2).max(200),
  product: z.string().min(2).max(160),
  adhesion: z.boolean(),
  beading: z.boolean(),
  uv: z.boolean(),
  antimicrobial: z.boolean(),
  durability: z.boolean(),
  initials: z.string().max(8).optional(),
  notes: z.string().max(800).optional(),
});

export const saveFieldTest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(testSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      insert into field_tests (site, product, adhesion, beading, uv, antimicrobial, durability, completed_by, initials, notes)
      values (
        ${data.site}, ${data.product}, ${data.adhesion}, ${data.beading}, ${data.uv},
        ${data.antimicrobial}, ${data.durability}, ${context.userId}, ${data.initials ?? null}, ${data.notes ?? null}
      )
    `;
    return { ok: true as const };
  });

export const listFieldTests = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: number;
      site: string;
      product: string;
      adhesion: boolean;
      beading: boolean;
      uv: boolean;
      antimicrobial: boolean;
      durability: boolean;
      completed_by: string;
      initials: string | null;
      created_at: string;
    }>`
      select id, site, product, adhesion, beading, uv, antimicrobial, durability, completed_by, initials, created_at
      from field_tests
      order by created_at desc
      limit 40
    `;
  });
