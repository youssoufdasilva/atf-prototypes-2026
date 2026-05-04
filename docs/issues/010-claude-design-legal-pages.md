# Issue 010: Claude-design legal pages: privacy-policy, terms-of-service

**Type:** AFK

## What to build

Build the two legal pages for claude-design: `/claude-design/privacy-policy` and `/claude-design/terms-of-service`. These are straightforward text-heavy pages with minimal design decisions. Apply the handoff's subpage pattern (dark header, diagonal divider into white content) with standard body typography.

Use the property-based rendering pattern so both presets render correctly.

## Acceptance criteria

- [ ] `/claude-design/privacy-policy` renders a complete Privacy Policy page
- [ ] `/claude-design/terms-of-service` renders a complete Terms of Service page
- [ ] Pages follow the handoff's subpage header pattern
- [ ] Body text uses DM Sans at appropriate sizes for long-form reading
- [ ] Pages render correctly under both Preset A and Preset B
- [ ] Section components use the property-based rendering pattern

## Blocked by

- Issue 004 (Preset B + switcher)
