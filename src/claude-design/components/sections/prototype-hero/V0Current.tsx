// PROTOTYPE — delete when done
// V0: Current absolute-positioned approach (baseline for comparison)

import type { ReactNode } from "react";
import type { TriangleGeometry } from "./geometry";
import { getSvgPoints } from "./geometry";

interface Props {
  variant: "filled" | "outline";
  orientation: "landscape" | "portrait";
  photoSrc: string;
  brandColor: string;
  transitionColor?: string;
  geometry: TriangleGeometry;
  children?: ReactNode;
}

export function V0Current({
  variant,
  orientation,
  photoSrc,
  brandColor,
  transitionColor,
  geometry,
  children,
}: Props) {
  const isLandscape = orientation === "landscape";
  const isFilled = variant === "filled";
  const { brand: svgPoints, strip: stripPoints } = getSvgPoints(
    orientation,
    geometry
  );

  const topX = geometry.splitPct;
  const bottomX =
    geometry.splitPct -
    Math.tan((geometry.angleDeg * Math.PI) / 180) * 100;

  const photoClip = isLandscape
    ? `polygon(0 0, ${topX}% 0, ${bottomX}% 100%, 0 100%)`
    : `polygon(0 0, 100% 0, 100% ${geometry.splitPct - 4}%, 0 ${geometry.splitPct + 4}%)`;

  return (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: isLandscape ? "600px" : "500px" }}
    >
      <img
        src={photoSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: photoClip }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points={svgPoints}
          fill={isFilled ? brandColor : "none"}
          stroke={isFilled ? "none" : brandColor}
          strokeWidth={isFilled ? undefined : "0.5"}
        />
      </svg>
      {isFilled && transitionColor && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points={stripPoints} fill={transitionColor} />
        </svg>
      )}
      {children && (
        <div
          className="absolute inset-0 flex items-center"
          style={{
            justifyContent: isLandscape ? "flex-end" : "center",
            padding: isLandscape ? "0 5% 0 55%" : "55% 2rem 2rem",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
