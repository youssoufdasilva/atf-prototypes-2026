import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ClaudeDesignThemeProvider,
  useClaudeDesignTheme,
} from "./ThemeContext";

function ThemeDisplay() {
  const { version, theme } = useClaudeDesignTheme();
  return (
    <div>
      <span data-testid="version">{version}</span>
      <span data-testid="brand">{theme.brand}</span>
    </div>
  );
}

describe("ClaudeDesignThemeContext", () => {
  it("defaults to Preset A when no version param is provided", () => {
    render(
      <ClaudeDesignThemeProvider version={undefined}>
        <ThemeDisplay />
      </ClaudeDesignThemeProvider>
    );

    expect(screen.getByTestId("version")).toHaveTextContent("A");
    expect(screen.getByTestId("brand")).toHaveTextContent("#F90036");
  });

  it("defaults to Preset A for invalid version values", () => {
    render(
      <ClaudeDesignThemeProvider version="Z">
        <ThemeDisplay />
      </ClaudeDesignThemeProvider>
    );

    expect(screen.getByTestId("version")).toHaveTextContent("A");
  });

  it("exposes the full Preset A theme config", () => {
    let captured: ReturnType<typeof useClaudeDesignTheme> | null = null;

    function Capture() {
      captured = useClaudeDesignTheme();
      return null;
    }

    render(
      <ClaudeDesignThemeProvider version="A">
        <Capture />
      </ClaudeDesignThemeProvider>
    );

    expect(captured!.theme).toEqual({
      brand: "#F90036",
      brandDark: "#C0002A",
      background: "#FFFFFF",
      backgroundSubtle: "#FAFAFA",
      foreground: "#171717",
      foregroundMuted: "#737373",
      fontDisplay: "Montserrat",
      fontBody: "DM Sans",
      fontAccent: "Clesmont",
      headingWeight: 900,
      sectionPaddingY: "80px",
    });
  });

  it("sets CSS custom properties on the document root", () => {
    render(
      <ClaudeDesignThemeProvider version="A">
        <ThemeDisplay />
      </ClaudeDesignThemeProvider>
    );

    const root = document.documentElement;

    // Handoff design tokens
    expect(root.style.getPropertyValue("--color-brand")).toBe("#F90036");
    expect(root.style.getPropertyValue("--color-red-700")).toBe("#C0002A");
    expect(root.style.getPropertyValue("--color-bg")).toBe("#FFFFFF");
    expect(root.style.getPropertyValue("--color-bg-subtle")).toBe("#FAFAFA");
    expect(root.style.getPropertyValue("--color-fg1")).toBe("#171717");
    expect(root.style.getPropertyValue("--color-fg3")).toBe("#737373");
    expect(root.style.getPropertyValue("--font-display")).toBe("'Montserrat', sans-serif");
    expect(root.style.getPropertyValue("--font-body")).toBe("'DM Sans', sans-serif");
    expect(root.style.getPropertyValue("--font-accent")).toBe("'Clesmont', 'Montserrat', sans-serif");

    // Legacy shared UI contract (11 properties)
    expect(root.style.getPropertyValue("--theme-background")).toBe("#FFFFFF");
    expect(root.style.getPropertyValue("--theme-background-secondary")).toBe("#FAFAFA");
    expect(root.style.getPropertyValue("--theme-foreground")).toBe("#171717");
    expect(root.style.getPropertyValue("--theme-foreground-muted")).toBe("#737373");
    expect(root.style.getPropertyValue("--theme-accent")).toBe("#F90036");
    expect(root.style.getPropertyValue("--theme-font-heading")).toBe("'Montserrat', sans-serif");
    expect(root.style.getPropertyValue("--theme-font-body")).toBe("'DM Sans', sans-serif");
  });
});
