import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/news/$articleId")({
  component: NewsArticlePage,
});

const newsArticles: Record<
  string,
  {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    content: string[];
  }
> = {
  "atf-challenge-2026-winners": {
    title: "ATF Challenge 2026 Winners Announced",
    excerpt:
      "Congratulations to the innovative startups selected from over 500 applications across 20 African countries.",
    date: "January 15, 2026",
    category: "Challenge",
    content: [
      "The African Technology Forum is proud to announce the winners of the 2026 ATF Challenge. This year's competition saw unprecedented participation with over 500 applications from 20 African countries.",
      "The winning startups demonstrated exceptional innovation in solving critical challenges across healthcare, agriculture, education, and financial inclusion.",
      "Each winner will receive seed funding, mentorship from industry experts, and access to ATF's global network of partners and investors.",
    ],
  },
  "kenya-chapter-launch": {
    title: "ATF Kenya Chapter Officially Launches",
    excerpt:
      "Expanding our presence in East Africa with a new chapter in Nairobi focused on fintech innovation.",
    date: "January 10, 2026",
    category: "Chapters",
    content: [
      "ATF is excited to announce the official launch of our Kenya Chapter, headquartered in Nairobi's vibrant tech hub.",
      "The Kenya Chapter will focus on fintech innovation, mobile technology, and supporting the growing ecosystem of tech entrepreneurs in East Africa.",
      "Local leadership includes experienced technologists and entrepreneurs with deep roots in the Kenyan tech community.",
    ],
  },
  "partnership-google": {
    title: "ATF Partners with Google for AI Training",
    excerpt:
      "New partnership will provide AI/ML training to 1,000 African developers over the next two years.",
    date: "January 5, 2026",
    category: "Partnership",
    content: [
      "ATF has partnered with Google to launch an ambitious AI/ML training program targeting 1,000 African developers.",
      "The program will provide hands-on training, certifications, and access to cloud resources for building AI-powered solutions.",
      "Participants will work on real-world projects addressing African challenges in healthcare, agriculture, and education.",
    ],
  },
  "annual-report-2025": {
    title: "2025 Annual Report Released",
    excerpt:
      "Review our achievements, impact metrics, and strategic initiatives from the past year.",
    date: "December 20, 2025",
    category: "Reports",
    content: [
      "Our 2025 Annual Report is now available, highlighting key achievements and impact across all ATF programs.",
      "Key highlights include: 50+ consulting engagements, 200+ Challenge alumni supported, and 5 new country chapters launched.",
      "The report also outlines our strategic priorities for 2026 and beyond.",
    ],
  },
  "consulting-expansion": {
    title: "ATF Consulting Expands to West Africa",
    excerpt:
      "Our consulting services now available in Ghana, Nigeria, and Senegal with local teams.",
    date: "December 15, 2025",
    category: "Consulting",
    content: [
      "ATF Consulting has expanded its presence across West Africa with dedicated teams in Ghana, Nigeria, and Senegal.",
      "Our local consultants bring deep expertise in digital transformation, technology strategy, and capacity building.",
      "This expansion enables us to better serve governments, enterprises, and development organizations in the region.",
    ],
  },
};

function NewsArticlePage() {
  const { theme, accentColor, version } = useTheme();
  const { articleId } = Route.useParams();
  const article = newsArticles[articleId];

  if (!article) {
    return (
      <div
        className="min-h-[80vh] py-20 flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="text-center">
          <h1
            className="font-heading text-4xl font-bold mb-4"
            style={{ color: theme.foreground }}
          >
            Article Not Found
          </h1>
          <p className="mb-8" style={{ color: theme.foregroundMuted }}>
            This article doesn't exist or has been removed.
          </p>
          <Link to="/news">
            <Button
              style={{
                backgroundColor: accentColor,
                color: theme.accentForeground,
              }}
            >
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[80vh] py-20"
      style={{ backgroundColor: theme.background }}
    >
      <div className="container mx-auto px-6">
        <Link to="/news">
          <Button
            variant="ghost"
            className="mb-8 gap-2"
            style={{ color: theme.foregroundMuted }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Button>
        </Link>

        <article className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {article.category}
            </span>

            <h1
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              {article.title}
            </h1>

            <div
              className="flex items-center gap-4 mb-8 pb-8 border-b"
              style={{ borderColor: theme.border }}
            >
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.foregroundMuted }}
              >
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  style={{ color: theme.foregroundMuted }}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  style={{ color: theme.foregroundMuted }}
                >
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose max-w-none"
          >
            <p
              className="text-xl leading-relaxed mb-6"
              style={{ color: theme.foreground }}
            >
              {article.excerpt}
            </p>

            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed mb-4"
                style={{ color: theme.foregroundMuted }}
              >
                {paragraph}
              </p>
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
        </article>
      </div>
    </div>
  );
}
