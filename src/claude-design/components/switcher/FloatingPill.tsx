import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";

export function FloatingPill() {
  const { version } = useClaudeDesignTheme();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full shadow-lg px-1 py-1"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <span
        className="px-3 py-1.5 rounded-full text-xs font-bold uppercase"
        style={{
          backgroundColor: "#F90036",
          color: "#FFFFFF",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {version}
      </span>
    </div>
  );
}
