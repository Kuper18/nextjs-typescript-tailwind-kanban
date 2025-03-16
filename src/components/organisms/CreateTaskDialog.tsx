import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import useTaskToUpdateStore from '@/store/tasks';
import { TAction } from '@/types';

import TaskForm from './TaskForm';

type Props = {
  taskId?: number
  children: React.ReactNode;
};

const CreateTaskDialog: React.FC<Props> = ({ taskId, children }) => {
  const {
    isOpenModal,
    task,
    triggerOpenModal,
    resetTaskToUpdate,
  } = useTaskToUpdateStore();

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
        onOpenChange={shouldOpenCurrentDialog ? (value) => handleOpenChange(value) : undefined}
      >
        <DialogTrigger asChild className="text-left">
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
            Input the data to create a new task for the column
          </DialogDescription>

          <TaskForm action={action} />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateTaskDialog;
