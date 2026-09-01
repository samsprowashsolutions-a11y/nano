import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";


export const commandSnapshot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const uid = context.userId;
    const count = async (table: string) => {
      const rows = await sql.query<{ n: number }>(
        `select count(*)::int as n from ${table} where user_id = $1`,
        [uid],
      );
      return rows[0]?.n ?? 0;
    };
    const [clients, vault, warranties, qr, ops, jobs, posts] = await Promise.all([
      count("atelier_clients"),
      count("vault_items"),
      count("warranties"),
      count("qr_records"),
      count("ops_reports"),
      count("qa_jobs"),
      count("site_posts"),
    ]);
    const leads = await sql<{ n: number }>`select count(*)::int as n from analysis_requests`;
    const tests = await sql<{ n: number }>`select count(*)::int as n from field_tests`;
    const certs = await sql<{ n: number }>`select count(*)::int as n from verify_records`;
    const recentOps = await sql<{
      id: number;
      report_date: string;
      body: string;
      published_public: boolean;
      published_atelier: boolean;
    }>`
      select id, report_date, body, published_public, published_atelier
      from ops_reports where user_id = ${uid}
      order by created_at desc limit 5
    `;
    const recentJobs = await sql<{
      id: number;
      client_name: string;
      site: string;
      product: string;
      apa: string;
      rpt: string;
      dat: string;
      hlt: string;
      crt: string;
      dep: string;
      nia: string;
    }>`
      select id, client_name, site, product, apa, rpt, dat, hlt, crt, dep, nia
      from qa_jobs where user_id = ${uid}
      order by created_at desc limit 5
    `;
    const recentVault = await sql<{
      id: number;
      folder: string;
      title: string;
      created_at: string;
    }>`
      select id, folder, title, created_at from vault_items
      where user_id = ${uid} order by created_at desc limit 6
    `;
    const postsList = await sql<{
      id: number;
      channel: string;
      title: string;
      body: string;
      published: boolean;
      created_at: string;
    }>`
      select id, channel, title, body, published, created_at
      from site_posts where user_id = ${uid}
      order by created_at desc limit 12
    `;
    const inbox = await sql<{
      id: number;
      organisation: string;
      contact_name: string;
      status: string;
      created_at: string;
    }>`
      select id, organisation, contact_name, status, created_at
      from analysis_requests order by created_at desc limit 6
    `;
    return {
      counts: {
        clients,
        vault,
        warranties,
        qr,
        ops,
        jobs,
        posts,
        leads: leads[0]?.n ?? 0,
        tests: tests[0]?.n ?? 0,
        certs: certs[0]?.n ?? 0,
      },
      recentOps,
      recentJobs,
      recentVault,
      posts: postsList,
      inbox,
    };
  });

const clientSchema = z.object({
  name: z.string().min(2).max(160),
  organisation: z.string().max(160).optional(),
  email: z.string().max(160).optional(),
  phone: z.string().max(40).optional(),
  sector: z.string().max(80).optional(),
  notes: z.string().max(2000).optional(),
});

export const saveClient = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(clientSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into atelier_clients (user_id, name, organisation, email, phone, sector, notes)
      values (
        ${context.userId}, ${data.name}, ${data.organisation ?? null}, ${data.email ?? null},
        ${data.phone ?? null}, ${data.sector ?? null}, ${data.notes ?? null}
      )
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listClients = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{
      id: number;
      name: string;
      organisation: string | null;
      email: string | null;
      phone: string | null;
      sector: string | null;
      notes: string | null;
    }>`
      select id, name, organisation, email, phone, sector, notes
      from atelier_clients where user_id = ${context.userId}
      order by name
    `;
  });

const docSchema = z.object({
  clientId: z.number(),
  title: z.string().min(2).max(160),
  kind: z.string().min(2).max(40),
  fileName: z.string().max(160).optional(),
  fileData: z.string().max(1_500_000).optional(),
});

export const saveClientDoc = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(docSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into client_documents (user_id, client_id, title, kind, file_name, file_data)
      values (
        ${context.userId}, ${data.clientId}, ${data.title}, ${data.kind},
        ${data.fileName ?? null}, ${data.fileData ?? null}
      )
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listClientDocs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ clientId: z.number() }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    return sql<{
      id: number;
      title: string;
      kind: string;
      file_name: string | null;
      created_at: string;
    }>`
      select id, title, kind, file_name, created_at from client_documents
      where user_id = ${context.userId} and client_id = ${data.clientId}
      order by created_at desc
    `;
  });

