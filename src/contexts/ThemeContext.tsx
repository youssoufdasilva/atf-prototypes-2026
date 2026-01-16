import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  type Version,
  themes,
  getThemeStyles,
  brandColors,
} from "@/lib/themes";

// State stored in localStorage (syncs across tabs)
interface LocalState {
  accentColor: string;
  customColors: string[];
}

interface ThemeContextType {
  version: Version;
  setVersion: (version: Version) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  customColors: string[];
  addCustomColor: (color: string) => void;
  removeCustomColor: (color: string) => void;
  theme: typeof themes.A;
  isDarkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const validVersions: Version[] = ["A", "B", "C", "D"];
const isValidVersion = (v: unknown): v is Version =>
  typeof v === "string" && validVersions.includes(v as Version);

const defaultLocalState: LocalState = {
  accentColor: brandColors.green,
  customColors: [],
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { version?: string };
  const urlVersion = search.version;

  // Version state from URL (tab-specific)
  const [version, _setVersion] = useState<Version>(() => {
    if (isValidVersion(urlVersion)) return urlVersion;
    return "A";
  });

  // Accent color and custom colors in localStorage (syncs across tabs)
  const [localState, setLocalState] = useLocalStorage<LocalState>(
    "atf-prototype-colors",
    defaultLocalState
  );

  // Sync version from URL changes
  useEffect(() => {
    if (isValidVersion(urlVersion) && urlVersion !== version) {
      _setVersion(urlVersion);
      // Update accent to theme default when URL changes version
      setLocalState((prev) => ({
        ...prev,
        accentColor: themes[urlVersion].accent,
      }));
    }
  }, [urlVersion]);

  // Add version to URL on mount if not present
  useEffect(() => {
    if (!isValidVersion(urlVersion)) {
      navigate({
        search: (prev: Record<string, unknown>) => ({ ...prev, version }),
        replace: true,
      });
    }
  }, []);

  const setVersion = (newVersion: Version) => {
    _setVersion(newVersion);
    // Update URL instead of localStorage
    navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, version: newVersion }),
      replace: true,
    });
    // Reset accent to theme default when switching versions
    setLocalState((prev) => ({
      ...prev,
      accentColor: themes[newVersion].accent,
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

  // Apply theme CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    const styles = getThemeStyles(version, localState.accentColor);

    Object.entries(styles).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Toggle dark class for Version B
    if (version === "B") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [version, localState.accentColor]);

  const value: ThemeContextType = {
    version,
    setVersion,
    accentColor: localState.accentColor,
    setAccentColor,
    customColors: localState.customColors,
    addCustomColor,
    removeCustomColor,
    theme: themes[version],
    isDarkTheme: version === "B",
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
