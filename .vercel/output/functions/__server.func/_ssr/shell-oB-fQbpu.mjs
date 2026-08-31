import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { t as BRAND } from "./content-Dk4NJM6l.mjs";
import { i as ChromeStrip } from "./chrome-shield-D3sZq7JV.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Menu, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-oB-fQbpu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className, size = 48 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("logo-chrome", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/brand/sp-shield.png",
			alt: "",
			width: size,
			height: size,
			className: "object-contain"
		})
	});
}
function Wordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "leading-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-xl text-gold-hi sm:text-2xl",
			children: "NanoAssure™"
		}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-aqua",
			children: "Asset Protection"
		}) : null]
	});
}
var LINKS = [
	{
		to: "/solutions",
		label: "Collection"
	},
	{
		to: "/assurance",
		label: "Assurance"
	},
	{
		to: "/analysis",
		label: "Analysis"
	},
	{
		to: "/careers",
		label: "Careers"
	},
	{
		to: "/verify",
		label: "Verify"
	}
];
function SiteNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line-gold/70 bg-carbon/88 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { size: 44 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { compact: true })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: [
						LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: cn("rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors duration-150 hover:text-gold-hi", pathname === l.to && "text-gold-hi"),
							children: l.label
						}, l.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/staff",
							className: "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-aqua/80 hover:text-aqua",
							children: "Staff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "ml-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/analysis",
								children: "Request analysis"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-full border border-chrome/20 text-fg md:hidden",
					"aria-label": open ? "Close menu" : "Open menu",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line px-4 py-4 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [
					LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						onClick: () => setOpen(false),
						className: "rounded-xl px-4 py-3 text-sm text-muted hover:bg-surface hover:text-fg",
						children: l.label
					}, l.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/staff",
						onClick: () => setOpen(false),
						className: "rounded-xl px-4 py-3 text-sm text-aqua",
						children: "Staff portal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-2 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analysis",
							onClick: () => setOpen(false),
							children: "Request analysis"
						})
					})
				]
			})
		}) : null]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line-gold/40 bg-carbon",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { size: 48 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl text-gold-hi",
								children: "NanoAssure™"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-[0.18em] text-aqua",
								children: "Asset Protection"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 max-w-md text-sm leading-relaxed text-muted",
							children: [
								BRAND.parent,
								". ",
								BRAND.positioning,
								" Public pages do not publish prices. Internal platforms are role-locked. Finance remains Director-only."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-faint",
							children: [
								"ABN ",
								BRAND.abn,
								" · ACN ",
								BRAND.acn,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								BRAND.location
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "kicker mb-4",
					children: "Maison"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/solutions",
							className: "hover:text-gold-hi",
							children: "The collection"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/assurance",
							className: "hover:text-gold-hi",
							children: "Five-Step QA"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "proof",
							className: "hover:text-gold-hi",
							children: "Before & after"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-gold-hi",
							children: "The maison"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "kicker mb-4",
					children: "Desks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analysis",
							className: "hover:text-gold-hi",
							children: "Analysis desk"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/careers",
							className: "hover:text-gold-hi",
							children: "Careers"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/staff",
							className: "hover:text-gold-hi",
							children: "Staff portal"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${BRAND.analysisEmail}`,
							className: "hover:text-gold-hi",
							children: BRAND.analysisEmail
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-line px-4 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeStrip, { className: "mx-auto mb-6 max-w-lg opacity-90" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-[11px] leading-relaxed text-faint",
				children: [
					BRAND.parent,
					" acknowledges the Traditional Owners and Custodians of Country throughout the Northern Territory and pays respect to Elders past and present.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					BRAND.parent,
					". ",
					BRAND.tagline
				]
			})]
		})]
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "carbon-field min-h-dvh text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SiteShell as t };
