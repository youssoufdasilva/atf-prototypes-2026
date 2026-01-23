import { Link } from "@tanstack/react-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/ui/Logo";
import { socialLinks } from "./footerData";

export function FooterMinimal() {
  const { theme, isDarkTheme } = useTheme();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: isDarkTheme ? theme.background : theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Logo size="sm" />
            <span
              className="font-heading font-semibold"
              style={{ color: theme.foreground }}
            >
              ATF
            </span>
          </Link>

          {/* Key Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/about"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              About
            </Link>
            <Link
              to="/consulting"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              Programs
            </Link>
            <Link
              to="/news"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              News
            </Link>
            <Link
              to="/challenge"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              Challenge
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-8 h-8 flex items-center justify-center transition-colors rounded-full"
                style={{
                  color: theme.foregroundMuted,
                }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-6 pt-6 border-t text-center"
          style={{ borderColor: theme.border }}
        >
          <p className="text-xs" style={{ color: theme.foregroundMuted }}>
            &copy; {new Date().getFullYear()} African Technology Forum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
