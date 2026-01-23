import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  type Version,
  type PresetVersion,
  type CustomThemeConfig,
  type ThemeDefinition,
  themes,
  getThemeStyles,
  getCustomThemeStyles,
  customConfigToThemeDefinition,
  brandColors,
  isPresetVersion,
  defaultCustomTheme,
} from "@/lib/themes";

// State stored in localStorage (syncs across tabs)
interface LocalState {
  accentColor: string;
  customColors: string[];
  customThemes: CustomThemeConfig[];
}

interface ThemeContextType {
  version: Version;
  setVersion: (version: Version) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  customColors: string[];
  addCustomColor: (color: string) => void;
  removeCustomColor: (color: string) => void;
  theme: ThemeDefinition;
  isDarkTheme: boolean;
  // Custom themes management
  customThemes: CustomThemeConfig[];
  createCustomTheme: (name: string) => CustomThemeConfig;
  updateCustomTheme: (id: string, updates: Partial<Omit<CustomThemeConfig, "id">>) => void;
  deleteCustomTheme: (id: string) => void;
  getCustomTheme: (id: string) => CustomThemeConfig | undefined;
  isCustomTheme: boolean;
  currentCustomConfig: CustomThemeConfig | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const presetVersions: PresetVersion[] = ["A", "B", "C", "D"];

const isValidPresetVersion = (v: unknown): v is PresetVersion =>
  typeof v === "string" && presetVersions.includes(v as PresetVersion);

const defaultLocalState: LocalState = {
  accentColor: brandColors.green,
  customColors: [],
  customThemes: [],
};

// Generate next custom theme ID (E, F, G, ... Z, AA, AB, ...)
function generateNextThemeId(existingThemes: CustomThemeConfig[]): string {
  const existingIds = new Set(existingThemes.map((t) => t.id));
  const letters = "EFGHIJKLMNOPQRSTUVWXYZ";

  // Try single letters first
  for (const letter of letters) {
    if (!existingIds.has(letter)) return letter;
  }

  // Then try double letters
  for (const first of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    for (const second of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
      const id = first + second;
      if (!existingIds.has(id)) return id;
    }
  }

  return `Custom${Date.now()}`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { version?: string };
  const urlVersion = search.version;

  // Local storage state (syncs across tabs)
  const [localState, setLocalState] = useLocalStorage<LocalState>(
    "atf-prototype-colors",
    defaultLocalState
  );

  // Check if URL version is valid (preset or custom)
  const isValidVersion = useCallback(
    (v: unknown): v is Version => {
      if (typeof v !== "string") return false;
      if (isValidPresetVersion(v)) return true;
      return localState.customThemes.some((t) => t.id === v);
    },
    [localState.customThemes]
  );

  // Version state from URL (tab-specific)
  const [version, _setVersion] = useState<Version>(() => {
    if (typeof urlVersion === "string") {
      if (isValidPresetVersion(urlVersion)) return urlVersion;
      // Check custom themes in initial localStorage
      const stored = localStorage.getItem("atf-prototype-colors");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as LocalState;
          if (parsed.customThemes?.some((t) => t.id === urlVersion)) {
            return urlVersion;
          }
        } catch {}
      }
    }
    return "A";
  });

  // Get the effective theme based on current version
  const getEffectiveTheme = useCallback((): ThemeDefinition => {
    if (isPresetVersion(version)) {
      return themes[version];
    }
    const customConfig = localState.customThemes.find((t) => t.id === version);
    if (customConfig) {
      return customConfigToThemeDefinition(customConfig);
    }
    return themes.A;
  }, [version, localState.customThemes]);

  // Sync version from URL changes
  useEffect(() => {
    if (isValidVersion(urlVersion) && urlVersion !== version) {
      _setVersion(urlVersion);
      // Update accent to theme default when URL changes version
      const theme = isPresetVersion(urlVersion)
        ? themes[urlVersion]
        : customConfigToThemeDefinition(
            localState.customThemes.find((t) => t.id === urlVersion)!
          );
      setLocalState((prev) => ({
        ...prev,
        accentColor: theme.accent,
      }));
    }
  }, [urlVersion, isValidVersion]);

  // Add version to URL on mount if not present or invalid
  useEffect(() => {
    if (!isValidVersion(urlVersion)) {
      navigate({
        // @ts-ignore TanStack Router strict typing - works at runtime
        search: { version },
        replace: true,
      });
    }
  }, []);

  const setVersion = (newVersion: Version) => {
    _setVersion(newVersion);
    // Update URL
    navigate({
      // @ts-ignore TanStack Router strict typing - works at runtime
      search: { version: newVersion },
      replace: true,
    });
    // Reset accent to theme default when switching versions
    const theme = isPresetVersion(newVersion)
      ? themes[newVersion]
      : customConfigToThemeDefinition(
          localState.customThemes.find((t) => t.id === newVersion)!
        );
    setLocalState((prev) => ({
      ...prev,
      accentColor: theme.accent,
    }));
  };

  const setAccentColor = (color: string) => {
    setLocalState((prev) => ({ ...prev, accentColor: color }));
  };

  const addCustomColor = (color: string) => {
    setLocalState((prev) => ({
      ...prev,
      customColors: [...new Set([...prev.customColors, color])].slice(0, 10),
    }));
  };

  const removeCustomColor = (color: string) => {
    setLocalState((prev) => ({
      ...prev,
      customColors: prev.customColors.filter((c) => c !== color),
    }));
  };

  // Custom theme management
  const createCustomTheme = (name: string): CustomThemeConfig => {
    const id = generateNextThemeId(localState.customThemes);
    const newTheme: CustomThemeConfig = {
      ...defaultCustomTheme,
      id,
      name: name || `Theme ${id}`,
    };
    setLocalState((prev) => ({
      ...prev,
      customThemes: [...prev.customThemes, newTheme],
    }));
    return newTheme;
  };

  const updateCustomTheme = (
    id: string,
    updates: Partial<Omit<CustomThemeConfig, "id">>
  ) => {
    setLocalState((prev) => ({
      ...prev,
      customThemes: prev.customThemes.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  };

  const deleteCustomTheme = (id: string) => {
    // If we're currently viewing the deleted theme, switch to A
    if (version === id) {
      setVersion("A");
    }
    setLocalState((prev) => ({
      ...prev,
      customThemes: prev.customThemes.filter((t) => t.id !== id),
    }));
  };

  const getCustomTheme = (id: string): CustomThemeConfig | undefined => {
    return localState.customThemes.find((t) => t.id === id);
  };

  // Track hydration for transition animation
  const isHydrated = useRef(false);

  // Apply theme CSS variables synchronously before paint using useLayoutEffect
  useLayoutEffect(() => {
    const root = document.documentElement;

    let styles: Record<string, string>;
    let isDark: boolean;

    if (isPresetVersion(version)) {
      styles = getThemeStyles(version, localState.accentColor);
      isDark = version === "B";
    } else {
      const customConfig = localState.customThemes.find((t) => t.id === version);
      if (customConfig) {
        styles = getCustomThemeStyles(customConfig, localState.accentColor);
        isDark = customConfig.isDark;
      } else {
        styles = getThemeStyles("A", localState.accentColor);
        isDark = false;
      }
    }

    // Batch all style updates together
    Object.entries(styles).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Toggle dark class (batched with CSS updates)
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Enable transitions only after initial hydration
    if (!isHydrated.current) {
      isHydrated.current = true;
      requestAnimationFrame(() => {
        document.body.classList.add("theme-transitions-enabled");
      });
    }
  }, [version, localState.accentColor, localState.customThemes]);

  const isCustomTheme = !isPresetVersion(version);
  const currentCustomConfig = isCustomTheme
    ? localState.customThemes.find((t) => t.id === version) || null
    : null;

  const value: ThemeContextType = {
    version,
    setVersion,
    accentColor: localState.accentColor,
    setAccentColor,
    customColors: localState.customColors,
    addCustomColor,
    removeCustomColor,
    theme: getEffectiveTheme(),
    isDarkTheme: isCustomTheme
      ? currentCustomConfig?.isDark ?? false
      : version === "B",
    customThemes: localState.customThemes,
    createCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
    getCustomTheme,
    isCustomTheme,
    currentCustomConfig,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
