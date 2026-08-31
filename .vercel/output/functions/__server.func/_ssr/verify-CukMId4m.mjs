import { o as __toESM } from "../_runtime.mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { a as PRODUCTS } from "./content-Dk4NJM6l.mjs";
import { n as Label, t as Input } from "./input-DX5RCbeP.mjs";
import { i as listVerify, t as issueVerify } from "./leads-gcQq-Re7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-CukMId4m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Verify() {
	const list = useQuery({
		queryKey: ["verify"],
		queryFn: () => listVerify()
	});
	const [issued, setIssued] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const res = await issueVerify({ data: {
			clientName: String(fd.get("client") || ""),
			site: String(fd.get("site") || ""),
			product: String(fd.get("product") || "")
		} });
		setIssued(res.verifyId);
		e.currentTarget.reset();
		list.refetch();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.62rem] uppercase tracking-[0.18em] text-aqua",
					children: "Gold · Strategic"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "gold-text font-display text-3xl",
					children: "NanoAssure Verify"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "IDs format NA-YYYYMMDD-XXXX. Issued only after gates pass."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "metal-panel grid gap-4 rounded-xl p-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "client",
						children: "Client / principal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "client",
						name: "client",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "site",
						children: "Site"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "site",
						name: "site",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "product",
							children: "Product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "product",
							name: "product",
							className: "h-11 w-full rounded-md border border-aqua/30 bg-carbon-2 px-3 text-sm",
							required: true,
							children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p.name }, p.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Issue certificate"
						}), issued ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-mono text-aqua",
							children: issued
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metal-panel rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg text-gold-hi",
					children: "Register"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 text-sm",
					children: (list.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-white/5 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-aqua",
								children: r.verify_id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.client_name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: r.site
							})
						]
					}, r.id))
				})]
			})
		]
	});
}
//#endregion
export { Verify as component };
