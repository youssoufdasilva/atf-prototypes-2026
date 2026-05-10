import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OpportunityTriangle } from "./OpportunityTriangle";

describe("OpportunityTriangle", () => {
  it("renders photo zone and brand zone for filled variant", () => {
    render(
      <OpportunityTriangle
        variant="filled"
        orientation="landscape"
        photoSrc="/test.jpg"
        photoAlt="Test photo"
        brandColor="#F90036"
      >
        <h1>Hero headline</h1>
      </OpportunityTriangle>
    );

    const photo = screen.getByAltText("Test photo");
    expect(photo).toHaveAttribute("src", "/test.jpg");
    expect(screen.getByText("Hero headline")).toBeTruthy();
  });

  it("renders outline variant with SVG stroke instead of filled polygon", () => {
    const { container } = render(
      <OpportunityTriangle
        variant="outline"
        orientation="landscape"
        photoSrc="/test.jpg"
        photoAlt="Test"
        brandColor="#F90036"
      >
        <p>CTA content</p>
      </OpportunityTriangle>
    );

    const polygon = container.querySelector("polygon");
    expect(polygon).toBeTruthy();
    expect(polygon!.getAttribute("fill")).toBe("none");
    expect(polygon!.getAttribute("stroke")).toBe("#F90036");
  });

  it("renders dark transition strip for filled variant", () => {
    const { container } = render(
      <OpportunityTriangle
        variant="filled"
        orientation="landscape"
        photoSrc="/test.jpg"
        photoAlt="Test"
        brandColor="#F90036"
        transitionColor="#C0002A"
      />
    );

    const strips = container.querySelectorAll("[data-testid='transition-strip']");
    expect(strips.length).toBe(1);
  });
});
