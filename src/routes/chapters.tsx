import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Building, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/chapters")({
  component: ChaptersPage,
});

const chapters = [
  { country: "Ghana", flag: "\ud83c\uddec\ud83c\udded", count: 8 },
  { country: "Nigeria", flag: "\ud83c\uddf3\ud83c\uddec", count: 12 },
  { country: "Kenya", flag: "\ud83c\uddf0\ud83c\uddea", count: 6 },
  { country: "South Africa", flag: "\ud83c\uddff\ud83c\udde6", count: 4 },
];

function ChaptersPage() {
  const { theme, accentColor, version } = useTheme();

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
              style={{ backgroundColor: "#ee403520" }}
            >
              <MapPin className="w-8 h-8" style={{ color: "#ee4035" }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              ATF Chapters
            </h1>

            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              A growing network of chapters across Africa fostering local tech
              communities and capacity building.
            </p>
          </motion.div>

          {/* Chapter stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.country}
                className={`p-6 text-center ${
                  version === "D" ? "rounded-2xl" : "rounded-xl"
                }`}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className="text-3xl mb-2 block">{chapter.flag}</span>
                <p
                  className="font-heading font-bold text-2xl"
                  style={{ color: accentColor }}
                >
                  {chapter.count}
                </p>
                <p
                  className="text-sm"
                  style={{ color: theme.foregroundMuted }}
                >
                  {chapter.country}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Chapter activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
              Chapter Activities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-3" style={{ color: accentColor }} />
                <h3
                  className="font-medium mb-1"
                  style={{ color: theme.foreground }}
                >
                  Community Building
                </h3>
                <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                  Regular meetups and networking events
                </p>
              </div>
              <div className="text-center">
                <Building className="w-8 h-8 mx-auto mb-3" style={{ color: accentColor }} />
                <h3
                  className="font-medium mb-1"
                  style={{ color: theme.foreground }}
                >
                  Workshops
                </h3>
                <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                  Hands-on technical training sessions
                </p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-3" style={{ color: accentColor }} />
                <h3
                  className="font-medium mb-1"
                  style={{ color: theme.foreground }}
                >
                  Mentorship
                </h3>
                <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                  Connecting with industry experts
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
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
              <h3
                className="font-heading font-semibold mb-2"
                style={{ color: theme.foreground }}
              >
                Want to Start a Chapter?
              </h3>
              <p className="text-sm mb-4" style={{ color: theme.foregroundMuted }}>
                We're always looking to expand our network. If you're passionate
                about technology and want to make a difference in your community,
                reach out to start a chapter.
              </p>
              <Button
                style={{
                  backgroundColor: accentColor,
                  color: theme.accentForeground,
                }}
              >
                Apply to Start a Chapter
              </Button>
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
