'use client';

import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import useBoardToUpdateStore from '@/store/boards';
import { TAction } from '@/types';

import BoardIcon from '../atoms/icons/BoardIcon';
import { ScrollArea } from '../atoms/scroll-area';
import { SidebarMenuButton } from '../atoms/sidebar';

import BoardFrom from './BoardFrom';

const CreateBoardDialog = () => {
  const { isOpenModal, board, resetBoardToUpdate, triggerOpenModal } =
    useBoardToUpdateStore();

  const action: TAction = board ? 'update' : 'create';

  const handleOpenChange = (value: boolean) => {
    triggerOpenModal(value);

    if (board) {
      resetBoardToUpdate();
    }
  };

  return (
    <article>
      <Dialog
        open={isOpenModal}
        onOpenChange={(value) => handleOpenChange(value)}
      >
        <DialogTrigger asChild className="text-left">
          <SidebarMenuButton variant="outline" asChild>
            <span>
              <BoardIcon />
              <span>+ Create New Board</span>
            </span>
          </SidebarMenuButton>
        </DialogTrigger>

        <DialogContent hideCloseIcon className="gap-6 p-0 sm:p-0">
          <ScrollArea className="max-h-[80vh] p-6 sm:p-8">
            <DialogHeader className="flex flex-row items-center justify-between space-x-6">
              <DialogTitle className="max-w-[387px] font-bold leading-6">
                {action === 'create' ? 'Add New Board' : 'Edit Board'}
              </DialogTitle>
            </DialogHeader>

            <DialogDescription className="sr-only">
              {action === 'create'
                ? 'Input the data to create a new board'
                : 'Update existing board'}
            </DialogDescription>

            <BoardFrom action={action} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default CreateBoardDialog;
