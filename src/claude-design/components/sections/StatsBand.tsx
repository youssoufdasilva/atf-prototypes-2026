import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";
import { AccentTriangle } from "./AccentTriangle";

const stats = [
  { value: "25+", label: "Countries" },
  { value: "10K+", label: "Community Members" },
  { value: "500+", label: "Challenge Participants" },
  { value: "50+", label: "Research Publications" },
];

export function StatsBand() {
  const { theme } = useClaudeDesignTheme();

  return (
    <section
      data-section="stats-band"
      className="relative"
      style={{
        backgroundColor: theme.brand,
        padding: `${theme.sectionPaddingY} 48px`,
      }}
    >
      <div className="absolute top-4 left-8">
        <AccentTriangle color="#FFFFFF" direction="down" size={16} />
      </div>
      <div className="absolute bottom-6 right-12">
        <AccentTriangle color="#FFFFFF" direction="up" size={12} />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p
              className="text-white"
              style={{
                fontFamily: `'${theme.fontDisplay}', sans-serif`,
                fontWeight: theme.headingWeight,
                fontSize: "3rem",
                lineHeight: 1.2,
              }}
            >
              {stat.value}
            </p>
            <p
              className="text-white/80 mt-2 uppercase text-sm"
              style={{
                fontFamily: `'${theme.fontBody}', sans-serif`,
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
