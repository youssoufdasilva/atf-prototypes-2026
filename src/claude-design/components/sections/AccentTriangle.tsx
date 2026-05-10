import type { CSSProperties } from "react";

interface AccentTriangleProps {
  color: string;
  direction: "up" | "down" | "left" | "right";
  size: number;
  className?: string;
}

export function AccentTriangle({
  color,
  direction,
  size,
  className = "",
}: AccentTriangleProps) {
  const half = size / 2;
  const transparent = "transparent";

  const base: CSSProperties = {
    borderStyle: "solid",
    borderColor: transparent,
  };

  const styles: Record<typeof direction, CSSProperties> = {
    up: {
      ...base,
      borderWidth: `0 ${half}px ${size}px ${half}px`,
      borderBottomColor: color,
    },
    down: {
      ...base,
      borderWidth: `${size}px ${half}px 0 ${half}px`,
      borderTopColor: color,
    },
    left: {
      ...base,
      borderWidth: `${half}px ${size}px ${half}px 0`,
      borderRightColor: color,
    },
    right: {
      ...base,
      borderWidth: `${half}px 0 ${half}px ${size}px`,
      borderLeftColor: color,
    },
  };

  return (
    <span
      className={className}
      style={{ width: 0, height: 0, display: "inline-block", ...styles[direction] }}
      aria-hidden="true"
    />
  );
}
