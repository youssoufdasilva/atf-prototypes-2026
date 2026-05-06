import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Newspaper, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/news")({
  component: NewsPage,
});

const newsArticles = [
  {
    id: "atf-challenge-2026-winners",
    title: "ATF Challenge 2026 Winners Announced",
    excerpt:
      "Congratulations to the innovative startups selected from over 500 applications across 20 African countries.",
    date: "January 15, 2026",
    category: "Challenge",
    featured: true,
  },
  {
    id: "kenya-chapter-launch",
    title: "ATF Kenya Chapter Officially Launches",
    excerpt:
      "Expanding our presence in East Africa with a new chapter in Nairobi focused on fintech innovation.",
    date: "January 10, 2026",
    category: "Chapters",
    featured: true,
  },
  {
    id: "partnership-google",
    title: "ATF Partners with Google for AI Training",
    excerpt:
      "New partnership will provide AI/ML training to 1,000 African developers over the next two years.",
    date: "January 5, 2026",
    category: "Partnership",
    featured: false,
  },
  {
    id: "annual-report-2025",
    title: "2025 Annual Report Released",
    excerpt:
      "Review our achievements, impact metrics, and strategic initiatives from the past year.",
    date: "December 20, 2025",
    category: "Reports",
    featured: false,
  },
  {
    id: "consulting-expansion",
    title: "ATF Consulting Expands to West Africa",
    excerpt:
      "Our consulting services now available in Ghana, Nigeria, and Senegal with local teams.",
    date: "December 15, 2025",
    category: "Consulting",
    featured: false,
  },
];

function NewsPage() {
  const { theme, accentColor, version } = useTheme();

  const featuredArticles = newsArticles.filter((a) => a.featured);
  const otherArticles = newsArticles.filter((a) => !a.featured);

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
              <Newspaper className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              News & Updates
            </h1>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Stay updated with the latest from ATF — announcements, events,
              partnerships, and impact stories.
            </p>
          </motion.div>

          {/* Featured Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {featuredArticles.map((article) => (
              <Link key={article.id} to="/news/$articleId" params={{ articleId: article.id }}>
                <article
                  className={`p-6 h-full ${version === "D" ? "rounded-2xl" : "rounded-xl"} hover:shadow-lg transition-shadow cursor-pointer`}
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                  }}
                >
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
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: theme.foregroundMuted }}
                  >
                    {article.excerpt}
                  </p>
                  <div
                    className="flex items-center justify-between text-sm"
                    style={{ color: theme.foregroundMuted }}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ color: accentColor }}
                    >
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </motion.div>

          {/* Other Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {otherArticles.map((article) => (
              <Link key={article.id} to="/news/$articleId" params={{ articleId: article.id }}>
                <article
                  className={`p-5 ${version === "D" ? "rounded-xl" : "rounded-lg"} hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4`}
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                        }}
                      >
                        {article.category}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: theme.foregroundMuted }}
                      >
                        {article.date}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-semibold"
                      style={{ color: theme.foreground }}
                    >
                      {article.title}
                    </h3>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 shrink-0"
                    style={{ color: theme.foregroundMuted }}
                  />
                </article>
              </Link>
            ))}
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
