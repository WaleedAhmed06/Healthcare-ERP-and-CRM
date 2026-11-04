import type { Entity } from '@/types/entity';
import type { Repository } from './contracts/repository';
import { ApiRepository } from './api/api-repository';
import { MockRepository } from './mock/mock-repository';
export const createRepository = <T extends Entity>(resource: string): Repository<T> =>
  process.env.NEXT_PUBLIC_DATA_SOURCE === 'api'
    ? new ApiRepository<T>(resource)
    : new MockRepository<T>(resource);
