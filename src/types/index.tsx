import { z } from 'zod';

import { newTaskSchema } from '@/schemas/task';

export interface IIcon {
  className?: string;
  fill?: string;
}

export interface IDropdownOption {
  title: string;
  className?: string;
  action: () => void;
}

export type TAction = 'create' | 'update';

export type TTaskFormData = z.infer<typeof newTaskSchema>;
