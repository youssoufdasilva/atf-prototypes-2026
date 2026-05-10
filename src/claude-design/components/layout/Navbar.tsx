import { Link, useMatches } from "@tanstack/react-router";
import { Logo } from "@/components/ui/Logo";

type HeaderTheme = "dark" | "light" | "brand";

const themeStyles: Record<HeaderTheme, { bg: string; text: string }> = {
  dark: { bg: "#0A0A0A", text: "#FFFFFF" },
  light: { bg: "#FFFFFF", text: "#171717" },
  brand: { bg: "#F90036", text: "#FFFFFF" },
};

export function Navbar() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const headerTheme =
    (currentRoute?.staticData as { headerTheme?: HeaderTheme } | undefined)
      ?.headerTheme ?? "dark";
  const styles = themeStyles[headerTheme];

  const navLinks = [
    { label: "Programs", to: "/claude-design/programs" },
    { label: "Events", to: "/claude-design/events" },
    { label: "About", to: "/claude-design/about" },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: styles.bg }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/claude-design">
          <Logo
            variant={headerTheme === "light" ? "standard" : "negSpace"}
            size="md"
          />
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-semibold uppercase tracking-wide"
              style={{
                color: styles.text,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
