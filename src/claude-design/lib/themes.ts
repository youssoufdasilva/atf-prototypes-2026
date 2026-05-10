export type ClaudeDesignVersion = "A" | "B";

export interface ClaudeDesignTheme {
  brand: string;
  brandDark: string;
  background: string;
  backgroundSubtle: string;
  foreground: string;
  foregroundMuted: string;
  fontDisplay: string;
  fontBody: string;
  fontAccent: string;
  headingWeight: number;
  sectionPaddingY: string;
}

const presetA: ClaudeDesignTheme = {
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
};

export const claudeDesignThemes: Record<ClaudeDesignVersion, ClaudeDesignTheme> = {
  A: presetA,
  B: presetA, // stub until Preset B ships
};

const validVersions = new Set<string>(["A", "B"]);

export function resolveVersion(raw: string | undefined): ClaudeDesignVersion {
  if (raw && validVersions.has(raw)) return raw as ClaudeDesignVersion;
  return "A";
}
