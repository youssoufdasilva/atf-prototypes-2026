import { useTheme } from "@/contexts/ThemeContext";
import { HeroA } from "./HeroA";
import { HeroB } from "./HeroB";
import { HeroC } from "./HeroC";
import { HeroD } from "./HeroD";

export function Hero() {
  const { version } = useTheme();

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

export { HeroA, HeroB, HeroC, HeroD };
