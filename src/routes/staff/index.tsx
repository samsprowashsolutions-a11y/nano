import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/staff/")({
  component: function StaffHome() {
    return <Navigate to="/staff/command" />;
  },
});
