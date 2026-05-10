import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ClaudeDesignThemeProvider } from "@/claude-design/contexts/ThemeContext";
import { Navbar } from "@/claude-design/components/layout/Navbar";
import { Footer } from "@/claude-design/components/layout/Footer";
import { FloatingPill } from "@/claude-design/components/switcher/FloatingPill";
import "@/claude-design/fonts.css";

import type { ClaudeDesignVersion } from "@/claude-design/lib/themes";

type ClaudeDesignSearchParams = {
  version?: ClaudeDesignVersion;
};

export const Route = createFileRoute("/claude-design")({
  validateSearch: (search: Record<string, unknown>): ClaudeDesignSearchParams => {
    const raw = search.version as string | undefined;
    const valid: ClaudeDesignVersion[] = ["A", "B"];
    const version = raw && valid.includes(raw as ClaudeDesignVersion)
      ? (raw as ClaudeDesignVersion)
      : undefined;
    return { version };
  },
  component: ClaudeDesignLayout,
});

function ClaudeDesignLayout() {
  const { version } = Route.useSearch();

  return (
    <ClaudeDesignThemeProvider version={version}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingPill />
    </ClaudeDesignThemeProvider>
  );
}
