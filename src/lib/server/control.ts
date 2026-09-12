import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  N7_STAGES,
  NANODATA_LIMIT,
  READINESS_CATEGORIES,
  VAULT_NAMESPACES,
  canAdvance,
  type VaultNamespace,
} from "@/lib/control";

type Sql = Awaited<ReturnType<typeof getSql>>;

async function nextVaultRef(sql: Sql, namespace: VaultNamespace) {
  const rows = await sql<{ n: number }>`
    insert into vault_sequences (namespace, next_n) values (${namespace}, 2)
    on conflict (namespace) do update set next_n = vault_sequences.next_n + 1
    returning (vault_sequences.next_n - 1) as n
  `;
  return `${namespace}${String(rows[0]?.n ?? 1).padStart(6, "0")}`;
}

async function audit(sql: Sql, uid: string, actor: string, action: string, module: string, detail: string) {
  await sql`
    insert into audit_events (user_id, actor, action, module, detail)
    values (${uid}, ${actor}, ${action}, ${module}, ${detail})
  `;
}

export const controlSnapshot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const empty = {
      projects: [],
      holds: [],
      tests: [],
      evidence: [],
      ocr: [],
      readiness: [],
      events: [],
      limit: NANODATA_LIMIT,
      openHolds: 0,
      pendingReview: 0,
    };
    try {
    const sql = await getSql();
    const uid = context.userId;
    const projects = await sql<{
      id: number;
      vault_ref: string;
      project_ref: string;
      asset_ref: string;
      client_name: string;
      site: string;
      surface: string | null;
      current_stage: string;
      hold_open: boolean;
      created_at: string;
    }>`
      select id, vault_ref, project_ref, asset_ref, client_name, site, surface, current_stage, hold_open, created_at
      from n7_projects where user_id = ${uid} order by created_at desc
    `;
    const holds = await sql<{
      id: number;
      vault_ref: string;
      kind: string;
      owner_name: string;
      reason: string;
      status: string;
      created_at: string;
    }>`
      select id, vault_ref, kind, owner_name, reason, status, created_at
      from hold_events where user_id = ${uid} order by created_at desc limit 40
    `;
    const tests = await sql<{
      id: number;
      vault_ref: string;
      project_id: number;
      test_type: string;
      operator: string;
      raw_result: string;
      review_state: string;
      issue_status: string;
      created_at: string;
    }>`
      select id, vault_ref, project_id, test_type, operator, raw_result, review_state, issue_status, created_at
      from nanodata_records where user_id = ${uid} order by created_at desc limit 40
    `;
    const evidence = await sql<{
      id: number;
      vault_ref: string;
      n7_stage: string | null;
      evidence_type: string;
      review_state: string;
      uploader: string;
      created_at: string;
    }>`
      select id, vault_ref, n7_stage, evidence_type, review_state, uploader, created_at
      from evidence_items where user_id = ${uid} order by created_at desc limit 20
    `;
    const ocr = await sql<{
      id: number;
      vault_ref: string;
      use_case: string;
      ocr_status: string;
      review_state: string;
      created_at: string;
    }>`
      select id, vault_ref, use_case, ocr_status, review_state, created_at
      from ocr_intake where user_id = ${uid} order by created_at desc limit 20
    `;
    const readiness = await sql<{
      id: number;
      job_id: number | null;
      category: string;
      result: string;
      owner_name: string;
      review_state: string;
    }>`
      select id, job_id, category, result, owner_name, review_state
      from job_readiness where user_id = ${uid} order by created_at desc
    `;
    const events = await sql<{
      id: number;
      project_id: number;
      stage: string;
      status: string;
      owner_name: string;
      hold_reason: string | null;
      created_at: string;
    }>`
      select id, project_id, stage, status, owner_name, hold_reason, created_at
      from n7_stage_events where user_id = ${uid} order by created_at desc limit 80
    `;
    return {
      projects,
      holds,
      tests,
      evidence,
      ocr,
      readiness,
      events,
      limit: NANODATA_LIMIT,
      openHolds: holds.filter((h) => h.status === "OPEN").length,
      pendingReview: tests.filter((t) => t.review_state === "pending").length,
    };
    } catch {
      return empty;
    }
  });

