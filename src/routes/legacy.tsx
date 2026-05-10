import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { PrototypeSwitcher } from "@/components/switcher/PrototypeSwitcher";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

import type { Version } from "@/lib/themes";

type LegacySearchParams = {
  version?: Version;
};

export const Route = createFileRoute("/legacy")({
  validateSearch: (search: Record<string, unknown>): LegacySearchParams => {
    const version = search.version as string | undefined;
    return {
      version: version || undefined,
    };
  },
  component: LegacyLayout,
});

function LegacyLayout() {
  return (
    <ThemeProvider>
      <FeedbackProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <PrototypeSwitcher />
      </FeedbackProvider>
    </ThemeProvider>
  );
}
