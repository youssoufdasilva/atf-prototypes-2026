import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/ui/Logo";

const footerLinks = {
  programs: [
    { label: "ATF Consulting", href: "/legacy/consulting" },
    { label: "ATF Challenge", href: "/legacy/challenge" },
    { label: "ATF Chapters", href: "/legacy/chapters" },
  ],
  about: [
    { label: "Our Story", href: "/legacy/about" },
    { label: "Team", href: "/legacy/team" },
    { label: "News", href: "/legacy/news" },
  ],
  resources: [
    { label: "Articles", href: "/legacy/articles" },
    { label: "Research", href: "/legacy/research" },
    { label: "Publications", href: "/legacy/publications" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#social-facebook", label: "Facebook" },
  { icon: Twitter, href: "#social-twitter", label: "Twitter" },
  { icon: Linkedin, href: "#social-linkedin", label: "LinkedIn" },
  { icon: Youtube, href: "#social-youtube", label: "YouTube" },
];

export function Footer() {
  const { theme, accentColor, version, isDarkTheme } = useTheme();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor:
          version === "B" ? theme.background : theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/legacy" className="inline-block mb-6">
              <Logo size="lg" variant={isDarkTheme || theme.logoVariant === "negSpace" ? "negSpace" : "standard"} />
            </Link>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: theme.foregroundMuted }}
            >
              The African Technology Forum champions technology-driven solutions
              for Africa's development challenges through consulting, innovation
              challenges, and capacity building.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    version === "D" ? "rounded-full" : "rounded-lg"
                  }`}
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs links */}
          <div>
            <h4
              className="font-heading font-semibold mb-4"
              style={{ color: theme.foreground }}
            >
              Programs
            </h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: theme.foregroundMuted }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About links */}
          <div>
            <h4
              className="font-heading font-semibold mb-4"
              style={{ color: theme.foreground }}
            >
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: theme.foregroundMuted }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-heading font-semibold mb-4"
              style={{ color: theme.foreground }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@atfglobal.org"
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.foregroundMuted }}
                >
                  <Mail className="w-4 h-4" style={{ color: accentColor }} />
                  info@atfglobal.org
                </a>
              </li>
              <li>
                <span
                  className="flex items-start gap-2 text-sm"
                  style={{ color: theme.foregroundMuted }}
                >
                  <MapPin
                    className="w-4 h-4 mt-0.5"
                    style={{ color: accentColor }}
                  />
                  Accra, Ghana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: theme.border }}
        >
          <p className="text-sm" style={{ color: theme.foregroundMuted }}>
            &copy; {new Date().getFullYear()} African Technology Forum. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/legacy/privacy-policy"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/legacy/terms-of-service"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
