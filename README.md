# CareOS Healthcare ERP and CRM

Frontend healthcare ERP built with Next.js App Router, TypeScript, pnpm, Tailwind CSS v4 and shadcn/ui. Theme: Slate & Coral.

## Run

Requires Node.js 20.9+ and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. Choose an organization and role. Demo email: `clinic@healthdemo.com`; password: `123456`.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

Webpack is used because Turbopack worker-port initialization is restricted in the authoring environment. This is a standard Next.js App Router application.

## Structure

```text
src/
  app/                         Thin routes and layouts
    (auth)/login/
    (workspace)/
  components/
    ui/                        Official shadcn primitives
    shared/
      forms/                   Reusable schema-driven editing
      records/                 Tables, details and actions
    layout/
      sidebar/
      header/
    providers/
  features/
    patients/
      components/
      hooks/
      services/
      schemas/
      types/
      config/
      mocks/
    appointments/
    invoices/
    admissions/
    chatbot/
    ...                        33 entity modules plus supporting features
  hooks/                       Reusable query, form, relation and scope hooks
  services/
    contracts/                 Repository interfaces
    api/                       HTTP client and API adapter
    mock/                      Browser transaction store and mock adapter
    export/
  schemas/                     Shared schema factories
  types/                       Cross-feature contracts
  stores/                      Zustand session state
  config/                      Features, roles and organizations
  mocks/                       Seed composition only
  lib/                         Pure utilities
```

See `docs/ARCHITECTURE.md` for backend integration and `docs/REQUIREMENTS.md` for current coverage and remaining work.

This initial implementation does not complete the entire requirements document. Browser persistence and demo role gates are not production security. Clinical data, payments and chatbot replies are demonstrations.
