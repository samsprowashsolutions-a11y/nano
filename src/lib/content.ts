export const BRAND = {
  public: "NanoAssure™",
  parent: "Sam's Pro-Wash Solutions Pty Ltd",
  abn: "95 698 841 128",
  acn: "698 841 128",
  location: "Darwin, Northern Territory",
  analysisEmail: "analysis@nanoassure.net",
  generalEmail: "samsprowashsolutions@gmail.com",
  web: "www.nanoassure.net",
  origin: "https://www.nanoassure.net",
  tagline: "Advanced surface protection. Stronger communities. Better futures.",
  positioning: "SP applies advanced surface protection to specification. NanoAssure™ proves it.",
} as const;

/** Public house rules — never application method, never trade. */
export const HOUSE = {
  invite:
    "Invitation is a house selection. Express interest is a request, not a quote and not access.",
  personal:
    "Specified systems may be considered for personal and residential assets after selection. The atelier still applies. It is not a DIY kit.",
  commercial:
    "There is no commercial product line for the client to buy and run. Large commercial work proceeds only after Applicator All Clear.",
  allClear:
    "Applicator All Clear is the commercial gate. Until it is issued, a large project stays in analysis. It is not a how-to and not a product sale.",
  upgrade:
    "Selected principals with capacity may be invited to a limited upgrade pathway. Money does not skip the house. Access is granted, not taken.",
  trade:
    "Method, batch, coverage and chemistry stay in the atelier. The maison shows what the asset receives — never how it is put on.",
} as const;

export const PUBLIC_ROLES = [
  {
    name: "Samantha Rae",
    role: "Director",
    duty: "House selection, specification, invitation, command. Approves what may be said and what may proceed.",
  },
  {
    name: "Jasmin Calma",
    role: "Director — culture & academy",
    duty: "Country, community, training pathway. People are ready before a site is opened.",
  },
  {
    name: "Kate · OPPS",
    role: "Operations",
    duty: "Field command and OPPS ALL CLEAR for handover print. Does not replace Applicator All Clear on commercial work.",
  },
  {
    name: "Authorised applicator",
    role: "Atelier",
    duty: "Applies only after the house has selected the asset and, on large commercial, Applicator All Clear is on file. Never teaches the client the method.",
  },
  {
    name: "The client",
    role: "Principal",
    duty: "Express interest. Receive the invitation if selected. Keep the asset available for inspection. Do not apply the chemistry.",
  },
] as const;

export type ChromeTone = "carbon" | "teal" | "purple" | "pearl" | "gold" | "blue" | "green" | "yellow" | "red" | "aqua";

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
  { title: "Evidence-based QA", copy: "NANO7™ Asset Assurance Policy is the pathway. NANODATA Collection™ is the science. Never merged." },
] as const;

export const SOLUTIONS = [
  { id: "glass", title: "Glass & ceramic", copy: "Facades, showers, mirrors, splashbacks. Self-cleaning assist with a controlled hydrophobic bond.", image: "/media/beads-macro.jpg" },
  { id: "stone", title: "Stone & brick", copy: "Porous mineral — sandstone, brick, concrete, marble. Invisible barrier against staining and weather.", image: "/media/civic-stone.jpg" },
  { id: "graffiti", title: "Anti-graffiti armour", copy: "Porous and non-porous systems. Markers cannot bond. CSIRO-tested APAS 1441 on porous.", image: "/media/masonry-protected.jpg" },
  { id: "metal", title: "Metal & chrome", copy: "Polished chrome, stainless and plated metal. A specified light film, applied by the atelier. Water beads because the molecules locked — not because a polish was left on top.", image: "/media/chrome-stainless.jpg" },
  { id: "antimicrobial", title: "Antimicrobial hard surfaces", copy: "Microbiostatic defence for high-touch civic and commercial interiors under tropical humidity.", image: "/media/application.jpg" },
  { id: "mould", title: "Antimicrobial mould", copy: "Wet-area and tropical-interior mould pathway. Humidity is logged. The film stays; the spores do not.", image: "/media/antimicrobial-mould.jpg" },
  { id: "fabric", title: "Anti-bacterial fabric", copy: "Textiles, upholstery and civic seating. Molecules lock to the fibre — not a spray that washes out.", image: "/media/antibacterial-fabric.jpg" },
  { id: "solar", title: "Solar & high UV", copy: "Presentation life for arrays and exposed glass under tropical sun — SolarStress™ context.", image: "/media/solar-array.jpg" },
] as const;

