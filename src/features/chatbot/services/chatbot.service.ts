import type { AssistantContext } from '../types/chatbot.types';
import { money } from '@/lib/format';
export interface AssistantService {
  reply(message: string, context: AssistantContext): Promise<string>;
}
export const chatbotService: AssistantService = {
  async reply(message, context) {
    const text = message.toLowerCase();
    if (/diagnos|symptom|dose|treatment|pain/.test(text))
      return 'I’m a demo workspace assistant and cannot provide medical advice. Clinical records here are fictional. For this demo, open Clinical records to explore the consultation interface.';
    if (/revenue|balance|outstanding|payment/.test(text))
      return `Your current workspace has ${money(context.outstanding)} outstanding. Open Billing & payments, choose an invoice and select Pay to try the simulated gateway.`;
    if (/appointment|book|schedule/.test(text))
      return `There are ${context.appointments} appointments in your current view. Open Appointments → New record, select a patient and practitioner, then choose a date and time. Check the patient in from the appointment actions.`;
    if (/patient/.test(text))
      return `Your current ${context.organization} view includes ${context.patients} fictional patients. Open Patients to search or register a patient, then open their record to see linked history.`;
    if (/lab|report/.test(text))
      return 'Open Laboratory to create an order, collect the sample, advance processing and enter fictional results. Approval makes the report available in the patient portal.';
    return `You’re exploring ${context.organization} as ${context.role}. I can explain appointments, patients, billing and laboratory workflows. This is a scripted contextual demo, not a live AI model.`;
  },
};
