export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}
export interface AssistantContext {
  role: string;
  organization: string;
  patients: number;
  appointments: number;
  outstanding: number;
}
