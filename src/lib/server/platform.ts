import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { PRODUCTS } from "@/lib/content";

async function ensure(sql: Sql) {
  await sql.query(`
    create table if not exists platform_jobs (
      id serial primary key, user_id text not null, client_name text not null, site text not null,
      product text, scope text, price text, crew text, scheduled_on text,
      status text not null default 'open', all_clear boolean not null default false,
      all_clear_by text, notes text, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists tds_register (
      id serial primary key, user_id text not null, product text not null, kind text not null,
      version text not null, issued_on text, expires_on text, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists contractors (
      id serial primary key, user_id text not null, name text not null, abn text, insurance text,
      insurance_expires text, licences text, competency text, status text not null default 'active',
      created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists academy_records (
      id serial primary key, user_id text not null, person text not null, course text not null,
      completed_on text, expires_on text, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists prestarts (
      id serial primary key, user_id text not null, job_ref text, site text not null,
      hazards text, ppe text, controls text, signed_by text, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists approvals (
      id serial primary key, user_id text not null, subject text not null, stage text not null,
      status text not null default 'pending', notes text, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists bulletins (
      id serial primary key, user_id text not null, audience text not null, title text not null,
      body text not null, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists audit_events (
      id serial primary key, user_id text not null, actor text not null, action text not null,
      module text not null, detail text, created_at timestamptz not null default now())`);
  await sql.query(`
    create table if not exists generated_docs (
      id serial primary key, user_id text not null, kind text not null, title text not null,
      body text not null, created_at timestamptz not null default now())`);
}

async function audit(sql: Sql, uid: string, action: string, module: string, detail?: string) {
  await sql`
    insert into audit_events (user_id, actor, action, module, detail)
    values (${uid}, ${uid}, ${action}, ${module}, ${detail ?? null})
  `;
}

export type JobRow = {
  id: number;
  client_name: string;
  site: string;
  product: string | null;
  scope: string | null;
  price: string | null;
  crew: string | null;
  scheduled_on: string | null;
  status: string;
  all_clear: boolean;
  all_clear_by: string | null;
  notes: string | null;
  created_at: string;
};

