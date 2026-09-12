/**
 * Cache contract for the maison.
 *
 * Layer                 Strategy
 * ─────────────────────────────────────────────────────────────
 * Hashed Vite JS/CSS    Content-hash filenames. Immutable. Never bust.
 * HTML document         no-store. Always revalidate the shell.
 * /brand/*  /chrome/*   Same filename, query fingerprint. Bump ASSET_REV
 *                       whenever a crest, lockup, N7 seal or chrome orb is
 *                       replaced. That is what was keeping old logos after
 *                       a refresh — the URL never changed.
 * /media/* films        Long-lived. Only fingerprint when a film is replaced.
 * React Query (Altier)  Short staleTime + refetch on focus so desks do not
 *                       show yesterday’s counts after a tab switch.
 * Service worker        None of ours. Do not register one.
 *
 * Bump this string when you drop new brand art.
 */
export const ASSET_REV = "20260912pack";

export function rev(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  return `${src}${src.includes("?") ? "&" : "?"}v=${ASSET_REV}`;
}
