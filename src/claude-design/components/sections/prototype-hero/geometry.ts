// PROTOTYPE — delete when done

export interface TriangleGeometry {
  angleDeg: number;
  splitPct: number;
}

export const DEFAULT_GEOMETRY: TriangleGeometry = {
  angleDeg: 22,
  splitPct: 48,
};

function landscapeClipPaths(g: TriangleGeometry) {
  const topX = g.splitPct;
  const bottomX = g.splitPct - Math.tan((g.angleDeg * Math.PI) / 180) * 100;
  const photo = `polygon(0 0, ${topX}% 0, ${bottomX}% 100%, 0 100%)`;
  const brand = `polygon(${topX}% 0, 100% 0, 100% 100%, ${bottomX}% 100%)`;
  const stripLeft = bottomX - 1;
  const stripRight = topX + 1;
  const strip = `polygon(${stripRight}% 0, ${topX}% 0, ${stripLeft}% 100%, ${bottomX}% 100%)`;
  return { photo, brand, strip };
}

function portraitClipPaths(g: TriangleGeometry) {
  const leftY = g.splitPct + 4;
  const rightY = g.splitPct - 4;
  const photo = `polygon(0 0, 100% 0, 100% ${rightY}%, 0 ${leftY}%)`;
  const brand = `polygon(0 ${leftY}%, 100% ${rightY}%, 100% 100%, 0 100%)`;
  const stripTopL = leftY - 1;
  const stripTopR = rightY - 1;
  const strip = `polygon(0 ${leftY}%, 100% ${rightY}%, 100% ${stripTopR}%, 0 ${stripTopL}%)`;
  return { photo, brand, strip };
}

export function getClipPaths(
  orientation: "landscape" | "portrait",
  g: TriangleGeometry
) {
  return orientation === "landscape"
    ? landscapeClipPaths(g)
    : portraitClipPaths(g);
}

export function getSvgPoints(
  orientation: "landscape" | "portrait",
  g: TriangleGeometry
) {
  const topX = g.splitPct;
  const bottomX = g.splitPct - Math.tan((g.angleDeg * Math.PI) / 180) * 100;

  if (orientation === "landscape") {
    return {
      brand: `${topX},0 100,0 100,100 ${bottomX},100`,
      strip: `${topX - 1},0 ${topX + 1},0 ${bottomX + 1},100 ${bottomX - 1},100`,
    };
  }
  const leftY = g.splitPct + 4;
  const rightY = g.splitPct - 4;
  return {
    brand: `0,${leftY} 100,${rightY} 100,100 0,100`,
    strip: `0,${leftY} 100,${rightY} 100,${rightY - 1} 0,${leftY - 1}`,
  };
}
