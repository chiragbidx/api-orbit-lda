# RULES.md — Change Boundaries & Placement (Boilerplate)

No auth, dashboard, or data layer exists yet. These guardrails keep changes predictable. Update this file first if scope expands.

## 1) Routing & Placement
- Public/marketing pages live directly under `app/` (e.g., `app/page.tsx`, `app/about/page.tsx`).
- When a dashboard is added, place authenticated pages under `app/(dashboard)/dashboard/` and reuse the shared dashboard layout there.
- Auth flows (when added) belong in `app/(login)/` with their server actions in the same segment.
- New feature areas should use `app/(dashboard)/<feature>/` once the dashboard shell exists.
- Navigation/sidebar definitions should reside in `app/(dashboard)/dashboard/layout.tsx` once created; add nav entries in the same change as the new page.

## 2) Dashboard Page Pattern (Future)
- Use `app/(dashboard)/dashboard/general/page.tsx` as the reference once it exists (spacing, heading, card wrapper, forms).
- Keep dashboard pages as Server Components; add `'use client'` only when client hooks are needed.
- Preserve the shared sidebar/main shell in `dashboard/layout.tsx`; do not reimplement sidebars per page.

## 3) Backend & Data
- Backend/data layer is absent. When adding data access, centralize helpers in `lib/db/queries.ts` instead of ad-hoc queries.
- Stripe/billing (if introduced) goes in `lib/payments/*`; update server actions and route handlers together.
- Prisma (future): edit `prisma/schema.prisma`; generate migrations via `npx prisma migrate dev --name <feature>` for validation; never hand-edit migration SQL.
- Avoid time- or randomness-dependent values inside React render (`new Date()`, `Date.now()`, `Math.random()`). Precompute in server components, shared constants, or `useEffect` for client-only needs.

## 4) Auth & Security (Future)
- Session/cookie semantics (`lib/auth/session.ts`, `middleware.ts`) require explicit approval once they exist.
- Guard mutations with validated wrappers (`validatedAction*`, `withTeam`) when available; do not bypass them.

## 5) Infrastructure & Scripts
- Treat `scripts/` as infrastructure; adjust only with intent (currently minimal placeholders).
- Respect existing path structure; avoid moving files across route groups without agreement.
- Runtime UI may import only `scripts/error-reporter.ts` (via `components/ErrorReporter.tsx`); keep other scripts server-only.

## 6) Coordination
- Keep shared UI primitives backward compatible or update all consumers.
- For cross-cutting changes, document affected routes/actions in PR/commit notes.
- Avoid creating new `*.md` explainer files unless explicitly requested; prefer updating existing docs.
