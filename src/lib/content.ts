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
  { title: "Evidence-based QA", copy: "NANOASSURE QA7™ is the pathway. NANODATA Collection™ is the science. Never merged." },
] as const;

export const SOLUTIONS = [
  { id: "glass", title: "Glass & ceramic", copy: "Facades, showers, mirrors, splashbacks. Self-cleaning assist with a controlled hydrophobic bond.", image: "/media/beads-macro.jpg" },
  { id: "stone", title: "Stone & brick", copy: "Porous mineral — sandstone, brick, concrete, marble. Invisible barrier against staining and weather.", image: "/media/civic-stone.jpg" },
  { id: "graffiti", title: "Anti-graffiti armour", copy: "Porous and non-porous systems. Markers cannot bond. CSIRO-tested APAS 1441 on porous.", image: "/media/masonry-protected.jpg" },
  { id: "metal", title: "Metal & non-porous", copy: "Aluminium, stainless, powder-coat, GRP. Light-film protection specified to TDS.", image: "/media/metal-cladding.jpg" },
  { id: "antimicrobial", title: "Antimicrobial hard surfaces", copy: "Microbiostatic defence for high-touch civic and commercial interiors under tropical humidity.", image: "/media/antimicrobial-lobby.jpg" },
  { id: "solar", title: "Solar & high UV", copy: "Presentation life for arrays and exposed glass under tropical sun — SolarStrest™ context.", image: "/media/solar-array.jpg" },
] as const;

export const SYSTEMS = {
  qa7: {
    mark: "QA7",
    name: "NANOASSURE QA7",
    full: "NanoAssure QA7™",
    steps: 7,
    kicker: "The headliner · seven-step controlled pathway",
    script: "Proven. Not promised.",
    role: "Headliner pathway. The Nano Drop shield is the system mark. Seven gold metallic step icons carry a half neon outline — never the same as NANODATA shields.",
  },
  nanodata: {
    mark: "ND5",
    name: "NANODATA Collection",
    full: "NANODATA Collection™",
    steps: 5,
    kicker: "The science · five-instrument substrate series",
    script: "Molecules. Not guesswork.",
    role: "Chrome shield marks. Lives inside QA7 at APDC. Must never be merged or substituted.",
  },
} as const;

export const QA_TESTS: {
  n: string;
  name: string;
  short: string;
  detail: string;
  science: string;
  tone: ChromeTone;
  key: "climascan" | "surfiq" | "phield" | "nanobond" | "solarstrest";
}[] = [
  {
    n: "01",
    name: "ClimaScan™",
    short: "Climate lock",
    key: "climascan",
    tone: "carbon",
    detail: "Environmental equilibrium at the workface before the window is approved.",
    science:
      "Temperature, humidity and weather at the asset. The chemistry only bonds in a real window — never in hope.",
  },
  {
    n: "02",
    name: "SurfiQ™",
    short: "Porosity read",
    key: "surfiq",
    tone: "teal",
    detail: "Surface porosity / absorption profile — is the substrate ready to accept the system?",
    science:
      "Reads whether the face will drink the film into capillaries or hold a light coat. Coverage is specified from this number, not from a brochure.",
  },
  {
    n: "03",
    name: "pHield™",
    short: "Chemistry ready",
    key: "phield",
    tone: "purple",
    detail: "Surface pH / neutralisation status so the bond is not fighting contamination.",
    science:
      "Residual alkali, cleaner film or contamination will fight the molecules. pHield™ confirms the face is chemically ready to receive them.",
  },
  {
    n: "04",
    name: "NanoBond™",
    short: "Molecular lock",
    key: "nanobond",
    tone: "pearl",
    detail: "Application-integrity audit. Confirmation the film has set as specified.",
    science:
      "The molecular audit. NanoBond™ scientifically assures the specified molecules have bonded to the substrate — not dried as a film sitting on top.",
  },
  {
    n: "05",
    name: "SolarStrest™",
    short: "Exposure profile",
    key: "solarstrest",
    tone: "gold",
    detail: "Solar, UV, heat and exposure-risk profile for tropical presentation life.",
    science:
      "Darwin sun, heat and UV are part of the specification. The bond is written for the climate the asset actually lives in.",
  },
];

export const FIELD_TESTS: { n: string; name: string; detail: string; tone: ChromeTone; key: string }[] = [
  { n: "01", name: "Adhesion Test", detail: "Confirms the coating has bonded correctly to the surface. No peeling, lifting or delamination.", tone: "carbon", key: "adhesion" },
  { n: "02", name: "Water Beading / Sheeting Test", detail: "Verifies hydrophobic performance. Water beads or sheets consistently across the surface.", tone: "teal", key: "beading" },
  { n: "03", name: "UV Resistance Test", detail: "Confirms resistance to UV degradation. No cracking, fading or breakdown after exposure.", tone: "purple", key: "uv" },
  { n: "04", name: "Antimicrobial Test", detail: "Verifies the surface actively inhibits microbial growth. Maintains cleaner, healthier surfaces for longer.", tone: "pearl", key: "antimicrobial" },
  { n: "05", name: "Durability & Abrasion Test", detail: "Confirms long-term durability and resistance. Surface maintains performance under real-world use.", tone: "gold", key: "durability" },
];

