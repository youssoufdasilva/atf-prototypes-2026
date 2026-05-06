import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
});

function ResearchPage() {
  const { theme, accentColor, version } = useTheme();

  const papers = [
    {
      title: "State of African Tech Ecosystems 2025",
      type: "Annual Report",
      pages: 120,
      year: 2025,
    },
    {
      title: "Digital Infrastructure Gap Analysis",
      type: "Research Paper",
      pages: 45,
      year: 2025,
    },
    {
      title: "AI Readiness in Sub-Saharan Africa",
      type: "White Paper",
      pages: 32,
      year: 2024,
    },
    {
      title: "Funding Landscape for African Startups",
      type: "Market Analysis",
      pages: 58,
      year: 2024,
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
              <BookOpen className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              Research Papers
            </h1>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              In-depth research and analysis on technology trends, opportunities,
              and challenges across the African continent.
            </p>
          </motion.div>

          <div className="space-y-4">
            {papers.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
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
                      {paper.type}
                    </span>
                    <h2
                      className="font-heading text-xl font-semibold mb-2"
                      style={{ color: theme.foreground }}
                    >
                      {paper.title}
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: theme.foregroundMuted }}
                    >
                      {paper.pages} pages • {paper.year}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      style={{ color: theme.foregroundMuted }}
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      style={{ color: theme.foregroundMuted }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
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
