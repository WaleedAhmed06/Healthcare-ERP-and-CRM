'use client';
import { useEntities } from '@/hooks/use-entities';
import { organizationsService } from '../services/organizations.service';
export const useOrganizations = () => useEntities('organizations', organizationsService);