export type Qa7Icon = "apa" | "ar" | "apdc" | "aphc" | "ssc" | "fdp" | "nia";

export const PROCESS = [
  {
    code: "APA",
    key: "apa",
    icon: "apa" as Qa7Icon,
    n: "01",
    name: "Asset Protection Analysis",
    short: "The read",
    tone: "carbon" as ChromeTone,
    hold: "Inspection is invitation-only. No public quote.",
    detail: "Confidential workface read: substrate, exposure, access, chemistry window.",
  },
  {
    code: "AR",
    key: "rpt",
    icon: "ar" as Qa7Icon,
    n: "02",
    name: "Analysis Report",
    short: "The spec",
    tone: "teal" as ChromeTone,
    hold: "Report is the specification. Nothing is applied from a phone call.",
    detail: "Written atelier report to TDS. Client profile receives the document.",
  },
  {
    code: "APDC",
    key: "dat",
    icon: "apdc" as Qa7Icon,
    n: "03",
    name: "Asset Protection Data Check",
    short: "The science",
    tone: "purple" as ChromeTone,
    hold: "NANODATA Collection™ lives here. Never merged with QA7.",
    detail: "ClimaScan™ · SurfiQ™ · pHield™ · NanoBond™ · SolarStrest™. Five instruments. One gate.",
  },
  {
    code: "APHC",
    key: "hlt",
    icon: "aphc" as Qa7Icon,
    n: "04",
    name: "Asset Protection Health Check",
    short: "The pulse",
    tone: "pearl" as ChromeTone,
    hold: "Field five-test must pass before SSC.",
    detail: "Adhesion, beading, UV, antimicrobial, durability. Initials on the workface.",
  },
  {
    code: "SSC",
    key: "crt",
    icon: "ssc" as Qa7Icon,
    n: "05",
    name: "Surface Shield Certificate",
    short: "The seal",
    tone: "gold" as ChromeTone,
    hold: "Issued only after APDC and APHC pass.",
    detail: "NanoAssure™ certificate NA-YYYYMMDD-XXXX, QR-tagged to the client profile.",
  },
  {
    code: "FDP",
    key: "dep",
    icon: "fdp" as Qa7Icon,
    n: "06",
    name: "Field Deployment Protocol",
    short: "The apply",
    tone: "teal" as ChromeTone,
    hold: "Applied per manufacturer TDS. SP brands assurance only.",
    detail: "Controlled application. Cure window protected. Ops daily files the day.",
  },
  {
    code: "NIA",
    key: "nia",
    icon: "nia" as Qa7Icon,
    n: "07",
    name: "Nano-Integrity Alert",
    short: "The watch",
    tone: "gold" as ChromeTone,
    hold: "The job is not finished at the van door.",
    detail: "Watch window after cure. Alerts reopen APDC/APHC, never a silent patch.",
  },
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
    image: "/media/masonry-protected.jpg",
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
    image: "/media/metal-cladding.jpg",
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
    image: "/media/beads-macro.jpg",
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
    image: "/media/civic-stone.jpg",
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
    image: "/media/pre-cleaner.jpg",
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
    image: "/media/antimicrobial-lobby.jpg",
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
    image: "/media/raw-timber.jpg",
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
    image: "/media/wheels.jpg",
  },
] as const;

export type NanoDataKey = (typeof QA_TESTS)[number]["key"];

