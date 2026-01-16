import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  Palette,
  MessageSquare,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useFeedback } from "@/contexts/FeedbackContext";
import { VersionSelector } from "./VersionSelector";
import { AccentPicker } from "./AccentPicker";
import { FeedbackPanel } from "./FeedbackPanel";

type PanelMode = "switcher" | "feedback";

export function PrototypeSwitcher() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [panelMode, setPanelMode] = useState<PanelMode>("switcher");
  const { version, theme } = useTheme();
  const { hasAnyFeedback } = useFeedback();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div
        className="rounded-xl shadow-2xl border overflow-hidden"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
          color: theme.cardForeground,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="font-heading font-semibold text-sm">
              Prototype Switcher
            </span>
            <span
              className="px-2 py-0.5 text-xs rounded-full font-medium"
              style={{
                backgroundColor: theme.accent,
                color: theme.accentForeground,
              }}
            >
              {version}: {theme.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tab Buttons */}
              <div
                className="flex border-b"
                style={{ borderColor: theme.border }}
              >
                <button
                  onClick={() => setPanelMode("switcher")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm transition-colors"
                  style={{
                    backgroundColor:
                      panelMode === "switcher"
                        ? theme.backgroundSecondary
                        : "transparent",
                    color:
                      panelMode === "switcher"
                        ? theme.accent
                        : theme.foregroundMuted,
                  }}
                >
                  <Palette className="w-4 h-4" />
                  <span>Theme</span>
                </button>
                <button
                  onClick={() => setPanelMode("feedback")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm transition-colors relative"
                  style={{
                    backgroundColor:
                      panelMode === "feedback"
                        ? theme.backgroundSecondary
                        : "transparent",
                    color:
                      panelMode === "feedback"
                        ? theme.accent
                        : theme.foregroundMuted,
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Feedback</span>
                  {hasAnyFeedback && (
                    <span
                      className="absolute top-1 right-2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                  )}
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-4 max-h-[400px] overflow-y-auto">
                {panelMode === "switcher" ? (
                  <div className="space-y-4">
                    <VersionSelector />
                    <AccentPicker />
                  </div>
                ) : (
                  <FeedbackPanel />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
