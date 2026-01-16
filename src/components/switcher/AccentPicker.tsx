import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { brandColors } from "@/lib/themes";
import { Button } from "@/components/ui/button";

const presetColors = [
  { name: "Green", value: brandColors.green },
  { name: "Yellow", value: brandColors.yellow },
  { name: "Red", value: brandColors.red },
];

export function AccentPicker() {
  const {
    accentColor,
    setAccentColor,
    customColors,
    addCustomColor,
    removeCustomColor,
    theme,
  } = useTheme();
  const [customInput, setCustomInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddCustomColor = () => {
    if (customInput && /^#[0-9A-Fa-f]{6}$/.test(customInput)) {
      addCustomColor(customInput);
      setAccentColor(customInput);
      setCustomInput("");
      setShowCustomInput(false);
    }
  };

  const allColors = [
    ...presetColors.map((p) => ({ ...p, isCustom: false })),
    ...customColors.map((c) => ({ name: c, value: c, isCustom: true })),
  ];

  return (
    <div>
      <label
        className="text-xs font-medium mb-2 block"
        style={{ color: theme.foregroundMuted }}
      >
        Accent Color
      </label>
      <div className="flex flex-wrap gap-2">
        {allColors.map((color) => {
          const isActive = accentColor === color.value;
          return (
            <motion.button
              key={color.value}
              onClick={() => setAccentColor(color.value)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-8 h-8 rounded-full border-2 flex items-center justify-center group"
              style={{
                backgroundColor: color.value,
                borderColor: isActive ? theme.foreground : "transparent",
              }}
              title={color.name}
            >
              {isActive && <Check className="w-4 h-4 text-white drop-shadow" />}
              {color.isCustom && !isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCustomColor(color.value);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </motion.button>
          );
        })}

        {/* Add custom color button */}
        {!showCustomInput && (
          <motion.button
            onClick={() => setShowCustomInput(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: theme.border }}
          >
            <Plus className="w-4 h-4" style={{ color: theme.foregroundMuted }} />
          </motion.button>
        )}
      </div>

      {/* Custom color input */}
      {showCustomInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex gap-2"
        >
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value.toUpperCase())}
            placeholder="#FF5733"
            className="flex-1 px-3 py-1.5 text-sm rounded border"
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
              color: theme.foreground,
            }}
            maxLength={7}
          />
          <Button
            size="sm"
            onClick={handleAddCustomColor}
            disabled={!/^#[0-9A-Fa-f]{6}$/.test(customInput)}
          >
            Add
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowCustomInput(false);
              setCustomInput("");
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {/* Color preview */}
      <div
        className="mt-3 p-2 rounded text-xs text-center"
        style={{
          backgroundColor: theme.backgroundSecondary,
          color: theme.foregroundMuted,
        }}
      >
        Current: <code className="font-mono">{accentColor}</code>
      </div>
    </div>
  );
}