export const ASSURANCES: {
  productId: (typeof PRODUCTS)[number]["id"];
  mark: string;
  name: string;
  science: string;
  tests: NanoDataKey[];
  notes: string[];
}[] = [
  {
    productId: "glass-ceramic",
    mark: "QA7-GLASS",
    name: "Hydrophobic Glass Bond",
    science:
      "A single thin film locks to silica. Water beads because the molecules have bonded — not because a wax sits on top.",
    tests: ["climascan", "phield", "nanobond", "solarstrest"],
    notes: [
      "ClimaScan™ — thin-film window. Cool, dry, RH in spec.",
      "pHield™ — Pre-Cleaner leaves a neutral, residue-free face.",
      "NanoBond™ — silica-to-silica molecular lock. Beading is the field proof.",
      "SolarStrest™ — UV and heat on Darwin glass, ceramic and facades.",
      "SurfiQ™ confirms the glass is non-porous so coverage stays at 8–10 ml/m².",
    ],
  },
  {
    productId: "stone-brick",
    mark: "QA7-MINERAL",
    name: "Mineral Capillary Bond",
    science:
      "The chemistry is drunk into the stone. NANODATA Collection™ proves the capillaries accepted the molecules before we call it protected.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfiQ™ — porosity sets 50–80 ml/m². Polished stone is wiped of excess.",
      "pHield™ — mineral alkali must be neutral before the bond.",
      "NanoBond™ — silane/siloxane lock inside the capillary, not a skin on top.",
      "ClimaScan™ — no rain in the 12–24 h window.",
      "SolarStrest™ — weather and UV on civic masonry.",
    ],
  },
  {
    productId: "ag-porous",
    mark: "QA7-GRAFF-P",
    name: "Graffiti Porous Bond",
    science:
      "A single coat enters the masonry. Markers cannot bond because the pores are already occupied — APAS 1441 on file.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfiQ™ — absorption at 80–100 ml/m². Single coat only.",
      "pHield™ — masonry pH must not fight the film.",
      "NanoBond™ — molecular occupation of the pore. The graffiti has nowhere to sit.",
      "ClimaScan™ — surface absolutely dry, 5–35°C.",
      "SolarStrest™ — exterior UV on civic walls.",
    ],
  },
  {
    productId: "ag-nonporous",
    mark: "QA7-GRAFF-N",
    name: "Graffiti Film Bond",
    science:
      "A light film on metal, powder-coat and GRP. SurfiQ™ first proves the face will not drink — then NanoBond™ locks a 10–12 ml coat.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfiQ™ — confirms non-absorbent. If it drinks, this is the wrong system.",
      "ClimaScan™ — substrate +5 to +30°C, RH 30–80%.",
      "pHield™ — clean, dry, chemically ready.",
      "NanoBond™ — light-film molecular lock. No peel, no lift.",
      "SolarStrest™ — UV on cladding and transport finishes.",
    ],
  },
  {
    productId: "antimicrobial",
    mark: "QA7-MICRO",
    name: "Microbiostatic Bond",
    science:
      "The film stays on the high-touch face. NANODATA Collection™ plus the field antimicrobial test prove the molecules remain active — not a perfume that fades.",
    tests: ["climascan", "phield", "nanobond"],
    notes: [
      "ClimaScan™ — tropical humidity is logged, not ignored.",
      "pHield™ — interiors still need a chemically ready face.",
      "NanoBond™ — molecular lock on hard civic surfaces.",
      "APHC field antimicrobial test is the hold-point after the data series.",
    ],
  },
  {
    productId: "raw-timber",
    mark: "QA7-TIMBER",
    name: "Timber Capillary Bond",
    science:
      "Unsealed timber drinks. SurfiQ™ reads the species. NanoBond™ confirms the molecules occupy the grain — not a varnish sitting proud.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfiQ™ — absorbency varies by species. Coverage follows the read.",
      "pHield™ — no residual treatment fighting the film.",
      "ClimaScan™ — dry timber, no rain in the cure window.",
      "NanoBond™ — capillary lock into the grain.",
      "SolarStrest™ — UV weathering on exposed timber.",
    ],
  },
  {
    productId: "pre-cleaner",
    mark: "QA7-PREP",
    name: "Workface Neutral Gate",
    science:
      "Not a coating. Pre-Cleaner is the gate that makes NanoBond™ possible. A dirty or alkaline face cannot lock molecules.",
    tests: ["climascan", "surfiq", "phield"],
    notes: [
      "ClimaScan™ — cool, dry workface before the cleaner.",
      "SurfiQ™ — residue-free confirmation after the wipe.",
      "pHield™ — neutralisation. The coating’s NanoBond™ comes next.",
    ],
  },
  {
    productId: "wheels",
    mark: "QA7-ALLOY",
    name: "Alloy Film Bond",
    science:
      "A light film on specified wheel finishes. Dust and heat will kill a bond that was never measured. NANODATA Collection™ measures it.",
    tests: ["climascan", "phield", "nanobond", "solarstrest"],
    notes: [
      "ClimaScan™ — cool, dry, dust-free. No exceptions.",
      "pHield™ — brake dust and cleaner residue must be gone.",
      "NanoBond™ — light-film lock on alloy.",
      "SolarStrest™ — heat and UV on fleet assets.",
    ],
  },
];

export function assuranceFor(productId: string) {
  return ASSURANCES.find((a) => a.productId === productId);
}

export const NANODATA_SCIENCE =
  "Before a Surface Shield Certificate is issued, the workface walks NANODATA Collection™ — a series of substrate tests that scientifically assure the specified molecules have bonded to the substrate. ClimaScan™ confirms environmental equilibrium. SurfiQ™ reads porosity so the chemistry can enter capillaries or sit as a specified light coat. pHield™ confirms the face is chemically ready. NanoBond™ is the molecular audit: proof the coating has locked to the substrate, not merely dried on top. SolarStrest™ logs UV, heat and exposure so the bond is written for Darwin conditions. Five instruments. One science. Never merged with NANOASSURE QA7™.";

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
