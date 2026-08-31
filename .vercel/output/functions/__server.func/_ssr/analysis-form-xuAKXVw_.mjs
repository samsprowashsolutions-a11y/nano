import { o as __toESM } from "../_runtime.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { t as BRAND } from "./content-Dk4NJM6l.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-DX5RCbeP.mjs";
import { s as submitAnalysis } from "./leads-gcQq-Re7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis-form-xuAKXVw_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalysisForm() {
	const [msg, setMsg] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const payload = {
			organisation: String(fd.get("organisation") || ""),
			contactName: String(fd.get("name") || ""),
			email: String(fd.get("email") || ""),
			phone: String(fd.get("phone") || "") || void 0,
			sector: String(fd.get("sector") || "Commercial"),
			notes: String(fd.get("notes") || "") || void 0
		};
		setBusy(true);
		setMsg("");
		try {
			await submitAnalysis({ data: payload });
			setMsg("Request received. A principal will respond with a private analysis pathway.");
			e.currentTarget.reset();
		} catch {
			const body = encodeURIComponent(`Organisation: ${payload.organisation}\nContact: ${payload.contactName}\nEmail: ${payload.email}\nPhone: ${payload.phone || "—"}\nSector: ${payload.sector}\n\n${payload.notes || ""}`);
			window.location.href = `mailto:${BRAND.analysisEmail}?subject=${encodeURIComponent("NanoAssure Analysis — " + payload.organisation)}&body=${body}`;
			setMsg("Opening your mail client…");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-4 md:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "organisation",
				children: "Organisation"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "organisation",
				name: "organisation",
				required: true,
				placeholder: "Company or agency"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "name",
				children: "Contact name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "name",
				name: "name",
				required: true,
				placeholder: "Your name"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "email",
				children: "Email"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "email",
				name: "email",
				type: "email",
				required: true,
				placeholder: "you@example.com"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "phone",
				children: "Phone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "phone",
				name: "phone",
				placeholder: "Optional"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "sector",
					children: "Sector"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "sector",
					name: "sector",
					className: "h-11 w-full rounded-md border border-aqua/30 bg-carbon-2 px-3 text-sm text-pearl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Government" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Education" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Commercial" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Fleet / Transport" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Residential / Other" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "notes",
					children: "Project notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "notes",
					name: "notes",
					placeholder: "Site, substrate, timeline…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					size: "lg",
					children: busy ? "Sending…" : "Request private analysis"
				}), msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-aqua",
					children: msg
				}) : null]
			})
		]
	});
}
//#endregion
export { AnalysisForm as t };
