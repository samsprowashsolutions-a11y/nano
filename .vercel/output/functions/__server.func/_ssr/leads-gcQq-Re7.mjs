import { i as createServerFn, o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CyCMUD-Z.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-gcQq-Re7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var submitAnalysis = createServerFn({ method: "POST" }).validator(leadSchema).handler(createSsrRpc("ef58acdc34bc43d29e02d9d015cbda1130698fb160464792c0143aefe1c7061b"));
var listAnalysis = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9b75fe69c2063078843665788ad6fbd0ce3603f56f2026930061b732b80bc0f5"));
var statusSchema = object({
	id: number(),
	status: _enum([
		"new",
		"review",
		"quoted",
		"closed"
	])
});
var updateLeadStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(statusSchema).handler(createSsrRpc("0a085f52246af7785ce26eaf1bcb79dbe1a08e97de6d29e630dcafc1512305d9"));
var verifySchema = object({
	clientName: string().min(2).max(160),
	site: string().min(2).max(200),
	product: string().min(2).max(160)
});
var issueVerify = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(verifySchema).handler(createSsrRpc("3dc8e31fa88b1dff6399a16c1b404cac83668675ea6695ebd1394717d5fdafa7"));
var listVerify = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("5e19cdc99b1e2ed6d6106ce5471cc7ab5da3dc124aec77517748fdedd2c609dc"));
var lookupVerify = createServerFn({ method: "GET" }).validator(object({ id: string().min(6).max(40) })).handler(createSsrRpc("710a0c72cf528a7ae36d8c7b6e9c8915768b29984f013e44745897018b29d348"));
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
var saveFieldTest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(testSchema).handler(createSsrRpc("e714064bd8691167da7a8e629001026ba6c81c684e30cfec97c05f01238846df"));
var listFieldTests = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("297196135f1ef6e4262f70a63d6f2579e6e6fa74c0e09cd1a79f8a2b49ac985a"));
//#endregion
export { lookupVerify as a, updateLeadStatus as c, listVerify as i, listAnalysis as n, saveFieldTest as o, listFieldTests as r, submitAnalysis as s, issueVerify as t };
