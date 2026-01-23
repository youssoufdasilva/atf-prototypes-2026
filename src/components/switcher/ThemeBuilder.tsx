import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil, Check, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  type CustomThemeConfig,
  type HeroLayout,
  type HeroBackground,
  type FooterStyle,
  type GeographicStyle,
  type LogoVariant,
  type FontHeadingKey,
  type FontBodyKey,
  fontHeadingOptions,
  fontBodyOptions,
  brandColors,
} from "@/lib/themes";

const heroLayoutOptions: { value: HeroLayout; label: string }[] = [
  { value: "centered", label: "Centered" },
  { value: "split", label: "Split" },
  { value: "fullWidth", label: "Full Width" },
];

const heroBackgroundOptions: { value: HeroBackground; label: string }[] = [
  { value: "patterns", label: "Patterns" },
  { value: "gradient", label: "Gradient" },
  { value: "photo", label: "Photo" },
  { value: "organic", label: "Organic" },
];

const footerStyleOptions: { value: FooterStyle; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "minimal", label: "Minimal" },
  { value: "expanded", label: "Expanded" },
  { value: "dark", label: "Dark" },
];

const geographicStyleOptions: { value: GeographicStyle; label: string }[] = [
  { value: "cardGrid", label: "Cards" },
  { value: "interactiveMap", label: "Map" },
  { value: "timeline", label: "Timeline" },
];

const logoVariantOptions: { value: LogoVariant; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "negSpace", label: "Neg Space" },
];

const fontHeadingLabels: Record<FontHeadingKey, string> = {
  poppins: "Poppins",
  spaceGrotesk: "Space Grotesk",
  playfair: "Playfair Display",
  dmSerif: "DM Serif Display",
};

const fontBodyLabels: Record<FontBodyKey, string> = {
  inter: "Inter",
  sourceSans: "Source Sans",
  nunito: "Nunito",
};

interface OptionButtonProps<T> {
  value: T;
  currentValue: T;
  label: string;
  onChange: (value: T) => void;
  accentColor: string;
  foregroundMuted: string;
  backgroundSecondary: string;
}

function OptionButton<T>({
  value,
  currentValue,
  label,
  onChange,
  accentColor,
  foregroundMuted,
  backgroundSecondary,
}: OptionButtonProps<T>) {
  const isActive = value === currentValue;
  return (
    <button
      onClick={() => onChange(value)}
      className="px-2 py-1 text-xs rounded transition-colors"
      style={{
        backgroundColor: isActive ? accentColor : backgroundSecondary,
        color: isActive ? "#fff" : foregroundMuted,
      }}
    >
      {label}
    </button>
  );
}

interface ThemeEditorProps {
  config: CustomThemeConfig;
  onUpdate: (updates: Partial<Omit<CustomThemeConfig, "id">>) => void;
  onDelete: () => void;
  isActive: boolean;
  onSelect: () => void;
}

