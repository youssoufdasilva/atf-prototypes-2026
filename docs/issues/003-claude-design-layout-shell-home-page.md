# Issue 003: Claude-design layout shell + Home page (Preset A)

**Type:** HITL — stakeholder review required for the Home page design

## What to build

Build the full claude-design vertical slice: layout shell, ThemeContext, chrome, fonts, and the Home page rendering Preset A. This is the tracer bullet that proves the entire claude-design architecture works end-to-end.

**Layout shell:** A layout route at `src/routes/claude-design/` that provides:
- A minimal ThemeContext managing version (A/B), resolved theme config, and CSS custom property application. URL `?version=` is the single source of truth. No custom theme builder, no accent picker, no localStorage. Missing/invalid values default to Preset A.
- A navbar following the handoff's header theme system (dark/light/brand per page)
- A footer following the handoff's dark footer pattern
- A floating pill/toggle switcher anchored at bottom-right for A/B switching (renders A only until Preset B exists)
- Font loading via `@font-face` declarations in a dedicated CSS file imported by the layout route (Montserrat, DM Sans, Clesmont self-hosted in `public/fonts/`)

**CSS variable contract:** Define the explicit set of required CSS custom properties that shared UI components depend on. The claude-design ThemeContext must set all of them. Document the contract so future subpaths know what to implement.

**Home page (Preset A):** Faithfully apply the design handoff's visual language:
- Opportunity Triangle hero (filled, landscape, 22° diagonal, photo zone + brand red zone, dark transition strip)
- Programs section (white background, program cards)
- Diagonal divider (white to red, left-to-right)
- Stats band (brand red, accent triangles)
- Diagonal divider (red to light gray, right-to-left)
- Events/news section (light gray background, cards)
- CTA band (Opportunity Triangle, outline variant, landscape)
- Dark footer

All section components use the property-based rendering pattern (ADR-0002) — one component per section, variations driven by theme config properties.

Reference the handoff's `CONTEXT.md` for geometry, tokens, typography, and layering rules. Reference `design-ref-implementation/` for visual feel.

## Acceptance criteria

- [ ] `/claude-design` renders a complete Home page with Preset A's visual language
- [ ] Opportunity Triangle hero renders with correct geometry (22° diagonal), photo/brand zones, and dark transition strip
- [ ] Diagonal dividers render between sections with correct colors and direction
- [ ] Stats band renders with brand red background and accent triangles
- [ ] Navbar follows handoff's dark header theme for the Home page
- [ ] Footer follows handoff's dark footer pattern
- [ ] Fonts load: Montserrat (headings), DM Sans (body), Clesmont (accent) — self-hosted from `public/fonts/`
- [ ] Fonts do not load under `/legacy` routes
- [ ] Floating pill switcher renders at bottom-right (shows A only for now)
- [ ] CSS custom properties from the shared UI contract are all set by the claude-design ThemeContext
- [ ] Shared UI components (buttons, cards, etc.) render correctly under `/claude-design`
- [ ] All section components use property-based rendering pattern (no version-switch factories)
- [ ] Design tokens match handoff's `colors_and_type.css` values
- [ ] Stakeholder has reviewed and approved the Home page design

## Blocked by

- Issue 001 (route restructuring)
- Issue 002 (Logo refactor)
