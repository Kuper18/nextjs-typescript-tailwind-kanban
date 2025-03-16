import { z } from 'zod';

import { regexNum } from './task';

export const newBoardSchema = z.object({
  name: z.string().min(3).max(250),
  columns: z.array(
    z.object({
      name: z.string().min(3, { message: 'Can’t be empty' }).max(60),
      id: z.string().regex(regexNum).optional(),
    }),
  ),
});
