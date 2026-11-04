import { z } from 'zod';
export const paymentSchema = z.object({
  invoiceId: z.string().min(1),
  amount: z.number().positive().finite(),
  method: z.enum([
    'Card',
    'Bank Transfer',
    'JazzCash',
    'Easypaisa',
    'Cash',
    'Insurance',
    'Corporate Account',
  ]),
  outcome: z.enum(['success', 'declined']),
  idempotencyKey: z.string().min(1),
});
