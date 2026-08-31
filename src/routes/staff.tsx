import { createFileRoute } from "@tanstack/react-router";
import { StaffShell } from "@/components/staff/shell";

export const Route = createFileRoute("/staff")({
  component: StaffShell,
});
