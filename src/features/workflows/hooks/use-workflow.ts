'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useScope } from '@/hooks/use-scope';
import { workflowService, type WorkflowAction } from '../services/workflow.service';
export function useWorkflow(resource: string) {
  const scope = useScope();
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: WorkflowAction }) =>
      workflowService.run(resource, id, action, scope),
    onSuccess: () => {
      client.invalidateQueries();
      toast.success('Workflow updated');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