export const openN7Project = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      clientName: z.string().min(2).max(160),
      site: z.string().min(2).max(200),
      surface: z.string().max(80).optional(),
      projectRef: z.string().min(2).max(80),
      assetRef: z.string().min(2).max(80),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const vaultRef = await nextVaultRef(sql, "SP-PRJ-");
    const rows = await sql<{ id: number }>`
      insert into n7_projects (user_id, vault_ref, project_ref, asset_ref, client_name, site, surface)
      values (
        ${context.userId}, ${vaultRef}, ${data.projectRef}, ${data.assetRef},
        ${data.clientName}, ${data.site}, ${data.surface ?? null}
      )
      returning id
    `;
    await sql`
      insert into vault_records (user_id, vault_ref, namespace, physical_ref, category_ref, entity_name, n7_stage)
      values (
        ${context.userId}, ${vaultRef}, ${"SP-PRJ-"}, ${data.projectRef}, ${data.assetRef},
        ${data.clientName + " · " + data.site}, ${"INS"}
      )
    `;
    await audit(sql, context.userId, context.userId, "n7.project.created", "n7", vaultRef);
    return { ok: true as const, id: rows[0]?.id ?? 0, vaultRef };
  });

export const submitN7Stage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      projectId: z.number(),
      stage: z.string().min(3).max(4),
      ownerName: z.string().min(2).max(120),
      payload: z.record(z.string(), z.string()),
      evidenceRefs: z.string().max(400).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const project = (
      await sql<{ id: number; current_stage: string; hold_open: boolean }>`
        select id, current_stage, hold_open from n7_projects
        where id = ${data.projectId} and user_id = ${context.userId}
      `
    )[0];
    if (!project) return { ok: false as const, reason: "Project not found." };
    const idx = N7_STAGES.findIndex((s) => s.code === data.stage);
    const cur = N7_STAGES.findIndex((s) => s.code === project.current_stage);
    const prevComplete = idx === 0 || idx <= cur;
    const openHolds = (
      await sql<{ n: number }>`
        select count(*)::int as n from hold_events
        where user_id = ${context.userId} and status = 'OPEN' and related_record = ${String(data.projectId)}
      `
    )[0]?.n ?? 0;
    const gate = canAdvance({
      stageIndex: idx,
      previousComplete: prevComplete && !project.hold_open,
      openHolds,
      payload: data.payload,
    });
    if (!gate.ok) {
      const holdRef = await nextVaultRef(sql, "SP-HLD-");
      await sql`
        insert into hold_events (user_id, vault_ref, kind, owner_name, reason, related_record, authority)
        values (
          ${context.userId}, ${holdRef}, ${"document"}, ${data.ownerName}, ${gate.reason ?? "HOLD"},
          ${String(data.projectId)}, ${data.ownerName}
        )
      `;
      await sql`update n7_projects set hold_open = true where id = ${project.id}`;
      await sql`
        insert into n7_stage_events (user_id, project_id, stage, owner_name, payload, evidence_refs, status, hold_reason)
        values (
          ${context.userId}, ${project.id}, ${data.stage}, ${data.ownerName},
          ${JSON.stringify(data.payload)}::jsonb, ${data.evidenceRefs ?? null}, ${"hold"}, ${gate.reason ?? null}
        )
      `;
      await audit(sql, context.userId, data.ownerName, "n7.hold.created", "n7", gate.reason ?? "");
      return { ok: false as const, hold: true as const, reason: gate.reason, holdRef };
    }
    await sql`
      insert into n7_stage_events (user_id, project_id, stage, owner_name, payload, evidence_refs, status)
      values (
        ${context.userId}, ${project.id}, ${data.stage}, ${data.ownerName},
        ${JSON.stringify(data.payload)}::jsonb, ${data.evidenceRefs ?? null}, ${"complete"}
      )
    `;
    const next = N7_STAGES[Math.min(idx + 1, N7_STAGES.length - 1)]?.code ?? data.stage;
    await sql`
      update n7_projects set current_stage = ${idx < N7_STAGES.length - 1 ? next : data.stage}, hold_open = false
      where id = ${project.id}
    `;
    await audit(sql, context.userId, data.ownerName, "n7.stage.complete", "n7", data.stage);
    return { ok: true as const, next };
  });

