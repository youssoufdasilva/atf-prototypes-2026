import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, CheckCircle, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/consulting")({
  component: ConsultingPage,
});

function ConsultingPage() {
  const { theme, accentColor, version } = useTheme();

  const services = [
    "Digital Transformation Strategy",
    "Technology Assessment & Advisory",
    "Capacity Building Programs",
    "Innovation Ecosystem Development",
  ];

  return (
    <div className="min-h-[80vh] py-20" style={{ backgroundColor: theme.background }}>
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

        <div className="max-w-4xl">
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
              <Briefcase className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              ATF Consulting
            </h1>

            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Strategic technology consulting for governments, NGOs, and
              enterprises driving digital transformation across Africa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-8 ${version === "D" ? "rounded-3xl" : "rounded-xl"}`}
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
            }}
          >
            <h2
              className="font-heading text-xl font-semibold mb-6"
              style={{ color: theme.foreground }}
            >
              Our Services
            </h2>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color: accentColor }} />
                  <span style={{ color: theme.foreground }}>{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mt-8 grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
              style={{
                backgroundColor: theme.backgroundSecondary,
                border: `1px solid ${theme.border}`,
              }}
            >
              <Users className="w-8 h-8 mb-3" style={{ color: accentColor }} />
              <h3
                className="font-heading font-semibold mb-2"
                style={{ color: theme.foreground }}
              >
                Expert Team
              </h3>
              <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                Our consultants bring decades of experience in African technology
                development.
              </p>
            </div>
            <div
              className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
              style={{
                backgroundColor: theme.backgroundSecondary,
                border: `1px solid ${theme.border}`,
              }}
            >
              <Target className="w-8 h-8 mb-3" style={{ color: accentColor }} />
              <h3
                className="font-heading font-semibold mb-2"
                style={{ color: theme.foreground }}
              >
                Tailored Solutions
              </h3>
              <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                Every engagement is customized to meet your organization's unique
                needs and context.
              </p>
            </div>
          </motion.div>

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
