import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import type { CustomThemeConfig } from "@/lib/themes";

interface HeroCustomProps {
  config: CustomThemeConfig;
}

// Background components
function PatternsBackground({ accentColor }: { accentColor: string }) {
  return (
    <>
      <div className="absolute inset-0 opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="kentePatternCustom"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="80" height="10" fill="#51b847" />
              <rect x="0" y="20" width="80" height="10" fill="#fcba2f" />
              <rect x="0" y="40" width="80" height="10" fill="#ee4035" />
              <rect x="0" y="60" width="80" height="10" fill={accentColor} />
              <rect x="0" y="0" width="8" height="80" fill="#231f20" opacity="0.3" />
              <rect x="20" y="0" width="4" height="80" fill="#51b847" opacity="0.5" />
              <rect x="40" y="0" width="8" height="80" fill="#fcba2f" opacity="0.5" />
              <rect x="60" y="0" width="4" height="80" fill="#ee4035" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kentePatternCustom)" />
        </svg>
      </div>
      {/* Animated shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-32 h-32 rounded-full"
        style={{ backgroundColor: `${accentColor}20` }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function GradientBackground({ accentColor, isDark }: { accentColor: string; isDark: boolean }) {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)"
            : `linear-gradient(135deg, #f8f9fa 0%, #f0f0f5 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${accentColor}15 0%, transparent 50%),
                       radial-gradient(ellipse at 30% 70%, #8b5cf615 0%, transparent 50%)`,
        }}
      />
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: accentColor,
              opacity: 0.3,
            }}
            animate={{ y: [0, -100, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px),
                           linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
}

function PhotoBackground({ background, foreground }: { background: string; foreground: string }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/atf-assets/atf-award-ceremony-2024.jpg')` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${background}f5 0%, ${background}e0 50%, ${background}90 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${foreground} 0, ${foreground} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      />
    </>
  );
}

function OrganicBackground({
  accentColor,
  background,
  backgroundSecondary,
}: {
  accentColor: string;
  background: string;
  backgroundSecondary: string;
}) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${background} 0%, ${backgroundSecondary} 100%)`,
        }}
      />
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
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-64 h-64 blob-shape"
        style={{ backgroundColor: `${accentColor}10` }}
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-32 right-[30%]"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Heart className="w-6 h-6" style={{ color: accentColor }} />
        </div>
      </motion.div>
    </>
  );
}

// Layout components
function CenteredLayout({
  foreground,
  foregroundMuted,
  accentColor,
  accentForeground,
}: {
  foreground: string;
  foregroundMuted: string;
  accentColor: string;
  accentForeground: string;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          Empowering African Innovation
        </span>
      </motion.div>

      <motion.h1
        className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        style={{ color: foreground }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Empowering Africa's{" "}
        <span style={{ color: accentColor }}>Next Generation</span> of Innovators
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mb-8 leading-relaxed"
        style={{ color: foregroundMuted }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        The African Technology Forum champions technology-driven solutions for
        Africa's development challenges through consulting, innovation
        challenges, and capacity building.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link to="/consulting">
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            style={{ backgroundColor: accentColor, color: accentForeground }}
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
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Join ATF Challenge
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

function SplitLayout({
  foreground,
  foregroundMuted,
  accentColor,
  accentForeground,
  card,
  border,
}: {
  foreground: string;
  foregroundMuted: string;
  accentColor: string;
  accentForeground: string;
  card: string;
  border: string;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-1 mb-8" style={{ backgroundColor: accentColor }} />
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
          style={{ color: foreground }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Empowering Africa's Next Generation of Innovators
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
          style={{ color: foregroundMuted }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          For over three decades, we've championed technology-driven solutions
          for Africa's development challenges through expert consulting,
          innovation challenges, and comprehensive capacity building initiatives.
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
              style={{ backgroundColor: accentColor, color: accentForeground }}
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
              style={{ borderColor: border, color: foreground }}
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
          style={{ backgroundColor: card, borderColor: border, border: "1px solid" }}
        >
          <h3 className="font-heading text-lg font-semibold mb-6" style={{ color: foreground }}>
            Our Impact in Numbers
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "37+", label: "Years of Impact", desc: "Since 1987" },
              { value: "30+", label: "Active Chapters", desc: "Across Africa" },
              { value: "1,000+", label: "Participants", desc: "And growing" },
              { value: "100+", label: "Publications", desc: "Research & articles" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <div
                  className="text-3xl font-bold font-heading mb-1"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: foreground }}>
                  {stat.label}
                </div>
                <div className="text-xs" style={{ color: foregroundMuted }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FullWidthLayout({
  foreground,
  foregroundMuted,
  accentColor,
}: {
  foreground: string;
  foregroundMuted: string;
  accentColor: string;
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-6 justify-center"
      >
        <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
        <span
          className="text-sm font-medium tracking-wide uppercase"
          style={{ color: accentColor }}
        >
          African Technology Forum
        </span>
      </motion.div>

      <motion.h1
        className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-center"
        style={{ color: foreground }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Driving Technological Transformation Across Africa
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mb-8 leading-relaxed text-center max-w-3xl mx-auto"
        style={{ color: foregroundMuted }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Through innovative consulting, breakthrough challenges, and next-gen
        capacity building programs, we empower Africa's future tech leaders.
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
            className="text-lg px-8 py-6 group"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, #8b5cf6)`,
              color: "#000",
            }}
          >
            Explore Our Work
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
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
              backgroundColor: "transparent",
            }}
          >
            Join ATF Challenge
          </Button>
        </Link>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {[
          { value: "37+", label: "Years" },
          { value: "30+", label: "Chapters" },
          { value: "1000+", label: "Participants" },
          { value: "100+", label: "Articles" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: `${accentColor}08` }}
          >
            <div
              className="text-3xl font-bold font-heading"
              style={{ color: accentColor }}
            >
              {stat.value}
            </div>
            <div className="text-sm" style={{ color: foregroundMuted }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function HeroCustom({ config }: HeroCustomProps) {
  const { theme, accentColor } = useTheme();

  const renderBackground = () => {
    switch (config.heroBackground) {
      case "patterns":
        return <PatternsBackground accentColor={accentColor} />;
      case "gradient":
        return <GradientBackground accentColor={accentColor} isDark={config.isDark} />;
      case "photo":
        return <PhotoBackground background={theme.background} foreground={theme.foreground} />;
      case "organic":
        return (
          <OrganicBackground
            accentColor={accentColor}
            background={theme.background}
            backgroundSecondary={theme.backgroundSecondary}
          />
        );
      default:
        return <PatternsBackground accentColor={accentColor} />;
    }
  };

  const renderLayout = () => {
    const layoutProps = {
      foreground: theme.foreground,
      foregroundMuted: theme.foregroundMuted,
      accentColor: accentColor,
      accentForeground: theme.accentForeground,
      card: theme.card,
      border: theme.border,
    };

    switch (config.heroLayout) {
      case "centered":
        return <CenteredLayout {...layoutProps} />;
      case "split":
        return <SplitLayout {...layoutProps} />;
      case "fullWidth":
        return <FullWidthLayout {...layoutProps} />;
      default:
        return <CenteredLayout {...layoutProps} />;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {renderBackground()}
      <div className="relative z-10 container mx-auto px-6 py-20">{renderLayout()}</div>
    </section>
  );
}
