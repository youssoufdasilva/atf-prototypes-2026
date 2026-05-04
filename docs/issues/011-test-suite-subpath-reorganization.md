# Issue 011: Test suite for subpath reorganization

**Type:** AFK

## What to build

Add tests covering the key modules introduced or modified by the subpath reorganization. Tests verify external behavior through public interfaces — what a user or consuming component observes — not implementation details like internal state shape or CSS class names.

Vitest and React Testing Library are already configured.

**Modules to test:**

- **Chooser page**: renders links to both subpaths, navigates correctly.
- **Legacy route migration**: legacy pages render under `/legacy/...` with the same content and functionality as before. Presets A-D work via `?version=` param.
- **Claude-design ThemeContext**: applies correct CSS variables for Preset A and Preset B, syncs with URL `?version=` param, handles invalid/missing values by defaulting to A.
- **Claude-design section components**: render correctly for both preset configurations, respond to theme property changes.
- **Logo component**: renders correct variant when given props, no longer depends on ThemeContext import.
- **CSS variable contract**: both subpath ThemeContexts set all required shared CSS custom properties.

## Acceptance criteria

- [ ] Chooser page test: renders links to `/legacy` and `/claude-design`
- [ ] Legacy route test: at least one legacy page renders under `/legacy/...` with correct content
- [ ] Legacy preset test: `?version=A` through `?version=D` each apply correct theme
- [ ] Claude-design ThemeContext test: Preset A and B apply correct CSS variables
- [ ] Claude-design ThemeContext test: missing/invalid `?version=` resolves to Preset A
- [ ] Claude-design section test: at least one section renders correctly for both preset configs
- [ ] Logo test: renders correct variant based on props, not context
- [ ] CSS contract test: both ThemeContexts set all required shared variables
- [ ] All tests pass in CI (`bun --bun run test`)

## Blocked by

- Issue 003 (claude-design layout shell — needed for ThemeContext and section tests)
