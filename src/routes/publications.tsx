import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Library, FileText, BookOpen, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/publications")({
  component: PublicationsPage,
});

function PublicationsPage() {
  const { theme, accentColor, version } = useTheme();

  const categories = [
    {
      icon: Newspaper,
      title: "Articles",
      description: "Opinion pieces, analysis, and thought leadership",
      count: 45,
      href: "/articles",
    },
    {
      icon: BookOpen,
      title: "Research Papers",
      description: "In-depth studies and academic research",
      count: 12,
      href: "/research",
    },
    {
      icon: FileText,
      title: "Reports",
      description: "Annual reports and ecosystem analyses",
      count: 8,
    },
    {
      icon: Library,
      title: "Case Studies",
      description: "Success stories and implementation guides",
      count: 20,
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
              <Library className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
              style={{ color: theme.foreground }}
            >
              Publications
            </h1>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              Explore our library of publications, from thought leadership
              articles to comprehensive research reports.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => {
              const content = (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"} hover:shadow-lg transition-shadow cursor-pointer`}
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className={`w-12 h-12 mb-4 flex items-center justify-center ${
                      version === "D" ? "rounded-full" : "rounded-lg"
                    }`}
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <category.icon
                      className="w-6 h-6"
                      style={{ color: accentColor }}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2
                        className="font-heading text-lg font-semibold mb-1"
                        style={{ color: theme.foreground }}
                      >
                        {category.title}
                      </h2>
                      <p
                        className="text-sm"
                        style={{ color: theme.foregroundMuted }}
                      >
                        {category.description}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      {category.count}
                    </span>
                  </div>
                </motion.div>
              );

              if (category.href) {
                return (
                  <Link key={category.title} to={category.href}>
                    {content}
                  </Link>
                );
              }
              return content;
            })}
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
