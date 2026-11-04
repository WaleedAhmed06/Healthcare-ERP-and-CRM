'use client';
import { useEntities } from '@/hooks/use-entities';
import { expensesService } from '../services/expenses.service';
export const useExpenses = () => useEntities('expenses', expensesService);