export const SYSTEMS = {
  qa7: {
    mark: "NANO7",
    name: "NANO7™",
    full: "NANO7™ Asset Assurance Policy",
    policy: "ASSET ASSURANCE POLICY",
    sequence: "Inspect · Prepare · Apply · Verify · Record · Approve · Handover",
    steps: 7,
    kicker: "The headliner · seven-gate policy",
    script: "Asset Assurance Policy",
    role: "Headliner pathway. The N7 seal is the system mark — Seven Step Pathway. Seven metallic gates: purple · blue · green · yellow · red · aqua · gold. Half neon outline. Never the same as NANODATA shields.",
  },
  nanodata: {
    mark: "ND5",
    name: "NANODATA Collection",
    full: "NANODATA Collection™",
    steps: 5,
    kicker: "The science · five-instrument substrate series",
    script: "Molecules. Not guesswork.",
    role: "Chrome shield marks. Lives inside NANO7™ at Verify. Must never be merged or substituted.",
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
    short: "Environmental temperature and humidity",
    key: "climascan",
    tone: "carbon",
    detail: "Environmental temperature and humidity.",
    science:
      "Temperature, humidity and weather at the asset. The chemistry only bonds in a real window — never in hope.",
  },
  {
    n: "02",
    name: "SurfIQ™",
    short: "Surface porosity and absorption",
    key: "surfiq",
    tone: "teal",
    detail: "Surface porosity and absorption.",
    science:
      "Reads whether the face will drink the film into capillaries or hold a light coat. Coverage is specified from this number, not from a brochure.",
  },
  {
    n: "03",
    name: "pHield™",
    short: "Substrate pH and chemical-residue check",
    key: "phield",
    tone: "purple",
    detail: "Substrate pH and chemical-residue check.",
    science:
      "Residual alkali, cleaner film or contamination will fight the molecules. pHield™ confirms the face is chemically ready to receive them.",
  },
  {
    n: "04",
    name: "NanoBond™",
    short: "Coating bond integrity",
    key: "nanobond",
    tone: "pearl",
    detail: "Coating bond integrity.",
    science:
      "The molecular audit. NanoBond™ scientifically assures the specified molecules have bonded to the substrate — not dried as a film sitting on top.",
  },
  {
    n: "05",
    name: "SolarStress™",
    short: "UV resistance and durability",
    key: "solarstrest",
    tone: "gold",
    detail: "UV resistance and durability.",
    science:
      "Darwin sun, heat and UV are part of the specification. The bond is written for the climate the asset actually lives in.",
  },
];

/** How the film lives on the asset — benefits, never application method. */
export const SURFACE_LIFE = [
  { n: "01", name: "Bonds to the surface", detail: "The specified molecules lock to the substrate. Not a polish sitting on top." },
  { n: "02", name: "Water lifts", detail: "Moisture cannot wet the face. Beads form. Contaminants lose their grip." },
  { n: "03", name: "Dirt releases", detail: "Grime, salt and urban film have nothing to hold. The face stays presentation-ready." },
  { n: "04", name: "Stays clean & clear", detail: "Cleaner longer. Less maintenance. Extended asset life — the assurance, not a DIY kit." },
] as const;

export const FIELD_TESTS: { n: string; name: string; detail: string; tone: ChromeTone; key: string }[] = [
  { n: "01", name: "Adhesion Test", detail: "Confirms the coating has bonded correctly to the surface. No peeling, lifting or delamination.", tone: "carbon", key: "adhesion" },
  { n: "02", name: "Water Beading / Sheeting Test", detail: "Verifies hydrophobic performance. Water beads or sheets consistently across the surface.", tone: "teal", key: "beading" },
  { n: "03", name: "UV Resistance Test", detail: "Confirms resistance to UV degradation. No cracking, fading or breakdown after exposure.", tone: "purple", key: "uv" },
  { n: "04", name: "Antimicrobial Test", detail: "Verifies the surface actively inhibits microbial growth. Maintains cleaner, healthier surfaces for longer.", tone: "pearl", key: "antimicrobial" },
  { n: "05", name: "Durability & Abrasion Test", detail: "Confirms long-term durability and resistance. Surface maintains performance under real-world use.", tone: "gold", key: "durability" },
];

