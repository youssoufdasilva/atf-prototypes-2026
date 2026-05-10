import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/claude-design/components/sections/HomePage";

export const Route = createFileRoute("/claude-design/")({
  staticData: { headerTheme: "dark" },
  component: HomePage,
});
