import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { t as BRAND } from "./content-Dk4NJM6l.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteShell } from "./shell-oB-fQbpu.mjs";
import { t as Film } from "./film-C5FAkBOv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Bi8Ay3X0.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-script text-4xl text-gold",
					children: "The maison"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "gold-text mt-1 font-display text-4xl md:text-5xl",
					children: BRAND.public
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 leading-relaxed text-muted",
					children: [
						"Public brand: NanoAssure™ — Asset Protection, Darwin NT. Parent: ",
						BRAND.parent,
						" (ABN",
						" ",
						BRAND.abn,
						" · ACN ",
						BRAND.acn,
						"). Aboriginal-led. Invitation-only analysis. Staff systems remain confidential."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 italic text-pearl",
					children: BRAND.positioning
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: BRAND.tagline
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, {
				src: "/media/film-estate.mp4",
				poster: "/media/estate-dusk.jpg",
				className: "aspect-video"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-6 px-5 pb-16 md:grid-cols-3",
			children: [
				["Samantha Rae", "Director — command, specification, financials"],
				["Jasmin Calma", "Director — cultural advisor, academy, community"],
				["Kate", "Operations — field command, chemicals, QA gates"]
			].map(([n, r]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "metal-panel rounded-xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-gold-hi",
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: r
				})]
			}, n))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/media/pavers.jpg",
				alt: "Protected stone after NanoAssure",
				className: "mb-8 w-full rounded-xl object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "gold-text font-display text-3xl",
					children: "Limited edition service"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "Concurrent live projects are capped. We would rather protect four assets perfectly than twenty poorly. That is the atelier rule."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "gold-text font-display text-3xl",
					children: "Country"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "We acknowledge the Traditional Owners and Custodians of Country throughout the Northern Territory and their continuing connection to land, waters and community."
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-5 pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/careers",
					children: "Careers"
				})
			})
		})
	] });
}
//#endregion
export { About as component };
