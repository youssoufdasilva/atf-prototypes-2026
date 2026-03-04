# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Single-service client-side React SPA (no backend, no database). Commands and architecture are documented in `CLAUDE.md` and `README.md`.

### Runtime

Bun is the package manager and runtime (`bun.lock`). Install it via `curl -fsSL https://bun.sh/install | bash` if missing, then ensure `~/.bun/bin` is on `PATH`.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `bun install` |
| Dev server (port 3000) | `bun --bun run dev` |
| Build + type-check | `bun --bun run build` |
| Tests | `bun --bun run test` |

### Notes

- No ESLint is configured; the only lint-style check is `tsc` (run as part of `bun --bun run build`).
- No test files exist yet; `vitest run` exits with code 1 when there are zero test files — this is expected.
- Adding shadcn components requires pnpm: `pnpm dlx shadcn@latest add <component>`.
