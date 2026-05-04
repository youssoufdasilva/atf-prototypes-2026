# PRD: Subpath-Based Prototype Reorganization

## Problem Statement

The ATF prototype comparison app currently hosts four design presets (A-D) at the top level, all following the dev team's original visual system. The design team has delivered a separate prototype (`atf-claude-design-handoff/`) with a distinct visual language built around the Opportunity Triangle, brand red, and Montserrat/DM Sans typography. The org has agreed that the final ATF website should be a combination of both prototypes, but there is no structure in place to compare the two design directions side by side, or to iterate on new presets independently without interfering with existing ones.

The current architecture also makes it difficult to add fundamentally different design systems — the ThemeContext, layout shell, and section components are tightly coupled to the legacy preset vocabulary (A/B/C/D), and new presets with different visual foundations would require invasive changes to shared code.

## Solution

Reorganize the prototype app using URL subpaths to isolate distinct design families. Each subpath gets its own layout shell, providers, and component set, enabling fundamentally different visual systems to coexist without coupling.

- **`/`** — A minimal chooser page that orients visitors and links to each prototype family.
- **`/legacy/...`** — All current pages and presets (A-D) relocated under this prefix. Fully functional, accessible, but no longer the primary focus.
- **`/claude-design/...`** — A new prototype family with two presets, both built on the design team's handoff visual language (Opportunity Triangle geometry, brand red, diagonal dividers, Montserrat/DM Sans/Clesmont typography). Same page set as legacy.

This structure is designed to support future subpaths with entirely different design systems as the org iterates toward a final direction.

## User Stories

1. As a stakeholder, I want to visit the root URL and immediately see which prototype families are available, so that I can navigate to the one I want to review without guessing paths.
2. As a stakeholder, I want to access the legacy prototypes at `/legacy` with all four presets working exactly as before, so that prior review feedback remains valid and I can reference them during comparison.
3. As a stakeholder, I want to view the claude-design prototypes at `/claude-design`, so that I can evaluate the design team's visual direction applied to the full site.
4. As a stakeholder, I want to toggle between Preset A and Preset B within `/claude-design` using a minimal switcher, so that I can compare the two new design directions quickly.
5. As a stakeholder, I want Preset A to faithfully represent the design team's handoff visual language (Opportunity Triangle, brand red, diagonal dividers, Montserrat/DM Sans), so that I can evaluate their design direction as intended.
5a. As a stakeholder, I want to review improvised designs for pages not covered by the handoff (challenge, articles, chapters, consulting, publications, research, team, privacy-policy, terms-of-service) before they are finalized, so that the design team's intent is preserved even where the handoff doesn't provide explicit guidance.
6. As a partner or funder evaluating ATF, I want Preset B to project an institutional, credible tone through color palette, typography weight, and whitespace adjustments (not structural layout changes), so that the site communicates the seriousness and trustworthiness of the organization while sharing the same Opportunity Triangle foundation as Preset A.
7. As a potential ATF Challenge participant, I want Preset B to still feel engaging and accessible as a secondary audience, so that I'm motivated to explore programs and apply.
8. As a stakeholder, I want both claude-design presets to cover all the pages from the legacy prototype (home, about, challenge, news, articles, chapters, consulting, publications, research, team, privacy-policy, terms-of-service), so that I can evaluate the design direction across the full breadth of the site. The handoff covers Home, Programs (→ Challenge), Events (→ News), and About directly; the remaining pages are improvised from the handoff design language and subject to stakeholder review.
9. As a stakeholder, I want the `/claude-design` presets to use `?version=A` and `?version=B` in the URL, so that I can bookmark and share links to specific presets. Missing or invalid `?version=` values silently default to Preset A.
10. As a developer, I want each subpath to have its own layout route with isolated providers (ThemeContext, navbar, footer, switcher), so that I can work on one prototype family without risking regressions in another.
11. As a developer, I want the chooser page at `/` to have no shared navbar, footer, or theme providers, so that it remains a lightweight entry point with no coupling to any prototype family. The chooser is intentionally bare: ATF logo, a one-sentence explanation, and links to each prototype family.
12. As a developer, I want shared UI primitives (button, card, accordion, etc.) to remain in `src/components/ui/` and be importable by any subpath, so that I don't duplicate unstyled component logic.
13. As a developer, I want the Logo component and any other shared components that currently read from ThemeContext to accept props instead of importing context directly, so that they can be used across subpaths with different ThemeContext implementations.
14. As a developer, I want fonts for `/claude-design` (Montserrat, DM Sans, Clesmont) to be self-hosted in `public/fonts/` and loaded only from the claude-design layout route, so that they don't affect legacy load performance.
15. As a developer, I want the `atf-claude-design-handoff/` folder to remain in the repo as a read-only design reference during implementation, so that I can cross-reference the original prototype while building.
16. As a QA reviewer, I want the handoff folder to be deleted only after QA sign-off on the claude-design implementation, so that the reference is available throughout the verification process.
17. As a developer, I want no redirects from old top-level routes to `/legacy/...`, so that the routing setup is a clean break with no redirect maintenance burden.
18. As a future developer, I want to be able to add a new subpath (e.g., `/community-design`) with its own design system by following the same pattern as `/legacy` and `/claude-design`, without modifying shared code.
19. As a stakeholder, I want the `/claude-design` switcher to be a small floating pill/toggle anchored at the bottom-right (similar placement to legacy, but much simpler), so that switching between Preset A and B feels intentional and polished without the complexity of the legacy PrototypeSwitcher.
20. As a developer, I want `/claude-design` section components to use a property-based pattern (rendering driven by theme config properties) rather than version-switch factories, so that adding a future Preset C requires only a new theme config entry, not new component files.

