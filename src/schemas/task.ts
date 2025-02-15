import { z } from 'zod';

export const newTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5).max(1024),
  status: z.string().regex(/^[1-9]\d*$/, 'Status is required'),
  subtasks: z.array(z.object({ title: z.string().min(3, { message: 'Can’t be empty' }).max(125) })),
});
