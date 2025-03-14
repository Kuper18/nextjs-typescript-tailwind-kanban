import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import useSubtaskMutation from '@/hooks/subtasks/use-subtask-mutation';
import { cn } from '@/lib/utils';
import { showNotification } from '@/utils';

import { Checkbox } from '../atoms/checkbox';

type Props = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const Subtask = ({ id, isCompleted, title }: Props) => {
  const queryClient = useQueryClient();
  const { subtaskMutation } = useSubtaskMutation();
  const { mutate, isPending } = subtaskMutation.update;

  const handleChangeStatus = async () => {
    mutate(
      { subtaskId: id, isCompleted: !isCompleted },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['columns'] });
          showNotification('success', 'Subtask was updated');
        },
      },
    );
  };

  return (
    <li
      aria-hidden
      onClick={isPending ? undefined : handleChangeStatus}
      className="flex cursor-pointer items-center space-x-[16px] rounded-sm bg-primary p-3 hover:bg-accent-hover-secondary"
    >
      <Checkbox checked={isCompleted} />
      <h3
        className={cn(
          'text-xs font-bold',
          isCompleted ? 'text-check-box-foreground line-through' : undefined,
        )}
      >
        {title}
      </h3>
    </li>
  );
};

export default Subtask;
