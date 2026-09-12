/** Job-site walk. Step 1 in the sun → last stage on the clock.
 *  Plain words for contractors. Luxury chrome stays on the shell.
 */

export type CrewStepId =
  | "signon"
  | "job"
  | "prestart"
  | "inspect"
  | "prepare"
  | "apply"
  | "verify"
  | "record"
  | "approve"
  | "handover"
  | "report"
  | "signoff";

export type CrewStep = {
  n: string;
  id: CrewStepId;
  title: string;
  do: string;
  ask: string;
  hint: string;
  to: string;
  qaKey?: "apa" | "rpt" | "dat" | "hlt" | "crt" | "dep" | "nia";
  photo?: boolean;
};

export const CREW_STEPS: CrewStep[] = [
  {
    n: "01",
    id: "signon",
    title: "Sign on",
    do: "Start the clock. GPS logs you until you sign off.",
    ask: "Say your name. Then tap Sign on.",
    hint: "Office fence or field. Clock starts when you tap.",
    to: "/staff/gps",
  },
  {
    n: "02",
    id: "job",
    title: "Today’s job",
    do: "Which site. Which client. What we are coating.",
    ask: "Say the site name, the client, and the surface.",
    hint: "If this stays orange, the job is not open yet.",
    to: "/staff/jobs",
  },
  {
    n: "03",
    id: "prestart",
    title: "Pre-start",
    do: "PPE on. Hazards said. Safe to start.",
    ask: "Say yes if PPE is on, hazards are clear, and you are safe to start.",
    hint: "SWMS ticks for THIS site. Not the master template.",
    to: "/staff/whs",
  },
  {
    n: "04",
    id: "inspect",
    title: "Inspect",
    do: "Look. Photo. Say what you see.",
    ask: "Look at the surface. Take a photo. Say what you see.",
    hint: "Nothing is quoted until this is done.",
    to: "/staff/gates",
    qaKey: "apa",
    photo: true,
  },
  {
    n: "05",
    id: "prepare",
    title: "Prepare",
    do: "Clean. Dry. Ready.",
    ask: "Is the surface ready? Say ready, or say what is still wet or dirty.",
    hint: "We do not coat a wet or dirty face.",
    to: "/staff/gates",
    qaKey: "rpt",
    photo: true,
  },
  {
    n: "06",
    id: "apply",
    title: "Apply",
    do: "We coat it. You do not.",
    ask: "Say the product name and the batch if you have it.",
    hint: "The atelier applies. The client never does.",
    to: "/staff/products",
    qaKey: "dat",
  },
  {
    n: "07",
    id: "verify",
    title: "Verify",
    do: "Five NANODATA checks. Pass or HOLD.",
    ask: "I will name five checks. After each one, say pass or hold.",
    hint: "Field evidence only. Not a certificate.",
    to: "/staff/gates",
    qaKey: "hlt",
  },
  {
    n: "08",
    id: "record",
    title: "Record",
    do: "After photos. Notes. If it is not written, it was not done.",
    ask: "Take after photos. Say anything we should write down.",
    hint: "Goes to the client file and Sam’s Safe.",
    to: "/staff/vault",
    qaKey: "crt",
    photo: true,
  },
  {
    n: "09",
    id: "approve",
    title: "Approve",
    do: "Supervisor or director. Not the same person who coated.",
    ask: "Say approve, or say hold and why.",
    hint: "Certificate only after Verify and Record pass.",
    to: "/staff/gates",
    qaKey: "dep",
  },
  {
    n: "10",
    id: "handover",
    title: "Handover",
    do: "Client sign. Job closed.",
    ask: "Has the client signed? Say yes, or not yet.",
    hint: "No handover print until OPPS ALL CLEAR.",
    to: "/staff/warranty",
    qaKey: "nia",
  },
  {
    n: "11",
    id: "report",
    title: "Daily report",
    do: "What got done. Any stop. Any emergency. Goes to Sam.",
    ask: "Tell me what got done today, any stops, any emergencies.",
    hint: "Sam reads this. Keep it short.",
    to: "/staff/report",
  },
  {
    n: "12",
    id: "signoff",
    title: "Sign off",
    do: "Stop the clock. GPS stops here.",
    ask: "Tap Sign off when you leave the site.",
    hint: "No tracking after this tap.",
    to: "/staff/gps",
  },
];

export const VERIFY_ASKS = [
  "ClimaScan. Temperature and humidity. Say pass or hold.",
  "SurfIQ. How the surface drinks water. Say pass or hold.",
  "pHield. Chemical readiness. Say pass or hold.",
  "NanoBond. Did it lock. Say pass or hold.",
  "SolarStress. Sun and heat. Say pass or hold.",
] as const;

export type NeedItem = {
  id: string;
  label: string;
  do: string;
  to: string;
};

export function commandNeeds(input: {
  jobs: number;
  vault: number;
  ops: number;
  leads: number;
  openHolds: number;
  pendingReview: number;
  gpsLive: boolean;
}): NeedItem[] {
  const out: NeedItem[] = [];
  if (!input.gpsLive) {
    out.push({ id: "signon", label: "Sign on", do: "Start the clock before work.", to: "/staff/crew" });
  }
  if (input.jobs < 1) {
    out.push({ id: "job", label: "Today’s job", do: "Open the site. Name the client.", to: "/staff/crew" });
  }
  if (input.openHolds > 0) {
    out.push({
      id: "hold",
      label: `${input.openHolds} on HOLD`,
      do: "Stop. Clear HOLD before the next gate.",
      to: "/staff/gates",
    });
  }
  if (input.pendingReview > 0) {
    out.push({
      id: "nano",
      label: "NANODATA waiting",
      do: "Review field evidence. Not a certificate yet.",
      to: "/staff/gates",
    });
  }
  if (input.leads > 0) {
    out.push({
      id: "inbox",
      label: "Analysis waiting",
      do: "Express interest is in. Answer it.",
      to: "/staff/inbox",
    });
  }
  if (input.ops < 1) {
    out.push({ id: "report", label: "Daily report", do: "Tell Sam what got done.", to: "/staff/crew" });
  }
  if (input.vault < 1) {
    out.push({ id: "vault", label: "Sam’s Safe", do: "File the first record.", to: "/staff/vault" });
  }
  return out;
}