const warrantySchema = z.object({
  clientId: z.number(),
  product: z.string().min(2).max(160),
  verifyId: z.string().max(40).optional(),
  startsOn: z.string().min(8).max(12),
  endsOn: z.string().min(8).max(12),
  terms: z.string().max(2000).optional(),
  documentId: z.number().optional(),
});

export const saveWarranty = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(warrantySchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into warranties (
        user_id, client_id, product, verify_id, starts_on, ends_on, terms, document_id
      ) values (
        ${context.userId}, ${data.clientId}, ${data.product}, ${data.verifyId ?? null},
        ${data.startsOn}, ${data.endsOn}, ${data.terms ?? null}, ${data.documentId ?? null}
      )
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listWarranties = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{
      id: number;
      client_id: number;
      product: string;
      verify_id: string | null;
      starts_on: string;
      ends_on: string;
      terms: string | null;
      document_id: number | null;
      status: string;
      client_name: string;
    }>`
      select w.id, w.client_id, w.product, w.verify_id, w.starts_on, w.ends_on, w.terms,
             w.document_id, w.status, c.name as client_name
      from warranties w
      join atelier_clients c on c.id = w.client_id
      where w.user_id = ${context.userId}
      order by w.created_at desc
    `;
  });

const vaultSchema = z.object({
  folder: z.enum(["tax", "bas", "super", "finance", "receipt"]),
  title: z.string().min(2).max(160),
  period: z.string().max(40).optional(),
  amount: z.string().max(40).optional(),
  gst: z.string().max(40).optional(),
  abn: z.string().max(20).optional(),
  supplier: z.string().max(160).optional(),
  notes: z.string().max(2000).optional(),
  fileName: z.string().max(160).optional(),
  fileData: z.string().max(1_500_000).optional(),
});

export const saveVaultItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(vaultSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      insert into vault_items (
        user_id, folder, title, period, amount, gst, abn, supplier, notes, file_name, file_data
      ) values (
        ${context.userId}, ${data.folder}, ${data.title}, ${data.period ?? null}, ${data.amount ?? null},
        ${data.gst ?? null}, ${data.abn ?? null}, ${data.supplier ?? null}, ${data.notes ?? null},
        ${data.fileName ?? null}, ${data.fileData ?? null}
      )
    `;
    return { ok: true as const };
  });

export const listVault = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ folder: z.string().optional() }).optional())
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    if (data?.folder) {
      return sql<{
        id: number;
        folder: string;
        title: string;
        period: string | null;
        amount: string | null;
        gst: string | null;
        abn: string | null;
        supplier: string | null;
        notes: string | null;
        file_name: string | null;
        file_data: string | null;
        created_at: string;
      }>`
        select id, folder, title, period, amount, gst, abn, supplier, notes, file_name, file_data, created_at
        from vault_items where user_id = ${context.userId} and folder = ${data.folder}
        order by created_at desc
      `;
    }
    return sql<{
      id: number;
      folder: string;
      title: string;
      period: string | null;
      amount: string | null;
      gst: string | null;
      abn: string | null;
      supplier: string | null;
      notes: string | null;
      file_name: string | null;
      file_data: string | null;
      created_at: string;
    }>`
      select id, folder, title, period, amount, gst, abn, supplier, notes, file_name, file_data, created_at
      from vault_items where user_id = ${context.userId}
      order by created_at desc
    `;
  });

const qrSchema = z.object({
  kind: z.string().min(2).max(40),
  label: z.string().min(2).max(160),
  payload: z.string().min(1).max(500),
});

export const saveQr = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(qrSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into qr_records (user_id, kind, label, payload)
      values (${context.userId}, ${data.kind}, ${data.label}, ${data.payload})
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listQr = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{
      id: number;
      kind: string;
      label: string;
      payload: string;
      created_at: string;
    }>`
      select id, kind, label, payload, created_at from qr_records
      where user_id = ${context.userId} order by created_at desc limit 40
    `;
  });

const opsSchema = z.object({
  reportDate: z.string().min(8).max(12),
  weather: z.string().max(120).optional(),
  sites: z.string().max(400).optional(),
  completed: z.string().max(400).optional(),
  hazards: z.string().max(400).optional(),
  body: z.string().min(8).max(4000),
  publishPublic: z.boolean(),
  publishAtelier: z.boolean(),
});

export const saveOpsReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(opsSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into ops_reports (
        user_id, report_date, weather, sites, completed, hazards, body,
        published_public, published_atelier
      ) values (
        ${context.userId}, ${data.reportDate}, ${data.weather ?? null}, ${data.sites ?? null},
        ${data.completed ?? null}, ${data.hazards ?? null}, ${data.body},
        ${data.publishPublic}, ${data.publishAtelier}
      )
      returning id
    `;
    if (data.publishPublic) {
      await sql`
        insert into site_posts (user_id, channel, title, body, published)
        values (
          ${context.userId}, ${"public"}, ${`Ops brief · ${data.reportDate}`}, ${data.body}, ${true}
        )
      `;
    }
    if (data.publishAtelier) {
      await sql`
        insert into site_posts (user_id, channel, title, body, published)
        values (
          ${context.userId}, ${"atelier"}, ${`Ops brief · ${data.reportDate}`}, ${data.body}, ${true}
        )
      `;
    }
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listOpsReports = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{
      id: number;
      report_date: string;
      weather: string | null;
      sites: string | null;
      completed: string | null;
      hazards: string | null;
      body: string;
      published_public: boolean;
      published_atelier: boolean;
    }>`
      select id, report_date, weather, sites, completed, hazards, body, published_public, published_atelier
      from ops_reports where user_id = ${context.userId}
      order by created_at desc limit 40
    `;
  });

