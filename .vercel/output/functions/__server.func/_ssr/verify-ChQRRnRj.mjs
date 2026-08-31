import { o as __toESM } from "../_runtime.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { t as SiteShell } from "./shell-oB-fQbpu.mjs";
import { n as Label, t as Input } from "./input-DX5RCbeP.mjs";
import { a as lookupVerify } from "./leads-gcQq-Re7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-ChQRRnRj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicVerify() {
	const [result, setResult] = (0, import_react.useState)(null);
	async function onSubmit(e) {
		e.preventDefault();
		const id = String(new FormData(e.currentTarget).get("id") || "");
		const row = await lookupVerify({ data: { id } });
		setResult(row ?? "none");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-lg px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[0.65rem] uppercase tracking-[0.2em] text-aqua",
				children: "Certificate lookup"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "gold-text text-center font-display text-4xl",
				children: "Verify"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "metal-panel mt-8 space-y-4 rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "id",
					children: "Verify ID"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "id",
					name: "id",
					required: true,
					placeholder: "NA-20260823-XXXX",
					className: "font-mono uppercase"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					children: "Look up"
				})]
			}),
			result && result !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "metal-panel mt-6 rounded-xl p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-aqua",
						children: result.verify_id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl text-gold-hi",
						children: result.client_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: result.site
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: result.product
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-widest text-ok",
						children: result.status
					})
				]
			}) : null,
			result === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-sm text-muted",
				children: "No certificate on file."
			}) : null
		]
	}) });
}
//#endregion
export { PublicVerify as component };
