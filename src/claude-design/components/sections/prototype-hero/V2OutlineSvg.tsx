// PROTOTYPE — delete when done
// V2: Two-column flex layout — outline variant using SVG overlay
// Structural columns handle layout; a lightweight SVG draws the wireframe stroke on top.

import type { ReactNode } from "react";
import type { TriangleGeometry } from "./geometry";
import { getClipPaths, getSvgPoints } from "./geometry";

interface Props {
  orientation: "landscape" | "portrait";
  photoSrc: string;
  brandColor: string;
  geometry: TriangleGeometry;
  children?: ReactNode;
}

export function V2OutlineSvg({
  orientation,
  photoSrc,
  brandColor,
  geometry,
  children,
}: Props) {
  const isLandscape = orientation === "landscape";
  const clips = getClipPaths(orientation, geometry);
  const svg = getSvgPoints(orientation, geometry);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        minHeight: isLandscape ? "500px" : "400px",
      }}
    >
      {/* Photo column — full bleed, clipped */}
      <div
        style={{
          flex: isLandscape ? `0 0 ${geometry.splitPct + 5}%` : "0 0 55%",
          clipPath: clips.photo,
          position: "relative",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        />
      </div>

      {/* Dark column — content lives here */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0A0A0A",
          clipPath: clips.brand,
          display: "flex",
          alignItems: "center",
          justifyContent: isLandscape ? "flex-start" : "center",
          padding: isLandscape ? "3rem 5% 3rem 8%" : "2rem",
          marginLeft: isLandscape ? `-${geometry.splitPct * 0.15}%` : undefined,
          marginTop: isLandscape ? undefined : "-5%",
        }}
      >
        {children}
      </div>

      {/* SVG wireframe overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
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
    </div>
  );
}
