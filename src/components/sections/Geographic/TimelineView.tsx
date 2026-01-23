import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Calendar, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface TimelineEvent {
  id: string;
  year: number;
  country: string;
  flag: string;
  title: string;
  description: string;
  chapters: number;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "ghana",
    year: 1987,
    country: "Ghana",
    flag: "\ud83c\uddec\ud83c\udded",
    title: "ATF Founded",
    description: "The African Technology Forum was founded in Ghana, establishing our first chapter and laying the groundwork for continental expansion.",
    chapters: 8,
  },
  {
    id: "nigeria",
    year: 2005,
    country: "Nigeria",
    flag: "\ud83c\uddf3\ud83c\uddec",
    title: "Nigeria Expansion",
    description: "Expanded to Nigeria with strong university partnerships, rapidly growing to become our largest network of chapters.",
    chapters: 12,
  },
  {
    id: "kenya",
    year: 2012,
    country: "Kenya",
    flag: "\ud83c\uddf0\ud83c\uddea",
    title: "East Africa Hub",
    description: "Established presence in Kenya, East Africa's tech hub, focusing on mobile-first innovation solutions.",
    chapters: 6,
  },
  {
    id: "south-africa",
    year: 2018,
    country: "South Africa",
    flag: "\ud83c\uddff\ud83c\udde6",
    title: "Southern Africa",
    description: "Launched in South Africa, connecting established tech industry with emerging innovation and startups.",
    chapters: 4,
  },
  {
    id: "present",
    year: 2024,
    country: "Pan-African",
    flag: "\ud83c\udf0d",
    title: "Continental Impact",
    description: "Today, ATF operates across multiple African nations, impacting thousands of innovators and entrepreneurs.",
    chapters: 30,
  },
];

export function TimelineView() {
  const { theme, accentColor } = useTheme();
  const [activeEvent, setActiveEvent] = useState<string>("ghana");

  const selectedEvent = timelineEvents.find((e) => e.id === activeEvent);
  const activeIndex = timelineEvents.findIndex((e) => e.id === activeEvent);

  return (
    <div className="space-y-12">
      {/* Timeline Bar */}
      <div className="relative">
        {/* Background line */}
        <div
          className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: theme.border }}
        />

        {/* Progress line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: accentColor }}
          initial={false}
          animate={{
            width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Timeline points */}
        <div className="relative flex justify-between">
          {timelineEvents.map((event, index) => {
            const isActive = event.id === activeEvent;
            const isPast = index <= activeIndex;

            return (
              <motion.button
                key={event.id}
                className="flex flex-col items-center gap-3 group focus:outline-none"
                onClick={() => setActiveEvent(event.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Year */}
                <motion.span
                  className="text-sm font-medium"
                  style={{
                    color: isActive ? accentColor : theme.foregroundMuted,
                  }}
                  animate={{ fontWeight: isActive ? 600 : 400 }}
                >
                  {event.year}
                </motion.span>

                {/* Point */}
                <motion.div
                  className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-lg border-4 transition-colors"
                  style={{
                    backgroundColor: isPast ? accentColor : theme.card,
                    borderColor: isPast ? accentColor : theme.border,
                    boxShadow: isActive
                      ? `0 0 20px ${accentColor}40`
                      : "none",
                  }}
                  animate={{
                    scale: isActive ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={isPast ? "" : "grayscale opacity-50"}>
                    {event.flag}
                  </span>
                </motion.div>

                {/* Country name (mobile hidden) */}
                <span
                  className="hidden md:block text-xs"
                  style={{
                    color: isActive ? theme.foreground : theme.foregroundMuted,
                  }}
                >
                  {event.country}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Event Details Card */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon/Flag */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                {selectedEvent.flag}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {selectedEvent.year}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      color: theme.foregroundMuted,
                    }}
                  >
                    <Building className="w-3 h-3 inline mr-1" />
                    {selectedEvent.chapters} Chapters
                  </span>
                </div>

                <h3
                  className="font-heading font-bold text-2xl mb-3"
                  style={{ color: theme.foreground }}
                >
                  {selectedEvent.title}
                </h3>

                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: theme.foregroundMuted }}
                >
                  {selectedEvent.description}
                </p>

                {selectedEvent.id !== "present" && (
                  <button
                    className="flex items-center gap-1 text-sm font-medium transition-colors group"
                    style={{ color: accentColor }}
                  >
                    Explore {selectedEvent.country} chapters
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Years Active", value: "37+" },
          { label: "Countries", value: "4" },
          { label: "Total Chapters", value: "30+" },
          { label: "Participants", value: "1000+" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 rounded-xl"
            style={{ backgroundColor: theme.backgroundSecondary }}
          >
            <div
              className="text-2xl font-bold font-heading"
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
      </div>
    </div>
  );
}
