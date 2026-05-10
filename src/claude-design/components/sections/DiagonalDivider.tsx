interface DiagonalDividerProps {
  fromColor: string;
  toColor: string;
  direction: "left-to-right" | "right-to-left";
  className?: string;
}

export function DiagonalDivider({
  fromColor,
  toColor,
  direction,
  className = "",
}: DiagonalDividerProps) {
  const isLTR = direction === "left-to-right";

  const topPoints = isLTR
    ? "0,0 100,0 100,100 0,0"
    : "0,0 100,0 0,100 0,0";
  const bottomPoints = isLTR
    ? "0,0 100,100 0,100 0,0"
    : "100,0 100,100 0,100 100,0";

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "80px", display: "block" }}
      aria-hidden="true"
    >
      <polygon points={topPoints} fill={fromColor} />
      <polygon points={bottomPoints} fill={toColor} />
    </svg>
  );
}
