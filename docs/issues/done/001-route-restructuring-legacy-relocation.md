# Issue 001: Route restructuring: bare root, chooser page, legacy relocation

**Type:** AFK

## What to build

Restructure the app's routing to support isolated subpaths. The top-level `__root.tsx` becomes a bare `<Outlet />` with no providers or chrome. All existing route files move into `src/routes/legacy/` under a layout route that takes over everything currently in `__root.tsx` (ThemeProvider, FeedbackProvider, Navbar, Footer, PrototypeSwitcher). The root `src/routes/index.tsx` becomes a minimal chooser page — ATF logo, a one-sentence explanation, and links to `/legacy` and `/claude-design`.

This is a pure relocation for legacy: structural wiring changes are expected, but `/legacy` with any preset must look and behave identically to what the top-level routes do today.

## Acceptance criteria

- [ ] `__root.tsx` renders only a bare `<Outlet />` — no ThemeProvider, FeedbackProvider, Navbar, Footer, or PrototypeSwitcher
- [ ] Chooser page at `/` renders ATF logo, a one-sentence explanation, and links to `/legacy` and `/claude-design`
- [ ] Chooser page has no navbar, footer, or theme providers
- [ ] All existing routes are accessible under `/legacy/...` (e.g., `/legacy/about`, `/legacy/challenge`, `/legacy/news/some-article`)
- [ ] Legacy layout route provides ThemeProvider, FeedbackProvider, Navbar, Footer, and PrototypeSwitcher
- [ ] All four legacy presets (A-D) work via `?version=` param under `/legacy`
- [ ] Missing or invalid `?version=` defaults to Preset A under `/legacy`
- [ ] Custom theme builder and feedback panel function as before under `/legacy`
- [ ] No redirects from old top-level paths
- [ ] TanStack Router route tree regenerates cleanly with the new directory structure

## Blocked by

None — can start immediately.
