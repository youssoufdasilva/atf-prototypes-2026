import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { useTheme } from "@/contexts/ThemeContext";
import { themes, type Version } from "@/lib/themes";

const versions: Version[] = ["A", "B", "C", "D"];

export function VersionSelector() {
  const { version, theme } = useTheme();
  const location = useLocation();

  return (
    <div>
      <label
        className="text-xs font-medium mb-2 block"
        style={{ color: theme.foregroundMuted }}
      >
        Design Version
      </label>
      <div className="grid grid-cols-2 gap-2">
        {versions.map((v) => {
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
    </div>
  );
}
