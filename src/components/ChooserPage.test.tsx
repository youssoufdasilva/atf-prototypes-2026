import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChooserPage } from "./ChooserPage";

describe("ChooserPage", () => {
  it("renders ATF logo", () => {
    render(<ChooserPage />);
    const logo = screen.getByAltText("ATF");
    expect(logo).toBeInTheDocument();
  });

  it("renders explanation text", () => {
    render(<ChooserPage />);
    expect(
      screen.getByText(/compare design directions/i)
    ).toBeInTheDocument();
  });

  it("renders link to /legacy", () => {
    render(<ChooserPage />);
    const legacyLink = screen.getByRole("link", { name: /legacy/i });
    expect(legacyLink).toHaveAttribute("href", "/legacy");
  });

  it("renders link to /claude-design", () => {
    render(<ChooserPage />);
    const claudeLink = screen.getByRole("link", { name: /claude design/i });
    expect(claudeLink).toHaveAttribute("href", "/claude-design");
  });
});