## Implementation Decisions

### Routing architecture

- TanStack Router file-based routing with URL path prefixes: `src/routes/legacy/` and `src/routes/claude-design/` directories, each with their own layout routes.
- The root `src/routes/index.tsx` becomes the chooser page. All current top-level route files move into `src/routes/legacy/`.
- No redirects from old paths. Clean break.

### Layout isolation

- Each subpath has its own layout route (`__root.tsx` or `_layout.tsx` equivalent) providing its own ThemeContext, navbar, footer, and switcher.
- The top-level `__root.tsx` becomes a bare `<Outlet />` with no providers.
- The root `/` chooser page is bare — no providers, no chrome.
- Legacy's layout route takes over the providers and chrome currently in `__root.tsx` (ThemeProvider, FeedbackProvider, Navbar, Footer, PrototypeSwitcher).
- Claude-design's layout route provides its own minimal ThemeContext, navbar, footer, and floating pill switcher.
- FeedbackContext and the full PrototypeSwitcher (builder + feedback tabs) are legacy-only.
- This pattern is designed to scale to future subpaths with different design systems.

### Version parameter scoping (ADR-0001)

- Both `/legacy` and `/claude-design` use the `?version=` search parameter with the same value space (A, B, etc.).
- The meaning of each value is scoped to its subpath. "A" under `/legacy` means Pan-African; "A" under `/claude-design` means the handoff design language.
- This avoids inventing new parameter names or value prefixes for each prototype family.

### Component pattern for claude-design (ADR-0002)

- All `/claude-design` section components use the property-based rendering pattern: components read theme config properties and adjust rendering accordingly.
- No version-switch factory pattern (no `switch(version) { case "A": return <ComponentA /> }`).
- This keeps one component file per section and makes adding presets a data-only change.

### Shared UI primitives

- `src/components/ui/` (shadcn components) are shared across all subpaths. They are styled via CSS custom properties set by each subpath's ThemeContext.
- No forking or duplication of UI primitives.
- An explicit CSS custom property contract defines the required set of variables that shared UI components depend on. Each subpath's ThemeContext must set all of them. Subpaths may set additional variables for their own components, but the shared set is mandatory.

### Claude-design ThemeContext

- Minimal implementation: manages version (A or B), resolves the theme config, and applies CSS custom properties. URL `?version=` param is the single source of truth.
- No custom theme builder, no accent color overrides, no localStorage persistence.
- Missing or invalid `?version=` silently defaults to Preset A.

### Shared components: props over context

