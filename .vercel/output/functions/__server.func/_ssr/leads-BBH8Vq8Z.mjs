import { i as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CyCMUD-Z.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-Cu5ywmQs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-BBH8Vq8Z.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var leadSchema = object({
	organisation: string().min(2).max(160),
	contactName: string().min(2).max(120),
	email: string().email().max(160),
	phone: string().max(40).optional(),
	sector: string().min(2).max(80),
	notes: string().max(2e3).optional()
});
var submitAnalysis_createServerFn_handler = createServerRpc({
	id: "ef58acdc34bc43d29e02d9d015cbda1130698fb160464792c0143aefe1c7061b",
	name: "submitAnalysis",
	filename: "src/lib/server/leads.ts"
}, (opts) => submitAnalysis.__executeServer(opts));
var submitAnalysis = createServerFn({ method: "POST" }).validator(leadSchema).handler(submitAnalysis_createServerFn_handler, async ({ data }) => {
	return {
		ok: true,
		id: (await (await getSql())`
      insert into analysis_requests (organisation, contact_name, email, phone, sector, notes)
      values (${data.organisation}, ${data.contactName}, ${data.email}, ${data.phone ?? null}, ${data.sector}, ${data.notes ?? null})
      returning id
    `)[0]?.id ?? 0
	};
});
var listAnalysis_createServerFn_handler = createServerRpc({
	id: "9b75fe69c2063078843665788ad6fbd0ce3603f56f2026930061b732b80bc0f5",
	name: "listAnalysis",
	filename: "src/lib/server/leads.ts"
}, (opts) => listAnalysis.__executeServer(opts));
var listAnalysis = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAnalysis_createServerFn_handler, async () => {
	return (await getSql())`
      select id, organisation, contact_name, email, phone, sector, notes, status, created_at
      from analysis_requests
      order by created_at desc
      limit 80
    `;
});
var statusSchema = object({
	id: number(),
	status: _enum([
		"new",
		"review",
		"quoted",
		"closed"
	])
});
var updateLeadStatus_createServerFn_handler = createServerRpc({
	id: "0a085f52246af7785ce26eaf1bcb79dbe1a08e97de6d29e630dcafc1512305d9",
	name: "updateLeadStatus",
	filename: "src/lib/server/leads.ts"
}, (opts) => updateLeadStatus.__executeServer(opts));
var updateLeadStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(statusSchema).handler(updateLeadStatus_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      update analysis_requests set status = ${data.status} where id = ${data.id}
    `;
	return { ok: true };
});
var verifySchema = object({
	clientName: string().min(2).max(160),
	site: string().min(2).max(200),
	product: string().min(2).max(160)
});
var issueVerify_createServerFn_handler = createServerRpc({
	id: "3dc8e31fa88b1dff6399a16c1b404cac83668675ea6695ebd1394717d5fdafa7",
	name: "issueVerify",
	filename: "src/lib/server/leads.ts"
}, (opts) => issueVerify.__executeServer(opts));
var issueVerify = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(verifySchema).handler(issueVerify_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	const d = /* @__PURE__ */ new Date();
	const verifyId = `NA-${d.toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
	await sql`
      insert into verify_records (verify_id, client_name, site, product, issued_on, created_by)
      values (${verifyId}, ${data.clientName}, ${data.site}, ${data.product}, ${d.toISOString().slice(0, 10)}, ${context.userId})
    `;
	return {
		ok: true,
		verifyId
	};
});
var listVerify_createServerFn_handler = createServerRpc({
	id: "5e19cdc99b1e2ed6d6106ce5471cc7ab5da3dc124aec77517748fdedd2c609dc",
	name: "listVerify",
	filename: "src/lib/server/leads.ts"
}, (opts) => listVerify.__executeServer(opts));
var listVerify = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listVerify_createServerFn_handler, async () => {
	return (await getSql())`
      select id, verify_id, client_name, site, product, issued_on, status
      from verify_records
      order by created_at desc
      limit 60
    `;
});
var lookupVerify_createServerFn_handler = createServerRpc({
	id: "710a0c72cf528a7ae36d8c7b6e9c8915768b29984f013e44745897018b29d348",
	name: "lookupVerify",
	filename: "src/lib/server/leads.ts"
}, (opts) => lookupVerify.__executeServer(opts));
var lookupVerify = createServerFn({ method: "GET" }).validator(object({ id: string().min(6).max(40) })).handler(lookupVerify_createServerFn_handler, async ({ data }) => {
	return (await (await getSql())`
      select verify_id, client_name, site, product, issued_on, status
      from verify_records
      where verify_id = ${data.id.toUpperCase()}
      limit 1
    `)[0] ?? null;
});
var testSchema = object({
	site: string().min(2).max(200),
	product: string().min(2).max(160),
	adhesion: boolean(),
	beading: boolean(),
	uv: boolean(),
	antimicrobial: boolean(),
	durability: boolean(),
	initials: string().max(8).optional(),
	notes: string().max(800).optional()
});
var saveFieldTest_createServerFn_handler = createServerRpc({
	id: "e714064bd8691167da7a8e629001026ba6c81c684e30cfec97c05f01238846df",
	name: "saveFieldTest",
	filename: "src/lib/server/leads.ts"
}, (opts) => saveFieldTest.__executeServer(opts));
var saveFieldTest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(testSchema).handler(saveFieldTest_createServerFn_handler, async ({ data, context }) => {
	await (await getSql())`
      insert into field_tests (site, product, adhesion, beading, uv, antimicrobial, durability, completed_by, initials, notes)
      values (
        ${data.site}, ${data.product}, ${data.adhesion}, ${data.beading}, ${data.uv},
        ${data.antimicrobial}, ${data.durability}, ${context.userId}, ${data.initials ?? null}, ${data.notes ?? null}
      )
    `;
	return { ok: true };
});
var listFieldTests_createServerFn_handler = createServerRpc({
	id: "297196135f1ef6e4262f70a63d6f2579e6e6fa74c0e09cd1a79f8a2b49ac985a",
	name: "listFieldTests",
	filename: "src/lib/server/leads.ts"
}, (opts) => listFieldTests.__executeServer(opts));
var listFieldTests = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFieldTests_createServerFn_handler, async () => {
	return (await getSql())`
      select id, site, product, adhesion, beading, uv, antimicrobial, durability, completed_by, initials, created_at
      from field_tests
      order by created_at desc
      limit 40
    `;
});
//#endregion
export { issueVerify_createServerFn_handler, listAnalysis_createServerFn_handler, listFieldTests_createServerFn_handler, listVerify_createServerFn_handler, lookupVerify_createServerFn_handler, saveFieldTest_createServerFn_handler, submitAnalysis_createServerFn_handler, updateLeadStatus_createServerFn_handler };
