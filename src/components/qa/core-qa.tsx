import { NanoDataMark } from "@/components/qa/nanodata-mark";
import { NanoDataBand } from "@/components/qa/qa7";
import type { NanoDataKey } from "@/lib/content";

export function CoreQaIcon({ kind, className }: { kind: NanoDataKey; className?: string }) {
  return <NanoDataMark kind={kind} className={className} />;
}

export function NanoDataInteractive(_props: { graphic?: boolean; cta?: boolean }) {
  return <NanoDataBand />;
}
