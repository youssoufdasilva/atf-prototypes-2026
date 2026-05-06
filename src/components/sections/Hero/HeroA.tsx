import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function HeroA() {
  const { theme, accentColor } = useTheme();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Kente-inspired pattern background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="kentePattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Horizontal stripes */}
              <rect x="0" y="0" width="80" height="10" fill="#51b847" />
              <rect x="0" y="20" width="80" height="10" fill="#fcba2f" />
              <rect x="0" y="40" width="80" height="10" fill="#ee4035" />
              <rect x="0" y="60" width="80" height="10" fill={accentColor} />
              {/* Vertical accents */}
              <rect
                x="0"
                y="0"
                width="8"
                height="80"
                fill="#231f20"
                opacity="0.3"
              />
              <rect
                x="20"
                y="0"
                width="4"
                height="80"
                fill="#51b847"
                opacity="0.5"
              />
              <rect
                x="40"
                y="0"
                width="8"
                height="80"
                fill="#fcba2f"
                opacity="0.5"
              />
              <rect
                x="60"
                y="0"
                width="4"
                height="80"
                fill="#ee4035"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kentePattern)" />
        </svg>
      </div>

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-32 h-32 rounded-full"
        style={{ backgroundColor: `${accentColor}20` }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-[5%] w-24 h-24"
        style={{
          backgroundColor: `${theme.accent}30`,
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 left-[15%] w-16 h-16 rotate-45"
        style={{ backgroundColor: "#fcba2f30" }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              Empowering African Innovation
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ color: theme.foreground }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empowering Africa's{" "}
            <span style={{ color: accentColor }}>Next Generation</span> of
            Innovators
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ color: theme.foregroundMuted }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The African Technology Forum champions technology-driven solutions
            for Africa's development challenges through consulting, innovation
            challenges, and capacity building.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/consulting">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                style={{
                  backgroundColor: accentColor,
                  color: theme.accentForeground,
                }}
              >
                Explore Our Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/challenge">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                Join ATF Challenge
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
