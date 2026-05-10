// PROTOTYPE — delete when done
// V4: Separate outline implementation — keeps absolute positioning for outline
// while filled could use flex. Tests whether outline is different enough to warrant
// its own layout strategy.

import type { ReactNode } from "react";
import type { TriangleGeometry } from "./geometry";
import { getSvgPoints } from "./geometry";

interface Props {
  orientation: "landscape" | "portrait";
  photoSrc: string;
  brandColor: string;
  geometry: TriangleGeometry;
  children?: ReactNode;
}

export function V4OutlineSplit({
  orientation,
  photoSrc,
  brandColor,
  geometry,
  children,
}: Props) {
  const isLandscape = orientation === "landscape";
  const svg = getSvgPoints(orientation, geometry);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: isLandscape ? "500px" : "400px",
        backgroundColor: "#0A0A0A",
      }}
    >
      {/* Photo — absolute, full bleed, dimmed */}
      <img
        src={photoSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.3)" }}
      />

      {/* Outline polygon */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points={svg.brand}
          fill="none"
          stroke={brandColor}
          strokeWidth="0.4"
        />
      </svg>

      {/* Content — absolutely positioned over brand zone */}
      {children && (
        <div
          className="absolute inset-0 flex items-center"
          style={{
            justifyContent: isLandscape ? "flex-end" : "center",
            padding: isLandscape
              ? `0 5% 0 ${geometry.splitPct + 7}%`
              : `${geometry.splitPct + 7}% 2rem 2rem`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
