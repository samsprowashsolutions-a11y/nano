import { o as __toESM } from "../_runtime.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { n as ChromePlate } from "./chrome-shield-D3sZq7JV.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Label, t as Input } from "./input-DX5RCbeP.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-BahqqX9A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DjqF5h4I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [err, setErr] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("in");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onEmail(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("email") || "");
		const password = String(fd.get("password") || "");
		const name = String(fd.get("name") || "Crew");
		setBusy(true);
		setErr("");
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email,
					password,
					name
				});
				if (res.error) throw new Error(res.error.message);
			} else {
				const res = await authClient.signIn.email({
					email,
					password
				});
				if (res.error) throw new Error(res.error.message);
			}
			window.location.href = "/staff";
		} catch (ex) {
			setErr(ex instanceof Error ? ex.message : "Sign-in failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "carbon-field grid min-h-dvh place-items-center px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromePlate, {
			className: "w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/sp-logo-neon-glow.webp",
						alt: "",
						className: "mx-auto mb-4 w-24 drop-shadow-[0_0_22px_rgba(0,208,224,.45)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.62rem] uppercase tracking-[0.22em] text-muted",
						children: "By invitation · Staff only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "gold-text mt-1 font-display text-3xl",
						children: "Private Staff Access"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script mt-1 text-2xl text-gold",
						children: "Atelier gate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "chrome",
								className: "w-full",
								onClick: () => signIn(p.providerId, { callbackURL: "/staff" }),
								children: ["Continue with ", p.label]
							}, p.providerId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "chrome-rule my-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onEmail,
							className: "space-y-3 text-left",
							children: [
								mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									name: "name",
									required: true
								})] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									name: "email",
									type: "email",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									name: "password",
									type: "password",
									required: true,
									minLength: 8
								})] }),
								err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-bad",
									children: err
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									disabled: busy,
									children: busy ? "Please wait…" : mode === "up" ? "Create crew account" : "Enter atelier"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 text-xs text-muted hover:text-aqua",
							onClick: () => setMode((m) => m === "in" ? "up" : "in"),
							children: mode === "in" ? "New crew? Create an account" : "Already gated? Sign in"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-6 block text-xs uppercase tracking-widest text-muted hover:text-gold",
						children: "← Public maison"
					})
				]
			})
		})
	});
}
//#endregion
export { Login as component };