export const saveNanodata = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      projectId: z.number(),
      testType: z.string().min(2).max(40),
      operator: z.string().min(2).max(120),
      rawResult: z.string().min(1).max(2000),
      evidenceName: z.string().max(160).optional(),
      evidenceData: z.string().max(1_500_000).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const vaultRef = await nextVaultRef(sql, "SP-INT-");
    await sql`
      insert into nanodata_records (
        user_id, vault_ref, project_id, test_type, operator, raw_result, evidence_name, evidence_data
      ) values (
        ${context.userId}, ${vaultRef}, ${data.projectId}, ${data.testType}, ${data.operator},
        ${data.rawResult}, ${data.evidenceName ?? null}, ${data.evidenceData ?? null}
      )
    `;
    await sql`
      insert into evidence_items (
        user_id, vault_ref, n7_stage, nanodata_test, uploader, source, evidence_type, file_name, file_data
      ) values (
        ${context.userId}, ${vaultRef}, ${"VER"}, ${data.testType}, ${data.operator},
        ${data.evidenceData ? "camera" : "field"}, ${"nanodata"}, ${data.evidenceName ?? null}, ${data.evidenceData ?? null}
      )
    `;
    await audit(sql, context.userId, data.operator, "nanodata.created", "nanodata", `${data.testType} ${vaultRef}`);
    return { ok: true as const, vaultRef, reviewState: "pending" as const, limit: NANODATA_LIMIT };
  });

export const reviewNanodata = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), pass: z.boolean(), reviewer: z.string().min(2).max(120) }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      update nanodata_records
      set review_state = ${data.pass ? "reviewed" : "hold"},
          issue_status = ${data.pass ? "ISSUABLE" : "HOLD — MISSING EVIDENCE"}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    await audit(sql, context.userId, data.reviewer, data.pass ? "nanodata.reviewed" : "nanodata.hold", "nanodata", String(data.id));
    return { ok: true as const };
  });

export const raiseHold = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      kind: z.enum(["document", "security", "legal", "archive"]),
      ownerName: z.string().min(2).max(120),
      reason: z.string().min(4).max(800),
      scope: z.string().max(200).optional(),
      relatedRecord: z.string().max(80).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const ns: VaultNamespace = data.kind === "security" ? "SP-QTN-" : "SP-HLD-";
    const vaultRef = await nextVaultRef(sql, ns);
    await sql`
      insert into hold_events (user_id, vault_ref, kind, owner_name, reason, scope, related_record, authority)
      values (
        ${context.userId}, ${vaultRef}, ${data.kind}, ${data.ownerName}, ${data.reason},
        ${data.scope ?? null}, ${data.relatedRecord ?? null}, ${data.ownerName}
      )
    `;
    if (data.relatedRecord) {
      const pid = Number(data.relatedRecord);
      if (Number.isFinite(pid)) await sql`update n7_projects set hold_open = true where id = ${pid} and user_id = ${context.userId}`;
    }
    await audit(sql, context.userId, data.ownerName, "hold.created", data.kind, vaultRef);
    return { ok: true as const, vaultRef };
  });

