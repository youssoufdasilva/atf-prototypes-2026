import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClaudeDesignThemeProvider } from "@/claude-design/contexts/ThemeContext";
import { HomePage } from "./HomePage";

function renderHomePage() {
  return render(
    <ClaudeDesignThemeProvider version="A">
      <HomePage />
    </ClaudeDesignThemeProvider>
  );
}

describe("HomePage", () => {
  it("renders all 7 sections in the correct order", () => {
    const { container } = renderHomePage();

    const sections = container.querySelectorAll("[data-section]");
    const order = Array.from(sections).map((s) =>
      s.getAttribute("data-section")
    );

    expect(order).toEqual([
      "hero",
      "programs",
      "diagonal-divider-white-to-red",
      "stats-band",
      "diagonal-divider-red-to-gray",
      "events",
      "cta-band",
    ]);
  });
});
