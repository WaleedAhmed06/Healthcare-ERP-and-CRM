import type { Entity, EntityInput, Scope } from '@/types/entity';
export interface Repository<T extends Entity = Entity> {
  list(scope: Scope): Promise<T[]>;
  get(id: string, scope: Scope): Promise<T | undefined>;
  create(input: EntityInput, scope: Scope): Promise<T>;
  update(id: string, input: EntityInput, scope: Scope): Promise<T>;
  remove(id: string, scope: Scope): Promise<void>;
}
