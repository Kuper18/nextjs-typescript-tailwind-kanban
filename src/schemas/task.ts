import { z } from 'zod';

export const regexNum = /^[1-9]\d*$/;

export const newTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5).max(1024),
  status: z.string().regex(regexNum, 'Status is required'),
  subtasks: z.array(
    z.object({
      id: z.string().regex(regexNum).optional(),
      subtaskTitle: z.string().min(3, { message: 'Can’t be empty' }).max(125),
    }),
  ),
});
