# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun --bun run dev          # Start dev server on port 3000
bun --bun run build        # Build for production (vite build && tsc)
bun --bun run test         # Run all tests with vitest
bun --bun run test <file>  # Run a single test file
```

## Architecture

This is a **prototype comparison app** for the African Technology Forum (ATF) Org website designs. It allows switching between four visual themes (A, B, C, D) to compare different design directions.

### Theme System

The app uses a version-based theming system where each version represents a distinct visual identity:

- **Version A**: Pan-African (vibrant patterns, geometric)
- **Version B**: Tech-Forward (dark mode, gradients)
- **Version C**: Institutional (professional, serif accents)
- **Version D**: Warm (earthy tones, organic shapes)

Theme definitions live in `src/lib/themes.ts`. The `ThemeContext` (`src/contexts/ThemeContext.tsx`) manages state and applies CSS custom properties to the document root.

### Version-Specific Components

Page sections render different implementations based on the active version. Example pattern from `src/components/sections/Hero/index.tsx`:

```tsx
switch (version) {
  case "A":
    return <HeroA />;
  case "B":
    return <HeroB />;
  // ...
}
```

This pattern is used across section components (Hero, Impact, Programs, etc.).

### Key Directories

- `src/routes/` - TanStack Router file-based routes (auto-generated `routeTree.gen.ts`)
- `src/components/sections/` - Page sections with version-specific variants
- `src/components/switcher/` - Prototype switcher UI (theme/feedback controls)
- `src/components/ui/` - Shared UI primitives (shadcn-style)
- `src/contexts/` - React contexts (ThemeContext, FeedbackContext)

### Routing

Uses TanStack Router with file-based routing and automatic code splitting. Routes are defined in `src/routes/` and the route tree is auto-generated.

### Styling

- Tailwind CSS v4 with Vite plugin
- CSS custom properties for theme colors (set by ThemeContext)
- shadcn/ui components in `src/components/ui/`

## Adding shadcn Components

```bash
pnpm dlx shadcn@latest add <component>
```

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)
