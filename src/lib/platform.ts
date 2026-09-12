/** The 23-module house. Grouped to match the briefing sheets. Every item is a real desk. */

export type ModuleId =
  | "dashboard"
  | "customer"
  | "staff"
  | "operations"
  | "qa"
  | "product"
  | "tds"
  | "compliance"
  | "whs"
  | "contractors"
  | "academy"
  | "analysis"
  | "jobs"
  | "documents"
  | "vault"
  | "approvals"
  | "notifications"
  | "admin"
  | "website"
  | "email"
  | "analytics"
  | "audit"
  | "security";

export type PlatformCatId = "site" | "sources" | "people" | "records" | "client" | "command";

export type PlatformModule = {
  id: ModuleId;
  name: string;
  copy: string;
  to: string;
  kicker: string;
  cat: PlatformCatId;
};

export const PLATFORM_CATS: { id: PlatformCatId; n: string; title: string; copy: string }[] = [
  { id: "site", n: "01", title: "On the job", copy: "Sign on, today’s site, pre-start, NANO7, NANODATA." },
  { id: "sources", n: "02", title: "Sources & approvals", copy: "TDS / SDS, chemistry, claim gates." },
  { id: "people", n: "03", title: "People", copy: "Roster, contractors, academy." },
  { id: "records", n: "04", title: "Registers & vault", copy: "Sam’s Safe, packs, approvals, audit." },
  { id: "client", n: "05", title: "Client packs", copy: "Analysis, warranty, maison flow." },
  { id: "command", n: "06", title: "Command house", copy: "Dashboard, alerts, analytics, roles." },
];

export const PLATFORM: PlatformModule[] = [
  {
    id: "jobs",
    name: "Job Management",
    copy: "Scope, pricing, scheduling, crews, completion and handover.",
    to: "/staff/jobs",
    kicker: "Works",
    cat: "site",
  },
  {
    id: "operations",
    name: "Operations Command",
    copy: "Crew allocation, GPS, job status, OPPS ALL CLEAR gate.",
    to: "/staff/jobs",
    kicker: "Live jobs",
    cat: "site",
  },
  {
    id: "whs",
    name: "WHS / SWMS",
    copy: "Pre-starts, SWMS, PPE, hazards, site controls and signatures.",
    to: "/staff/whs",
    kicker: "Carbon",
    cat: "site",
  },
  {
    id: "qa",
    name: "QA & Testing",
    copy: "NANODATA Collection™ five-instrument science. NANO7™ seven gates. Pass/fail, photos, evidence.",
    to: "/staff/operations",
    kicker: "Pearl",
    cat: "site",
  },
  {
    id: "analysis",
    name: "Asset Analysis",
    copy: "Inspection, condition, recommendations, before/after evidence.",
    to: "/staff/inbox",
    kicker: "Analysis",
    cat: "site",
  },
  {
    id: "product",
    name: "Product & Surface System",
    copy: "Substrate identification and product matching. Application stays in Altier — never on the maison.",
    to: "/staff/products",
    kicker: "Chemistry",
    cat: "sources",
  },
  {
    id: "tds",
    name: "TDS/SDS Register",
    copy: "Manufacturer-controlled technical source library with version and expiry.",
    to: "/staff/compliance",
    kicker: "Controlled",
    cat: "sources",
  },
  {
    id: "compliance",
    name: "Compliance Gate",
    copy: "Blocks jobs and packs when supporting TDS/SDS evidence is missing.",
    to: "/staff/compliance",
    kicker: "Hold-point",
    cat: "sources",
  },
  {
    id: "staff",
    name: "Workforce desk",
    copy: "Roster, jobs, training, field reports, uploads, messaging.",
    to: "/staff/workforce",
    kicker: "Altier",
    cat: "people",
  },
  {
    id: "contractors",
    name: "Contractor Management",
    copy: "ABN, insurance, licences, competencies, expiries and onboarding.",
    to: "/staff/workforce",
    kicker: "Trade",
    cat: "people",
  },
  {
    id: "academy",
    name: "Training Academy",
    copy: "Courses, competencies, assessments, expiry tracking.",
    to: "/staff/workforce",
    kicker: "Jas",
    cat: "people",
  },
  {
    id: "vault",
    name: "Evidence Vault",
    copy: "Photos, certificates, test results, warranties, TDS/SDS and job evidence.",
    to: "/staff/vault",
    kicker: "Sam’s Safe",
    cat: "records",
  },
  {
    id: "documents",
    name: "Document Generator",
    copy: "Reports, proposals, QA records, compliance packs and customer handovers.",
    to: "/staff/documents",
    kicker: "Print",
    cat: "records",
  },
  {
    id: "approvals",
    name: "Approvals Workflow",
    copy: "Technician → supervisor → operations → director where required.",
    to: "/staff/alerts",
    kicker: "Sign-off",
    cat: "records",
  },
  {
    id: "audit",
    name: "Audit Trail",
    copy: "Who changed, approved, tested or uploaded something — and when.",
    to: "/staff/alerts",
    kicker: "Log",
    cat: "records",
  },
  {
    id: "customer",
    name: "Customer Portal",
    copy: "Enquiries, asset analysis, proposals, reports, documents.",
    to: "/staff/documents",
    kicker: "Client packs",
    cat: "client",
  },
  {
    id: "website",
    name: "Website Integration",
    copy: "Enquiries and customer requests flow directly into Altier.",
    to: "/staff/inbox",
    kicker: "Maison",
    cat: "client",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    copy: "Jobs, alerts, approvals, expiries, KPIs.",
    to: "/staff/command",
    kicker: "Command",
    cat: "command",
  },
  {
    id: "notifications",
    name: "Notifications",
    copy: "Expired certificates, missing evidence, failed QA, outstanding approvals.",
    to: "/staff/alerts",
    kicker: "Alerts",
    cat: "command",
  },
  {
    id: "email",
    name: "Email Integration",
    copy: "Controlled outbound to analysis@nanoassure.net. No public phone book.",
    to: "/staff/inbox",
    kicker: "Mail",
    cat: "command",
  },
  {
    id: "analytics",
    name: "Analytics",
    copy: "Job performance, compliance, QA, workforce and asset-protection outcomes.",
    to: "/staff/analytics",
    kicker: "Gold",
    cat: "command",
  },
  {
    id: "admin",
    name: "Admin / Permissions",
    copy: "Director, operations, supervisor, technician, contractor and customer access.",
    to: "/staff/admin",
    kicker: "Roles",
    cat: "command",
  },
  {
    id: "security",
    name: "Security / Backup",
    copy: "Authentication, role permissions. Invitation-only Altier. Finance stays Director-only.",
    to: "/staff/admin",
    kicker: "Gate",
    cat: "command",
  },
];
