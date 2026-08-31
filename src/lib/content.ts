export const BRAND = {
  public: "NanoAssure™",
  parent: "Sam's Pro-Wash Solutions Pty Ltd",
  abn: "95 698 841 128",
  acn: "698 841 128",
  location: "Darwin, Northern Territory",
  analysisEmail: "analysis@nanoassure.net",
  generalEmail: "samsprowashsolutions@gmail.com",
  web: "www.nanoassure.net",
  tagline: "Advanced surface protection. Stronger communities. Better futures.",
  positioning: "SP applies advanced surface protection to specification. NanoAssure™ proves it.",
} as const;

export type ChromeTone = "carbon" | "teal" | "purple" | "pearl" | "gold";

export const CHROME: { id: string; name: string; tone: ChromeTone; role: string }[] = [
  { id: "01", name: "Carbon", tone: "carbon", role: "Core foundational documents and essential governance records." },
  { id: "02", name: "Teal", tone: "teal", role: "Operational frameworks, policies, procedures and process documentation." },
  { id: "03", name: "Purple", tone: "purple", role: "Support systems, guidelines, templates and reference materials." },
  { id: "04", name: "Pearl", tone: "pearl", role: "Quality assurance, compliance, audit and review documentation." },
  { id: "05", name: "Gold", tone: "gold", role: "Strategic, executive and high-value governance assets." },
];

export const TRUST = [
  { title: "Business & government ready", copy: "Darwin NT and surrounding regions. Civic, commercial, body-corporate." },
  { title: "Insured delivery pathway", copy: "WHS, public and products liability held as a controlled field practice." },
  { title: "Aboriginal-led values", copy: "NT Aboriginal owned and operated. Local employment, community first." },
  { title: "Evidence-based QA", copy: "Five-Step Data Test Set™ and a seven-step controlled project pathway." },
] as const;

export const SOLUTIONS = [
  { id: "glass", title: "Glass & ceramic", copy: "Facades, showers, mirrors, splashbacks. Self-cleaning assist with a controlled hydrophobic bond.", image: "/media/beads-macro.jpg" },
  { id: "stone", title: "Stone & brick", copy: "Porous mineral — sandstone, brick, concrete, marble. Invisible barrier against staining and weather.", image: "/media/civic-stone.jpg" },
  { id: "graffiti", title: "Anti-graffiti armour", copy: "Porous and non-porous systems. Markers cannot bond. CSIRO-tested APAS 1441 on porous.", image: "/media/pavers.jpg" },
  { id: "metal", title: "Metal & non-porous", copy: "Aluminium, stainless, powder-coat, GRP. Light-film protection specified to TDS.", image: "/media/commercial-glass.jpg" },
  { id: "antimicrobial", title: "Antimicrobial hard surfaces", copy: "Microbiostatic defence for high-touch civic and commercial interiors under tropical humidity.", image: "/media/application.jpg" },
  { id: "solar", title: "Solar & high UV", copy: "Presentation life for arrays and exposed glass under tropical sun — SolarStress™ context.", image: "/media/estate-dusk.jpg" },
] as const;

export const QA_TESTS: { n: string; name: string; detail: string; tone: ChromeTone }[] = [
  { n: "01", name: "ClimaScan™", detail: "Temperature and humidity at the workface before the window is approved.", tone: "carbon" },
  { n: "02", name: "SurfiQ™", detail: "Porosity and absorption — is the substrate ready to accept the system?", tone: "teal" },
  { n: "03", name: "pHield™", detail: "Substrate pH and residual chemistry so the bond is not fighting contamination.", tone: "purple" },
  { n: "04", name: "NanoBond™", detail: "Bond integrity after application. Confirmation the film has set as specified.", tone: "pearl" },
  { n: "05", name: "SolarStress™", detail: "UV and durability context for tropical exposure and long presentation life.", tone: "gold" },
];

