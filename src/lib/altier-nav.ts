/** Categorised Altier selection — pack-sheet order, then the job walk. */

export type NavItem = { to: string; label: string; n: string };

export type NavCat = {
  id: string;
  n: string;
  title: string;
  items: NavItem[];
};

export const NAV_CATS: NavCat[] = [
  {
    id: "site",
    n: "01",
    title: "On the job",
    items: [
      { to: "/staff/crew", n: "01", label: "Crew walk" },
      { to: "/staff/gps", n: "02", label: "Sign on · GPS" },
      { to: "/staff/jobs", n: "03", label: "Today’s job" },
      { to: "/staff/whs", n: "04", label: "Pre-start" },
      { to: "/staff/protocol", n: "05", label: "SWMS" },
      { to: "/staff/gates", n: "06", label: "NANO7 gates" },
      { to: "/staff/operations", n: "07", label: "NANODATA" },
      { to: "/staff/report", n: "08", label: "Daily report" },
    ],
  },
  {
    id: "sources",
    n: "02",
    title: "Sources & approvals",
    items: [
      { to: "/staff/products", n: "01", label: "Chemistry" },
      { to: "/staff/compliance", n: "02", label: "TDS / SDS" },
      { to: "/staff/verify", n: "03", label: "Verify IDs" },
      { to: "/staff/warranty", n: "04", label: "Warranty" },
    ],
  },
  {
    id: "command",
    n: "03",
    title: "Command",
    items: [
      { to: "/staff/command", n: "00", label: "Decision desk" },
      { to: "/staff/platform", n: "01", label: "Master index" },
      { to: "/staff/inbox", n: "02", label: "Analysis" },
      { to: "/staff/alerts", n: "03", label: "HOLD register" },
      { to: "/staff/bulletin", n: "04", label: "Bulletin" },
    ],
  },
  {
    id: "records",
    n: "04",
    title: "Registers & vault",
    items: [
      { to: "/staff/vault", n: "01", label: "Sam’s Safe" },
      { to: "/staff/documents", n: "02", label: "Document packs" },
      { to: "/staff/clients", n: "03", label: "Client files" },
      { to: "/staff/qr", n: "04", label: "QR & print" },
    ],
  },
  {
    id: "house",
    n: "05",
    title: "House",
    items: [
      { to: "/staff/workforce", n: "01", label: "Workforce" },
      { to: "/staff/payroll", n: "02", label: "Payroll" },
      { to: "/staff/analytics", n: "03", label: "Analytics" },
      { to: "/staff/admin", n: "04", label: "Roles" },
      { to: "/staff/connections", n: "05", label: "Connections" },
      { to: "/staff/console", n: "06", label: "Console" },
      { to: "/staff/prompt", n: "07", label: "Master prompt" },
    ],
  },
];
