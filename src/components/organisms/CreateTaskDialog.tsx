import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import useColumns from '@/hooks/columns/use-columns';
import useTaskToUpdateStore from '@/store/tasks';
import { TAction } from '@/types';

import { ScrollArea } from '../atoms/scroll-area';

import TaskForm from './TaskForm';

type Props = {
  open?: boolean;
  toggleModal?: (val: boolean) => void;
  taskId?: number;
  children: React.ReactNode;
};

const CreateTaskDialog: React.FC<Props> = ({
  taskId,
  children,
  open,
  toggleModal,
}) => {
  const {
    isOpenModal, task, triggerOpenModal, resetTaskToUpdate,
  } = useTaskToUpdateStore();
  const { data: columns } = useColumns();

  const action: TAction = task ? 'update' : 'create';
  const shouldOpenCurrentDialog = action === 'update' && task?.id === taskId;

  const handleOpenChange = (value: boolean) => {
    triggerOpenModal(value);

    if (task) {
      resetTaskToUpdate();
    }
  };

  return (
    <article>
      <Dialog
        open={open ?? (shouldOpenCurrentDialog ? isOpenModal : undefined)}
        onOpenChange={(value) => toggleModal?.(value)
          ?? (shouldOpenCurrentDialog ? handleOpenChange(value) : undefined)}
      >
        <DialogTrigger
          disabled={!columns?.length}
          asChild
          className="text-left"
        >
          {children}
        </DialogTrigger>

        <DialogContent hideCloseIcon className="gap-6 p-0 sm:p-0">
          <ScrollArea className="max-h-[80vh] p-6 sm:p-8">
            <DialogHeader className="flex flex-row items-center justify-between space-x-6">
              <DialogTitle className="max-w-[387px] font-bold leading-6">
                {action === 'create' ? 'Add New Task' : 'Edit Task'}
              </DialogTitle>
            </DialogHeader>

            <DialogDescription className="sr-only">
              {action === 'create'
                ? 'Input data to create a new task for the column'
                : 'Change data to update the task'}
            </DialogDescription>

            <TaskForm toggleModal={toggleModal} action={action} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateTaskDialog;
