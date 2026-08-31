import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as ChromeStrip, n as ChromePlate, r as ChromeShield } from "./chrome-shield-D3sZq7JV.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-Codc2IBt.js
var import_jsx_runtime = require_jsx_runtime();
var CARDS = [
	{
		to: "/staff/workforce",
		title: "Employment & Workforce",
		desc: "Recruit · Onboard · Licences · Expiry · Deployment.",
		tone: "gold"
	},
	{
		to: "/staff/operations",
		title: "Operations Command",
		desc: "Five-test field checklist, QA gates, Darwin workface.",
		tone: "teal"
	},
	{
		to: "/staff/products",
		title: "Chemistry library",
		desc: "TDS / SDS aligned Nanoman systems. APAS 1441 on file.",
		tone: "purple"
	},
	{
		to: "/staff/protocol",
		title: "SWMS & protocol",
		desc: "Controlled Safe Work Method Statement and chrome index.",
		tone: "carbon"
	},
	{
		to: "/staff/verify",
		title: "NanoAssure Verify",
		desc: "Issue NA-YYYYMMDD-XXXX certificates after gates pass.",
		tone: "pearl"
	},
	{
		to: "/staff/inbox",
		title: "Analysis inbox",
		desc: "Private analysis requests from the public maison.",
		tone: "gold"
	}
];
function StaffGallery() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, {
				className: "mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/sp-logo-neon-glow.webp",
							alt: "",
							className: "mx-auto mb-3 w-28 drop-shadow-[0_0_22px_rgba(0,208,224,.4)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.62rem] uppercase tracking-[0.22em] text-muted",
							children: "By invitation · Staff access only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "chrome-text mt-1 font-display text-3xl font-semibold",
							children: "Sam's Prowash Solutions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-script text-2xl text-gold",
							children: "Private Staff Gallery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-lg text-sm text-muted",
							children: "Controlled operations system. Advanced surface protection · stronger communities · better futures."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap justify-center gap-2",
							children: [
								"SP Prestige",
								"NanoAssure™",
								"Chrome Standard",
								"Confidential"
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-chrome/25 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-chrome",
								children: p
							}, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-mono text-[0.6rem] tracking-[0.18em] text-muted",
							children: "SP · STAFF · v2026.08.23.5"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "chrome-rule mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: CARDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: c.to,
					className: "chrome-rim rounded-xl transition-transform hover:-translate-y-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "metal-panel h-full rounded-[14px] p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeShield, {
									tone: c.tone,
									className: "h-12 w-10 shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl text-gold-hi",
									children: c.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted",
								children: c.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gold-cta mt-4 inline-flex rounded-md px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider",
								children: "Enter →"
							})
						]
					})
				}, c.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeStrip, { className: "mt-10" })
		]
	});
}
//#endregion
export { StaffGallery as component };
