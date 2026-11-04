export type PaymentMethod =
  'Card' | 'Bank Transfer' | 'JazzCash' | 'Easypaisa' | 'Cash' | 'Insurance' | 'Corporate Account';
export interface PaymentRequest {
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  outcome: 'success' | 'declined';
  idempotencyKey: string;
}
