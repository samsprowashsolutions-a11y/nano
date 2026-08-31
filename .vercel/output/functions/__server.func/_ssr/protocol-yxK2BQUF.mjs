import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as SWMS } from "./content-Dk4NJM6l.mjs";
import { i as ChromeStrip, n as ChromePlate, t as ChromeIndex } from "./chrome-shield-D3sZq7JV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protocol-yxK2BQUF.js
var import_jsx_runtime = require_jsx_runtime();
function Protocol() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.62rem] uppercase tracking-[0.18em] text-aqua",
					children: "Carbon · Governance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "gold-text font-display text-3xl",
					children: "Protocol & SWMS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Master section. Project-specific completion required before issue. Governance under",
						" ",
						SWMS.authors,
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-3xl text-gold",
						children: SWMS.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-aqua",
						children: "NanoAssure™ Surface Technology"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-5 grid gap-2 text-sm md:grid-cols-2",
						children: [
							["Legal entity", SWMS.entity],
							["Status", SWMS.status],
							["Document ID", SWMS.documentId],
							["Approval", SWMS.approval]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-carbon/40 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[0.62rem] uppercase tracking-widest text-muted",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-semibold text-gold-hi",
								children: v
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 rounded-lg border border-gold/25 bg-gold/8 p-4 text-sm leading-relaxed text-pearl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-gold",
							children: "Control note. "
						}), SWMS.control]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metal-panel rounded-xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-script text-2xl text-gold",
					children: "1. Project and Work Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-[0.65rem] uppercase tracking-widest text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "Field"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "Project-specific entry"
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SWMS.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-pearl",
								children: f
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-muted",
								children: "[TO BE COMPLETED]"
							})]
						}, f)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metal-panel rounded-xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-script text-2xl text-gold",
						children: "2. Scope and Controlled Work Sequence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Master structure only. Delete non-applicable steps and add the actual project sequence after site review."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-2",
						children: SWMS.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 rounded-lg border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gold-cta grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
								children: s.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-pearl",
								children: s.activity
							})]
						}, s.n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/docs/swms.png",
				alt: "NanoAssure Safe Work Method Statement — page 1 of 4",
				className: "w-full rounded-xl border border-chrome/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeIndex, {})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/docs/chrome-index.png",
				alt: "Index and Chrome Category System",
				className: "w-full rounded-xl border border-chrome/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeStrip, {})
		]
	});
}
//#endregion
export { Protocol as component };
