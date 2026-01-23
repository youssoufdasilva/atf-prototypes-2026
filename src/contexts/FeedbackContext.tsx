import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Rating = 1 | 2 | 3 | 4 | 5 | null;

// Preferred option types for each element
export type HeroLayoutPreference = "centered" | "split" | "fullWidth" | null;
export type HeroBackgroundPreference = "patterns" | "gradient" | "photo" | "organic" | null;
export type FooterPreference = "standard" | "minimal" | "expanded" | "dark" | null;
export type GeographicPreference = "cardGrid" | "interactiveMap" | "timeline" | null;
export type LogoPreference = "standard" | "negSpace" | null;

export interface ElementFeedback {
  rating: Rating;
  preferredOption: string | null;
  notes: string;
}

export interface FeedbackState {
  elements: Record<string, ElementFeedback>;
  generalNotes: string;
}

// Simplified elements that map 1:1 with customization options
export const feedbackElements = {
  "hero-layout": "Hero Layout",
  "hero-background": "Hero Background",
  colors: "Color Scheme",
  typography: "Typography",
  logo: "Logo Variant",
  footer: "Footer Style",
  geographic: "Geographic Section",
  overall: "Overall Impression",
} as const;

// Options for each element (used in FeedbackPanel)
export const feedbackOptions: Record<string, { value: string; label: string }[]> = {
  "hero-layout": [
    { value: "centered", label: "Centered" },
    { value: "split", label: "Split" },
    { value: "fullWidth", label: "Full Width" },
  ],
  "hero-background": [
    { value: "patterns", label: "Patterns" },
    { value: "gradient", label: "Gradient" },
    { value: "photo", label: "Photo" },
    { value: "organic", label: "Organic" },
  ],
  colors: [
    { value: "green", label: "Green (Pan-African)" },
    { value: "cyan", label: "Cyan (Tech)" },
    { value: "terracotta", label: "Terracotta (Warm)" },
  ],
  typography: [
    { value: "poppins", label: "Poppins + Inter" },
    { value: "spaceGrotesk", label: "Space Grotesk + Inter" },
    { value: "playfair", label: "Playfair + Source Sans" },
    { value: "dmSerif", label: "DM Serif + Nunito" },
  ],
  logo: [
    { value: "standard", label: "Standard" },
    { value: "negSpace", label: "Negative Space" },
  ],
  footer: [
    { value: "standard", label: "Standard" },
    { value: "minimal", label: "Minimal" },
    { value: "expanded", label: "Expanded" },
    { value: "dark", label: "Dark" },
  ],
  geographic: [
    { value: "cardGrid", label: "Card Grid" },
    { value: "interactiveMap", label: "Interactive Map" },
    { value: "timeline", label: "Timeline" },
  ],
  overall: [], // No specific options for overall impression
};

export type FeedbackElementId = keyof typeof feedbackElements;

interface FeedbackContextType {
  feedback: FeedbackState;
  setRating: (elementId: FeedbackElementId, rating: Rating) => void;
  setPreferredOption: (elementId: FeedbackElementId, option: string | null) => void;
  setNotes: (elementId: FeedbackElementId, notes: string) => void;
  setGeneralNotes: (notes: string) => void;
  exportToMarkdown: () => string;
  clearFeedback: () => void;
  hasAnyFeedback: boolean;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

const defaultFeedback: FeedbackState = {
  elements: {},
  generalNotes: "",
};

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedback, setFeedback] = useLocalStorage<FeedbackState>(
    "atf-feedback-state",
    defaultFeedback
  );

  const getElementFeedback = (elementId: FeedbackElementId): ElementFeedback => {
    return feedback.elements[elementId] || { rating: null, preferredOption: null, notes: "" };
  };

  const updateElement = (
    elementId: FeedbackElementId,
    updates: Partial<ElementFeedback>
  ) => {
    setFeedback((prev) => ({
      ...prev,
      elements: {
        ...prev.elements,
        [elementId]: {
          ...getElementFeedback(elementId),
          ...updates,
        },
      },
    }));
  };

  const setRating = (elementId: FeedbackElementId, rating: Rating) => {
    updateElement(elementId, { rating });
  };

  const setPreferredOption = (elementId: FeedbackElementId, option: string | null) => {
    updateElement(elementId, { preferredOption: option });
  };

  const setNotes = (elementId: FeedbackElementId, notes: string) => {
    updateElement(elementId, { notes });
  };

  const setGeneralNotes = (notes: string) => {
    setFeedback((prev) => ({ ...prev, generalNotes: notes }));
  };

  const clearFeedback = () => {
    setFeedback(defaultFeedback);
  };

  const hasAnyFeedback =
    Object.values(feedback.elements).some(
      (el) => el.rating !== null || el.preferredOption !== null || el.notes.trim() !== ""
    ) || feedback.generalNotes.trim() !== "";

  const exportToMarkdown = (): string => {
    const lines: string[] = [
      "# ATF Prototype Feedback Summary",
      "",
      `Generated: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      "",
      "## Element Preferences",
      "",
    ];

    (Object.entries(feedbackElements) as [FeedbackElementId, string][]).forEach(
      ([id, name]) => {
        const el = feedback.elements[id];
        if (el && (el.rating || el.preferredOption || el.notes.trim())) {
          lines.push(`### ${name}`);
          lines.push("");
          if (el.preferredOption) {
            const options = feedbackOptions[id] || [];
            const optionLabel = options.find((o) => o.value === el.preferredOption)?.label || el.preferredOption;
            lines.push(`- **Preferred**: ${optionLabel}`);
          }
          if (el.rating) {
            lines.push(`- **Rating**: ${el.rating}/5`);
          }
          if (el.notes.trim()) {
            lines.push(`- **Notes**: ${el.notes.trim()}`);
          }
          lines.push("");
        }
      }
    );

    if (feedback.generalNotes.trim()) {
      lines.push("## General Notes");
      lines.push("");
      lines.push(feedback.generalNotes.trim());
      lines.push("");
    }

    return lines.join("\n");
  };

  const value: FeedbackContextType = {
    feedback,
    setRating,
    setPreferredOption,
    setNotes,
    setGeneralNotes,
    exportToMarkdown,
    clearFeedback,
    hasAnyFeedback,
  };

  return (
    <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
}
