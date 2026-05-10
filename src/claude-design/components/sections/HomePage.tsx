import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";
import { Hero } from "./Hero";
import { Programs } from "./Programs";
import { DiagonalDivider } from "./DiagonalDivider";
import { StatsBand } from "./StatsBand";
import { Events } from "./Events";
import { CTABand } from "./CTABand";

export function HomePage() {
  const { theme } = useClaudeDesignTheme();

  return (
    <>
      <Hero />
      <Programs />
      <div data-section="diagonal-divider-white-to-red">
        <DiagonalDivider
          fromColor={theme.background}
          toColor={theme.brand}
          direction="left-to-right"
        />
      </div>
      <StatsBand />
      <div data-section="diagonal-divider-red-to-gray">
        <DiagonalDivider
          fromColor={theme.brand}
          toColor={theme.backgroundSubtle}
          direction="right-to-left"
        />
      </div>
      <Events />
      <CTABand />
    </>
  );
}
