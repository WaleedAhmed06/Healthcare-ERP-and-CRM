'use client';
import { useEntities } from '@/hooks/use-entities';
import { appointmentsService } from '../services/appointments.service';
export const useAppointments = () => useEntities('appointments', appointmentsService);
