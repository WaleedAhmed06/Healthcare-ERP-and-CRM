import { createRepository } from '@/services/repository-factory';
import type { Expenses } from '../types/expenses.types';
export const expensesService = createRepository<Expenses>('expenses');
