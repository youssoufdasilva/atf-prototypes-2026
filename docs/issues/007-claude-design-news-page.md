# Issue 007: Claude-design News page + article detail

**Type:** AFK

## What to build

Build the News listing page for `/claude-design/news` and the article detail page for `/claude-design/news/$articleId`. This maps to the handoff's Events page (legacy has no Events page). Apply the handoff's Events page design — brand-red header theme, event cards with dates — adapted for news/article content.

Use the property-based rendering pattern so both presets render correctly.

## Acceptance criteria

- [ ] `/claude-design/news` renders a complete News listing page
- [ ] `/claude-design/news/some-article` renders an article detail page
- [ ] Design is derived from the handoff's Events page
- [ ] Navbar uses the correct header theme for this page (brand red, per handoff)
- [ ] News cards display article information (adapted from the handoff's event card pattern)
- [ ] Page renders correctly under both Preset A and Preset B
- [ ] Section components use the property-based rendering pattern
- [ ] Navigation between listing and article detail works correctly

## Blocked by

- Issue 004 (Preset B + switcher)
