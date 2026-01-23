// ATF Brand Colors
export const brandColors = {
  green: "#51b847",
  yellow: "#fcba2f",
  red: "#ee4035",
  dark: "#231f20",
} as const;

// Preset versions (A-D) or custom theme IDs (E, F, G, etc.)
export type PresetVersion = "A" | "B" | "C" | "D";
export type Version = PresetVersion | string;
export type AccentColor = "green" | "yellow" | "red" | "custom";

// Composable theme options
export type HeroLayout = "centered" | "split" | "fullWidth";
export type HeroBackground = "patterns" | "gradient" | "photo" | "organic";
export type FooterStyle = "standard" | "minimal" | "expanded" | "dark";
export type GeographicStyle = "cardGrid" | "interactiveMap" | "timeline";
export type LogoVariant = "standard" | "negSpace";

// Font options
export const fontHeadingOptions = {
  poppins: "'Poppins', sans-serif",
  spaceGrotesk: "'Space Grotesk', sans-serif",
  playfair: "'Playfair Display', serif",
  dmSerif: "'DM Serif Display', serif",
} as const;

export const fontBodyOptions = {
  inter: "'Inter', sans-serif",
  sourceSans: "'Source Sans 3', sans-serif",
  nunito: "'Nunito', sans-serif",
} as const;

export type FontHeadingKey = keyof typeof fontHeadingOptions;
export type FontBodyKey = keyof typeof fontBodyOptions;

// Custom theme configuration
export interface CustomThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  isDark: boolean;
  heroLayout: HeroLayout;
  heroBackground: HeroBackground;
  footerStyle: FooterStyle;
  geographicStyle: GeographicStyle;
  logoVariant: LogoVariant;
  fontHeading: FontHeadingKey;
  fontBody: FontBodyKey;
}

// Default values for creating new custom themes
export const defaultCustomTheme: Omit<CustomThemeConfig, "id" | "name"> = {
  primaryColor: brandColors.green,
  accentColor: brandColors.green,
  isDark: false,
  heroLayout: "centered",
  heroBackground: "patterns",
  footerStyle: "standard",
  geographicStyle: "cardGrid",
  logoVariant: "standard",
  fontHeading: "poppins",
  fontBody: "inter",
};

// Mapping from preset versions to their equivalent custom config
export function getPresetAsCustomConfig(version: PresetVersion): Omit<CustomThemeConfig, "id" | "name"> {
  const presetMappings: Record<PresetVersion, Omit<CustomThemeConfig, "id" | "name">> = {
    A: {
      primaryColor: brandColors.green,
      accentColor: brandColors.green,
      isDark: false,
      heroLayout: "centered",
      heroBackground: "patterns",
      footerStyle: "standard",
      geographicStyle: "cardGrid",
      logoVariant: "standard",
      fontHeading: "poppins",
      fontBody: "inter",
    },
    B: {
      primaryColor: "#06b6d4",
      accentColor: "#06b6d4",
      isDark: true,
      heroLayout: "centered",
      heroBackground: "gradient",
      footerStyle: "dark",
      geographicStyle: "interactiveMap",
      logoVariant: "negSpace",
      fontHeading: "spaceGrotesk",
      fontBody: "inter",
    },
    C: {
      primaryColor: "#3d8b40",
      accentColor: "#3d8b40",
      isDark: false,
      heroLayout: "split",
      heroBackground: "photo",
      footerStyle: "standard",
      geographicStyle: "cardGrid",
      logoVariant: "standard",
      fontHeading: "playfair",
      fontBody: "sourceSans",
    },
    D: {
      primaryColor: "#c4704f",
      accentColor: "#c4704f",
      isDark: false,
      heroLayout: "centered",
      heroBackground: "organic",
      footerStyle: "expanded",
      geographicStyle: "cardGrid",
      logoVariant: "standard",
      fontHeading: "dmSerif",
      fontBody: "nunito",
    },
  };
  return presetMappings[version];
}

// Check if version is a preset
export function isPresetVersion(version: Version): version is PresetVersion {
  return ["A", "B", "C", "D"].includes(version);
}

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
  heroStyle: HeroBackground;
  heroLayout: HeroLayout;
  footerStyle: FooterStyle;
  geographicStyle: GeographicStyle;
  logoVariant: LogoVariant;
  animationLevel: "expressive" | "moderate" | "subtle";
  fontHeading: string;
  fontBody: string;
}

export const themes: Record<PresetVersion, ThemeDefinition> = {
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
    heroLayout: "centered",
    footerStyle: "standard",
    geographicStyle: "cardGrid",
    logoVariant: "standard",
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
    heroLayout: "centered",
    footerStyle: "dark",
    geographicStyle: "interactiveMap",
    logoVariant: "negSpace",
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
    heroLayout: "split",
    footerStyle: "standard",
    geographicStyle: "cardGrid",
    logoVariant: "standard",
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
    heroLayout: "centered",
    footerStyle: "expanded",
    geographicStyle: "cardGrid",
    logoVariant: "standard",
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

// Create a ThemeDefinition from a CustomThemeConfig
export function customConfigToThemeDefinition(config: CustomThemeConfig): ThemeDefinition {
  const baseColors = config.isDark
    ? {
        background: "#0a0a0f",
        backgroundSecondary: "#111118",
        foreground: "#f0f0f5",
        foregroundMuted: "#9ca3af",
        card: "#16161d",
        cardForeground: "#f0f0f5",
        border: "#2d2d3a",
        accentForeground: "#000000",
      }
    : {
        background: "#ffffff",
        backgroundSecondary: "#f8f9fa",
        foreground: "#231f20",
        foregroundMuted: "#6b7280",
        card: "#ffffff",
        cardForeground: "#231f20",
        border: "#e5e7eb",
        accentForeground: "#ffffff",
      };

  return {
    name: config.name,
    description: `Custom theme: ${config.name}`,
    ...baseColors,
    accent: config.accentColor,
    heroStyle: config.heroBackground,
    heroLayout: config.heroLayout,
    footerStyle: config.footerStyle,
    geographicStyle: config.geographicStyle,
    logoVariant: config.logoVariant,
    animationLevel: "moderate",
    fontHeading: fontHeadingOptions[config.fontHeading],
    fontBody: fontBodyOptions[config.fontBody],
  };
}

export function getThemeStyles(version: PresetVersion, accentOverride?: string): Record<string, string> {
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

export function getCustomThemeStyles(config: CustomThemeConfig, accentOverride?: string): Record<string, string> {
  const theme = customConfigToThemeDefinition(config);
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
