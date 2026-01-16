import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Download, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import {
  useFeedback,
  feedbackElements,
  type FeedbackElementId,
  type Rating,
} from "@/contexts/FeedbackContext";
import { themes, type Version } from "@/lib/themes";

const versions: Version[] = ["A", "B", "C", "D"];

function StarRating({
  value,
  onChange,
}: {
  value: Rating;
  onChange: (rating: Rating) => void;
}) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = value !== null && star <= value;
        const isHovered = hovered !== null && star <= hovered;
        return (
          <motion.button
            key={star}
            onClick={() => onChange(star as Rating)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-0.5"
          >
            <Star
              className="w-4 h-4 transition-colors"
              fill={isFilled || isHovered ? theme.accent : "transparent"}
              stroke={isFilled || isHovered ? theme.accent : theme.border}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

function FeedbackItem({
  elementId,
  name,
}: {
  elementId: FeedbackElementId;
  name: string;
}) {
  const { theme } = useTheme();
  const { feedback, setRating, setPreferredVersion, setNotes } = useFeedback();
  const [isExpanded, setIsExpanded] = useState(false);

  const elementFeedback = feedback.elements[elementId] || {
    rating: null,
    preferredVersion: null,
    notes: "",
  };

  const hasData =
    elementFeedback.rating ||
    elementFeedback.preferredVersion ||
    elementFeedback.notes.trim();

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{ borderColor: hasData ? theme.accent : theme.border }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 text-left"
        style={{ backgroundColor: hasData ? `${theme.accent}08` : "transparent" }}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" style={{ color: theme.foregroundMuted }} />
          ) : (
            <ChevronRight className="w-4 h-4" style={{ color: theme.foregroundMuted }} />
          )}
          <span className="text-sm font-medium" style={{ color: theme.foreground }}>
            {name}
          </span>
        </div>
        {elementFeedback.rating && (
          <span className="text-xs" style={{ color: theme.foregroundMuted }}>
            {elementFeedback.rating}/5
          </span>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              className="px-3 pb-3 space-y-3 border-t"
              style={{ borderColor: theme.border }}
            >
              {/* Rating */}
              <div className="pt-3">
                <label
                  className="text-xs mb-1 block"
                  style={{ color: theme.foregroundMuted }}
                >
                  Rating
                </label>
                <StarRating
                  value={elementFeedback.rating}
                  onChange={(rating) => setRating(elementId, rating)}
                />
              </div>

              {/* Preferred Version */}
              <div>
                <label
                  className="text-xs mb-1 block"
                  style={{ color: theme.foregroundMuted }}
                >
                  Preferred Version
                </label>
                <div className="flex gap-1">
                  {versions.map((v) => (
                    <button
                      key={v}
                      onClick={() =>
                        setPreferredVersion(
                          elementId,
                          elementFeedback.preferredVersion === v ? null : v
                        )
                      }
                      className="px-2 py-1 text-xs rounded transition-colors"
                      style={{
                        backgroundColor:
                          elementFeedback.preferredVersion === v
                            ? theme.accent
                            : theme.backgroundSecondary,
                        color:
                          elementFeedback.preferredVersion === v
                            ? theme.accentForeground
                            : theme.foregroundMuted,
                      }}
                    >
                      {v}: {themes[v].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  className="text-xs mb-1 block"
                  style={{ color: theme.foregroundMuted }}
                >
                  Notes
                </label>
                <Textarea
                  value={elementFeedback.notes}
                  onChange={(e) => setNotes(elementId, e.target.value)}
                  placeholder="Add your thoughts..."
                  className="text-sm min-h-[60px] resize-none"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.border,
                    color: theme.foreground,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FeedbackPanel() {
  const { theme } = useTheme();
  const { feedback, setGeneralNotes, exportToMarkdown, clearFeedback, hasAnyFeedback } =
    useFeedback();

  const handleExport = () => {
    const markdown = exportToMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atf-feedback-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 w-[320px]">
      {/* Element feedback items */}
      <div className="space-y-2">
        {(Object.entries(feedbackElements) as [FeedbackElementId, string][]).map(
          ([id, name]) => (
            <FeedbackItem key={id} elementId={id} name={name} />
          )
        )}
      </div>

      {/* General notes */}
      <div>
        <label
          className="text-xs font-medium mb-1 block"
          style={{ color: theme.foregroundMuted }}
        >
          General Notes
        </label>
        <Textarea
          value={feedback.generalNotes}
          onChange={(e) => setGeneralNotes(e.target.value)}
          placeholder="Any overall feedback or comments..."
          className="text-sm min-h-[80px] resize-none"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
            color: theme.foreground,
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleExport}
          disabled={!hasAnyFeedback}
          className="flex-1"
          style={{
            backgroundColor: hasAnyFeedback ? theme.accent : undefined,
            color: hasAnyFeedback ? theme.accentForeground : undefined,
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button
          variant="outline"
          onClick={clearFeedback}
          disabled={!hasAnyFeedback}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
