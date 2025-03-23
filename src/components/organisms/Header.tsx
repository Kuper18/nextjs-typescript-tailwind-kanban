'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import useBoards from '@/hooks/boards/use-boards';
import { cn } from '@/lib/utils';

import Logo from '../atoms/icons/Logo';
import { useSidebar } from '../atoms/sidebar';

import BoardActions from './BoardActions';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { open } = useSidebar();
  const { data: boards } = useBoards();
  const { boardId } = useParams<{ boardId: string }>();

  const board = boards?.find((board) => board.id === Number(boardId));

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
          {board?.name ?? 'kanban'}
        </h2>

        <MobileMenu />

        <BoardActions />
      </div>
    </header>
  );
};

export default Header;