export const resolveHold = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), authority: z.string().min(2).max(120), remediation: z.string().min(2).max(800) }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      update hold_events
      set status = 'CLOSED / RESOLVED', authority = ${data.authority}, remediation = ${data.remediation}, resolved_at = now()
      where id = ${data.id} and user_id = ${context.userId}
    `;
    await audit(sql, context.userId, data.authority, "hold.resolved", "hold", String(data.id));
    return { ok: true as const };
  });

export const captureOcr = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      useCase: z.string().min(2).max(40),
      rawText: z.string().max(8000).optional(),
      sourceFile: z.string().max(160).optional(),
      fileData: z.string().max(1_500_000).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const vaultRef = await nextVaultRef(sql, "SP-DOC-");
    await sql`
      insert into ocr_intake (user_id, vault_ref, use_case, raw_text, ocr_status, review_state, source_file)
      values (
        ${context.userId}, ${vaultRef}, ${data.useCase}, ${data.rawText ?? null}, ${"captured"}, ${"pending"}, ${data.sourceFile ?? null}
      )
    `;
    await sql`
      insert into evidence_items (
        user_id, vault_ref, uploader, source, evidence_type, review_state, file_name, file_data, notes
      ) values (
        ${context.userId}, ${vaultRef}, ${context.userId}, ${"scan"}, ${data.useCase}, ${"pending"},
        ${data.sourceFile ?? null}, ${data.fileData ?? null}, ${"OCR captured — not verified"}
      )
    `;
    await audit(sql, context.userId, context.userId, "ocr.captured", "ocr", vaultRef);
    return { ok: true as const, vaultRef, ocrStatus: "captured" as const, note: "Scanned is not verified. OCR is not treated as verified evidence." };
  });

export const setReadiness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      jobId: z.number().optional(),
      projectId: z.number().optional(),
      category: z.string().min(2).max(40),
      ownerName: z.string().min(2).max(120),
      sourceRecord: z.string().max(120).optional(),
      satisfied: z.boolean(),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    if (!READINESS_CATEGORIES.some((c) => c.id === data.category)) {
      return { ok: false as const, reason: "Unknown readiness category." };
    }
    const result = data.satisfied ? "satisfied" : "HOLD — COMPLIANCE GAP";
    await sql`
      insert into job_readiness (user_id, job_id, project_id, category, source_record, review_state, owner_name, result)
      values (
        ${context.userId}, ${data.jobId ?? null}, ${data.projectId ?? null}, ${data.category},
        ${data.sourceRecord ?? null}, ${data.satisfied ? "reviewed" : "pending"}, ${data.ownerName}, ${result}
      )
    `;
    return { ok: true as const, result };
  });

export const issueReadiness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ jobId: z.number(), ownerName: z.string().min(2).max(120) }))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const rows = await sql<{ category: string; result: string }>`
      select distinct on (category) category, result
      from job_readiness
      where user_id = ${context.userId} and job_id = ${data.jobId}
      order by category, created_at desc
    `;
    const missing = READINESS_CATEGORIES.filter((c) => !rows.find((r) => r.category === c.id && r.result === "satisfied"));
    if (missing.length) {
      const holdRef = await nextVaultRef(sql, "SP-CHK-");
      await sql`
        insert into hold_events (user_id, vault_ref, kind, owner_name, reason, related_record, authority)
        values (
          ${context.userId}, ${holdRef}, ${"document"}, ${data.ownerName},
          ${"HOLD — COMPLIANCE GAP: " + missing.map((m) => m.label).join(", ")},
          ${String(data.jobId)}, ${data.ownerName}
        )
      `;
      return { ok: false as const, result: "HOLD — COMPLIANCE GAP" as const, missing: missing.map((m) => m.label), holdRef };
    }
    await audit(sql, context.userId, data.ownerName, "readiness.pass", "jobs", String(data.jobId));
    return {
      ok: true as const,
      result: "PASS — READY FOR DEPLOYMENT" as const,
      note: "PASS authorises deployment readiness only. It does not replace technical verification, commercial approval, client release or handover.",
    };
  });
