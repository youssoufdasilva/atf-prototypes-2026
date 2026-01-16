import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { PrototypeSwitcher } from "@/components/switcher/PrototypeSwitcher";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import type { Version } from "@/lib/themes";

// Search params type for the root route
export type RootSearchParams = {
  version?: Version;
};

export const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): RootSearchParams => {
    const version = search.version as string | undefined;
    const validVersions = ["A", "B", "C", "D"];
    return {
      version: validVersions.includes(version || "")
        ? (version as Version)
        : undefined,
    };
  },
  component: () => (
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
        <TanStackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </FeedbackProvider>
    </ThemeProvider>
  ),
});
