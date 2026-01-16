// ATF Brand Colors
export const brandColors = {
  green: "#51b847",
  yellow: "#fcba2f",
  red: "#ee4035",
  dark: "#231f20",
} as const;

export type Version = "A" | "B" | "C" | "D";
export type AccentColor = "green" | "yellow" | "red" | "custom";

export interface ThemeDefinition {
  name: string;
  description: string;
  background: string;
  backgroundSecondary: string;
  foreground: string;
  foregroundMuted: string;
  card: string;
  cardForeground: string;
  border: string;
  accent: string;
  accentForeground: string;
  heroStyle: "patterns" | "gradient" | "photo" | "organic";
  animationLevel: "expressive" | "moderate" | "subtle";
  fontHeading: string;
  fontBody: string;
}

export const themes: Record<Version, ThemeDefinition> = {
  A: {
    name: "Pan-African",
    description: "Vibrant colors, geometric African patterns, bold typography",
    background: "#ffffff",
    backgroundSecondary: "#f8f9fa",
    foreground: "#231f20",
    foregroundMuted: "#6b7280",
    card: "#ffffff",
    cardForeground: "#231f20",
    border: "#e5e7eb",
    accent: brandColors.green,
    accentForeground: "#ffffff",
    heroStyle: "patterns",
    animationLevel: "expressive",
    fontHeading: "'Poppins', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  B: {
    name: "Tech-Forward",
    description: "Dark mode, cyan/purple gradients, sleek sans-serif",
    background: "#0a0a0f",
    backgroundSecondary: "#111118",
    foreground: "#f0f0f5",
    foregroundMuted: "#9ca3af",
    card: "#16161d",
    cardForeground: "#f0f0f5",
    border: "#2d2d3a",
    accent: "#06b6d4",
    accentForeground: "#000000",
    heroStyle: "gradient",
    animationLevel: "moderate",
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  C: {
    name: "Institutional",
    description: "Light, muted greens, professional serif accents, clean whitespace",
    background: "#fafafa",
    backgroundSecondary: "#f3f4f6",
    foreground: "#1f2937",
    foregroundMuted: "#6b7280",
    card: "#ffffff",
    cardForeground: "#1f2937",
    border: "#d1d5db",
    accent: "#3d8b40",
    accentForeground: "#ffffff",
    heroStyle: "photo",
    animationLevel: "subtle",
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Source Sans 3', sans-serif",
  },
  D: {
    name: "Warm",
    description: "Earthy browns/terracotta with green accents, organic rounded shapes",
    background: "#fdf8f3",
    backgroundSecondary: "#faf3eb",
    foreground: "#3d2914",
    foregroundMuted: "#8b7355",
    card: "#ffffff",
    cardForeground: "#3d2914",
    border: "#e5d5c3",
    accent: "#c4704f",
    accentForeground: "#ffffff",
    heroStyle: "organic",
    animationLevel: "moderate",
    fontHeading: "'DM Serif Display', serif",
    fontBody: "'Nunito', sans-serif",
  },
};

export const accentPresets: Record<AccentColor, string> = {
  green: brandColors.green,
  yellow: brandColors.yellow,
  red: brandColors.red,
  custom: brandColors.green,
};

export function getThemeStyles(version: Version, accentOverride?: string): Record<string, string> {
  const theme = themes[version];
  const accent = accentOverride || theme.accent;

  return {
    "--theme-background": theme.background,
    "--theme-background-secondary": theme.backgroundSecondary,
    "--theme-foreground": theme.foreground,
    "--theme-foreground-muted": theme.foregroundMuted,
    "--theme-card": theme.card,
    "--theme-card-foreground": theme.cardForeground,
    "--theme-border": theme.border,
    "--theme-accent": accent,
    "--theme-accent-foreground": theme.accentForeground,
    "--theme-font-heading": theme.fontHeading,
    "--theme-font-body": theme.fontBody,
  };
}
