import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { type Version, themes } from "@/lib/themes";

export type Rating = 1 | 2 | 3 | 4 | 5 | null;

export interface ElementFeedback {
  rating: Rating;
  preferredVersion: Version | null;
  notes: string;
}

export interface FeedbackState {
  elements: Record<string, ElementFeedback>;
  generalNotes: string;
}

// Elements that can be rated
export const feedbackElements = {
  "hero-style": "Hero Background Style",
  "hero-animation": "Hero Animation Level",
  "cta-placement": "CTA Button Placement",
  "nav-style": "Navigation Design",
  "programs-display": "Programs Section Layout",
  "geographic-display": "Geographic Section Style",
  "color-palette": "Overall Color Palette",
  typography: "Typography Choices",
  animations: "Animation/Motion Style",
  overall: "Overall Impression",
} as const;

export type FeedbackElementId = keyof typeof feedbackElements;

interface FeedbackContextType {
  feedback: FeedbackState;
  setRating: (elementId: FeedbackElementId, rating: Rating) => void;
  setPreferredVersion: (elementId: FeedbackElementId, version: Version | null) => void;
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
    return feedback.elements[elementId] || { rating: null, preferredVersion: null, notes: "" };
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

  const setPreferredVersion = (elementId: FeedbackElementId, version: Version | null) => {
    updateElement(elementId, { preferredVersion: version });
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
      (el) => el.rating !== null || el.preferredVersion !== null || el.notes.trim() !== ""
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
        if (el && (el.rating || el.preferredVersion || el.notes.trim())) {
          lines.push(`### ${name}`);
          lines.push("");
          if (el.preferredVersion) {
            lines.push(
              `- **Preferred Version**: ${el.preferredVersion} (${themes[el.preferredVersion].name})`
            );
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
    setPreferredVersion,
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
