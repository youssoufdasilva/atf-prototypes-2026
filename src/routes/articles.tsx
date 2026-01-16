import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/articles")({
  component: ArticlesPage,
});

function ArticlesPage() {
  const { theme, accentColor, version } = useTheme();

  const articles = [
    {
      title: "The Future of AI in African Healthcare",
      author: "Dr. Amara Okafor",
      date: "January 2026",
      category: "Healthcare",
    },
    {
      title: "Building Sustainable Tech Ecosystems",
      author: "Kwame Mensah",
      date: "December 2025",
      category: "Ecosystem",
    },
    {
      title: "Digital Transformation in Government Services",
      author: "Fatima Hassan",
      date: "November 2025",
      category: "GovTech",
    },
    {
      title: "Youth Innovation: Africa's Greatest Asset",
      author: "Chidi Eze",
      date: "October 2025",
      category: "Innovation",
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
              Articles
            </h1>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Insights, analysis, and thought leadership from ATF's network of
              technology experts and innovators.
            </p>
          </motion.div>

          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"} cursor-pointer hover:shadow-lg transition-shadow`}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full mb-3 inline-block"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      {article.category}
                    </span>
                    <h2
                      className="font-heading text-xl font-semibold mb-2"
                      style={{ color: theme.foreground }}
                    >
                      {article.title}
                    </h2>
                    <div
                      className="flex items-center gap-4 text-sm"
                      style={{ color: theme.foregroundMuted }}
                    >
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
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
