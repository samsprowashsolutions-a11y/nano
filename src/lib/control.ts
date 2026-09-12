/** NANO7™ + NANODATA Collection™ + Vault control — operational spec.
 *  NANODATA records field evidence only. It does not independently certify bonding.
 */

export const VAULT_NAMESPACES = [
  "SP-DOC-",
  "SP-AST-",
  "SP-PRJ-",
  "SP-PER-",
  "SP-PRD-",
  "SP-ACT-",
  "SP-AUD-",
  "SP-INT-",
  "SP-HLD-",
  "SP-QTN-",
  "SP-CHK-",
  "SP-FIN-",
] as const;
export type VaultNamespace = (typeof VAULT_NAMESPACES)[number];

export const SOURCE_STATUS = ["CURRENT", "SUPERSEDED", "EXPIRED", "UNKNOWN"] as const;
export const ISSUE_STATUS = ["ISSUABLE", "HOLD — BETTER COPY", "HOLD — MISSING EVIDENCE", "BLOCKED"] as const;
export const SECURITY_CLASS = ["PUBLIC", "INTERNAL", "CONFIDENTIAL", "RESTRICTED"] as const;
export const LIFECYCLE = ["ACTIVE", "SUPERSEDED", "ARCHIVED", "DISPOSED"] as const;
export const CONTROL_EVENT = ["OPEN", "CLOSED / RESOLVED"] as const;

export const HOLD_KINDS = [
  {
    id: "document",
    label: "Document Control HOLD",
    tone: "purple",
    copy: "Correctable documentation or evidence issue. No operational release until resolved or formally overridden.",
  },
  {
    id: "security",
    label: "Security Quarantine",
    tone: "crimson",
    copy: "Isolated content. No operational access. Authorised quarantine roles only.",
  },
  {
    id: "legal",
    label: "Legal / Privacy HOLD",
    tone: "indigo",
    copy: "Preservation control. Restricted access. Deletion overridden.",
  },
  {
    id: "archive",
    label: "Archive",
    tone: "titanium",
    copy: "Lifecycle state. Not quarantine.",
  },
] as const;

export const NANODATA_TESTS = [
  { id: "ClimaScan", mark: "ClimaScan™", copy: "Environmental equilibrium at the workface." },
  { id: "SurfIQ", mark: "SurfIQ™", copy: "Porosity / capillary read of the substrate." },
  { id: "pHield", mark: "pHield™", copy: "Chemical readiness of the face." },
  { id: "NanoBond", mark: "NanoBond™", copy: "Molecular audit — field observation only, pending review." },
  { id: "SolarStress", mark: "SolarStress™", copy: "UV, heat and exposure log." },
] as const;

export const N7_STAGES = [
  {
    code: "INS",
    name: "Inspect",
    owner: "Assigned inspector or authorised field operator",
    required: ["projectRef", "assetRef", "observations", "inspector", "timestamp"],
    holdIf: "Project or asset identification, required observations, evidence, access, or security clearance is missing.",
  },
  {
    code: "PRE",
    name: "Prepare",
    owner: "Site supervisor or authorised preparation lead",
    required: ["method", "sdsTds", "ppeWhs", "preparer", "timestamp"],
    holdIf: "SDS/TDS missing, expired, unverified or restricted; PPE/WHS missing; checklist or photos incomplete.",
  },
  {
    code: "APL",
    name: "Apply",
    owner: "Authorised applicator",
    required: ["productRef", "operator", "authority", "timestamp", "instructions"],
    holdIf: "Product identity, operator authority, required batch/lot, instructions, or application data missing.",
  },
  {
    code: "VER",
    name: "Verify",
    owner: "Authorised technical verifier",
    required: ["verifier", "authority", "qaResult", "decision", "timestamp"],
    holdIf: "Verification failed, incomplete, conflicting, unauthorised, or an unresolved defect/HOLD remains.",
  },
  {
    code: "REC",
    name: "Record",
    owner: "Records coordinator or authorised project administrator",
    required: ["packRef", "classifier", "timestamp"],
    holdIf: "Evidence missing, superseded, restricted, conflicting, unresolved, or relationship broken.",
  },
  {
    code: "APP",
    name: "Approve",
    owner: "Authorised commercial or operational approver — not the technical verifier",
    required: ["approver", "authority", "decision", "timestamp"],
    holdIf: "Preceding stage incomplete, HOLD unresolved, insufficient authority, or self-approval conflict.",
  },
  {
    code: "HND",
    name: "Handover",
    owner: "Authorised release or handover owner",
    required: ["reportRef", "recipient", "acknowledgement", "timestamp"],
    holdIf: "Material unapproved, restricted, quarantined, superseded, unresolved, unreleased, or acknowledgement missing.",
  },
] as const;

export const OCR_USES = [
  "document",
  "equipment label",
  "QR",
  "barcode",
  "serial",
  "receipt",
  "certificate",
  "TDS/SDS",
  "staff qualification",
] as const;

export const READINESS_CATEGORIES = [
  { id: "people", label: "People" },
  { id: "ppe", label: "PPE" },
  { id: "vehicle", label: "Vehicle" },
  { id: "equipment", label: "Equipment" },
  { id: "products", label: "Products" },
  { id: "documents", label: "Documents" },
  { id: "whs", label: "WHS" },
  { id: "first_aid", label: "First aid" },
] as const;

export const NANODATA_LIMIT =
  "NANODATA records field evidence only. They do not independently certify product performance or prove molecular bonding. Captured, uploaded, scanned or linked results remain pending or on HOLD until authorised review is complete.";

export function canAdvance(opts: {
  stageIndex: number;
  previousComplete: boolean;
  openHolds: number;
  payload: Record<string, string>;
}): { ok: boolean; reason?: string } {
  const stage = N7_STAGES[opts.stageIndex];
  if (!stage) return { ok: false, reason: "Unknown stage." };
  if (opts.stageIndex > 0 && !opts.previousComplete) {
    return { ok: false, reason: "Preceding stage is incomplete. A related record, upload, form or timestamp alone cannot advance a stage." };
  }
  if (opts.openHolds > 0) {
    return { ok: false, reason: "Open HOLD blocks progression." };
  }
  const missing = stage.required.filter((k) => !String(opts.payload[k] || "").trim());
  if (missing.length) {
    return { ok: false, reason: `Required fields missing: ${missing.join(", ")}.` };
  }
  return { ok: true };
}
