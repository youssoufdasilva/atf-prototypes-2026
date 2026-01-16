import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function HeroC() {
  const { theme, accentColor } = useTheme();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/atf-assets/atf-award-ceremony-2024.jpg')`,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${theme.background}f5 0%, ${theme.background}e0 50%, ${theme.background}90 100%)`,
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${theme.foreground} 0,
            ${theme.foreground} 1px,
            transparent 0,
            transparent 50%
          )`,
          backgroundSize: "10px 10px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="w-20 h-1 mb-8"
                style={{ backgroundColor: accentColor }}
              />
            </motion.div>

            <motion.p
              className="text-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: accentColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              African Technology Forum
            </motion.p>

            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6"
              style={{ color: theme.foreground }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering Africa's Next Generation of Innovators
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
              style={{ color: theme.foregroundMuted }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              For over three decades, we've championed technology-driven
              solutions for Africa's development challenges through expert
              consulting, innovation challenges, and comprehensive capacity
              building initiatives.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/consulting">
                <Button
                  size="lg"
                  className="text-base px-6 py-5"
                  style={{
                    backgroundColor: accentColor,
                    color: theme.accentForeground,
                  }}
                >
                  Our Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/challenge">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-6 py-5"
                  style={{
                    borderColor: theme.border,
                    color: theme.foreground,
                  }}
                >
                  Learn About ATF Challenge
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats card */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              className="rounded-xl p-8 shadow-lg"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                border: "1px solid",
              }}
            >
              <h3
                className="font-heading text-lg font-semibold mb-6"
                style={{ color: theme.foreground }}
              >
                Our Impact in Numbers
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    value: "37+",
                    label: "Years of Impact",
                    desc: "Since 1987",
                  },
                  {
                    value: "30+",
                    label: "Active Chapters",
                    desc: "Across Africa",
                  },
                  {
                    value: "1,000+",
                    label: "Participants",
                    desc: "And growing",
                  },
                  {
                    value: "100+",
                    label: "Publications",
                    desc: "Research & articles",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4">
                    <div
                      className="text-3xl font-bold font-heading mb-1"
                      style={{ color: accentColor }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: theme.foreground }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: theme.foregroundMuted }}
                    >
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
