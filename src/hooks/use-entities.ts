'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Entity, EntityInput } from '@/types/entity';
import type { Repository } from '@/services/contracts/repository';
import { createRepository } from '@/services/repository-factory';
import { useScope } from './use-scope';
export function useEntities<T extends Entity = Entity>(
  resource: string,
  repository: Repository<T> = createRepository<T>(resource),
) {
  const scope = useScope();
  const client = useQueryClient();
  const query = useQuery({ queryKey: [resource, scope], queryFn: () => repository.list(scope) });
  const refresh = () => client.invalidateQueries();
  const onError = (error: Error) => toast.error(error.message);
  const create = useMutation({
    mutationFn: (input: EntityInput) => repository.create(input, scope),
    onSuccess: () => {
      refresh();
      toast.success('Record created');
    },
    onError,
  });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: EntityInput }) =>
      repository.update(id, input, scope),
    onSuccess: () => {
      refresh();
      toast.success('Changes saved');
    },
    onError,
  });
  const remove = useMutation({
    mutationFn: (id: string) => repository.remove(id, scope),
    onSuccess: () => {
      refresh();
      toast.success('Record removed');
    },
    onError,
  });
  return { ...query, records: query.data || [], create, update, remove };
}
