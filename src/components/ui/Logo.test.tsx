import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders standard logo by default", () => {
    render(<Logo />);
    const img = screen.getByAltText("ATF");
    expect(img).toHaveAttribute("src", "/atf-assets/atf-logo-vector.svg");
  });

  it("renders negSpace logo when variant is negSpace", () => {
    render(<Logo variant="negSpace" />);
    const img = screen.getByAltText("ATF");
    expect(img).toHaveAttribute(
      "src",
      "/atf-assets/atf logo neg space copy.png"
    );
  });
});
