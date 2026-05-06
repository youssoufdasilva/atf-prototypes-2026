import { Link } from "@tanstack/react-router";
import { useTheme } from "@/contexts/ThemeContext";
import { footerLinks, socialLinks, contactInfo, Mail, MapPin } from "./footerData";

export function FooterDark() {
  const { accentColor } = useTheme();

  // Dark footer always uses dark colors
  const darkBg = "#0a0a0f";
  const darkFg = "#f0f0f5";
  const darkFgMuted = "#9ca3af";
  const darkBorder = "#2d2d3a";

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: darkBg,
        borderColor: darkBorder,
      }}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              {/* Force neg space logo for dark footer */}
              <img
                src="/atf-assets/atf logo neg space copy.png"
                alt="ATF"
                className="h-12 w-auto"
              />
            </Link>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: darkFgMuted }}
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
                  className="w-10 h-10 flex items-center justify-center transition-colors rounded-lg"
                  style={{
                    backgroundColor: `${accentColor}20`,
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
              style={{ color: darkFg }}
            >
              Programs
            </h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: darkFgMuted }}
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
              style={{ color: darkFg }}
            >
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: darkFgMuted }}
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
              style={{ color: darkFg }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: darkFgMuted }}
                >
                  <Mail className="w-4 h-4" style={{ color: accentColor }} />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <span
                  className="flex items-start gap-2 text-sm"
                  style={{ color: darkFgMuted }}
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

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: darkBorder }}
        >
          <p className="text-sm" style={{ color: darkFgMuted }}>
            &copy; {new Date().getFullYear()} African Technology Forum. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-sm hover:underline"
              style={{ color: darkFgMuted }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm hover:underline"
              style={{ color: darkFgMuted }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
