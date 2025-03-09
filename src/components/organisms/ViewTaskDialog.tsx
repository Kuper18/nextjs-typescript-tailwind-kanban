import React, { useMemo } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import useColumns from '@/hooks/columns/use-columns';
import useTaskToUpdate from '@/store/tasks';
import { IDropdownOption } from '@/types';

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
  const { data: columns } = useColumns();
  const { setTaskToUpdate, triggerOpenModal } = useTaskToUpdate();

  const handleUpdateTask = () => {
    setTaskToUpdate({
      description,
      id,
      subtasks,
      status: columnId,
      title,
    });
    triggerOpenModal();
  };

  const column = columns?.find((col) => col.id === columnId);
  const options: IDropdownOption[] = useMemo(
    () => [
      { title: 'Edit Task', action: handleUpdateTask },
      {
        title: 'Delete Task',
        action: () => {},
        className:
          'text-destructive text-[13px] font-medium focus:text-destructive',
      },
    ],
    [],
  );

  return (
    <article>
      <Dialog>
        <DialogTrigger className="text-left">
          <CardTask title={title} subtasks={subtasks} />
        </DialogTrigger>

        <DialogContent hideCloseIcon className="gap-6">
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
