import { Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';

import TaskForm from './TaskForm';

const CreateTaskDialog = () => {
  return (
    <article>
      <Dialog>
        <DialogTrigger asChild className="text-left">
          <Button size="lg" className="w-12 sm:w-[164px]">
            <Plus className="h-3 w-3" />
            <span className="hidden sm:inline">Add New Task</span>
          </Button>
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

          <TaskForm />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateTaskDialog;
