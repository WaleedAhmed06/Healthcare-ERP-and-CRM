'use client';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Entity } from '@/types/entity';
import type { PaymentMethod } from '../types/payment.types';
import { invoiceBalance } from '../services/invoice-calculations';
import { paymentService } from '../services/payment.service';
import { useScope } from '@/hooks/use-scope';
import { money } from '@/lib/format';
import { toast } from 'sonner';
export function PaymentDialog({ invoice, onClose }: { invoice: Entity; onClose: () => void }) {
  const [method, setMethod] = useState<PaymentMethod>('Card');
  const [amount, setAmount] = useState(invoiceBalance(invoice));
  const [outcome, setOutcome] = useState<'success' | 'declined'>('success');
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState('');
  const [key, setKey] = useState(() => crypto.randomUUID());
  const scope = useScope();
  const client = useQueryClient();
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !pending) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{receipt ? 'Payment complete' : 'Demo checkout'}</DialogTitle>
          <DialogDescription>Simulated payment gateway · No money moves.</DialogDescription>
        </DialogHeader>
        {receipt ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto mb-4 size-12 text-emerald-600" />
            <h3 className="text-xl">{money(amount)} received</h3>
            <p className="mt-3 text-sm text-muted-foreground">Receipt {receipt}</p>
            <Button className="mt-6" onClick={() => window.print()}>
              Print receipt / Save PDF
            </Button>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setPending(true);
              try {
                const result = await paymentService.pay(
                  { invoiceId: invoice.id, amount, method, outcome, idempotencyKey: key },
                  scope,
                );
                await client.invalidateQueries();
                if (outcome === 'declined') {
                  toast.error('Demo gateway declined the transaction. No balance changed.');
                  setKey(crypto.randomUUID());
                } else setReceipt(String((result as Entity).id));
              } catch (error) {
                toast.error((error as Error).message);
              } finally {
                setPending(false);
              }
            }}
          >
            <div className="my-5 flex justify-between rounded-xl bg-background p-4">
              <span className="text-sm text-muted-foreground">Outstanding · {invoice.id}</span>
              <strong>{money(invoiceBalance(invoice))}</strong>
            </div>
            <div className="mb-5 grid grid-cols-2 gap-2">
              {(
                [
                  'Card',
                  'Bank Transfer',
                  'JazzCash',
                  'Easypaisa',
                  'Cash',
                  'Insurance',
                  'Corporate Account',
                ] as PaymentMethod[]
              ).map((m) => (
                <button
                  type="button"
                  key={m}
                  aria-pressed={method === m}
                  onClick={() => setMethod(m)}
                  className={`rounded-lg border px-3 py-3 text-left text-xs ${method === m ? 'border-primary bg-secondary/50 text-primary' : 'bg-white'}`}
                >
                  <CreditCard className="mr-2 inline size-3.5" />
                  {m}
                </button>
              ))}
            </div>
            <p className="mb-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              {method === 'Card'
                ? 'Test card: •••• 4242 · DEMO ONLY'
                : method === 'JazzCash' || method === 'Easypaisa'
                  ? 'Test wallet: 0300-0000000 · Demo OTP: 123456'
                  : method === 'Bank Transfer'
                    ? 'Test account: CAREOS-DEMO-001'
                    : 'Demo ledger entry only.'}{' '}
              No real card or wallet details are collected.
            </p>
            <label className="text-xs font-medium">
              Payment amount
              <Input
                className="mt-2"
                type="number"
                min="0.01"
                step="0.01"
                max={invoiceBalance(invoice)}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </label>
            <label className="mt-4 block text-xs font-medium">
              Gateway outcome
              <select
                className="mt-2 h-10 w-full rounded-md border px-3"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as 'success' | 'declined')}
              >
                <option value="success">Approve payment</option>
                <option value="declined">Decline payment</option>
              </select>
            </label>
            <Button className="mt-5 w-full" disabled={pending}>
              {pending ? 'Processing demo payment…' : `Simulate ${money(amount)} payment`}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <ShieldCheck className="size-3" />
              Demonstration gateway · Local browser storage
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
