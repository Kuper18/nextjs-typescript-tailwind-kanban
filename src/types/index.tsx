import { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

import { newBoardSchema } from '@/schemas/board';
import { newTaskSchema } from '@/schemas/task';
import { IBoard } from '@/services/boards/types';
import { IColumn, IColumnBody, IColumnBodyToUpdate } from '@/services/columns/types';
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

export interface IColumnFromForm {
  name: string;
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
  resetTaskToUpdate: () => void;
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

export interface ICreateBoardSuccess {
  board: IBoard;
  columns: IColumnFromForm[];
  mutateAsyncAdd: UseMutateAsyncFunction<
    IColumn,
    AxiosError<unknown, any>,
    IColumnBody,
    unknown
  >;
  queryClient: QueryClient;
  triggerOpenModal: () => void;
}

export interface IUpdateBoardSuccess extends ICreateBoardSuccess {
  columnsIdsToDelete: string[];
  mutateAsyncDelete: UseMutateAsyncFunction<
    { message: string },
    AxiosError<unknown, any>,
    string | number,
    unknown
  >;
  mutateAsyncUpdate: UseMutateAsyncFunction<
    IColumn,
    AxiosError<unknown, any>,
    IColumnBodyToUpdate,
    unknown
  >;
}

export type TNotificationType = 'error' | 'success' | 'info' | 'warning';

export type TAction = 'create' | 'update';

export type TTaskFormData = z.infer<typeof newTaskSchema>;
export type TBoardFormData = z.infer<typeof newBoardSchema>;
