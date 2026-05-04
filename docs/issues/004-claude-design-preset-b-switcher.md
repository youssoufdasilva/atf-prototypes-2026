# Issue 004: Claude-design Preset B + switcher integration

**Type:** HITL — stakeholder review required for the institutional tone

## What to build

Add Preset B to the claude-design ThemeContext and wire up the floating pill switcher to toggle between A and B. Preset B is a tone shift only — same Opportunity Triangle structural foundation as Preset A (same hero layout, same diagonal dividers, same section structure). It is differentiated through color palette, typography weight, and whitespace to project an institutional, credible tone for partners/funders (primary audience) while remaining accessible to ATF Challenge participants (secondary audience).

Preset B must be distinct from Legacy C's serif-and-muted-green approach. Creative latitude on the specific palette, weights, and spacing — but no structural layout divergence from Preset A.

The floating pill switcher becomes fully functional: toggling updates `?version=` in the URL and the page re-renders with the selected preset's theme config.

## Acceptance criteria

- [ ] Preset B theme config exists in the claude-design theme definitions
- [ ] Preset B applies different color palette, typography weight, and whitespace compared to Preset A
- [ ] Preset B shares the same structural layout as Preset A (same hero, same sections, same diagonal dividers)
- [ ] Preset B is visually distinct from Legacy C (no serif fonts, no muted green)
- [ ] Floating pill switcher toggles between A and B
- [ ] Toggling updates `?version=` in the URL
- [ ] `?version=B` renders Preset B, `?version=A` renders Preset A
- [ ] Missing/invalid `?version=` defaults to Preset A
- [ ] Home page renders correctly under both presets
- [ ] Stakeholder has reviewed and approved the institutional tone

## Blocked by

- Issue 003 (claude-design layout shell + Home page)
