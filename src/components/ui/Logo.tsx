import type { LogoVariant } from "@/lib/themes";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: LogoVariant;
}

const sizeClasses = {
  sm: "h-8 w-auto",
  md: "h-10 lg:h-12 w-auto",
  lg: "h-12 w-auto",
};

export function Logo({ className = "", size = "md", variant = "standard" }: LogoProps) {
  const logoSrc = variant === "negSpace"
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
