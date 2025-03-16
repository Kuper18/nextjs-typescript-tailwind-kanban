'use client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

import useBoards from '@/hooks/boards/use-boards';
import useColumns from '@/hooks/columns/use-columns';
import { cn } from '@/lib/utils';
import { IBoard } from '@/services/boards/types';
import useBoardToUpdateStore from '@/store/boards';
import { IDropdownOption } from '@/types';

import { Button } from '../atoms/button';
import Logo from '../atoms/icons/Logo';
import { useSidebar } from '../atoms/sidebar';
import DropdownMenu from '../molecules/DropdownMenu';

import CreateTaskDialog from './CreateTaskDialog';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { open } = useSidebar();
  const { data: boards } = useBoards();
  const { data: columns } = useColumns();
  const { boardId } = useParams<{ boardId: string }>();
  const { setBoardToUpdate, triggerOpenModal } = useBoardToUpdateStore();

  const board = boards?.find((board) => board.id === Number(boardId));

  const handleUpdateBoard = useCallback(() => {
    setBoardToUpdate({
      ...(board as IBoard),
      columns: columns ?? [],
    });
    triggerOpenModal();
  }, [board, columns, setBoardToUpdate, triggerOpenModal]);

  const options: IDropdownOption[] = useMemo(
    () => [
      { title: 'Edit Board', action: handleUpdateBoard },
      {
        title: 'Delete Board',
        action: () => {},
        className:
          'text-destructive text-[13px] font-medium focus:text-destructive',
      },
    ],
    [handleUpdateBoard],
  );

  return (
    <header
      className={cn(
        'fixed z-50 grid h-16 w-full items-center bg-background transition-all sm:h-[81px] lg:h-24',
        open
          ? 'grid-cols-[40px_1fr] sm:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]'
          : 'grid-cols-[209px_1fr]',
      )}
    >
      <div
        className={cn(
          'flex h-full w-fit items-center space-x-4 pl-[16px] sm:w-[260px] md:pl-[26px] lg:w-[300px] lg:pl-[34px]',
          !open ? 'border-b-[1px]' : undefined,
        )}
      >
        <Logo />
        <h1 className="sr-only text-heading-xl font-extrabold sm:not-sr-only">
          kanban
        </h1>
      </div>

      <div className="-ml-[1px] flex h-full w-full items-center justify-between pl-[16px] pr-[16px] sm:border-b-[1px] sm:border-l-[1px] sm:pl-6 sm:pr-6 lg:pr-8">
        <h2 className="hidden w-fit text-lg font-bold sm:inline-flex sm:text-xl lg:text-heading-xl">
          {board?.name}
        </h2>

        <MobileMenu />

        <div className="flex items-center space-x-[16px] sm:space-x-6">
          <CreateTaskDialog>
            <Button size="lg" className="w-12 sm:w-[164px]">
              <Plus className="h-3 w-3" />
              <span className="hidden sm:inline">Add New Task</span>
            </Button>
          </CreateTaskDialog>
          <DropdownMenu
            modal={false}
            align="end"
            side="bottom"
            sideOffset={20}
            options={options}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
