import { createFileRoute } from "@tanstack/react-router";
import { ChooserPage } from "@/components/ChooserPage";

export const Route = createFileRoute("/")({
  component: ChooserPage,
});
