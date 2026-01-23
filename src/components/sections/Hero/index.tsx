import { useTheme } from "@/contexts/ThemeContext";
import { isPresetVersion } from "@/lib/themes";
import { HeroA } from "./HeroA";
import { HeroB } from "./HeroB";
import { HeroC } from "./HeroC";
import { HeroD } from "./HeroD";
import { HeroCustom } from "./HeroCustom";

export function Hero() {
  const { version, currentCustomConfig } = useTheme();

  // For custom themes, use the composable HeroCustom component
  if (!isPresetVersion(version) && currentCustomConfig) {
    return <HeroCustom config={currentCustomConfig} />;
  }

  // For preset themes, use the dedicated components
  switch (version) {
    case "A":
      return <HeroA />;
    case "B":
      return <HeroB />;
    case "C":
      return <HeroC />;
    case "D":
      return <HeroD />;
    default:
      return <HeroA />;
  }
}

export { HeroA, HeroB, HeroC, HeroD, HeroCustom };
