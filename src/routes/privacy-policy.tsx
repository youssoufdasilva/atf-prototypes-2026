import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { theme, accentColor, version } = useTheme();

  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect ATF and our users.",
    },
    {
      title: "Information Sharing",
      content:
        "We do not share your personal information with third parties except as described in this policy or with your consent.",
    },
    {
      title: "Data Security",
      content:
        "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@atfglobal.org.",
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
              <Shield className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              Privacy Policy
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
              Your privacy is important to us. This Privacy Policy explains how
              the African Technology Forum collects, uses, and protects your
              information.
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
