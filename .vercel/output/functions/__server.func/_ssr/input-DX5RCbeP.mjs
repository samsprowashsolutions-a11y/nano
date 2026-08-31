import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-DX5RCbeP.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-12 w-full rounded-xl border border-chrome/20 bg-carbon-2 px-4 text-sm text-fg placeholder:text-faint outline-none transition-shadow duration-150", "focus-visible:ring-2 focus-visible:ring-aqua/50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-32 w-full rounded-xl border border-chrome/20 bg-carbon-2 px-4 py-3 text-sm text-fg placeholder:text-faint outline-none transition-shadow duration-150", "focus-visible:ring-2 focus-visible:ring-aqua/50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("kicker mb-2 block text-muted", className),
		...props
	});
}
//#endregion
export { Label as n, Textarea as r, Input as t };
