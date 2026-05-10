import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AccentTriangle } from "./AccentTriangle";

describe("AccentTriangle", () => {
  it("renders a zero-dimension element with colored borders for direction=up", () => {
    const { container } = render(
      <AccentTriangle color="#F90036" direction="up" size={16} />
    );

    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.style.width).toBe("0px");
    expect(el.style.height).toBe("0px");
    expect(el.style.borderBottomColor).toBe("rgb(249, 0, 54)");
  });

  it("renders direction=down with top border colored", () => {
    const { container } = render(
      <AccentTriangle color="#FFFFFF" direction="down" size={12} />
    );

    const el = container.firstElementChild as HTMLElement;
    expect(el.style.borderTopColor).toBe("rgb(255, 255, 255)");
  });

  it("renders direction=left with right border colored", () => {
    const { container } = render(
      <AccentTriangle color="#0A0A0A" direction="left" size={24} />
    );

    const el = container.firstElementChild as HTMLElement;
    expect(el.style.borderRightColor).toBe("rgb(10, 10, 10)");
  });

  it("renders direction=right with left border colored", () => {
    const { container } = render(
      <AccentTriangle color="#F90036" direction="right" size={16} />
    );

    const el = container.firstElementChild as HTMLElement;
    expect(el.style.borderLeftColor).toBe("rgb(249, 0, 54)");
  });
});
