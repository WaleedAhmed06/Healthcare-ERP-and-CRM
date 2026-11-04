'use client';
import { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatbotStore } from '../stores/chatbot-store';
import { chatbotService } from '../services/chatbot.service';
import { useEntities } from '@/hooks/use-entities';
import { useSessionStore } from '@/stores/session-store';
import { organizations } from '@/config/organizations';
import { invoiceBalance } from '@/features/invoices/services/invoice-calculations';
export function ChatbotPanel() {
  const chat = useChatbotStore();
  const session = useSessionStore();
  const patients = useEntities('patients');
  const appointments = useEntities('appointments');
  const invoices = useEntities('invoices');
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  return (
    <div data-no-print className="fixed right-4 bottom-4 z-40">
      {chat.open && (
        <section
          aria-label="CareOS demo assistant"
          className="mb-3 flex max-h-[70dvh] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
        >
          <header className="flex items-center gap-2 bg-[var(--sidebar)] p-4 text-white">
            <Bot className="size-5" />
            <div>
              <h2 className="text-sm font-medium">CareOS Assistant</h2>
              <p className="text-[10px] text-white/60">Contextual demo · Scripted responses</p>
            </div>
            <button className="ml-auto" onClick={chat.toggle} aria-label="Close assistant">
              <X className="size-4" />
            </button>
          </header>
          <div className="space-y-3 overflow-y-auto p-4" aria-live="polite">
            {chat.messages.map((m) => (
              <p
                key={m.id}
                className={`rounded-xl p-3 text-xs leading-5 ${m.role === 'assistant' ? 'mr-4 bg-muted' : 'ml-4 bg-secondary'}`}
              >
                {m.content}
              </p>
            ))}
          </div>
          <form
            className="flex gap-2 border-t p-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!input.trim() || pending) return;
              const message = input;
              setInput('');
              chat.append('user', message);
              setPending(true);
              try {
                chat.append(
                  'assistant',
                  await chatbotService.reply(message, {
                    role: session.role,
                    organization:
                      organizations.find((o) => o.id === session.organizationId)?.name || '',
                    patients: patients.records.length,
                    appointments: appointments.records.length,
                    outstanding: invoices.records.reduce((sum, r) => sum + invoiceBalance(r), 0),
                  }),
                );
              } finally {
                setPending(false);
              }
            }}
          >
            <Input
              aria-label="Message assistant"
              placeholder="Ask about your workspace…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button size="icon" aria-label="Send message" disabled={pending || !input.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        </section>
      )}
      <Button className="ml-auto flex rounded-full shadow-lg" onClick={chat.toggle}>
        <Bot className="mr-2 size-4" />
        {chat.open ? 'Close assistant' : 'Ask CareOS'}
      </Button>
    </div>
  );
}
