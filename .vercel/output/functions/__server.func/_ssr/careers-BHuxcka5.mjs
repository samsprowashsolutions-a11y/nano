import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { l as SEED_VACANCIES } from "./content-Dk4NJM6l.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteShell } from "./shell-oB-fQbpu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers-BHuxcka5.js
var import_jsx_runtime = require_jsx_runtime();
function Careers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-4xl px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] font-bold uppercase tracking-[0.2em] text-aqua",
				children: "Workforce"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "gold-text mt-2 font-display text-4xl",
				children: "Join the atelier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "NanoAssure crews apply specified chemistry across Darwin government, education and commercial sites. White Card is mandatory. We train the rest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-4",
				children: SEED_VACANCIES.filter((v) => v.status === "Public").map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "metal-panel rounded-xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-widest text-aqua",
							children: [
								v.type,
								" · ",
								v.location
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl text-gold-hi",
							children: v.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								v.openings,
								" opening",
								v.openings > 1 ? "s" : ""
							]
						})
					]
				}, v.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					"Applications: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-aqua",
						href: "mailto:analysis@nanoassure.net",
						children: "analysis@nanoassure.net"
					}),
					" with subject line Career."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				variant: "ghost",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					children: "Back to maison"
				})
			})
		]
	}) });
}
//#endregion
export { Careers as component };
