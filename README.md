# Next.js App Router Boilerplate — Operational Guide

This repository is a minimal Next.js 16 (App Router) starter with React 19, TypeScript, Tailwind-ready PostCSS, and no backend/auth/billing. Use this document as the single operational reference. If anything is unclear: **STOP AND ASK** before proceeding.

---

## 1. Current Scope
- Purpose: baseline UI scaffold for future SaaS features.
- No authentication, database, or API layer is present.
- No env vars are required yet; `env.example` does not exist.

## 2. Technology Stack
- Next.js 16 App Router (server-first, file-based routing).
- React 19, TypeScript 5 (strict).
- Styling: Tailwind via `@tailwindcss/postcss` pipeline; global CSS in `app/globals.css`.
- Tooling: ESLint 9 (`eslint-config-next`), PostCSS, Next font loader (Geist).

## 3. Project Structure
```
app/
  layout.tsx        # Root layout, loads fonts, applies globals
  page.tsx          # Public landing page (server component)
  globals.css       # Global styles; Tailwind entrypoint
public/             # Static assets (logos/icons)
scripts/            # Ops helpers (minimal placeholders)
  dev-supervisor.js # Runs Next dev server
  db-init.js        # No-op (no DB)
  git-poll.js       # Polls git origin for branch updates
  error-reporter.ts # Client-safe error forwarder (imported via components/ErrorReporter)
Dockerfile          # Container definition (npm ci, runs dev-supervisor)
eslint.config.mjs   # ESLint configuration
next.config.ts      # Next.js config (minimal)
postcss.config.mjs  # PostCSS plugins (Tailwind-ready)
tsconfig.json       # TypeScript config
package.json        # Scripts and dependencies
package-lock.json   # Locked dependency tree
FILES.md            # Structural index
RULES.md            # Change boundaries (boilerplate)
```

## 4. Install & Run
```bash
npm install
npm run dev   # starts Next.js on localhost:3000
npm run lint  # ESLint
npm run build # production build
```

## 5. Routing & Components
- Public landing page: `app/page.tsx`.
- No route groups exist yet. When adding authenticated/dashboard areas, create `app/(dashboard)/...` and reuse shared layouts there (see RULES.md).
- Keep components server-side by default; add `"use client"` only when required by client hooks/state.

## 6. Styling
- Tailwind is enabled via `app/globals.css` (`@import "tailwindcss";`). There is no standalone `tailwind.config` yet; add one only if needed.
- Limit global styles; prefer component- or route-scoped styles.
- Fonts are loaded through `next/font` (Geist). Keep overrides minimal.

## 7. Environment & Secrets
- No env vars are defined. If you need configuration, first add `env.example` with keys and descriptions, then consume via `process.env.<KEY>`. Never commit secrets.

## 8. Data & Backend (Absent)
- No Prisma/ORM, no API routes, no database connections. When introducing data access, place server-only helpers under `lib/` and add API routes or server actions within `app/`. Document new contracts in FILES.md and RULES.md.

## 9. Testing (Not Present)
- No tests are included. If adding tests, prefer:
  - Unit: `__tests__/` or co-located `*.test.tsx`
  - E2E: Playwright under `e2e/`
  - Provide lightweight mocks/utilities

## 10. Change Guidelines
- Default to minimal diffs; avoid rewrites.
- Do not move files across route groups without coordination.
- Avoid new Markdown explainer files unless explicitly requested; update existing docs instead.
- Do not introduce time- or randomness-dependent values directly in React render (`Date.now()`, `Math.random()`). Precompute in server components, constants, or `useEffect` if client-only.
- If adding auth, billing, or DB: update RULES.md and FILES.md first, then implement.
- Only `scripts/error-reporter.ts` may be imported into runtime UI (via `components/ErrorReporter.tsx`); keep other scripts server-only.

## 11. Hard Stops
- Unclear requirements or missing context.
- Requests to alter session/cookie behavior (not present) without approval.
- Hand-editing generated migration SQL (when Prisma is added).
- Storing or logging secrets in code or assets.

## 12. Deployment
- Default target: Next.js on Vercel or any Node 18+ host.
- Docker support is not configured. Add a `Dockerfile` only with explicit need and document it.

---

Operate cautiously, keep changes small, and align new features with the documented structure. When uncertain: **STOP AND ASK**.
