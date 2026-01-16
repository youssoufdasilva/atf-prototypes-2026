import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface Country {
  id: string;
  name: string;
  path: string;
  cx: number;
  cy: number;
}

const countries: Country[] = [
  {
    id: "ghana",
    name: "Ghana",
    path: "M 185 215 L 195 210 L 200 220 L 195 235 L 180 235 L 175 225 Z",
    cx: 187,
    cy: 222,
  },
  {
    id: "nigeria",
    name: "Nigeria",
    path: "M 210 205 L 235 195 L 250 210 L 250 240 L 230 250 L 210 240 L 205 220 Z",
    cx: 228,
    cy: 222,
  },
  {
    id: "kenya",
    name: "Kenya",
    path: "M 320 250 L 345 245 L 355 260 L 350 285 L 330 295 L 315 280 L 315 260 Z",
    cx: 335,
    cy: 268,
  },
  {
    id: "south-africa",
    name: "South Africa",
    path: "M 260 380 L 300 360 L 320 380 L 320 420 L 290 440 L 255 430 L 250 400 Z",
    cx: 285,
    cy: 400,
  },
];

// Simplified Africa continent outline
const africaOutline =
  "M 200 80 C 160 100 140 140 150 180 C 140 200 145 220 155 235 C 145 260 150 290 165 320 C 180 340 200 355 220 365 C 230 385 245 410 260 430 C 280 450 310 450 330 430 C 350 410 360 380 355 350 C 365 320 370 290 360 260 C 375 230 380 200 365 175 C 360 150 350 130 335 115 C 310 95 280 85 250 80 C 230 78 210 78 200 80 Z";

export function AfricaMap({ activeCountry, onCountryClick }: {
  activeCountry: string | null;
  onCountryClick: (id: string) => void;
}) {
  const { theme, accentColor } = useTheme();

  return (
    <svg
      viewBox="100 50 300 420"
      className="w-full h-auto max-w-md mx-auto"
      style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.2))" }}
    >
      {/* Africa outline */}
      <motion.path
        d={africaOutline}
        fill={theme.card}
        stroke={theme.border}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Country shapes */}
      {countries.map((country) => (
        <motion.g
          key={country.id}
          onClick={() => onCountryClick(country.id)}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          style={{ transformOrigin: `${country.cx}px ${country.cy}px` }}
        >
          <motion.path
            d={country.path}
            fill={activeCountry === country.id ? accentColor : `${accentColor}60`}
            stroke={accentColor}
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ fill: accentColor }}
          />
          {/* Country marker */}
          <motion.circle
            cx={country.cx}
            cy={country.cy}
            r="6"
            fill={accentColor}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          />
          {/* Pulse effect for active country */}
          {activeCountry === country.id && (
            <motion.circle
              cx={country.cx}
              cy={country.cy}
              r="6"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.g>
      ))}

      {/* Country labels */}
      {countries.map((country) => (
        <motion.text
          key={`label-${country.id}`}
          x={country.cx}
          y={country.cy - 15}
          textAnchor="middle"
          fill={theme.foreground}
          fontSize="10"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeCountry === country.id ? 1 : 0.7 }}
          style={{ pointerEvents: "none" }}
        >
          {country.name}
        </motion.text>
      ))}
    </svg>
  );
}