export const FIELD_TESTS: { n: string; name: string; detail: string; tone: ChromeTone; key: string }[] = [
  { n: "01", name: "Adhesion Test", detail: "Confirms the coating has bonded correctly to the surface. No peeling, lifting or delamination.", tone: "carbon", key: "adhesion" },
  { n: "02", name: "Water Beading / Sheeting Test", detail: "Verifies hydrophobic performance. Water beads or sheets consistently across the surface.", tone: "teal", key: "beading" },
  { n: "03", name: "UV Resistance Test", detail: "Confirms resistance to UV degradation. No cracking, fading or breakdown after exposure.", tone: "purple", key: "uv" },
  { n: "04", name: "Antimicrobial Test", detail: "Verifies the surface actively inhibits microbial growth. Maintains cleaner, healthier surfaces for longer.", tone: "pearl", key: "antimicrobial" },
  { n: "05", name: "Durability & Abrasion Test", detail: "Confirms long-term durability and resistance. Surface maintains performance under real-world use.", tone: "gold", key: "durability" },
];

export const PROCESS = [
  { code: "APA", name: "Asset Protection Analysis" },
  { code: "RPT", name: "Analysis Report" },
  { code: "DAT", name: "Data Check" },
  { code: "HLT", name: "Health Check" },
  { code: "CRT", name: "Surface Shield Cert" },
  { code: "DEP", name: "Field Deployment" },
  { code: "NIA", name: "Nano-Integrity Alert" },
] as const;

export const PRODUCTS = [
  {
    id: "ag-porous",
    name: "Nanoman Anti-Graffiti (Porous)",
    tds: "TDS-41a v0.7 (April 2025)",
    sds: "SDS NTP/AGP/1006 · 01/02/24",
    substrate: "Porous — concrete, masonry, brickwork, terracotta, timber",
    coats: "Single coat only",
    coverage: "80–100 ml/m²",
    env: "5–35°C · RH ≤ 90% · surface absolutely dry",
    dryTimes: "Touch dry ~1 h · completely dry 4–5 h · fully cured 7 days",
    apas: "APAS 1441 · CSIRO tested Complies (Aug 2021)",
    certNote: "Applied per Nanoman TDS-41a. Single coat. CSIRO APAS 1441 Complies.",
  },
  {
    id: "ag-nonporous",
    name: "Nanoman Anti-Graffiti (Non-Porous)",
    tds: "TDS-42a v0.3 (Feb 2024)",
    sds: "SDS NTP/AGNP/1004 · 01/02/24",
    substrate: "Metals, powder-coat, GRP, plastics — non-absorbent",
    coats: "Single coat — light film only",
    coverage: "10–12 ml/m²",
    env: "Substrate +5 to +30°C · RH 30–80% · absolutely dry",
    dryTimes: "Touch dry ~1 h · completely dry 4–5 h · fully cured 5–7 days",
    apas: "",
    certNote: "Applied per TDS-42a. Effective life approx. 7–10 years when specified correctly.",
  },
  {
    id: "glass-ceramic",
    name: "Nanoman Glass + Ceramic",
    tds: "TDS-03a v0.2 (Feb 2024)",
    sds: "SDS Glass + Ceramic — Data Sheets hub",
    substrate: "Glass, ceramic, porcelain, mirrors, shower screens, tiles",
    coats: "Single thin film",
    coverage: "8–10 ml/m² typical",
    env: "5–35°C · RH ≤ 90% · clean & dry",
    dryTimes: "Initial dry 2–5 min · optimal after 24 h",
    apas: "",
    certNote: "Pre-Cleaner prep required. ISO 11507 referenced on manufacturer TDS.",
  },
  {
    id: "stone-brick",
    name: "Nanoman Stone + Brick",
    tds: "TDS-10a v0.5 (Jan 2025)",
    sds: "SDS Stone + Brick — Data Sheets hub",
    substrate: "Porous mineral — stone, brick, concrete. Not resin engineered stone.",
    coats: "One coat",
    coverage: "50–80 ml/m²",
    env: "7.22–35°C · no rain 12–24 h",
    dryTimes: "Surface dry 2–3 h · optimal ~5 days",
    apas: "",
    certNote: "Test a small area first. Wipe excess on polished stone after ~15 min.",
  },
  {
    id: "pre-cleaner",
    name: "Nanoman Pre Cleaner",
    tds: "Pre-Cleaner — Data Sheets hub",
    sds: "SDS Pre Cleaner",
    substrate: "Preparation for glass, ceramic and specified substrates",
    coats: "Cleaner — not a coating",
    coverage: "As required to a residue-free dry surface",
    env: "Apply to a cool, dry surface",
    dryTimes: "Must be fully dry before coating",
    apas: "",
    certNote: "Mandatory prep for Glass + Ceramic. NanoAssure gates confirm a clean, dry workface.",
  },
  {
    id: "antimicrobial",
    name: "Nanoman Antimicrobial Hard Surfaces",
    tds: "Antimicrobial Hard Surfaces TDS",
    sds: "SDS Antimicrobial",
    substrate: "Hard, high-touch civic and commercial interiors",
    coats: "As specified on TDS",
    coverage: "Per TDS",
    env: "Tropical humidity windows as logged on ClimaScan™",
    dryTimes: "Per TDS",
    apas: "",
    certNote: "Field antimicrobial test is hold-point 04 on the Five-Test Checklist.",
  },
  {
    id: "raw-timber",
    name: "Nanoman Raw Timber",
    tds: "Raw Timber TDS",
    sds: "SDS Raw Timber",
    substrate: "Unsealed timber (not for engineered composites unless specified)",
    coats: "Per TDS",
    coverage: "Varies with absorbency",
    env: "Dry timber · no rain in the cure window",
    dryTimes: "Per TDS",
    apas: "",
    certNote: "Confirm species and moisture before specifying.",
  },
  {
    id: "wheels",
    name: "Nanoman Wheels",
    tds: "Wheels TDS",
    sds: "SDS Wheels",
    substrate: "Alloy and specified wheel finishes",
    coats: "Light film",
    coverage: "Per TDS",
    env: "Cool, dry, dust-free",
    dryTimes: "Per TDS",
    apas: "",
    certNote: "Fleet and transport pathway. Not a public menu item.",
  },
] as const;

