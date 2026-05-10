import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";

const events = [
  {
    title: "ATF Challenge 2026",
    date: "June 15-17, 2026",
    location: "Nairobi, Kenya",
  },
  {
    title: "Tech Policy Summit",
    date: "August 20, 2026",
    location: "Accra, Ghana",
  },
  {
    title: "Research Symposium",
    date: "October 5-6, 2026",
    location: "Lagos, Nigeria",
  },
];

export function Events() {
  const { theme } = useClaudeDesignTheme();

  return (
    <section
      data-section="events"
      style={{
        backgroundColor: theme.backgroundSubtle,
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
          Upcoming Events
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
          Connect With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-white p-6"
              style={{ borderRadius: "4px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <p
                className="text-sm mb-2"
                style={{
                  fontFamily: `'${theme.fontBody}', sans-serif`,
                  color: theme.brand,
                  fontWeight: 500,
                }}
              >
                {event.date}
              </p>
              <h3
                className="mb-2"
                style={{
                  fontFamily: `'${theme.fontDisplay}', sans-serif`,
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: theme.foreground,
                }}
              >
                {event.title}
              </h3>
              <p
                style={{
                  fontFamily: `'${theme.fontBody}', sans-serif`,
                  color: theme.foregroundMuted,
                }}
              >
                {event.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
