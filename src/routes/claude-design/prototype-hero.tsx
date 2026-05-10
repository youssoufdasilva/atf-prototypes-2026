import { createFileRoute } from "@tanstack/react-router";
import { PrototypeHeroPage } from "@/claude-design/components/sections/prototype-hero/PrototypeHeroPage";

export const Route = createFileRoute("/claude-design/prototype-hero")({
  staticData: { headerTheme: "dark" },
  component: PrototypeHeroPage,
});
