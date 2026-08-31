import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as CHROME, r as FIELD_TESTS } from "./content-Dk4NJM6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chrome-shield-D3sZq7JV.js
var import_jsx_runtime = require_jsx_runtime();
var GLOW = {
	carbon: "drop-shadow-[0_10px_18px_rgba(0,0,0,.55)] drop-shadow-[0_0_14px_rgba(200,206,214,.35)]",
	teal: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(0,208,224,.55)]",
	purple: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(122,50,200,.55)]",
	pearl: "drop-shadow-[0_10px_18px_rgba(0,0,0,.4)] drop-shadow-[0_0_16px_rgba(232,228,220,.4)]",
	gold: "drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] drop-shadow-[0_0_18px_rgba(232,184,56,.55)]"
};
function ChromeShield({ tone, className, alt }) {
	const meta = CHROME.find((c) => c.tone === tone);
	const src = `/chrome/${tone}.webp`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("chrome-icon", GLOW[tone], className),
		style: { "--chrome-mask": `url(${src})` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: alt ?? `${meta?.name ?? tone} chrome shield`,
			draggable: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "chrome-icon-sheen",
			"aria-hidden": true
		})]
	});
}
function ChromePlate({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("chrome-plate", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chrome-gold-rim",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chrome-body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10",
					children
				})
			})
		})
	});
}
function ChromeStrip({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("chrome-strip", className),
		children: CHROME.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeShield, {
					tone: c.tone,
					className: "mx-auto h-16 w-14 sm:h-20 sm:w-[4.5rem]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-[0.58rem] tracking-[0.18em] text-aqua",
					children: c.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.62rem] font-semibold uppercase tracking-widest text-gold-hi",
					children: c.name
				})
			]
		}, c.id))
	});
}
function FieldTestRow({ test, control, as: Tag = "article" }) {
	const src = `/chrome/test-${test.n}.webp`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
		className: "field-test-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "chrome-icon field-test-chrome",
				style: { "--chrome-mask": `url(${src})` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					draggable: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chrome-icon-sheen",
					"aria-hidden": true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-semibold uppercase tracking-[0.12em] text-gold-hi",
					children: test.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block text-xs leading-snug text-muted",
					children: test.detail
				})]
			}),
			control
		]
	});
}
function FieldChecklist({ documentLook = false, controls }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: FIELD_TESTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTestRow, {
			test: t,
			as: controls ? "label" : "article",
			control: controls?.[t.key]
		}, t.n))
	});
	if (!documentLook) return body;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "chrome-doc p-5 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center gap-3 border-b border-gold-deep/40 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/sp-shield.png",
					alt: "",
					className: "h-14 w-14 object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-script text-2xl text-gold-deep md:text-3xl",
					children: "Five Test Field Checklist"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "chrome-doc-kicker text-[0.62rem] font-bold uppercase tracking-[0.18em]",
					children: "NanoAssure™ Surface Technology"
				})] })]
			}),
			body,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-center font-script text-xl text-gold-deep",
				children: "Nanotechnology · Performance · Protection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "chrome-doc-kicker text-center text-[0.62rem] font-bold uppercase tracking-[0.16em]",
				children: "Tested. Verified. Assured. · QA-FORM-001 · Rev 1.0"
			})
		]
	}) });
}
function ChromeIndex({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-4", compact ? "sm:grid-cols-5" : "md:grid-cols-2 md:items-center"),
		children: [!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center md:text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] font-bold uppercase tracking-[0.22em] text-aqua",
					children: "Chrome index"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-script mt-2 text-4xl text-gold md:text-5xl",
					children: "Index & Chrome Category System"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted md:mx-0",
					children: "Every controlled document lives in a five-tone chrome category — carbon through gold — the same language as the staff atelier."
				})
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn(compact ? "contents" : "space-y-3"),
			children: CHROME.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: cn("metal-panel flex items-center gap-4 rounded-xl p-3", compact && "flex-col text-center"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeShield, {
					tone: c.tone,
					className: compact ? "h-16 w-14" : "h-24 w-[5.25rem] shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: compact ? "" : "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg leading-tight text-gold-hi",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 font-mono text-xs text-aqua",
							children: c.id
						}), c.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.72rem] leading-snug text-muted",
						children: c.role
					})]
				})]
			}, c.id))
		})]
	});
}
//#endregion
export { FieldChecklist as a, ChromeStrip as i, ChromePlate as n, FieldTestRow as o, ChromeShield as r, ChromeIndex as t };
