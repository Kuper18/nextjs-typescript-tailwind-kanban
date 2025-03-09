import { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

import { newTaskSchema } from '@/schemas/task';
import {
  ISubtask,
  ISubtaskBody,
  ISubtaskBodyToUpdate,
} from '@/services/subtasks/types';
import { ITask } from '@/services/tasks/types';

export interface IIcon {
  className?: string;
  fill?: string;
}

export interface IDropdownOption {
  title: string;
  className?: string;
  action: () => void;
}

export interface ISubtaskFromForm {
  subtaskTitle: string;
  id?: string;
}

export interface ICreateTaskSuccess {
  task: ITask;
  subtasks: ISubtaskFromForm[];
  mutateAsyncAdd: UseMutateAsyncFunction<
    ISubtask[],
    AxiosError<unknown, any>,
    ISubtaskBody,
    unknown
  >;
  queryClient: QueryClient;
  triggerOpenModal: () => void;
}

export interface IUpdateTaskSuccess extends ICreateTaskSuccess {
  subtasksToDelete: string[];
  mutateAsyncDelete: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    string,
    unknown
  >;
  mutateAsyncUpdate: UseMutateAsyncFunction<
    ISubtask,
    AxiosError<unknown, any>,
    ISubtaskBodyToUpdate,
    unknown
  >;
}

export type TNotificationType = 'error' | 'success' | 'info' | 'warning';

export type TAction = 'create' | 'update';

export type TTaskFormData = z.infer<typeof newTaskSchema>;
