# Issue 005: Claude-design About page

**Type:** AFK

## What to build

Build the About page for `/claude-design/about`. The handoff covers this page directly — use the handoff's About page design (dark header with diagonal divider into white content) as the reference. Apply the property-based rendering pattern so both Preset A and Preset B render correctly through theme config properties.

Reference the handoff's `CONTEXT.md` for subpage header patterns and the `design-ref-implementation/` folder for visual feel.

## Acceptance criteria

- [ ] `/claude-design/about` renders a complete About page
- [ ] Page follows the handoff's subpage pattern (dark header, diagonal divider into white content)
- [ ] Navbar uses the correct header theme for this page (light, per handoff)
- [ ] Page renders correctly under both Preset A and Preset B
- [ ] Section components use the property-based rendering pattern
- [ ] Navigation from Home to About and back works correctly

## Blocked by

- Issue 004 (Preset B + switcher — so both presets can be verified)
