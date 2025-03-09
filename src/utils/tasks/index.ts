import { ITaskToUpdate } from '@/store/tasks/types';
import { TTaskFormData } from '@/types';

export const createDefaultValues = (
  task: ITaskToUpdate | null,
): TTaskFormData => {
  const defaultSubTasks = task?.subtasks.map((item) => ({
    subtaskTitle: item.title,
    id: `${item.id}`,
  }));

  return {
    title: task?.title ?? '',
    description: task?.description ?? '',
    status: `${task?.status || ''}`,
    subtasks: defaultSubTasks
      ?? Array.from([1, 2], () => ({
        subtaskTitle: '',
      })),
  };
};
