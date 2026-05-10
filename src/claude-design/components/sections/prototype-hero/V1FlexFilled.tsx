// PROTOTYPE — delete when done
// V1: Two-column flex layout — filled variant
// Photo and brand zone are sibling flex children with complementary clip-paths.
// Transition strip is a decorative overlay. Content is a child of the brand column.

import type { ReactNode } from "react";
import type { TriangleGeometry } from "./geometry";
import { getClipPaths } from "./geometry";

interface Props {
  orientation: "landscape" | "portrait";
  photoSrc: string;
  brandColor: string;
  transitionColor?: string;
  geometry: TriangleGeometry;
  children?: ReactNode;
}

export function V1FlexFilled({
  orientation,
  photoSrc,
  brandColor,
  transitionColor,
  geometry,
  children,
}: Props) {
  const isLandscape = orientation === "landscape";
  const clips = getClipPaths(orientation, geometry);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        minHeight: isLandscape ? "600px" : "500px",
      }}
    >
      {/* Photo column */}
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
        />
      </div>

      {/* Brand column — content lives here as normal flow */}
      <div
        style={{
          flex: 1,
          backgroundColor: brandColor,
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

      {/* Dark transition strip — decorative overlay */}
      {transitionColor && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ clipPath: clips.strip }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: transitionColor }}
          />
        </div>
      )}
    </div>
  );
}