export const SWMS = {
  title: "Safe Work Method Statement",
  authors: "Samantha Rae and Jasmin Calma",
  entity: "Sam's Pro-Wash Solutions Pty Ltd",
  status: "DRAFT — UNREGISTERED",
  documentId: "UNALLOCATED",
  approval: "NOT EXECUTED — project/site completion and approval required",
  control:
    "This document is a controlled master/template for Sam's Pro-Wash Solutions Pty Ltd. It is not a completed project-specific SWMS. Actual site, task, product, plant, access, hazards, risk ratings, consultation, emergency arrangements and approvals must be completed for the job before issue or use.",
  fields: [
    "Client / Principal",
    "Project / Site",
    "Exact work area",
    "Work activity / scope",
    "Planned date / shift",
    "Site contact / permit authority",
    "SWMS prepared by",
    "Workers / subcontractors consulted",
  ],
  steps: [
    { n: "1", activity: "Pre-start, client/site induction, permits and access confirmation" },
    { n: "2", activity: "Asset Protection Analysis / work-area condition review" },
    { n: "3", activity: "Barricades, exclusion zone, pedestrian/vehicle interface controls" },
    { n: "4", activity: "Plant, tools, access equipment and PPE pre-use inspection" },
  ],
} as const;

export const SEED_VACANCIES = [
  { id: "VAC-1", title: "NanoAssure Application Technician", type: "Full-time", location: "Darwin NT", status: "Public", openings: 2 },
  { id: "VAC-2", title: "Site Supervisor", type: "Full-time", location: "Darwin NT", status: "Public", openings: 1 },
  { id: "VAC-3", title: "Subcontractor — APA / project packs", type: "Contract", location: "Darwin NT", status: "Invitation", openings: 3 },
] as const;

export const SEED_EMPLOYEES = [
  { id: "E1", empNo: "SP-001", name: "Samantha Rae", role: "Director", type: "Employee", licences: "White Card · Director" },
  { id: "E2", empNo: "SP-002", name: "Jasmin Calma", role: "Cultural & Academy", type: "Employee", licences: "White Card · Trainer" },
  { id: "E3", empNo: "SP-003", name: "Kate", role: "Operations Command", type: "Employee", licences: "White Card · Chem" },
] as const;

export const SEED_APPLICATIONS = [
  { id: "A1", name: "Jordan M.", vacancy: "Application Technician", suburb: "Palmerston", stage: "Interview" },
  { id: "A2", name: "Riley T.", vacancy: "Site Supervisor", suburb: "Nightcliff", stage: "Screening" },
] as const;
