# Issue 002: Logo refactor: props over context

**Type:** AFK

## What to build

Refactor the Logo component (and any other shared components in `src/components/ui/` that import `useTheme` directly) to accept the relevant values as props instead. This makes them portable across subpaths with different ThemeContext implementations.

The Logo currently reads `isDarkTheme` and `theme.logoVariant` from ThemeContext to decide which logo image to render. After refactoring, the caller passes these values as props. The legacy layout route passes them from its ThemeContext; the future claude-design layout route will pass them from its own context.

## Acceptance criteria

- [ ] Logo component accepts props for logo variant selection instead of importing `useTheme`
- [ ] Logo component has no direct dependency on any ThemeContext
- [ ] Legacy layout route passes the correct props to Logo so rendering is unchanged
- [ ] No other components in `src/components/ui/` import `useTheme` directly (audit and refactor any that do)
- [ ] All legacy presets render the correct logo variant as before

## Blocked by

None — can start immediately (parallel with Issue 001).
