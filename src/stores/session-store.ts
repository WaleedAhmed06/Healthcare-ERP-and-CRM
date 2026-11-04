'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role } from '@/config/roles';
interface SessionState {
  authenticated: boolean;
  organizationId: string;
  branchId: string;
  role: Role;
  patientId: string;
  currency: string;
  enabledModules: Record<string, boolean>;
  login: (role: Role, organizationId: string) => void;
  logout: () => void;
  setOrganization: (id: string) => void;
  setRole: (role: Role) => void;
  setBranch: (id: string) => void;
  setCurrency: (currency: string) => void;
  toggleModule: (key: string) => void;
}
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      authenticated: false,
      organizationId: 'city',
      branchId: 'all',
      role: 'Facility Administrator',
      patientId: 'PAT-city-1',
      currency: 'PKR',
      enabledModules: {},
      login: (role, organizationId) =>
        set({ authenticated: true, role, organizationId, patientId: `PAT-${organizationId}-1` }),
      logout: () => set({ authenticated: false }),
      setOrganization: (organizationId) =>
        set({ organizationId, branchId: 'all', patientId: `PAT-${organizationId}-1` }),
      setRole: (role) => set({ role }),
      setBranch: (branchId) => set({ branchId }),
      setCurrency: (currency) => set({ currency }),
      toggleModule: (key) =>
        set((s) => ({
          enabledModules: { ...s.enabledModules, [key]: s.enabledModules[key] === false },
        })),
    }),
    { name: 'careos.session.v1', skipHydration: true },
  ),
);
