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

import TaskForm from './TaskForm';

type Props = {
  taskId?: number;
  children: React.ReactNode;
};

const CreateTaskDialog: React.FC<Props> = ({ taskId, children }) => {
  const {
    isOpenModal,
    task,
    triggerOpenModal,
    resetTaskToUpdate,
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
        open={shouldOpenCurrentDialog ? isOpenModal : undefined}
        onOpenChange={
          shouldOpenCurrentDialog
            ? (value) => handleOpenChange(value)
            : undefined
        }
      >
        <DialogTrigger
          disabled={!columns?.length}
          asChild
          className="text-left"
        >
          {children}
        </DialogTrigger>

        <DialogContent
          hideCloseIcon
          className="max-h-[90vh] gap-6 overflow-hidden"
        >
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

          <TaskForm action={action} />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateTaskDialog;