export type Qa7Icon = "inspect" | "prepare" | "apply" | "verify" | "record" | "approve" | "handover";

export const PROCESS = [
  {
    code: "INS",
    key: "apa",
    icon: "inspect" as Qa7Icon,
    n: "01",
    name: "Inspect",
    short: "The read",
    tone: "purple" as ChromeTone,
    hold: "Inspection is invitation-only. No public quote.",
    detail: "Confidential workface read: substrate, exposure, access, chemistry window. The asset is seen before anything is specified.",
    plain: "We inspect the surface first. Nothing is quoted until we have seen it.",
  },
  {
    code: "PRE",
    key: "rpt",
    icon: "prepare" as Qa7Icon,
    n: "02",
    name: "Prepare",
    short: "The face",
    tone: "blue" as ChromeTone,
    hold: "Nothing is applied to a dirty, wet or unready face.",
    detail: "Specification to TDS. Pre-Cleaner where required. Exclusion zone. The workface is made ready — not hoped ready.",
    plain: "We get the surface ready. Clean, dry, chemically right — then we coat.",
  },
  {
    code: "APL",
    key: "dat",
    icon: "apply" as Qa7Icon,
    n: "03",
    name: "Apply",
    short: "The film",
    tone: "green" as ChromeTone,
    hold: "The atelier applies. The client does not.",
    detail: "Controlled application by NanoAssure™, to manufacturer TDS. Cure window protected. Method stays in the atelier.",
    plain: "Our team applies the coating. You never do it yourself.",
  },
  {
    code: "VER",
    key: "hlt",
    icon: "verify" as Qa7Icon,
    n: "04",
    name: "Verify",
    short: "The science",
    tone: "yellow" as ChromeTone,
    hold: "NANODATA Collection™ lives here. Never merged with NANO7™.",
    detail: "ClimaScan™ · SurfIQ™ · pHield™ · NanoBond™ · SolarStress™, then the field five-test. Molecules locked — or the job holds.",
    plain: "We test that the coating actually bonded. If it did not, the job holds.",
  },
  {
    code: "REC",
    key: "crt",
    icon: "record" as Qa7Icon,
    n: "05",
    name: "Record",
    short: "The file",
    tone: "red" as ChromeTone,
    hold: "If it is not written, it was not done.",
    detail: "Ops daily, photos, NANODATA values, initials. The client profile and Sam’s Safe receive the pack.",
    plain: "We file photos, tests and notes. If it is not written, it was not done.",
  },
  {
    code: "APP",
    key: "dep",
    icon: "approve" as Qa7Icon,
    n: "06",
    name: "Approve",
    short: "The seal",
    tone: "aqua" as ChromeTone,
    hold: "Certificate only after Verify and Record pass.",
    detail: "NanoAssure™ certificate NA-YYYYMMDD-XXXX. Director/atelier sign-off. QR is printed for the asset.",
    plain: "We sign the certificate only after the tests pass.",
  },
  {
    code: "HND",
    key: "nia",
    icon: "handover" as Qa7Icon,
    n: "07",
    name: "Handover",
    short: "The pass",
    tone: "gold" as ChromeTone,
    hold: "The job is not finished at the van door.",
    detail: "Warranty, verify ID and documents go to the client profile. Watch window after cure. Alerts reopen Verify, never a silent patch.",
    plain: "You receive the documents, warranty and verify ID. That is handover.",
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
    image: "/media/application.jpg",
  },
  {
    id: "ab-fabric",
    name: "Nanoman Anti-Bacterial Fabric",
    tds: "Anti-Bacterial Fabric / 365 Fabric Surfaces TDS",
    sds: "SDS Antimicrobial Fabric",
    substrate: "Textiles, upholstery, curtains, civic seating, specified fabrics",
    coats: "As specified on TDS — fibre treatment, not a paint",
    coverage: "Per TDS · varies with weave and absorbency",
    env: "Cool, dry fabric. Humidity logged on ClimaScan™",
    dryTimes: "Per TDS · fully dry before return to service",
    apas: "",
    certNote: "Fibre lock. Field antimicrobial test is the hold-point. Not a perfume that washes out.",
    image: "/media/antibacterial-fabric.jpg",
  },
  {
    id: "am-mould",
    name: "Nanoman Antimicrobial (Mould)",
    tds: "Antimicrobial Mould / Wet-Area TDS",
    sds: "SDS Antimicrobial",
    substrate: "Wet areas, grout, ceilings, HVAC, bathrooms, tropical interiors prone to mould",
    coats: "As specified on TDS",
    coverage: "Per TDS",
    env: "Tropical humidity windows as logged on ClimaScan™. Face must be dry at application.",
    dryTimes: "Per TDS",
    apas: "",
    certNote: "Mould pathway is not the same as hard-surface antimicrobial. APHC field test is the hold-point.",
    image: "/media/antimicrobial-mould.jpg",
  },
  {
    id: "chrome",
    name: "Nanoman Metal (Chrome)",
    tds: "TDS-04a Metal v0.1 (Feb 2024)",
    sds: "SDS Metal · chrome-plated surfaces",
    substrate: "Polished chrome, chrome-plated fittings, stainless, zinc, brass, aluminium — handrails, taps, facings, marine and architectural chrome",
    coats: "Single light film — spray then wipe. Never a second wet coat.",
    coverage: "8–12 ml/m² · 100 ml treats ~10 m² · do not flood",
    env: "5–35°C · shade · not on hot metal · not in sun, wind or rain · dust-free",
    dryTimes: "Untouched 30–60 min (longer in humidity) · optimal after 24 h · keep dry",
    apas: "",
    certNote: "Applied per Nanoman TDS-04a. Light film only. Residue means too much was applied.",
    image: "/media/chrome-stainless.jpg",
    method: [
      "Prepare — completely clean, dry, free of grease, polish oils, salt and fingerprints. Pre-Cleaner is the last wipe. No abrasive cloths on polished chrome.",
      "Condition — 5–35°C. Shade. Not in direct sun. Not on hot metal. Shake; re-shake every 15–20 minutes so the nanoparticles stay suspended.",
      "Apply — spray a light film onto a small area. Wipe in with a lint-free cloth in circular or figure-eight motions. Work top to bottom. Single pass. Never flood.",
      "Residue — leftover silane means over-application. Wipe or polish off with Pre-Cleaner. Overspray is wiped dry immediately so it cannot crystallise.",
      "Cure — untouched and dry 30–60 minutes (longer in Darwin humidity). Light buff with a clean microfibre. Optimal after 24 hours. Keep dry in that window.",
    ],
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
    mark: "N7-GLASS",
    name: "Hydrophobic Glass Bond",
    science:
      "A single thin film locks to silica. Water beads because the molecules have bonded — not because a wax sits on top.",
    tests: ["climascan", "phield", "nanobond", "solarstrest"],
    notes: [
      "ClimaScan™ — thin-film window. Cool, dry, RH in spec.",
      "pHield™ — Pre-Cleaner leaves a neutral, residue-free face.",
      "NanoBond™ — silica-to-silica molecular lock. Beading is the field proof.",
      "SolarStress™ — UV and heat on Darwin glass, ceramic and facades.",
      "SurfIQ™ confirms the glass is non-porous so coverage stays at 8–10 ml/m².",
    ],
  },
  {
    productId: "stone-brick",
    mark: "N7-MINERAL",
    name: "Mineral Capillary Bond",
    science:
      "The chemistry is drunk into the stone. NANODATA Collection™ proves the capillaries accepted the molecules before we call it protected.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfIQ™ — porosity sets 50–80 ml/m². Polished stone is wiped of excess.",
      "pHield™ — mineral alkali must be neutral before the bond.",
      "NanoBond™ — silane/siloxane lock inside the capillary, not a skin on top.",
      "ClimaScan™ — no rain in the 12–24 h window.",
      "SolarStress™ — weather and UV on civic masonry.",
    ],
  },
  {
    productId: "ag-porous",
    mark: "N7-GRAFF-P",
    name: "Graffiti Porous Bond",
    science:
      "A single coat enters the masonry. Markers cannot bond because the pores are already occupied — APAS 1441 on file.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfIQ™ — absorption at 80–100 ml/m². Single coat only.",
      "pHield™ — masonry pH must not fight the film.",
      "NanoBond™ — molecular occupation of the pore. The graffiti has nowhere to sit.",
      "ClimaScan™ — surface absolutely dry, 5–35°C.",
      "SolarStress™ — exterior UV on civic walls.",
    ],
  },
  {
    productId: "ag-nonporous",
    mark: "N7-GRAFF-N",
    name: "Graffiti Film Bond",
    science:
      "A light film on metal, powder-coat and GRP. SurfIQ™ first proves the face will not drink — then NanoBond™ locks a 10–12 ml coat.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "SurfIQ™ — confirms non-absorbent. If it drinks, this is the wrong system.",
      "ClimaScan™ — substrate +5 to +30°C, RH 30–80%.",
      "pHield™ — clean, dry, chemically ready.",
      "NanoBond™ — light-film molecular lock. No peel, no lift.",
      "SolarStress™ — UV on cladding and transport finishes.",
    ],
  },
  {
    productId: "antimicrobial",
    mark: "N7-MICRO",
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
    productId: "pre-cleaner",
    mark: "N7-PREP",
    name: "Workface Neutral Gate",
    science:
      "Not a coating. Pre-Cleaner is the gate that makes NanoBond™ possible. A dirty or alkaline face cannot lock molecules.",
    tests: ["climascan", "surfiq", "phield"],
    notes: [
      "ClimaScan™ — cool, dry workface before the cleaner.",
      "SurfIQ™ — residue-free confirmation after the wipe.",
      "pHield™ — neutralisation. The coating’s NanoBond™ comes next.",
    ],
  },
  {
    productId: "ab-fabric",
    mark: "N7-FABRIC",
    name: "FibreGuard Antibacterial Bond",
    science:
      "The molecules lock to the fibre. NANODATA Collection™ reads absorbency first — then NanoBond™ proves the treatment is in the weave, not sitting as a spray that washes out.",
    tests: ["climascan", "surfiq", "nanobond"],
    notes: [
      "SurfIQ™ — weave and absorbency set coverage. Upholstery is not glass.",
      "ClimaScan™ — tropical humidity is logged before return to service.",
      "NanoBond™ — fibre lock. The antibacterial field test is the APHC hold-point.",
    ],
  },
  {
    productId: "am-mould",
    mark: "N7-MOULD",
    name: "MouldLock Microbiostatic Bond",
    science:
      "Darwin wet-season interiors. The film stays on grout, wet-area stone and tropical faces so mould cannot colonise. Humidity is a measured window — not a guess.",
    tests: ["climascan", "phield", "nanobond", "solarstrest"],
    notes: [
      "ClimaScan™ — humidity is the gate. The face is dry when the atelier applies.",
      "pHield™ — residual cleaner or alkali will fight the bond.",
      "NanoBond™ — molecular lock on the wet-area substrate.",
      "SolarStress™ — heat and exposure on bathrooms, plant rooms and exteriors.",
      "APHC field antimicrobial test is the hold-point. This is not the hard-surface pathway.",
    ],
  },
  {
    productId: "chrome",
    mark: "N7-CHROME",
    name: "Chrome Film Bond",
    science:
      "A light film on polished chrome — not plating, not wax. The molecules lock to the metal. Water beads because the bond is there, not because a polish is sitting on top.",
    tests: ["climascan", "surfiq", "phield", "nanobond", "solarstrest"],
    notes: [
      "Applied by the atelier. Method is not published to the client.",
      "SurfIQ™ — confirms non-absorbent chrome. If it drinks, this is the wrong system.",
      "ClimaScan™ — the climate window is logged before the film is specified.",
      "pHield™ — polish oils, salt and fingerprints are gone before the bond.",
      "NanoBond™ — light-film molecular lock. No haze, no peel.",
      "SolarStress™ — Darwin UV, heat and marine salt on architectural chrome.",
    ],
  },
];

export function assuranceFor(productId: string) {
  return ASSURANCES.find((a) => a.productId === productId);
}

export function productMethod(p: (typeof PRODUCTS)[number]) {
  return "method" in p ? p.method : undefined;
}

export const NANODATA_SCIENCE =
  "Before Approve is signed, the workface walks NANODATA Collection™ — a series of substrate tests that scientifically assure the specified molecules have bonded to the substrate. ClimaScan™ confirms environmental equilibrium. SurfIQ™ reads porosity so the chemistry can enter capillaries or sit as a specified light coat. pHield™ confirms the face is chemically ready. NanoBond™ is the molecular audit: proof the coating has locked to the substrate, not merely dried on top. SolarStress™ logs UV, heat and exposure so the bond is written for Darwin conditions. Five instruments. One science. It lives inside NANO7™ at Verify. Never merged with the Asset Assurance Policy.";

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
