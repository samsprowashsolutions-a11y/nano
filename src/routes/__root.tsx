import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { QueryProvider } from "@/components/query-provider";
import { BRAND } from "@/lib/content";
import appCss from "../styles.css?url";

const APP_NAME = "NanoAssure™ · Asset Protection";

export const Route = createRootRoute({
  headers: () => ({
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
  }),
  notFoundComponent: () => (
    <main className="carbon-field grid min-h-dvh place-items-center px-6 text-center text-fg">
      <div>
        <p className="kicker mb-3">Not found</p>
        <h1 className="gold-text font-display text-4xl">This page is not in the maison</h1>
        <p className="mt-3 text-muted">The link is missing or has moved.</p>
        <Link to="/" className="mt-6 inline-block text-gold-hi underline">
          Return home
        </Link>
      </div>
    </main>
  ),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "SP NanoAssure™ — advanced nano-coating and asset protection with measurable Five-Step QA. Exclusive analysis pathway. Darwin, Northern Territory.",
      },
      { name: "theme-color", content: "#050508" },
      { property: "og:url", content: BRAND.origin },
      { property: "og:site_name", content: "NanoAssure™" },
    ],
    links: [
      { rel: "canonical", href: BRAND.origin },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en-AU" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-carbon text-fg">
        <PreviewHostBridge />
        <QueryProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </QueryProvider>
        <Scripts />
      </body>
    </html>
  ),
});
