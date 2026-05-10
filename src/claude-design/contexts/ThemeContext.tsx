import {
  createContext,
  useContext,
  useLayoutEffect,
  type ReactNode,
} from "react";
import {
  type ClaudeDesignVersion,
  type ClaudeDesignTheme,
  claudeDesignThemes,
  resolveVersion,
} from "@/claude-design/lib/themes";

interface ClaudeDesignThemeContextValue {
  version: ClaudeDesignVersion;
  theme: ClaudeDesignTheme;
}

const ThemeContext = createContext<ClaudeDesignThemeContextValue | undefined>(
  undefined
);

function applyThemeVariables(theme: ClaudeDesignTheme) {
  const root = document.documentElement;
  const fontDisplay = `'${theme.fontDisplay}', sans-serif`;
  const fontBody = `'${theme.fontBody}', sans-serif`;
  const fontAccent = `'${theme.fontAccent}', '${theme.fontDisplay}', sans-serif`;

  const vars: Record<string, string> = {
    // Handoff design tokens
    "--color-brand": theme.brand,
    "--color-red-700": theme.brandDark,
    "--color-bg": theme.background,
    "--color-bg-subtle": theme.backgroundSubtle,
    "--color-fg1": theme.foreground,
    "--color-fg3": theme.foregroundMuted,
    "--font-display": fontDisplay,
    "--font-body": fontBody,
    "--font-accent": fontAccent,

    // Legacy shared UI contract
    "--theme-background": theme.background,
    "--theme-background-secondary": theme.backgroundSubtle,
    "--theme-foreground": theme.foreground,
    "--theme-foreground-muted": theme.foregroundMuted,
    "--theme-card": theme.background,
    "--theme-card-foreground": theme.foreground,
    "--theme-border": "#E5E5E5",
    "--theme-accent": theme.brand,
    "--theme-accent-foreground": "#FFFFFF",
    "--theme-font-heading": fontDisplay,
    "--theme-font-body": fontBody,
  };

  for (const [prop, value] of Object.entries(vars)) {
    root.style.setProperty(prop, value);
  }
}

interface Props {
  version: string | undefined;
  children: ReactNode;
}

export function ClaudeDesignThemeProvider({ version: raw, children }: Props) {
  const version = resolveVersion(raw);
  const theme = claudeDesignThemes[version];

  useLayoutEffect(() => {
    applyThemeVariables(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ version, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useClaudeDesignTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useClaudeDesignTheme must be used within a ClaudeDesignThemeProvider"
    );
  }
  return ctx;
}
