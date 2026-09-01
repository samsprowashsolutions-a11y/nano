import type { ReactNode } from "react";
import { ChromePlate } from "@/components/chrome-shield";
import type { ChromeTone } from "@/lib/content";

export function DeskHeader({
  kicker,
  title,
  script,
  copy,
}: {
  kicker: string;
  title: string;
  script?: string;
  copy?: string;
}) {
  return (
    <header className="mb-6">
      <p className="kicker">{kicker}</p>
      <h1 className="gold-text font-display text-3xl md:text-4xl">{title}</h1>
      {script ? <p className="font-script text-2xl text-gold">{script}</p> : null}
      {copy ? <p className="mt-2 max-w-2xl text-lg text-muted">{copy}</p> : null}
    </header>
  );
}

export function DeskCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <ChromePlate className={className}>
      <div className="p-5 md:p-7">{children}</div>
    </ChromePlate>
  );
}

export const FOLDERS: { id: "tax" | "bas" | "super" | "finance" | "receipt"; title: string; tone: ChromeTone; copy: string }[] = [
  { id: "tax", title: "Tax", tone: "gold", copy: "Returns, notices, director working papers." },
  { id: "bas", title: "BAS", tone: "teal", copy: "Business activity statements and GST packs." },
  { id: "super", title: "Super", tone: "purple", copy: "Superannuation contributions and clearances." },
  { id: "finance", title: "Finance · Xero", tone: "pearl", copy: "Xero exports, bank recs, ledgers." },
  { id: "receipt", title: "Receipts", tone: "carbon", copy: "Scanned dockets into the tax vault." },
];

export async function fileToDataUrl(file: File, max = 1200): Promise<{ name: string; data: string }> {
  if (file.size > 1_400_000 && !file.type.startsWith("image/")) {
    throw new Error("File is too large. Keep uploads under 1.4 MB.");
  }
  if (!file.type.startsWith("image/")) {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = "";
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return { name: file.name, data: `data:${file.type};base64,${btoa(binary)}` };
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return { name: file.name, data: URL.createObjectURL(file) };
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return { name: file.name, data: canvas.toDataURL("image/jpeg", 0.72) };
}
