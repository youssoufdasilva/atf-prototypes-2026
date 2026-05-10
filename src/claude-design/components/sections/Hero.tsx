import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";
import { OpportunityTriangle } from "./OpportunityTriangle";

export function Hero() {
  const { theme } = useClaudeDesignTheme();

  return (
    <section
      data-section="hero"
      style={{
        backgroundColor: theme.brand,
      }}
    >
      <OpportunityTriangle
        variant="filled"
        orientation="landscape"
        photoSrc="/atf-assets/hero-photo.jpg"
        photoAlt="African Technology Forum community"
        brandColor={theme.brand}
        transitionColor={theme.brandDark}
        className="min-h-[600px]"
      >
        <div className="text-white max-w-xl">
          <p
            className="uppercase tracking-widest text-sm mb-4"
            style={{
              fontFamily: `'${theme.fontDisplay}', sans-serif`,
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            African Technology Forum
          </p>
          <h1
            style={{
              fontFamily: `'${theme.fontDisplay}', sans-serif`,
              fontWeight: theme.headingWeight,
              fontSize: "3.75rem",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Bridging Africa's Technology Gap
          </h1>
          <p
            className="mt-6 text-lg opacity-90"
            style={{ fontFamily: `'${theme.fontBody}', sans-serif` }}
          >
            Empowering the next generation of African technologists through
            research, education, and community.
          </p>
          <button
            className="mt-8 px-8 py-3 bg-white text-sm font-semibold uppercase tracking-wide rounded"
            style={{
              color: theme.brand,
              fontFamily: `'${theme.fontDisplay}', sans-serif`,
            }}
          >
            Get Involved
          </button>
        </div>
      </OpportunityTriangle>
    </section>
  );
}
