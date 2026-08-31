import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as PRODUCTS } from "./content-Dk4NJM6l.mjs";
import { n as ChromePlate } from "./chrome-shield-D3sZq7JV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-5EhWLrA_.js
var import_jsx_runtime = require_jsx_runtime();
function Products() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.62rem] uppercase tracking-[0.18em] text-aqua",
				children: "Purple · Reference"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "gold-text font-display text-3xl",
				children: "Chemistry library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Source of truth: Nanoman TDS & SDS. SP brands assurance only. Cross-checked 22 Aug 2026."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-gold-hi",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-aqua",
						children: p.tds
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.65rem] text-muted",
						children: p.sds
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 space-y-1 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "inline text-pearl",
								children: "Substrate: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "inline",
								children: p.substrate
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "inline text-pearl",
								children: "Coats: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "inline",
								children: p.coats
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "inline text-pearl",
								children: "Coverage: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "inline",
								children: p.coverage
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "inline text-pearl",
								children: "Environment: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "inline",
								children: p.env
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "inline text-pearl",
								children: "Dry / cure: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "inline",
								children: p.dryTimes
							})] }),
							p.apas ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "inline text-pearl",
								children: "APAS: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "inline text-gold",
								children: p.apas
							})] }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-pearl/80",
						children: p.certNote
					})
				]
			}) }, p.id))
		})]
	});
}
//#endregion
export { Products as component };
