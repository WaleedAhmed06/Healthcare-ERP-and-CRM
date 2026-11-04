# Architecture and backend integration

## Boundaries

Routes select a feature screen. Features compose shared components and specialized panels. Components use query hooks, which call feature services. Services depend on `Repository<T>` or an explicit workflow contract. The repository factory selects a mock or HTTP adapter.

The shared editor serves simple record management. Specialized interfaces live in their feature: dental chart, calendar, bed board, checkout and photo comparison. Expand these independently rather than adding more domain conditions to the shared editor.

Zustand owns session and chat UI state. TanStack Query owns lists, mutations and invalidation. Local transactions persist related updates as one browser snapshot; storage failure leaves the previous in-memory snapshot unchanged.

## API migration

1. Implement the backend before setting `NEXT_PUBLIC_DATA_SOURCE=api`.
2. Configure `NEXT_PUBLIC_API_BASE_URL`. Never put secrets in public environment variables.
3. Implement resource endpoints: GET list/detail, POST create, PATCH update and DELETE.
4. Implement POST `/payments`, `/refunds` and `/workflows/:action` as authenticated transactions with idempotency, audit trails and database constraints.
5. Replace demo identity with real authentication. Derive organization and patient scope from the server session; do not trust browser query parameters.
6. Expand feature types into explicit DTOs and response schemas as backend domains are introduced. Generic table infrastructure remains domain-neutral.
7. Add attachment storage and signed URLs. Current file upload stores metadata only; photo previews stay in memory.
8. Replace `AssistantService` with a server-backed model provider. Supply only authorized data and keep credentials server-side.

No backend endpoints are implemented. API mode without a backend shows request errors; it never silently falls back to local data.

## Demo limitations

LocalStorage is not encrypted, cannot enforce authorization and does not synchronize across devices. There is no production authentication, live medical integration, insurance submission or real payment processing. Role gates illustrate access patterns only. The gateway never collects real card or wallet details.

## Validation

Workflow tests cover scope, overlapping appointments, occupied-bed rejection, tax/discount calculation, partial payments, idempotency, declined payments, cross-organization payment rejection, overpayment and refunds. Full cross-role browser scenarios remain an acceptance gate.
