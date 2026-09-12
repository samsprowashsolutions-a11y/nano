import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ChromePlate } from "@/components/chrome-shield";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "Altier · Sam's Prowash Solutions" }],
  }),
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="sam-desk grid min-h-dvh place-items-center">
        <div className="h-20 w-48 animate-pulse rounded-xl bg-gold/15" />
      </div>
    );
  }
  if (user) return <Navigate to="/staff/command" />;

  return (
    <div className="sam-desk grid min-h-dvh place-items-center px-5 py-12">
      <ChromePlate className="w-full max-w-md">
        <div className="p-8 text-center">
          <img src="/brand/sp-shield-pack.png" alt="Sam's Prowash Solutions" className="mx-auto mb-3 h-24 w-auto" />
          <img src="/brand/sp-wordmark-script.png" alt="Sam's Prowash Solutions" className="mx-auto mb-5 h-16 w-auto max-w-[16rem]" />
          <p className="kicker">By invitation · Altier only</p>
          <h1 className="mt-4 font-display text-3xl leading-none text-[#0c1f4a]">Private Altier Access</h1>
          <p className="mt-4 text-lg leading-relaxed text-[#122038]">
            Command, Sam’s Safe, payroll and the desks. Not a public account.
            Invited identities only — Google or X.
          </p>
          {!authEnabled ? (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          ) : (
            <div className="mt-6 space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  className="w-full"
                  onClick={() =>
                    signIn(p.providerId, {
                      callbackURL: "/staff/command",
                      errorCallbackURL: "/login",
                    })
                  }
                >
                  Continue with {p.label}
                </Button>
              ))}
            </div>
          )}
          <p className="mt-8 text-sm text-faint">
            <Link to="/" className="hover:text-gold-hi">
              Return to the maison
            </Link>
          </p>
        </div>
      </ChromePlate>
    </div>
  );
}
