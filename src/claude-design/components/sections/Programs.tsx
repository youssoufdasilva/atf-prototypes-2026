import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";

const programs = [
  {
    title: "ATF Challenge",
    description:
      "Annual pan-African technology competition fostering innovation among young technologists.",
  },
  {
    title: "Research & Publications",
    description:
      "Producing insights on Africa's technology landscape through rigorous research.",
  },
  {
    title: "Chapters Network",
    description:
      "Local chapters across the continent building grassroots technology communities.",
  },
];

export function Programs() {
  const { theme } = useClaudeDesignTheme();

  return (
    <section
      data-section="programs"
      style={{
        backgroundColor: theme.background,
        padding: `${theme.sectionPaddingY} 48px`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="uppercase text-sm mb-2"
          style={{
            fontFamily: `'${theme.fontDisplay}', sans-serif`,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: theme.brand,
          }}
        >
          Our Programs
        </p>
        <h2
          className="mb-12"
          style={{
            fontFamily: `'${theme.fontDisplay}', sans-serif`,
            fontWeight: theme.headingWeight,
            fontSize: "2.25rem",
            lineHeight: 1.35,
            color: theme.foreground,
          }}
        >
          Driving Impact Across Africa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="p-6 rounded"
              style={{
                border: `1px solid #E5E5E5`,
                borderRadius: "4px",
              }}
            >
              <h3
                className="mb-3"
                style={{
                  fontFamily: `'${theme.fontDisplay}', sans-serif`,
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  color: theme.foreground,
                }}
              >
                {program.title}
              </h3>
              <p
                style={{
                  fontFamily: `'${theme.fontBody}', sans-serif`,
                  color: theme.foregroundMuted,
                  lineHeight: 1.65,
                }}
              >
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
