import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ChromePlate } from "@/components/chrome-shield";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [err, setErr] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const name = String(fd.get("name") || "Crew");
    setBusy(true);
    setErr("");
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message);
      }
      window.location.href = "/staff";
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="carbon-field grid min-h-dvh place-items-center px-5 py-12">
      <ChromePlate className="w-full max-w-md">
        <div className="p-8 text-center">
          <img src="/brand/sp-lockup.png" alt="Sam's Prowash Solutions" className="mx-auto mb-4 w-64" />
          <p className="kicker text-muted">By invitation · Altier</p>
          <h1 className="gold-text mt-1 font-display text-3xl">Private Altier Access</h1>
          <p className="font-script mt-1 text-2xl text-gold">Altier gate</p>
          {!authEnabled ? (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          ) : (
            <>
              <div className="mt-6 space-y-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    type="button"
                    variant="chrome"
                    className="w-full"
                    onClick={() => signIn(p.providerId, { callbackURL: "/staff" })}
                  >
                    Continue with {p.label}
                  </Button>
                ))}
              </div>
              <hr className="chrome-rule my-6" />
              <form onSubmit={onEmail} className="space-y-3 text-left">
                {mode === "up" ? (
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                ) : null}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required minLength={8} />
                </div>
                {err ? <p className="text-sm text-bad">{err}</p> : null}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Please wait…" : mode === "up" ? "Create crew account" : "Enter Altier"}
                </Button>
              </form>
              <button
                type="button"
                className="mt-4 text-xs text-muted hover:text-aqua"
                onClick={() => setMode((m) => (m === "in" ? "up" : "in"))}
              >
                {mode === "in" ? "New crew? Create an account" : "Already gated? Sign in"}
              </button>
            </>
          )}
          <Link to="/" className="mt-6 block text-xs uppercase tracking-widest text-muted hover:text-gold">
            ← Public maison
          </Link>
        </div>
      </ChromePlate>
    </div>
  );
}
