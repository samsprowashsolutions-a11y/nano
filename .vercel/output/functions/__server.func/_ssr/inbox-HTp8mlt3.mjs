import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-BV2Ubh0X.mjs";
import { c as updateLeadStatus, n as listAnalysis } from "./leads-gcQq-Re7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-HTp8mlt3.js
var import_jsx_runtime = require_jsx_runtime();
function Inbox() {
	const q = useQuery({
		queryKey: ["leads"],
		queryFn: () => listAnalysis()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.62rem] uppercase tracking-[0.18em] text-aqua",
				children: "Gold · Concierge"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "gold-text font-display text-3xl",
				children: "Analysis inbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Private requests from the public maison. No public pricing."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [(q.data ?? []).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "metal-panel rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-gold-hi",
							children: l.organisation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								l.contact_name,
								" · ",
								l.email,
								" · ",
								l.phone || "no phone",
								" · ",
								l.sector
							]
						}),
						l.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: l.notes
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[0.65rem] uppercase tracking-widest text-muted",
							children: l.created_at
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: [
							"review",
							"quoted",
							"closed"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: l.status === s ? "gold" : "ghost",
							onClick: async () => {
								await updateLeadStatus({ data: {
									id: l.id,
									status: s
								} });
								q.refetch();
							},
							children: s
						}, s))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs uppercase tracking-widest text-aqua",
					children: ["Status: ", l.status]
				})]
			}, l.id)), q.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "metal-panel rounded-xl p-8 text-center text-muted",
				children: "Inbox is clear."
			}) : null]
		})]
	});
}
//#endregion
export { Inbox as component };
