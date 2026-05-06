import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));
}

export function HeroB() {
  const { theme, accentColor } = useTheme();
  const [particles] = useState(() => generateParticles(40));

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-tech">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${accentColor}15 0%, transparent 50%),
                       radial-gradient(ellipse at 30% 70%, #8b5cf615 0%, transparent 50%)`,
        }}
      />

      {/* Animated particles */}
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
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
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

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: `${accentColor}10` }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl"
        style={{ backgroundColor: "#8b5cf620" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
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
            className="flex items-center gap-2 mb-6"
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
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ color: theme.foreground }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empowering Africa's{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accentColor}, #8b5cf6)`,
              }}
            >
              Next Generation
            </span>{" "}
            of Innovators
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ color: theme.foregroundMuted }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Driving technological transformation across Africa through
            innovative consulting, breakthrough challenges, and next-gen
            capacity building programs.
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

          {/* Stats preview */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
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
                <div
                  className="text-sm"
                  style={{ color: theme.foregroundMuted }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
