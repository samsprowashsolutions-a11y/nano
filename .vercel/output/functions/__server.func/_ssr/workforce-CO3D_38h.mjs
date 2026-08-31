import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as SEED_EMPLOYEES, l as SEED_VACANCIES, s as SEED_APPLICATIONS } from "./content-Dk4NJM6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workforce-CO3D_38h.js
var import_jsx_runtime = require_jsx_runtime();
function Workforce() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.62rem] uppercase tracking-[0.18em] text-aqua",
					children: "Teal · Operations framework"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "gold-text font-display text-3xl",
					children: "Employment & Workforce"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Employees and subcontractors share this command with separate streams."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-4",
				children: [
					[
						"Crew",
						String(SEED_EMPLOYEES.length),
						"gold"
					],
					[
						"Vacancies",
						String(SEED_VACANCIES.length),
						"aqua"
					],
					[
						"Pipeline",
						String(SEED_APPLICATIONS.length),
						"purple"
					],
					[
						"Alerts",
						"2",
						"warn"
					]
				].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metal-panel rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.6rem] uppercase tracking-widest text-muted",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl text-gold-hi",
						children: v
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metal-panel overflow-x-auto rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg text-gold-hi",
					children: "Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[520px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-[0.65rem] uppercase tracking-widest text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "No."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2",
								children: "Licences"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SEED_EMPLOYEES.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 font-mono text-xs text-aqua",
								children: e.empNo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: e.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted",
								children: e.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md border border-gold/30 px-2 py-0.5 text-[0.65rem] text-gold-hi",
									children: e.type
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-xs text-muted",
								children: e.licences
							})
						]
					}, e.id)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "metal-panel rounded-xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-lg text-gold-hi",
						children: "Vacancies"
					}), SEED_VACANCIES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: v.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								v.type,
								" · ",
								v.location,
								" · ",
								v.status,
								" · ",
								v.openings,
								" open"
							]
						})]
					}, v.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "metal-panel rounded-xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-lg text-gold-hi",
						children: "Pipeline"
					}), SEED_APPLICATIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								a.vacancy,
								" · ",
								a.suburb,
								" · ",
								a.stage
							]
						})]
					}, a.id))]
				})]
			})
		]
	});
}
//#endregion
export { Workforce as component };
