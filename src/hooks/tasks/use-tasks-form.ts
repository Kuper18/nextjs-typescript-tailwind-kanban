import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { newTaskSchema } from '@/schemas/task';
import SubtasksService from '@/services/subtasks';
import { ISubtask, ISubtaskToCreate } from '@/services/subtasks/types';
import TasksService from '@/services/tasks';
import useTaskToUpdateStore from '@/store/tasks';
import { TAction, TTaskFormData } from '@/types';
import { createDefaultValues } from '@/utils/tasks';

const useTaskForm = (action: TAction) => {
  const queryClient = useQueryClient();
  const { triggerOpenModal, task } = useTaskToUpdateStore();

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

  const subtaskMutationUpdate = useMutation({
    mutationFn: SubtasksService.patch,
  });

  const subtaskMutationAdd = useMutation({
    mutationFn: SubtasksService.post,
  });

  const taskMutationAdd = useMutation({
    mutationFn: TasksService.post,
    onSuccess: async (createdTask) => {
      const subtasks = form.getValues('subtasks').map(({ subtaskTitle }) => ({
        title: subtaskTitle,
        taskId: createdTask.id,
      }));

      try {
        await subtaskMutationAdd.mutateAsync({ subtasks });
      } catch (error) {
        console.error('Failed to create subtasks:', error);
      }

      queryClient.invalidateQueries({ queryKey: ['columns'] });
      triggerOpenModal();
    },
  });

  const taskMutationUpdate = useMutation({
    mutationFn: TasksService.put,
    onSuccess: async (updatedTask) => {
      const subtasks = form.getValues('subtasks');
      const subtasksPromises = subtasks.reduce<{
        toUpdate: Promise<ISubtask>[];
        toCreate: ISubtaskToCreate[];
      }>(
        (acc, curr) => {
          if (curr.id) {
            return {
              ...acc,
              toUpdate: [
                ...acc.toUpdate,
                subtaskMutationUpdate.mutateAsync({
                  title: curr.subtaskTitle,
                  subtaskId: Number(curr.id),
                }),
              ],
            };
          }

          return {
            ...acc,
            toCreate: [
              ...acc.toCreate,
              {
                title: curr.subtaskTitle,
                taskId: updatedTask.id,
              },
            ],
          };
        },
        {
          toUpdate: [],
          toCreate: [],
        },
      );

      try {
        await Promise.all(subtasksPromises.toUpdate);
        await subtaskMutationAdd.mutateAsync({
          subtasks: subtasksPromises.toCreate,
        });
      } catch (error) {
        console.error('Failed to create subtasks:', error);
      }

      queryClient.invalidateQueries({ queryKey: ['columns'] });
      triggerOpenModal();
    },
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
    append,
    remove,
    handleRemove,
    handleSubmit,
  };
};

export default useTaskForm;
