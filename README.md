# Next.js App Router Boilerplate — Operational Guide

This repository powers **CopyLift**, the AI-driven SaaS that generates marketing copy for landing pages.

---

## 1. Current Scope
- Product: **CopyLift — Landing Page Copy Generator**
- Instantly produce high-converting landing page text from product information or a website URL
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
  layout.tsx        # Root layout, loads fonts, applies globals, sets site metadata (CopyLift branding)
  page.tsx          # CopyLift generator landing page with dual flows: Product Info & Website URL
  globals.css       # Global styles; Tailwind entrypoint, dark mode support
public/             # Static assets (logos/icons)
scripts/            # Ops helpers (minimal placeholders)
  dev-supervisor.js # Runs Next dev server
  db-init.js        # No-op (no DB)
  git-poll.js       # Polls git origin for branch updates
  error-reporter.ts # Client-safe error forwarder (imported via components/ErrorReporter)
components/
  ErrorReporter.tsx # Error propagation for UI
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

## 4. Install &amp; Run
```bash
npm install
npm run dev   # starts Next.js on localhost:3000
npm run lint  # ESLint
npm run build # production build
```

## 5. Major Features: CopyLift Generator UI
- **Dual-Mode Form:** Toggle between:
  - **Generate Copy From Product Info**
    - Enter product name and description.
    - Generates: Headline, Subheadline, Features, and CTA.
  - **Generate Copy From Website URL**
    - Enter URL of landing page.
    - Analyzes site and generates: Headline, Features Summary, and CTA.
- **Production-Ready UX:** Responsive, accessible, and styled with Tailwind.
- **Copy-to-Clipboard:** Easily copy any generated text block with a single click.
- **Input Validation &amp; Error Handling:** Prevent empty/invalid submissions, handle errors gracefully.
- **Instant Results:** Copy generation is handled inline (stub AI logic for now; upgrade to API as needed).
- **Footer:** Owner contact — Chirag Dodiya (<hi@chirag.co>).

## 6. Styling
- Tailwind enabled via `app/globals.css` (`@import "tailwindcss";`).
- Responsive styles, accessible forms, clean sectioning, dark mode supported.
- No custom Tailwind config; extend only as needed.

## 7. Data &amp; Backend
- No persistent backend or data layer yet.
- Copy generation logic is local/stubbed. (Swap with OpenAI or similar as needed.)
- No authentication; all features are public.

## 8. Adding/Improving Features
- Update `app/page.tsx` for UI/logic improvements.
- Add new modules under `components/` (UI primitives), `lib/` (server helpers), or via route groups as needed.
- Document any new backend, API, or dashboard areas in FILES.md and RULES.md before implementing.

## 9. Owner &amp; Contact
- Project by Chirag Dodiya
- Contact: [hi@chirag.co](mailto:hi@chirag.co)

## 10. Deployment
- Target: Next.js on Vercel or any Node 18+ host.
- Docker support included.
- No secrets/env vars required.

---

Operate cautiously, keep changes small, and align new features with the documented structure. When uncertain: **STOP AND ASK**.