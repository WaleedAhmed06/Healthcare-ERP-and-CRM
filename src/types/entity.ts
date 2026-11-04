export type EntityValue = string | number | boolean | null;
export interface Entity {
  id: string;
  organizationId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: EntityValue | undefined;
}
export interface Scope {
  organizationId: string;
  branchId?: string;
  patientId?: string;
}
export type EntityInput = Record<string, EntityValue>;
