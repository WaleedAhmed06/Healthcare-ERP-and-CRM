# Requirements coverage

This checklist is conservative. Record CRUD is not a completed specialized workflow.

| Area              | Implemented                                                                                                                       | Remaining acceptance work                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Foundation        | Next.js App Router, strict TypeScript, pnpm, Tailwind v4, official shadcn; separated features/services/hooks/schemas/types/stores | Full responsive and accessibility QA                                                     |
| Identity          | Login, 13 roles, six organizations, branch switching, patient scope and role navigation                                           | Assigned-practitioner scope, full permission matrix and business-type presets            |
| Platform          | Organization/subscription CRUD, plan/expiry/limits fields                                                                         | Platform analytics, users, trial enforcement and branding                                |
| Patients          | 540 fictional patients, registration/editing/search/export, linked history, allergies and categories                              | Rich profile sections, referrals, photos and document downloads                          |
| Appointments      | CRUD/status, day/week/month calendar, practitioner filter and conflict rejection                                                  | Slot picker, recurring expansion, holidays/break rules, room and department views        |
| Queue             | Check-in, call, consultation, completion and tokens                                                                               | Waiting-time display and public waiting-room screen                                      |
| Clinical          | Vitals/diagnosis/consultation records, prescriptions, plans, follow-ups, linked history                                           | Guided consultation, BMI, prescription line items and professional print layouts         |
| Nursing           | Tasks, observations, shifts, medication administration and ward fields                                                            | Assigned ward dashboard and structured care checklists                                   |
| Finance           | Invoice totals, discounts/tax, balance, partial payments, receipt view, refunds, expenses and insurance records                   | Itemized builder, doctor/department attribution, partial refund UI and claim settlements |
| Gateways          | Card/bank/JazzCash/Easypaisa/cash/insurance/corporate methods; approved/declined states; duplicate protection                     | Separate wallet OTP and bank confirmation screens                                        |
| Dental            | Interactive FDI chart, patient filter, findings, procedures and invoice action                                                    | Tooth-specific guided plans, multi-visit workflow and x-ray previews                     |
| Aesthetics        | Packages/sessions, progress, cost/expiry, photo comparison and invoices                                                           | Persistent patient-linked demo photos and session scheduling                             |
| Dermatology       | Skin/hair/nail assessment, diagnosis, follow-up and photo preview                                                                 | Historical photography linked to visits                                                  |
| Hospital          | Admissions, bed board, occupied-bed rejection, transfers on edit, bed release on discharge; emergency/theatre CRUD                | Emergency admission flow and structured discharge/final billing                          |
| Laboratory        | Order/sample/processing stages, fictional results and approval                                                                    | Multiple-test results, timestamps, formatted report and patient availability filters     |
| Pharmacy          | Batches, expiry, stock and movement records                                                                                       | POS cart, transactional dispensing, purchase receiving and expiry dashboard              |
| Other specialties | Separate physiotherapy, eye, maternity and pediatric forms/schemas                                                                | Growth charts, lens layouts, exercise plan builder and vaccination schedule              |
| Operations        | Document metadata upload, inventory, suppliers/purchases and equipment CRUD                                                       | Sample downloads, receiving, adjustments and maintenance reminders                       |
| HR                | Staff profiles, fee/share/commission, shifts, attendance/leave/payroll fields                                                     | Payroll calculations, attendance reporting and leave approval journey                    |
| Communication     | Messages, notifications and toasts                                                                                                | Threaded replies, reminders and read-state center                                        |
| Reporting         | Derived totals/chart, invoice date filters, CSV and print                                                                         | Complete report families, consistent date filters and dimensional analytics              |
| Settings          | Module toggles, preference form, currency selector and data reset                                                                 | Preferences restored/applied throughout UI, per-organization settings and branding       |
| Chatbot           | Separate UI/service/types/store, contextual scripted replies and disclosure                                                       | Optional server-side live AI provider                                                    |

## Acceptance scenarios

Static deployment: `pnpm export` generates `out/` with HTML, client assets and all configured feature routes. The standard server build remains available through `pnpm build`. Static export retains the browser demo's existing security and workflow limitations.

Branding: the shared login/sidebar logo loads directly from the hosted ProcessIQTech image URL without requiring a Next.js image optimization server.

The six required end-to-end scenarios are not yet signed off. General clinic operations exist individually. Aesthetic scheduling/photo persistence, guided dental plans, emergency-to-discharge journey, formatted laboratory reports and complete financial breakdowns remain outstanding.
