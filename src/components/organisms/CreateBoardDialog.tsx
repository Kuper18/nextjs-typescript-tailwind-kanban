import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';

import BoardIcon from '../atoms/icons/BoardIcon';
import { SidebarMenuButton } from '../atoms/sidebar';

import BoardFrom from './BoardFrom';

const CreateBoardDialog = () => {
  return (
    <article>
      <Dialog>
        <DialogTrigger asChild className="text-left">
          <SidebarMenuButton variant="outline" asChild>
            <span>
              <BoardIcon />
              <span>+ Create New Board</span>
            </span>
          </SidebarMenuButton>
        </DialogTrigger>

        <DialogContent
          hideCloseIcon
          className="max-h-[90vh] gap-6 overflow-hidden"
        >
          <DialogHeader className="flex flex-row items-center justify-between space-x-6">
            <DialogTitle className="max-w-[387px] font-bold leading-6">
              Add New Board
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="sr-only">
            Input the data to create a new board
          </DialogDescription>

          <BoardFrom />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateBoardDialog;
