// PROTOTYPE — delete when done
import { useState } from "react";
import { useClaudeDesignTheme } from "@/claude-design/contexts/ThemeContext";
import { DEFAULT_GEOMETRY, type TriangleGeometry } from "./geometry";
import { SampleHeroContent, SampleCTAContent } from "./SampleContent";
import { V0Current } from "./V0Current";
import { V1FlexFilled } from "./V1FlexFilled";
import { V2OutlineSvg } from "./V2OutlineSvg";
import { V3OutlineCss } from "./V3OutlineCss";
import { V4OutlineSplit } from "./V4OutlineSplit";

const VARIATIONS = [
  { key: "v0", label: "V0: Current (absolute)" },
  { key: "v1", label: "V1: Flex filled" },
  { key: "v2", label: "V2: Outline + SVG" },
  { key: "v3", label: "V3: Outline + CSS" },
  { key: "v4", label: "V4: Outline (split)" },
] as const;

type VariationKey = (typeof VARIATIONS)[number]["key"];

const PHOTO = "/atf-assets/hero-photo.jpg";

export function PrototypeHeroPage() {
  const { theme } = useClaudeDesignTheme();
  const [active, setActive] = useState<VariationKey>("v0");
  const [geometry, setGeometry] = useState<TriangleGeometry>(DEFAULT_GEOMETRY);
  const [showPortrait, setShowPortrait] = useState(false);

  const orientation = showPortrait ? "portrait" : "landscape";

  return (
    <div style={{ paddingBottom: "120px" }}>
      {/* Header */}
      <div className="px-8 py-6" style={{ backgroundColor: "#0A0A0A" }}>
        <h1
          className="text-white text-2xl font-bold"
          style={{ fontFamily: `'${theme.fontDisplay}', sans-serif` }}
        >
          Hero Layout Prototype
        </h1>
        <p className="text-white/60 mt-1 text-sm">
          Comparing layout strategies for OpportunityTriangle. Throwaway code.
        </p>
      </div>

      {/* Active variation label */}
      <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-4">
        <span className="font-semibold text-lg">
          {VARIATIONS.find((v) => v.key === active)?.label}
        </span>
        <span className="text-sm text-gray-500">
          {orientation} &middot; {geometry.angleDeg}&deg; &middot;{" "}
          {geometry.splitPct}% split
        </span>
      </div>

      {/* Rendered variation */}
      <div className="mt-0">
        {active === "v0" && (
          <>
            <VariationLabel>Filled</VariationLabel>
            <V0Current
              variant="filled"
              orientation={orientation}
              photoSrc={PHOTO}
              brandColor={theme.brand}
              transitionColor={theme.brandDark}
              geometry={geometry}
            >
              <SampleHeroContent />
            </V0Current>
            <VariationLabel>Outline</VariationLabel>
            <V0Current
              variant="outline"
              orientation={orientation}
              photoSrc={PHOTO}
              brandColor={theme.brand}
              geometry={geometry}
            >
              <SampleCTAContent />
            </V0Current>
          </>
        )}

        {active === "v1" && (
          <>
            <VariationLabel>Filled (two-column flex)</VariationLabel>
            <V1FlexFilled
              orientation={orientation}
              photoSrc={PHOTO}
              brandColor={theme.brand}
              transitionColor={theme.brandDark}
              geometry={geometry}
            >
              <SampleHeroContent />
            </V1FlexFilled>
          </>
        )}

        {active === "v2" && (
          <>
            <VariationLabel>Outline — SVG overlay on flex columns</VariationLabel>
            <V2OutlineSvg
              orientation={orientation}
              photoSrc={PHOTO}
              brandColor={theme.brand}
              geometry={geometry}
            >
              <SampleCTAContent />
            </V2OutlineSvg>
          </>
        )}

        {active === "v3" && (
          <>
            <VariationLabel>Outline — CSS rotated border</VariationLabel>
            <V3OutlineCss
              orientation={orientation}
              photoSrc={PHOTO}
              brandColor={theme.brand}
              geometry={geometry}
            >
              <SampleCTAContent />
            </V3OutlineCss>
          </>
        )}

        {active === "v4" && (
          <>
            <VariationLabel>Outline — separate absolute impl</VariationLabel>
            <V4OutlineSplit
              orientation={orientation}
              photoSrc={PHOTO}
              brandColor={theme.brand}
              geometry={geometry}
            >
              <SampleCTAContent />
            </V4OutlineSplit>
          </>
        )}
      </div>

      {/* Floating control bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{ backgroundColor: "rgba(10,10,10,0.95)", backdropFilter: "blur(8px)" }}
      >
        {/* Variation tabs */}
        <div className="flex border-b border-white/10">
          {VARIATIONS.map((v) => (
            <button
              key={v.key}
              onClick={() => setActive(v.key)}
              className="flex-1 px-3 py-2.5 text-xs font-medium transition-colors"
              style={{
                color: active === v.key ? theme.brand : "rgba(255,255,255,0.5)",
                borderBottom:
                  active === v.key ? `2px solid ${theme.brand}` : "2px solid transparent",
                backgroundColor: active === v.key ? "rgba(255,255,255,0.05)" : "transparent",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-6 px-6 py-3">
          {/* Orientation toggle */}
          <label className="flex items-center gap-2 text-white/70 text-xs">
            <input
              type="checkbox"
              checked={showPortrait}
              onChange={(e) => setShowPortrait(e.target.checked)}
            />
            Portrait
          </label>

          {/* Angle slider */}
          <label className="flex items-center gap-2 text-white/70 text-xs flex-1">
            Angle: {geometry.angleDeg}&deg;
            <input
              type="range"
              min={5}
              max={45}
              value={geometry.angleDeg}
              onChange={(e) =>
                setGeometry((g) => ({ ...g, angleDeg: Number(e.target.value) }))
              }
              className="flex-1"
            />
          </label>

          {/* Split slider */}
          <label className="flex items-center gap-2 text-white/70 text-xs flex-1">
            Split: {geometry.splitPct}%
            <input
              type="range"
              min={30}
              max={70}
              value={geometry.splitPct}
              onChange={(e) =>
                setGeometry((g) => ({
                  ...g,
                  splitPct: Number(e.target.value),
                }))
              }
              className="flex-1"
            />
          </label>

          {/* Reset button */}
          <button
            onClick={() => setGeometry(DEFAULT_GEOMETRY)}
            className="text-xs text-white/40 hover:text-white/70 underline"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function VariationLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 py-2 bg-gray-100 text-xs font-mono text-gray-600 uppercase tracking-wide">
      {children}
    </div>
  );
}
