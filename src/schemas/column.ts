import { z } from 'zod';

export const columnSchema = z.object({
  name: z.string().min(3).max(60),
});
