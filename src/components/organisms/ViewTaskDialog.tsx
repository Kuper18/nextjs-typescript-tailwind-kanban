import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import CardTask from '../molecules/CardTask';
import Subtask from '../molecules/Subtask';
import SelectInput from '../molecules/SelectInput';
import DropdownMenu from '../molecules/DropdownMenu';

const ViewTaskDialog = () => {
  return (
    <article>
      <Dialog>
        <DialogTrigger className="text-left">
          <CardTask />
        </DialogTrigger>

        <DialogContent hideCloseIcon className="gap-6">
          <DialogHeader className="flex flex-row items-center justify-between space-x-6">
            <DialogTitle className="max-w-[387px] font-bold leading-6">
              Research pricing points of various competitors and trial different
              business models
            </DialogTitle>
            <DropdownMenu options={['Edit Task', 'Delete Task']} />
          </DialogHeader>

          <DialogDescription className="text-[13px] font-medium text-input-foreground">
            We know what we're planning to build for version one. Now we need to
            finalise the first pricing model we'll use. Keep iterating the
            subtasks until we have a coherent proposition.
          </DialogDescription>

          <div>
            <DialogDescription className="mb-[16px] text-xs font-bold text-input-foreground">
              Subtasks (2 of 3)
            </DialogDescription>

            <ul className="space-y-2">
              <Subtask isCompleted={true} title="" />
              <Subtask isCompleted={false} title="" />
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-input-foreground">
              Current status
            </p>
            <SelectInput options={[{ id: 1, name: 'Option' }]} />
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default ViewTaskDialog;
