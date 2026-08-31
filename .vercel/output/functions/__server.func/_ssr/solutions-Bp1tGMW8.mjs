import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { a as PRODUCTS, u as SOLUTIONS } from "./content-Dk4NJM6l.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteShell } from "./shell-oB-fQbpu.mjs";
import { t as Film } from "./film-C5FAkBOv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solutions-Bp1tGMW8.js
var import_jsx_runtime = require_jsx_runtime();
function Solutions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/commercial-glass.jpg",
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-carbon/50 to-carbon" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-6xl px-5 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.65rem] font-bold uppercase tracking-[0.2em] text-aqua",
							children: "Specified systems"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "gold-text mt-2 font-display text-4xl md:text-6xl",
							children: "The collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-muted",
							children: "Premium nano-coating systems for glass, masonry, metal, antimicrobial and anti-graffiti protection — always applied to manufacturer TDS and proven by NanoAssure™ gates."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl space-y-16 px-5 pb-20",
			children: SOLUTIONS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "grid items-center gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.image,
					alt: s.title,
					className: `rounded-xl border border-chrome/20 object-cover ${i % 2 ? "md:order-2" : ""}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold",
						children: [
							"0",
							i + 1,
							" / 06"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl text-aqua",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed text-muted",
						children: s.copy
					})
				] })]
			}, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "gold-text mb-6 font-display text-3xl",
				children: "Chemistry on file"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metal-panel rounded-xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-gold-hi",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-aqua",
							children: p.tds
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: p.substrate
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								p.coats,
								" · ",
								p.coverage,
								p.apas ? ` · ${p.apas}` : ""
							]
						})
					]
				}, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, {
				src: "/media/film-facade.mp4",
				poster: "/media/estate-dusk.jpg",
				caption: "Darwin glass, specified.",
				className: "aspect-video"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/analysis",
						children: "Request analysis"
					})
				})
			})]
		})
	] });
}
//#endregion
export { Solutions as component };
