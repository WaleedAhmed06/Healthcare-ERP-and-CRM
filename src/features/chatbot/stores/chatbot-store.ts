'use client';
import { create } from 'zustand';
import type { ChatMessage } from '../types/chatbot.types';
interface ChatState {
  open: boolean;
  messages: ChatMessage[];
  toggle: () => void;
  append: (role: ChatMessage['role'], content: string) => void;
  clear: () => void;
}
const welcome: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hello! I’m your CareOS demo assistant. Ask about appointments, patient records or billing. My responses are scripted and use your current workspace context.',
};
export const useChatbotStore = create<ChatState>((set) => ({
  open: false,
  messages: [welcome],
  toggle: () => set((s) => ({ open: !s.open })),
  append: (role, content) =>
    set((s) => ({ messages: [...s.messages, { id: crypto.randomUUID(), role, content }] })),
  clear: () => set({ messages: [welcome] }),
}));
