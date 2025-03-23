import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { newTaskSchema } from '@/schemas/task';
import TasksService from '@/services/tasks';
import useTaskToUpdateStore from '@/store/tasks';
import { TAction, TTaskFormData } from '@/types';
import { handleErrorResponse } from '@/utils';
import {
  createDefaultValues,
  handleTaskCreationSuccess,
  handleTaskUpdateSuccess,
} from '@/utils/tasks';

import useSubtaskMutation from '../subtasks/use-subtask-mutation';

const useTaskForm = (action: TAction, toggleModal?: (val: boolean) => void) => {
  const queryClient = useQueryClient();
  const { triggerOpenModal, task } = useTaskToUpdateStore();
  const { subtaskMutation } = useSubtaskMutation();

  const [subtasksToDelete, setSubtasksToDelete] = useState<string[]>([]);

  const form = useForm<TTaskFormData>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: createDefaultValues(task),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  });

  const handleRemove = (index: number) => {
    if (action === 'update') {
      setSubtasksToDelete((prev) => [
        ...prev,
        form.getValues('subtasks')[index]?.id as string,
      ]);
    }

    remove(index);
  };

  const taskMutationAdd = useMutation({
    mutationFn: TasksService.post,
    onSuccess: (createdTask) => handleTaskCreationSuccess({
      task: createdTask,
      queryClient,
      subtasks: form.getValues('subtasks'),
      triggerOpenModal: () => toggleModal?.(false),
      mutateAsyncAdd: subtaskMutation.add.mutateAsync,
    }),
    onError: handleErrorResponse,
  });

  const taskMutationUpdate = useMutation({
    mutationFn: TasksService.put,
    onSuccess: async (updatedTask) => handleTaskUpdateSuccess({
      task: updatedTask,
      subtasks: form.getValues('subtasks'),
      subtasksToDelete,
      queryClient,
      triggerOpenModal,
      mutateAsyncAdd: subtaskMutation.add.mutateAsync,
      mutateAsyncDelete: subtaskMutation.delete.mutateAsync,
      mutateAsyncUpdate: subtaskMutation.update.mutateAsync,
    }),
    onError: handleErrorResponse,
  });

  const handleSubmit = ({ description, status, title }: TTaskFormData) => {
    if (action === 'create') {
      taskMutationAdd.mutate({ description, title, columnId: Number(status) });
    } else {
      taskMutationUpdate.mutate({
        columnId: Number(status),
        description,
        title,
        taskId: task?.id as number,
      });
    }
  };

  return {
    form,
    fields,
    isLoading: taskMutationUpdate.isPending || taskMutationAdd.isPending,
    append,
    handleRemove,
    handleSubmit,
  };
};

export default useTaskForm;
