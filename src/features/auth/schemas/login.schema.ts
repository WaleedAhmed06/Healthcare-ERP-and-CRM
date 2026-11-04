import { z } from 'zod';
export const loginSchema = z.object({
  email: z.email(),
  password: z.literal('123456', { error: 'Use the demo password: 123456' }),
});