const postSchema = z.object({
  channel: z.enum(["public", "atelier"]),
  title: z.string().min(2).max(160),
  body: z.string().min(4).max(4000),
  published: z.boolean(),
});

export const saveSitePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(postSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      insert into site_posts (user_id, channel, title, body, published)
      values (${context.userId}, ${data.channel}, ${data.title}, ${data.body}, ${data.published})
    `;
    return { ok: true as const };
  });

export const togglePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), published: z.boolean() }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      update site_posts set published = ${data.published}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export const listPublicBriefs = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<{ id: number; title: string; body: string; created_at: string }>`
    select id, title, body, created_at from site_posts
    where channel = ${"public"} and published = ${true}
    order by created_at desc limit 6
  `;
});

export const listAtelierBriefs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<{ id: number; title: string; body: string; created_at: string }>`
      select id, title, body, created_at from site_posts
      where channel = ${"atelier"} and published = ${true}
      order by created_at desc limit 8
    `;
  });

const jobSchema = z.object({
  clientName: z.string().min(2).max(160),
  site: z.string().min(2).max(200),
  product: z.string().min(2).max(160),
  notes: z.string().max(2000).optional(),
});

export const saveQaJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(jobSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into qa_jobs (user_id, client_name, site, product, notes)
      values (${context.userId}, ${data.clientName}, ${data.site}, ${data.product}, ${data.notes ?? null})
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

const stepSchema = z.object({
  id: z.number(),
  step: z.enum(["apa", "rpt", "dat", "hlt", "crt", "dep", "nia"]),
  status: z.enum(["pending", "live", "hold", "passed"]),
  verifyId: z.string().max(40).optional(),
});

export const setQaStep = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(stepSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const col = data.step;
    await sql.query(
      `update qa_jobs set ${col} = $1, verify_id = coalesce($2, verify_id)
       where id = $3 and user_id = $4`,
      [data.status, data.verifyId ?? null, data.id, context.userId],
    );
    return { ok: true as const };
  });

export const listQaJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{
      id: number;
      client_name: string;
      site: string;
      product: string;
      verify_id: string | null;
      apa: string;
      rpt: string;
      dat: string;
      hlt: string;
      crt: string;
      dep: string;
      nia: string;
      notes: string | null;
    }>`
      select id, client_name, site, product, verify_id, apa, rpt, dat, hlt, crt, dep, nia, notes
      from qa_jobs where user_id = ${context.userId}
      order by created_at desc
    `;
  });
