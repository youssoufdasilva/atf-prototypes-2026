import type { ReactNode } from "react";

interface OpportunityTriangleProps {
  variant: "filled" | "outline";
  orientation: "landscape" | "portrait";
  photoSrc: string;
  photoAlt: string;
  brandColor: string;
  transitionColor?: string;
  children?: ReactNode;
  className?: string;
}

// ~22 degrees from vertical → clip-path split at ~48% from left (landscape)
const CLIP_PHOTO_LANDSCAPE = "polygon(0 0, 48% 0, 40% 100%, 0 100%)";
const CLIP_PHOTO_PORTRAIT = "polygon(0 0, 100% 0, 100% 48%, 0 56%)";

export function OpportunityTriangle({
  variant,
  orientation,
  photoSrc,
  photoAlt,
  brandColor,
  transitionColor,
  children,
  className = "",
}: OpportunityTriangleProps) {
  const isLandscape = orientation === "landscape";
  const isFilled = variant === "filled";

  const svgPoints = isLandscape
    ? "48,0 100,0 100,100 40,100"
    : "0,48 100,44 100,100 0,100";

  const stripPoints = isLandscape
    ? "47,0 49,0 41,100 39,100"
    : "0,47 100,43 100,45 0,49";

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        minHeight: isLandscape ? "600px" : "500px",
      }}
    >
      <div className="w-1/2 h-full border border-green-500">
        {/* Photo zone */}
        <img
          src={photoSrc}
          alt={photoAlt}
          className="absolute inset-0 w-full h-full object-cover object-contain== object-fill== object-scale-down=="
          style={{
            clipPath: isLandscape ? CLIP_PHOTO_LANDSCAPE : CLIP_PHOTO_PORTRAIT,
          }}
        />
      </div>

      <div>
        {/* Brand zone */}
        <svg
          className="absolute hidden== inset-0 w-full h-full"
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

        {/* Dark transition strip */}
        {isFilled && transitionColor && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            data-testid="transition-strip"
            aria-hidden="true"
          >
            <polygon points={stripPoints} fill={transitionColor} />
          </svg>
        )}

        {/* Content overlay on brand zone */}
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
    </div>
  );
}
