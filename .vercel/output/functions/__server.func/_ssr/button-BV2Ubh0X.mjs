import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BV2Ubh0X.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-transform duration-150 disabled:opacity-50 disabled:pointer-events-none select-none", {
	variants: {
		variant: {
			gold: "bg-linear-to-br from-gold-hi via-gold to-gold-deep text-carbon shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_10px_28px_rgba(232,184,56,.28)] hover:-translate-y-px",
			aqua: "border border-aqua/50 text-aqua bg-aqua/10 hover:bg-aqua/15",
			ghost: "border border-chrome/25 text-muted hover:text-fg hover:border-gold/40",
			chrome: "border border-chrome/30 text-chrome bg-pearl/5 hover:text-fg"
		},
		size: {
			sm: "h-11 px-4 text-[11px] rounded-full",
			md: "h-12 px-6 text-xs rounded-full",
			lg: "h-14 px-8 text-xs rounded-full"
		}
	},
	defaultVariants: {
		variant: "gold",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
