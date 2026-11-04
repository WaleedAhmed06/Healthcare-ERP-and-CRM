'use client';
import { useEntities } from '@/hooks/use-entities';
import { theatreService } from '../services/theatre.service';
export const useTheatre = () => useEntities('theatre', theatreService);
