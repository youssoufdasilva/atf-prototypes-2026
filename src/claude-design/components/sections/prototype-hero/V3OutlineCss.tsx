// PROTOTYPE — delete when done
// V3: Two-column flex layout — outline variant using CSS rotated pseudo-element
// No SVG — the diagonal stroke is a CSS border on a rotated element.

import type { ReactNode } from "react";
import type { TriangleGeometry } from "./geometry";

interface Props {
  orientation: "landscape" | "portrait";
  photoSrc: string;
  brandColor: string;
  geometry: TriangleGeometry;
  children?: ReactNode;
}

export function V3OutlineCss({
  orientation,
  photoSrc,
  brandColor,
  geometry,
  children,
}: Props) {
  const isLandscape = orientation === "landscape";

  const diagonalAngle = isLandscape
    ? 90 - geometry.angleDeg
    : geometry.angleDeg;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        minHeight: isLandscape ? "500px" : "400px",
        backgroundColor: "#0A0A0A",
      }}
    >
      {/* Photo side */}
      <div
        style={{
          flex: isLandscape ? `0 0 ${geometry.splitPct}%` : "0 0 50%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        />
      </div>

      {/* Content side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: isLandscape ? "flex-start" : "center",
          padding: isLandscape ? "3rem 5% 3rem 5%" : "2rem",
        }}
      >
        {children}
      </div>

      {/* CSS diagonal line — rotated border */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={
          isLandscape
            ? {
                top: "-10%",
                bottom: "-10%",
                left: `${geometry.splitPct}%`,
                width: "0px",
                borderLeft: `1px solid ${brandColor}`,
                transformOrigin: "top left",
                transform: `rotate(${diagonalAngle}deg)`,
              }
            : {
                left: "-10%",
                right: "-10%",
                top: `${geometry.splitPct}%`,
                height: "0px",
                borderTop: `1px solid ${brandColor}`,
                transformOrigin: "top left",
                transform: `rotate(-${diagonalAngle}deg)`,
              }
        }
      />

      {/* Triangular corner accents to complete the polygon outline */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {isLandscape ? (
          <>
            <line
              x1={geometry.splitPct}
              y1="0"
              x2="100"
              y2="0"
              stroke={brandColor}
              strokeWidth="0.3"
            />
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="100"
              stroke={brandColor}
              strokeWidth="0.3"
            />
            <line
              x1="100"
              y1="100"
              x2={
                geometry.splitPct -
                Math.tan((geometry.angleDeg * Math.PI) / 180) * 100
              }
              y2="100"
              stroke={brandColor}
              strokeWidth="0.3"
            />
          </>
        ) : (
          <>
            <line
              x1="0"
              y1={geometry.splitPct + 4}
              x2="0"
              y2="100"
              stroke={brandColor}
              strokeWidth="0.3"
            />
            <line
              x1="0"
              y1="100"
              x2="100"
              y2="100"
              stroke={brandColor}
              strokeWidth="0.3"
            />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2={geometry.splitPct - 4}
              stroke={brandColor}
              strokeWidth="0.3"
            />
          </>
        )}
      </svg>
    </div>
  );
}
