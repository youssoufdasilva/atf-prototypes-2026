import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Eye, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const { theme, accentColor, version } = useTheme();

  const values = [
    {
      icon: Heart,
      title: "Our Mission",
      description:
        "To accelerate Africa's technological advancement by fostering innovation, building capacity, and connecting talent with opportunities.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A technologically empowered Africa leading global innovation and solving the world's most pressing challenges.",
    },
    {
      icon: BookOpen,
      title: "Our Story",
      description:
        "Founded by African technologists and diaspora leaders, ATF emerged from the belief that Africa's brightest minds can drive transformative change.",
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

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              Who We Are
            </h1>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              The African Technology Forum is a global community dedicated to
              advancing technology-driven solutions for Africa's development.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`p-8 ${version === "D" ? "rounded-3xl" : "rounded-xl"}`}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  className={`w-14 h-14 mb-4 flex items-center justify-center ${
                    version === "D" ? "rounded-2xl" : "rounded-xl"
                  }`}
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <h2
                  className="font-heading text-2xl font-semibold mb-3"
                  style={{ color: theme.foreground }}
                >
                  {item.title}
                </h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: theme.foregroundMuted }}
                >
                  {item.description}
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
