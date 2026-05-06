import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  const { theme, accentColor, version } = useTheme();

  const teamMembers = [
    { name: "Leadership Team", count: 5 },
    { name: "Advisory Board", count: 8 },
    { name: "Regional Directors", count: 12 },
    { name: "Program Managers", count: 15 },
    { name: "Community Contributors", count: "100+" },
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
              <Users className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              The Team & Contributors
            </h1>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Meet the passionate individuals driving ATF's mission to transform
              Africa through technology.
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
              Our Team Structure
            </h2>
            <div className="space-y-4">
              {teamMembers.map((group, index) => (
                <motion.div
                  key={group.name}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                  style={{ borderColor: theme.border }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span style={{ color: theme.foreground }}>{group.name}</span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    {group.count}
                  </span>
                </motion.div>
              ))}
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
