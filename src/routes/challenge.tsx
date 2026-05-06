import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Calendar, Award, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/challenge")({
  component: ChallengePage,
});

function ChallengePage() {
  const { theme, accentColor, version } = useTheme();

  const timeline = [
    { phase: "Registration Opens", date: "January 2026" },
    { phase: "Submission Deadline", date: "March 2026" },
    { phase: "Judging Period", date: "April 2026" },
    { phase: "Winners Announced", date: "May 2026" },
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
              style={{ backgroundColor: "#fcba2f20" }}
            >
              <Trophy className="w-8 h-8" style={{ color: "#fcba2f" }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              ATF Challenge
            </h1>

            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Annual innovation challenge empowering young Africans to develop
              technology solutions for local problems.
            </p>
          </motion.div>

          {/* Challenge image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`mb-8 overflow-hidden ${
              version === "D" ? "rounded-3xl" : "rounded-xl"
            }`}
          >
            <img
              src="/atf-assets/ATF-Challenge-Winners-2024-2025.jpg"
              alt="ATF Challenge Winners 2024-2025"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Timeline */}
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
              className="font-heading text-xl font-semibold mb-6 flex items-center gap-2"
              style={{ color: theme.foreground }}
            >
              <Calendar className="w-5 h-5" style={{ color: accentColor }} />
              2026 Challenge Timeline
            </h2>
            <div className="relative">
              <div
                className="absolute left-4 top-2 bottom-2 w-0.5"
                style={{ backgroundColor: theme.border }}
              />
              <ul className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.li
                    key={item.phase}
                    className="flex items-center gap-4 pl-10 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div
                      className="absolute left-2 w-4 h-4 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: theme.foreground }}
                      >
                        {item.phase}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: theme.foregroundMuted }}
                      >
                        {item.date}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
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
              <Award className="w-8 h-8 mb-3" style={{ color: "#fcba2f" }} />
              <h3
                className="font-heading font-semibold mb-2"
                style={{ color: theme.foreground }}
              >
                Prizes & Recognition
              </h3>
              <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                Winners receive funding, mentorship, and opportunities to scale
                their solutions across Africa.
              </p>
            </div>
            <div
              className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
              style={{
                backgroundColor: theme.backgroundSecondary,
                border: `1px solid ${theme.border}`,
              }}
            >
              <Lightbulb className="w-8 h-8 mb-3" style={{ color: "#fcba2f" }} />
              <h3
                className="font-heading font-semibold mb-2"
                style={{ color: theme.foreground }}
              >
                Focus Areas
              </h3>
              <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                Healthcare, Agriculture, Education, Climate, and Financial
                Inclusion.
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
