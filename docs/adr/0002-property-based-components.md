# ADR-0002: Property-based rendering for claude-design section components

## Status

Accepted

## Date

2026-05-04

## Context

The legacy prototype uses two patterns for rendering preset-specific variations:

1. **Factory pattern** (Hero, Footer): a switch statement maps the version string to a dedicated component (`HeroA`, `HeroB`, etc.). Each preset gets its own file with its own implementation. Adding a preset means creating a new component file and updating the switch.

2. **Property-based pattern** (Programs, Geographic, SocialProof, Impact): components read theme configuration properties (e.g., `theme.geographicStyle`, `theme.heroLayout`) and adjust their rendering accordingly. One component per section, variations driven by data.

For `/claude-design`, we needed to choose which pattern to standardize on. Both presets share the same design foundation (Opportunity Triangle, diagonal dividers, brand geometry from the handoff) and differ primarily in tone — color, typography weight, whitespace — not structure.

Alternatives considered:

1. **Factory pattern everywhere** — explicit, but doubles component files for every section with only 2 presets.
2. **Property-based everywhere** — one component per section, variations driven by theme config.
3. **Hybrid** — factory for structurally different sections, property-based for token-level differences.

## Decision

All `/claude-design` section components use the property-based pattern. No version-switch factories.

## Consequences

- One component file per section. Preset-specific variations are expressed as theme config properties, not separate component trees.
- Adding a future Preset C to `/claude-design` is a data-only change: add a new theme config entry. No new component files, no switch-case updates.
- Components must be designed to handle variation through props/config rather than complete reimplementation. This works well when presets share structural foundations and differ in tokens/tone — which is the case for claude-design.
- This decision applies only to `/claude-design`. Legacy retains its existing patterns. Future subpaths can make their own choice based on how structurally different their presets are.