export const platformSnapshot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensure(sql);
    const uid = context.userId;
    const n = async (table: string, extra = "") => {
      const rows = await sql.query<{ n: number }>(
        `select count(*)::int as n from ${table} where user_id = $1 ${extra}`,
        [uid],
      );
      return rows[0]?.n ?? 0;
    };
    const jobs = await n("platform_jobs");
    const liveJobs = await n("platform_jobs", "and status <> 'complete'");
    const tds = await n("tds_register");
    const contractors = await n("contractors");
    const academy = await n("academy_records");
    const prestarts = await n("prestarts");
    const pending = await n("approvals", "and status = 'pending'");
    const bulletins = await n("bulletins");
    const docs = await n("generated_docs");
    const auditN = await n("audit_events");

    const jobRows = await sql<JobRow>`
      select id, client_name, site, product, scope, price, crew, scheduled_on, status,
        all_clear, all_clear_by, notes, created_at
      from platform_jobs where user_id = ${uid} order by created_at desc limit 20
    `;
    const tdsRows = await sql<{
      id: number; product: string; kind: string; version: string; issued_on: string | null; expires_on: string | null;
    }>`select id, product, kind, version, issued_on, expires_on from tds_register where user_id = ${uid} order by product`;
    if (tdsRows.length === 0) {
      for (const p of PRODUCTS) {
        await sql`
          insert into tds_register (user_id, product, kind, version, issued_on)
          values (${uid}, ${p.name}, ${"TDS"}, ${p.tds}, ${"current"})
        `;
        await sql`
          insert into tds_register (user_id, product, kind, version, issued_on)
          values (${uid}, ${p.name}, ${"SDS"}, ${p.sds}, ${"current"})
        `;
      }
    }
    const tdsFresh = tdsRows.length
      ? tdsRows
      : await sql<{
          id: number; product: string; kind: string; version: string; issued_on: string | null; expires_on: string | null;
        }>`select id, product, kind, version, issued_on, expires_on from tds_register where user_id = ${uid} order by product`;

    const contractorRows = await sql<{
      id: number; name: string; abn: string | null; insurance: string | null; insurance_expires: string | null;
      licences: string | null; competency: string | null; status: string;
    }>`select id, name, abn, insurance, insurance_expires, licences, competency, status from contractors where user_id = ${uid} order by name`;
    const academyRows = await sql<{
      id: number; person: string; course: string; completed_on: string | null; expires_on: string | null;
    }>`select id, person, course, completed_on, expires_on from academy_records where user_id = ${uid} order by person`;
    const prestartRows = await sql<{
      id: number; job_ref: string | null; site: string; hazards: string | null; ppe: string | null;
      controls: string | null; signed_by: string | null; created_at: string;
    }>`select id, job_ref, site, hazards, ppe, controls, signed_by, created_at from prestarts where user_id = ${uid} order by created_at desc limit 20`;
    const approvalRows = await sql<{
      id: number; subject: string; stage: string; status: string; notes: string | null; created_at: string;
    }>`select id, subject, stage, status, notes, created_at from approvals where user_id = ${uid} order by created_at desc limit 20`;
    const bulletinRows = await sql<{
      id: number; audience: string; title: string; body: string; created_at: string;
    }>`select id, audience, title, body, created_at from bulletins where user_id = ${uid} order by created_at desc limit 20`;
    const auditRows = await sql<{
      id: number; actor: string; action: string; module: string; detail: string | null; created_at: string;
    }>`select id, actor, action, module, detail, created_at from audit_events where user_id = ${uid} order by created_at desc limit 40`;
    const docRows = await sql<{
      id: number; kind: string; title: string; body: string; created_at: string;
    }>`select id, kind, title, body, created_at from generated_docs where user_id = ${uid} order by created_at desc limit 20`;

    const today = new Date().toISOString().slice(0, 10);
    const expiring = [
      ...contractorRows
        .filter((c) => c.insurance_expires && c.insurance_expires <= today)
        .map((c) => `${c.name} insurance ${c.insurance_expires}`),
      ...academyRows
        .filter((a) => a.expires_on && a.expires_on <= today)
        .map((a) => `${a.person} · ${a.course} expired ${a.expires_on}`),
      ...tdsFresh
        .filter((t) => t.expires_on && t.expires_on <= today)
        .map((t) => `${t.product} ${t.kind} expired ${t.expires_on}`),
    ];
    const missingTds = jobRows.filter((j) => {
      if (!j.product) return true;
      return !tdsFresh.some((t) => t.product === j.product && t.kind === "TDS");
    });
    const failedQa = jobRows.filter((j) => j.status === "hold");

    return {
      counts: {
        jobs,
        liveJobs,
        tds: tdsFresh.length,
        contractors: contractorRows.length,
        academy: academyRows.length,
        prestarts,
        pending,
        bulletins,
        docs,
        audit: auditN,
        alerts: expiring.length + pending + missingTds.length + failedQa.length,
      },
      jobs: jobRows,
      tds: tdsFresh,
      contractors: contractorRows,
      academy: academyRows,
      prestarts: prestartRows,
      approvals: approvalRows,
      bulletins: bulletinRows,
      audit: auditRows,
      docs: docRows,
      alerts: {
        expiring,
        pending,
        missingTds: missingTds.map((j) => `${j.client_name} · ${j.site}`),
        failedQa: failedQa.map((j) => `${j.client_name} · ${j.site}`),
      },
    };
  });

const jobSchema = z.object({
  clientName: z.string().min(2).max(160),
  site: z.string().min(2).max(200),
  product: z.string().max(160).optional(),
  scope: z.string().max(2000).optional(),
  price: z.string().max(40).optional(),
  crew: z.string().max(160).optional(),
  scheduledOn: z.string().max(40).optional(),
  notes: z.string().max(2000).optional(),
});

export const saveJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(jobSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    const tds = data.product
      ? await sql<{ id: number }>`
          select id from tds_register where user_id = ${context.userId} and product = ${data.product} and kind = 'TDS' limit 1
        `
      : [];
    const status = tds.length || !data.product ? "open" : "hold";
    const rows = await sql<{ id: number }>`
      insert into platform_jobs (user_id, client_name, site, product, scope, price, crew, scheduled_on, status, notes)
      values (
        ${context.userId}, ${data.clientName}, ${data.site}, ${data.product ?? null}, ${data.scope ?? null},
        ${data.price ?? null}, ${data.crew ?? null}, ${data.scheduledOn ?? null}, ${status}, ${data.notes ?? null}
      ) returning id
    `;
    if (status === "hold") {
      await sql`
        insert into approvals (user_id, subject, stage, status, notes)
        values (${context.userId}, ${`Job ${rows[0].id} missing TDS`}, ${"operations"}, ${"pending"}, ${"Compliance gate: no TDS on register."})
      `;
    }
    await audit(sql, context.userId, "opened job", "jobs", `${data.clientName} · ${data.site} · ${status}`);
    return { id: rows[0].id, status };
  });

