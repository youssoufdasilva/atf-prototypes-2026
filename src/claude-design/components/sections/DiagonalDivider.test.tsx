import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DiagonalDivider } from "./DiagonalDivider";

describe("DiagonalDivider", () => {
  it("renders an SVG with fromColor and toColor polygons", () => {
    const { container } = render(
      <DiagonalDivider
        fromColor="#FFFFFF"
        toColor="#F90036"
        direction="left-to-right"
      />
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();

    const polygons = container.querySelectorAll("polygon");
    expect(polygons).toHaveLength(2);

    expect(polygons[0].getAttribute("fill")).toBe("#FFFFFF");
    expect(polygons[1].getAttribute("fill")).toBe("#F90036");
  });

  it("swaps polygon points for right-to-left direction", () => {
    const { container: ltr } = render(
      <DiagonalDivider
        fromColor="#FFF"
        toColor="#000"
        direction="left-to-right"
      />
    );
    const { container: rtl } = render(
      <DiagonalDivider
        fromColor="#FFF"
        toColor="#000"
        direction="right-to-left"
      />
    );

    const ltrPoints = ltr.querySelector("polygon")!.getAttribute("points");
    const rtlPoints = rtl.querySelector("polygon")!.getAttribute("points");

    expect(ltrPoints).not.toBe(rtlPoints);
  });
});
