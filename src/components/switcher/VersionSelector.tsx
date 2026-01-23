import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { themes, type PresetVersion } from "@/lib/themes";

const presetVersions: PresetVersion[] = ["A", "B", "C", "D"];

export function VersionSelector() {
  const { version, theme, customThemes, createCustomTheme, setVersion } = useTheme();
  const location = useLocation();

  const handleCreateTheme = () => {
    const newTheme = createCustomTheme("");
    setVersion(newTheme.id);
  };

  return (
    <div>
      <label
        className="text-xs font-medium mb-2 block"
        style={{ color: theme.foregroundMuted }}
      >
        Design Version
      </label>

      {/* Preset Versions */}
      <div className="grid grid-cols-2 gap-2">
        {presetVersions.map((v) => {
          const isActive = version === v;
          const versionTheme = themes[v];

          return (
            <Link
              key={v}
              to={location.pathname}
              search={(prev) => ({ ...prev, version: v })}
              className="relative p-3 rounded-lg border transition-all text-left block"
              style={{
                borderColor: isActive ? theme.accent : theme.border,
                backgroundColor: isActive
                  ? `${theme.accent}10`
                  : theme.backgroundSecondary,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeVersion"
                    className="absolute inset-[-12px] rounded-lg"
                    style={{
                      border: `2px solid ${theme.accent}`,
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: versionTheme.accent,
                      color: versionTheme.accentForeground,
                    }}
                  >
                    {v}
                  </span>
                  <span
                    className="font-medium text-sm"
                    style={{ color: theme.foreground }}
                  >
                    {versionTheme.name}
                  </span>
                </div>
                <p
                  className="text-xs leading-tight"
                  style={{ color: theme.foregroundMuted }}
                >
                  {versionTheme.description}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Custom Themes Section */}
      {customThemes.length > 0 && (
        <>
          <label
            className="text-xs font-medium mb-2 mt-4 block"
            style={{ color: theme.foregroundMuted }}
          >
            Custom Themes
          </label>
          <div className="grid grid-cols-2 gap-2">
            {customThemes.map((customTheme) => {
              const isActive = version === customTheme.id;

              return (
                <Link
                  key={customTheme.id}
                  to={location.pathname}
                  search={(prev) => ({ ...prev, version: customTheme.id })}
                  className="relative p-3 rounded-lg border transition-all text-left block"
                  style={{
                    borderColor: isActive ? theme.accent : theme.border,
                    backgroundColor: isActive
                      ? `${theme.accent}10`
                      : theme.backgroundSecondary,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeVersion"
                        className="absolute inset-[-12px] rounded-lg"
                        style={{
                          border: `2px solid ${theme.accent}`,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: customTheme.accentColor,
                          color: customTheme.isDark ? "#000" : "#fff",
                        }}
                      >
                        {customTheme.id}
                      </span>
                      <span
                        className="font-medium text-sm"
                        style={{ color: theme.foreground }}
                      >
                        {customTheme.name}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-tight"
                      style={{ color: theme.foregroundMuted }}
                    >
                      {customTheme.isDark ? "Dark" : "Light"} theme
                    </p>
                  </motion.div>
                </Link>
              );
            })}

            {/* Add New Theme Button */}
            <motion.button
              onClick={handleCreateTheme}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 rounded-lg border border-dashed flex flex-col items-center justify-center gap-1 text-center"
              style={{
                borderColor: theme.border,
                color: theme.foregroundMuted,
              }}
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs">New Theme</span>
            </motion.button>
          </div>
        </>
      )}

      {/* Add first custom theme button when none exist */}
      {customThemes.length === 0 && (
        <motion.button
          onClick={handleCreateTheme}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 w-full p-3 rounded-lg border border-dashed flex items-center justify-center gap-2"
          style={{
            borderColor: theme.border,
            color: theme.foregroundMuted,
          }}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Create Custom Theme</span>
        </motion.button>
      )}
    </div>
  );
}
