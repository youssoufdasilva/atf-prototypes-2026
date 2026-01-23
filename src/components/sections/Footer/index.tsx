import { useTheme } from "@/contexts/ThemeContext";
import { FooterStandard } from "./FooterStandard";
import { FooterMinimal } from "./FooterMinimal";
import { FooterExpanded } from "./FooterExpanded";
import { FooterDark } from "./FooterDark";

export function Footer() {
  const { theme } = useTheme();

  switch (theme.footerStyle) {
    case "minimal":
      return <FooterMinimal />;
    case "expanded":
      return <FooterExpanded />;
    case "dark":
      return <FooterDark />;
    case "standard":
    default:
      return <FooterStandard />;
  }
}

export { FooterStandard, FooterMinimal, FooterExpanded, FooterDark };
