# ADR-0001: Version parameter scoped per subpath

## Status

Accepted

## Date

2026-05-04

## Context

The prototype app is being reorganized into URL subpaths (`/legacy`, `/claude-design`, and potentially more in the future). Each subpath has its own set of presets. Legacy has presets A-D; claude-design has presets A-B. Both use a `?version=` search parameter to select the active preset.

The question was whether to use different parameter names or value schemes per subpath to avoid the letter "A" meaning different things in different contexts.

Alternatives considered:

1. **Reuse `?version=A|B`** — same param, same values, meaning scoped per subpath.
2. **Different param values** — e.g., `?preset=alpha|beta` or `?preset=1|2` for claude-design.
3. **Route-based presets** — e.g., `/claude-design/preset-a/about` instead of a query parameter.

## Decision

Use the same `?version=` parameter with the same value space (A, B, etc.) across all subpaths. The meaning of each value is scoped to the subpath it appears in.

## Consequences

- "Version A" under `/legacy` (Pan-African preset) is a completely different design from "Version A" under `/claude-design` (handoff design language). This is intentional and not a collision — the URL path already disambiguates.
- Each subpath has its own ThemeContext and type definitions, so there is no shared code where the values are ambiguous.
- Future subpaths can adopt the same pattern without inventing new parameter names or value prefixes.
- Developers reading the code must understand that `?version=A` means different things depending on which route subtree they are in. The subpath isolation (separate layout routes, separate providers) makes this structurally clear.
- Missing or invalid `?version=` values silently default to Preset A in all subpaths. No error pages, no redirects.
