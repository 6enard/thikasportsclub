# Project memory

## Product intent & audience

- Production website with a homepage featuring a testimonial section; deployed on Vercel.
- Testimonials showcase user/customer "voices" to build credibility.

## Brand personality & voice

- Not yet inferred beyond production-quality expectations.

## Visual design & UX direction

- Homepage includes a testimonial section rendered from data, with empty-state handling.
- Fallback pattern: show three sample testimonials immediately, then upgrade to database versions when the live response succeeds.

## Decisions, constraints & rationale

- **Vite + React** framework with JSX, Tailwind CSS, React hooks, and Lucide React icons (per `.bolt/prompt`).
- Testimonials sourced from a database; sample rows exist and are published.
- Deployed page was not receiving the database response, so a local fallback array was added to guarantee visible content while keeping the database as the live source.
- Build verified successfully before redeployment.
- Path alias `@/` maps to `src/`; use it instead of deep relative imports.

## Open questions & assumptions

- Root cause of the online content request failing in the deployed environment is unresolved.
- Assumption: the database/API is accessible in some environments but not reliably in production; fallback is a safety net, not a permanent replacement.
- Whether other data-driven sections have similar request-failure risks is unknown.