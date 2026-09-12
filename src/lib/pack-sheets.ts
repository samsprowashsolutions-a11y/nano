/** Working data from the vault-controlled briefing sheets.
 *  Opportunity rows are templates and HOLD items — not claimed completed jobs.
 */

export const PACK_INDEX = [
  { n: "01", title: "Executive Introduction", copy: "Who we are, GO / AMEND / HOLD, value pillars." },
  { n: "02", title: "NANODATA", copy: "Application evidence, field records and traceability." },
  { n: "03", title: "Decision Dashboard", copy: "GO / AMEND / HOLD and required direction." },
  { n: "04", title: "Market Analysis Program", copy: "Paid $1,000 market-validation pathway." },
  { n: "05", title: "Automotive showroom glass", copy: "Showroom-glass opportunity and release blockers." },
  { n: "06", title: "Marine one-vessel", copy: "Controlled one-vessel pilot and technical boundaries." },
  { n: "07", title: "Commercial Model", copy: "Budget, unit economics and 10 / 20 / 30 / 40-site scenarios." },
  { n: "08", title: "Operations & Registers", copy: "Sam / Kate controls, application register and surveys." },
  { n: "09", title: "Technical Approval Matrix", copy: "TDS / SDS / product / substrate / claim gates." },
  { n: "10", title: "Sources & Approvals", copy: "Manufacturer guidance, working evidence and sign-off chain." },
] as const;

export const CLARIFY_NEEDS = [
  { title: "Product-to-substrate match", copy: "Confirm the right product for each surface type." },
  { title: "Coverage rate and litre-per-m²", copy: "Validate rates and expected coverage." },
  { title: "Cure window and environment", copy: "Confirm cure times and temperature / humidity ranges." },
  { title: "Internal / external suitability", copy: "Confirm intended use and location limits." },
  { title: "Warranty / claim wording", copy: "Define what can and cannot be claimed." },
  { title: "Maintenance and aftercare", copy: "Cleaning, inspection and ongoing care needs." },
] as const;

export const OPPORTUNITY_ROWS = [
  {
    name: "Market Analysis",
    need: "Final approved entry package. Selected products and pricing range.",
    status: "amend" as const,
    statusLabel: "Information prepared",
    next: "Awaiting Roger / Nanoman confirmation.",
  },
  {
    name: "Automotive glass",
    need: "Site measure, glass counts, internal / external scope.",
    status: "pending" as const,
    statusLabel: "Discovery required",
    next: "Complete site assessment and confirm scope.",
  },
  {
    name: "Marine one-vessel",
    need: "One-vessel pilot scope, substrate confirmation, product limits.",
    status: "amend" as const,
    statusLabel: "Under review",
    next: "Confirm approved pathway.",
  },
  {
    name: "Anti-graffiti",
    need: "Approved substrate wording and removal protocol.",
    status: "pending" as const,
    statusLabel: "Draft in progress",
    next: "Use controlled wording only.",
  },
  {
    name: "Metal applications",
    need: "Corrosion / appearance claims and surface-prep boundaries.",
    status: "hold" as const,
    statusLabel: "Requires further review",
    next: "No blanket claims — define approved wording.",
  },
] as const;

export const HOW_TO_USE = [
  { title: "Clarify before external release", copy: "Resolve all technical points before sharing outside the team." },
  { title: "Use only approved wording", copy: "Use SP NanoAssure approved product, substrate and claim wording." },
  { title: "Cross-check current TDS / SDS", copy: "Ensure information matches the latest TDS and SDS documents." },
  { title: "Update NANODATA and site notes", copy: "Record findings, decisions and site information in NANODATA." },
  { title: "Escalate unresolved items", copy: "Seek guidance on any items that remain unclear or outside approved boundaries." },
] as const;

export const KEY_OUTPUTS = [
  { title: "Approved wording", copy: "Finalised and approved claim and technical wording." },
  { title: "Evidence checklist", copy: "Validated data, test results and supporting documents." },
  { title: "Site discovery actions", copy: "Confirmed site requirements, measurements and next steps." },
  { title: "Hold / release notes", copy: "Clear record of items on hold and approved for release." },
] as const;

export const SOURCE_DOCS = [
  { title: "TDS / SDS register", copy: "Technical and safety data sheets register." },
  { title: "NANODATA field records", copy: "Field performance data and application records." },
  { title: "Site survey notes and photos", copy: "Site assessments, photos and technical survey notes." },
  { title: "Commercial costing sheets", copy: "Project costing, estimates and commercial analysis." },
  { title: "Insurance / SWMS / training", copy: "Insurance, Safe Work Method Statements and training evidence." },
  { title: "Client feedback and follow-up", copy: "Outcomes and ongoing opportunities." },
] as const;

