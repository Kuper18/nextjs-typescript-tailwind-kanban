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

const ViewTaskDialog = () => {
  return (
    <article>
      <Dialog>
        <DialogTrigger className="text-left">
          <CardTask />
        </DialogTrigger>
        <DialogContent hideCloseIcon className="w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-bold leading-6">
              Research pricing points of various competitors and trial different
              business models
            </DialogTitle>
          </DialogHeader>

          <DialogDescription>
            We know what we're planning to build for version one. Now we need to
            finalise the first pricing model we'll use. Keep iterating the
            subtasks until we have a coherent proposition.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default ViewTaskDialog;