export const setAllClear = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), by: z.string().min(1).max(80) }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      update platform_jobs set all_clear = true, all_clear_by = ${data.by}, status = 'all_clear'
      where id = ${data.id} and user_id = ${context.userId}
    `;
    await audit(sql, context.userId, "OPPS ALL CLEAR", "operations", `Job ${data.id} · ${data.by}`);
    return { ok: true };
  });

export const setJobStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), status: z.enum(["open", "live", "hold", "all_clear", "complete"]) }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`update platform_jobs set status = ${data.status} where id = ${data.id} and user_id = ${context.userId}`;
    await audit(sql, context.userId, `status ${data.status}`, "jobs", `Job ${data.id}`);
    return { ok: true };
  });

export const saveContractor = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(2).max(160),
      abn: z.string().max(20).optional(),
      insurance: z.string().max(160).optional(),
      insuranceExpires: z.string().max(20).optional(),
      licences: z.string().max(200).optional(),
      competency: z.string().max(200).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    await sql`
      insert into contractors (user_id, name, abn, insurance, insurance_expires, licences, competency)
      values (${context.userId}, ${data.name}, ${data.abn ?? null}, ${data.insurance ?? null},
        ${data.insuranceExpires ?? null}, ${data.licences ?? null}, ${data.competency ?? null})
    `;
    await audit(sql, context.userId, "contractor on", "contractors", data.name);
    return { ok: true };
  });

export const saveAcademy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      person: z.string().min(1).max(80),
      course: z.string().min(2).max(160),
      completedOn: z.string().max(20).optional(),
      expiresOn: z.string().max(20).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    await sql`
      insert into academy_records (user_id, person, course, completed_on, expires_on)
      values (${context.userId}, ${data.person}, ${data.course}, ${data.completedOn ?? null}, ${data.expiresOn ?? null})
    `;
    await audit(sql, context.userId, "academy", "academy", `${data.person} · ${data.course}`);
    return { ok: true };
  });

export const savePrestart = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      jobRef: z.string().max(40).optional(),
      site: z.string().min(2).max(200),
      hazards: z.string().max(2000).optional(),
      ppe: z.string().max(400).optional(),
      controls: z.string().max(2000).optional(),
      signedBy: z.string().max(80).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    await sql`
      insert into prestarts (user_id, job_ref, site, hazards, ppe, controls, signed_by)
      values (${context.userId}, ${data.jobRef ?? null}, ${data.site}, ${data.hazards ?? null},
        ${data.ppe ?? null}, ${data.controls ?? null}, ${data.signedBy ?? null})
    `;
    await audit(sql, context.userId, "pre-start", "whs", data.site);
    return { ok: true };
  });

export const saveApproval = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      subject: z.string().min(2).max(200),
      stage: z.enum(["technician", "supervisor", "operations", "director"]),
      notes: z.string().max(1000).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    await sql`
      insert into approvals (user_id, subject, stage, status, notes)
      values (${context.userId}, ${data.subject}, ${data.stage}, ${"pending"}, ${data.notes ?? null})
    `;
    await audit(sql, context.userId, "approval opened", "approvals", data.subject);
    return { ok: true };
  });

export const decideApproval = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), status: z.enum(["approved", "held"]) }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`update approvals set status = ${data.status} where id = ${data.id} and user_id = ${context.userId}`;
    await audit(sql, context.userId, data.status, "approvals", `Approval ${data.id}`);
    return { ok: true };
  });

export const saveBulletin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      audience: z.enum(["all", "kate", "jas", "staff", "crew"]),
      title: z.string().min(2).max(160),
      body: z.string().min(2).max(4000),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    await sql`
      insert into bulletins (user_id, audience, title, body)
      values (${context.userId}, ${data.audience}, ${data.title}, ${data.body})
    `;
    await audit(sql, context.userId, "bulletin", "email", `${data.audience} · ${data.title}`);
    return { ok: true };
  });

export const saveGeneratedDoc = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      kind: z.enum(["proposal", "qa-record", "compliance-pack", "handover", "report"]),
      title: z.string().min(2).max(160),
      body: z.string().min(2).max(8000),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    const rows = await sql<{ id: number }>`
      insert into generated_docs (user_id, kind, title, body)
      values (${context.userId}, ${data.kind}, ${data.title}, ${data.body})
      returning id
    `;
    await audit(sql, context.userId, "document", "documents", data.title);
    return { id: rows[0].id };
  });

export const saveTds = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      product: z.string().min(2).max(160),
      kind: z.enum(["TDS", "SDS"]),
      version: z.string().min(1).max(160),
      issuedOn: z.string().max(20).optional(),
      expiresOn: z.string().max(20).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensure(sql);
    await sql`
      insert into tds_register (user_id, product, kind, version, issued_on, expires_on)
      values (${context.userId}, ${data.product}, ${data.kind}, ${data.version}, ${data.issuedOn ?? null}, ${data.expiresOn ?? null})
    `;
    await audit(sql, context.userId, "TDS/SDS", "tds", `${data.product} ${data.kind} ${data.version}`);
    return { ok: true };
  });
