import { z } from 'zod';

export const newBoardSchema = z.object({
  name: z.string().min(3).max(250),
  columns: z.array(z.object({ name: z.string().min(3, { message: 'Can’t be empty' }).max(60) })),
});
