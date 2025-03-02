import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';

import TaskForm from './TaskForm';

type Props = {
  children: React.ReactNode;
};

const CreateTaskDialog: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <article>
      <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
        <DialogTrigger onClick={triggerModal} asChild className="text-left">
          {children}
        </DialogTrigger>

        <DialogContent
          hideCloseIcon
          className="max-h-[90vh] gap-6 overflow-hidden"
        >
          <DialogHeader className="flex flex-row items-center justify-between space-x-6">
            <DialogTitle className="max-w-[387px] font-bold leading-6">
              Add New Task
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="sr-only">
            Input the data to create a new task for the column
          </DialogDescription>

          <TaskForm triggerModal={triggerModal} />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateTaskDialog;