export const APPROVAL_CHAIN = [
  { n: "1", title: "Collect", copy: "Gather current documents and evidence." },
  { n: "2", title: "Verify", copy: "Check product, substrate and site details." },
  { n: "3", title: "Cross-check", copy: "Confirm wording, scope and conditions." },
  { n: "4", title: "Approve", copy: "Roger / Nanoman review and sign-off." },
  { n: "5", title: "Release", copy: "Controlled use in proposals, field work or external materials." },
] as const;

export const WHO_SIGNS = [
  { who: "Sam", copy: "Strategic control and final business direction." },
  { who: "Kate", copy: "Operations coordination and register control." },
  { who: "Field team", copy: "Site evidence and application records." },
  { who: "Roger / Nanoman", copy: "Technical pathway, claims and release approval." },
  { who: "Approved use", copy: "Internal planning, client proposals and controlled rollout only." },
] as const;

export const SOURCE_HIERARCHY = [
  { n: "01", title: "Manufacturer TDS", copy: "Technical Data Sheet" },
  { n: "02", title: "Manufacturer SDS", copy: "Safety Data Sheet" },
  { n: "03", title: "Approved application guidance", copy: "Manufacturer notes and approved use pathways" },
  { n: "04", title: "Site photos and field records", copy: "Visual evidence and on-site observations" },
  { n: "05", title: "Roger review", copy: "Technical and commercial review" },
  { n: "06", title: "Nanoman approval", copy: "Final manufacturer sign-off" },
] as const;

export const CAN_USE_NOW = [
  "Current TDS / SDS",
  "Approved product naming",
  "Internal working evidence",
  "Site discovery notes",
] as const;

export const REMAINS_HOLD = [
  "Unsupported performance claims",
  "Blanket warranty promises",
  "Unapproved case studies",
  "External technical marketing before sign-off",
] as const;

export const HOLD_WHY = [
  "Technical pathway not yet confirmed.",
  "Site conditions or measurements incomplete.",
  "Claim wording exceeds current approval.",
  "Required documents are outdated or missing.",
  "Operational controls or insurance checks are pending.",
] as const;

export const HOLD_REGISTER = [
  { n: "1", item: "Site measurements", notes: "Awaiting site discovery and full scope capture." },
  { n: "2", item: "Glass film / tint check", notes: "Glass composition not yet confirmed." },
  { n: "3", item: "Warranty / claim wording", notes: "External wording requires approval." },
  { n: "4", item: "Marine performance claims", notes: "No unsupported drag or fuel claims." },
  { n: "5", item: "Anti-graffiti cure terms", notes: "Confirm cure window and approved surfaces." },
  { n: "6", item: "Metal application boundaries", notes: "Substrate pathway still needs confirmation." },
] as const;

export const RELEASE_CONDITIONS = [
  "Current TDS / SDS verified.",
  "Approved product pathway confirmed.",
  "Site scope documented.",
  "Training / QA pathway set.",
  "Roger / Nanoman sign-off recorded.",
] as const;

export const CLAIM_OK = [
  "Use conservative wording",
  "Refer to approved substrates only",
  "Describe validation honestly",
  "Use current TDS / SDS references",
] as const;

export const CLAIM_HOLD = [
  "Unverified performance claims",
  "Broad warranty promises",
  "Unsupported corrosion-life statements",
  "Blanket antifouling or fuel claims",
] as const;

export const CONFIRM_EACH_JOB = [
  "Substrate fit",
  "Preparation method",
  "Application conditions",
  "Cure time",
  "Evidence requirements",
] as const;

export const NANODATA_CAPTURES = [
  "Surface type",
  "Location (site, asset ID or GPS)",
  "Pre-condition photos",
  "Product used",
  "Batch / register reference",
  "Application method",
  "Weather / site conditions",
  "Cure window",
  "Immediate results",
  "90-day follow-up observations",
] as const;

export const NANODATA_WHY = [
  { title: "Supports consistency", copy: "Every application follows the same high standard." },
  { title: "Builds case evidence", copy: "Real-world evidence of performance and value." },
  { title: "Improves QA", copy: "Identifies trends and supports training." },
  { title: "Protects brand integrity", copy: "Quality, accountability and professional delivery." },
  { title: "Supports Roger / Nanoman review", copy: "Structured evidence for opportunity progress." },
] as const;

