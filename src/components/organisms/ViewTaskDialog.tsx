import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import useColumns from '@/hooks/columns/use-columns';
import TasksService from '@/services/tasks';
import { useAlertStore } from '@/store/modal';
import useTaskToUpdate from '@/store/tasks';
import { IDropdownOption } from '@/types';
import { handleErrorResponse, showNotification } from '@/utils';

import { Select, SelectTrigger, SelectValue } from '../atoms/select';
import CardTask from '../molecules/CardTask';
import DropdownMenu from '../molecules/DropdownMenu';
import Subtask from '../molecules/Subtask';

type Props = {
  columnId: number;
  id: number;
  title: string;
  description: string | null;
  subtasks: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
};

const ViewTaskDialog: React.FC<Props> = ({
  description,
  columnId,
  id,
  subtasks,
  title,
}) => {
  const queryClient = useQueryClient();
  const { data: columns } = useColumns();
  const { setTaskToUpdate, triggerOpenModal } = useTaskToUpdate();
  const { toggleOpen, setAlertData } = useAlertStore();

  const [isOpenTask, setIsOpenTask] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: TasksService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      showNotification('success', 'Task was deleted');
    },
    onError: handleErrorResponse,
    onSettled: () => toggleOpen(false),
  });

  const handleUpdateTask = useCallback(() => {
    setTaskToUpdate({
      description,
      id,
      subtasks,
      status: columnId,
      title,
    });
    triggerOpenModal();
  }, [columnId, description, id, setTaskToUpdate, subtasks, title, triggerOpenModal]);

  const handleDelete = useCallback(() => {
    setIsOpenTask(false);
    setAlertData({
      title: 'Delete this task?',
      description: `Are you sure you want to delete the '${title}' task and its subtasks? This action cannot be reversed.`,
      onConfirm: () => mutate(id),
    });
    toggleOpen();
  }, [id, isPending, mutate, setAlertData, title, toggleOpen]);

  const column = columns?.find((col) => col.id === columnId);
  const options: IDropdownOption[] = useMemo(
    () => [
      { title: 'Edit Task', action: handleUpdateTask },
      {
        title: 'Delete Task',
        action: handleDelete,
        className:
          'text-destructive text-[13px] font-medium focus:text-destructive',
      },
    ],
    [handleUpdateTask, handleDelete],
  );

  return (
    <article>
      <Dialog open={isOpenTask} onOpenChange={setIsOpenTask}>
        <DialogTrigger className="text-left">
          <CardTask title={title} subtasks={subtasks} />
        </DialogTrigger>

        <DialogContent hideCloseIcon className="z-50 gap-6">
          <DialogHeader className="flex flex-row items-center justify-between space-x-6">
            <DialogTitle className="max-w-[387px] font-bold leading-6">
              {title}
            </DialogTitle>
            <DropdownMenu options={options} />
          </DialogHeader>

          <DialogDescription className="text-[13px] font-medium text-input-foreground">
            {description}
          </DialogDescription>

          <div>
            <DialogDescription className="mb-[16px] text-xs font-bold text-input-foreground">
              {`Subtasks (1 of ${subtasks.length})`}
            </DialogDescription>

            <ul className="space-y-2">
              {subtasks.map((item) => (
                <Subtask {...item} key={item.id} />
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-input-foreground">
              Current status
            </p>

            <Select>
              <SelectTrigger className="text-body-l">
                <SelectValue placeholder={column?.name} />
              </SelectTrigger>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default ViewTaskDialog;
