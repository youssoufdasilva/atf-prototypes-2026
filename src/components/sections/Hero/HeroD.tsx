import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function HeroD() {
  const { theme, accentColor } = useTheme();

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.backgroundSecondary} 100%)`,
      }}
    >
      {/* Organic blob shapes */}
      <motion.div
        className="absolute top-10 right-[10%] w-80 h-80 blob-shape"
        style={{ backgroundColor: `${accentColor}15` }}
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-64 h-64 blob-shape"
        style={{ backgroundColor: `${theme.accent}10` }}
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 left-[20%] w-48 h-48 blob-shape"
        style={{ backgroundColor: "#51b84710" }}
        animate={{
          borderRadius: [
            "50% 50% 30% 70% / 50% 70% 30% 50%",
            "70% 30% 50% 50% / 30% 50% 70% 50%",
            "50% 50% 30% 70% / 50% 70% 30% 50%",
          ],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute top-32 right-[30%]"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Heart className="w-6 h-6" style={{ color: accentColor }} />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              Building Africa's Future, Together
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
            <span className="relative inline-block">
              <span style={{ color: accentColor }}>Next Generation</span>
              <motion.svg
                className="absolute -bottom-5 left-0 w-full"
                viewBox="0 0 200 20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.path
                  d="M0,10 Q20,20 100,12 T200,10"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.svg>
            </span>{" "}
            of Innovators
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 leading-relaxed"
            style={{ color: theme.foregroundMuted }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We believe in the transformative power of technology and community.
            Through consulting, challenges, and capacity building, we nurture
            African innovation.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/consulting">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  color: theme.accentForeground,
                }}
              >
                Discover Our Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/challenge">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                Join the Challenge
              </Button>
            </Link>
          </motion.div>

          {/* Warm testimonial snippet */}
          <motion.div
            className="max-w-xl mx-auto p-6 rounded-3xl"
            style={{ backgroundColor: theme.card }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p
              className="italic text-lg mb-4"
              style={{ color: theme.foregroundMuted }}
            >
              "ATF has been instrumental in shaping the next generation of
              African tech leaders. Their impact is truly remarkable."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: `${accentColor}30` }}
              />
              <div className="text-left">
                <div
                  className="font-medium text-sm"
                  style={{ color: theme.foreground }}
                >
                  Innovation Leader
                </div>
                <div
                  className="text-xs"
                  style={{ color: theme.foregroundMuted }}
                >
                  ATF Partner Organization
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
