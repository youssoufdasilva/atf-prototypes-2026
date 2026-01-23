import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { footerLinks, socialLinks, contactInfo, Mail, MapPin } from "./footerData";

const partners = [
  { name: "MIT", logo: "/atf-assets/partners/mit.svg" },
  { name: "Harvard", logo: "/atf-assets/partners/harvard.svg" },
  { name: "Stanford", logo: "/atf-assets/partners/stanford.svg" },
];

export function FooterExpanded() {
  const { theme, accentColor, isDarkTheme } = useTheme();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: isDarkTheme ? theme.background : theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      {/* Newsletter Section */}
      <div
        className="border-b"
        style={{
          backgroundColor: `${accentColor}08`,
          borderColor: theme.border,
        }}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="font-heading font-bold text-xl mb-2"
                style={{ color: theme.foreground }}
              >
                Stay Connected
              </h3>
              <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                Subscribe to our newsletter for updates on programs and events.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border flex-1 md:w-64"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  color: theme.foreground,
                }}
              />
              <Button
                style={{
                  backgroundColor: accentColor,
                  color: theme.accentForeground,
                }}
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo size="lg" />
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
                  className="w-10 h-10 flex items-center justify-center transition-colors rounded-full"
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

          {/* Resources links */}
          <div>
            <h4
              className="font-heading font-semibold mb-4"
              style={{ color: theme.foreground }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.foregroundMuted }}
                >
                  <Mail className="w-4 h-4" style={{ color: accentColor }} />
                  {contactInfo.email}
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
                  {contactInfo.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Logos */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: theme.border }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-4 text-center"
            style={{ color: theme.foregroundMuted }}
          >
            Our Partners
          </p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="h-8 w-20 flex items-center justify-center"
                style={{ color: theme.foregroundMuted }}
              >
                <span className="text-sm font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: theme.border }}
        >
          <p className="text-sm" style={{ color: theme.foregroundMuted }}>
            &copy; {new Date().getFullYear()} African Technology Forum. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-sm hover:underline"
              style={{ color: theme.foregroundMuted }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
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
