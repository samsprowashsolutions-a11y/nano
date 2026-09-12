/** Branding pack 4 — vault-controlled document look. Navy, gold chrome, numbered discs. */
export const BRAND_PACK = {
  n: 4,
  name: "Vault Document",
  id: "brand-4",
} as const;

export const B4_TONES = ["navy", "cyan", "teal", "purple", "gold", "green", "orange", "blue", "yellow", "red", "aqua"] as const;
export type B4Tone = (typeof B4_TONES)[number];

export const PROCESS_TONE: Record<string, B4Tone> = {
  inspect: "purple",
  prepare: "blue",
  apply: "green",
  verify: "yellow",
  record: "red",
  approve: "aqua",
  handover: "gold",
};

export const SITE_SURFACES = [
  "Glass & ceramic",
  "Stone & brick",
  "Anti-graffiti",
  "Metal & chrome",
  "Antimicrobial hard surface",
  "Mould / wet area",
  "Anti-bacterial fabric",
  "Solar / high UV",
  "Not sure — inspect first",
] as const;

export const SITE_ACCESS = [
  "Ground level",
  "EWP / boom",
  "Scaffold",
  "Roof / height",
  "Interior only",
  "To be confirmed on site",
] as const;

export const SITE_HAZARD = [
  "Low — standard controls",
  "Medium — extra controls needed",
  "Hold — do not proceed until reviewed",
] as const;

/** Per-site SWMS gates completed during analysis — not the legal master. */
export const SITE_SWMS = [
  { id: "induction", label: "Site induction / permits" },
  { id: "access", label: "Access and WHS assessed" },
  { id: "substrate", label: "Substrate identified" },
  { id: "pathway", label: "Approved product pathway" },
  { id: "ppe", label: "PPE set for this site" },
  { id: "exclusion", label: "Exclusion zone / barricades" },
  { id: "photos", label: "Site photos captured" },
  { id: "sds", label: "Current TDS / SDS on hand" },
] as const;
