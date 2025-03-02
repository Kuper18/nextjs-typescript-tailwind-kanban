import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { newTaskSchema } from '@/schemas/task';
import SubtasksService from '@/services/subtasks';
import TasksService from '@/services/tasks';

type FormData = z.infer<typeof newTaskSchema>;

const useTasksCreateForm = (triggerModal: () => void) => {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
      subtasks: Array.from([1, 2], () => ({ subtaskTitle: '' })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  });

  const subtaskMutation = useMutation({
    mutationFn: SubtasksService.post,
  });

  const taskMutation = useMutation({
    mutationFn: TasksService.post,
    onSuccess: async (createdTask) => {
      const subtasks = form.getValues('subtasks').map(({ subtaskTitle }) => ({
        title: subtaskTitle,
        taskId: createdTask.id,
      }));

      try {
        await subtaskMutation.mutateAsync({ subtasks });
      } catch (error) {
        console.error('Failed to create subtasks:', error);
      }

      queryClient.invalidateQueries({ queryKey: ['columns'] });
      triggerModal();
    },
  });

  const handleSubmit = ({ description, status, title }: FormData) => {
    taskMutation.mutate({ description, title, columnId: Number(status) });
  };

  return {
    form,
    fields,
    append,
    remove,
    handleSubmit,
  };
};

export default useTasksCreateForm;
