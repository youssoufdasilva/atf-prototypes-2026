import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Users, Globe, FileText } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Calendar,
    value: 37,
    suffix: "+",
    label: "Years",
    description: "Of dedicated service since 1987",
  },
  {
    icon: Globe,
    value: 30,
    suffix: "+",
    label: "Chapters",
    description: "Active across the African continent",
  },
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Participants",
    description: "Empowered through our programs",
  },
  {
    icon: FileText,
    value: 100,
    suffix: "+",
    label: "Articles",
    description: "Published research and insights",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Impact() {
  const { version, theme, accentColor } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getVersionStyles = () => {
    switch (version) {
      case "A":
        return {
          container: "py-20",
          background: theme.backgroundSecondary,
          cardBg: theme.card,
          iconBg: `${accentColor}15`,
        };
      case "B":
        return {
          container: "py-24",
          background: theme.background,
          cardBg: theme.card,
          iconBg: `${accentColor}20`,
        };
      case "C":
        return {
          container: "py-20",
          background: theme.background,
          cardBg: theme.card,
          iconBg: `${accentColor}10`,
        };
      case "D":
        return {
          container: "py-20",
          background: theme.backgroundSecondary,
          cardBg: theme.card,
          iconBg: `${accentColor}20`,
        };
      default:
        return {
          container: "py-20",
          background: theme.backgroundSecondary,
          cardBg: theme.card,
          iconBg: `${accentColor}15`,
        };
    }
  };

  const styles = getVersionStyles();

  return (
    <section
      ref={ref}
      className={styles.container}
      style={{ backgroundColor: styles.background }}
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {version === "C" && (
            <div
              className="w-16 h-1 mx-auto mb-6"
              style={{ backgroundColor: accentColor }}
            />
          )}
          <h2
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme.foreground }}
          >
            Our Impact
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.foregroundMuted }}
          >
            For over three decades, we've been at the forefront of African
            technology development
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 md:p-8 rounded-xl text-center ${
                version === "D" ? "rounded-3xl" : ""
              }`}
              style={{
                backgroundColor: styles.cardBg,
                border: version === "C" ? `1px solid ${theme.border}` : "none",
                boxShadow:
                  version === "B"
                    ? `0 0 30px ${accentColor}10`
                    : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center ${
                  version === "D" ? "rounded-2xl" : "rounded-xl"
                }`}
                style={{ backgroundColor: styles.iconBg }}
              >
                <stat.icon
                  className="w-7 h-7"
                  style={{ color: accentColor }}
                />
              </div>
              <div
                className="text-4xl md:text-5xl font-bold font-heading mb-2"
                style={{ color: accentColor }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <div
                className="font-semibold text-lg mb-1"
                style={{ color: theme.foreground }}
              >
                {stat.label}
              </div>
              <p
                className="text-sm"
                style={{ color: theme.foregroundMuted }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
