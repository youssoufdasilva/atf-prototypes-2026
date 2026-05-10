import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";
import { OpportunityTriangle } from "./OpportunityTriangle";

export function CTABand() {
  const { theme } = useClaudeDesignTheme();

  return (
    <section data-section="cta-band" style={{ backgroundColor: "#0A0A0A" }}>
      <OpportunityTriangle
        variant="outline"
        orientation="landscape"
        photoSrc="/atf-assets/hero-photo.jpg"
        photoAlt="Join the ATF community"
        brandColor={theme.brand}
        className="min-h-[400px]"
      >
        <div className="text-white max-w-lg">
          <h2
            style={{
              fontFamily: `'${theme.fontDisplay}', sans-serif`,
              fontWeight: theme.headingWeight,
              fontSize: "2.25rem",
              lineHeight: 1.35,
              textTransform: "uppercase",
            }}
          >
            Join the Movement
          </h2>
          <p
            className="mt-4 opacity-80"
            style={{
              fontFamily: `'${theme.fontBody}', sans-serif`,
              lineHeight: 1.65,
            }}
          >
            Be part of Africa's technology transformation. Connect with
            innovators, researchers, and leaders across the continent.
          </p>
          <button
            className="mt-6 px-8 py-3 text-sm font-semibold uppercase tracking-wide rounded text-white"
            style={{
              backgroundColor: theme.brand,
              fontFamily: `'${theme.fontDisplay}', sans-serif`,
            }}
          >
            Get Started
          </button>
        </div>
      </OpportunityTriangle>
    </section>
  );
}
