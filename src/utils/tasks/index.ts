import {
  ISubtask,
  ISubtaskToCreate,
} from '@/services/subtasks/types';
import { ITaskToUpdate } from '@/store/tasks/types';
import { ICreateTaskSuccess, IUpdateTaskSuccess, TTaskFormData } from '@/types';

import { showNotification } from '..';

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

export const handleTaskCreationSuccess = async ({
  task,
  mutateAsyncAdd,
  queryClient,
  subtasks,
  triggerOpenModal,
}: ICreateTaskSuccess) => {
  const preparedSubtasks = subtasks.map(({ subtaskTitle }) => ({
    title: subtaskTitle,
    taskId: task.id,
  }));

  if (subtasks.length) {
    try {
      await mutateAsyncAdd({ subtasks: preparedSubtasks });
    } catch (error) {
      console.error('Failed to create subtasks:', error);
    }
  }

  queryClient.invalidateQueries({ queryKey: ['columns'] });
  triggerOpenModal();
  showNotification('success', 'New task is created');
};

export const handleTaskUpdateSuccess = async ({
  subtasks,
  subtasksToDelete,
  task,
  queryClient,
  mutateAsyncAdd,
  mutateAsyncDelete,
  mutateAsyncUpdate,
  triggerOpenModal,
}: IUpdateTaskSuccess) => {
  const { toUpdate, toCreate } = subtasks.reduce<{
    toUpdate: Promise<ISubtask>[];
    toCreate: ISubtaskToCreate[];
  }>(
    (acc, curr) => {
      if (curr.id) {
        acc.toUpdate.push(
          mutateAsyncUpdate({
            title: curr.subtaskTitle,
            subtaskId: Number(curr.id),
          }),
        );
      } else {
        acc.toCreate.push({
          title: curr.subtaskTitle,
          taskId: task.id,
        });
      }
      return acc;
    },
    { toUpdate: [], toCreate: [] },
  );

  try {
    await Promise.all(toUpdate);

    if (toCreate.length) {
      await mutateAsyncAdd({
        subtasks: toCreate,
      });
    }
  } catch (error) {
    console.error('Failed to update subtasks:', error);
  }

  if (subtasksToDelete.length) {
    const subtasksToDeletePomises = subtasksToDelete.map((id) => mutateAsyncDelete(id));

    try {
      await Promise.all(subtasksToDeletePomises);
    } catch (error) {
      console.error('Failed to delete subtasks:', error);
    }
  }

  queryClient.invalidateQueries({ queryKey: ['columns'] });
  triggerOpenModal();
};
