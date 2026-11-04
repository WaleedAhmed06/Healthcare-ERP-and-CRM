# Development standards

- Next.js App Router, TypeScript strict mode and pnpm only.
- Tailwind CSS v4 and official shadcn/ui primitives in `src/components/ui`.
- Shared composition in `src/components/shared`; app chrome in `src/components/layout`.
- Feature ownership in `src/features/<feature>/{components,hooks,services,schemas,types,config,mocks}`.
- Keep route files thin. No business logic, fetch calls or localStorage access in routes.
- TanStack Query owns asynchronous records; Zustand owns session and interactive UI state.
- Data access goes through repository contracts. Keep mock and HTTP adapters separate.
- Backend endpoints must enforce authenticated organization, branch, staff assignment and patient access. Browser role gates are demonstrations only.
- Keep provider credentials server-side. The chatbot remains a labelled scripted demo until a server provider exists.
- Use fictional data only. No live medical, insurance or payment integrations.
- Preserve Slate & Coral theme tokens.
- Before handoff run `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` and `pnpm format:check`.
- Update `docs/REQUIREMENTS.md` truthfully. Generic record CRUD does not imply a specialty workflow is complete.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