export const COMMERCIAL_LOGIC = [
  { title: "Controlled entry offers create early proof", copy: "Targeted initial opportunities allow measurable results and reference sites." },
  { title: "Larger assessments create upsell potential", copy: "Broader site reviews identify additional substrates and applications." },
  { title: "Repeatable systems improve scalability", copy: "Standardised processes, tools and reporting enable efficient rollout." },
  { title: "Evidence-led growth lowers risk", copy: "Field records and case studies build confidence and support expansion." },
] as const;

export const SCENARIO = [
  { factor: "Market reach", a: "Establish initial presence", b: "Build regional visibility", c: "Grow brand recognition", d: "Strengthen market leadership" },
  { factor: "Field workload", a: "Focused and manageable", b: "Structured and efficient", c: "Well resourced with systems", d: "Scalable with dedicated support" },
  { factor: "Admin load", a: "Light administration", b: "Streamlined processes", c: "Standardised reporting", d: "Efficient and scalable systems" },
  { factor: "Evidence volume", a: "Initial case studies", b: "Growing portfolio", c: "Strong reference base", d: "Extensive evidence library" },
  { factor: "Growth potential", a: "Validate model", b: "Expand into new sectors", c: "Multi-sector opportunities", d: "National rollout potential" },
] as const;

export const COMMERCIAL_PRINCIPLES = [
  { title: "Maintain premium positioning", copy: "Lead with quality, performance and long-term value." },
  { title: "Separate preparation from protection", copy: "Clearly define and price each stage of the solution." },
  { title: "Keep manufacturer approval central", copy: "Use NanoAssure™ approved products, substrates and methods." },
  { title: "Price according to substrate and scope", copy: "Reflect complexity, site conditions and required outcomes." },
  { title: "Protect margins with QA discipline", copy: "Maintain standards, control costs and avoid scope creep." },
] as const;

export const VALUE_PILLARS = [
  { title: "Cleaner environments", copy: "Less waste, better outcomes for people and places." },
  { title: "Proven technology", copy: "Real results backed by data and field performance." },
  { title: "Commercial growth", copy: "Scalable opportunities across multiple markets." },
  { title: "Stronger Australia", copy: "Protecting assets, communities and our future." },
] as const;

export const FUNNEL = [
  { n: "1", title: "Target business", copy: "Identify and engage suitable businesses." },
  { n: "2", title: "Paid package", copy: "Deliver $1,000 entry package." },
  { n: "3", title: "NANODATA evidence", copy: "Collect structured performance feedback." },
  { n: "4", title: "Larger asset assessment", copy: "Qualify for bigger opportunities." },
] as const;

/** Orange HOLDs on the chemistry desk. Not client copy. */
export const CHEMISTRY_HOLDS: Record<string, string[]> = {
  "ag-porous": [
    "Timber still listed on the TDS line — out of scope until confirmed stripped.",
    "Roger / Nanoman stamp not recorded.",
  ],
  "ag-nonporous": [
    "7–10 year life is manufacturer ‘when specified correctly’ — not a blanket SP warranty.",
    "Roger / Nanoman stamp not recorded.",
  ],
  "glass-ceramic": [
    "Glass film / tint composition not yet confirmed on site.",
    "Roger / Nanoman stamp not recorded.",
  ],
  "stone-brick": [
    "Resin engineered stone is out of scope — do not stretch the substrate.",
    "Roger / Nanoman stamp not recorded.",
  ],
  "pre-cleaner": ["Not a coating. Do not sell as protection."],
  antimicrobial: [
    "TDS version on file is thin — confirm current manufacturer sheet.",
    "Public antimicrobial claims stay on HOLD until evidence is current.",
    "Roger / Nanoman stamp not recorded.",
  ],
  "ab-fabric": [
    "TDS version on file is thin — confirm current manufacturer sheet.",
    "Roger / Nanoman stamp not recorded.",
  ],
  "am-mould": [
    "TDS version on file is thin — confirm current manufacturer sheet.",
    "Not the same pathway as hard-surface antimicrobial.",
    "Roger / Nanoman stamp not recorded.",
  ],
  chrome: [
    "Not plating. Not wax. Corrosion-life claims stay on HOLD.",
    "Metal application boundaries need Nanoman confirmation.",
    "Roger / Nanoman stamp not recorded.",
  ],
};
