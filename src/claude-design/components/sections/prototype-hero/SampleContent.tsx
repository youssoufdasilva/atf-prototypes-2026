// PROTOTYPE — delete when done
import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";

export function SampleHeroContent() {
  const { theme } = useClaudeDesignTheme();
  return (
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
  );
}

export function SampleCTAContent() {
  const { theme } = useClaudeDesignTheme();
  return (
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
        Be part of Africa's technology transformation. Connect with innovators,
        researchers, and leaders across the continent.
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
  );
}
