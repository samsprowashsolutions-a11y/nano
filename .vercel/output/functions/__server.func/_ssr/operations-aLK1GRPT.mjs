import { o as __toESM } from "../_runtime.mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { a as PRODUCTS, r as FIELD_TESTS } from "./content-Dk4NJM6l.mjs";
import { n as ChromePlate, o as FieldTestRow } from "./chrome-shield-D3sZq7JV.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-DX5RCbeP.mjs";
import { o as saveFieldTest, r as listFieldTests } from "./leads-gcQq-Re7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/operations-aLK1GRPT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Operations() {
	const tests = useQuery({
		queryKey: ["field-tests"],
		queryFn: () => listFieldTests()
	});
	const [msg, setMsg] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		await saveFieldTest({ data: {
			site: String(fd.get("site") || ""),
			product: String(fd.get("product") || ""),
			adhesion: fd.get("adhesion") === "on",
			beading: fd.get("beading") === "on",
			uv: fd.get("uv") === "on",
			antimicrobial: fd.get("antimicrobial") === "on",
			durability: fd.get("durability") === "on",
			initials: String(fd.get("initials") || "") || void 0,
			notes: String(fd.get("notes") || "") || void 0
		} });
		setMsg("Field checklist recorded.");
		e.currentTarget.reset();
		tests.refetch();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.62rem] uppercase tracking-[0.18em] text-aqua",
					children: "Pearl · QA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "gold-text font-display text-3xl",
					children: "Five-test field checklist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-script text-xl text-gold",
					children: "Nanotechnology · Performance · Protection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Tested. Verified. Assured. QA-FORM-001 · Rev 1.0"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4 p-5 md:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "site",
							children: "Site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "site",
							name: "site",
							required: true,
							placeholder: "Asset / address"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "product",
							children: "Product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "product",
							name: "product",
							className: "h-11 w-full rounded-md border border-aqua/30 bg-carbon-2 px-3 text-sm",
							required: true,
							children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p.name }, p.id))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: FIELD_TESTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTestRow, {
							test: t,
							as: "label",
							control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: t.key,
								className: "size-5 accent-gold"
							})
						}, t.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "initials",
							children: "Applicator initials"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "initials",
							name: "initials",
							maxLength: 8
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Hold points"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							name: "notes"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Record checklist"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-aqua",
						children: msg
					}) : null
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/docs/five-test-checklist.png",
				alt: "NanoAssure five test field checklist",
				className: "w-full rounded-xl border border-chrome/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metal-panel rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg text-gold-hi",
					children: "Recent field tests"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-sm",
					children: [(tests.data ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: t.site
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								t.product,
								" · ",
								t.initials || "—",
								" · ",
								t.created_at
							]
						})]
					}, t.id)), tests.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "No tests recorded yet."
					}) : null]
				})]
			})
		]
	});
}
//#endregion
export { Operations as component };