function ThemeEditor({ config, onUpdate, onDelete, isActive, onSelect }: ThemeEditorProps) {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(config.name);

  const handleSaveName = () => {
    onUpdate({ name: editName });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(config.name);
    setIsEditing(false);
  };

  return (
    <div
      className="rounded-lg border p-3"
      style={{
        borderColor: isActive ? theme.accent : theme.border,
        backgroundColor: isActive ? `${theme.accent}08` : "transparent",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onSelect}
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: config.accentColor,
              color: config.isDark ? "#000" : "#fff",
            }}
          >
            {config.id}
          </button>
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-sm px-2 py-0.5 rounded border w-24"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                  color: theme.foreground,
                }}
                autoFocus
              />
              <button onClick={handleSaveName} className="p-0.5">
                <Check className="w-3 h-3" style={{ color: theme.accent }} />
              </button>
              <button onClick={handleCancelEdit} className="p-0.5">
                <X className="w-3 h-3" style={{ color: theme.foregroundMuted }} />
              </button>
            </div>
          ) : (
            <span
              className="text-sm font-medium cursor-pointer"
              style={{ color: theme.foreground }}
              onClick={() => setIsEditing(true)}
            >
              {config.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded"
            style={{ color: theme.foregroundMuted }}
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded"
            style={{ color: theme.foregroundMuted }}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 text-xs">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Mode</span>
          <button
            onClick={() => onUpdate({ isDark: !config.isDark })}
            className="flex items-center gap-1 px-2 py-1 rounded"
            style={{
              backgroundColor: theme.backgroundSecondary,
              color: theme.foreground,
            }}
          >
            {config.isDark ? (
              <>
                <Moon className="w-3 h-3" /> Dark
              </>
            ) : (
              <>
                <Sun className="w-3 h-3" /> Light
              </>
            )}
          </button>
        </div>

        {/* Accent Color */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Accent</span>
          <div className="flex gap-1">
            {[brandColors.green, brandColors.yellow, brandColors.red, "#06b6d4", "#8b5cf6", "#c4704f"].map(
              (color) => (
                <button
                  key={color}
                  onClick={() => onUpdate({ accentColor: color, primaryColor: color })}
                  className="w-5 h-5 rounded-full border-2 transition-transform"
                  style={{
                    backgroundColor: color,
                    borderColor: config.accentColor === color ? theme.foreground : "transparent",
                    transform: config.accentColor === color ? "scale(1.1)" : "scale(1)",
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Hero Layout */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Hero</span>
          <div className="flex gap-1">
            {heroLayoutOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                currentValue={config.heroLayout}
                label={opt.label}
                onChange={(v) => onUpdate({ heroLayout: v })}
                accentColor={theme.accent}
                foregroundMuted={theme.foregroundMuted}
                backgroundSecondary={theme.backgroundSecondary}
              />
            ))}
          </div>
        </div>

        {/* Hero Background */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Background</span>
          <div className="flex gap-1">
            {heroBackgroundOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                currentValue={config.heroBackground}
                label={opt.label}
                onChange={(v) => onUpdate({ heroBackground: v })}
                accentColor={theme.accent}
                foregroundMuted={theme.foregroundMuted}
                backgroundSecondary={theme.backgroundSecondary}
              />
            ))}
          </div>
        </div>

        {/* Footer Style */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Footer</span>
          <div className="flex gap-1">
            {footerStyleOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                currentValue={config.footerStyle}
                label={opt.label}
                onChange={(v) => onUpdate({ footerStyle: v })}
                accentColor={theme.accent}
                foregroundMuted={theme.foregroundMuted}
                backgroundSecondary={theme.backgroundSecondary}
              />
            ))}
          </div>
        </div>

        {/* Geographic Style */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Geographic</span>
          <div className="flex gap-1">
            {geographicStyleOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                currentValue={config.geographicStyle}
                label={opt.label}
                onChange={(v) => onUpdate({ geographicStyle: v })}
                accentColor={theme.accent}
                foregroundMuted={theme.foregroundMuted}
                backgroundSecondary={theme.backgroundSecondary}
              />
            ))}
          </div>
        </div>

        {/* Logo Variant */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Logo</span>
          <div className="flex gap-1">
            {logoVariantOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                currentValue={config.logoVariant}
                label={opt.label}
                onChange={(v) => onUpdate({ logoVariant: v })}
                accentColor={theme.accent}
                foregroundMuted={theme.foregroundMuted}
                backgroundSecondary={theme.backgroundSecondary}
              />
            ))}
          </div>
        </div>

        {/* Font Heading */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Heading</span>
          <select
            value={config.fontHeading}
            onChange={(e) => onUpdate({ fontHeading: e.target.value as FontHeadingKey })}
            className="text-xs px-2 py-1 rounded border"
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
              color: theme.foreground,
            }}
          >
            {(Object.keys(fontHeadingOptions) as FontHeadingKey[]).map((key) => (
              <option key={key} value={key}>
                {fontHeadingLabels[key]}
              </option>
            ))}
          </select>
        </div>

        {/* Font Body */}
        <div className="flex items-center justify-between">
          <span style={{ color: theme.foregroundMuted }}>Body</span>
          <select
            value={config.fontBody}
            onChange={(e) => onUpdate({ fontBody: e.target.value as FontBodyKey })}
            className="text-xs px-2 py-1 rounded border"
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
              color: theme.foreground,
            }}
          >
            {(Object.keys(fontBodyOptions) as FontBodyKey[]).map((key) => (
              <option key={key} value={key}>
                {fontBodyLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function ThemeBuilder() {
  const {
    theme,
    version,
    customThemes,
    createCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
    setVersion,
  } = useTheme();

  const handleCreateTheme = () => {
    const newTheme = createCustomTheme("");
    setVersion(newTheme.id);
  };

  return (
    <div className="w-[320px] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-medium"
          style={{ color: theme.foregroundMuted }}
        >
          Custom Themes ({customThemes.length})
        </span>
        <Button
          size="sm"
          onClick={handleCreateTheme}
          className="h-7 px-2 text-xs"
          style={{
            backgroundColor: theme.accent,
            color: theme.accentForeground,
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          New Theme
        </Button>
      </div>

      {/* Custom Themes List */}
      {customThemes.length === 0 ? (
        <div
          className="text-center py-8 text-sm rounded-lg border border-dashed"
          style={{
            color: theme.foregroundMuted,
            borderColor: theme.border,
          }}
        >
          <p className="mb-2">No custom themes yet</p>
          <p className="text-xs">Click "New Theme" to create one</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {customThemes.map((customTheme) => (
            <motion.div
              key={customTheme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ThemeEditor
                config={customTheme}
                onUpdate={(updates) => updateCustomTheme(customTheme.id, updates)}
                onDelete={() => deleteCustomTheme(customTheme.id)}
                isActive={version === customTheme.id}
                onSelect={() => setVersion(customTheme.id)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
