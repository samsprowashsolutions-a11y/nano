import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/film-C5FAkBOv.js
var import_jsx_runtime = require_jsx_runtime();
function Film({ src, poster, className, caption }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: cn("relative overflow-hidden rounded-xl border border-chrome/25 shadow-[0_28px_70px_rgba(0,0,0,.55),0_0_40px_rgba(0,208,224,.08)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				className: "h-full w-full object-cover",
				src,
				poster,
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				preload: "metadata"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-linear-to-t from-carbon/70 via-transparent to-carbon/20" }),
			caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "absolute bottom-4 left-4 right-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-pearl/90",
				children: caption
			}) : null
		]
	});
}
//#endregion
export { Film as t };
