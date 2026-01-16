import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Building2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/countries/$country")({
  component: CountryPage,
});

const countryData: Record<
  string,
  {
    name: string;
    capital: string;
    description: string;
    stats: { label: string; value: string }[];
  }
> = {
  ghana: {
    name: "Ghana",
    capital: "Accra",
    description:
      "Ghana serves as ATF's headquarters and flagship location, where our consulting and challenge programs were first established.",
    stats: [
      { label: "Chapters", value: "3" },
      { label: "Challenge Winners", value: "12" },
      { label: "Active Members", value: "500+" },
    ],
  },
  nigeria: {
    name: "Nigeria",
    capital: "Lagos",
    description:
      "Nigeria represents ATF's largest market with vibrant tech ecosystems in Lagos, Abuja, and Port Harcourt.",
    stats: [
      { label: "Chapters", value: "5" },
      { label: "Challenge Winners", value: "8" },
      { label: "Active Members", value: "800+" },
    ],
  },
  kenya: {
    name: "Kenya",
    capital: "Nairobi",
    description:
      "Kenya's innovation hub status makes it a key focus for ATF's East African expansion and mobile technology initiatives.",
    stats: [
      { label: "Chapters", value: "2" },
      { label: "Challenge Winners", value: "6" },
      { label: "Active Members", value: "350+" },
    ],
  },
  "south-africa": {
    name: "South Africa",
    capital: "Johannesburg",
    description:
      "South Africa anchors ATF's Southern African presence with strong corporate partnerships and university collaborations.",
    stats: [
      { label: "Chapters", value: "4" },
      { label: "Challenge Winners", value: "10" },
      { label: "Active Members", value: "600+" },
    ],
  },
};

function CountryPage() {
  const { theme, accentColor, version } = useTheme();
  const { country } = Route.useParams();
  const data = countryData[country];

  if (!data) {
    return (
      <div
        className="min-h-[80vh] py-20 flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="text-center">
          <h1
            className="font-heading text-4xl font-bold mb-4"
            style={{ color: theme.foreground }}
          >
            Country Not Found
          </h1>
          <p className="mb-8" style={{ color: theme.foregroundMuted }}>
            We don't have information for this country yet.
          </p>
          <Link to="/">
            <Button
              style={{
                backgroundColor: accentColor,
                color: theme.accentForeground,
              }}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Users, label: "Community" },
    { icon: Building2, label: "Partners" },
    { icon: Lightbulb, label: "Innovation" },
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
              <MapPin className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-2"
              style={{ color: theme.foreground }}
            >
              ATF {data.name}
            </h1>

            <p className="text-lg mb-6" style={{ color: accentColor }}>
              Headquarters: {data.capital}
            </p>

            <p
              className="text-xl mb-12 leading-relaxed"
              style={{ color: theme.foregroundMuted }}
            >
              {data.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {data.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-6 text-center ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  <p
                    className="text-3xl font-bold mb-1"
                    style={{ color: accentColor }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: theme.foregroundMuted }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-8 ${version === "D" ? "rounded-3xl" : "rounded-xl"}`}
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
            }}
          >
            <h2
              className="font-heading text-xl font-semibold mb-6"
              style={{ color: theme.foreground }}
            >
              Our Focus Areas in {data.name}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-2 flex items-center justify-center ${
                      version === "D" ? "rounded-full" : "rounded-lg"
                    }`}
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <feature.icon
                      className="w-6 h-6"
                      style={{ color: accentColor }}
                    />
                  </div>
                  <p className="text-sm" style={{ color: theme.foregroundMuted }}>
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
