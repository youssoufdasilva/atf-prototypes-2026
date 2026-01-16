import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface Partner {
  name: string;
  logo: string;
  category: "partner" | "supporter";
}

const partners: Partner[] = [
  { name: "37 Military Hospital", logo: "/atf-assets/partners/37 military hospital.png", category: "partner" },
  { name: "BELA", logo: "/atf-assets/partners/BELA-LOGO-2-1-1-300x58.png", category: "partner" },
  { name: "Esoko", logo: "/atf-assets/partners/Esoko_Logo.png", category: "partner" },
  { name: "Korle Bu", logo: "/atf-assets/partners/korle bu original.png", category: "partner" },
  { name: "University of Ghana", logo: "/atf-assets/supporters/UoG.png", category: "supporter" },
  { name: "Blossom", logo: "/atf-assets/supporters/blossomlog.png", category: "supporter" },
  { name: "Indaba", logo: "/atf-assets/supporters/indaba logo.png", category: "supporter" },
  { name: "KNUST Rail", logo: "/atf-assets/supporters/knust - rail.png", category: "supporter" },
];

export function SocialProof() {
  const { version, theme, accentColor } = useTheme();

  return (
    <section
      className="py-20"
      style={{ backgroundColor: theme.backgroundSecondary }}
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
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
            Trusted By
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.foregroundMuted }}
          >
            Leading organizations across Africa partner with us to drive
            technological innovation
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="mb-16">
          <motion.p
            className="text-sm font-medium text-center mb-6 uppercase tracking-wider"
            style={{ color: theme.foregroundMuted }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Partners
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners
              .filter((p) => p.category === "partner")
              .map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className={`p-4 ${
                    version === "D" ? "rounded-2xl" : "rounded-lg"
                  }`}
                  style={{
                    backgroundColor: theme.card,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                    style={{
                      filter: version === "B" ? "brightness(0) invert(1)" : undefined,
                    }}
                  />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Supporters grid */}
        <div>
          <motion.p
            className="text-sm font-medium text-center mb-6 uppercase tracking-wider"
            style={{ color: theme.foregroundMuted }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Supporters
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners
              .filter((p) => p.category === "supporter")
              .map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className={`p-4 ${
                    version === "D" ? "rounded-2xl" : "rounded-lg"
                  }`}
                  style={{
                    backgroundColor: theme.card,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                    style={{
                      filter: version === "B" ? "brightness(0) invert(1)" : undefined,
                    }}
                  />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Proof points */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
            }}
          >
            <h3
              className="font-heading font-semibold text-lg mb-2"
              style={{ color: theme.foreground }}
            >
              AI Challenge Framework
            </h3>
            <p className="text-sm" style={{ color: theme.foregroundMuted }}>
              Our innovative challenge framework has been recognized and adopted
              by organizations seeking to foster local tech solutions across
              Africa.
            </p>
          </div>
          <div
            className={`p-6 ${version === "D" ? "rounded-2xl" : "rounded-xl"}`}
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
            }}
          >
            <h3
              className="font-heading font-semibold text-lg mb-2"
              style={{ color: theme.foreground }}
            >
              Publications Archive
            </h3>
            <p className="text-sm" style={{ color: theme.foregroundMuted }}>
              Over 100 research papers and articles documenting our insights on
              African technology development and innovation ecosystems.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
