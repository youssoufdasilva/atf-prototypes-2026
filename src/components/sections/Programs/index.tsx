import { useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Briefcase, Trophy, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface Program {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  color: string;
}

const programs: Program[] = [
  {
    id: "consulting",
    icon: Briefcase,
    title: "ATF Consulting",
    subtitle: "Expert Technology Advisory",
    description:
      "Strategic technology consulting for governments, NGOs, and enterprises driving digital transformation across Africa.",
    link: "/consulting",
    color: "#51b847",
  },
  {
    id: "challenge",
    icon: Trophy,
    title: "ATF Challenge",
    subtitle: "Innovation Competition",
    description:
      "Annual innovation challenge empowering young Africans to develop technology solutions for local problems.",
    link: "/challenge",
    color: "#fcba2f",
  },
  {
    id: "chapters",
    icon: MapPin,
    title: "ATF Chapters",
    subtitle: "Pan-African Network",
    description:
      "A growing network of chapters across Africa fostering local tech communities and capacity building.",
    link: "/chapters",
    color: "#ee4035",
  },
];

function ProgramCard({ program, variant }: { program: Program; variant: "A" | "B" | "C" | "D" }) {
  const { theme, accentColor } = useTheme();

  const cardStyles = {
    A: "rounded-xl p-6 md:p-8",
    B: "rounded-lg p-6 md:p-8 border",
    C: "rounded-lg p-6 md:p-8 border",
    D: "rounded-3xl p-6 md:p-8",
  };

  return (
    <motion.div
      className={`h-full flex flex-col ${cardStyles[variant]}`}
      style={{
        backgroundColor: theme.card,
        borderColor: variant === "B" || variant === "C" ? theme.border : undefined,
        boxShadow:
          variant === "B"
            ? `0 0 30px ${accentColor}08`
            : "0 4px 20px rgba(0,0,0,0.05)",
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div
        className={`w-14 h-14 mb-6 flex items-center justify-center ${
          variant === "D" ? "rounded-2xl" : "rounded-xl"
        }`}
        style={{ backgroundColor: `${program.color}15` }}
      >
        <program.icon className="w-7 h-7" style={{ color: program.color }} />
      </div>

      <h3
        className="font-heading text-xl font-bold mb-2"
        style={{ color: theme.foreground }}
      >
        {program.title}
      </h3>
      <p
        className="text-sm font-medium mb-3"
        style={{ color: accentColor }}
      >
        {program.subtitle}
      </p>
      <p
        className="text-sm leading-relaxed mb-6 flex-grow"
        style={{ color: theme.foregroundMuted }}
      >
        {program.description}
      </p>

      <Link to={program.link as "/consulting" | "/challenge" | "/chapters"}>
        <Button
          variant="ghost"
          className="group p-0 h-auto"
          style={{ color: accentColor }}
        >
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  );
}

function CarouselView({ variant }: { variant: "A" | "D" }) {
  const { theme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="flex-none w-[85%] md:w-[45%] lg:w-[32%]"
            >
              <ProgramCard program={program} variant={variant} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className={variant === "D" ? "rounded-full" : ""}
          style={{ borderColor: theme.border }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: theme.foreground }} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className={variant === "D" ? "rounded-full" : ""}
          style={{ borderColor: theme.border }}
        >
          <ChevronRight className="w-5 h-5" style={{ color: theme.foreground }} />
        </Button>
      </div>
    </div>
  );
}

function GridView({ variant }: { variant: "B" | "C" }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {programs.map((program, index) => (
        <motion.div
          key={program.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProgramCard program={program} variant={variant} />
        </motion.div>
      ))}
    </div>
  );
}

export function Programs() {
  const { version, theme, accentColor } = useTheme();

  const useCarousel = version === "A" || version === "D";

  return (
    <section
      className="py-20"
      style={{ backgroundColor: theme.background }}
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
            Our Programs
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.foregroundMuted }}
          >
            Three flagship initiatives driving technology innovation and capacity
            building across Africa
          </p>
        </motion.div>

        {/* Programs display */}
        {useCarousel ? (
          <CarouselView variant={version as "A" | "D"} />
        ) : (
          <GridView variant={version as "B" | "C"} />
        )}
      </div>
    </section>
  );
}
