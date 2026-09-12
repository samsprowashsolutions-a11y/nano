import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/altier")({
  component: function AltierGate() {
    return <Navigate to="/staff" />;
  },
  head: () => ({
    meta: [{ title: "Altier · Sam's Prowash Solutions" }],
  }),
});
