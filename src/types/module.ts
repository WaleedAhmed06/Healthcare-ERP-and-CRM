import type { Entity } from './entity';
export interface FieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number' | 'textarea' | 'select';
  options?: string[];
  relation?: string;
  required?: boolean;
}
export interface FeatureDefinition {
  key: string;
  title: string;
  description: string;
  group:
    | 'Workspace'
    | 'Clinical'
    | 'Finance'
    | 'Specialties'
    | 'Operations'
    | 'Organization'
    | 'Platform';
  fields: FieldDefinition[];
  columns: string[];
  specialty?: string;
}
export interface TableColumn<T extends Entity> {
  key: keyof T & string;
  label: string;
  render?: (row: T) => React.ReactNode;
}
