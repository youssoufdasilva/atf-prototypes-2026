# ATF Prototype Comparison App

A multi-subpath prototype comparison tool that lets stakeholders evaluate different design directions for the ATF website side by side.

## Language

### Structure

**Subpath**:
A URL path prefix (`/legacy`, `/claude-design`) that isolates a prototype family with its own design system, layout shell, and providers.
_Avoid_: Route group, section, module

**Layout shell**:
The layout route that wraps all pages within a subpath, providing its theme context, navbar, footer, and switcher.
_Avoid_: Layout wrapper, shell component

**Preset**:
A specific design configuration within a subpath, selected via `?version=A`. "Preset A" and "Version A" are synonymous. The meaning of a preset letter is scoped to its subpath — "A" under `/legacy` is a different design from "A" under `/claude-design`.
_Avoid_: Theme (overloaded with ThemeContext), variant

**Chooser page**:
The bare page at `/` that links to each subpath. No providers, no chrome.
_Avoid_: Landing page, home page (conflicts with the Home page within each subpath)

### Design language (claude-design)

**Opportunity Triangle**:
ATF's core graphic device — a diagonal polygon (~22deg from vertical) dividing a composition into a photo zone and a brand zone (brand red, `#F90036`). Appears as filled (hero, primary compositions) or outline (CTA band). Orients landscape (desktop) or portrait (mobile).
_Avoid_: Hero triangle, diagonal hero

**Diagonal divider**:
A lightweight SVG element that replaces flat horizontal boundaries between page sections with a diagonal cut. Configured by `fromColor`, `toColor`, and `direction` (left-to-right or right-to-left).
_Avoid_: Section separator, angled divider

**Accent triangle**:
Small decorative triangles (12-24px) placed at polygon vertices, section corners, or stat counters. Implemented with CSS borders, not SVG. Used sparingly (2-3 per section).
_Avoid_: Decorative triangle, marker

**Dark transition strip**:
A narrow strip of darker red (`#C0002A`) along the diagonal edge between photo zone and brand zone, adding depth to the Opportunity Triangle.

**Header theme**:
One of three navbar background modes (dark, light, brand) assigned per route, not per preset.
_Avoid_: Nav style, header variant

## Relationships

- A **subpath** contains one **layout shell** and one or more **presets**
- A **preset** is selected by the `?version=` URL parameter, scoped to its **subpath** (ADR-0001)
- The **chooser page** links to each **subpath** but belongs to none
- An **Opportunity Triangle** may contain a **dark transition strip** along its diagonal edge
- **Accent triangles** mark vertices of the **Opportunity Triangle** and appear independently in other sections
- **Diagonal dividers** separate page sections; they are not part of the **Opportunity Triangle**

## Example dialogue

> **Dev:** "Should the new **preset** use a different **header theme** on the About page?"
> **Domain expert:** "No — **header theme** is per route, not per **preset**. Both presets use light on About."

> **Dev:** "Is the **diagonal divider** between Stats and Events the same component as the diagonal in the **Opportunity Triangle**?"
> **Domain expert:** "No. The **Opportunity Triangle** is a polygon with zones. A **diagonal divider** is a simple SVG cut between sections. Different concepts, similar angle."

## Flagged ambiguities

- "theme" was used to mean both the ThemeContext (provider) and a design preset. Resolved: use **preset** for the design configuration, "ThemeContext" for the React provider.
- "version" overlaps with **preset**. Both are acceptable in UI-facing contexts (`?version=A`), but in code and documentation, prefer **preset** when referring to the design configuration itself.
