import { useState } from "react";
import { motion } from "framer-motion";
import { Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { AfricaMap } from "./AfricaMap";

interface Country {
  id: string;
  name: string;
  flag: string;
  chapters: number;
  description: string;
}

const countries: Country[] = [
  {
    id: "ghana",
    name: "Ghana",
    flag: "\ud83c\uddec\ud83c\udded",
    chapters: 8,
    description: "Our founding nation with the largest concentration of chapters and programs.",
  },
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "\ud83c\uddf3\ud83c\uddec",
    chapters: 12,
    description: "Rapidly growing tech ecosystem with strong university partnerships.",
  },
  {
    id: "kenya",
    name: "Kenya",
    flag: "\ud83c\uddf0\ud83c\uddea",
    chapters: 6,
    description: "East Africa's tech hub with innovative mobile-first solutions.",
  },
  {
    id: "south-africa",
    name: "South Africa",
    flag: "\ud83c\uddff\ud83c\udde6",
    chapters: 4,
    description: "Connecting established tech industry with emerging innovation.",
  },
];

function CountryCard({ country, isActive }: { country: Country; isActive?: boolean }) {
  const { version, theme, accentColor } = useTheme();

  return (
    <motion.div
      className={`p-6 ${version === "D" ? "rounded-3xl" : "rounded-xl"}`}
      style={{
        backgroundColor: theme.card,
        border: isActive ? `2px solid ${accentColor}` : `1px solid ${theme.border}`,
        boxShadow: isActive ? `0 0 30px ${accentColor}20` : "0 4px 20px rgba(0,0,0,0.05)",
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{country.flag}</span>
        <div className="flex-1">
          <h3
            className="font-heading font-bold text-lg mb-1"
            style={{ color: theme.foreground }}
          >
            {country.name}
          </h3>
          <div
            className="flex items-center gap-4 text-sm mb-3"
            style={{ color: theme.foregroundMuted }}
          >
            <span className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {country.chapters} Chapters
            </span>
          </div>
          <p className="text-sm" style={{ color: theme.foregroundMuted }}>
            {country.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CardGridView() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {countries.map((country, index) => (
        <motion.div
          key={country.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <CountryCard country={country} />
        </motion.div>
      ))}
    </div>
  );
}

function MapView() {
  const { theme, accentColor } = useTheme();
  const [activeCountry, setActiveCountry] = useState<string | null>("ghana");

  const selectedCountry = countries.find((c) => c.id === activeCountry);

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Map */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AfricaMap
          activeCountry={activeCountry}
          onCountryClick={setActiveCountry}
        />
      </motion.div>

      {/* Country details */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          {/* Country selector buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {countries.map((country) => (
              <Button
                key={country.id}
                variant={activeCountry === country.id ? "default" : "outline"}
                onClick={() => setActiveCountry(country.id)}
                className="gap-2"
                style={{
                  backgroundColor:
                    activeCountry === country.id ? accentColor : "transparent",
                  color:
                    activeCountry === country.id
                      ? theme.accentForeground
                      : theme.foreground,
                  borderColor: theme.border,
                }}
              >
                <span>{country.flag}</span>
                {country.name}
              </Button>
            ))}
          </div>

          {/* Selected country info */}
          {selectedCountry && (
            <motion.div
              key={selectedCountry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{selectedCountry.flag}</span>
                <div>
                  <h3
                    className="font-heading font-bold text-2xl"
                    style={{ color: theme.foreground }}
                  >
                    {selectedCountry.name}
                  </h3>
                  <p
                    className="text-sm flex items-center gap-2"
                    style={{ color: accentColor }}
                  >
                    <Building className="w-4 h-4" />
                    {selectedCountry.chapters} Active Chapters
                  </p>
                </div>
              </div>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: theme.foregroundMuted }}
              >
                {selectedCountry.description}
              </p>
              <Button
                variant="ghost"
                className="group p-0"
                style={{ color: accentColor }}
              >
                View {selectedCountry.name} Chapters
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Geographic() {
  const { version, theme, accentColor } = useTheme();
  const useMap = version === "B";

  return (
    <section className="py-20" style={{ backgroundColor: theme.background }}>
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
            Where We Work
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.foregroundMuted }}
          >
            Our chapters span across Africa, fostering local tech communities and
            driving innovation
          </p>
        </motion.div>

        {/* Map or card grid view */}
        {useMap ? <MapView /> : <CardGridView />}
      </div>
    </section>
  );
}