- Components in `src/components/ui/` that currently import `useTheme` (e.g., Logo) will be refactored to accept the relevant values as props instead.
- This makes them portable across subpaths with different ThemeContext implementations.

### Font strategy

- Handoff fonts (Montserrat, DM Sans, Clesmont) are self-hosted in `public/fonts/`.
- Font-face declarations and loading are scoped to the `/claude-design` layout route.
- Legacy fonts remain loaded from Google Fonts as they are today.

### Design language for presets

- **Preset A**: Faithful application of the design handoff's visual language — Opportunity Triangle geometry, brand red (#F90036), dark transition strips, diagonal dividers, accent triangles, Montserrat headings, DM Sans body text. Applied across all pages.
- **Preset B**: Tone shift only — same Opportunity Triangle structural foundation as Preset A (same hero layout, same diagonal dividers, same section structure). Differentiated through color palette, typography weight, and whitespace to project an institutional, credible tone for partners and funders (primary audience) and ATF Challenge participants (secondary audience). Distinct from Legacy C's serif-and-muted-green approach. No structural layout divergence from Preset A.

### Handoff-to-legacy page mapping

- Handoff **Home** → claude-design **Home**
- Handoff **Programs** → claude-design **Challenge** (closest content match)
- Handoff **Events** → claude-design **News** (legacy has no Events page)
- Handoff **About** → claude-design **About**
- Remaining pages (articles, chapters, consulting, publications, research, team, privacy-policy, terms-of-service) are improvised from the handoff design language and subject to stakeholder review before finalization.

### Handoff folder lifecycle

- `atf-claude-design-handoff/` remains in the repo as a read-only reference throughout development.
- Fonts and token values are copied into the main project during implementation.
- The folder is deleted after QA sign-off, not before.

## Testing Decisions

A good test for this project verifies external behavior through the module's public interface — what a user or consuming component observes — not implementation details like internal state shape or CSS class names.

### Modules to test

- **Chooser page**: renders links to both subpaths, navigates correctly.
- **Legacy route migration**: all legacy pages render under `/legacy/...` with the same content and functionality as before. Presets A-D work via `?version=` param.
- **Claude-design ThemeContext**: applies correct CSS variables for Preset A and Preset B, syncs with URL `?version=` param, handles invalid/missing values.
- **Claude-design section components**: render correctly for both preset configurations, respond to theme property changes.
- **Shared UI component refactor (Logo)**: renders correct variant when given props, no longer depends on ThemeContext import.
- **Font loading**: handoff fonts load under `/claude-design` routes, do not load under `/legacy` routes.

### Prior art

- The existing codebase does not appear to have tests yet, but `vitest` is configured. Tests should follow vitest + React Testing Library conventions.

## Out of Scope

- **Production site build**: this is a prototype comparison tool, not the final ATF website.
- **Mobile navigation**: the handoff explicitly notes that hamburger menu / mobile nav is not covered.
- **Animation and motion**: the handoff brand system specifies "minimal; no animation defined."
- **Real content**: all copy, program names, event details, and stats remain placeholders.
- **Dark mode or alternative themes within claude-design**: Preset B's "institutional feel" is a tone shift, not a light/dark toggle.
- **Feedback system for claude-design**: feedback will be collected outside the app.
- **Redirects from old top-level routes**: stakeholders will use the chooser page to navigate.
- **Legacy code changes**: the legacy subpath should be a pure relocation with no functional modifications. Structural wiring changes (layout route setup, Logo prop passing) are expected and necessary, but `/legacy` with any preset must look and behave identically to what the top-level routes do today.

## Further Notes

- The two ADRs (version parameter scoping, property-based component pattern) should be written before implementation begins.
- The handoff's `CONTEXT.md` contains the authoritative design language documentation for the Opportunity Triangle, diagonal dividers, accent triangles, and design tokens. Developers implementing `/claude-design` should read it before writing component code.
- The `design-ref-implementation/` folder within the handoff contains collateral posters and social card templates that show how the triangle family should feel across different formats — useful for extrapolating designs to pages the handoff doesn't cover.
- This structure is intentionally designed to support additional subpaths in the future as the org iterates on design directions.
