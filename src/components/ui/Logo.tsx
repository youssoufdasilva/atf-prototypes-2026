import { useTheme } from "@/contexts/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-auto",
  md: "h-10 lg:h-12 w-auto",
  lg: "h-12 w-auto",
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const { theme, isDarkTheme } = useTheme();

  // Use neg space logo for dark themes or when logoVariant is negSpace
  const useNegSpace = isDarkTheme || theme.logoVariant === "negSpace";

  const logoSrc = useNegSpace
    ? "/atf-assets/atf logo neg space copy.png"
    : "/atf-assets/atf-logo-vector.svg";

  return (
    <img
      src={logoSrc}
      alt="ATF"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
