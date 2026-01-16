import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const { theme, accentColor, version } = useTheme();

  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using ATF's services, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.",
    },
    {
      title: "Use of Services",
      content:
        "You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content, trademarks, and intellectual property on ATF platforms are owned by the African Technology Forum. You may not use our intellectual property without permission.",
    },
    {
      title: "User Content",
      content:
        "You retain ownership of content you submit to ATF. By submitting content, you grant us a license to use, display, and distribute it in connection with our services.",
    },
    {
      title: "Limitation of Liability",
      content:
        "ATF is not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
    },
    {
      title: "Changes to Terms",
      content:
        "We may update these Terms from time to time. We will notify you of significant changes. Continued use of our services constitutes acceptance of updated Terms.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms are governed by the laws of Ghana. Any disputes shall be resolved in the courts of Accra, Ghana.",
    },
  ];

  return (
    <div
      className="min-h-[80vh] py-20"
      style={{ backgroundColor: theme.background }}
    >
      <div className="container mx-auto px-6">
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-8 gap-2"
            style={{ color: theme.foregroundMuted }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`w-16 h-16 mb-6 flex items-center justify-center ${
                version === "D" ? "rounded-2xl" : "rounded-xl"
              }`}
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <FileText className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              Terms of Service
            </h1>

            <p
              className="text-lg mb-2"
              style={{ color: theme.foregroundMuted }}
            >
              Last updated: January 1, 2026
            </p>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Please read these Terms of Service carefully before using the
              African Technology Forum's services.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <h2
                  className="font-heading text-xl font-semibold mb-3"
                  style={{ color: theme.foreground }}
                >
                  {section.title}
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: theme.foregroundMuted }}
                >
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-12 text-center p-6 rounded-xl"
            style={{
              backgroundColor: `${accentColor}10`,
              color: theme.foregroundMuted,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            This is a prototype stub page. Full content coming soon.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
